

/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState, useRef } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { useRouter } from "next/navigation";
import { deleteBlogServ, getBlogsServ } from "../services/blog.service";
import {
  IconArticle,
  IconCircleCheck,
  IconFileText,
  IconUsers,
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconChevronUp,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconPencil,
  IconTrash,
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

/* helper: "Blog Title" → "BT" */
const initials = (name = "") =>
  name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

/* KPI config */
const buildKpi = (allBlogs) => [
  {
    label: "Total Blogs",
    value: allBlogs.length,
    delta: "+6% this month",
    deltaClass: "",
    icon: <IconArticle size={22} />,
    iconClass: "",
  },
  {
    label: "Published Blogs",
    value: allBlogs.filter((b) => b.status === "published").length,
    delta: "Live on website",
    deltaClass: "",
    icon: <IconCircleCheck size={22} />,
    iconClass: "",
  },
  {
    label: "Draft Blogs",
    value: allBlogs.filter((b) => b.status === "draft").length,
    delta: "Pending publishing",
    deltaClass: "warning",
    icon: <IconFileText size={22} />,
    iconClass: "warning",
  },
  {
    label: "Unique Authors",
    value: [...new Set(allBlogs.map((b) => b.author || "Admin"))].length,
    delta: "Content contributors",
    deltaClass: "info",
    icon: <IconUsers size={22} />,
    iconClass: "info",
  },
];

const ROWS_PER_PAGE = 10;

const Page = () => {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [allBlogs, setAllBlogs]         = useState([]);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [deleteId, setDeleteId]         = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortAsc, setSortAsc]           = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading]           = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogsServ();
      setAllBlogs(res?.data?.data ?? []);
      setLoading(false);
    } catch (err) {
      console.error(err);
 setLoading(false);
    }
  };


  useEffect(() => { fetchBlogs(); }, []);

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
      await deleteBlogServ(deleteId);
      setShowConfirm(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  /* Filter + sort */
  // const filtered = allBlogs
  //   .filter((b) => {
  //     const matchSearch = b.title?.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchStatus =
  //       statusFilter === "All" ||
  //       b.status?.toLowerCase() === statusFilter.toLowerCase();
  //     return matchSearch && matchStatus;
  //   })
  //   .sort((a, b) =>
  //     sortAsc
  //       ? a.title?.localeCompare(b.title)
  //       : b.title?.localeCompare(a.title)
  //   );

  const filtered = allBlogs
  .filter((b) => {
    const matchSearch = b.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      b.status?.toLowerCase() === statusFilter.toLowerCase();

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

  const kpiData = buildKpi(allBlogs);
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
          <h4 className="listing-title">All Blogs</h4>
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
              placeholder="Search blog title…"
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
                {["All", "Published", "Draft"].map((s) => (
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

          {/* Add Blog button */}
          <button
            className="btn-listing-primary"
            onClick={() => router.push("/blogs/create")}
          >
            <IconPlus size={15} aria-hidden="true" />
            Add Blog
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
                    Blog
                    <i
                      className={`ti ${sortAsc ? "ti-arrow-up" : "ti-arrow-down"}`}
                      aria-hidden="true"
                    />
                  </div>
                </th>

                <th><div className="th-inner">Author</div></th>
                <th><div className="th-inner">Date</div></th>
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
                  <td colSpan={6}>
                    <div className="listing-empty">
                      <i className="ti ti-article-off" aria-hidden="true" />
                      <strong>No blogs found</strong>
                      <p>
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "No blog posts have been added yet."}
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

                    {/* Blog */}
                    <td>
                      <div className="cell-name">
                        <span className="row-avatar">{initials(item.title)}</span>
                        <span className="cell-name-text">{item.title}</span>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="cell-muted">{item.author || "Admin"}</td>

                    {/* Date */}
                    <td className="cell-muted">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge ${
                          item.status === "published"
                            ? "status-active"
                            : "status-inactive"
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
                          title="Edit blog"
                          onClick={() => router.push(`/blogs/update/${item._id}`)}
                        >
                          <IconPencil size={16} />
                        </button>
                        <button
                          className="btn-row-delete"
                          title="Delete blog"
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
        title="Delete Blog"
        body="Do you really want to delete this blog post? This action cannot be undone."
      />
    </div>
  );
};

export default Page;

