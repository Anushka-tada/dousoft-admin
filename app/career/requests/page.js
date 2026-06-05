
// /* eslint-disable react-hooks/set-state-in-effect */
// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import ConfirmDeleteModal from "../../Components/ConfirmDeleteModal";
// import { getCareerRequestsServ } from "../../services/career.service";

// const statusConfig = {
//   selected: { bg: "#dcfce7", color: "#166534" },
//   rejected:  { bg: "#fee2e2", color: "#991b1b" },
//   pending:   { bg: "#fef9c3", color: "#854d0e" },
// };

// const initials = (name = "") =>
//   name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

// const Page = () => {
//   const [requests, setRequests]       = useState([]);
//   const [allRequests, setAllRequests] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [deleteId, setDeleteId]       = useState(null);
//   const [searchTerm, setSearchTerm]   = useState("");
//   const [open, setOpen]               = useState(false);
//   const [label, setLabel]             = useState("All Status");
//   const [showView, setShowView]       = useState(false);
//   const [selectedData, setSelectedData] = useState(null);
//   const dropdownRef = useRef(null);

//   const fetchRequests = async () => {
//     try {
//       const res = await getCareerRequestsServ();
//       setRequests(res?.data?.data || []);
//       setAllRequests(res?.data?.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => { fetchRequests(); }, []);

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
//     title: "Total Applications",
//     value: allRequests.length || "0",
//     delta: "+12% this month",
//     icon: "bi-file-earmark-person",
//   },

//   {
//     title: "Pending Review",
//     value:
//       allRequests.filter(
//         (r) => r.status === "pending"
//       ).length || "0",

//     delta: "Awaiting screening",
//     icon: "bi-hourglass-split",
//   },

//   {
//     title: "Selected Candidates",
//     value:
//       allRequests.filter(
//         (r) => r.status === "selected"
//       ).length || "0",

//     delta: "+8 hired this month",
//     icon: "bi-check2-circle",
//   },

//   {
//     title: "Rejected Applications",
//     value:
//       allRequests.filter(
//         (r) => r.status === "rejected"
//       ).length || "0",

//     delta: "Closed applications",
//     icon: "bi-x-circle",
//   },
// ];

//   const handleDeleteFunc = async () => {
//     try {
//       // await deleteJobRequestServ(deleteId);
//       setShowConfirm(false);
//       fetchRequests();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleStatusFilter = (status) => {
//     setLabel(status === "All" ? "All Status" : status);
//     setOpen(false);
//     setRequests(status === "All"
//       ? allRequests
//       : allRequests.filter((i) => i.status.toLowerCase() === status.toLowerCase())
//     );
//   };

//   const filteredRequests = requests.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Section header */}
//       <div className="listing-header">
//         <h4 className="listing-title">Job Applications</h4>

//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

//           {/* Search */}
//           <div className="listing-search">
//             <span className="input-group-text">
//               <i className="bi bi-search" />
//             </span>
//             <input
//               type="search"
//               className="form-control"
//               placeholder="Search by candidate name…"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Status dropdown */}
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
//               <i className="bi bi-chevron-down"
//                 style={{ fontSize: 11, color: "#9ca3af",
//                   transition: "transform 0.15s",
//                   transform: open ? "rotate(180deg)" : "none",
//                 }} />
//             </button>

//             {open && (
//               <ul style={{
//                 position: "absolute", top: "calc(100% + 4px)", right: 0,
//                 background: "#fff", border: "0.5px solid #d1e8d4",
//                 borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//                 listStyle: "none", padding: "6px", minWidth: 150, zIndex: 100,
//               }}>
//                 {["All", "Pending", "Selected", "Rejected"].map((s) => {
//                   const active = label === (s === "All" ? "All Status" : s);
//                   return (
//                     <li key={s}>
//                       <button
//                         onClick={() => handleStatusFilter(s)}
//                         style={{
//                           display: "flex", alignItems: "center", gap: 8,
//                           width: "100%", textAlign: "left",
//                           padding: "8px 12px", fontSize: 14, borderRadius: 7,
//                           border: "none", background: active ? "#f3faf4" : "transparent",
//                           color: active ? "#0b6f1e" : "#374151",
//                           fontWeight: active ? 600 : 400, cursor: "pointer",
//                         }}
//                         onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f3faf4"; }}
//                         onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
//                       >
//                         {s !== "All" && (
//                           <span style={{
//                             width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
//                             background: s === "Selected" ? "#16a34a"
//                               : s === "Rejected" ? "#dc2626" : "#ca8a04",
//                           }} />
//                         )}
//                         {s}
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="listing-table-card">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead>
//               <tr>
//                 <th style={{ width: 52 }}>Sr.</th>
//                 <th>Candidate</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Applied For</th>
//                 <th>Status</th>
//                 <th className="text-center" style={{ width: 80 }}>Resume</th>
//                 <th className="text-center" style={{ width: 80 }}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan="8">
//                     <div className="listing-empty">
//                       <i className="bi bi-people" />
//                       No applications found
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredRequests.map((item, index) => {
//                   const st = statusConfig[item.status] || statusConfig.pending;
//                   return (
//                     <tr key={item._id}>
//                       <td style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>
//                         {index + 1}
//                       </td>

//                       <td>
//                         <span className="row-avatar">{initials(item.name)}</span>
//                         <span style={{ fontWeight: 500, color: "#111827" }}>{item.name}</span>
//                       </td>

//                       <td style={{ color: "#4b5563" }}>{item.email}</td>

//                       <td style={{ fontFamily: "monospace", fontSize: 14, color: "#4b5563" }}>
//                         {item.phone}
//                       </td>

//                       <td>
//                         {item.jobId?.title ? (
//                           <span style={{
//                             display: "inline-flex", alignItems: "center", gap: 5,
//                             background: "#f3faf4", border: "0.5px solid #d1e8d4",
//                             borderRadius: 6, padding: "3px 9px",
//                             fontSize: 13, color: "#0b6f1e", fontWeight: 500,
//                           }}>
//                             <i className="bi bi-briefcase" style={{ fontSize: 12 }} />
//                             {item.jobId.title}
//                           </span>
//                         ) : (
//                           <span style={{ color: "#9ca3af" }}>—</span>
//                         )}
//                       </td>

//                       <td>
//                         <span style={{
//                           display: "inline-block", padding: "3px 10px",
//                           borderRadius: 20, fontSize: 12, fontWeight: 600,
//                           background: st.bg, color: st.color,
//                         }}>
//                           {item.status}
//                         </span>
//                       </td>

//                       <td className="text-center">
//                         {item.resume ? (
//                           <button
//                             onClick={() => { setSelectedData(item); setShowView(true); }}
//                             style={{
//                               border: "0.5px solid #d1e8d4", background: "#f3faf4",
//                               color: "#0b6f1e", borderRadius: 7, padding: "6px 10px",
//                               fontSize: 13, cursor: "pointer",
//                               display: "inline-flex", alignItems: "center", gap: 5,
//                             }}
//                             onMouseEnter={(e) => e.currentTarget.style.background = "#dcfce7"}
//                             onMouseLeave={(e) => e.currentTarget.style.background = "#f3faf4"}
//                           >
//                             <i className="bi bi-eye" />
//                           </button>
//                         ) : (
//                           <span style={{ color: "#9ca3af" }}>—</span>
//                         )}
//                       </td>

//                       <td className="text-center">
//                         <button
//                           className="btn-row-delete"
//                           onClick={() => { setDeleteId(item._id); setShowConfirm(true); }}
//                         >
//                           <i className="bi bi-trash" />
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <ConfirmDeleteModal
//         show={showConfirm}
//         handleClose={() => setShowConfirm(false)}
//         handleConfirm={handleDeleteFunc}
//         title="Delete Application"
//         body="Do you really want to delete this application?"
//       />

//       <ViewModal
//         show={showView}
//         handleClose={() => setShowView(false)}
//         data={selectedData}
//       />
//     </div>
//   );
// };

// export default Page;

// /* ── View Modal ── */
// const ViewModal = ({ show, handleClose, data }) => {
//   if (!show || !data) return null;

//   const st = statusConfig[data.status] || statusConfig.pending;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={handleClose}
//         style={{
//           position: "fixed", inset: 0,
//           background: "rgba(0,0,0,0.35)", zIndex: 1040,
//         }}
//       />

//       {/* Modal */}
//       <div style={{
//         position: "fixed", top: "50%", left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: "min(680px, 95vw)", maxHeight: "90vh",
//         background: "#fff", borderRadius: 14,
//         border: "0.5px solid #d1e8d4",
//         boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
//         display: "flex", flexDirection: "column",
//         zIndex: 1050, overflow: "hidden",
//       }}>

//         {/* Header */}
//         <div style={{
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "18px 24px", borderBottom: "0.5px solid #e5e7eb",
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div style={{
//               width: 40, height: 40, borderRadius: "50%",
//               background: "#edf7ee", display: "flex",
//               alignItems: "center", justifyContent: "center",
//               fontSize: 15, fontWeight: 600, color: "#0b6f1e",
//             }}>
//               {data.name?.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")}
//             </div>
//             <div>
//               <div style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>{data.name}</div>
//               <div style={{ fontSize: 13, color: "#6b7280" }}>
//                 {data.jobId?.title ? `Applied for: ${data.jobId.title}` : "Job Application"}
//               </div>
//             </div>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <span style={{
//               padding: "4px 12px", borderRadius: 20, fontSize: 12,
//               fontWeight: 600, background: st.bg, color: st.color,
//             }}>
//               {data.status}
//             </span>
//             <button
//               onClick={handleClose}
//               style={{
//                 border: "0.5px solid #e5e7eb", borderRadius: 7,
//                 background: "#f9fafb", color: "#6b7280",
//                 padding: "6px 10px", cursor: "pointer", fontSize: 16,
//                 display: "flex", alignItems: "center",
//               }}
//             >
//               <i className="bi bi-x-lg" style={{ fontSize: 14 }} />
//             </button>
//           </div>
//         </div>

//         {/* Body */}
//         <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>

//           {/* Info grid */}
//           <div style={{
//             display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px",
//             marginBottom: 20,
//           }}>
//             {[
//               { label: "Email",      value: data.email,      icon: "bi-envelope" },
//               { label: "Phone",      value: data.phone,      icon: "bi-telephone" },
//               { label: "Experience", value: data.experience, icon: "bi-briefcase" },
//               { label: "LinkedIn",   value: data.linkedin,   icon: "bi-linkedin",  link: true },
//               { label: "Portfolio",  value: data.portfolio,  icon: "bi-globe",     link: true },
//             ].map(({ label, value, icon, link }) => (
//               <div key={label} style={{
//                 background: "#f9fafb", border: "0.5px solid #e5e7eb",
//                 borderRadius: 10, padding: "12px 14px",
//               }}>
//                 <div style={{
//                   fontSize: 11, fontWeight: 600, color: "#9ca3af",
//                   textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5,
//                   display: "flex", alignItems: "center", gap: 5,
//                 }}>
//                   <i className={`bi ${icon}`} style={{ fontSize: 12 }} />
//                   {label}
//                 </div>
//                 {link && value ? (
//                   <a href={value} target="_blank" rel="noopener noreferrer"
//                     style={{ fontSize: 14, color: "#0b6f1e", wordBreak: "break-all" }}>
//                     {value}
//                   </a>
//                 ) : (
//                   <div style={{ fontSize: 14, color: value ? "#111827" : "#9ca3af" }}>
//                     {value || "—"}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Cover Letter */}
//           {data.coverLetter && (
//             <div style={{
//               background: "#f9fafb", border: "0.5px solid #e5e7eb",
//               borderRadius: 10, padding: "14px 16px", marginBottom: 16,
//             }}>
//               <div style={{
//                 fontSize: 11, fontWeight: 600, color: "#9ca3af",
//                 textTransform: "uppercase", letterSpacing: "0.05em",
//                 marginBottom: 8, display: "flex", alignItems: "center", gap: 5,
//               }}>
//                 <i className="bi bi-chat-left-text" style={{ fontSize: 12 }} />
//                 Cover Letter
//               </div>
//               <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>
//                 {data.coverLetter}
//               </p>
//             </div>
//           )}

//           {/* Resume */}
//           {data.resume && (
            
//            <a   href={data.resume}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 display: "inline-flex", alignItems: "center", gap: 8,
//                 background: "#0b6f1e", color: "#fff",
//                 borderRadius: 8, padding: "10px 18px",
//                 fontSize: 14, fontWeight: 500, textDecoration: "none",
//               }}
//             >
//               <i className="bi bi-file-earmark-person" style={{ fontSize: 16 }} />
//               View Resume
//             </a>
//           )}
//         </div>

//         {/* Footer */}
//         <div style={{
//           padding: "14px 24px", borderTop: "0.5px solid #e5e7eb",
//           display: "flex", justifyContent: "flex-end",
//         }}>
//           <button
//             onClick={handleClose}
//             style={{
//               border: "0.5px solid #d1e8d4", background: "#f3faf4",
//               color: "#0b6f1e", borderRadius: 8,
//               padding: "8px 20px", fontSize: 14,
//               fontWeight: 500, cursor: "pointer",
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState, useRef } from "react";
import ConfirmDeleteModal from "../../Components/ConfirmDeleteModal";
import { getCareerRequestsServ } from "../../services/career.service";
import {
  IconFileDescription,
  IconHourglass,
  IconCircleCheck,
  IconCircleX,
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconChevronUp,
  IconChevronLeft,
  IconChevronRight,
  IconTrash,
  IconEye,
  IconBriefcase,
  IconMail,
  IconPhone,
  IconWorld,
  IconBrandLinkedin,
  IconX,
  IconFileText,
  IconMessage,
} from "@tabler/icons-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AppointmentListSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#f3f4f6"
      highlightColor="#ffffff"
    >
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

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
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
                  <th><Skeleton width={120} /></th>
                  <th><Skeleton width={50} /></th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={20} />
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Skeleton circle width={38} height={38} />
                        <Skeleton width={120} />
                      </div>
                    </td>

                    <td>
                      <Skeleton width={180} />
                    </td>

                    <td>
                      <Skeleton width={120} />
                    </td>

                    <td>
                      <Skeleton width="90%" />
                    </td>

                    <td>
                      <Skeleton circle width={32} height={32} />
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
};


/* ── Status config ── */
const statusConfig = {
  selected: { bg: "#dcfce7", color: "#166534", dot: "#16a34a" },
  rejected:  { bg: "#fee2e2", color: "#991b1b", dot: "#dc2626" },
  pending:   { bg: "#fef9c3", color: "#854d0e", dot: "#ca8a04" },
};

/* helper: "Rahul Sharma" → "RS" */
const initials = (name = "") =>
  name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

/* KPI config */
const buildKpi = (allRequests) => [
  {
    label: "Total Applications",
    value: allRequests.length,
    delta: "+12% this month",
    deltaClass: "",
    icon: <IconFileDescription size={22} />,
    iconClass: "",
  },
  {
    label: "Pending Review",
    value: allRequests.filter((r) => r.status === "pending").length,
    delta: "Awaiting screening",
    deltaClass: "warning",
    icon: <IconHourglass size={22} />,
    iconClass: "warning",
  },
  {
    label: "Selected Candidates",
    value: allRequests.filter((r) => r.status === "selected").length,
    delta: "+8 hired this month",
    deltaClass: "",
    icon: <IconCircleCheck size={22} />,
    iconClass: "",
  },
  {
    label: "Rejected Applications",
    value: allRequests.filter((r) => r.status === "rejected").length,
    delta: "Closed applications",
    deltaClass: "danger",
    icon: <IconCircleX size={22} />,
    iconClass: "danger",
  },
];

const ROWS_PER_PAGE = 10;

const Page = () => {
  const [allRequests, setAllRequests]   = useState([]);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [deleteId, setDeleteId]         = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showView, setShowView]         = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getCareerRequestsServ();
      setAllRequests(res?.data?.data ?? []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

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
      // await deleteJobRequestServ(deleteId);
      setShowConfirm(false);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  /* Filter */
  // const filtered = allRequests.filter((item) => {
  //   const matchSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchStatus =
  //     statusFilter === "All" ||
  //     item.status?.toLowerCase() === statusFilter.toLowerCase();
  //   return matchSearch && matchStatus;
  // });

  const filtered = allRequests
  .filter((item) => {
    const matchSearch = item.name?.toLowerCase().includes(
      searchTerm.toLowerCase()
    );

    const matchStatus =
      statusFilter === "All" ||
      item.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && matchStatus;
  })
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

  const kpiData = buildKpi(allRequests);
  const statusLabel = statusFilter === "All" ? "All Status" : statusFilter;

    if (loading) {
  return <AppointmentListSkeleton />;
}


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
          <h4 className="listing-title">Job Applications</h4>
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
              placeholder="Search by candidate name…"
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
                {["All", "Pending", "Selected", "Rejected"].map((s) => {
                  const cfg = statusConfig[s.toLowerCase()];
                  return (
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
                        {s !== "All" && (
                          <span style={{
                            width: 8, height: 8, borderRadius: "50%",
                            flexShrink: 0, background: cfg?.dot,
                            display: "inline-block",
                          }} />
                        )}
                        {s === "All" ? "All Status" : s}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="listing-table-card">
        <div className="listing-table-wrap">
          <table className="listing-table">
            <thead>
              <tr>
                <th style={{ width: 52, textAlign: "center" }}>Sr.</th>
                <th><div className="th-inner">Candidate</div></th>
                <th><div className="th-inner">Email</div></th>
                <th><div className="th-inner">Phone</div></th>
                <th><div className="th-inner">Applied For</div></th>
                <th><div className="th-inner">Status</div></th>
                <th style={{ width: 80, textAlign: "center" }}>
                  <div className="th-inner" style={{ justifyContent: "center" }}>Resume</div>
                </th>
                <th style={{ width: 80, textAlign: "center" }}>
                  <div className="th-inner" style={{ justifyContent: "center" }}>Action</div>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="listing-empty">
                      <i className="ti ti-users" aria-hidden="true" />
                      <strong>No applications found</strong>
                      <p>
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "No job applications have been received yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((item, idx) => {
                  const st = statusConfig[item.status] || statusConfig.pending;
                  return (
                    <tr key={item._id}>
                      {/* Sr */}
                      <td className="cell-sr">
                        {(currentPage - 1) * ROWS_PER_PAGE + idx + 1}
                      </td>

                      {/* Candidate */}
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

                      {/* Applied For */}
                      <td>
                        {item.jobId?.title ? (
                          <span className="job-tag">
                            <IconBriefcase size={12} />
                            {item.jobId.title}
                          </span>
                        ) : (
                          <span className="cell-muted">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className="status-badge"
                          style={{ background: st.bg, color: st.color }}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Resume */}
                      <td>
                        <div className="action-cell">
                          {item.resume ? (
                            <button
                              className="btn-row-edit"
                              title="View resume"
                              onClick={() => { setSelectedData(item); setShowView(true); }}
                            >
                              <IconEye size={16} />
                            </button>
                          ) : (
                            <span className="cell-muted">—</span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td>
                        <div className="action-cell">
                          <button
                            className="btn-row-delete"
                            title="Delete application"
                            onClick={() => { setDeleteId(item._id); setShowConfirm(true); }}
                          >
                            <IconTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
        title="Delete Application"
        body="Do you really want to delete this application? This action cannot be undone."
      />

      {/* ── View Application Modal ── */}
      <ViewModal
        show={showView}
        handleClose={() => setShowView(false)}
        data={selectedData}
      />
    </div>
  );
};

export default Page;

/* ────────────────────────────────────────────
   View Modal — consistent with page styling
──────────────────────────────────────────── */
const ViewModal = ({ show, handleClose, data }) => {
  if (!show || !data) return null;
  const st = statusConfig[data.status] || statusConfig.pending;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.35)", zIndex: 1040,
        }}
      />

      {/* Modal */}
      <div className="view-modal">

        {/* Header */}
        <div className="view-modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="row-avatar" style={{ width: 40, height: 40, fontSize: 15 }}>
              {data.name?.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")}
            </span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>{data.name}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {data.jobId?.title ? `Applied for: ${data.jobId.title}` : "Job Application"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              className="status-badge"
              style={{ background: st.bg, color: st.color }}
            >
              {data.status}
            </span>
            <button className="view-modal-close" onClick={handleClose}>
              <IconX size={15} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="view-modal-body">

          {/* Info grid */}
          <div className="view-modal-grid">
            {[
              { label: "Email",      value: data.email,      icon: <IconMail size={13} /> },
              { label: "Phone",      value: data.phone,      icon: <IconPhone size={13} /> },
              { label: "Experience", value: data.experience, icon: <IconBriefcase size={13} /> },
              { label: "LinkedIn",   value: data.linkedin,   icon: <IconBrandLinkedin size={13} />, link: true },
              { label: "Portfolio",  value: data.portfolio,  icon: <IconWorld size={13} />,         link: true },
            ].map(({ label, value, icon, link }) => (
              <div key={label} className="view-modal-info-card">
                <div className="view-modal-info-label">
                  {icon}
                  {label}
                </div>
                {link && value ? (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 14, color: "#0b6f1e", wordBreak: "break-all" }}
                  >
                    {value}
                  </a>
                ) : (
                  <div style={{ fontSize: 14, color: value ? "#111827" : "#9ca3af" }}>
                    {value || "—"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cover Letter */}
          {data.coverLetter && (
            <div className="view-modal-info-card" style={{ marginBottom: 16 }}>
              <div className="view-modal-info-label">
                <IconMessage size={13} />
                Cover Letter
              </div>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>
                {data.coverLetter}
              </p>
            </div>
          )}

          {/* Resume link */}
          {data.resume && (
            <a
              href={data.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-listing-primary"
              style={{ textDecoration: "none", display: "inline-flex" }}
            >
              <IconFileText size={16} />
              View Resume
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="view-modal-footer">
          <button
            className="btn-listing-action"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};