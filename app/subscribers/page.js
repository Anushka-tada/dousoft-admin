"use client";
import React, { useEffect, useState } from "react";
import {
  IconMailFilled,
  IconCircleCheck,
  IconCalendarStats,
  IconUsersGroup,
  IconSearch,
  IconDownload,
  IconTrash,
  IconInbox,
  IconArrowUp,
  IconArrowDown,
  IconChevronLeft,
  IconChevronRight,
  IconCalendarEvent,
} from "@tabler/icons-react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { deleteSubscribeServ, getSubscribeServ } from "../services/appointment.service";

/* ─────────────────────────────────────────
   Skeleton
───────────────────────────────────────── */
const SubscriberListSkeleton = () => (
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
                <th><Skeleton width={180} /></th>
                <th><Skeleton width={130} /></th>
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
                      <Skeleton width={200} />
                    </div>
                  </td>
                  <td><Skeleton width={140} /></td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
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
const emailInitial = (email = "") =>
  email.trim().charAt(0).toUpperCase() || "?";

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
const buildKpi = (data) => {
  const now = new Date();
  const thisMonth = data.filter((d) => {
    const date = new Date(d.createdAt);
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  const today = data.filter((d) => {
    const date = new Date(d.createdAt);
    return date.toDateString() === now.toDateString();
  });

  return [
    {
      label: "Total Subscribers",
      value: data.length,
      icon: <IconMailFilled size={20} stroke={1.8} />,
      iconClass: "",
    },
    {
      label: "This Month",
      value: thisMonth.length,
      icon: <IconCalendarStats size={20} stroke={1.8} />,
      iconClass: "info",
    },
    {
      label: "Today",
      value: today.length,
      icon: <IconCircleCheck size={20} stroke={1.8} />,
      iconClass: "warning",
    },
    // {
    //   label: "Unique Emails",
    //   value: [...new Set(data.map((d) => d.email?.toLowerCase()))].length,
    //   icon: <IconUsersGroup size={20} stroke={1.8} />,
    //   iconClass: "info",
    // },
  ];
};

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const ROWS_PER_PAGE = 10;

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
const Page = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId]       = useState(null);
  const [searchTerm, setSearchTerm]   = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc]         = useState(true);
  const [loading, setLoading]         = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getSubscribeServ();
      setSubscribers(res?.data?.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    try {
      await deleteSubscribeServ(deleteId)
      setShowConfirm(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = subscribers
    .filter((s) =>
      s.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? a.email?.localeCompare(b.email)
        : b.email?.localeCompare(a.email)
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

  const kpiData = buildKpi(subscribers);

  if (loading) return <SubscriberListSkeleton />;

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
          <h4 className="listing-title">All Subscribers</h4>
          {filtered.length > 0 && (
            <span className="listing-count-pill">{filtered.length} total</span>
          )}
        </div>

        <div className="listing-header-right">
          <div className="listing-search">
            <IconSearch size={15} stroke={1.8} color="#9ca3af" style={{ flexShrink: 0, marginLeft: 9 }} />
            <input
              type="search"
              placeholder="Search by email…"
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
                    Email
                    {sortAsc
                      ? <IconArrowUp size={11} stroke={2} style={{ color: "#0b6f1e" }} />
                      : <IconArrowDown size={11} stroke={2} style={{ color: "#0b6f1e" }} />
                    }
                  </div>
                </th>

                {/* ── Date column ── */}
                <th><div className="th-inner">Subscribed On</div></th>

                <th style={{ width: 80, textAlign: "center" }}>
                  <div className="th-inner" style={{ justifyContent: "center" }}>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="listing-empty">
                      <IconInbox size={36} stroke={1.5} color="#d1e8d4" style={{ display: "block", margin: "0 auto 10px" }} />
                      <strong>No subscribers found</strong>
                      <p>
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "No one has subscribed yet."}
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

                    {/* Email with avatar initial */}
                    <td>
                      <div className="cell-name">
                        <span className="row-avatar">{emailInitial(item.email)}</span>
                        <span className="cell-email">{item.email}</span>
                      </div>
                    </td>

                    {/* ── Date cell ── */}
                    <td className="cell-date" style={{ whiteSpace: "nowrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <IconCalendarEvent size={13} stroke={1.8} style={{ opacity: 0.45, flexShrink: 0 }} />
                        {formatDate(item.createdAt)}
                      </span>
                    </td>

                    {/* Actions — delete only */}
                    <td>
                      <div className="action-cell" style={{ gap: 6, justifyContent: "center" }}>
                        <button
                          className="btn-row-delete"
                          title="Remove subscriber"
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
        title="Remove Subscriber"
        body="Do you really want to remove this subscriber? This action cannot be undone."
      />
    </div>
  );
};

export default Page;