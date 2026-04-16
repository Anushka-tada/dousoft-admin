"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getServiceSubCategoryServ } from "@/app/services/pages.service";

export default function SubServicesListPage() {
  const params = useParams();
  const serviceSlug = params.serviceslug;

  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const res = await getServiceSubCategoryServ(serviceSlug);

        setSubServices(res?.data?.data || []);
        
        // setSubServices([
        //   { _id: "1", name: "React Development", slug: "react-development", type: "technology", status: "active", order: 1, isPublished: true },
        //   { _id: "2", name: "Mumbai Office", slug: "mumbai", type: "city", status: "active", order: 2, isPublished: true },
        //   { _id: "3", name: "General Solutions", slug: "general", type: "general", status: "inactive", order: 3, isPublished: false },
        // ]);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [serviceSlug]);

  const filtered = subServices.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || s.type === typeFilter;
    return matchSearch && matchType;
  });

  const typeColors = {
    general: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", icon: "bi-grid" },
    city: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa", icon: "bi-geo-alt" },
    technology: { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe", icon: "bi-cpu" },
  };

  return (
    <div className="ssl-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .ssl-root { font-family: 'Inter', sans-serif; background: #f9fafb; min-height: 100vh; padding: 28px; }
        .ssl-breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-bottom: 20px; }
        .ssl-breadcrumb a { color: #6b7280; text-decoration: none; font-weight: 600; }
        .ssl-breadcrumb a:hover { color: #111827; }
        .ssl-breadcrumb i { font-size: 10px; }
        .ssl-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
        .ssl-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
        .ssl-sub { font-size: 14px; color: #9ca3af; margin: 0; font-family: monospace; }
        .ssl-create-btn { display: flex; align-items: center; gap: 6px; padding: 10px 20px; background: #16a34a; border: none; border-radius: 10px; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; text-decoration: none; white-space: nowrap; }
        .ssl-create-btn:hover { background: #15803d; }
        .ssl-toolbar { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
        .ssl-search { display: flex; align-items: center; gap: 8px; padding: 9px 14px; background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; flex: 1; min-width: 200px; }
        .ssl-search input { border: none; outline: none; font-size: 14px; color: #111827; width: 100%; background: transparent; }
        .ssl-search i { color: #9ca3af; }
        .ssl-type-tabs { display: flex; background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .ssl-type-tab { padding: 9px 14px; font-size: 13px; font-weight: 600; color: #6b7280; cursor: pointer; border: none; background: none; border-right: 1px solid #e5e7eb; transition: all .15s; display: flex; align-items: center; gap: 5px; }
        .ssl-type-tab:last-child { border-right: none; }
        .ssl-type-tab.active { background: #f0fdf4; color: #16a34a; }
        .ssl-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
        .ssl-stat { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 10px; }
        .ssl-stat-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .ssl-stat-num { font-size: 20px; font-weight: 700; color: #111827; line-height: 1; }
        .ssl-stat-label { font-size: 11px; color: #9ca3af; margin-top: 2px; }
        .ssl-table-wrap { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; }
        .ssl-table-header { display: grid; grid-template-columns: 2fr 100px 80px 80px 120px; gap: 12px; padding: 12px 20px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .ssl-th { font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; }
        .ssl-row { display: grid; grid-template-columns: 2fr 100px 80px 80px 120px; gap: 12px; padding: 14px 20px; border-bottom: 1px solid #f3f4f6; align-items: center; transition: background .1s; }
        .ssl-row:last-child { border-bottom: none; }
        .ssl-row:hover { background: #fafafa; }
        .ssl-name { font-size: 14px; font-weight: 700; color: #111827; margin: 0 0 3px; }
        .ssl-slug { font-size: 12px; color: #9ca3af; font-family: monospace; }
        .ssl-type-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .ssl-status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .ssl-status-dot.active { background: #16a34a; }
        .ssl-status-dot.inactive { background: #d1d5db; }
        .ssl-pub-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .ssl-pub-badge.published { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }
        .ssl-pub-badge.draft { background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
        .ssl-order-badge { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #f3f4f6; border-radius: 8px; font-size: 13px; font-weight: 700; color: #374151; }
        .ssl-actions { display: flex; gap: 6px; justify-content: flex-end; }
        .ssl-edit-btn { display: flex; align-items: center; gap: 4px; padding: 6px 12px; background: #fff; border: 1px solid #d1d5db; border-radius: 7px; font-size: 12px; font-weight: 600; color: #374151; cursor: pointer; text-decoration: none; transition: all .15s; }
        .ssl-edit-btn:hover { background: #f3f4f6; }
        .ssl-empty { padding: 48px; text-align: center; color: #9ca3af; }
        .ssl-empty i { font-size: 40px; margin-bottom: 12px; display: block; }
        .ssl-loading { display: flex; align-items: center; justify-content: center; padding: 60px; gap: 12px; color: #9ca3af; }
        .ssl-spinner { width: 24px; height: 24px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: spin .8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .ssl-stats { grid-template-columns: repeat(2,1fr); }
          .ssl-table-header, .ssl-row { grid-template-columns: 1fr auto; }
          .ssl-th:not(:first-child):not(:last-child), .ssl-row > *:not(:first-child):not(:last-child) { display: none; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="ssl-breadcrumb">
        <Link href="/pages/services">Services</Link>
        <i className="bi bi-chevron-right"/>
        <span style={{textTransform:"capitalize"}}>{serviceSlug}</span>
        <i className="bi bi-chevron-right"/>
        <span style={{color:"#111827",fontWeight:600}}>Sub-Services</span>
      </div>

      <div className="ssl-header">
        <div>
          <h1 className="ssl-title">Sub-Services</h1>
          <p className="ssl-sub">/services/{serviceSlug}/...</p>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <Link href={`/pages/services/${serviceSlug}`} style={{display:"flex",alignItems:"center",gap:5,padding:"9px 16px",background:"#fff",border:"1px solid #e5e7eb",borderRadius:10,fontSize:13,fontWeight:600,color:"#374151",textDecoration:"none"}}>
            <i className="bi bi-pencil"/> Edit Service
          </Link>
          <Link href={`/pages/services/${serviceSlug}/sub-services/create`} className="ssl-create-btn">
            <i className="bi bi-plus-lg"/> Create Sub-Service
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="ssl-stats">
        <div className="ssl-stat">
          <div className="ssl-stat-icon" style={{background:"#f0fdf4",color:"#16a34a"}}><i className="bi bi-collection"/></div>
          <div><div className="ssl-stat-num">{subServices.length}</div><div className="ssl-stat-label">Total</div></div>
        </div>
        <div className="ssl-stat">
          <div className="ssl-stat-icon" style={{background:"#f0fdf4",color:"#16a34a"}}><i className="bi bi-grid"/></div>
          <div><div className="ssl-stat-num">{subServices.filter(s=>s.type==="general").length}</div><div className="ssl-stat-label">General</div></div>
        </div>
        <div className="ssl-stat">
          <div className="ssl-stat-icon" style={{background:"#fff7ed",color:"#ea580c"}}><i className="bi bi-geo-alt"/></div>
          <div><div className="ssl-stat-num">{subServices.filter(s=>s.type==="city").length}</div><div className="ssl-stat-label">City</div></div>
        </div>
        <div className="ssl-stat">
          <div className="ssl-stat-icon" style={{background:"#eff6ff",color:"#2563eb"}}><i className="bi bi-cpu"/></div>
          <div><div className="ssl-stat-num">{subServices.filter(s=>s.type==="technology").length}</div><div className="ssl-stat-label">Technology</div></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="ssl-toolbar">
        <div className="ssl-search">
          <i className="bi bi-search"/>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search sub-services..." />
        </div>
        <div className="ssl-type-tabs">
          {["all","general","city","technology"].map(t=>(
            <button key={t} className={`ssl-type-tab${typeFilter===t?" active":""}`} onClick={()=>setTypeFilter(t)}>
              {t !== "all" && <i className={`bi ${typeColors[t]?.icon}`}/>}
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="ssl-table-wrap">
        <div className="ssl-table-header">
          <div className="ssl-th">Sub-Service</div>
          <div className="ssl-th">Type</div>
          <div className="ssl-th">Status</div>
          <div className="ssl-th">Publish</div>
          <div className="ssl-th" style={{textAlign:"right"}}>Actions</div>
        </div>

        {loading ? (
          <div className="ssl-loading"><div className="ssl-spinner"/><span>Loading...</span></div>
        ) : filtered.length === 0 ? (
          <div className="ssl-empty">
            <i className="bi bi-diagram-2"/>
            <p>{search ? "No sub-services match your search." : "No sub-services yet."}</p>
          </div>
        ) : (
          filtered.map((s) => {
            const tc = typeColors[s.type] || typeColors.general;
            return (
              <div key={s._id} className="ssl-row">
                <div>
                  <p className="ssl-name">{s.name}</p>
                  <p className="ssl-slug">/services/{serviceSlug}/{s.slug}</p>
                </div>
                <div>
                  <span className="ssl-type-badge" style={{background:tc.bg,color:tc.color,border:`1px solid ${tc.border}`}}>
                    <i className={`bi ${tc.icon}`}/> {s.type}
                  </span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span className={`ssl-status-dot ${s.status}`}/>
                  <span style={{fontSize:12,color:"#6b7280"}}>{s.status}</span>
                </div>
                <div>
                  <span className={`ssl-pub-badge ${s.isPublished?"published":"draft"}`}>
                    {s.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="ssl-actions">
                  <Link href={`/pages/services/${serviceSlug}/sub-services/${s.slug}`} className="ssl-edit-btn">
                    <i className="bi bi-pencil"/> Edit
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}