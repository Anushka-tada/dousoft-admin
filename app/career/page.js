
// /* eslint-disable react-hooks/set-state-in-effect */
// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
// import { useRouter } from "next/navigation";
// import { deleteCareerServ, getCareerServ } from "../services/career.service";

// // helper
// const initials = (title = "") =>
//   title.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

// const Page = () => {
//   const router = useRouter();
//   const dropdownRef = useRef(null);

//   const [jobs, setJobs]           = useState([]);
//   const [allJobs, setAllJobs]     = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [deleteId, setDeleteId]   = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen]           = useState(false);
//   const [label, setLabel]         = useState("All Status");

//   const fetchJobs = async () => {
//     try {
//       const res = await getCareerServ();
//       setJobs(res?.data?.data || []);
//       setAllJobs(res?.data?.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => { fetchJobs(); }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

// const kpiData = [
//   {
//     title: "Total Job Posts",
//     value: allJobs.length || "0",
//     delta: "+6% this month",
//     icon: "bi-briefcase",
//   },

//   {
//     title: "Active Openings",
//     value:
//       allJobs.filter(
//         (j) => j.status === "active"
//       ).length || "0",

//     delta: "Currently hiring",
//     icon: "bi-check2-circle",
//   },

//   {
//     title: "Closed Positions",
//     value:
//       allJobs.filter(
//         (j) => j.status === "inactive"
//       ).length || "0",

//     delta: "Hiring paused",
//     icon: "bi-x-circle",
//   },

//   {
//     title: "Remote Jobs",
//     value:
//       allJobs.filter((j) =>
//         j.location?.toLowerCase().includes("remote")
//       ).length || "0",

//     delta: "Work from home",
//     icon: "bi-laptop",
//   },
// ];

//   const handleDeleteFunc = async () => {
//     try {
//       await deleteCareerServ(deleteId);
//       setShowConfirm(false);
//       fetchJobs();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleStatusFilter = (status) => {
//     setLabel(status === "All" ? "All Status" : status);
//     setOpen(false);
//     setJobs(status === "All"
//       ? allJobs
//       : allJobs.filter((i) => i.status.toLowerCase() === status.toLowerCase())
//     );
//   };

//   const filteredJobs = jobs.filter((item) =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="listing-page">

//       {/* KPI Cards */}
//       <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
//         {kpiData.map((item, i) => (
//           <div className="kpi-card" key={i}>
//             <div className="kpi-icon">
//               <i className={`bi ${item.icon}`} />
//             </div>
//             <div>
//               <div className="kpi-label">{item.title}</div>
//               <div className="kpi-value">{item.value}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Section header */}
//       <div className="listing-header">
//         <h4 className="listing-title">All Jobs</h4>

//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

//           {/* Search */}
//           <div className="listing-search">
//             <span className="input-group-text">
//               <i className="bi bi-search" />
//             </span>
//             <input
//               type="search"
//               className="form-control"
//               placeholder="Search by job title…"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Status filter dropdown */}
//           <div style={{ position: "relative" }} ref={dropdownRef}>
//             <button
//               onClick={() => setOpen(!open)}
//               style={{
//                 display: "flex", alignItems: "center", gap: 6,
//                 border: "0.5px solid #d1e8d4", borderRadius: 8,
//                 background: "#fff", padding: "9px 14px",
//                 fontSize: 14, color: "#374151", cursor: "pointer",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               <i className="bi bi-funnel" style={{ fontSize: 14, color: "#0b6f1e" }} />
//               {label}
//               <i className={`bi bi-chevron-down`}
//                 style={{ fontSize: 11, color: "#9ca3af",
//                   transition: "transform 0.15s",
//                   transform: open ? "rotate(180deg)" : "none"
//                 }} />
//             </button>

//             {open && (
//               <ul style={{
//                 position: "absolute", top: "calc(100% + 4px)", right: 0,
//                 background: "#fff", border: "0.5px solid #d1e8d4",
//                 borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//                 listStyle: "none", padding: "6px", minWidth: 140, zIndex: 100,
//               }}>
//                 {["All", "Active", "Inactive"].map((s) => (
//                   <li key={s}>
//                     <button
//                       onClick={() => handleStatusFilter(s)}
//                       style={{
//                         display: "block", width: "100%", textAlign: "left",
//                         padding: "8px 12px", fontSize: 14, borderRadius: 7,
//                         border: "none", background: "transparent",
//                         color: label === (s === "All" ? "All Status" : s) ? "#0b6f1e" : "#374151",
//                         fontWeight: label === (s === "All" ? "All Status" : s) ? 600 : 400,
//                         cursor: "pointer",
//                       }}
//                       onMouseEnter={(e) => e.currentTarget.style.background = "#f3faf4"}
//                       onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
//                     >
//                       {s}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Add Job button */}
//           <button
//             onClick={() => router.push("/career/create")}
//             style={{
//               display: "flex", alignItems: "center", gap: 6,
//               background: "#0b6f1e", color: "#fff",
//               border: "none", borderRadius: 8,
//               padding: "9px 16px", fontSize: 14,
//               fontWeight: 500, cursor: "pointer",
//               whiteSpace: "nowrap",
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.background = "#095c18"}
//             onMouseLeave={(e) => e.currentTarget.style.background = "#0b6f1e"}
//           >
//             <i className="bi bi-plus-lg" style={{ fontSize: 15 }} />
//             Add Job
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="listing-table-card">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead>
//               <tr>
//                 <th style={{ width: 52 }}>Sr.</th>
//                 <th>Title</th>
//                 <th>Location</th>
//                 <th>Type</th>
//                 <th>Experience</th>
//                 <th>Status</th>
//                 <th className="text-center" style={{ width: 100 }}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredJobs.length === 0 ? (
//                 <tr>
//                   <td colSpan="7">
//                     <div className="listing-empty">
//                       <i className="bi bi-briefcase" />
//                       No jobs found
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredJobs.map((item, index) => (
//                   <tr key={item._id}>
//                     <td style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>
//                       {index + 1}
//                     </td>
//                     <td>
//                       <span className="row-avatar">{initials(item.title)}</span>
//                       <span style={{ fontWeight: 500, color: "#111827" }}>{item.title}</span>
//                     </td>
//                     <td style={{ color: "#4b5563" }}>
//                       <i className="bi bi-geo-alt" style={{ fontSize: 13, marginRight: 4, color: "#9ca3af" }} />
//                       {item.location}
//                     </td>
//                     <td style={{ color: "#4b5563" }}>{item.jobType}</td>
//                     <td style={{ color: "#4b5563" }}>{item.experience}</td>
//                     <td>
//                       <span style={{
//                         display: "inline-block",
//                         padding: "3px 10px",
//                         borderRadius: 20,
//                         fontSize: 12,
//                         fontWeight: 600,
//                         ...(item.status === "active"
//                           ? { background: "#dcfce7", color: "#166534" }
//                           : { background: "#f3f4f6", color: "#6b7280" }
//                         ),
//                       }}>
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="text-center">
//                       <button
//                         className="btn-row-edit"
//                         onClick={() => router.push(`/career/update/${item.slug}`)}
//                         style={{
//                           border: "0.5px solid #d1e8d4", background: "#f3faf4",
//                           color: "#0b6f1e", borderRadius: 7, padding: "6px 10px",
//                           fontSize: 13, cursor: "pointer", marginRight: 6,
//                           display: "inline-flex", alignItems: "center",
//                         }}
//                         onMouseEnter={(e) => e.currentTarget.style.background = "#dcfce7"}
//                         onMouseLeave={(e) => e.currentTarget.style.background = "#f3faf4"}
//                       >
//                         <i className="bi bi-pencil" />
//                       </button>
//                       <button
//                         className="btn-row-delete"
//                         onClick={() => { setDeleteId(item.slug); setShowConfirm(true); }}
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

//       <ConfirmDeleteModal
//         show={showConfirm}
//         handleClose={() => setShowConfirm(false)}
//         handleConfirm={handleDeleteFunc}
//         title="Delete Job"
//         body="Do you really want to delete this job?"
//       />
//     </div>
//   );
// };

// export default Page;

/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState, useRef } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { useRouter } from "next/navigation";
import { deleteCareerServ, getCareerServ } from "../services/career.service";
import {
  IconBriefcase,
  IconCircleCheck,
  IconCircleX,
  IconDeviceLaptop,
  IconPencil,
  IconTrash,
  IconPlus,
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconChevronUp,
  IconChevronLeft,
  IconChevronRight,
  IconMapPin,
} from "@tabler/icons-react";

/* helper: "Software Engineer" → "SE" */
const initials = (title = "") =>
  title
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/* KPI config */
const buildKpi = (allJobs) => [
  {
    label: "Total Job Posts",
    value: allJobs.length,
    delta: "+6% this month",
    deltaClass: "",
    icon: <IconBriefcase size={22} />,
    iconClass: "",
  },
  {
    label: "Active Openings",
    value: allJobs.filter((j) => j.status === "active").length,
    delta: "Currently hiring",
    deltaClass: "warning",
    icon: <IconCircleCheck size={22} />,
    iconClass: "warning",
  },
  {
    label: "Closed Positions",
    value: allJobs.filter((j) => j.status === "inactive").length,
    delta: "Hiring paused",
    deltaClass: "danger",
    icon: <IconCircleX size={22} />,
    iconClass: "danger",
  },
  {
    label: "Remote Jobs",
    value: allJobs.filter((j) =>
      j.location?.toLowerCase().includes("remote")
    ).length,
    delta: "Work from home",
    deltaClass: "info",
    icon: <IconDeviceLaptop size={22} />,
    iconClass: "info",
  },
];

const ROWS_PER_PAGE = 10;

const Page = () => {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [allJobs, setAllJobs]           = useState([]);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [deleteId, setDeleteId]         = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortAsc, setSortAsc]           = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await getCareerServ();
      setAllJobs(res?.data?.data ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

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
      await deleteCareerServ(deleteId);
      setShowConfirm(false);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  /* Filter + sort */
  const filtered = allJobs
    .filter((j) => {
      const matchSearch = j.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
        statusFilter === "All" ||
        j.status?.toLowerCase() === statusFilter.toLowerCase();
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

  const kpiData = buildKpi(allJobs);

  const statusLabel = statusFilter === "All" ? "All Status" : statusFilter;

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
          <h4 className="listing-title">All Jobs</h4>
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
              placeholder="Search by job title…"
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
                      className={`listing-dropdown-item ${
                        statusFilter === s ? "active" : ""
                      }`}
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

          {/* Add Job button */}
          <button
            className="btn-listing-primary"
            onClick={() => router.push("/career/create")}
          >
            <IconPlus size={15} aria-hidden="true" />
            Add Job
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
                    Title
                    <i
                      className={`ti ${sortAsc ? "ti-arrow-up" : "ti-arrow-down"}`}
                      aria-hidden="true"
                    />
                  </div>
                </th>

                <th><div className="th-inner">Location</div></th>
                <th><div className="th-inner">Type</div></th>
                <th><div className="th-inner">Experience</div></th>
                <th><div className="th-inner">Status</div></th>
                <th style={{ width: 100, textAlign: "center" }}>
                  <div className="th-inner" style={{ justifyContent: "center" }}>
                    Action
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="listing-empty">
                      <i className="ti ti-briefcase" aria-hidden="true" />
                      <strong>No jobs found</strong>
                      <p>
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "No job posts have been added yet."}
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

                    {/* Title */}
                    <td>
                      <div className="cell-name">
                        <span className="row-avatar">{initials(item.title)}</span>
                        <span className="cell-name-text">{item.title}</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="cell-muted">
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <IconMapPin size={13} style={{ color: "#9ca3af", flexShrink: 0 }} />
                        {item.location}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="cell-muted">{item.jobType}</td>

                    {/* Experience */}
                    <td className="cell-muted">{item.experience}</td>

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

                    {/* Action */}
                    <td>
                      <div className="action-cell">
                        <button
                          className="btn-row-edit"
                          title="Edit job"
                          onClick={() => router.push(`/career/update/${item.slug}`)}
                        >
                          <IconPencil size={16} />
                        </button>
                        <button
                          className="btn-row-delete"
                          title="Delete job"
                          onClick={() => {
                            setDeleteId(item.slug);
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
              {/* Prev */}
              <button
                className={`pg-btn ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => goTo(currentPage - 1)}
                aria-label="Previous page"
              >
                <IconChevronLeft size={13} aria-hidden="true" />
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
                <IconChevronRight size={13} aria-hidden="true" />
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
        title="Delete Job"
        body="Do you really want to delete this job post? This action cannot be undone."
      />
    </div>
  );
};

export default Page;