/* eslint-disable react-hooks/set-state-in-effect */


// "use client";
// import React, { useEffect, useState } from "react";
// import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
// import { deleteMeetingRequestServ, getmeetingServ } from "../services/appointment.service";



// // helper: "Rahul Sharma" → "RS"
// const initials = (name = "") =>
//   name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

// const Page = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [showConfirm, setShowConfirm]   = useState(false);
//   const [deleteId, setDeleteId]         = useState(null);
//   const [searchTerm, setSearchTerm]     = useState("");

//   const getContactRequest = async () => {
//     try {
//       const res = await getmeetingServ();
//       setAppointments(res?.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { getContactRequest(); }, []);

//   const handleDeleteFunc = async () => {
//     try {
//       await deleteMeetingRequestServ(deleteId);
//       setShowConfirm(false);
//       getContactRequest();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filtered = appointments.filter((a) =>
//     a.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const kpiData = [
//   {
//     title: "Total Appointments",
//     value: appointments.length || "0",
//     delta: "+12% this month",
//     icon: "bi-calendar-check",
//   },

//   {
//     title: "Today's Requests",
//     value:
//       appointments.filter((item) => {
//         const today = new Date().toDateString();

//         return (
//           new Date(item.createdAt).toDateString() ===
//           today
//         );
//       }).length || "0",

//     delta: "+5 today",
//     icon: "bi-calendar-day",
//   },

//   {
//     title: "Unique Clients",
//     value:
//       [
//         ...new Set(
//           appointments.map((item) => item.email)
//         ),
//       ].length || "0",

//     delta: "+8% this month",
//     icon: "bi-people",
//   },

//   {
//     title: "Pending Requests",
//     value: appointments.length || "0",
//     delta: "Awaiting response",
//     icon: "bi-hourglass-split",
//   },
// ];

//   return (
//     <div className="listing-page">

//       {/* KPI Cards */}
//       <div className="kpi-grid">
//         {kpiData.map((item, i) => (
//           <div className="kpi-card" key={i}>
//             <div className="kpi-icon">
//               <i className={`bi ${item.icon}`} />
//             </div>
//             <div>
//               <div className="kpi-label">{item.title}</div>
//               <div className="kpi-value">{item.value}</div>
//               <div className="kpi-delta">↑ {item.delta}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Section header */}
//       <div className="listing-header">
//         <h4 className="listing-title">All Appointments</h4>
//         <div className="listing-search">
//           <span className="input-group-text">
//             <i className="bi bi-search" />
//           </span>
//           <input
//             type="search"
//             className="form-control"
//             placeholder="Search by name…"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="listing-table-card">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead>
//               <tr>
//                 <th className="text-center" style={{ width: 60 }}>Sr.</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Message</th>
//                 <th className="text-center" style={{ width: 80 }}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan="6">
//                     <div className="listing-empty">
//                       <i className="bi bi-calendar-x" />
//                       No appointments found
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((item, index) => (
//                   <tr key={item._id}>
//                     <td className="text-center text-secondary"
//                         style={{ fontSize: 13 }}>{index + 1}</td>
//                     <td>
//                       <span className="row-avatar">{initials(item.name)}</span>
//                       <span style={{ fontWeight: 500, color: "#111827" }}>{item.name}</span>
//                     </td>
//                     <td style={{ color: "#4b5563" }}>{item.email}</td>
//                     <td style={{ fontFamily: "monospace", fontSize: 14 }}>{item.phone}</td>
//                     <td style={{
//                       color: "#6b7280", fontSize: 14,
//                       maxWidth: 220, whiteSpace: "nowrap",
//                       overflow: "hidden", textOverflow: "ellipsis"
//                     }}>{item.message}</td>
//                     <td className="text-center">
//                       <button
//                         className="btn-row-delete"
//                         onClick={() => { setDeleteId(item._id); setShowConfirm(true); }}
//                       >
//                         <i className="bi bi-trash" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Confirm delete modal */}
//       <ConfirmDeleteModal
//         show={showConfirm}
//         handleClose={() => setShowConfirm(false)}
//         handleConfirm={handleDeleteFunc}
//         title="Delete Appointment"
//         body="Do you really want to delete this appointment?"
//       />
//     </div>
//   );
// };

// export default Page;

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
  IconTrash
} from "@tabler/icons-react";

/* helper: "Rahul Sharma" → "RS" */
const initials = (name = "") =>
  name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/* KPI config */
const buildKpi = (appointments) => [
  {
    label: "Total Appointments",
    value: appointments.length,
    delta: "↑ 12% this month",
    deltaClass: "",
    icon: <IconCalendarCheck size={22} />,
    iconClass: "",
  },
  {
    label: "Today's Requests",
    value: appointments.filter(
      (a) =>
        new Date(a.createdAt).toDateString() ===
        new Date().toDateString()
    ).length,
    delta: "Requests today",
    deltaClass: "warning",
    icon: <IconCalendarEvent size={22} />,
    iconClass: "warning",
  },
  {
    label: "Unique Clients",
    value: [...new Set(appointments.map((a) => a.email))]
      .length,
    delta: "↑ 8% this month",
    deltaClass: "info",
    icon: <IconUsers size={22} />,
    iconClass: "info",
  },
  {
    label: "Pending Requests",
    value: appointments.length,
    delta: "Awaiting response",
    deltaClass: "danger",
    icon: <IconClock size={22} />,
    iconClass: "danger",
  },
];

const ROWS_PER_PAGE = 10;

const Page = () => {
  const [appointments, setAppointments] = useState([]);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [deleteId, setDeleteId]         = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortAsc, setSortAsc]           = useState(true);

  const fetchData = async () => {
    try {
      const res = await getmeetingServ();
      setAppointments(res?.data?.data ?? []);
    } catch (err) {
      console.error(err);
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

  /* Filter + sort */
  // const filtered = appointments
  //   .filter((a) =>
  //     a.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .sort((a, b) =>
  //     sortAsc
  //       ? a.name?.localeCompare(b.name)
  //       : b.name?.localeCompare(a.name)
  //   );

  const filtered = appointments
  .filter((a) =>
    a.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

  return (
    <div className="listing-page">

      {/* ── KPI Cards ── */}
      <div className="kpi-grid">
        {kpiData.map((item, i) => (
          <div className="kpi-card" key={i}>
          <div className={`kpi-icon ${item.iconClass}`}>
  {item.icon}
</div>
            <div>
              <div className="kpi-label">{item.label}</div>
              <div className="kpi-value">{item.value}</div>
              {/* <div className={`kpi-delta ${item.deltaClass}`}>{item.delta}</div> */}
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
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* Export button (optional) */}
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
                <th><div className="th-inner">Message</div></th>
                <th style={{ width: 80, textAlign: "center" }}>
                  <div className="th-inner" style={{ justifyContent: "center" }}>
                    Action
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6}>
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

                    {/* Message */}
                    <td className="cell-muted">{item.message}</td>

                    {/* Action */}
                    <td>
                      <div className="action-cell">
                        <button
                          className="btn-row-delete"
                          title="Delete appointment"
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowConfirm(true);
                          }}
                        >
                          {/* <i className="ti ti-trash" aria-hidden="true" /> */}
                            <IconTrash size={18} />
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
                  if (i > 0 && p - arr[i - 1] > 1)
                    acc.push("…");
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

      {/* ── Confirm delete modal ── */}
      <ConfirmDeleteModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        handleConfirm={handleDelete}
        title="Delete Appointment"
        body="Do you really want to delete this appointment? This action cannot be undone."
      />
    </div>
  );
};

export default Page;