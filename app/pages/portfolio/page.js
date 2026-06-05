/* eslint-disable react-hooks/static-components */
"use client";
import React, { useState, useEffect, useRef } from "react";
import CmsTabs from "../../Components/CmsTabs";     
import { createPortfolioPageServ, getPortfolioPageServ } from "@/app/services/pages.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePageSkeleton = () => {
  return (
    <div className="cms-content p-4">
      {/* Left Editor Panel */}
      <div className="editor-panel">
        <Skeleton height={40} width={250} />

        <div style={{ marginTop: 20 }}>
          <Skeleton height={20} width={120} />
          <Skeleton height={45} style={{ marginTop: 8 }} />
        </div>

        <div style={{ marginTop: 20 }}>
          <Skeleton height={20} width={150} />
          <Skeleton height={100} style={{ marginTop: 8 }} />
        </div>

        <div style={{ marginTop: 20 }}>
          <Skeleton height={20} width={120} />
          <Skeleton height={45} style={{ marginTop: 8 }} />
        </div>

        <div style={{ marginTop: 20 }}>
          <Skeleton height={45} width={140} />
        </div>
      </div>

      {/* Right Preview Panel */}
      <div className="preview-panel">
        <Skeleton height={250} borderRadius={12} />

        <div style={{ marginTop: 20 }}>
          <Skeleton height={30} width="60%" />
          <Skeleton count={3} />
        </div>

        <div style={{ marginTop: 20 }}>
          <Skeleton height={180} borderRadius={12} />
        </div>
      </div>
    </div>
  );
};

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "hero",                    label: "Hero",              icon: "bi bi-image" },
  { key: "projectInfo",             label: "Project Info",      icon: "bi bi-info-circle" },
  { key: "executiveSummary",        label: "Executive Summary", icon: "bi bi-file-text" },
  { key: "digitalFootprint",        label: "Digital Footprint", icon: "bi bi-globe" },
  { key: "metricsSection",          label: "Metrics",           icon: "bi bi-graph-up" },
  { key: "salesMetrics",            label: "Sales & Revenue",   icon: "bi bi-currency-dollar" },
  { key: "customerInsights",        label: "Customer Insights", icon: "bi bi-people" },
  { key: "growth",                  label: "Growth",            icon: "bi bi-arrow-up-right" },
  { key: "marketingChannelsSection",label: "Marketing",         icon: "bi bi-megaphone" },
  { key: "productPortfolio",        label: "Product Portfolio", icon: "bi bi-box" },
  { key: "technology",              label: "Tech Stack",        icon: "bi bi-cpu" },
  { key: "seo",                     label: "SEO",               icon: "bi bi-search" },
];

// ─── Shared Primitives ────────────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="pf-field">
    <label className="pf-label">{label}</label>
    {children}
    {hint && <p className="pf-hint">{hint}</p>}
  </div>
);
const Input    = (props) => <input className="pf-input" {...props} />;
const Textarea = ({ rows = 3, ...props }) => <textarea className="pf-textarea" rows={rows} {...props} />;

const Toggle = ({ label, checked, onChange }) => (
  <div className="pf-toggle-row">
    <span className="pf-label">{label}</span>
    <label className="pf-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="pf-slider" />
    </label>
  </div>
);

const ImageUpload = ({ label, value, onChange, hint }) => (
  <Field label={label} hint={hint}>
    <div className="pf-img-upload">
      {value ? (
        <div className="pf-img-preview">
          <img src={value} alt="preview" onError={(e) => (e.target.style.display = "none")} />
          <button className="pf-img-remove" onClick={() => onChange("")}><i className="bi bi-x" /></button>
        </div>
      ) : (
        <label className="pf-img-placeholder">
          <i className="bi bi-cloud-upload" />
          <span>Click to upload</span>
          <input type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files[0]; if (f) onChange(URL.createObjectURL(f)); }} />
        </label>
      )}
      <input className="pf-input" style={{ marginTop: 8 }} placeholder="Or paste image URL..."
        value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  </Field>
);

// Collapsible sortable list item
const SortableItem = ({ index, onMoveUp, onMoveDown, onDelete, title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pf-list-item">
      <div className="pf-list-header" onClick={() => setOpen((p) => !p)}>
        <div className="pf-list-header-left">
          <i className={`bi bi-chevron-${open ? "down" : "right"} pf-chevron`} />
          <span className="pf-list-title">{title || `Item ${index + 1}`}</span>
        </div>
        <div className="pf-list-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={onMoveUp}><i className="bi bi-arrow-up" /></button>
          <button onClick={onMoveDown}><i className="bi bi-arrow-down" /></button>
          <button className="danger" onClick={onDelete}><i className="bi bi-trash" /></button>
        </div>
      </div>
      {open && <div className="pf-list-body">{children}</div>}
    </div>
  );
};

// Simple tag-row list (for string arrays like points / channels)
const StringListEditor = ({ label, hint, items = [], onChange, placeholder = "Add item..." }) => {
  const add = () => onChange([...items, ""]);
  const upd = (i, v) => { const a = [...items]; a[i] = v; onChange(a); };
  const rem = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="pf-field">
      <div className="pf-para-header">
        <label className="pf-label">{label}</label>
        <button className="pf-add-inline-btn" onClick={add}><i className="bi bi-plus-circle" /> Add</button>
      </div>
      {hint && <p className="pf-hint" style={{ marginBottom: 8 }}>{hint}</p>}
      {items.map((item, i) => (
        <div key={i} className="pf-tag-row">
          <div className="pf-para-num">{i + 1}</div>
          <Input value={item} onChange={(e) => upd(i, e.target.value)} placeholder={placeholder} style={{ flex: 1 }} />
          <button className="pf-icon-btn danger" onClick={() => rem(i)}><i className="bi bi-trash" /></button>
        </div>
      ))}
      {items.length === 0 && <div className="pf-empty-state">No items yet.</div>}
    </div>
  );
};

// KV pair list (label + value pairs)
const KVListEditor = ({ label, hint, items = [], onChange, valuePlaceholder = "Value", labelPlaceholder = "Label" }) => {
  const add = () => onChange([...items, { label: "", value: "" }]);
  const upd = (i, k, v) => { const a = [...items]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const rem = (i) => onChange(items.filter((_, idx) => idx !== i));
  const mov = (i, d) => {
    const a = [...items]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; onChange(a);
  };
  return (
    <div className="pf-field">
      <div className="pf-para-header">
        <label className="pf-label">{label}</label>
        <button className="pf-add-inline-btn" onClick={add}><i className="bi bi-plus-circle" /> Add</button>
      </div>
      {hint && <p className="pf-hint" style={{ marginBottom: 8 }}>{hint}</p>}
      {items.map((item, i) => (
        <SortableItem key={i} index={i} title={item.label || item.value || `Item ${i + 1}`}
          onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)} defaultOpen={i < 3}>
          <div className="pf-grid-2">
            <Field label={labelPlaceholder}>
              <Input value={item.label} onChange={(e) => upd(i, "label", e.target.value)} placeholder={labelPlaceholder} />
            </Field>
            <Field label={valuePlaceholder}>
              <Input value={item.value} onChange={(e) => upd(i, "value", e.target.value)} placeholder={valuePlaceholder} />
            </Field>
          </div>
        </SortableItem>
      ))}
      {items.length === 0 && <div className="pf-empty-state">No items yet.</div>}
    </div>
  );
};

// ─── Section Editors ──────────────────────────────────────────────────────────

// 1. HERO
const HeroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-image" /> Hero / Banner</p>
      <p className="pf-section-hint">Top banner shown on the portfolio detail page.</p>
      <Field label="Page Title"><Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Portfolio — Client Name" /></Field>
      <Field label="Breadcrumb" hint='e.g. "Home / Portfolio / Project Name"'>
        <Input value={data?.breadcrumb || ""} onChange={(e) => u("breadcrumb", e.target.value)} placeholder="Home / Portfolio" />
      </Field>
      <Field label="Short Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} placeholder="Brief intro shown in the hero..." rows={3} />
      </Field>
    </div>
  );
};

// 2. PROJECT INFO
const ProjectInfoEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-info-circle" /> Project Info Card</p>
      <p className="pf-section-hint">Displayed as a summary card at the top of the portfolio page.</p>
      <div className="pf-grid-2">
        <Field label="Project Title"><Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Project / Client Name" /></Field>
        <Field label="Subtitle"><Input value={data?.subtitle || ""} onChange={(e) => u("subtitle", e.target.value)} placeholder="e.g. E-Commerce Platform" /></Field>
        <Field label="Website URL"><Input value={data?.website || ""} onChange={(e) => u("website", e.target.value)} placeholder="https://example.com" /></Field>
        <Field label="Location"><Input value={data?.location || ""} onChange={(e) => u("location", e.target.value)} placeholder="e.g. India / USA" /></Field>
        <Field label="Industry"><Input value={data?.industry || ""} onChange={(e) => u("industry", e.target.value)} placeholder="e.g. Healthcare" /></Field>
        <Field label="Business Model"><Input value={data?.businessModel || ""} onChange={(e) => u("businessModel", e.target.value)} placeholder="e.g. B2B SaaS" /></Field>
      </div>
      <Field label="Tagline / One-liner"><Input value={data?.tagline || ""} onChange={(e) => u("tagline", e.target.value)} placeholder="A short punchy line about the project" /></Field>
    </div>
  );
};

// 3. EXECUTIVE SUMMARY
const ExecutiveSummaryEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const paras = data?.paragraphs || [];
  const addP = () => u("paragraphs", [...paras, ""]);
  const updP = (i, v) => { const a = [...paras]; a[i] = v; u("paragraphs", a); };
  const remP = (i) => u("paragraphs", paras.filter((_, idx) => idx !== i));
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-file-text" /> Executive Summary</p>
      <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Executive Summary" /></Field>
      {/* <Field label="Highlight Text" hint="A short bold statement shown prominently">
        <Input value={data?.highlightText || ""} onChange={(e) => u("highlightText", e.target.value)} placeholder="e.g. 300% ROI in 6 months" />
      </Field> */}

      <div className="pf-para-section">
        <div className="pf-para-header">
          <label className="pf-label">Paragraphs</label>
          <button className="pf-add-inline-btn" onClick={addP}><i className="bi bi-plus-circle" /> Add Paragraph</button>
        </div>
        <p className="pf-hint" style={{ marginBottom: 10 }}>Each entry = one paragraph on the page.</p>
        {paras.map((p, i) => (
          <div key={i} className="pf-tag-row" style={{ alignItems: "flex-start" }}>
            <div className="pf-para-num" style={{ marginTop: 10 }}>{i + 1}</div>
            <Textarea value={p} onChange={(e) => updP(i, e.target.value)} rows={2} placeholder={`Paragraph ${i + 1}...`} style={{ flex: 1 }} />
            <button className="pf-icon-btn danger" style={{ marginTop: 8 }} onClick={() => remP(i)}><i className="bi bi-trash" /></button>
          </div>
        ))}
        {paras.length === 0 && <div className="pf-empty-state">No paragraphs yet.</div>}
      </div>
      <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)} hint="Image shown beside the summary text" />
    </div>
  );
};

// 4. DIGITAL FOOTPRINT
const DigitalFootprintEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-globe" /> Digital Footprint</p>
      <Field label="Section Title"><Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Digital Footprint" /></Field>
      <StringListEditor label="Key Points" hint="Each point = one bullet item"
        items={data?.points || []} onChange={(v) => u("points", v)} placeholder="e.g. 1M+ monthly visitors" />
      <div className="pf-grid-2" style={{ marginTop: 16 }}>
        <Field label="Button Text"><Input value={data?.buttonText || ""} onChange={(e) => u("buttonText", e.target.value)} placeholder="View Website" /></Field>
        <Field label="Button Link"><Input value={data?.buttonLink || ""} onChange={(e) => u("buttonLink", e.target.value)} placeholder="https://..." /></Field>
      </div>
      <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)} />
    </div>
  );
};

// 5. METRICS
const MetricsSectionEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const metrics = data?.metrics || [];
  const add = () => u("metrics", [...metrics, { label: "", value: "", order: metrics.length }]);
  const upd = (i, k, v) => { const a = [...metrics]; a[i] = { ...a[i], [k]: v }; u("metrics", a); };
  const rem = (i) => u("metrics", metrics.filter((_, idx) => idx !== i).map((m, idx) => ({ ...m, order: idx })));
  const mov = (i, d) => {
    const a = [...metrics]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("metrics", a.map((m, idx) => ({ ...m, order: idx })));
  };
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-graph-up" /> Metrics Section</p>
      <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Key Metrics" /></Field>
      <ImageUpload label="Section Image / Chart" value={data?.image} onChange={(v) => u("image", v)} hint="Chart or infographic image" />

      <div className="pf-para-header" style={{ marginTop: 16 }}>
        <label className="pf-label">Metrics ({metrics.length})</label>
        <button className="pf-add-inline-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Metric</button>
      </div>
      {metrics.map((m, i) => (
        <SortableItem key={i} index={i} title={`${m.value || "—"} ${m.label || ""}`}
          onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
          <div className="pf-grid-2">
            <Field label="Value" hint='e.g. "300%" or "$2M"'>
              <Input value={m.value} onChange={(e) => upd(i, "value", e.target.value)} placeholder="300%" />
            </Field>
            <Field label="Label">
              <Input value={m.label} onChange={(e) => upd(i, "label", e.target.value)} placeholder="Revenue Growth" />
            </Field>
          </div>
        </SortableItem>
      ))}
      {metrics.length === 0 && <div className="pf-empty-state">No metrics yet.</div>}

      {/* Inline preview */}
      {metrics.length > 0 && (
        <div className="pf-metrics-preview">
          {metrics.map((m, i) => (
            <div key={i} className="pf-metric-chip">
              <span className="pf-metric-val">{m.value}</span>
              <span className="pf-metric-lbl">{m.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 6. SALES & REVENUE
const SalesMetricsEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-currency-dollar" /> Sales & Revenue</p>
      <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Sales & Revenue Overview" /></Field>
      <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)} hint="Revenue chart or related image" />
      <KVListEditor label="KPI Items" hint="Key performance indicators shown as cards"
        items={data?.kpis || []} onChange={(v) => u("kpis", v)}
        labelPlaceholder="KPI Label" valuePlaceholder="KPI Value" />
    </div>
  );
};

// 7. CUSTOMER INSIGHTS
const CustomerInsightsEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-people" /> Customer Insights</p>
      <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Customer Insights" /></Field>
      <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)} />
      <StringListEditor label="Insight Points" items={data?.points || []} onChange={(v) => u("points", v)}
        placeholder="e.g. 85% repeat purchase rate" />
    </div>
  );
};

// 8. GROWTH
const GrowthEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-arrow-up-right" /> Growth Section</p>
      <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Our Growth Story" /></Field>
      <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} /></Field>
      <KVListEditor label="Growth Items" hint="Shown as stat cards (value + label)"
        items={data?.items || []} onChange={(v) => u("items", v)}
        labelPlaceholder="Label" valuePlaceholder="Value (e.g. 5x)" />
    </div>
  );
};

// 9. MARKETING CHANNELS
const MarketingChannelsEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-megaphone" /> Marketing Channels</p>
      <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Our Marketing Channels" /></Field>
      <StringListEditor label="Channels" hint="Each item shown as a tag/chip"
        items={data?.marketingChannels || []} onChange={(v) => u("marketingChannels", v)}
        placeholder="e.g. SEO, Google Ads, Instagram" />

      {/* Chip preview */}
      {(data?.marketingChannels || []).length > 0 && (
        <div className="pf-chips-preview">
          {data.marketingChannels.map((ch, i) => (
            <span key={i} className="pf-channel-chip">{ch}</span>
          ))}
        </div>
      )}
    </div>
  );
};

// 10. PRODUCT PORTFOLIO
const ProductPortfolioEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-box" /> Product Portfolio</p>
      <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Product Portfolio" /></Field>
      <StringListEditor label="Portfolio Points" items={data?.points || []} onChange={(v) => u("points", v)}
        placeholder="e.g. Mobile App, Admin Dashboard" />
      <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)} />
    </div>
  );
};

// 11. TECHNOLOGY STACK
const TECH_COLORS = ["#3b82f6","#10b981","#f59e0b","#ec4899","#8b5cf6","#f97316","#14b8a6","#ef4444","#6366f1","#84cc16"];

const TechnologyEditor = ({ data, onChange }) => {
  const items = data || [];
  const add = () => onChange([...items, { label: "", value: "" }]);
  const upd = (i, k, v) => { const a = [...items]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const rem = (i) => onChange(items.filter((_, idx) => idx !== i));
  const mov = (i, d) => {
    const a = [...items]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; onChange(a);
  };
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-cpu" /> Technology Stack</p>
      <p className="pf-section-hint">Each entry = one tech category row (e.g. Frontend: React, Next.js).</p>
      {items.map((item, i) => (
        <SortableItem key={i} index={i} title={item.label ? `${item.label}: ${item.value}` : `Tech ${i + 1}`}
          onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
          <div className="pf-grid-2">
            <Field label="Category"><Input value={item.label} onChange={(e) => upd(i, "label", e.target.value)} placeholder="e.g. Frontend" /></Field>
            <Field label="Technologies"><Input value={item.value} onChange={(e) => upd(i, "value", e.target.value)} placeholder="e.g. React, Next.js, Tailwind" /></Field>
          </div>
        </SortableItem>
      ))}
      {items.length === 0 && <div className="pf-empty-state">No tech stack items yet.</div>}
      <button className="pf-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Tech Category</button>

      {/* Inline preview */}
      {items.length > 0 && (
        <div className="pf-tech-preview">
          {items.map((t, i) => (
            <div key={i} className="pf-tech-row-preview">
              <span className="pf-tech-cat" style={{ background: `${TECH_COLORS[i % TECH_COLORS.length]}18`, color: TECH_COLORS[i % TECH_COLORS.length], borderColor: `${TECH_COLORS[i % TECH_COLORS.length]}40` }}>
                {t.label || "Category"}
              </span>
              <div className="pf-tech-vals">
                {(t.value || "").split(",").filter(Boolean).map((v, j) => (
                  <span key={j} className="pf-tech-val-chip">{v.trim()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 12. SEO
const SeoEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const descLen = (data?.description || "").length;
  return (
    <div className="pf-section-block">
      <p className="pf-block-title"><i className="bi bi-search" /> SEO Meta Tags</p>
      <div className="pf-grid-2">
        <Field label="Meta Title" hint="50–60 characters recommended">
          <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} maxLength={70} />
          <p className={`pf-char-count ${(data?.title||"").length>60?"over":""}`}>{(data?.title||"").length}/70</p>
        </Field>
        <Field label="Canonical URL" hint="Self-referencing canonical link">
          <Input value={data?.canonical || ""} onChange={(e) => u("canonical", e.target.value)} placeholder="https://yourdomain.com/portfolio/project" />
        </Field>
      </div>
      <Field label="Meta Description" hint="150–160 characters recommended">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} maxLength={170} />
        <p className={`pf-char-count ${descLen>160?"over":""}`}>{descLen}/170</p>
      </Field>
      <Field label="Keywords (comma separated)">
        <Textarea value={(data?.keywords||[]).join(", ")} rows={2} placeholder="portfolio, case study, ..."
          onChange={(e) => u("keywords", e.target.value.split(",").map((s)=>s.trim()).filter(Boolean))} />
      </Field>
      {/* SERP preview */}
      <div className="pf-serp-wrap">
        <p className="pf-serp-label"><i className="bi bi-google" /> Google SERP Preview</p>
        <div className="pf-serp-box">
          <p className="pf-serp-url">{data?.canonical || "https://yourdomain.com/portfolio/project"}</p>
          <p className="pf-serp-title">{data?.title || <span className="pf-serp-empty">Meta title not set...</span>}</p>
          <p className="pf-serp-desc">{data?.description || <span className="pf-serp-empty">Meta description will appear here...</span>}</p>
        </div>
        {(data?.keywords||[]).length > 0 && (
          <div className="pf-kw-chips">
            {data.keywords.map((kw,i) => <span key={i} className="pf-kw-chip">{kw}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Full-page Preview ────────────────────────────────────────────────────────
const PortfolioPreview = ({ formData }) => {
  const {
    hero = {}, projectInfo = {}, executiveSummary = {}, digitalFootprint = {},
    metricsSection = {}, salesMetrics = {}, customerInsights = {},
    growth = {}, marketingChannelsSection = {}, productPortfolio = {},
    technology = [], seo = {},
  } = formData;

  const Section = ({ icon, label, children, dark = false }) => (
    <div className="pfpv-section" style={dark ? { background: "#0a1a10" } : {}}>
      <div className="pfpv-sec-label" style={dark ? { color: "#4ade80" } : {}}><i className={icon} /> {label}</div>
      {children}
    </div>
  );

  const Empty = ({ text = "Not set" }) => <span className="pfpv-empty">{text}</span>;

  return (
    <div className="pfpv-wrap">
      {/* Browser chrome */}
      <div className="pfpv-chrome">
        <div className="pfpv-chrome-left">
          <div className="pfpv-dots"><span className="pfpv-dot r"/><span className="pfpv-dot y"/><span className="pfpv-dot g"/></div>
          <div className="pfpv-url">{seo?.canonical || "yourdomain.com/portfolio/project"}</div>
        </div>
        <span className="pfpv-chrome-label"><i className="bi bi-eye" /> Full Page Preview</span>
      </div>

      {/* ── HERO ── */}
      <div className="pfpv-hero">
       
        <h1 className="pfpv-hero-title">{hero.title || <Empty text="Page title not set" />}</h1>
       
         <div className="pfpv-hero-bread">{hero.breadcrumb || "Home / Portfolio"}</div>
          {hero.description && <p className="pfpv-hero-desc">{hero.description}</p>}
      </div>

      {/* ── PROJECT INFO CARD ── */}
      {(projectInfo.title || projectInfo.subtitle) && (
        <Section icon="bi bi-info-circle" label="Project Info">
          <div className="pfpv-info-card">
            <div className="pfpv-info-main">
              <h2 className="pfpv-h2">{projectInfo.title}</h2>
              {projectInfo.subtitle && <p className="pfpv-subtitle">{projectInfo.subtitle}</p>}
              {projectInfo.tagline  && <p className="pfpv-tagline">{projectInfo.tagline}</p>}
            </div>
            <div className="pfpv-info-meta">
              {[
                { icon: "bi bi-globe",        val: projectInfo.website       },
                { icon: "bi bi-geo-alt",      val: projectInfo.location      },
                { icon: "bi bi-building",     val: projectInfo.industry      },
                { icon: "bi bi-diagram-3",    val: projectInfo.businessModel },
              ].filter(r => r.val).map((r, i) => (
                <div key={i} className="pfpv-meta-row"><i className={r.icon} /><span>{r.val}</span></div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── EXECUTIVE SUMMARY ── */}
      {(executiveSummary.heading || (executiveSummary.paragraphs||[]).length > 0) && (
        <Section icon="bi bi-file-text" label="Executive Summary">
          {executiveSummary.highlightText && (
            <div className="pfpv-highlight-banner">{executiveSummary.highlightText}</div>
          )}
          <div className="pfpv-two-col">
            <div>
              <h2 className="pfpv-h2">{executiveSummary.heading}</h2>
              {(executiveSummary.paragraphs||[]).slice(0,2).map((p,i)=>(
                <p key={i} className="pfpv-p">{p}</p>
              ))}
              {(executiveSummary.paragraphs||[]).length > 2 && (
                <p className="pfpv-more">+{executiveSummary.paragraphs.length - 2} more paragraphs</p>
              )}
            </div>
            <div className="pfpv-img-col">
              {executiveSummary.image
                ? <img src={executiveSummary.image} className="pfpv-img" alt="" onError={(e)=>e.target.style.display="none"} />
                : <div className="pfpv-img-placeholder"><i className="bi bi-image" /></div>}
            </div>
          </div>
        </Section>
      )}

      {/* ── DIGITAL FOOTPRINT ── */}
      {(digitalFootprint.title || (digitalFootprint.points||[]).length > 0) && (
        <Section icon="bi bi-globe" label="Digital Footprint" dark>
          <div className="pfpv-two-col">
            <div>
              <h2 className="pfpv-h2" style={{color:"#fff"}}>{digitalFootprint.title}</h2>
              <ul className="pfpv-bullet-list">
                {(digitalFootprint.points||[]).slice(0,5).map((pt,i)=>(
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              {(digitalFootprint.points||[]).length > 5 && (
                <p className="pfpv-more" style={{color:"rgba(255,255,255,.4)"}}>+{digitalFootprint.points.length-5} more</p>
              )}
              {digitalFootprint.buttonText && (
                <div className="pfpv-btn-preview">{digitalFootprint.buttonText} →</div>
              )}
            </div>
            <div className="pfpv-img-col">
              {digitalFootprint.image
                ? <img src={digitalFootprint.image} className="pfpv-img" alt="" onError={(e)=>e.target.style.display="none"} />
                : <div className="pfpv-img-placeholder" style={{background:"rgba(255,255,255,.05)",borderColor:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.2)"}}><i className="bi bi-image" /></div>}
            </div>
          </div>
        </Section>
      )}

      {/* ── METRICS ── */}
      {((metricsSection.metrics||[]).length > 0 || metricsSection.heading) && (
        <Section icon="bi bi-graph-up" label="Metrics">
          <h2 className="pfpv-h2">{metricsSection.heading}</h2>
          {metricsSection.image && (
            <img src={metricsSection.image} className="pfpv-img pfpv-img-full" alt="" onError={(e)=>e.target.style.display="none"} />
          )}
          <div className="pfpv-metrics-grid">
            {(metricsSection.metrics||[]).map((m,i)=>(
              <div key={i} className="pfpv-metric-card">
                <div className="pfpv-metric-val">{m.value}</div>
                <div className="pfpv-metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── SALES & REVENUE ── */}
      {(salesMetrics.heading || (salesMetrics.kpis||[]).length > 0) && (
        <Section icon="bi bi-currency-dollar" label="Sales & Revenue" dark>
          <div className="pfpv-two-col">
            <div>
              <h2 className="pfpv-h2" style={{color:"#fff"}}>{salesMetrics.heading}</h2>
              <div className="pfpv-kpi-grid">
                {(salesMetrics.kpis||[]).map((k,i)=>(
                  <div key={i} className="pfpv-kpi-card">
                    <div className="pfpv-kpi-val">{k.value}</div>
                    <div className="pfpv-kpi-lbl">{k.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pfpv-img-col">
              {salesMetrics.image
                ? <img src={salesMetrics.image} className="pfpv-img" alt="" onError={(e)=>e.target.style.display="none"} />
                : <div className="pfpv-img-placeholder" style={{background:"rgba(255,255,255,.05)",borderColor:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.2)"}}><i className="bi bi-image" /></div>}
            </div>
          </div>
        </Section>
      )}

      {/* ── CUSTOMER INSIGHTS ── */}
      {(customerInsights.heading || (customerInsights.points||[]).length > 0) && (
        <Section icon="bi bi-people" label="Customer Insights">
          <div className="pfpv-two-col">
            <div>
              <h2 className="pfpv-h2">{customerInsights.heading}</h2>
              <ul className="pfpv-bullet-list pfpv-bullet-green">
                {(customerInsights.points||[]).map((pt,i)=><li key={i}>{pt}</li>)}
              </ul>
            </div>
            <div className="pfpv-img-col">
              {customerInsights.image
                ? <img src={customerInsights.image} className="pfpv-img" alt="" onError={(e)=>e.target.style.display="none"} />
                : <div className="pfpv-img-placeholder"><i className="bi bi-image" /></div>}
            </div>
          </div>
        </Section>
      )}

      {/* ── GROWTH ── */}
      {(growth.heading || (growth.items||[]).length > 0) && (
        // eslint-disable-next-line react-hooks/static-components
        <Section icon="bi bi-arrow-up-right" label="Growth" dark>
          <h2 className="pfpv-h2" style={{color:"#fff"}}>{growth.heading}</h2>
          {growth.description && <p className="pfpv-p" style={{color:"rgba(255,255,255,.6)"}}>{growth.description}</p>}
          <div className="pfpv-growth-grid">
            {(growth.items||[]).map((g,i)=>(
              <div key={i} className="pfpv-growth-card">
                <div className="pfpv-growth-val">{g.value}</div>
                <div className="pfpv-growth-lbl">{g.label}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── MARKETING CHANNELS ── */}
      {((marketingChannelsSection.marketingChannels||[]).length > 0) && (
        <Section icon="bi bi-megaphone" label="Marketing Channels">
          <h2 className="pfpv-h2">{marketingChannelsSection.heading}</h2>
          <div className="pfpv-channels-wrap">
            {(marketingChannelsSection.marketingChannels||[]).map((ch,i)=>(
              <span key={i} className="pfpv-channel-chip" style={{
                background:`${TECH_COLORS[i%TECH_COLORS.length]}15`,
                color: TECH_COLORS[i%TECH_COLORS.length],
                borderColor:`${TECH_COLORS[i%TECH_COLORS.length]}40`
              }}>{ch}</span>
            ))}
          </div>
        </Section>
      )}

      {/* ── PRODUCT PORTFOLIO ── */}
      {(productPortfolio.heading || (productPortfolio.points||[]).length > 0) && (
        <Section icon="bi bi-box" label="Product Portfolio">
          <div className="pfpv-two-col">
            <div>
              <h2 className="pfpv-h2">{productPortfolio.heading}</h2>
              <ul className="pfpv-bullet-list pfpv-bullet-green">
                {(productPortfolio.points||[]).map((pt,i)=><li key={i}>{pt}</li>)}
              </ul>
            </div>
            <div className="pfpv-img-col">
              {productPortfolio.image
                ? <img src={productPortfolio.image} className="pfpv-img" alt="" onError={(e)=>e.target.style.display="none"} />
                : <div className="pfpv-img-placeholder"><i className="bi bi-image" /></div>}
            </div>
          </div>
        </Section>
      )}

      {/* ── TECHNOLOGY STACK ── */}
      {technology.length > 0 && (
        <Section icon="bi bi-cpu" label="Technology Stack" dark>
          <div className="pfpv-tech-table">
            {technology.map((t,i)=>(
              <div key={i} className="pfpv-tech-row">
                <span className="pfpv-tech-cat" style={{
                  background:`${TECH_COLORS[i%TECH_COLORS.length]}20`,
                  color: TECH_COLORS[i%TECH_COLORS.length],
                  borderColor:`${TECH_COLORS[i%TECH_COLORS.length]}40`
                }}>{t.label}</span>
                <div className="pfpv-tech-chips">
                  {(t.value||"").split(",").filter(Boolean).map((v,j)=>(
                    <span key={j} className="pfpv-tech-chip">{v.trim()}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── SEO ── */}
      <Section icon="bi bi-search" label="SEO">
        <div className="pf-serp-box" style={{maxWidth:560}}>
          <p className="pf-serp-url">{seo.canonical || "yourdomain.com/portfolio/project"}</p>
          <p className="pf-serp-title">{seo.title || <span className="pfpv-empty">Meta title not set</span>}</p>
          <p className="pf-serp-desc">{seo.description || <span className="pfpv-empty">Meta description not set</span>}</p>
        </div>
      </Section>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PortfolioAdminPage() {
  const [activeTab, setActiveTab]     = useState("hero");
  const [formData, setFormData]       = useState({});
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [toast, setToast]             = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [unsaved, setUnsaved]         = useState(false);
  const toastRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPortfolioPageServ();
                if (res?.data?.success) {
               const data = res.data.data;
               if (data) {
                 setFormData(data);
                 setIsPublished(data.isPublished !== false);
               }
            }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
       const payload = { ...formData, isPublished }; 
       const res = await createPortfolioPageServ(payload);
      if (res.data?.success) { showToast("Portfolio page saved successfully!", "success"); setUnsaved(false); }
      else showToast("Failed to save. Please try again.", "error");
    } catch { showToast("Network error.", "error"); }
    finally { setSaving(false);
        
     }
  };

  const update = (section, val) => {
    setFormData((prev) => ({ ...prev, [section]: val }));
    setUnsaved(true);
  };

  const renderEditor = () => {
    switch (activeTab) {
      case "hero":                     return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
      case "projectInfo":              return <ProjectInfoEditor data={formData.projectInfo} onChange={(v) => update("projectInfo", v)} />;
      case "executiveSummary":         return <ExecutiveSummaryEditor data={formData.executiveSummary} onChange={(v) => update("executiveSummary", v)} />;
      case "digitalFootprint":         return <DigitalFootprintEditor data={formData.digitalFootprint} onChange={(v) => update("digitalFootprint", v)} />;
      case "metricsSection":           return <MetricsSectionEditor data={formData.metricsSection} onChange={(v) => update("metricsSection", v)} />;
      case "salesMetrics":             return <SalesMetricsEditor data={formData.salesMetrics} onChange={(v) => update("salesMetrics", v)} />;
      case "customerInsights":         return <CustomerInsightsEditor data={formData.customerInsights} onChange={(v) => update("customerInsights", v)} />;
      case "growth":                   return <GrowthEditor data={formData.growth} onChange={(v) => update("growth", v)} />;
      case "marketingChannelsSection": return <MarketingChannelsEditor data={formData.marketingChannelsSection} onChange={(v) => update("marketingChannelsSection", v)} />;
      case "productPortfolio":         return <ProductPortfolioEditor data={formData.productPortfolio} onChange={(v) => update("productPortfolio", v)} />;
      case "technology":               return <TechnologyEditor data={formData.technology} onChange={(v) => update("technology", v)} />;
      case "seo":                      return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
      default: return null;
    }
  };

  if (loading) return (
  <HomePageSkeleton/> 
  );

  return (
    <>
      <style>{`
        /* ── Layout ── */
        .pf-content       { padding: 24px; background: #f9fafb; min-height: 60vh; }
        .pf-grid-2        { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .pf-grid-3        { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

        /* ── Blocks ── */
        .pf-section-block  { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; margin-bottom: 18px; }
        .pf-block-title    { font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 6px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 7px; }
        .pf-block-title i  { color: #16a34a; }
        .pf-section-hint   { font-size: 14px; color: #9ca3af; margin: 0 0 16px; }

        /* ── Fields ── */
        .pf-field          { margin-bottom: 16px; }
        .pf-field:last-child { margin-bottom: 0; }
        .pf-label          { display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .pf-hint           { font-size: 13px; color: #9ca3af; margin-top: 4px; }
        .pf-input          { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; color: #111827; background: #fff; outline: none; transition: border .15s; box-sizing: border-box; }
        .pf-input:focus    { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .pf-textarea       { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; color: #111827; background: #fff; outline: none; resize: vertical; font-family: inherit; transition: border .15s; box-sizing: border-box; line-height: 1.6; }
        .pf-textarea:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .pf-char-count     { font-size: 13px; color: #9ca3af; text-align: right; margin-top: 3px; }
        .pf-char-count.over { color: #ef4444; }

        /* ── Image upload ── */
        .pf-img-upload     { display: flex; flex-direction: column; gap: 8px; }
        .pf-img-preview    { position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .pf-img-preview img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .pf-img-remove     { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.6); color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .pf-img-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 28px; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer; color: #9ca3af; font-size: 14px; text-align: center; transition: border .15s; }
        .pf-img-placeholder:hover { border-color: #16a34a; color: #16a34a; }
        .pf-img-placeholder i { font-size: 26px; }

        /* ── Toggle ── */
        .pf-toggle-row     { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
        .pf-switch         { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
        .pf-switch input   { opacity: 0; width: 0; height: 0; }
        .pf-slider         { position: absolute; inset: 0; background: #d1d5db; border-radius: 24px; cursor: pointer; transition: .2s; }
        .pf-slider:before  { content: ""; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
        .pf-switch input:checked + .pf-slider { background: #16a34a; }
        .pf-switch input:checked + .pf-slider:before { transform: translateX(18px); }

        /* ── Sortable items ── */
        .pf-list-item       { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
        .pf-list-header     { display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; cursor: pointer; user-select: none; }
        .pf-list-header:hover { background: #eef0f2; }
        .pf-list-header-left { display: flex; align-items: center; gap: 8px; }
        .pf-chevron         { font-size: 13px; color: #6b7280; }
        .pf-list-title      { font-size: 14px; font-weight: 600; color: #374151; }
        .pf-list-actions    { display: flex; gap: 5px; }
        .pf-list-actions button { padding: 5px 9px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-size: 14px; color: #6b7280; transition: all .15s; }
        .pf-list-actions button:hover { background: #f3f4f6; }
        .pf-list-actions button.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .pf-list-body       { padding: 16px; }

        /* ── Para / tag rows ── */
        .pf-para-section    { margin-bottom: 16px; }
        .pf-para-header     { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .pf-tag-row         { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .pf-para-num        { width: 24px; height: 24px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #6b7280; flex-shrink: 0; }
        .pf-add-inline-btn  { display: flex; align-items: center; gap: 5px; padding: 5px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #16a34a; font-size: 13px; font-weight: 600; cursor: pointer; }
        .pf-add-inline-btn:hover { background: #dcfce7; }
        .pf-add-btn         { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1.5px dashed #d1d5db; background: transparent; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; width: 100%; justify-content: center; transition: all .15s; margin-top: 4px; }
        .pf-add-btn:hover   { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .pf-icon-btn        { padding: 9px 11px; border: 1px solid #d1d5db; background: #fff; border-radius: 8px; cursor: pointer; font-size: 15px; color: #6b7280; flex-shrink: 0; }
        .pf-icon-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .pf-empty-state     { font-size: 14px; color: #9ca3af; font-style: italic; padding: 14px; background: #f9fafb; border-radius: 8px; border: 1px dashed #e5e7eb; text-align: center; margin-bottom: 8px; }

        /* ── Metrics inline preview ── */
        .pf-metrics-preview { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; padding-top: 16px; border-top: 1px solid #f3f4f6; }
        .pf-metric-chip     { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px 18px; text-align: center; min-width: 90px; }
        .pf-metric-val      { display: block; font-size: 21px; font-weight: 700; color: #16a34a; }
        .pf-metric-lbl      { display: block; font-size: 13px; color: #6b7280; margin-top: 2px; }

        /* ── Channels chip preview ── */
        .pf-chips-preview   { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #f3f4f6; }
        .pf-channel-chip    { font-size: 13px; font-weight: 600; padding: 5px 14px; border-radius: 20px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; }

        /* ── Tech stack preview ── */
        .pf-tech-preview    { margin-top: 18px; padding-top: 16px; border-top: 1px solid #f3f4f6; display: flex; flex-direction: column; gap: 8px; }
        .pf-tech-row-preview { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .pf-tech-cat        { font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: 6px; border: 1px solid; white-space: nowrap; }
        .pf-tech-vals       { display: flex; flex-wrap: wrap; gap: 6px; }
        .pf-tech-val-chip   { font-size: 13px; padding: 3px 10px; border-radius: 20px; background: #f3f4f6; border: 1px solid #e5e7eb; color: #374151; }

        /* ── SEO ── */
        .pf-serp-wrap  { margin-top: 20px; }
        .pf-serp-label { font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .pf-serp-box   { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; }
        .pf-serp-url   { font-size: 14px; color: #16a34a; margin: 0 0 4px; }
        .pf-serp-title { font-size: 18px; color: #1a0dab; font-weight: 500; margin: 0 0 4px; }
        .pf-serp-desc  { font-size: 14px; color: #4d5156; margin: 0; line-height: 1.5; }
        .pf-serp-empty { color: #9ca3af; }
        .pf-kw-chips   { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .pf-kw-chip    { font-size: 13px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 3px 10px; border-radius: 20px; }

        /* ── Preview divider ── */
        .pf-preview-divider  { display: flex; align-items: center; gap: 12px; margin: 32px 0 0; }
        .pf-preview-divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .pf-preview-title    { font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
        .pf-preview-note     { font-size: 13px; color: #9ca3af; white-space: nowrap; }

        /* ── Toast ── */
        .pf-toast      { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: pfSlide .2s ease; }
        .pf-toast.success { background: #16a34a; color: #fff; }
        .pf-toast.error   { background: #ef4444; color: #fff; }
        @keyframes pfSlide { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* ── Loading ── */
        .pf-loading    { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #6b7280; font-size: 16px; }
        .pf-spinner    { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: pfSpin .8s linear infinite; }
        @keyframes pfSpin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 768px) { .pf-grid-2, .pf-grid-3 { grid-template-columns: 1fr; } }

        /* ═══════════════════════════════════
           PREVIEW STYLES
        ═══════════════════════════════════ */
        .pfpv-wrap { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; margin-top: 32px; }

        /* Chrome */
        .pfpv-chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .pfpv-chrome-left { display: flex; align-items: center; gap: 10px; }
        .pfpv-dots   { display: flex; gap: 5px; }
        .pfpv-dot    { width: 10px; height: 10px; border-radius: 50%; }
        .pfpv-dot.r  { background: #f87171; }
        .pfpv-dot.y  { background: #fbbf24; }
        .pfpv-dot.g  { background: #4ade80; }
        .pfpv-url    { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 16px; font-size: 13px; color: #6b7280; min-width: 200px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 320px; }
        .pfpv-chrome-label { font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; display: flex; align-items: center; gap: 5px; }

        /* Hero */
        .pfpv-hero       { background: linear-gradient(135deg, #071a0e, #0f2618); padding: 36px 32px; text-align: center; }
        .pfpv-hero-bread { font-size: 13px; color: rgba(255,255,255,.4); margin-bottom: 10px; }
        .pfpv-hero-title { font-size: 26px; font-weight: 700; color: #fff; margin: 0 0 10px; line-height: 1.3; }
        .pfpv-hero-desc  { font-size: 15px; color: #d1fae5; max-width: 480px; margin: 0 auto; }

        /* Generic section */
        .pfpv-section    { padding: 28px 32px; border-top: 1px solid #f3f4f6; }
        .pfpv-sec-label  { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 14px; display: flex; align-items: center; gap: 5px; }
        .pfpv-h2         { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 10px; }
        .pfpv-subtitle   { font-size: 15px; color: #6b7280; margin: 0 0 4px; }
        .pfpv-tagline    { font-size: 14px; color: #16a34a; font-weight: 600; margin: 0; }
        .pfpv-p          { font-size: 14px; color: #6b7280; margin: 0 0 8px; line-height: 1.6; }
        .pfpv-empty      { color: #d1d5db; font-style: italic; }
        .pfpv-more       { font-size: 12px; color: #9ca3af; font-style: italic; margin-top: 4px; }

        /* Two-col */
        .pfpv-two-col    { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .pfpv-img-col    { display: flex; }
        .pfpv-img        { width: 100%; border-radius: 10px; object-fit: cover; max-height: 200px; }
        .pfpv-img-full   { width: 100%; border-radius: 10px; margin-bottom: 16px; max-height: 200px; object-fit: cover; }
        .pfpv-img-placeholder { width: 100%; min-height: 140px; background: #f3f4f6; border: 1px dashed #e5e7eb; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #d1d5db; font-size: 24px; }

        /* Project info card */
        .pfpv-info-card  { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .pfpv-info-meta  { display: flex; flex-direction: column; gap: 8px; }
        .pfpv-meta-row   { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #374151; }
        .pfpv-meta-row i { color: #16a34a; font-size: 15px; flex-shrink: 0; }

        /* Highlight banner */
        .pfpv-highlight-banner { background: linear-gradient(90deg, #dcfce7, #f0fdf4); border-left: 3px solid #16a34a; border-radius: 6px; padding: 10px 16px; font-size: 15px; font-weight: 600; color: #15803d; margin-bottom: 14px; }

        /* Bullet lists */
        .pfpv-bullet-list { list-style: none; padding: 0; margin: 0; }
        .pfpv-bullet-list li { font-size: 14px; color: rgba(255,255,255,.7); padding: 5px 0; padding-left: 16px; position: relative; }
        .pfpv-bullet-list li::before { content: "→"; position: absolute; left: 0; color: #4ade80; font-size: 13px; }
        .pfpv-bullet-green li { color: #374151; }
        .pfpv-bullet-green li::before { color: #16a34a; }

        /* Metrics */
        .pfpv-metrics-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-top: 12px; }
        .pfpv-metric-card  { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px; text-align: center; }
        .pfpv-metric-val   { font-size: 22px; font-weight: 700; color: #16a34a; }
        .pfpv-metric-lbl   { font-size: 13px; color: #6b7280; margin-top: 3px; }

        /* KPI cards */
        .pfpv-kpi-grid  { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-top: 10px; }
        .pfpv-kpi-card  { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: 12px; }
        .pfpv-kpi-val   { font-size: 18px; font-weight: 700; color: #4ade80; }
        .pfpv-kpi-lbl   { font-size: 13px; color: rgba(255,255,255,.5); margin-top: 2px; }

        /* Growth */
        .pfpv-growth-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-top: 14px; }
        .pfpv-growth-card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 10px; padding: 16px; text-align: center; }
        .pfpv-growth-val  { font-size: 22px; font-weight: 700; color: #4ade80; }
        .pfpv-growth-lbl  { font-size: 13px; color: rgba(255,255,255,.5); margin-top: 3px; }

        /* Marketing channels */
        .pfpv-channels-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .pfpv-channel-chip  { font-size: 13px; font-weight: 600; padding: 6px 16px; border-radius: 20px; border: 1.5px solid; }

        /* Tech table */
        .pfpv-tech-table { display: flex; flex-direction: column; gap: 10px; }
        .pfpv-tech-row   { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .pfpv-tech-cat   { font-size: 13px; font-weight: 700; padding: 5px 14px; border-radius: 6px; border: 1px solid; white-space: nowrap; min-width: 90px; text-align: center; }
        .pfpv-tech-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .pfpv-tech-chip  { font-size: 13px; padding: 4px 12px; border-radius: 20px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.7); }

        /* Button preview */
        .pfpv-btn-preview { display: inline-flex; align-items: center; font-size: 13px; font-weight: 600; color: #4ade80; border: 1.5px solid #16a34a; border-radius: 20px; padding: 6px 16px; margin-top: 12px; }

        @media (max-width: 640px) {
          .pfpv-two-col { grid-template-columns: 1fr; }
          .pfpv-metrics-grid, .pfpv-growth-grid { grid-template-columns: repeat(2,1fr); }
          .pfpv-info-card { grid-template-columns: 1fr; }
          .pfpv-kpi-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle="Portfolio Page"
        pageSubtitle="Manage all sections of the Portfolio detail page"
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl="/portfolio"
      >
        <div className="pf-content">
          {renderEditor()}

          {/* ── Full-page preview ── */}
          <div className="pf-preview-divider">
            <span className="pf-preview-title"><i className="bi bi-eye" /> Page Preview</span>
            <div className="pf-preview-divider-line" />
            <span className="pf-preview-note">Updates as you edit any section above</span>
          </div>

          <PortfolioPreview formData={formData} />
        </div>
      </CmsTabs>

      {toast && (
        <div className={`pf-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"} />
          {toast.msg}
        </div>
      )}
    </>
  );
}