// /* eslint-disable react-hooks/set-state-in-effect */

// "use client";
// import React, { useEffect, useState } from "react";
// import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
// import {
//   deleteMeetingRequestServ,
//   getmeetingServ,
// } from "../services/appointment.service";
// import {
//   IconCalendarCheck,
//   IconCalendarEvent,
//   IconUsers,
//   IconClock,
//   IconTrash
// } from "@tabler/icons-react";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// const AppointmentListSkeleton = () => {
//   return (
//     <SkeletonTheme
//       baseColor="#f3f4f6"
//       highlightColor="#ffffff"
//     >
//       <div className="listing-page">

//         {/* KPI Cards */}
//         <div className="kpi-grid">
//           {[1, 2, 3, 4].map((item) => (
//             <div className="kpi-card" key={item}>
//               <Skeleton circle width={52} height={52} />
//               <div style={{ flex: 1 }}>
//                 <Skeleton width={120} height={14} />
//                 <Skeleton width={80} height={28} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Header */}
//         <div className="listing-header">
//           <div>
//             <Skeleton width={180} height={28} />
//           </div>

//           <div
//             style={{
//               display: "flex",
//               gap: "12px",
//               alignItems: "center",
//             }}
//           >
//             <Skeleton width={250} height={42} />
//             <Skeleton width={120} height={42} />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="listing-table-card">
//           <div className="listing-table-wrap">
//             <table className="listing-table">
//               <thead>
//                 <tr>
//                   <th><Skeleton width={25} /></th>
//                   <th><Skeleton width={80} /></th>
//                   <th><Skeleton width={100} /></th>
//                   <th><Skeleton width={80} /></th>
//                   <th><Skeleton width={120} /></th>
//                   <th><Skeleton width={50} /></th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {Array.from({ length: 8 }).map((_, index) => (
//                   <tr key={index}>
//                     <td>
//                       <Skeleton width={20} />
//                     </td>

//                     <td>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "10px",
//                         }}
//                       >
//                         <Skeleton circle width={38} height={38} />
//                         <Skeleton width={120} />
//                       </div>
//                     </td>

//                     <td>
//                       <Skeleton width={180} />
//                     </td>

//                     <td>
//                       <Skeleton width={120} />
//                     </td>

//                     <td>
//                       <Skeleton width="90%" />
//                     </td>

//                     <td>
//                       <Skeleton circle width={32} height={32} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>
//     </SkeletonTheme>
//   );
// };


// /* helper: "Rahul Sharma" → "RS" */
// const initials = (name = "") =>
//   name
//     .trim()
//     .split(" ")
//     .slice(0, 2)
//     .map((w) => w[0]?.toUpperCase())
//     .join("");

// /* KPI config */
// const buildKpi = (appointments) => [
//   {
//     label: "Total Appointments",
//     value: appointments.length,
//     delta: "↑ 12% this month",
//     deltaClass: "",
//     icon: <IconCalendarCheck size={22} />,
//     iconClass: "",
//   },
//   {
//     label: "Today's Requests",
//     value: appointments.filter(
//       (a) =>
//         new Date(a.createdAt).toDateString() ===
//         new Date().toDateString()
//     ).length,
//     delta: "Requests today",
//     deltaClass: "warning",
//     icon: <IconCalendarEvent size={22} />,
//     iconClass: "warning",
//   },
//   {
//     label: "Unique Clients",
//     value: [...new Set(appointments.map((a) => a.email))]
//       .length,
//     delta: "↑ 8% this month",
//     deltaClass: "info",
//     icon: <IconUsers size={22} />,
//     iconClass: "info",
//   },
//   {
//     label: "Pending Requests",
//     value: appointments.length,
//     delta: "Awaiting response",
//     deltaClass: "danger",
//     icon: <IconClock size={22} />,
//     iconClass: "danger",
//   },
// ];

// const ROWS_PER_PAGE = 10;

// const Page = () => {
//   const [loading, setLoading] = useState(true);
//   const [appointments, setAppointments] = useState([]);
//   const [showConfirm, setShowConfirm]   = useState(false);
//   const [deleteId, setDeleteId]         = useState(null);
//   const [searchTerm, setSearchTerm]     = useState("");
//   const [currentPage, setCurrentPage]   = useState(1);
//   const [sortAsc, setSortAsc]           = useState(true);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await getmeetingServ();
//       setAppointments(res?.data?.data ?? []);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const handleDelete = async () => {
//     try {
//       await deleteMeetingRequestServ(deleteId);
//       setShowConfirm(false);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filtered = appointments
//   .filter((a) =>
//     a.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   )
//   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   /* Pagination */
//   const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
//   const paginated  = filtered.slice(
//     (currentPage - 1) * ROWS_PER_PAGE,
//     currentPage * ROWS_PER_PAGE
//   );

//   const goTo = (p) => {
//     if (p >= 1 && p <= totalPages) setCurrentPage(p);
//   };

//   const kpiData = buildKpi(appointments);

//   if (loading) {
//   return <AppointmentListSkeleton />;
// }

//   return (
//     <div className="listing-page">

//       {/* ── KPI Cards ── */}
//       <div className="kpi-grid">
//         {kpiData.map((item, i) => (
//           <div className="kpi-card" key={i}>
//           <div className={`kpi-icon ${item.iconClass}`}>
//   {item.icon}
// </div>
//             <div>
//               <div className="kpi-label">{item.label}</div>
//               <div className="kpi-value">{item.value}</div>
//               {/* <div className={`kpi-delta ${item.deltaClass}`}>{item.delta}</div> */}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ── Section header ── */}
//       <div className="listing-header">
//         <div className="listing-header-left">
//           <h4 className="listing-title">All Appointments</h4>
//           {filtered.length > 0 && (
//             <span className="listing-count-pill">{filtered.length} total</span>
//           )}
//         </div>

//         <div className="listing-header-right">
//           {/* Search */}
//           <div className="listing-search">
//             <i className="ti ti-search" aria-hidden="true" />
//             <input
//               type="search"
//               placeholder="Search by name…"
//               value={searchTerm}
//               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//             />
//           </div>

//           {/* Export button (optional) */}
//           <button className="btn-listing-action">
//             <i className="ti ti-download" aria-hidden="true" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* ── Table card ── */}
//       <div className="listing-table-card">
//         <div className="listing-table-wrap">
//           <table className="listing-table">
//             <thead>
//               <tr>
//                 <th style={{ width: 52, textAlign: "center" }}>Sr.</th>

//                 <th
//                   className="sortable"
//                   onClick={() => { setSortAsc(!sortAsc); setCurrentPage(1); }}
//                 >
//                   <div className="th-inner">
//                     Name
//                     <i
//                       className={`ti ${sortAsc ? "ti-arrow-up" : "ti-arrow-down"}`}
//                       aria-hidden="true"
//                     />
//                   </div>
//                 </th>

//                 <th><div className="th-inner">Email</div></th>
//                 <th><div className="th-inner">Phone</div></th>
//                 <th><div className="th-inner">Message</div></th>
//                 <th style={{ width: 80, textAlign: "center" }}>
//                   <div className="th-inner" style={{ justifyContent: "center" }}>
//                     Action
//                   </div>
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan={6}>
//                     <div className="listing-empty">
//                       <i className="ti ti-calendar-off" aria-hidden="true" />
//                       <strong>No appointments found</strong>
//                       <p>
//                         {searchTerm
//                           ? `No results for "${searchTerm}"`
//                           : "No appointments have been added yet."}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((item, idx) => (
//                   <tr key={item._id}>
//                     {/* Sr */}
//                     <td className="cell-sr">
//                       {(currentPage - 1) * ROWS_PER_PAGE + idx + 1}
//                     </td>

//                     {/* Name */}
//                     <td>
//                       <div className="cell-name">
//                         <span className="row-avatar">{initials(item.name)}</span>
//                         <span className="cell-name-text">{item.name}</span>
//                       </div>
//                     </td>

//                     {/* Email */}
//                     <td className="cell-email">{item.email}</td>

//                     {/* Phone */}
//                     <td className="cell-phone">{item.phone}</td>

//                     {/* Message */}
//                     <td className="cell-muted">{item.message}</td>

//                     {/* Action */}
//                     <td>
//                       <div className="action-cell">
//                         <button
//                           className="btn-row-delete"
//                           title="Delete appointment"
//                           onClick={() => {
//                             setDeleteId(item._id);
//                             setShowConfirm(true);
//                           }}
//                         >
//                           {/* <i className="ti ti-trash" aria-hidden="true" /> */}
//                             <IconTrash size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ── Pagination ── */}
//         {filtered.length > ROWS_PER_PAGE && (
//           <div className="listing-pagination">
//             <span>
//               Showing {Math.min((currentPage - 1) * ROWS_PER_PAGE + 1, filtered.length)}–
//               {Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of {filtered.length} results
//             </span>

//             <div className="pg-btns">
//               {/* Prev */}
//               <button
//                 className={`pg-btn ${currentPage === 1 ? "disabled" : ""}`}
//                 onClick={() => goTo(currentPage - 1)}
//                 aria-label="Previous page"
//               >
//                 <i className="ti ti-chevron-left" style={{ fontSize: 13 }} aria-hidden="true" />
//               </button>

//               {/* Page numbers */}
//               {Array.from({ length: totalPages }, (_, i) => i + 1)
//                 .filter(
//                   (p) =>
//                     p === 1 ||
//                     p === totalPages ||
//                     Math.abs(p - currentPage) <= 1
//                 )
//                 .reduce((acc, p, i, arr) => {
//                   if (i > 0 && p - arr[i - 1] > 1)
//                     acc.push("…");
//                   acc.push(p);
//                   return acc;
//                 }, [])
//                 .map((p, i) =>
//                   p === "…" ? (
//                     <span key={`ellipsis-${i}`} className="pg-btn disabled">…</span>
//                   ) : (
//                     <button
//                       key={p}
//                       className={`pg-btn ${currentPage === p ? "active" : ""}`}
//                       onClick={() => goTo(p)}
//                     >
//                       {p}
//                     </button>
//                   )
//                 )}

//               {/* Next */}
//               <button
//                 className={`pg-btn ${currentPage === totalPages ? "disabled" : ""}`}
//                 onClick={() => goTo(currentPage + 1)}
//                 aria-label="Next page"
//               >
//                 <i className="ti ti-chevron-right" style={{ fontSize: 13 }} aria-hidden="true" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Confirm delete modal ── */}
//       <ConfirmDeleteModal
//         show={showConfirm}
//         handleClose={() => setShowConfirm(false)}
//         handleConfirm={handleDelete}
//         title="Delete Appointment"
//         body="Do you really want to delete this appointment? This action cannot be undone."
//       />
//     </div>
//   );
// };

// export default Page;



/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import {
  deleteMeetingRequestServ,
  getmeetingServ,
} from "../services/appointment.service";
import {
  IconCalendarCheck,
  IconCalendarEvent,
  IconUsers,
  IconClock,
  IconTrash,
  IconEye,
  IconX,
  IconMail,
  IconPhone,
  IconMessage,
} from "@tabler/icons-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* ─────────────────────────────────────────
   Skeleton
───────────────────────────────────────── */
const AppointmentListSkeleton = () => (
  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#ffffff">
    <div className="listing-page">
      {/* KPI Cards */}
      <div className="kpi-grid">
        {[1, 2, 3, 4].map((item) => (
          <div className="kpi-card" key={item}>
            <Skeleton circle width={52} height={52} />
            <div style={{ flex: 1 }}>
              <Skeleton width={120} height={14} />
              <Skeleton width={80} height={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="listing-header">
        <div>
          <Skeleton width={180} height={28} />
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Skeleton width={250} height={42} />
          <Skeleton width={120} height={42} />
        </div>
      </div>

      {/* Table */}
      <div className="listing-table-card">
        <div className="listing-table-wrap">
          <table className="listing-table">
            <thead>
              <tr>
                <th><Skeleton width={25} /></th>
                <th><Skeleton width={80} /></th>
                <th><Skeleton width={100} /></th>
                <th><Skeleton width={80} /></th>
                <th><Skeleton width={110} /></th>
                <th><Skeleton width={80} /></th>
                <th><Skeleton width={60} /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, index) => (
                <tr key={index}>
                  <td><Skeleton width={20} /></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Skeleton circle width={38} height={38} />
                      <Skeleton width={120} />
                    </div>
                  </td>
                  <td><Skeleton width={180} /></td>
                  <td><Skeleton width={120} /></td>
                  <td><Skeleton width={130} /></td>
                  <td><Skeleton width="90%" /></td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                      <Skeleton width={32} height={32} />
                      <Skeleton circle width={32} height={32} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const initials = (name = "") =>
  name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const formatDate = (dateStr, opts = {}) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    ...opts,
  });
};

/* ─────────────────────────────────────────
   KPI config
───────────────────────────────────────── */
const buildKpi = (appointments) => [
  {
    label: "Total Appointments",
    value: appointments.length,
    icon: <IconCalendarCheck size={22} />,
    iconClass: "",
  },
  {
    label: "Today's Requests",
    value: appointments.filter(
      (a) => new Date(a.createdAt).toDateString() === new Date().toDateString()
    ).length,
    icon: <IconCalendarEvent size={22} />,
    iconClass: "warning",
  },
  {
    label: "Unique Clients",
    value: [...new Set(appointments.map((a) => a.email))].length,
    icon: <IconUsers size={22} />,
    iconClass: "info",
  },
  {
    label: "Pending Requests",
    value: appointments.length,
    icon: <IconClock size={22} />,
    iconClass: "danger",
  },
];

/* ─────────────────────────────────────────
   View Detail Modal
───────────────────────────────────────── */
const AppointmentDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="appt-modal-overlay" onClick={onClose}>
      <div
        className="appt-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appt-modal-title"
      >
        {/* Header */}
        <div className="appt-modal-header">
          <span id="appt-modal-title" className="appt-modal-title">
            Appointment Details
          </span>
          <button
            className="appt-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="appt-modal-body">
          {/* Avatar + name row */}
          <div className="appt-modal-avatar-row">
            <span className="appt-modal-avatar">{initials(item.name)}</span>
            <div>
              <p className="appt-modal-name">{item.name}</p>
              <p className="appt-modal-date-sub">
                Request received on {formatDate(item.createdAt)}
              </p>
            </div>
          </div>

          {/* Detail rows */}
          <div className="appt-modal-detail-grid">
            <div className="appt-modal-detail-row">
              <div className="appt-modal-detail-icon">
                <IconMail size={16} />
              </div>
              <div>
                <p className="appt-modal-detail-label">Email</p>
                <p className="appt-modal-detail-val">{item.email || "—"}</p>
              </div>
            </div>

            <div className="appt-modal-detail-row">
              <div className="appt-modal-detail-icon">
                <IconPhone size={16} />
              </div>
              <div>
                <p className="appt-modal-detail-label">Phone</p>
                <p className="appt-modal-detail-val">{item.phone || "—"}</p>
              </div>
            </div>

            <div className="appt-modal-detail-row">
              <div className="appt-modal-detail-icon">
                <IconCalendarEvent size={16} />
              </div>
              <div>
                <p className="appt-modal-detail-label">Request Date</p>
                <p className="appt-modal-detail-val">
                  {formatDate(item.createdAt, { month: "long" })}
                </p>
              </div>
            </div>

            {item.message && (
              <div className="appt-modal-detail-row">
                <div className="appt-modal-detail-icon">
                  <IconMessage size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <p className="appt-modal-detail-label">Message</p>
                  <div className="appt-modal-msg-box">{item.message}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const ROWS_PER_PAGE = 10;

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
const Page = () => {
  const [loading, setLoading]       = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [deleteId, setDeleteId]         = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortAsc, setSortAsc]           = useState(true);
  const [viewItem, setViewItem]         = useState(null); // for detail modal

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getmeetingServ();
      setAppointments(res?.data?.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    try {
      await deleteMeetingRequestServ(deleteId);
      setShowConfirm(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = appointments
    .filter((a) =>
      a.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated  = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const goTo = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  const kpiData = buildKpi(appointments);

  if (loading) return <AppointmentListSkeleton />;

  return (
    <div className="listing-page">

      {/* ── KPI Cards ── */}
      <div className="kpi-grid">
        {kpiData.map((item, i) => (
          <div className="kpi-card" key={i}>
            <div className={`kpi-icon ${item.iconClass}`}>{item.icon}</div>
            <div>
              <div className="kpi-label">{item.label}</div>
              <div className="kpi-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Section header ── */}
      <div className="listing-header">
        <div className="listing-header-left">
          <h4 className="listing-title">All Appointments</h4>
          {filtered.length > 0 && (
            <span className="listing-count-pill">{filtered.length} total</span>
          )}
        </div>

        <div className="listing-header-right">
          {/* Search */}
          <div className="listing-search">
            <i className="ti ti-search" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by name…"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Export */}
          <button className="btn-listing-action">
            <i className="ti ti-download" aria-hidden="true" />
            Export
          </button>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="listing-table-card">
        <div className="listing-table-wrap">
          <table className="listing-table">
            <thead>
              <tr>
                <th style={{ width: 52, textAlign: "center" }}>Sr.</th>

                <th
                  className="sortable"
                  onClick={() => { setSortAsc(!sortAsc); setCurrentPage(1); }}
                >
                  <div className="th-inner">
                    Name
                    <i
                      className={`ti ${sortAsc ? "ti-arrow-up" : "ti-arrow-down"}`}
                      aria-hidden="true"
                    />
                  </div>
                </th>

                <th><div className="th-inner">Email</div></th>
                <th><div className="th-inner">Phone</div></th>

                {/* ── NEW: Date column ── */}
                <th>
                  <div className="th-inner">Date</div>
                </th>

                <th><div className="th-inner">Message</div></th>

                <th style={{ width: 100, textAlign: "center" }}>
                  <div className="th-inner" style={{ justifyContent: "center" }}>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="listing-empty">
                      <i className="ti ti-calendar-off" aria-hidden="true" />
                      <strong>No appointments found</strong>
                      <p>
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "No appointments have been added yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((item, idx) => (
                  <tr key={item._id}>
                    {/* Sr */}
                    <td className="cell-sr">
                      {(currentPage - 1) * ROWS_PER_PAGE + idx + 1}
                    </td>

                    {/* Name */}
                    <td>
                      <div className="cell-name">
                        <span className="row-avatar">{initials(item.name)}</span>
                        <span className="cell-name-text">{item.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="cell-email">{item.email}</td>

                    {/* Phone */}
                    <td className="cell-phone">{item.phone}</td>

                    {/* ── NEW: Date cell ── */}
                    <td className="cell-date" style={{ whiteSpace: "nowrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <i
                          className="ti ti-calendar"
                          style={{ fontSize: 13, opacity: 0.5 }}
                          aria-hidden="true"
                        />
                        {formatDate(item.createdAt)}
                      </span>
                    </td>

                    {/* Message */}
                    <td className="cell-muted">{item.message}</td>

                    {/* Actions */}
                    <td>
                      <div className="action-cell" style={{ gap: 6 }}>
                        {/* View */}
                        <button
                          className="btn-row-view"
                          title="View details"
                          onClick={() => setViewItem(item)}
                        >
                          <IconEye size={17} />
                        </button>

                        {/* Delete */}
                        <button
                          className="btn-row-delete"
                          title="Delete appointment"
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowConfirm(true);
                          }}
                        >
                          <IconTrash size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {filtered.length > ROWS_PER_PAGE && (
          <div className="listing-pagination">
            <span>
              Showing {Math.min((currentPage - 1) * ROWS_PER_PAGE + 1, filtered.length)}–
              {Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of {filtered.length} results
            </span>

            <div className="pg-btns">
              {/* Prev */}
              <button
                className={`pg-btn ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => goTo(currentPage - 1)}
                aria-label="Previous page"
              >
                <i className="ti ti-chevron-left" style={{ fontSize: 13 }} aria-hidden="true" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1
                )
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className="pg-btn disabled">…</span>
                  ) : (
                    <button
                      key={p}
                      className={`pg-btn ${currentPage === p ? "active" : ""}`}
                      onClick={() => goTo(p)}
                    >
                      {p}
                    </button>
                  )
                )}

              {/* Next */}
              <button
                className={`pg-btn ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => goTo(currentPage + 1)}
                aria-label="Next page"
              >
                <i className="ti ti-chevron-right" style={{ fontSize: 13 }} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Confirm Delete Modal ── */}
      <ConfirmDeleteModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        handleConfirm={handleDelete}
        title="Delete Appointment"
        body="Do you really want to delete this appointment? This action cannot be undone."
      />

      {/* ── Appointment Detail Modal ── */}
      <AppointmentDetailModal
        item={viewItem}
        onClose={() => setViewItem(null)}
      />
    </div>
  );
};

export default Page;