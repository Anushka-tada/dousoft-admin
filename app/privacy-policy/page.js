// /* eslint-disable react-hooks/set-state-in-effect */
// "use client";
// import React, { useEffect, useState } from "react";
// import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
// import { useRouter } from "next/navigation";
// import { deleteBlogServ, getBlogsServ } from "../services/blog.service";
// import { deletePolicyServ, getPolicyServ } from "../services/policy.service";

// const Page = () => {
//   const router = useRouter();

//   const [policies, setPolicies] = useState([]);
//   const [allPolicies, setAllPolicies] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [label, setLabel] = useState("All Status");

//   // 🔹 Fetch Policies
//   const fetchPolicies = async () => {
//     try {
//       const res = await getPolicyServ(); 
//       setPolicies(res?.data?.data || []);
//       setAllPolicies(res?.data?.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // 🔹 KPI Data
//   const kpiData = [
//     {
//       title: "Total Policies",
//       value: policies.length,
//       icon: "bi-file-text",
//     },
//     {
//       title: "Active",
//       value: policies.filter(p => p.status === "active").length,
//       icon: "bi-check-circle",
//     },
//     {
//       title: "Inactive",
//       value: policies.filter(p => p.status === "inactive").length,
//       icon: "bi-x-circle",
//     },
//   ];

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   // 🔥 Delete Policy
//   const handleDeleteFunc = async () => {
//     try {
//       await deletePolicyServ(deleteId); // 👉 change later
//       setShowConfirm(false);
//       fetchPolicies();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 🔹 Status Filter
//   const handleStatusFilter = (status) => {
//     setLabel(status);
//     setOpen(false);

//     if (status === "All") {
//       setPolicies(allPolicies);
//     } else {
//       setPolicies(
//         allPolicies.filter(
//           (item) => item.status.toLowerCase() === status.toLowerCase()
//         )
//       );
//     }
//   };

//   // 🔍 Search Filter
//   const filteredPolicies = policies.filter((item) =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       {/* KPI Section */}
//       <div className="container-fluid main-content-box py-3">
//         <div className="container maxw-1400">
//           <div className="row g-3">
//             {kpiData.map((item, index) => (
//               <div className="col-12 col-sm-6 col-lg-4" key={index}>
//                 <div className="card-soft p-4 kpi">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="icon">
//                       <i className={`bi ${item.icon}`} />
//                     </span>
//                     <div>
//                       <div className="small">{item.title}</div>
//                       <div className="value">{item.value}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="container-fluid user-table py-3">
//         <div className="d-flex justify-content-between align-items-center my-4">
//           <h4 className="mb-0">Privacy Policies</h4>

//           <div className="d-flex align-items-center">
//             {/* Search */}
//             <input
//               type="search"
//               className="form-control me-2"
//               placeholder="Search title"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             {/* Status Filter */}
//             <div className="dropdown me-2">
//               <button
//                 className="btn btn-light dropdown-toggle border"
//                 onClick={() => setOpen(!open)}
//               >
//                 {label}
//               </button>
//               {open && (
//                 <ul className="dropdown-menu show">
//                   {["All", "Active", "Inactive"].map((item) => (
//                     <li key={item}>
//                       <button
//                         className="dropdown-item"
//                         onClick={() => handleStatusFilter(item)}
//                       >
//                         {item}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <button
//               className="btn bgThemePrimary"
//               onClick={() => router.push("/privacy-policy/create")}
//             >
//               + Add Policy
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="card shadow-sm">
//           <div className="table-responsive">
//             <table className="table table-hover">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Title</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                   <th className="text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredPolicies.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="text-center">
//                       No data found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredPolicies.map((item, index) => (
//                     <tr key={item._id}>
//                       <td>{index + 1}</td>
//                       <td>{item.title}</td>
//                       <td>
//                         {new Date(item.createdAt).toLocaleDateString("en-IN")}
//                       </td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             item.status === "active"
//                               ? "bg-success"
//                               : "bg-secondary"
//                           }`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                       <td className="text-center">
//                         <button
//                           className="btn btn-sm btn-primary me-2"
//                           onClick={() =>
//                             router.push(`/privacy-policy/update/${item._id}`)
//                           }
//                         >
//                           Edit
//                         </button>

//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => {
//                             setDeleteId(item._id);
//                             setShowConfirm(true);
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Delete Modal */}
//         <ConfirmDeleteModal
//           show={showConfirm}
//           handleClose={() => setShowConfirm(false)}
//           handleConfirm={handleDeleteFunc}
//           title="Delete Policy"
//           body="Do you really want to delete this policy?"
//         />
//       </div>
//     </>
//   );
// };

// export default Page;

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState, useRef } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { useRouter } from "next/navigation";
import { deletePolicyServ, getPolicyServ } from "../services/policy.service";
import {
  IconFileDescription,
  IconCircleCheck,
  IconCircleX,
  IconRefresh,
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconChevronUp,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconPencil,
  IconTrash,
  IconEye,
  IconX,
  IconCalendarEvent,
  IconTag,
  IconAlignLeft,
} from "@tabler/icons-react";
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
        <div><Skeleton width={180} height={28} /></div>
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
                <th><Skeleton width={120} /></th>
                <th><Skeleton width={50} /></th>
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
                  <td><Skeleton width="90%" /></td>
                  <td><Skeleton circle width={32} height={32} /></td>
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
  name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

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

/* Strip HTML tags for plain text preview */
const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

/* ─────────────────────────────────────────
   KPI config
───────────────────────────────────────── */
const buildKpi = (allPolicies) => [
  {
    label: "Total Policies",
    value: allPolicies.length,
    icon: <IconFileDescription size={22} />,
    iconClass: "",
  },
  {
    label: "Active Policies",
    value: allPolicies.filter((p) => p.status === "active").length,
    icon: <IconCircleCheck size={22} />,
    iconClass: "",
  },
  {
    label: "Inactive Policies",
    value: allPolicies.filter((p) => p.status === "inactive").length,
    icon: <IconCircleX size={22} />,
    iconClass: "danger",
  },
  {
    label: "Recently Updated",
    value: allPolicies.filter((p) => {
      const diff = new Date() - new Date(p.updatedAt || p.createdAt);
      return diff / (1000 * 60 * 60 * 24) <= 30;
    }).length,
    icon: <IconRefresh size={22} />,
    iconClass: "info",
  },
];

/* ─────────────────────────────────────────
   Policy Detail Modal
───────────────────────────────────────── */
const PolicyDetailModal = ({ item, onClose, onEdit }) => {
  if (!item) return null;

  const contentPreview = stripHtml(item.content || item.description || "");

  return (
    <div className="appt-modal-overlay" onClick={onClose}>
      <div
        className="appt-modal-card"
        style={{ width: 570 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
      >
        {/* Header */}
        <div className="appt-modal-header">
          <span id="policy-modal-title" className="appt-modal-title">
            Policy Details
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              className="btn-row-edit"
              title="Edit policy"
              style={{ width: 32, height: 32 }}
              onClick={() => onEdit(item._id)}
            >
              <IconPencil size={15} />
            </button>
            <button
              className="appt-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <IconX size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="appt-modal-body">
          {/* Icon + title row */}
          <div className="appt-modal-avatar-row">
            <span className="appt-modal-avatar">{initials(item.title)}</span>
            <div>
              <p className="appt-modal-name">{item.title}</p>
              <p className="appt-modal-date-sub">
                Created on {formatDate(item.createdAt)}
              </p>
            </div>
          </div>

          {/* Detail rows */}
          <div className="appt-modal-detail-grid">
            {/* Status */}
            <div className="appt-modal-detail-row">
              <div className="appt-modal-detail-icon">
                <IconTag size={16} />
              </div>
              <div>
                <p className="appt-modal-detail-label">Status</p>
                <span
                  className={`status-badge ${
                    item.status === "active" ? "status-active" : "status-inactive"
                  }`}
                  style={{ marginTop: 2, display: "inline-block" }}
                >
                  {item.status}
                </span>
              </div>
            </div>

            {/* Created date */}
            <div className="appt-modal-detail-row">
              <div className="appt-modal-detail-icon">
                <IconCalendarEvent size={16} />
              </div>
              <div>
                <p className="appt-modal-detail-label">Created Date</p>
                <p className="appt-modal-detail-val">
                  {formatDate(item.createdAt, { month: "long" })}
                </p>
              </div>
            </div>

            {/* Last updated */}
            {item.updatedAt && item.updatedAt !== item.createdAt && (
              <div className="appt-modal-detail-row">
                <div className="appt-modal-detail-icon">
                  <IconRefresh size={16} />
                </div>
                <div>
                  <p className="appt-modal-detail-label">Last Updated</p>
                  <p className="appt-modal-detail-val">
                    {formatDate(item.updatedAt, { month: "long" })}
                  </p>
                </div>
              </div>
            )}

            {/* Content preview */}
            <div className="appt-modal-detail-row">
              <div className="appt-modal-detail-icon">
                <IconAlignLeft size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="appt-modal-detail-label">Content Preview</p>
              <div
  className="appt-modal-msg-box"
   style={{
    maxHeight: 300,
    overflowY: "auto",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  }}
  dangerouslySetInnerHTML={{
    __html: item.content || item.description || "<p>No content available</p>",
  }}
/>
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
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [allPolicies, setAllPolicies]   = useState([]);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [deleteId, setDeleteId]         = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortAsc, setSortAsc]           = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading]           = useState(true);
  const [viewItem, setViewItem]         = useState(null); // for detail modal

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const res = await getPolicyServ();
      setAllPolicies(res?.data?.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPolicies(); }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDeleteFunc = async () => {
    try {
      await deletePolicyServ(deleteId);
      setShowConfirm(false);
      fetchPolicies();
    } catch (err) {
      console.error(err);
    }
  };

  /* Filter + sort */
  const filtered = allPolicies
    .filter((p) => {
      const matchSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
        statusFilter === "All" ||
        p.status?.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    })
    .sort((a, b) =>
      sortAsc
        ? a.title?.localeCompare(b.title)
        : b.title?.localeCompare(a.title)
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

  const kpiData = buildKpi(allPolicies);
  const statusLabel = statusFilter === "All" ? "All Status" : statusFilter;

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
          <h4 className="listing-title">Privacy Policies</h4>
          {filtered.length > 0 && (
            <span className="listing-count-pill">{filtered.length} total</span>
          )}
        </div>

        <div className="listing-header-right">
          {/* Search */}
          <div className="listing-search">
            <IconSearch size={15} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search policy title…"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Status filter dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              className="btn-listing-action"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <IconFilter size={15} aria-hidden="true" />
              {statusLabel}
              {dropdownOpen
                ? <IconChevronUp size={12} />
                : <IconChevronDown size={12} />
              }
            </button>

            {dropdownOpen && (
              <ul className="listing-dropdown">
                {["All", "Active", "Inactive"].map((s) => (
                  <li key={s}>
                    <button
                      className={`listing-dropdown-item ${statusFilter === s ? "active" : ""}`}
                      onClick={() => {
                        setStatusFilter(s);
                        setDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                    >
                      {s === "All" ? "All Status" : s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add Policy button */}
          <button
            className="btn-listing-primary"
            onClick={() => router.push("/privacy-policy/create")}
          >
            <IconPlus size={15} aria-hidden="true" />
            Add Policy
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
                    Policy
                    <i
                      className={`ti ${sortAsc ? "ti-arrow-up" : "ti-arrow-down"}`}
                      aria-hidden="true"
                    />
                  </div>
                </th>

                <th><div className="th-inner">Date</div></th>
                <th><div className="th-inner">Status</div></th>

                <th style={{ width: 120, textAlign: "center" }}>
                  <div className="th-inner" style={{ justifyContent: "center" }}>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="listing-empty">
                      <i className="ti ti-file-off" aria-hidden="true" />
                      <strong>No policies found</strong>
                      <p>
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "No policies have been added yet."}
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

                    {/* Policy */}
                    <td>
                      <div className="cell-name">
                        <span className="row-avatar">{initials(item.title)}</span>
                        <span className="cell-name-text">{item.title}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="cell-date" style={{ whiteSpace: "nowrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <IconCalendarEvent size={13} stroke={1.8} style={{ opacity: 0.45, flexShrink: 0 }} />
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge ${
                          item.status === "active" ? "status-active" : "status-inactive"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="action-cell" style={{ gap: 6 }}>
                        {/* View */}
                        <button
                          className="btn-row-view"
                          title="View policy details"
                          onClick={() => setViewItem(item)}
                        >
                          <IconEye size={16} />
                        </button>

                        {/* Edit */}
                        <button
                          className="btn-row-edit"
                          title="Edit policy"
                          onClick={() => router.push(`/privacy-policy/update/${item._id}`)}
                        >
                          <IconPencil size={16} />
                        </button>

                        {/* Delete */}
                        <button
                          className="btn-row-delete"
                          title="Delete policy"
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowConfirm(true);
                          }}
                        >
                          <IconTrash size={16} />
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
              <button
                className={`pg-btn ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => goTo(currentPage - 1)}
                aria-label="Previous page"
              >
                <IconChevronLeft size={13} />
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

              <button
                className={`pg-btn ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => goTo(currentPage + 1)}
                aria-label="Next page"
              >
                <IconChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Confirm delete modal ── */}
      <ConfirmDeleteModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        handleConfirm={handleDeleteFunc}
        title="Delete Policy"
        body="Do you really want to delete this policy? This action cannot be undone."
      />

      {/* ── Policy Detail Modal ── */}
      <PolicyDetailModal
        item={viewItem}
        onClose={() => setViewItem(null)}
        onEdit={(id) => {
          setViewItem(null);
          router.push(`/privacy-policy/update/${id}`);
        }}
      />
    </div>
  );
};

export default Page;