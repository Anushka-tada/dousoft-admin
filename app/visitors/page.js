/* eslint-disable react-hooks/immutability */
"use client";

import React, { useEffect, useState, useCallback } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmt = (n) =>
  n == null || n === "—" ? "—" : Number(n).toLocaleString("en-IN");

const fmtDuration = (s) => {
  if (!s && s !== 0) return "—";
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
};

const RANGES = [
  { label: "7 Days",  value: "7daysAgo"  },
  { label: "30 Days", value: "30daysAgo" },
  { label: "90 Days", value: "90daysAgo" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, icon, color, bg, loading }) {
  return (
    <div className="kpi-card" style={{ cursor: "default" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: bg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <i className={`bi ${icon}`} style={{ fontSize: 20, color }} />
        </div>
      </div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value" style={{ margin: "4px 0 2px" }}>
        {loading
          ? <span className="placeholder-glow"><span className="placeholder col-6" style={{ borderRadius: 6 }} /></span>
          : value}
      </div>
      {sub && !loading && (
        <div style={{ fontSize: 11.5, color: "#9ca3af", fontWeight: 500, marginTop: 2 }}>{sub}</div>
      )}
    </div>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>{title}</span>
      {subtitle && <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 8 }}>{subtitle}</span>}
    </div>
  );
}

function BarList({ rows, labelKey, valueKey, color = "#0b6f1e", loading }) {
  if (loading) return (
    <div className="placeholder-glow d-flex flex-column gap-2">
      {[1,2,3,4,5].map(i => <span key={i} className="placeholder col-12" style={{ height: 28, borderRadius: 8 }} />)}
    </div>
  );
  if (!rows || rows.length === 0) return <Empty />;
  const max = Math.max(...rows.map(r => r[valueKey] || 0), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {rows.map((row, i) => {
        const pct = Math.max(((row[valueKey] || 0) / max) * 100, 2);
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "#6b7280", minWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {row[labelKey] || "Unknown"}
            </span>
            <div style={{ flex: 1, height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", minWidth: 40, textAlign: "right" }}>
              {fmt(row[valueKey])}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PieDonut({ data, labelKey, valueKey, colors, loading }) {
  if (loading) return (
    <div className="placeholder-glow" style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
      <span className="placeholder" style={{ width: 100, height: 100, borderRadius: "50%" }} />
    </div>
  );
  if (!data || data.length === 0) return <Empty />;
  const total = data.reduce((s, d) => s + (d[valueKey] || 0), 0);
  let cumAngle = -90;
  const R = 50, cx = 70, cy = 70, r = 28;
  const segments = data.map((d, i) => {
    const pct = (d[valueKey] || 0) / (total || 1);
    const angle = pct * 360;
    const startA = (cumAngle * Math.PI) / 180;
    cumAngle += angle;
    const endA = (cumAngle * Math.PI) / 180;
    const x1 = cx + R * Math.cos(startA), y1 = cy + R * Math.sin(startA);
    const x2 = cx + R * Math.cos(endA),   y2 = cy + R * Math.sin(endA);
    const large = angle > 180 ? 1 : 0;
    return { d: `M${cx},${cy} L${x1},${y1} A${R},${R},0,${large},1,${x2},${y2} Z`, color: colors[i % colors.length], label: d[labelKey], value: d[valueKey], pct: Math.round(pct * 100) };
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        {segments.map((s, i) => <path key={i} d={s.d} fill={s.color} stroke="#fff" strokeWidth={1.5} />)}
        <circle cx={cx} cy={cy} r={r} fill="#fff" />
        <text x={cx} y={cy - 5} textAnchor="middle" fontSize={10} fill="#6b7280">Total</text>
        <text x={cx} y={cy + 9} textAnchor="middle" fontSize={13} fontWeight="700" fill="#111827">{fmt(total)}</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#374151", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
            <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart({ daily, loading }) {
  if (loading) return (
    <div className="placeholder-glow">
      <span className="placeholder col-12" style={{ height: 120, borderRadius: 8, display: "block" }} />
    </div>
  );
  if (!daily || daily.length === 0) return <Empty />;

  const W = 560, H = 110, PAD = { t: 10, r: 10, b: 24, l: 38 };
  const iW = W - PAD.l - PAD.r, iH = H - PAD.t - PAD.b;
  const maxU = Math.max(...daily.map(d => d.users), 1);
  const maxP = Math.max(...daily.map(d => d.pageViews), 1);
  const xStep = iW / Math.max(daily.length - 1, 1);

  const pointsUsers = daily.map((d, i) => [PAD.l + i * xStep, PAD.t + iH - (d.users / maxU) * iH]);
  const pointsPV    = daily.map((d, i) => [PAD.l + i * xStep, PAD.t + iH - (d.pageViews / maxP) * iH]);

  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const toArea = (pts) => `${toPath(pts)} L${pts[pts.length-1][0]},${PAD.t + iH} L${pts[0][0]},${PAD.t + iH} Z`;

  const yTicks = [0, 0.5, 1].map(f => ({ y: PAD.t + iH - f * iH, val: Math.round(f * maxU) }));
  const xTicks = daily.filter((_, i) => daily.length <= 10 || i % Math.ceil(daily.length / 7) === 0);

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", minWidth: 280 }}>
        <defs>
          <linearGradient id="guGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b6f1e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0b6f1e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e7490" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={PAD.l} y1={t.y} x2={W - PAD.r} y2={t.y} stroke="#f3f4f6" strokeWidth={1} />
            <text x={PAD.l - 5} y={t.y + 4} fontSize={9} textAnchor="end" fill="#9ca3af">{fmt(t.val)}</text>
          </g>
        ))}

        <path d={toArea(pointsUsers)} fill="url(#guGrad)" />
        <path d={toPath(pointsUsers)} fill="none" stroke="#0b6f1e" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        <path d={toArea(pointsPV)} fill="url(#pvGrad)" />
        <path d={toPath(pointsPV)} fill="none" stroke="#0e7490" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" strokeDasharray="4 2" />

        {xTicks.map((d, i) => {
          const idx = daily.indexOf(d);
          const x = PAD.l + idx * xStep;
          const label = `${d.date.slice(6,8)}/${d.date.slice(4,6)}`;
          return <text key={i} x={x} y={H - 4} fontSize={9} textAnchor="middle" fill="#9ca3af">{label}</text>;
        })}
      </svg>
      <div style={{ display: "flex", gap: 16, marginTop: 6, justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 12, height: 2, background: "#0b6f1e", borderRadius: 1 }} />
          <span style={{ fontSize: 11, color: "#6b7280" }}>Users</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 12, height: 2, background: "#0e7490", borderRadius: 1, borderTop: "2px dashed #0e7490" }} />
          <span style={{ fontSize: 11, color: "#6b7280" }}>Page Views</span>
        </div>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div style={{ textAlign: "center", padding: "20px 0", color: "#d1d5db" }}>
      <i className="bi bi-inbox" style={{ fontSize: 22, display: "block" }} />
      <span style={{ fontSize: 12 }}>No data</span>
    </div>
  );
}

function CardSoft({ children, style }) {
  return (
    <div className="card-soft" style={{ padding: "20px 22px", ...style }}>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const [range, setRange]     = useState("30daysAgo");
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = useCallback(async (r) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://dousoft-admin-rosy.vercel.app/api/ga4-data?range=${r}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Unknown error");
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(range); }, [range, load]);

  const ov = data?.overview || {};
  const daily = data?.daily || [];
  const geo = data?.geography || {};
  const dev = data?.devices || {};
  const traffic = data?.traffic || {};
  const languages = data?.languages || [];

  const DEVICE_COLORS  = ["#0b6f1e", "#16a34a", "#4ade80"];
  const CHANNEL_COLORS = ["#0b6f1e", "#0e7490", "#1d4ed8", "#7c3aed", "#a16207", "#be185d", "#dc2626"];
  const OS_COLORS      = ["#0b6f1e", "#0e7490", "#1d4ed8", "#7c3aed", "#a16207"];
  const BROWSER_COLORS = ["#0b6f1e", "#0e7490", "#1d4ed8", "#7c3aed", "#a16207", "#be185d"];

  return (
    <div className="container-fluid main-content-box py-4">
      <div className="container maxw-1400">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 20, color: "#111827", margin: 0 }}>
              Visitor Analytics
            </h4>
            <p style={{ color: "#9ca3af", fontSize: 13, margin: "3px 0 0" }}>
              Powered by Google Analytics 4
            </p>
          </div>

          {/* Range Selector */}
          <div style={{ display: "flex", gap: 6, background: "#f9fafb", borderRadius: 10, padding: 4, border: "1px solid #f3f4f6" }}>
            {RANGES.map(r => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                style={{
                  padding: "6px 16px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
                  background: range === r.value ? "#0b6f1e" : "transparent",
                  color: range === r.value ? "#fff" : "#6b7280",
                  transition: "all 0.2s",
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="alert" style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 14 }}>
            <i className="bi bi-exclamation-circle me-2" />
            {error}
          </div>
        )}

        {/* ── KPI Row ─────────────────────────────────────────────────────── */}
        <div className="kpi-grid-2 mb-4">
          <KpiCard label="Total Visitors"     value={fmt(ov.totalUsers)}         icon="bi-people"           color="#0b6f1e" bg="#dcfce7" loading={loading} />
          <KpiCard label="Unique Users"       value={fmt(ov.newUsers)}           icon="bi-person-check" color="#0e7490" bg="#ecfeff" loading={loading} />
          <KpiCard label="Page Views"         value={fmt(ov.pageViews)}          icon="bi-eye"              color="#1d4ed8" bg="#eff6ff" loading={loading} />
          <KpiCard label="Sessions"           value={fmt(ov.sessions)}           icon="bi-activity"         color="#7c3aed" bg="#f5f3ff" loading={loading} />
          <KpiCard label="Bounce Rate"        value={loading ? "—" : `${ov.bounceRate ?? "—"}%`} icon="bi-arrow-return-left" color="#a16207" bg="#fef9c3" loading={loading} />
          <KpiCard label="Avg. Session Time"  value={fmtDuration(ov.avgSessionDuration)} icon="bi-clock"   color="#be185d" bg="#fdf2f8" loading={loading} />
          <KpiCard label="Engaged Sessions"   value={fmt(ov.engagedSessions)}    icon="bi-lightning-charge" color="#dc2626" bg="#fef2f2" loading={loading} />
          <KpiCard
            label="New vs Returning"
            value={loading ? "—" : `${fmt(ov.newUsers)} / ${fmt(ov.returningUsers)}`}
           
            icon="bi-arrow-left-right"
            color="#0b6f1e"
            bg="#dcfce7"
            loading={loading}
          />
        </div>

        {/* ── Daily Trend ──────────────────────────────────────────────────── */}
        <div className="mb-4">
          <CardSoft>
            <SectionTitle title="Traffic Trend" subtitle={RANGES.find(r => r.value === range)?.label} />
            <LineChart daily={daily} loading={loading} />
          </CardSoft>
        </div>

        {/* ── Row 2: Geography ─────────────────────────────────────────────── */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Top Countries" subtitle="by users" />
              <BarList rows={geo.countries} labelKey="country" valueKey="totalUsers" color="#0b6f1e" loading={loading} />
            </CardSoft>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Top Cities" subtitle="by users" />
              <BarList rows={geo.cities} labelKey="city" valueKey="totalUsers" color="#0e7490" loading={loading} />
            </CardSoft>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Top Regions" subtitle="state / province" />
              <BarList
                rows={geo.regions?.map(r => ({ label: `${r.region}, ${r.country}`, totalUsers: r.totalUsers }))}
                labelKey="label" valueKey="totalUsers" color="#1d4ed8" loading={loading}
              />
            </CardSoft>
          </div>
        </div>

        {/* ── Row 3: Devices ───────────────────────────────────────────────── */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6 col-lg-3">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Device Type" />
              <PieDonut data={dev.devices} labelKey="deviceCategory" valueKey="totalUsers" colors={DEVICE_COLORS} loading={loading} />
            </CardSoft>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Operating System" />
              <PieDonut data={dev.operatingSystems} labelKey="operatingSystem" valueKey="totalUsers" colors={OS_COLORS} loading={loading} />
            </CardSoft>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Browser" />
              <PieDonut data={dev.browsers} labelKey="browser" valueKey="totalUsers" colors={BROWSER_COLORS} loading={loading} />
            </CardSoft>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Screen Resolution" />
              <BarList rows={dev.screenSizes} labelKey="screenResolution" valueKey="totalUsers" color="#7c3aed" loading={loading} />
            </CardSoft>
          </div>
        </div>

        {/* ── Row 4: Traffic Sources ───────────────────────────────────────── */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-lg-5">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Traffic Channels" subtitle="sessions by source" />
              <PieDonut data={traffic.channels} labelKey="defaultChannelGroup" valueKey="sessions" colors={CHANNEL_COLORS} loading={loading} />
            </CardSoft>
          </div>
          <div className="col-12 col-lg-7">
            <CardSoft style={{ height: "100%" }}>
              <SectionTitle title="Source / Medium" subtitle="top 10" />
              <BarList
                rows={traffic.sources?.map(s => ({ label: `${s.sessionSource} / ${s.sessionMedium}`, sessions: s.sessions }))}
                labelKey="label" valueKey="sessions" color="#0b6f1e" loading={loading}
              />
            </CardSoft>
          </div>
        </div>

        {/* ── Row 5: Language ──────────────────────────────────────────────── */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <CardSoft>
              <SectionTitle title="Languages" subtitle="by users" />
              <BarList rows={languages} labelKey="language" valueKey="totalUsers" color="#a16207" loading={loading} />
            </CardSoft>
          </div>
          <div className="col-12 col-md-6">
            <CardSoft>
              <SectionTitle title="New vs Returning" />
              {loading ? <div className="placeholder-glow"><span className="placeholder col-12" style={{ height: 140, borderRadius: 8, display: "block" }} /></div> : (
                <>
                  <PieDonut
                    data={[
                      { label: "New Users",       value: ov.newUsers       || 0 },
                      { label: "Returning Users", value: ov.returningUsers || 0 },
                    ]}
                    labelKey="label" valueKey="value"
                    colors={["#0b6f1e", "#86efac"]}
                    loading={false}
                  />
                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>New</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#0b6f1e" }}>{fmt(ov.newUsers)}</div>
                    </div>
                    <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>Returning</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#16a34a" }}>{fmt(ov.returningUsers)}</div>
                    </div>
                  </div>
                </>
              )}
            </CardSoft>
          </div>
        </div>

      </div>
    </div>
  );
}