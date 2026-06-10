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

// Country → Timezone mapping
const COUNTRY_TZ = {
  "India": "Asia/Kolkata",
  "United States": "America/New_York",
  "United Kingdom": "Europe/London",
  "Germany": "Europe/Berlin",
  "France": "Europe/Paris",
  "Japan": "Asia/Tokyo",
  "Australia": "Australia/Sydney",
  "Canada": "America/Toronto",
  "Brazil": "America/Sao_Paulo",
  "Singapore": "Asia/Singapore",
  "Netherlands": "Europe/Amsterdam",
  "Italy": "Europe/Rome",
  "Spain": "Europe/Madrid",
  "Russia": "Europe/Moscow",
  "China": "Asia/Shanghai",
  "South Korea": "Asia/Seoul",
  "Indonesia": "Asia/Jakarta",
  "Pakistan": "Asia/Karachi",
  "Bangladesh": "Asia/Dhaka",
  "Sri Lanka": "Asia/Colombo",
  "Nepal": "Asia/Kathmandu",
  "UAE": "Asia/Dubai",
  "Saudi Arabia": "Asia/Riyadh",
  "Turkey": "Europe/Istanbul",
  "Poland": "Europe/Warsaw",
  "Sweden": "Europe/Stockholm",
  "Norway": "Europe/Oslo",
  "Denmark": "Europe/Copenhagen",
  "Finland": "Europe/Helsinki",
  "Switzerland": "Europe/Zurich",
  "Belgium": "Europe/Brussels",
  "Portugal": "Europe/Lisbon",
  "Greece": "Europe/Athens",
  "Mexico": "America/Mexico_City",
  "Argentina": "America/Argentina/Buenos_Aires",
  "Colombia": "America/Bogota",
  "Chile": "America/Santiago",
  "South Africa": "Africa/Johannesburg",
  "Nigeria": "Africa/Lagos",
  "Kenya": "Africa/Nairobi",
  "Egypt": "Africa/Cairo",
  "New Zealand": "Pacific/Auckland",
  "Malaysia": "Asia/Kuala_Lumpur",
  "Thailand": "Asia/Bangkok",
  "Vietnam": "Asia/Ho_Chi_Minh",
  "Philippines": "Asia/Manila",
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30daysAgo"; // 7daysAgo | 30daysAgo | 90daysAgo

   const dateRange =
  range === "today"
    ? { startDate: "today", endDate: "today" }
    : { startDate: range, endDate: "today" };

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
      visitorProfilesRes
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
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
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

      // 13. Session-level grouped visitor profiles
client.runReport({
  property: PROPERTY,
  dateRanges: [dateRange],
  dimensions: [
    { name: "date" },
    { name: "country" },
    { name: "region" },
    { name: "city" },
    { name: "deviceCategory" },
    { name: "sessionSource" },
    { name: "sessionMedium" },
    { name: "browser" },
    { name: "operatingSystem" },

  ],
  metrics: [
    { name: "sessions" },
    { name: "screenPageViews" },
    { name: "averageSessionDuration" },
    { name: "bounceRate" },
    { name: "engagedSessions" },
  ],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 500, // GA4 max practical limit
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

    console.log("channelRes raw:", JSON.stringify(channelRes[0], null, 2));


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

    // ── Visitor Profiles ─────────────────────────────────────────────────────
const visitorProfiles = parseRows(
  visitorProfilesRes[0].rows,
  visitorProfilesRes[0].dimensionHeaders,
  visitorProfilesRes[0].metricHeaders
).map((r, i) => ({
  id: i + 1,
  date: r.date,
  country: r.country,
  region: r.region,
  city: r.city,
  device: r.deviceCategory,
  source: r.sessionSource,
  medium: r.sessionMedium,
  browser: r.browser,
  os: r.operatingSystem,
  language: r.language,
  sessions: r.sessions,
  pageViews: r.screenPageViews,
  avgDuration: +r.averageSessionDuration.toFixed(0),
  bounceRate: +(r.bounceRate * 100).toFixed(1),
  engagedSessions: r.engagedSessions,
  timezone: COUNTRY_TZ[r.country] ?? `Other (${r.country})`,
}));


    // ── Timezones (country-based mapping) ───────────────────────────────────────
const timezones = countries
  .map(c => ({
    timezone: COUNTRY_TZ[c.country] ?? `Other (${c.country})`,
    country: c.country,
    totalUsers: c.totalUsers,
  }))
  .reduce((acc, curr) => {
    const ex = acc.find(a => a.timezone === curr.timezone);
    if (ex) ex.totalUsers += curr.totalUsers;
    else acc.push({ ...curr });
    return acc;
  }, [])
  .sort((a, b) => b.totalUsers - a.totalUsers);

    return Response.json({
      success: true,
      range,
      overview,
      daily,
      geography: { countries, cities, regions },
      devices: { devices, browsers, operatingSystems, screenSizes },
      traffic: { channels, sources },
      languages,
      timezones,
      visitorProfiles
    });

  } catch (error) {
    console.error("GA4 API error:", error);
    
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}