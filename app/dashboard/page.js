// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { BASE_URL } from "../utils/api_base_url_configration";

// const timeAgo = (dateStr) => {
//   if (!dateStr) return "—";
//   const diff = (Date.now() - new Date(dateStr)) / 1000;
//   if (diff < 60) return `${Math.floor(diff)}s ago`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   return `${Math.floor(diff / 86400)}d ago`;
// };

// const initials = (name = "") =>
//   name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

// export default function Dashboard() {
//   const router = useRouter();
//   const [data, setData] = useState({
//     appointments: [], contacts: [], blogs: [], jobs: [], jobRequests: [],
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAll = async () => {
//       setLoading(true);
//       try {
//         const [a, c, b, j, jr] = await Promise.allSettled([
//           fetch(`${BASE_URL}meeting`).then((r) => r.json()),
//           fetch(`${BASE_URL}contact`).then((r) => r.json()),
//           fetch(`${BASE_URL}blogs`).then((r) => r.json()),
//           fetch(`${BASE_URL}career`).then((r) => r.json()),
//           fetch(`${BASE_URL}career/request`).then((r) => r.json()),
//         ]);
//         setData({
//           appointments: a.value?.data || [],
//           contacts:     c.value?.data || [],
//           blogs:        b.value?.data || [],
//           jobs:         j.value?.data || [],
//           jobRequests:  jr.value?.data || [],
//         });
//       } catch (e) { console.error(e); }
//       finally { setLoading(false); }
//     };
//     fetchAll();
//   }, []);

//   const { appointments, contacts, blogs, jobs, jobRequests } = data;

//   const kpis = [
//     {
//       label: "Appointments",
//       value: appointments.length,
//       icon: "bi-calendar3",
//       color: "#0b6f1e",
//       bg: "#dcfce7",
//       path: "/appointments",
//     },
//     {
//       label: "Contact Requests",
//       value: contacts.length,
//       icon: "bi-envelope-at",
//       color: "#1d4ed8",
//       bg: "#eff6ff",
//       path: "/contact-requests",
//     },
//     {
//       label: "Published Blogs",
//       value: blogs.filter((b) => b.status === "published").length,
//       sub: `${blogs.length} total`,
//       icon: "bi-journal-richtext",
//       color: "#a16207",
//       bg: "#fef9c3",
//       path: "/blogs",
//     },
//     {
//       label: "Active Jobs",
//       value: jobs.filter((j) => j.status === "active").length,
//       sub: `${jobRequests.length} applications`,
//       icon: "bi-briefcase",
//       color: "#7c3aed",
//       bg: "#f5f3ff",
//       path: "/career",
//     },
//   ];

//   // Recent activity — last 5 across appointments + contacts
//   const activity = [
//     ...appointments.map((a) => ({ type: "appointment", name: a.name || "—", time: a.createdAt, icon: "bi-calendar-check", color: "#0b6f1e", bg: "#dcfce7" })),
//     ...contacts.map((c)     => ({ type: "contact",     name: c.name || "—", time: c.createdAt, icon: "bi-envelope",       color: "#1d4ed8", bg: "#eff6ff" })),
//   ]
//     .sort((a, b) => new Date(b.time) - new Date(a.time))
//     .slice(0, 5);

//   return (
//     <div className="container-fluid main-content-box py-4">
//       <div className="container maxw-1400">

//         {/* Header */}
//         <div style={{ marginBottom: 28 }}>
//           <h4 style={{ fontWeight: 700, fontSize: 20, color: "#111827", margin: 0 }}>
//             Dashboard
//           </h4>
//           <p style={{ color: "#9ca3af", fontSize: 13, margin: "3px 0 0" }}>
//             Overview of your admin panel
//           </p>
//         </div>

//         {/* KPI Cards */}
//         <div className="kpi-grid mb-4">
//           {kpis.map((k) => (
//             <div
//               key={k.label}
//               className="kpi-card"
//               onClick={() => router.push(k.path)}
//               style={{ cursor: "pointer" }}
//             >
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
//                 <div
//                   style={{
//                     width: 44, height: 44, borderRadius: 12,
//                     background: k.bg,
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                   }}
//                 >
//                   <i className={`bi ${k.icon}`} style={{ fontSize: 20, color: k.color }} />
//                 </div>
//                 <i className="bi bi-arrow-up-right" style={{ fontSize: 13, color: "#d1d5db", marginTop: 4 }} />
//               </div>

//               <div className="kpi-label">{k.label}</div>
//               <div className="kpi-value" style={{ margin: "4px 0 2px" }}>
//                 {loading
//                   ? <span className="placeholder-glow"><span className="placeholder col-5" style={{ borderRadius: 6 }} /></span>
//                   : k.value
//                 }
//               </div>
//               {/* {k.sub && (
//                 <div style={{ fontSize: 11.5, color: "#9ca3af", fontWeight: 500 }}>
//                   {k.sub}
//                 </div>
//               )} */}
//             </div>
//           ))}
//         </div>

//         {/* Recent Activity */}
//         <div className="row g-3">
//           <div className="col-12 col-lg-6">
//             <div className="card-soft" style={{ padding: "20px 22px" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//                 <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>
//                   Recent Activity
//                 </span>
//                 <span style={{ fontSize: 13, color: "#9ca3af" }}>Last 5 entries</span>
//               </div>

//               {loading ? (
//                 <div className="placeholder-glow d-flex flex-column gap-2">
//                   {[1,2,3,4,5].map((i) => (
//                     <span key={i} className="placeholder col-12" style={{ height: 52, borderRadius: 10 }} />
//                   ))}
//                 </div>
//               ) : activity.length === 0 ? (
//                 <div style={{ textAlign: "center", padding: "24px 0", color: "#9ca3af" }}>
//                   <i className="bi bi-inbox" style={{ fontSize: 28, display: "block", marginBottom: 6 }} />
//                   <span style={{ fontSize: 15 }}>No recent activity</span>
//                 </div>
//               ) : (
//                 <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                   {activity.map((item, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         display: "flex", alignItems: "center", gap: 12,
//                         padding: "10px 12px", borderRadius: 10,
//                         background: "#f9fafb",
//                       }}
//                     >
//                       <div style={{
//                         width: 34, height: 34, borderRadius: "50%",
//                         background: item.bg,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         fontSize: 11, fontWeight: 700, color: item.color, flexShrink: 0,
//                       }}>
//                         {initials(item.name)}
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <div style={{ fontSize: 15, fontWeight: 500, color: "#111827" }}>{item.name}</div>
//                         <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 1 }}>
//                           {item.type === "appointment" ? "Appointment" : "Contact Request"}
//                         </div>
//                       </div>
//                       <span style={{ fontSize: 13, color: "#9ca3af", whiteSpace: "nowrap" }}>
//                         {timeAgo(item.time)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="col-12 col-lg-6">
//             <div className="card-soft" style={{ padding: "20px 22px" }}>
//               <div style={{ marginBottom: 16 }}>
//                 <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Quick Actions</span>
//               </div>
//               <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                 {[
//                   { label: "Add New Blog",       icon: "bi-journal-plus",  path: "/blogs/create",      color: "#a16207", bg: "#fef9c3" },
//                   { label: "Post a Job",          icon: "bi-plus-circle",   path: "/career/create",     color: "#0b6f1e", bg: "#dcfce7" },
//                   { label: "View Appointments",   icon: "bi-calendar3",     path: "/appointments",      color: "#1d4ed8", bg: "#eff6ff" },
//                   { label: "View Job Applications",icon: "bi-people",       path: "/career/requests",   color: "#7c3aed", bg: "#f5f3ff" },
//                 ].map((q) => (
//                   <button
//                     key={q.label}
//                     onClick={() => router.push(q.path)}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 12,
//                       background: "#f9fafb", border: "1px solid #f3f4f6",
//                       borderRadius: 10, padding: "11px 14px",
//                       cursor: "pointer", textAlign: "left",
//                       transition: "background 0.15s, border-color 0.15s",
//                       width: "100%",
//                     }}
//                     onMouseEnter={(e) => { e.currentTarget.style.background = q.bg; e.currentTarget.style.borderColor = "transparent"; }}
//                     onMouseLeave={(e) => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#f3f4f6"; }}
//                   >
//                     <div style={{
//                       width: 34, height: 34, borderRadius: 9,
//                       background: q.bg, display: "flex",
//                       alignItems: "center", justifyContent: "center", flexShrink: 0,
//                     }}>
//                       <i className={`bi ${q.icon}`} style={{ fontSize: 16, color: q.color }} />
//                     </div>
//                     <span style={{ fontSize: 15, fontWeight: 500, color: "#374151" }}>{q.label}</span>
//                     <i className="bi bi-chevron-right" style={{ fontSize: 12, color: "#d1d5db", marginLeft: "auto" }} />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../utils/api_base_url_configration";

const timeAgo = (dateStr) => {
  if (!dateStr) return "—";
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const initials = (name = "") =>
  name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

// Mini bar chart for visitor trend
function VisitorBarChart({ logs }) {
  if (!logs || logs.length === 0) return null;
  const max = Math.max(...logs.map((l) => l.count), 1);
  const last7 = [...logs].reverse(); // oldest → newest

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 52 }}>
      {last7.map((log, i) => {
        const pct = Math.max((log.count / max) * 100, 6);
        const isToday = i === last7.length - 1;
        return (
          <div
            key={log.date}
            title={`${log.date}: ${log.count} visitors`}
            style={{
              flex: 1,
              height: `${pct}%`,
              background: isToday ? "#0b6f1e" : "#bbf7d0",
              borderRadius: "4px 4px 0 0",
              transition: "height 0.4s ease",
              cursor: "default",
              minHeight: 4,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState({
    appointments: [], contacts: [], blogs: [], jobs: [], jobRequests: [],
  });
  const [visitors, setVisitors] = useState(null); // { logs, total, weeklyTotal }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [a, c, b, j, jr, v] = await Promise.allSettled([
          fetch(`${BASE_URL}meeting`).then((r) => r.json()),
          fetch(`${BASE_URL}contact`).then((r) => r.json()),
          fetch(`${BASE_URL}blogs`).then((r) => r.json()),
          fetch(`${BASE_URL}career`).then((r) => r.json()),
          fetch(`${BASE_URL}career/request`).then((r) => r.json()),
          fetch(`${BASE_URL}visitors`).then((r) => r.json()),   // ← visitor API
        ]);
        setData({
          appointments: a.value?.data || [],
          contacts:     c.value?.data || [],
          blogs:        b.value?.data || [],
          jobs:         j.value?.data || [],
          jobRequests:  jr.value?.data || [],
        });
        if (v.status === "fulfilled") setVisitors(v.value);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const { appointments, contacts, blogs, jobs, jobRequests } = data;

  const kpis = [
    {
      label: "Appointments",
      value: appointments.length,
      icon: "bi-calendar3",
      color: "#0b6f1e",
      bg: "#dcfce7",
      path: "/appointments",
    },
    {
      label: "Contact Requests",
      value: contacts.length,
      icon: "bi-envelope-at",
      color: "#1d4ed8",
      bg: "#eff6ff",
      path: "/contact-requests",
    },
    {
      label: "Published Blogs",
      value: blogs.filter((b) => b.status === "published").length,
      sub: `${blogs.length} total`,
      icon: "bi-journal-richtext",
      color: "#a16207",
      bg: "#fef9c3",
      path: "/blogs",
    },
    // {
    //   label: "Active Jobs",
    //   value: jobs.filter((j) => j.status === "active").length,
    //   sub: `${jobRequests.length} applications`,
    //   icon: "bi-briefcase",
    //   color: "#7c3aed",
    //   bg: "#f5f3ff",
    //   path: "/career",
    // },
    // ─── Visitors KPI card ───────────────────────────────────────────────────
    {
      label: "Total Visitors",
      value: visitors?.total ?? "—",
      sub: visitors ? `${visitors.weeklyTotal} this week` : null,
      icon: "bi-people",
      color: "#0e7490",
      bg: "#ecfeff",
      path: null, // no navigation, scroll down to chart
    },
  ];

 const activity = [
  ...appointments.map((a) => ({
    type: "appointment",
    name: a.name || "—",
    time: a.createdAt,
    icon: "bi-calendar-check",
    color: "#0b6f1e",
    bg: "#dcfce7",
    path: "/appointments",
  })),

  ...contacts.map((c) => ({
    type: "contact",
    name: c.name || "—",
    time: c.createdAt,
    icon: "bi-envelope",
    color: "#1d4ed8",
    bg: "#eff6ff",
    path: "/contact-requests", // ya "/contacts" agar route ye hai
  })),
]
  .sort((a, b) => new Date(b.time) - new Date(a.time))
  .slice(0, 5);

  return (
    <div className="container-fluid main-content-box py-4">
      <div className="container maxw-1400">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h4 style={{ fontWeight: 700, fontSize: 20, color: "#111827", margin: 0 }}>
            Dashboard
          </h4>
          <p style={{ color: "#9ca3af", fontSize: 13, margin: "3px 0 0" }}>
            Overview of your admin panel
          </p>
        </div>

        {/* KPI Cards — now 5 cards */}
        <div className="kpi-grid mb-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="kpi-card"
              onClick={() => k.path && router.push(k.path)}
              style={{ cursor: k.path ? "pointer" : "default" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: k.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <i className={`bi ${k.icon}`} style={{ fontSize: 20, color: k.color }} />
                </div>
                {k.path && (
                  <i className="bi bi-arrow-up-right" style={{ fontSize: 13, color: "#d1d5db", marginTop: 4 }} />
                )}
              </div>

              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value" style={{ margin: "4px 0 2px" }}>
                {loading
                  ? <span className="placeholder-glow"><span className="placeholder col-5" style={{ borderRadius: 6 }} /></span>
                  : k.value
                }
              </div>
              {/* {k.sub && !loading && (
                <div style={{ fontSize: 11.5, color: "#9ca3af", fontWeight: 500, marginTop: 2 }}>
                  {k.sub}
                </div>
              )} */}
            </div>
          ))}
        </div>

        {/* Bottom row: Recent Activity + Quick Actions + Visitor Trend */}
        <div className="row g-3">

          {/* Recent Activity */}
          <div className="col-12 col-lg-4">
            <div className="card-soft" style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontWeight: 600, fontSize: 16, color: "#111827" }}>Recent Activity</span>
                <span style={{ fontSize: 13, color: "#9ca3af" }}>Last 5</span>
              </div>

              {loading ? (
                <div className="placeholder-glow d-flex flex-column gap-2">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="placeholder col-12" style={{ height: 52, borderRadius: 10 }} />
                  ))}
                </div>
              ) : activity.length === 0 ? (
                <div style={{ textAlign: "center", padding: "24px 0", color: "#9ca3af" }}>
                  <i className="bi bi-inbox" style={{ fontSize: 28, display: "block", marginBottom: 6 }} />
                  <span style={{ fontSize: 1 }}>No recent activity</span>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {activity.map((item, i) => (
                    <div
                     onClick={() => router.push(item.path)}
                      key={i}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 12px", borderRadius: 10,
                        background: "#f9fafb",
                      }}
                    >
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: item.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: item.color, flexShrink: 0,
                      }}>
                        {initials(item.name)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 500, color: "#111827" }}>{item.name}</div>
                        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 1 }}>
                          {item.type === "appointment" ? "Appointment" : "Contact Request"}
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>
                        {timeAgo(item.time)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-12 col-lg-4">
            <div className="card-soft" style={{ padding: "20px 22px" }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 600, fontSize: 16, color: "#111827" }}>Quick Actions</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Add New Blog",          icon: "bi-journal-plus",  path: "/blogs/create",    color: "#a16207", bg: "#fef9c3" },
                  { label: "Post a Job",             icon: "bi-plus-circle",   path: "/career/create",   color: "#0b6f1e", bg: "#dcfce7" },
                  { label: "View Appointments",      icon: "bi-calendar3",     path: "/appointments",    color: "#1d4ed8", bg: "#eff6ff" },
                  { label: "View Job Applications",  icon: "bi-people",        path: "/career/requests", color: "#7c3aed", bg: "#f5f3ff" },
                ].map((q) => (
                  <button
                    key={q.label}
                    onClick={() => router.push(q.path)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: "#f9fafb", border: "1px solid #f3f4f6",
                      borderRadius: 10, padding: "11px 14px",
                      cursor: "pointer", textAlign: "left",
                      transition: "background 0.15s, border-color 0.15s",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = q.bg; e.currentTarget.style.borderColor = "transparent"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#f3f4f6"; }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: 9,
                      background: q.bg, display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <i className={`bi ${q.icon}`} style={{ fontSize: 16, color: q.color }} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "#374151" }}>{q.label}</span>
                    <i className="bi bi-chevron-right" style={{ fontSize: 12, color: "#d1d5db", marginLeft: "auto" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Visitor Trend Card ─────────────────────────────────────────── */}
          <div className="col-12 col-lg-4">
            <div className="card-soft" style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 16, color: "#111827" }}>Visitor Trend</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>Last 7 days</span>
              </div>

              {loading ? (
                <div className="placeholder-glow d-flex flex-column gap-2 mt-2">
                  <span className="placeholder col-12" style={{ height: 52, borderRadius: 8 }} />
                  <span className="placeholder col-12" style={{ height: 100, borderRadius: 8 }} />
                </div>
              ) : !visitors || visitors.logs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "28px 0", color: "#9ca3af" }}>
                  <i className="bi bi-bar-chart" style={{ fontSize: 28, display: "block", marginBottom: 6 }} />
                  <span style={{ fontSize: 14 }}>No visitor data yet</span>
                </div>
              ) : (
                <>
                  {/* Summary row */}
                  <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Today</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#0b6f1e" }}>
                        {visitors.logs[0]?.count ?? 0}
                      </div>
                    </div>
                    <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>This week</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#0b6f1e" }}>
                        {visitors.weeklyTotal}
                      </div>
                    </div>
                  </div>

                  {/* Bar chart */}
                  <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 14 }}>
                    <VisitorBarChart logs={visitors.logs.slice(0, 7)} />
                    {/* Day labels */}
                    <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
                      {[...visitors.logs.slice(0, 7)].reverse().map((log, i) => {
                        const d = new Date(log.date);
                        const isToday = i === 6;
                        return (
                          <div
                            key={log.date}
                            style={{
                              flex: 1, textAlign: "center",
                              fontSize: 10,
                              color: isToday ? "#0b6f1e" : "#9ca3af",
                              fontWeight: isToday ? 700 : 400,
                            }}
                          >
                            {d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2)}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Daily breakdown — last 5 days */}
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                    {visitors.logs.slice(0, 5).map((log) => {
                      const pct = Math.round((log.count / (visitors.logs[0]?.count || 1)) * 100);
                      const isToday = log.date === new Date().toISOString().split("T")[0];
                      return (
                        <div key={log.date} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 11, color: "#9ca3af", minWidth: 62 }}>
                            {isToday ? "Today" : new Date(log.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                          </span>
                          <div style={{ flex: 1, height: 5, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{
                              height: "100%",
                              width: `${Math.max(pct, 4)}%`,
                              background: isToday ? "#0b6f1e" : "#86efac",
                              borderRadius: 3,
                              transition: "width 0.5s ease",
                            }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#374151", minWidth: 22, textAlign: "right" }}>
                            {log.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}