// app/api/analytics/route.js
// Place this file at: app/api/analytics/route.js

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const PROPERTY = `properties/${process.env.GA_PROPERTY_ID}`;

// Helper: flatten GA4 rows into [{dimensionName: value, ...metricName: value}]
function parseRows(rows = [], dimensionHeaders = [], metricHeaders = []) {
  return rows.map((row) => {
    const obj = {};
    dimensionHeaders.forEach((h, i) => {
      obj[h.name] = row.dimensionValues?.[i]?.value ?? "";
    });
    metricHeaders.forEach((h, i) => {
      obj[h.name] = Number(row.metricValues?.[i]?.value ?? 0);
    });
    return obj;
  });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30daysAgo"; // 7daysAgo | 30daysAgo | 90daysAgo

    const dateRange = { startDate: range, endDate: "today" };

    // ── Run all reports in parallel ──────────────────────────────────────────
    const [
      overviewRes,
      dailyRes,
      countryRes,
      cityRes,
      deviceRes,
      browserRes,
      osRes,
      screenRes,
      channelRes,
      sourceRes,
      langRes,
      timezoneRes,
    ] = await Promise.all([

      // 1. Overview metrics
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        metrics: [
          { name: "totalUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
          { name: "engagedSessions" },
        ],
      }),

      // 2. Daily trend (for chart)
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
      }),

      // 3. Country
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "totalUsers" }, { name: "sessions" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 10,
      }),

      // 4. City
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "city" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 10,
      }),

      // 5. Device category (Mobile / Desktop / Tablet)
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "totalUsers" }, { name: "sessions" }],
      }),

      // 6. Browser
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "browser" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 6,
      }),

      // 7. Operating System
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "operatingSystem" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 6,
      }),

      // 8. Screen resolution
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "screenResolution" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 6,
      }),

      // 9. Default channel group (Google Search, Direct, Social, etc.)
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "defaultChannelGroup" }],
        metrics: [{ name: "sessions" }, { name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      }),

      // 10. Traffic source / medium
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
        metrics: [{ name: "sessions" }, { name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),

      // 11. Language
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "language" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 8,
      }),

      // 12. User timezone (closest GA4 has)
      client.runReport({
        property: PROPERTY,
        dateRanges: [dateRange],
        dimensions: [{ name: "region" }, { name: "country" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 8,
      }),
    ]);

    // ── Parse overview (single row) ──────────────────────────────────────────
    const ov = overviewRes[0];
    const ovMetrics = {};
    ov.metricHeaders?.forEach((h, i) => {
      ovMetrics[h.name] = Number(ov.rows?.[0]?.metricValues?.[i]?.value ?? 0);
    });

    const totalUsers    = ovMetrics.totalUsers    ?? 0;
    const newUsers      = ovMetrics.newUsers       ?? 0;
    const returningUsers = Math.max(totalUsers - newUsers, 0);

    const overview = {
      totalUsers,
      newUsers,
      returningUsers,
      sessions:               ovMetrics.sessions               ?? 0,
      pageViews:              ovMetrics.screenPageViews        ?? 0,
      bounceRate:             +(ovMetrics.bounceRate * 100).toFixed(1),
      avgSessionDuration:     +ovMetrics.averageSessionDuration.toFixed(0),
      engagedSessions:        ovMetrics.engagedSessions        ?? 0,
    };

    // ── Parse daily trend ────────────────────────────────────────────────────
    const daily = parseRows(
      dailyRes[0].rows,
      dailyRes[0].dimensionHeaders,
      dailyRes[0].metricHeaders
    ).map((r) => ({
      date: r.date, // "20240610"
      users: r.totalUsers,
      sessions: r.sessions,
      pageViews: r.screenPageViews,
    }));

    // ── Geography ────────────────────────────────────────────────────────────
    const countries = parseRows(
      countryRes[0].rows,
      countryRes[0].dimensionHeaders,
      countryRes[0].metricHeaders
    );

    const cities = parseRows(
      cityRes[0].rows,
      cityRes[0].dimensionHeaders,
      cityRes[0].metricHeaders
    );

    // ── Devices ──────────────────────────────────────────────────────────────
    const devices = parseRows(
      deviceRes[0].rows,
      deviceRes[0].dimensionHeaders,
      deviceRes[0].metricHeaders
    );

    const browsers = parseRows(
      browserRes[0].rows,
      browserRes[0].dimensionHeaders,
      browserRes[0].metricHeaders
    );

    const operatingSystems = parseRows(
      osRes[0].rows,
      osRes[0].dimensionHeaders,
      osRes[0].metricHeaders
    );

    const screenSizes = parseRows(
      screenRes[0].rows,
      screenRes[0].dimensionHeaders,
      screenRes[0].metricHeaders
    );

    // ── Traffic sources ───────────────────────────────────────────────────────
    const channels = parseRows(
      channelRes[0].rows,
      channelRes[0].dimensionHeaders,
      channelRes[0].metricHeaders
    );

    const sources = parseRows(
      sourceRes[0].rows,
      sourceRes[0].dimensionHeaders,
      sourceRes[0].metricHeaders
    );

    // ── Language & region ────────────────────────────────────────────────────
    const languages = parseRows(
      langRes[0].rows,
      langRes[0].dimensionHeaders,
      langRes[0].metricHeaders
    );

    const regions = parseRows(
      timezoneRes[0].rows,
      timezoneRes[0].dimensionHeaders,
      timezoneRes[0].metricHeaders
    );

    return Response.json({
      success: true,
      range,
      overview,
      daily,
      geography: { countries, cities, regions },
      devices: { devices, browsers, operatingSystems, screenSizes },
      traffic: { channels, sources },
      languages,
    });

  } catch (error) {
    console.error("GA4 API error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}