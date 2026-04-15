"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getServiceCategoryServ } from "@/app/services/serviceCategory.service";

// Replace with your actual service call
// import { getAllServicesServ } from "@/app/services/pages.service";

export default function ServicesListPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const res = await getServiceCategoryServ();
        if (res?.data?.success) setServices(res.data.data);
        // Mock data for illustration:
        // setServices([
        //   { _id: "1", name: "Cloud Computing", slug: "cloud-computing", status: "active", order: 1, isPublished: true, description: "Scalable cloud infrastructure solutions." },
        //   { _id: "2", name: "Web Development", slug: "web-development", status: "active", order: 2, isPublished: true, description: "Modern web application development." },
        //   { _id: "3", name: "Data Analytics", slug: "data-analytics", status: "inactive", order: 3, isPublished: false, description: "Data-driven business intelligence." },
        // ]);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const filtered = services.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="sl-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .sl-root { font-family: 'Inter', sans-serif; background: #f9fafb; min-height: 100vh; padding: 28px; }
        .sl-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
        .sl-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
        .sl-sub { font-size: 14px; color: #9ca3af; margin: 0; }
        .sl-create-btn { display: flex; align-items: center; gap: 6px; padding: 10px 20px; background: #16a34a; border: none; border-radius: 10px; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; text-decoration: none; white-space: nowrap; transition: background .15s; }
        .sl-create-btn:hover { background: #15803d; }
        .sl-toolbar { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
        .sl-search { display: flex; align-items: center; gap: 8px; padding: 9px 14px; background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; flex: 1; min-width: 200px; }
        .sl-search input { border: none; outline: none; font-size: 14px; color: #111827; width: 100%; background: transparent; }
        .sl-search i { color: #9ca3af; }
        .sl-filter-tabs { display: flex; background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .sl-filter-tab { padding: 9px 16px; font-size: 13px; font-weight: 600; color: #6b7280; cursor: pointer; border: none; background: none; border-right: 1px solid #e5e7eb; transition: all .15s; white-space: nowrap; }
        .sl-filter-tab:last-child { border-right: none; }
        .sl-filter-tab.active { background: #f0fdf4; color: #16a34a; }
        .sl-filter-tab:hover:not(.active) { background: #f9fafb; }
        .sl-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
        .sl-stat { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px 20px; display: flex; align-items: center; gap: 12px; }
        .sl-stat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .sl-stat-icon.green { background: #f0fdf4; color: #16a34a; }
        .sl-stat-icon.blue { background: #eff6ff; color: #2563eb; }
        .sl-stat-icon.gray { background: #f3f4f6; color: #6b7280; }
        .sl-stat-num { font-size: 22px; font-weight: 700; color: #111827; line-height: 1; }
        .sl-stat-label { font-size: 12px; color: #9ca3af; margin-top: 2px; }
        .sl-table-wrap { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; }
        .sl-table-header { display: grid; grid-template-columns: 2fr 1fr 80px 80px 120px; gap: 12px; padding: 12px 20px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .sl-th { font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; }
        .sl-row { display: grid; grid-template-columns: 2fr 1fr 80px 80px 120px; gap: 12px; padding: 14px 20px; border-bottom: 1px solid #f3f4f6; align-items: center; transition: background .1s; }
        .sl-row:last-child { border-bottom: none; }
        .sl-row:hover { background: #fafafa; }
        .sl-service-name { font-size: 14px; font-weight: 700; color: #111827; margin: 0 0 3px; }
        .sl-service-slug { font-size: 12px; color: #9ca3af; font-family: monospace; }
        .sl-service-desc { font-size: 12px; color: #6b7280; margin: 3px 0 0; }
        .sl-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .sl-badge.active { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .sl-badge.inactive { background: #f3f4f6; color: #9ca3af; border: 1px solid #e5e7eb; }
        .sl-badge.published { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }
        .sl-badge.draft { background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
        .sl-order-badge { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #f3f4f6; border-radius: 8px; font-size: 13px; font-weight: 700; color: #374151; }
        .sl-actions { display: flex; gap: 6px; justify-content: flex-end; }
        .sl-action-btn { display: flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; text-decoration: none; border: 1px solid; transition: all .15s; white-space: nowrap; }
        .sl-action-btn.edit { background: #fff; border-color: #d1d5db; color: #374151; }
        .sl-action-btn.edit:hover { background: #f3f4f6; }
        .sl-action-btn.sub { background: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
        .sl-action-btn.sub:hover { background: #dbeafe; }
        .sl-empty { padding: 48px; text-align: center; color: #9ca3af; }
        .sl-empty i { font-size: 40px; margin-bottom: 12px; display: block; }
        .sl-empty p { margin: 0; font-size: 15px; }
        .sl-loading { display: flex; align-items: center; justify-content: center; padding: 60px; gap: 12px; color: #9ca3af; }
        .sl-spinner { width: 24px; height: 24px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: spin .8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .sl-table-header, .sl-row { grid-template-columns: 1fr auto; }
          .sl-th:not(:first-child):not(:last-child), .sl-row > *:not(:first-child):not(:last-child) { display: none; }
          .sl-stats { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sl-header">
        <div>
          <h1 className="sl-title">Services</h1>
          <p className="sl-sub">Manage your service pages and their sub-services</p>
        </div>
        <Link href="/admin/services/create" className="sl-create-btn">
          <i className="bi bi-plus-lg" /> Create Service
        </Link>
      </div>

      {/* Stats */}
      <div className="sl-stats">
        <div className="sl-stat">
          <div className="sl-stat-icon green"><i className="bi bi-collection"/></div>
          <div><div className="sl-stat-num">{services.length}</div><div className="sl-stat-label">Total Services</div></div>
        </div>
        <div className="sl-stat">
          <div className="sl-stat-icon blue"><i className="bi bi-check-circle"/></div>
          <div><div className="sl-stat-num">{services.filter(s=>s.status==="active").length}</div><div className="sl-stat-label">Active</div></div>
        </div>
        <div className="sl-stat">
          <div className="sl-stat-icon gray"><i className="bi bi-eye-slash"/></div>
          <div><div className="sl-stat-num">{services.filter(s=>!s.isPublished).length}</div><div className="sl-stat-label">Drafts</div></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sl-toolbar">
        <div className="sl-search">
          <i className="bi bi-search"/>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search services..." />
        </div>
        <div className="sl-filter-tabs">
          {["all","active","inactive"].map(f=>(
            <button key={f} className={`sl-filter-tab${filter===f?" active":""}`} onClick={()=>setFilter(f)}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="sl-table-wrap">
        <div className="sl-table-header">
          <div className="sl-th">Service</div>
          <div className="sl-th">Status</div>
          <div className="sl-th">Order</div>
          <div className="sl-th">Publish</div>
          <div className="sl-th" style={{textAlign:"right"}}>Actions</div>
        </div>

        {loading ? (
          <div className="sl-loading"><div className="sl-spinner"/><span>Loading services...</span></div>
        ) : filtered.length === 0 ? (
          <div className="sl-empty">
            <i className="bi bi-collection"/>
            <p>{search ? "No services match your search." : "No services yet. Create your first one!"}</p>
          </div>
        ) : (
          filtered.map((s) => (
            <div key={s._id} className="sl-row">
              <div>
                <p className="sl-service-name">{s.name}</p>
                <p className="sl-service-slug">/services/{s.slug}</p>
                {s.description && <p className="sl-service-desc">{s.description.slice(0,60)}{s.description.length>60?"…":""}</p>}
              </div>
              <div>
                <span className={`sl-badge ${s.status}`}>
                  <i className={`bi bi-${s.status==="active"?"check-circle":"x-circle"}`}/>{s.status}
                </span>
              </div>
              <div><span className="sl-order-badge">#{s.order}</span></div>
              <div>
                <span className={`sl-badge ${s.isPublished?"published":"draft"}`}>
                  {s.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <div className="sl-actions">
                <Link href={`/admin/services/${s.slug}`} className="sl-action-btn edit">
                  <i className="bi bi-pencil"/> Edit
                </Link>
                <Link href={`/admin/services/${s.slug}/sub-services`} className="sl-action-btn sub">
                  <i className="bi bi-diagram-2"/> Sub
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}