"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAllSolutionsServ, deleteSolutionServ } from "@/app/services/solutions.service";

// ─── Mock service stubs (replace with real imports above) ─────────────────────
// const getAllSolutionsServ = async () => { ... }
// const deleteSolutionServ  = async (id) => { ... }

export default function SolutionsListPage() {
  const router = useRouter();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("all"); // all | published | draft
  const [deleteModal, setDeleteModal] = useState(null); // { id, name }
  const [deleting, setDeleting]   = useState(false);
  const [toast, setToast]         = useState(null);
  const toastRef = useRef(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllSolutionsServ();
        if (res?.data?.success) setSolutions(res.data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    try {
      const res = await deleteSolutionServ(deleteModal.slug);
      if (res?.data?.success) {
        setSolutions((prev) => prev.filter((s) => s._slug !== deleteModal.slug));
        showToast(`"${deleteModal.name}" deleted successfully.`);
      } else {
        showToast("Failed to delete. Please try again.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setDeleting(false);
      setDeleteModal(null);
    }
  };

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = solutions.filter((s) => {
    const matchSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.slug?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "published" && s.isPublished) ||
      (filter === "draft" && !s.isPublished);
    return matchSearch && matchFilter;
  });

  const counts = {
    all: solutions.length,
    published: solutions.filter((s) => s.isPublished).length,
    draft: solutions.filter((s) => !s.isPublished).length,
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* ── Layout ── */
        .sl-page     { padding: 28px; background: #f9fafb; min-height: 100vh; }
        .sl-header   { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
        .sl-title-block h1 { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 4px; }
        .sl-title-block p  { font-size: 14px; color: #6b7280; margin: 0; }

        /* ── Add button ── */
        .sl-add-btn  { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #16a34a; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .15s; white-space: nowrap; }
        .sl-add-btn:hover { background: #15803d; }
        .sl-add-btn i { font-size: 16px; }

        /* ── Toolbar ── */
        .sl-toolbar  { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .sl-search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 360px; }
        .sl-search-wrap i { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 15px; }
        .sl-search   { width: 100%; padding: 9px 13px 9px 36px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; transition: border .15s; box-sizing: border-box; }
        .sl-search:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }

        /* Filter tabs */
        .sl-filters  { display: flex; gap: 4px; background: #f3f4f6; border-radius: 8px; padding: 3px; }
        .sl-filter-btn { padding: 6px 14px; border: none; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; background: transparent; color: #6b7280; transition: all .15s; display: flex; align-items: center; gap: 5px; }
        .sl-filter-btn.active { background: #fff; color: #111827; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
        .sl-filter-count { font-size: 11px; padding: 1px 6px; border-radius: 10px; background: #e5e7eb; color: #6b7280; }
        .sl-filter-btn.active .sl-filter-count { background: #dcfce7; color: #16a34a; }

        /* ── Card / Table container ── */
        .sl-card     { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }

        /* ── Table ── */
        .sl-table    { width: 100%; border-collapse: collapse; }
        .sl-table thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .sl-table th { padding: 11px 16px; text-align: left; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; white-space: nowrap; }
        .sl-table td { padding: 14px 16px; font-size: 14px; color: #374151; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
        .sl-table tbody tr:last-child td { border-bottom: none; }
        .sl-table tbody tr:hover td { background: #f9fafb; }

        /* ── Name cell ── */
        .sl-name-cell { display: flex; align-items: center; gap: 12px; }
        .sl-avatar    { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg,#16a34a,#4ade80); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; font-weight: 700; flex-shrink: 0; }
        .sl-name      { font-weight: 600; color: #111827; font-size: 14px; }
        .sl-order-tag { font-size: 11px; color: #9ca3af; margin-top: 1px; }

        /* ── Slug ── */
        .sl-slug      { font-family: monospace; font-size: 13px; color: #6b7280; background: #f3f4f6; padding: 3px 8px; border-radius: 4px; }

        /* ── Status badge ── */
        .sl-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .sl-badge.published { background: #dcfce7; color: #15803d; }
        .sl-badge.draft     { background: #fef3c7; color: #92400e; }
        .sl-badge-dot { width: 6px; height: 6px; border-radius: 50%; }
        .sl-badge.published .sl-badge-dot { background: #16a34a; }
        .sl-badge.draft     .sl-badge-dot { background: #d97706; }

        /* ── Actions ── */
        .sl-actions  { display: flex; gap: 6px; align-items: center; }
        .sl-btn-edit { display: flex; align-items: center; gap: 5px; padding: 6px 14px; border: 1px solid #e5e7eb; background: #fff; border-radius: 7px; font-size: 13px; font-weight: 500; color: #374151; cursor: pointer; transition: all .15s; }
        .sl-btn-edit:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .sl-btn-del  { display: flex; align-items: center; gap: 5px; padding: 6px 10px; border: 1px solid #e5e7eb; background: #fff; border-radius: 7px; font-size: 13px; color: #6b7280; cursor: pointer; transition: all .15s; }
        .sl-btn-del:hover { border-color: #fca5a5; color: #ef4444; background: #fef2f2; }

        /* ── Empty / Loading ── */
        .sl-empty  { padding: 60px 24px; text-align: center; color: #9ca3af; }
        .sl-empty i { font-size: 40px; display: block; margin-bottom: 12px; opacity: .4; }
        .sl-empty p { font-size: 15px; margin: 0 0 16px; }
        .sl-empty-sub { font-size: 13px; }

        .sl-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; gap: 14px; color: #6b7280; }
        .sl-spinner { width: 32px; height: 32px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: slSpin .8s linear infinite; }
        @keyframes slSpin { to { transform: rotate(360deg); } }

        /* ── Delete Modal ── */
        .sl-overlay  { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; animation: slFadeIn .15s ease; }
        .sl-modal    { background: #fff; border-radius: 16px; padding: 28px; max-width: 420px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
        .sl-modal-icon { width: 48px; height: 48px; background: #fef2f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .sl-modal-icon i { font-size: 22px; color: #ef4444; }
        .sl-modal h3 { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 8px; text-align: center; }
        .sl-modal p  { font-size: 14px; color: #6b7280; text-align: center; margin: 0 0 24px; line-height: 1.6; }
        .sl-modal-actions { display: flex; gap: 10px; }
        .sl-modal-cancel { flex: 1; padding: 10px; border: 1px solid #e5e7eb; background: #fff; border-radius: 8px; font-size: 14px; font-weight: 600; color: #374151; cursor: pointer; }
        .sl-modal-cancel:hover { background: #f9fafb; }
        .sl-modal-delete { flex: 1; padding: 10px; border: none; background: #ef4444; color: #fff; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .sl-modal-delete:hover { background: #dc2626; }
        .sl-modal-delete:disabled { opacity: .6; cursor: not-allowed; }

        /* ── Toast ── */
        .sl-toast { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: slFadeIn .2s ease; }
        .sl-toast.success { background: #16a34a; color: #fff; }
        .sl-toast.error   { background: #ef4444; color: #fff; }

        /* ── Stats bar ── */
        .sl-stats-bar { display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .sl-stat-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px 20px; display: flex; align-items: center; gap: 12px; flex: 1; min-width: 120px; }
        .sl-stat-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .sl-stat-icon.total     { background: #eff6ff; color: #3b82f6; }
        .sl-stat-icon.published { background: #f0fdf4; color: #16a34a; }
        .sl-stat-icon.draft     { background: #fffbeb; color: #d97706; }
        .sl-stat-num  { font-size: 22px; font-weight: 700; color: #111827; line-height: 1; }
        .sl-stat-lbl  { font-size: 12px; color: #9ca3af; margin-top: 2px; }

        @keyframes slFadeIn { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: scale(1); } }

        /* ── Order column ── */
        .sl-order { font-size: 13px; color: #9ca3af; font-weight: 500; }

        /* Responsive */
        @media (max-width: 768px) {
          .sl-page { padding: 16px; }
          .sl-table th:nth-child(2),
          .sl-table td:nth-child(2),
          .sl-table th:nth-child(4),
          .sl-table td:nth-child(4) { display: none; }
        }
      `}</style>

      <div className="sl-page">
        {/* ── Header ── */}
        <div className="sl-header">
          <div className="sl-title-block">
            <h1>Solutions</h1>
            <p>Manage all solution pages — content, sections, and SEO.</p>
          </div>
          <button className="sl-add-btn" onClick={() => router.push("/admin/solution/create")}>
            <i className="bi bi-plus-lg" />
            Add Solution
          </button>
        </div>

        {/* ── Stats bar ── */}
        <div className="sl-stats-bar">
          <div className="sl-stat-card">
            <div className="sl-stat-icon total"><i className="bi bi-grid-3x2-gap" /></div>
            <div><div className="sl-stat-num">{counts.all}</div><div className="sl-stat-lbl">Total</div></div>
          </div>
          <div className="sl-stat-card">
            <div className="sl-stat-icon published"><i className="bi bi-check-circle" /></div>
            <div><div className="sl-stat-num">{counts.published}</div><div className="sl-stat-lbl">Published</div></div>
          </div>
          <div className="sl-stat-card">
            <div className="sl-stat-icon draft"><i className="bi bi-pencil-square" /></div>
            <div><div className="sl-stat-num">{counts.draft}</div><div className="sl-stat-lbl">Drafts</div></div>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="sl-toolbar">
          <div className="sl-search-wrap">
            <i className="bi bi-search" />
            <input
              className="sl-search"
              placeholder="Search by name or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sl-filters">
            {["all", "published", "draft"].map((f) => (
              <button
                key={f}
                className={`sl-filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="sl-filter-count">{counts[f]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Main card ── */}
        <div className="sl-card">
          {loading ? (
            <div className="sl-loading">
              <div className="sl-spinner" />
              <p>Loading solutions...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="sl-empty">
              <i className="bi bi-inbox" />
              <p>{search ? "No solutions match your search." : "No solutions yet."}</p>
              {!search && (
                <button className="sl-add-btn" style={{ margin: "0 auto" }}
                  onClick={() => router.push("/pages/solution/create")}>
                  <i className="bi bi-plus-lg" /> Create your first solution
                </button>
              )}
            </div>
          ) : (
            <table className="sl-table">
              <thead>
                <tr>
                  <th>Solution</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s._id}>
                    {/* Name */}
                    <td>
                      <div className="sl-name-cell">
                        <div className="sl-avatar">{(s.name || "S")[0].toUpperCase()}</div>
                        <div>
                          <div className="sl-name">{s.name}</div>
                          <div className="sl-order-tag">
                            {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Slug */}
                    <td><span className="sl-slug">/{s.slug}</span></td>
                    {/* Status */}
                    <td>
                      <span className={`sl-badge ${s.isPublished ? "published" : "draft"}`}>
                        <span className="sl-badge-dot" />
                        {s.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    {/* Order */}
                    <td><span className="sl-order">#{s.order ?? 0}</span></td>
                    {/* Actions */}
                    <td>
                      <div className="sl-actions">
                        <button className="sl-btn-edit"
                          onClick={() => router.push(`/pages/solution/${s.slug}`)}>
                          <i className="bi bi-pencil" /> Edit
                        </button>
                        <button className="sl-btn-del"
                          onClick={() => setDeleteModal({slug: s.slug, name: s.name })}>
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {deleteModal && (
        <div className="sl-overlay" onClick={() => !deleting && setDeleteModal(null)}>
          <div className="sl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sl-modal-icon"><i className="bi bi-exclamation-triangle" /></div>
            <h3>Delete Solution?</h3>
            <p>
              Are you sure you want to delete <strong>&#34;{deleteModal.name}&ldquo;</strong>?
              This will permanently remove the solution and all its content. This action cannot be undone.
            </p>
            <div className="sl-modal-actions">
              <button className="sl-modal-cancel" onClick={() => setDeleteModal(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="sl-modal-delete" onClick={handleDelete} disabled={deleting}>
                {deleting ? <><div className="sl-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Deleting...</> : <><i className="bi bi-trash" /> Delete</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`sl-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"} />
          {toast.msg}
        </div>
      )}
    </>
  );
}