"use client";
import React from "react";

/**
 * HomePreview — Full-page visual preview of home page data
 * Shown at the bottom of every tab as a common preview strip
 * Props: formData (entire home schema object)
 */
export default function HomePreview({ formData = {} }) {
  const {
    hero = {},
    marqueeServices = [],
    whoWeAre = {},
    whyChooseUs = {},
    futureSection = {},
    stats = [],
    industrySection = {},
    techSection={},
    agileSection = {},
    testimonialSection = {},
    faqSection = {},
    cta = {},
    seo = {},
  } = formData;

  return (
    <>
      <style>{`
        /* ── Preview wrapper ── */
        .hp-wrap {
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          font-family: inherit;
          margin-top: 32px;
        }
        .hp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }
        .hp-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hp-dots { display: flex; gap: 5px; }
        .hp-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .hp-dot.r { background: #f87171; }
        .hp-dot.y { background: #fbbf24; }
        .hp-dot.g { background: #4ade80; }
        .hp-url {
          background: #fff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 4px 14px;
          font-size: 13px;
          color: #6b7280;
          min-width: 220px;
          text-align: center;
        }
        .hp-label {
          font-size: 13px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hp-label i { font-size: 14px; }

        /* ── Shared preview styles ── */
        .hp-section { padding: 28px 32px; }
        .hp-section + .hp-section { border-top: 1px solid #f3f4f6; }
        .hp-section-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hp-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 12px;
          border-radius: 20px;
          background: #dcfce7;
          color: #15803d;
          margin-bottom: 8px;
        }
        .hp-h1 { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 6px; line-height: 1.3; }
        .hp-h2 { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 6px; line-height: 1.3; }
        .hp-h3 { font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 4px; }
        .hp-p  { font-size: 14px; color: #6b7280; margin: 0 0 6px; line-height: 1.6; }
        .hp-highlight { color: #16a34a; }
        .hp-empty { font-size: 13px; color: #d1d5db; font-style: italic; }

        /* ── Hero ── */
        .hp-hero {
          background: linear-gradient(135deg, #0f2618 0%, #1a3a24 100%);
          border-radius: 10px;
          padding: 28px 28px 24px;
          position: relative;
          overflow: hidden;
          min-height: 140px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .hp-hero-img {
          width: 180px;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.1);
        }
        .hp-hero-img-placeholder {
          width: 180px;
          height: 120px;
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          flex-shrink: 0;
          border: 2px dashed rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.3);
          font-size: 12px;
        }
        .hp-hero-content { flex: 1; }
        .hp-hero h1 { color: #fff; font-size: 20px; font-weight: 700; margin: 0 0 6px; }
        .hp-hero p  { color: #d1fae5; font-size: 14px; margin: 0 0 14px; }
        .hp-hero-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .hp-btn-p { font-size: 13px; padding: 7px 16px; background: #16a34a; color: #fff; border-radius: 20px; font-weight: 600; }
        .hp-btn-s { font-size: 13px; padding: 7px 16px; border: 1px solid rgba(255,255,255,0.4); color: #fff; border-radius: 20px; }
        .hp-trust { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 10px; }

        /* ── Marquee ── */
        .hp-marquee {
          background: #0f2618;
          border-radius: 8px;
          padding: 10px 16px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          overflow: hidden;
        }
        .hp-marquee-tag {
          font-size: 12px;
          font-weight: 600;
          color: #4ade80;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hp-marquee-dot { color: #16a34a; }

        /* ── Cards grid ── */
        .hp-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .hp-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 14px;
        }
        .hp-card-icon {
          width: 32px; height: 32px;
          background: #dcfce7;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 8px;
        }
        .hp-card-icon i { color: #16a34a; font-size: 15px; }
        .hp-card-inactive { opacity: 0.35; }

        /* ── Stats ── */
        .hp-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .hp-stat {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 14px;
          text-align: center;
        }
        .hp-stat-num { font-size: 24px; font-weight: 700; color: #16a34a; }
        .hp-stat-lbl { font-size: 13px; color: #6b7280; margin-top: 4px; }

        /* ── Features list ── */
        .hp-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 10px;
        }
        .hp-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #374151;
          padding: 8px 10px;
          background: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        .hp-feature-item i { color: #16a34a; font-size: 15px; }

        /* ── Process steps ── */
        .hp-steps {
          display: flex;
          gap: 0;
          position: relative;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .hp-step {
          flex: 1;
          min-width: 100px;
          padding: 12px;
          text-align: center;
          position: relative;
        }
        .hp-step-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          margin: 0 auto 8px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
        }
        .hp-step-line {
          position: absolute;
          top: 27px; right: -50%;
          width: 100%; height: 2px;
          background: #e5e7eb;
          z-index: 0;
        }

        /* ── Testimonials ── */
        .hp-testi-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        .hp-testi-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 14px;
        }
        .hp-testi-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .hp-testi-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        .hp-testi-avatar-placeholder {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #dcfce7;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #16a34a;
          flex-shrink: 0;
        }
        .hp-stars { color: #f59e0b; font-size: 14px; margin-bottom: 4px; }
        .hp-testi-quote { font-size: 13px; color: #6b7280; font-style: italic; line-height: 1.5; }
        .hp-verified { font-size: 11px; color: #16a34a; font-weight: 600; }

        /* ── FAQ ── */
        .hp-faqs { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
        .hp-faq {
          padding: 12px 14px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .hp-faq-q { font-size: 14px; color: #374151; font-weight: 500; }
        .hp-faq-icon { color: #9ca3af; font-size: 15px; flex-shrink: 0; }

        /* ── CTA ── */
        .hp-cta {
          background: linear-gradient(135deg, #0f2618, #1e4a2c);
          border-radius: 12px;
          padding: 28px 24px;
          text-align: center;
        }
        .hp-cta h2 { color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 8px; }
        .hp-cta p  { color: #d1fae5; font-size: 14px; margin: 0 0 18px; }
        .hp-cta-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .hp-cta-chips { display: flex; gap: 12px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
        .hp-cta-chip { font-size: 13px; color: #d1fae5; display: flex; align-items: center; gap: 5px; }
        .hp-cta-chip i { color: #4ade80; }

        /* ── SEO ── */
        .hp-seo-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 18px 20px;
        }
        .hp-seo-url  { font-size: 14px; color: #16a34a; margin: 0 0 4px; }
        .hp-seo-title { font-size: 18px; color: #1a0dab; font-weight: 500; margin: 0 0 4px; }
        .hp-seo-desc { font-size: 14px; color: #4d5156; margin: 0; line-height: 1.5; }
        .hp-seo-keywords { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
        .hp-seo-kw {
          font-size: 12px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
          padding: 3px 10px;
          border-radius: 20px;
        }

        /* ── Two-col layout ── */
        .hp-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: start;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hp-cards-grid { grid-template-columns: 1fr 1fr; }
          .hp-stats-row { grid-template-columns: repeat(2, 1fr); }
          .hp-testi-cards { grid-template-columns: 1fr; }
          .hp-two-col { grid-template-columns: 1fr; }
          .hp-section { padding: 20px 16px; }
        }

         /* ── Technologies ── */
        .hp-tech-cats { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
        .hp-tech-cat-btn {
          font-size: 12px; font-weight: 600;
          padding: 5px 14px; border-radius: 20px;
          border: 1.5px solid #e5e7eb;
          background: #f9fafb; color: #6b7280;
          cursor: default;
        }
        .hp-tech-cat-btn.active {
          background: #0f2618; color: #4ade80; border-color: #16a34a;
        }
        .hp-tech-orbit-wrap {
          background: #0a1f12;
          border-radius: 12px;
          padding: 24px 20px;
          position: relative;
          overflow: hidden;
        }
        .hp-tech-orbit-center {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; margin-bottom: 20px;
        }
        .hp-tech-orbit-logo {
          width: 52px; height: 52px; object-fit: contain;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 50%; padding: 8px;
        }
        .hp-tech-orbit-logo-placeholder {
          width: 52px; height: 52px;
          background: rgba(255,255,255,0.06);
          border: 1.5px dashed rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.3); font-size: 12px;
        }
        .hp-tech-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-top: 16px;
        }
        .hp-tech-chip {
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          padding: 10px 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
        }
        .hp-tech-chip img {
          width: 28px; height: 28px;
          object-fit: contain;
        }
        .hp-tech-chip-placeholder {
          width: 28px; height: 28px;
          background: rgba(255,255,255,0.08);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
        }
        .hp-tech-chip-placeholder i { color: rgba(255,255,255,0.3); font-size: 15px; }
        .hp-tech-chip-name { font-size: 11px; color: rgba(255,255,255,0.6); text-align: center; }
        .hp-tech-chip-cat {
          font-size: 11px; font-weight: 600; padding: 1px 7px;
          border-radius: 10px; background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.45);
        }
        .hp-tech-inactive { opacity: 0.3; }
        .hp-tech-stats {
          display: flex; gap: 16px; justify-content: center;
          margin-top: 16px; flex-wrap: wrap;
        }
        .hp-tech-stat {
          font-size: 13px; color: rgba(255,255,255,0.5);
          display: flex; align-items: center; gap: 5px;
        }
        .hp-tech-stat span { color: #4ade80; font-weight: 700; }

        /* ── Responsive tech grid ── */
        @media (max-width: 600px) {
          .hp-tech-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hp-cards-grid { grid-template-columns: 1fr 1fr; }
          .hp-stats-row { grid-template-columns: repeat(2, 1fr); }
          .hp-testi-cards { grid-template-columns: 1fr; }
          .hp-two-col { grid-template-columns: 1fr; }
          .hp-section { padding: 20px 16px; }
        }
      `}</style>

      <div className="hp-wrap">
        {/* Browser chrome bar */}
        <div className="hp-header">
          <div className="hp-header-left">
            <div className="hp-dots">
              <div className="hp-dot r" />
              <div className="hp-dot y" />
              <div className="hp-dot g" />
            </div>
            <div className="hp-url">dousoft.com</div>
          </div>
          <div className="hp-label"><i className="bi bi-eye" /> Full Page Preview</div>
        </div>

        {/* ── HERO ── */}
        <div className="hp-section">
          <div className="hp-section-title"><i className="bi bi-house-door" /> Hero Section</div>
          <div className="hp-hero">
            {hero.image ? (
              <img src={hero.image} className="hp-hero-img" alt="" onError={(e) => (e.target.style.display = "none")} />
            ) : (
              <div className="hp-hero-img-placeholder">No image</div>
            )}
            <div className="hp-hero-content">
              <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>
                {hero.heading || <span className="hp-empty">No heading set</span>}
              </h1>
              {hero.description && <p style={{ color: "#d1fae5", fontSize: 13, margin: "0 0 12px" }}>{hero.description}</p>}
              <div className="hp-hero-btns">
                {(hero.primaryBtnText || hero.secondaryBtnText) ? (
                  <>
                    {hero.primaryBtnText && <span className="hp-btn-p">{hero.primaryBtnText}</span>}
                    {hero.secondaryBtnText && <span className="hp-btn-s">{hero.secondaryBtnText}</span>}
                  </>
                ) : (
                  <span className="hp-empty" style={{ color: "rgba(255,255,255,0.3)" }}>No buttons set</span>
                )}
              </div>
              {hero.trustText && <p className="hp-trust">{hero.trustText}</p>}
            </div>
          </div>
        </div>

        {/* ── MARQUEE ── */}
        {marqueeServices.length > 0 && (
          <div className="hp-section" style={{ paddingTop: 16, paddingBottom: 16 }}>
            <div className="hp-section-title"><i className="bi bi-collection-play" /> Marquee Strip</div>
            <div className="hp-marquee">
              {marqueeServices.slice(0, 6).map((s, i) => (
                <span key={i} className="hp-marquee-tag">
                  <span className="hp-marquee-dot">★</span> {s}
                </span>
              ))}
              {marqueeServices.length > 6 && (
                <span className="hp-marquee-tag" style={{ color: "#6b7280" }}>+{marqueeServices.length - 6} more</span>
              )}
            </div>
          </div>
        )}

        {/* ── WHO WE ARE ── */}
        <div className="hp-section">
          <div className="hp-section-title"><i className="bi bi-people" /> Who We Are</div>
          <div className="hp-two-col">
            <div>
              {whoWeAre.badge && <span className="hp-badge">{whoWeAre.badge}</span>}
              <p className="hp-h2">{whoWeAre.heading || <span className="hp-empty">No heading</span>}</p>
              <p className="hp-p">{whoWeAre.description || <span className="hp-empty">No description</span>}</p>
              {whoWeAre.buttonText && <span className="hp-btn-p" style={{ display: "inline-block" }}>{whoWeAre.buttonText}</span>}
            </div>
            <div className="hp-features">
              {(whoWeAre.features || []).filter(f => f.isActive !== false).slice(0, 4).map((f, i) => (
                <div key={i} className="hp-feature-item">
                  <i className={f.icon || "bi bi-check-circle"} />
                  <span>{f.title || `Feature ${i + 1}`}</span>
                </div>
              ))}
              {!(whoWeAre.features?.length) && <span className="hp-empty">No features added</span>}
            </div>
          </div>
        </div>

        {/* ── WHY CHOOSE US ── */}
        {(whyChooseUs.points?.length > 0) && (
          <div className="hp-section">
            <div className="hp-section-title"><i className="bi bi-patch-check" /> Why Choose Us</div>
            <p className="hp-h2">{whyChooseUs.heading || "Why Choose Us"}</p>
            <p className="hp-p">{whyChooseUs.description || ""}</p>
            <div className="hp-cards-grid">
              {whyChooseUs.points.filter(p => p.isActive !== false).slice(0, 3).map((p, i) => (
                <div key={i} className="hp-card">
                  <div className="hp-card-icon"><i className={p.icon || "bi bi-star"} /></div>
                  <p className="hp-h3">{p.title || `Point ${i + 1}`}</p>
                  <p className="hp-p" style={{ fontSize: 13 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FUTURE / SERVICES ── */}
        <div className="hp-section">
          <div className="hp-section-title"><i className="bi bi-gear" /> Services (Future Ready)</div>
          {futureSection.badge && <span className="hp-badge">{futureSection.badge}</span>}
          <p className="hp-h2">
            {futureSection.heading || <span className="hp-empty">No heading</span>}
            {futureSection.highlightText && <span className="hp-highlight"> {futureSection.highlightText}</span>}
          </p>
          <p className="hp-p">{futureSection.description}</p>
          <div className="hp-cards-grid">
            {(futureSection.services || []).slice(0, 6).map((s, i) => (
              <div key={i} className="hp-card">
                <div className="hp-card-icon"><i className="bi bi-gear-fill" /></div>
                <p className="hp-h3">{s.name || `Service ${i + 1}`}</p>
                <p className="hp-p" style={{ fontSize: 13 }}>{s.description?.substring(0, 70)}{s.description?.length > 70 ? "..." : ""}</p>
                {(s.points || []).slice(0, 2).map((pt, j) => (
                  <p key={j} style={{ fontSize: 12, color: "#16a34a", margin: "2px 0" }}>✓ {pt}</p>
                ))}
              </div>
            ))}
            {!(futureSection.services?.length) && <span className="hp-empty">No services added</span>}
          </div>
        </div>

        {/* ── STATS ── */}
        {stats.length > 0 && (
          <div className="hp-section" style={{ background: "#0f2618" }}>
            <div className="hp-section-title" style={{ color: "#4ade80" }}><i className="bi bi-bar-chart" /> Stats / Counter</div>
            <div className="hp-stats-row">
              {stats.map((s, i) => (
                <div key={i} className="hp-stat" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="hp-stat-num" style={{ color: "#4ade80" }}>{s.value}{s.suffix}</div>
                  <div className="hp-stat-lbl" style={{ color: "#d1fae5" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── INDUSTRIES ── */}
        <div className="hp-section">
          <div className="hp-section-title"><i className="bi bi-building" /> Industries We Serve</div>
          {industrySection.badge && <span className="hp-badge">{industrySection.badge}</span>}
          <p className="hp-h2">
            {industrySection.heading || <span className="hp-empty">No heading</span>}
            {industrySection.highlightText && <span className="hp-highlight"> {industrySection.highlightText}</span>}
          </p>
          <div className="hp-cards-grid">
            {(industrySection.industries || []).filter(i => i.isActive !== false).slice(0, 6).map((ind, i) => (
              <div key={i} className="hp-card" style={{ padding: 0, overflow: "hidden" }}>
                {ind.image ? (
                  <img src={ind.image} alt={ind.name} style={{ width: "100%", height: 80, objectFit: "cover", display: "block" }} onError={(e) => (e.target.style.display = "none")} />
                ) : (
                  <div style={{ height: 60, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="bi bi-image" style={{ color: "#d1d5db", fontSize: 20 }} />
                  </div>
                )}
                <div style={{ padding: "10px 12px" }}>
                  <p className="hp-h3" style={{ fontSize: 14 }}>{ind.name || `Industry ${i + 1}`}</p>
                  <p className="hp-p" style={{ fontSize: 12 }}>{ind.description?.substring(0, 50)}{ind.description?.length > 50 ? "..." : ""}</p>
                </div>
              </div>
            ))}
            {!(industrySection.industries?.length) && <span className="hp-empty">No industries added</span>}
          </div>
        </div>

        {(techSection.technologies?.length > 0 || techSection.heading) && (() => {
          const allTechs  = techSection.technologies || [];
          const activeTechs = allTechs.filter(t => t.isActive !== false);
          const cats      = techSection.categories || [];
          const catCounts = cats.reduce((acc, c) => {
            acc[c] = activeTechs.filter(t => t.category === c).length;
            return acc;
          }, {});

          return (
            <div className="hp-section" style={{ background: "#0a1f12" }}>
              <div className="hp-section-title" style={{ color: "#4ade80" }}>
                <i className="bi bi-cpu" /> Technologies
              </div>

              {/* Badge + heading */}
              {techSection.badge && (
                <span className="hp-badge" style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>
                  {techSection.badge}
                </span>
              )}
              <p className="hp-h2" style={{ color: "#fff", marginBottom: 4 }}>
                {techSection.heading || "Our Tech Stack"}
                {techSection.highlightText && (
                  <span style={{ color: "#4ade80" }}> {techSection.highlightText}</span>
                )}
              </p>
              {techSection.description && (
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 16px" }}>
                  {techSection.description}
                </p>
              )}

              {/* Category filter tabs preview */}
              {cats.length > 0 && (
                <div className="hp-tech-cats">
                  <div className="hp-tech-cat-btn active">All ({activeTechs.length})</div>
                  {cats.map((c, i) => (
                    <div key={i} className="hp-tech-cat-btn">
                      {c} {catCounts[c] > 0 && `(${catCounts[c]})`}
                    </div>
                  ))}
                </div>
              )}

              <div className="hp-tech-orbit-wrap">
                {/* Center logo */}
                <div className="hp-tech-orbit-center">
                  {techSection.centerLogo ? (
                    <img src={techSection.centerLogo} className="hp-tech-orbit-logo" alt="center"
                      onError={(e) => (e.target.style.display = "none")} />
                  ) : (
                    <div className="hp-tech-orbit-logo-placeholder">
                      <i className="bi bi-cpu" />
                    </div>
                  )}
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>Center Logo</p>
                </div>

                {/* Tech chips grid */}
                {activeTechs.length > 0 ? (
                  <div className="hp-tech-grid">
                    {activeTechs.slice(0, 15).map((t, i) => {
                      const catIdx = cats.indexOf(t.category);
                      const chipColors = [
                        "#3b82f6","#10b981","#f59e0b","#ec4899","#8b5cf6","#f97316","#14b8a6"
                      ];
                      const chipColor = catIdx >= 0 ? chipColors[catIdx % chipColors.length] : "#6b7280";
                      return (
                        <div key={i} className="hp-tech-chip">
                          {t.logo ? (
                            <img src={t.logo} alt={t.name}
                              onError={(e) => (e.target.style.display = "none")} />
                          ) : (
                            <div className="hp-tech-chip-placeholder">
                              <i className="bi bi-gear" />
                            </div>
                          )}
                          <span className="hp-tech-chip-name">{t.name}</span>
                          {t.category && (
                            <span className="hp-tech-chip-cat" style={{ background: `${chipColor}22`, color: chipColor }}>
                              {t.category}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {activeTechs.length > 15 && (
                      <div className="hp-tech-chip" style={{ justifyContent: "center" }}>
                        <span style={{ fontSize: 15, color: "#4ade80", fontWeight: 700 }}>+{activeTechs.length - 15}</span>
                        <span className="hp-tech-chip-name">more</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "20px 0" }}>
                    No active technologies added yet
                  </p>
                )}

                {/* Summary stats */}
                <div className="hp-tech-stats">
                  <div className="hp-tech-stat"><span>{activeTechs.length}</span> Active Technologies</div>
                  <div className="hp-tech-stat"><span>{cats.length}</span> Categories</div>
                  {allTechs.length > activeTechs.length && (
                    <div className="hp-tech-stat"><span>{allTechs.length - activeTechs.length}</span> Hidden</div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}


        {/* ── AGILE PROCESS ── */}
        {(agileSection.steps?.length > 0) && (
          <div className="hp-section">
            <div className="hp-section-title"><i className="bi bi-arrow-repeat" /> Agile Process</div>
            {agileSection.badge && <span className="hp-badge">{agileSection.badge}</span>}
            <p className="hp-h2">{agileSection.heading}</p>
            <div className="hp-steps">
              {agileSection.steps.map((s, i) => (
                <div key={i} className="hp-step">
                  <div className="hp-step-dot" style={{ background: s.color || "#16a34a" }}>{i + 1}</div>
                  <p className="hp-h3" style={{ fontSize: 13 }}>{s.title}</p>
                  <p className="hp-p" style={{ fontSize: 12 }}>{s.description?.substring(0, 40)}...</p>
                  {s.progress > 0 && (
                    <div style={{ background: "#f3f4f6", height: 4, borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${s.progress}%`, background: s.color || "#16a34a", borderRadius: 2 }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TESTIMONIALS ── */}
        {(testimonialSection.featuredTestimonials?.length > 0) && (
          <div className="hp-section">
            <div className="hp-section-title"><i className="bi bi-chat-quote" /> Testimonials</div>
            {testimonialSection.badge && <span className="hp-badge">{testimonialSection.badge}</span>}
            <p className="hp-h2">{testimonialSection.heading}</p>
            <div className="hp-testi-cards">
              {testimonialSection.featuredTestimonials.filter(t => t.isActive !== false).slice(0, 4).map((t, i) => (
                <div key={i} className="hp-testi-card">
                  <div className="hp-testi-top">
                    {t.image ? (
                      <img src={t.image} className="hp-testi-avatar" alt="" onError={(e) => (e.target.style.display = "none")} />
                    ) : (
                      <div className="hp-testi-avatar-placeholder">{t.name?.[0] || "?"}</div>
                    )}
                    <div>
                      <p className="hp-h3" style={{ fontSize: 13, marginBottom: 2 }}>{t.name || "Client Name"}</p>
                      <p className="hp-p" style={{ fontSize: 11, margin: 0 }}>{t.designation}{t.company ? ` @ ${t.company}` : ""}</p>
                      {t.isVerified && <span className="hp-verified">✓ Verified</span>}
                    </div>
                  </div>
                  <div className="hp-stars">{"★".repeat(Math.min(t.rating || 5, 5))}</div>
                  {t.title && <p className="hp-h3" style={{ fontSize: 13, marginBottom: 4 }}>{t.title}</p>}
                  <p className="hp-testi-quote">{t.quote || t.description}</p>
                  {t.tagLine && <p style={{ fontSize: 12, color: "#16a34a", marginTop: 8, fontWeight: 600 }}>{t.tagLine}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FAQ ── */}
        {(faqSection.faqs?.length > 0) && (
          <div className="hp-section">
            <div className="hp-section-title"><i className="bi bi-question-circle" /> FAQ</div>
            {faqSection.badge && <span className="hp-badge">{faqSection.badge}</span>}
            <p className="hp-h2">{faqSection.heading}</p>
            <div className="hp-faqs">
              {faqSection.faqs.filter(f => f.isActive !== false).slice(0, 5).map((f, i) => (
                <div key={i} className="hp-faq">
                  <span className="hp-faq-q">{f.question || `Question ${i + 1}`}</span>
                  <i className="bi bi-plus-circle hp-faq-icon" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="hp-section">
          <div className="hp-section-title"><i className="bi bi-rocket" /> CTA Section</div>
          <div className="hp-cta">
            {cta.icon && <i className={cta.icon} style={{ fontSize: 28, color: "#4ade80", marginBottom: 12, display: "block" }} />}
            <h2>{cta.heading || <span style={{ opacity: 0.4 }}>No CTA heading set</span>}</h2>
            {cta.description && <p>{cta.description}</p>}
            <div className="hp-cta-btns">
              {cta.primaryBtnText && <span className="hp-btn-p">{cta.primaryBtnText}</span>}
              {cta.secondaryBtnText && <span className="hp-btn-s">{cta.secondaryBtnText}</span>}
            </div>
            {(cta.features || []).length > 0 && (
              <div className="hp-cta-chips">
                {cta.features.map((f, i) => (
                  <span key={i} className="hp-cta-chip"><i className={f.icon || "bi bi-check"} /> {f.title}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── SEO ── */}
        <div className="hp-section">
          <div className="hp-section-title"><i className="bi bi-search" /> SEO / Meta</div>
          <div className="hp-seo-card">
            <p className="hp-seo-url">https://dousoft.com</p>
            <p className="hp-seo-title">{seo.title || <span className="hp-empty">Meta title not set</span>}</p>
            <p className="hp-seo-desc">{seo.description || <span className="hp-empty">Meta description not set</span>}</p>
            {(seo.keywords || []).length > 0 && (
              <div className="hp-seo-keywords">
                {seo.keywords.slice(0, 8).map((kw, i) => <span key={i} className="hp-seo-kw">{kw}</span>)}
                {seo.keywords.length > 8 && <span className="hp-seo-kw">+{seo.keywords.length - 8} more</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}