

// "use client";
// import React, { useEffect, useState } from "react";
// import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
// import {
//   deleteContactRequestServ,
//   getContactRequestServ,
// } from "../services/appointment.service";

// const kpiData = [
//   {
//     title: "Total Contacts",
//     value: "1,245",
//     delta: "+5.2% this month",
//     icon: "bi-journal-text",
//   },
//   {
//     title: "Active Requests",
//     value: "872",
//     delta: "+3.8% this month",
//     icon: "bi-check2-circle",
//   },
//   {
//     title: "Pending",
//     value: "234",
//     delta: "+6.1% this month",
//     icon: "bi-dash-circle",
//   },
//   {
//     title: "Total Users",
//     value: "1,032",
//     delta: "+4.5% this month",
//     icon: "bi-people",
//   },
// ];

// // helper: Rahul Sharma → RS
// const initials = (name = "") =>
//   name
//     .trim()
//     .split(" ")
//     .slice(0, 2)
//     .map((w) => w[0]?.toUpperCase())
//     .join("");

// const Page = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const getContactRequest = async () => {
//     try {
//       const res = await getContactRequestServ();
//       setAppointments(res?.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getContactRequest();
//   }, []);

//   const handleDeleteFunc = async () => {
//     try {
//       await deleteContactRequestServ(deleteId);
//       setShowConfirm(false);
//       getContactRequest();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const filtered = appointments.filter((a) =>
//     a.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

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
//               <div className="kpi-delta">
//                 ↑ {item.delta}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Header */}
//       <div className="listing-header">
//         <h4 className="listing-title">
//           All Contact Requests
//         </h4>

//         <div className="listing-search">
//           <span className="input-group-text">
//             <i className="bi bi-search" />
//           </span>

//           <input
//             type="search"
//             className="form-control"
//             placeholder="Search by name..."
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
//                 <th
//                   className="text-center"
//                   style={{ width: 60 }}
//                 >
//                   Sr.
//                 </th>

//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Message</th>

//                 <th
//                   className="text-center"
//                   style={{ width: 80 }}
//                 >
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan="6">
//                     <div className="listing-empty">
//                       <i className="bi bi-inbox" />
//                       No contact requests found
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((item, index) => (
//                   <tr key={item._id}>
//                     <td
//                       className="text-center text-secondary"
//                       style={{ fontSize: 13 }}
//                     >
//                       {index + 1}
//                     </td>

//                     <td>
//                       <span className="row-avatar">
//                         {initials(item.name)}
//                       </span>

//                       <span
//                         style={{
//                           fontWeight: 500,
//                           color: "#111827",
//                         }}
//                       >
//                         {item.name}
//                       </span>
//                     </td>

//                     <td style={{ color: "#4b5563" }}>
//                       {item.email}
//                     </td>

//                     <td
//                       style={{
//                         fontFamily: "monospace",
//                         fontSize: 14,
//                       }}
//                     >
//                       {item.phone}
//                     </td>

//                     <td
//                       style={{
//                         color: "#6b7280",
//                         fontSize: 14,
//                         maxWidth: 220,
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {item.message}
//                     </td>

//                     <td className="text-center">
//                       <button
//                         className="btn-row-delete"
//                         onClick={() => {
//                           setDeleteId(item._id);
//                           setShowConfirm(true);
//                         }}
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

//       {/* Delete Modal */}
//       <ConfirmDeleteModal
//         show={showConfirm}
//         handleClose={() => setShowConfirm(false)}
//         handleConfirm={handleDeleteFunc}
//         title="Delete Contact Request"
//         body="Do you really want to delete this contact request?"
//       />
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { useEffect, useState } from "react";
import {
  IconAddressBook,
  IconCircleCheck,
  IconCircleDashed,
  IconUsers,
  IconSearch,
  IconDownload,
  IconTrash,
  IconInbox,
  IconArrowUp,
  IconArrowDown,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconX,
  IconMail,
  IconPhone,
  IconCalendarEvent,
  IconMessage,
} from "@tabler/icons-react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import {
  deleteContactRequestServ,
  getContactRequestServ,
} from "../services/appointment.service";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* ─────────────────────────────────────────
   Skeleton
───────────────────────────────────────── */
const AppointmentListSkeleton = () => (
  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#ffffff">
    <div className="listing-page">
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

      <div className="listing-header">
        <div>
          <Skeleton width={180} height={28} />
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Skeleton width={250} height={42} />
          <Skeleton width={120} height={42} />
        </div>
      </div>

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
                <th><Skeleton width={120} /></th>
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
const buildKpi = (data) => [
  {
    label: "Total Contacts",
    value: data.length || 0,
    icon: <IconAddressBook size={20} stroke={1.8} />,
    iconClass: "",
  },
  {
    label: "Active Requests",
    value: data.filter((d) => d.status === "active").length || data.length || 0,
    icon: <IconCircleCheck size={20} stroke={1.8} />,
    iconClass: "info",
  },
  {
    label: "Pending",
    value: data.filter((d) => d.status === "pending").length || 0,
    icon: <IconCircleDashed size={20} stroke={1.8} />,
    iconClass: "warning",
  },
  {
    label: "Total Users",
    value: [...new Set(data.map((d) => d.email))].length || 0,
    icon: <IconUsers size={20} stroke={1.8} />,
    iconClass: "info",
  },
];

/* ─────────────────────────────────────────
   Contact Detail Modal
───────────────────────────────────────── */
const ContactDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="appt-modal-overlay" onClick={onClose}>
      <div
        className="appt-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Header */}
        <div className="appt-modal-header">
          <span id="contact-modal-title" className="appt-modal-title">
            Contact Request Details
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
          {/* Avatar + name */}
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

            <div className="appt-modal-detail-row">
              <div className="appt-modal-detail-icon">
                <IconMessage size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="appt-modal-detail-label">Message</p>
                <div className="appt-modal-msg-box">
                  {item.message?.trim() ? item.message : <span style={{ color: "#aaa", fontStyle: "italic" }}>No message provided</span>}
                </div>
              </div>
            </div>
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
  const [contacts, setContacts]       = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId]       = useState(null);
  const [searchTerm, setSearchTerm]   = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc]         = useState(true);
  const [loading, setLoading]         = useState(true);
  const [viewItem, setViewItem]       = useState(null); // for detail modal

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getContactRequestServ();
      setContacts(res?.data?.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    try {
      await deleteContactRequestServ(deleteId);
      setShowConfirm(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = contacts
    .filter((a) =>
      a.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? a.name?.localeCompare(b.name)
        : b.name?.localeCompare(a.name)
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

  const kpiData = buildKpi(contacts);

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
          <h4 className="listing-title">All Contact Requests</h4>
          {filtered.length > 0 && (
            <span className="listing-count-pill">{filtered.length} total</span>
          )}
        </div>

        <div className="listing-header-right">
          <div className="listing-search">
            <IconSearch size={15} stroke={1.8} color="#9ca3af" style={{ flexShrink: 0, marginLeft: 9 }} />
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

          <button className="btn-listing-action">
            <IconDownload size={14} stroke={1.8} />
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
                    {sortAsc
                      ? <IconArrowUp size={11} stroke={2} style={{ color: "#0b6f1e" }} />
                      : <IconArrowDown size={11} stroke={2} style={{ color: "#0b6f1e" }} />
                    }
                  </div>
                </th>

                <th><div className="th-inner">Email</div></th>
                <th><div className="th-inner">Phone</div></th>

                {/* ── Date column ── */}
                <th><div className="th-inner">Date</div></th>

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
                      <IconInbox size={36} stroke={1.5} color="#d1e8d4" style={{ display: "block", margin: "0 auto 10px" }} />
                      <strong>No contact requests found</strong>
                      <p>
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "No contact requests have been submitted yet."}
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

                    {/* ── Date cell ── */}
                    <td className="cell-date" style={{ whiteSpace: "nowrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <IconCalendarEvent size={13} stroke={1.8} style={{ opacity: 0.45, flexShrink: 0 }} />
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
                          <IconEye size={17} stroke={1.8} />
                        </button>

                        {/* Delete */}
                        <button
                          className="btn-row-delete"
                          title="Delete contact request"
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowConfirm(true);
                          }}
                        >
                          <IconTrash size={17} stroke={1.8} />
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
              Showing{" "}
              {Math.min((currentPage - 1) * ROWS_PER_PAGE + 1, filtered.length)}–
              {Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length} results
            </span>

            <div className="pg-btns">
              <button
                className={`pg-btn ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => goTo(currentPage - 1)}
                aria-label="Previous page"
              >
                <IconChevronLeft size={13} stroke={2} />
              </button>

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
                    <span key={`e-${i}`} className="pg-btn disabled">…</span>
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

              <button
                className={`pg-btn ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => goTo(currentPage + 1)}
                aria-label="Next page"
              >
                <IconChevronRight size={13} stroke={2} />
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
        title="Delete Contact Request"
        body="Do you really want to delete this contact request? This action cannot be undone."
      />

      {/* ── Contact Detail Modal ── */}
      <ContactDetailModal
        item={viewItem}
        onClose={() => setViewItem(null)}
      />
    </div>
  );
};

export default Page;