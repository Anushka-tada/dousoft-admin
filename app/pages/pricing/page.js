/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, useRef } from "react";
import CmsTabs from "../../Components/CmsTabs";
import { getPricingPageServ, createPricingPageServ } from "@/app/services/pages.service";
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

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: "hero",        label: "Hero",         icon: "bi bi-image" },
  { key: "leftContent", label: "Left Content", icon: "bi bi-layout-split" },
  { key: "intro",       label: "Intro",        icon: "bi bi-text-paragraph" },
  { key: "tabs",        label: "Pricing Tabs", icon: "bi bi-table" },
  { key: "billing",     label: "Billing",      icon: "bi bi-credit-card" },
  { key: "seo",         label: "SEO",          icon: "bi bi-search" },
];

// ─── Shared primitives ────────────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="pr-field">
    <label className="pr-label">{label}</label>
    {children}
    {hint && <p className="pr-hint">{hint}</p>}
  </div>
);
const Input    = (props) => <input className="pr-input" {...props} />;
const Textarea = ({ rows = 3, ...props }) => <textarea className="pr-textarea" rows={rows} {...props} />;

const Toggle = ({ label, checked, onChange }) => (
  <div className="pr-toggle-row">
    <span className="pr-label">{label}</span>
    <label className="pr-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="pr-slider" />
    </label>
  </div>
);

const ImageUpload = ({ label, value, onChange, hint }) => (
  <Field label={label} hint={hint}>
    <div className="pr-img-upload">
      {value ? (
        <div className="pr-img-preview">
          <img src={value} alt="preview" onError={(e) => (e.target.style.display = "none")} />
          <button className="pr-img-remove" onClick={() => onChange("")}><i className="bi bi-x" /></button>
        </div>
      ) : (
        <label className="pr-img-placeholder">
          <i className="bi bi-cloud-upload" /><span>Click to upload</span>
          <input type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files[0]; if (f) onChange(URL.createObjectURL(f)); }} />
        </label>
      )}
      <input className="pr-input" style={{ marginTop: 8 }} placeholder="Or paste image URL..."
        value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  </Field>
);

const SortableItem = ({ index, onMoveUp, onMoveDown, onDelete, title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pr-list-item">
      <div className="pr-list-header" onClick={() => setOpen((p) => !p)}>
        <div className="pr-list-header-left">
          <i className={`bi bi-chevron-${open ? "down" : "right"} pr-chevron`} />
          <span className="pr-list-title">{title || `Item ${index + 1}`}</span>
        </div>
        <div className="pr-list-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={onMoveUp}><i className="bi bi-arrow-up" /></button>
          <button onClick={onMoveDown}><i className="bi bi-arrow-down" /></button>
          <button onClick={onDelete} className="danger"><i className="bi bi-trash" /></button>
        </div>
      </div>
      {open && <div className="pr-list-body">{children}</div>}
    </div>
  );
};

// ─── Section Editors ──────────────────────────────────────────────────────────

// 1. HERO
const HeroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pr-section-block">
      <p className="pr-block-title"><i className="bi bi-image" /> Hero / Banner</p>
      <Field label="Page Title" hint='e.g. "Packages by Dousoft IT"'>
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Packages by Dousoft IT" />
      </Field>
      <Field label="Breadcrumb" hint='e.g. "Home > Pricing"'>
        <Input value={data?.breadcrumb || ""} onChange={(e) => u("breadcrumb", e.target.value)} placeholder="Home > Pricing" />
      </Field>
      <Field label="Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)}
          placeholder="Brief description shown in the hero banner..." />
      </Field>
      <ImageUpload label="Hero Image" value={data?.image} onChange={(v) => u("image", v)}
        hint="Recommended: 1440×800px, WebP/PNG" />
    </div>
  );
};

// 2. LEFT CONTENT
const LeftContentEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pr-section-block">
      <p className="pr-block-title"><i className="bi bi-layout-split" /> Left Content Section</p>
      <p className="pr-section-hint">Grid section shown above the pricing tabs with heading, button and image.</p>
      <Field label="Heading">
        <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)}
          placeholder="Choose the Right Plan for Your Business" />
      </Field>
      <div className="pr-grid-2">
        <Field label="Button Text">
          <Input value={data?.btnText || ""} onChange={(e) => u("btnText", e.target.value)}
            placeholder="See Pricing & Packages" />
        </Field>
        <Field label="Button Link">
          <Input value={data?.btnLink || ""} onChange={(e) => u("btnLink", e.target.value)}
            placeholder="#pricings" />
        </Field>
      </div>
      <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)}
        hint="Recommended: 600×500px" />
    </div>
  );
};

// 3. INTRO
const IntroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="pr-section-block">
      <p className="pr-block-title"><i className="bi bi-text-paragraph" /> Intro Text</p>
      <p className="pr-section-hint">Heading and description shown above the pricing tabs section.</p>
      <Field label="Heading">
        <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)}
          placeholder="Transparent & Flexible Pricing..." />
      </Field>
      <Field label="Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)}
          rows={3} placeholder="Pick a plan that matches your goals..." />
      </Field>
    </div>
  );
};

// 4. PRICING TABS (most complex)
const PricingTabsEditor = ({ data, onChange }) => {
  const tabs         = data || [];
  const [activeTIdx, setActiveTIdx] = useState(0);

  // ── Tab CRUD ──────────────────────────────────────────
  const addTab = () => {
    const newTab = { tabKey: "", label: "", icon: "", order: tabs.length, isActive: true, columns: [], rows: [], cta: { btnText: "Select Plan", btnLink: "/contact-us" } };
    onChange([...tabs, newTab]);
    setActiveTIdx(tabs.length);
  };
  const updTab = (i, k, v) => { const a = [...tabs]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const remTab = (i) => { onChange(tabs.filter((_, idx) => idx !== i)); setActiveTIdx(Math.max(0, activeTIdx - 1)); };
  const movTab = (i, d) => {
    const a = [...tabs]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    onChange(a.map((t, idx) => ({ ...t, order: idx })));
    setActiveTIdx(j);
  };

  // ── Column CRUD ───────────────────────────────────────
  const addCol = (ti) => {
    const a = [...tabs];
    const cols = a[ti].columns || [];
    a[ti] = { ...a[ti], columns: [...cols, { key: "", label: "", isPopular: false, order: cols.length }] };
    onChange(a);
  };
  const updCol = (ti, ci, k, v) => {
    const a = [...tabs];
    const cols = [...(a[ti].columns || [])];
    const oldKey = cols[ci].key;
    cols[ci] = { ...cols[ci], [k]: v };
    // if key changed, update all row values maps
    if (k === "key" && oldKey !== v) {
      const rows = (a[ti].rows || []).map((row) => {
        const vals = { ...(row.values || {}) };
        if (oldKey in vals) { vals[v] = vals[oldKey]; delete vals[oldKey]; }
        return { ...row, values: vals };
      });
      a[ti] = { ...a[ti], columns: cols, rows };
    } else {
      a[ti] = { ...a[ti], columns: cols };
    }
    onChange(a);
  };
  const remCol = (ti, ci) => {
    const a = [...tabs];
    const removedKey = (a[ti].columns || [])[ci]?.key;
    const cols = (a[ti].columns || []).filter((_, idx) => idx !== ci).map((c, idx) => ({ ...c, order: idx }));
    const rows = (a[ti].rows || []).map((row) => {
      const vals = { ...(row.values || {}) };
      if (removedKey) delete vals[removedKey];
      return { ...row, values: vals };
    });
    a[ti] = { ...a[ti], columns: cols, rows };
    onChange(a);
  };
  const movCol = (ti, ci, d) => {
    const a = [...tabs];
    const cols = [...(a[ti].columns || [])];
    const j = ci + d;
    if (j < 0 || j >= cols.length) return;
    [cols[ci], cols[j]] = [cols[j], cols[ci]];
    a[ti] = { ...a[ti], columns: cols.map((c, idx) => ({ ...c, order: idx })) };
    onChange(a);
  };

  // ── Row CRUD ──────────────────────────────────────────
  const addRow = (ti) => {
    const a = [...tabs];
    const rows = a[ti].rows || [];
    a[ti] = { ...a[ti], rows: [...rows, { feature: "", order: rows.length, values: {} }] };
    onChange(a);
  };
  const updRow = (ti, ri, k, v) => {
    const a = [...tabs];
    const rows = [...(a[ti].rows || [])];
    rows[ri] = { ...rows[ri], [k]: v };
    a[ti] = { ...a[ti], rows };
    onChange(a);
  };
  const updRowVal = (ti, ri, colKey, v) => {
    const a = [...tabs];
    const rows = [...(a[ti].rows || [])];
    rows[ri] = { ...rows[ri], values: { ...(rows[ri].values || {}), [colKey]: v } };
    a[ti] = { ...a[ti], rows };
    onChange(a);
  };
  const remRow = (ti, ri) => {
    const a = [...tabs];
    a[ti] = { ...a[ti], rows: (a[ti].rows || []).filter((_, idx) => idx !== ri).map((r, idx) => ({ ...r, order: idx })) };
    onChange(a);
  };
  const movRow = (ti, ri, d) => {
    const a = [...tabs];
    const rows = [...(a[ti].rows || [])];
    const j = ri + d;
    if (j < 0 || j >= rows.length) return;
    [rows[ri], rows[j]] = [rows[j], rows[ri]];
    a[ti] = { ...a[ti], rows: rows.map((r, idx) => ({ ...r, order: idx })) };
    onChange(a);
  };

  const currentTab = tabs[activeTIdx];

  return (
    <div>
      {/* ── Tab selector bar ── */}
      <div className="pr-section-block">
        <p className="pr-block-title"><i className="bi bi-table" /> Pricing Tabs ({tabs.length})</p>
        <p className="pr-section-hint">Each tab = one service category (Google Ads, SEO, Meta Ads, SMO...).</p>
        <div className="pr-tab-selector">
          {tabs.map((tab, i) => (
            <button key={i}
              className={`pr-tab-sel-btn ${activeTIdx === i ? "active" : ""}`}
              onClick={() => setActiveTIdx(i)}>
              {tab.icon && <img src={tab.icon} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} onError={(e) => (e.target.style.display = "none")} />}
              {tab.label || `Tab ${i + 1}`}
              {tab.isActive === false && <span className="pr-inactive-badge">Hidden</span>}
            </button>
          ))}
          <button className="pr-tab-sel-add" onClick={addTab}><i className="bi bi-plus" /> Add Tab</button>
        </div>
      </div>

      {/* ── Current tab editor ── */}
      {currentTab ? (
        <>
          {/* Tab meta */}
          <div className="pr-section-block">
            <div className="pr-tab-meta-header">
              <p className="pr-block-title" style={{ margin: 0 }}><i className="bi bi-pencil" /> Tab Settings</p>
              <div className="pr-tab-meta-actions">
                <button className="pr-sm-btn" onClick={() => movTab(activeTIdx, -1)} title="Move left"><i className="bi bi-arrow-left" /></button>
                <button className="pr-sm-btn" onClick={() => movTab(activeTIdx,  1)} title="Move right"><i className="bi bi-arrow-right" /></button>
                <button className="pr-sm-btn danger" onClick={() => remTab(activeTIdx)}><i className="bi bi-trash" /> Delete tab</button>
              </div>
            </div>
            <div className="pr-grid-2" style={{ marginTop: 16 }}>
              <Field label="Tab Label" hint='e.g. "Google Ads"'>
                <Input value={currentTab.label || ""} onChange={(e) => updTab(activeTIdx, "label", e.target.value)} placeholder="Google Ads" />
              </Field>
              <Field label="Tab Key" hint='Unique slug e.g. "google-ads"'>
                <Input value={currentTab.tabKey || ""} onChange={(e) => updTab(activeTIdx, "tabKey", e.target.value)} placeholder="google-ads" />
              </Field>
            </div>
            <ImageUpload label="Tab Icon" value={currentTab.icon} onChange={(v) => updTab(activeTIdx, "icon", v)}
              hint="Small icon shown on the tab button. Recommended: 32×32px" />
            <div className="pr-grid-2" style={{ marginTop: 12 }}>
              <Field label="CTA Button Text">
                <Input value={currentTab.cta?.btnText || ""} onChange={(e) => updTab(activeTIdx, "cta", { ...currentTab.cta, btnText: e.target.value })} placeholder="Select Plan" />
              </Field>
              <Field label="CTA Button Link">
                <Input value={currentTab.cta?.btnLink || ""} onChange={(e) => updTab(activeTIdx, "cta", { ...currentTab.cta, btnLink: e.target.value })} placeholder="/contact-us" />
              </Field>
            </div>
            <Toggle label="Tab Active (visible on site)" checked={currentTab.isActive !== false}
              onChange={(e) => updTab(activeTIdx, "isActive", e.target.checked)} />
          </div>

          {/* Columns */}
          <div className="pr-section-block">
            <p className="pr-block-title"><i className="bi bi-columns" /> Plan Columns ({(currentTab.columns || []).length})</p>
            <p className="pr-section-hint">Each column = one plan tier (Basic, Standard, Advanced, Enterprise). Add as many as you need.</p>
            {(currentTab.columns || []).length === 0 && (
              <div className="pr-empty-state">No columns yet. Add your first plan column below.</div>
            )}
            {/* Column pills */}
            <div className="pr-col-pills">
              {(currentTab.columns || []).map((col, ci) => (
                <div key={ci} className={`pr-col-pill ${col.isPopular ? "popular" : ""}`}>
                  <span className="pr-col-pill-label">{col.label || `Column ${ci + 1}`}</span>
                  {col.isPopular && <span className="pr-popular-dot" title="Most Popular" />}
                </div>
              ))}
            </div>
            {(currentTab.columns || []).map((col, ci) => (
              <SortableItem key={ci} index={ci}
                title={<span>{col.label || `Column ${ci + 1}`}{col.isPopular && <span className="pr-popular-chip">Most Popular</span>}</span>}
                onMoveUp={() => movCol(activeTIdx, ci, -1)} onMoveDown={() => movCol(activeTIdx, ci, 1)}
                onDelete={() => remCol(activeTIdx, ci)} defaultOpen={ci === 0}>
                <div className="pr-grid-2">
                  <Field label="Column Label" hint='Displayed in table header e.g. "Basic"'>
                    <Input value={col.label || ""} onChange={(e) => updCol(activeTIdx, ci, "label", e.target.value)} placeholder="Basic" />
                  </Field>
                  <Field label="Column Key" hint='Unique key e.g. "basic" — used to link row values'>
                    <Input value={col.key || ""} onChange={(e) => updCol(activeTIdx, ci, "key", e.target.value)} placeholder="basic" />
                  </Field>
                </div>
                <Toggle label='Mark as "Most Popular"' checked={col.isPopular === true}
                  onChange={(e) => updCol(activeTIdx, ci, "isPopular", e.target.checked)} />
              </SortableItem>
            ))}
            <button className="pr-add-btn" onClick={() => addCol(activeTIdx)}>
              <i className="bi bi-plus-circle" /> Add Column
            </button>
          </div>

          {/* Rows */}
          <div className="pr-section-block">
            <p className="pr-block-title"><i className="bi bi-list-ul" /> Feature Rows ({(currentTab.rows || []).length})</p>
            <p className="pr-section-hint">Each row = one feature. Fill in the value for each plan column.</p>

            {(currentTab.columns || []).length === 0 ? (
              <div className="pr-empty-state"><i className="bi bi-exclamation-circle" /> Add columns above first before adding rows.</div>
            ) : (
              <>
                {(currentTab.rows || []).length === 0 && (
                  <div className="pr-empty-state">No rows yet. Add your first feature row below.</div>
                )}
                {/* Mini table preview */}
                {(currentTab.rows || []).length > 0 && (
                  <div className="pr-mini-table-wrap">
                    <table className="pr-mini-table">
                      <thead>
                        <tr>
                          <th>Feature</th>
                          {(currentTab.columns || []).map((col, ci) => (
                            <th key={ci} className={col.isPopular ? "popular" : ""}>
                              {col.isPopular && <span className="pr-mini-popular">★</span>}
                              {col.label || `Col ${ci + 1}`}
                            </th>
                          ))}
                          <th style={{ width: 60 }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {(currentTab.rows || []).map((row, ri) => (
                          <tr key={ri}>
                            <td className="pr-mini-feature">{row.feature || <span style={{ color: "#d1d5db" }}>—</span>}</td>
                            {(currentTab.columns || []).map((col, ci) => (
                              <td key={ci} className={col.isPopular ? "popular" : ""}>
                                {(row.values || {})[col.key] || <span style={{ color: "#d1d5db" }}>—</span>}
                              </td>
                            ))}
                            <td>
                              <button className="pr-mini-del" onClick={() => remRow(activeTIdx, ri)}>
                                <i className="bi bi-trash" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Row editors */}
                {(currentTab.rows || []).map((row, ri) => (
                  <SortableItem key={ri} index={ri}
                    title={row.feature || `Row ${ri + 1}`}
                    onMoveUp={() => movRow(activeTIdx, ri, -1)} onMoveDown={() => movRow(activeTIdx, ri, 1)}
                    onDelete={() => remRow(activeTIdx, ri)}>
                    <Field label="Feature Name" hint='e.g. "Pricing", "Scope of Work", "Campaign Types"'>
                      <Input value={row.feature || ""} onChange={(e) => updRow(activeTIdx, ri, "feature", e.target.value)}
                        placeholder="e.g. Pricing" />
                    </Field>
                    <p className="pr-label" style={{ marginBottom: 10, marginTop: 8 }}>Values per column</p>
                    <div className="pr-row-values-grid">
                      {(currentTab.columns || []).map((col, ci) => (
                        <Field key={ci} label={col.isPopular ? `★ ${col.label || col.key}` : (col.label || col.key || `Col ${ci + 1}`)}>
                          <Input
                            value={(row.values || {})[col.key] || ""}
                            onChange={(e) => updRowVal(activeTIdx, ri, col.key, e.target.value)}
                            placeholder={`Value for ${col.label || col.key}`}
                            className={`pr-input ${col.isPopular ? "popular-input" : ""}`}
                          />
                        </Field>
                      ))}
                    </div>
                  </SortableItem>
                ))}
                <button className="pr-add-btn" onClick={() => addRow(activeTIdx)}>
                  <i className="bi bi-plus-circle" /> Add Feature Row
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="pr-section-block">
          <div className="pr-empty-state">No tabs yet. Click &#34;+ Add Tab&ldquo; above to create your first pricing tab.</div>
        </div>
      )}
    </div>
  );
};

// 5. BILLING
const BillingEditor = ({ data, onChange }) => {
  const u  = (k, v) => onChange({ ...data, [k]: v });
  const ut = (k, v) => onChange({ ...data, toggle: { ...data?.toggle, [k]: v } });
  const cards = data?.cards || [];

  const addCard = () => u("cards", [...cards, {
    title: "", subtitle: "", iconClass: "", isFeatured: false,
    featureHeading: "Includes", btnText: "Choose Your Plan", btnLink: "/contact-us",
    order: cards.length, isActive: true, features: []
  }]);
  const updCard = (i, k, v) => { const a = [...cards]; a[i] = { ...a[i], [k]: v }; u("cards", a); };
  const remCard = (i) => u("cards", cards.filter((_, idx) => idx !== i).map((c, idx) => ({ ...c, order: idx })));
  const movCard = (i, d) => {
    const a = [...cards]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("cards", a.map((c, idx) => ({ ...c, order: idx })));
  };

  // Features within a card
  const addFeature = (ci) => {
    const a = [...cards];
    const feats = a[ci].features || [];
    a[ci] = { ...a[ci], features: [...feats, { text: "", included: true, order: feats.length }] };
    u("cards", a);
  };
  const updFeature = (ci, fi, k, v) => {
    const a = [...cards];
    const feats = [...(a[ci].features || [])];
    feats[fi] = { ...feats[fi], [k]: v };
    a[ci] = { ...a[ci], features: feats };
    u("cards", a);
  };
  const remFeature = (ci, fi) => {
    const a = [...cards];
    a[ci] = { ...a[ci], features: (a[ci].features || []).filter((_, idx) => idx !== fi).map((f, idx) => ({ ...f, order: idx })) };
    u("cards", a);
  };

  return (
    <div>
      {/* Billing section header */}
      <div className="pr-section-block">
        <p className="pr-block-title"><i className="bi bi-credit-card" /> Billing Section</p>
        <Field label="Section Heading">
          <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)}
            placeholder="Affordable Pricing for Every Business Need" />
        </Field>
        <p className="pr-block-title" style={{ marginTop: 16 }}><i className="bi bi-toggles" /> Billing Toggle Labels</p>
        <div className="pr-grid-3">
          <Field label="Yearly Label">
            <Input value={data?.toggle?.yearlyLabel || ""} onChange={(e) => ut("yearlyLabel", e.target.value)} placeholder="Billed Yearly" />
          </Field>
          <Field label="Monthly Label">
            <Input value={data?.toggle?.monthlyLabel || ""} onChange={(e) => ut("monthlyLabel", e.target.value)} placeholder="Billed Monthly" />
          </Field>
          <Field label="Savings Badge" hint='e.g. "Save 20%"'>
            <Input value={data?.toggle?.savingsBadge || ""} onChange={(e) => ut("savingsBadge", e.target.value)} placeholder="Save 20%" />
          </Field>
        </div>
      </div>

      {/* Billing cards */}
      <div className="pr-section-block">
        <p className="pr-block-title"><i className="bi bi-card-list" /> Billing Cards ({cards.length})</p>
        <p className="pr-section-hint">Starter, Business, Enterprise cards shown below the pricing tables.</p>
        {cards.length === 0 && <div className="pr-empty-state">No cards yet. Add your first billing card below.</div>}
        {cards.map((card, ci) => (
          <SortableItem key={ci} index={ci}
            title={<span>{card.title || `Card ${ci + 1}`}{card.isFeatured && <span className="pr-popular-chip">Featured</span>}</span>}
            onMoveUp={() => movCard(ci, -1)} onMoveDown={() => movCard(ci, 1)} onDelete={() => remCard(ci)}>
            <div className="pr-grid-2">
              <Field label="Card Title" hint='e.g. "Starter"'>
                <Input value={card.title || ""} onChange={(e) => updCard(ci, "title", e.target.value)} placeholder="Starter" />
              </Field>
              <Field label="Subtitle" hint='e.g. "Ideal for startups"'>
                <Input value={card.subtitle || ""} onChange={(e) => updCard(ci, "subtitle", e.target.value)} placeholder="Ideal for startups" />
              </Field>
              <Field label="Icon CSS Class" hint='e.g. "startup-icon"'>
                <Input value={card.iconClass || ""} onChange={(e) => updCard(ci, "iconClass", e.target.value)} placeholder="startup-icon" />
              </Field>
              <Field label="Feature Heading" hint='e.g. "Includes"'>
                <Input value={card.featureHeading || ""} onChange={(e) => updCard(ci, "featureHeading", e.target.value)} placeholder="Includes" />
              </Field>
              <Field label="Button Text">
                <Input value={card.btnText || ""} onChange={(e) => updCard(ci, "btnText", e.target.value)} placeholder="Choose Your Plan" />
              </Field>
              <Field label="Button Link">
                <Input value={card.btnLink || ""} onChange={(e) => updCard(ci, "btnLink", e.target.value)} placeholder="/contact-us" />
              </Field>
            </div>
            <div className="pr-grid-2" style={{ marginTop: 4 }}>
              <Toggle label="Featured card (green border)" checked={card.isFeatured === true}
                onChange={(e) => updCard(ci, "isFeatured", e.target.checked)} />
              <Toggle label="Active" checked={card.isActive !== false}
                onChange={(e) => updCard(ci, "isActive", e.target.checked)} />
            </div>

            {/* Features inside card */}
            <div style={{ marginTop: 14 }}>
              <div className="pr-para-header">
                <label className="pr-label">Features ({(card.features || []).length})</label>
                <button className="pr-add-inline-btn" onClick={() => addFeature(ci)}>
                  <i className="bi bi-plus-circle" /> Add Feature
                </button>
              </div>
              <p className="pr-hint" style={{ marginBottom: 8 }}>Green check = included, gray cross = not included.</p>
              {(card.features || []).map((feat, fi) => (
                <div key={fi} className="pr-feature-row">
                  <div className={`pr-feat-icon ${feat.included ? "check" : "cross"}`}
                    onClick={() => updFeature(ci, fi, "included", !feat.included)}
                    title="Click to toggle included/not included">
                    <i className={feat.included ? "bi bi-check-lg" : "bi bi-x-lg"} />
                  </div>
                  <Input value={feat.text || ""} onChange={(e) => updFeature(ci, fi, "text", e.target.value)}
                    placeholder="e.g. Website Development" style={{ flex: 1 }} />
                  <button className="pr-icon-btn danger" onClick={() => remFeature(ci, fi)}>
                    <i className="bi bi-trash" />
                  </button>
                </div>
              ))}
              {(card.features || []).length === 0 && (
                <div className="pr-empty-state" style={{ marginTop: 4 }}>No features yet.</div>
              )}
            </div>
          </SortableItem>
        ))}
        <button className="pr-add-btn" onClick={addCard}><i className="bi bi-plus-circle" /> Add Billing Card</button>
      </div>
    </div>
  );
};

// 6. SEO
const SeoEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const descLen = (data?.description || "").length;
  return (
    <div className="pr-section-block">
      <p className="pr-block-title"><i className="bi bi-search" /> SEO Meta Tags</p>
      <Field label="Meta Title" hint="Recommended: 50–60 characters">
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} maxLength={70} />
        <p className={`pr-char-count ${(data?.title || "").length > 60 ? "over" : ""}`}>{(data?.title || "").length}/70</p>
      </Field>
      <Field label="Meta Description" hint="Recommended: 150–160 characters">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} maxLength={170} />
        <p className={`pr-char-count ${descLen > 160 ? "over" : ""}`}>{descLen}/170</p>
      </Field>
      <Field label="Keywords (comma separated)">
        <Textarea value={(data?.keywords || []).join(", ")} rows={2} placeholder="pricing, packages, seo, google ads, ..."
          onChange={(e) => u("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
      </Field>
      <div className="pr-serp-wrap">
        <p className="pr-serp-label"><i className="bi bi-google" /> Google SERP Preview</p>
        <div className="pr-serp-box">
          <p className="pr-serp-url">https://yourdomain.com/pricing</p>
          <p className="pr-serp-title">{data?.title || <span style={{ color: "#9ca3af" }}>Meta title not set...</span>}</p>
          <p className="pr-serp-desc">{data?.description || <span style={{ color: "#9ca3af" }}>Meta description will appear here...</span>}</p>
        </div>
        {(data?.keywords || []).length > 0 && (
          <div className="pr-kw-chips">{data.keywords.map((kw, i) => <span key={i} className="pr-kw-chip">{kw}</span>)}</div>
        )}
      </div>
    </div>
  );
};

// ─── Full Page Preview ────────────────────────────────────────────────────────
const PricingPreview = ({ formData }) => {
  const { hero = {}, leftContent = {}, intro = {}, tabs = [], billing = {}, seo = {} } = formData;
  const [activeTabKey, setActiveTabKey] = useState(null);

  const activeTabs = tabs.filter((t) => t.isActive !== false);

  useEffect(() => {
    if (activeTabs.length > 0 && !activeTabKey) setActiveTabKey(activeTabs[0].tabKey);
  }, [activeTabs.length]);

  const currentTab    = activeTabs.find((t) => t.tabKey === activeTabKey) || activeTabs[0];
  const activeCards   = (billing?.cards || []).filter((c) => c.isActive !== false);
  const sortedCols    = currentTab ? [...(currentTab.columns || [])].sort((a, b) => a.order - b.order) : [];
  const sortedRows    = currentTab ? [...(currentTab.rows    || [])].sort((a, b) => a.order - b.order) : [];

  return (
    <div className="prpv-wrap">
      {/* Browser chrome */}
      <div className="prpv-chrome">
        <div className="prpv-chrome-left">
          <div className="prpv-dots"><span className="prpv-dot r"/><span className="prpv-dot y"/><span className="prpv-dot g"/></div>
          <div className="prpv-url">yourdomain.com/pricing</div>
        </div>
        <span className="prpv-chrome-label"><i className="bi bi-eye" /> Full Page Preview</span>
      </div>

      {/* ── HERO ── */}
      <div className="prpv-hero">
        <div className="prpv-hero-bread">{hero.breadcrumb || "Home > Pricing"}</div>
        <h1 className="prpv-hero-title">{hero.title || <span className="prpv-empty">Title not set</span>}</h1>
        {hero.description && <p className="prpv-hero-desc">{hero.description}</p>}
      </div>

      {/* ── LEFT CONTENT ── */}
      {(leftContent.heading || leftContent.image) && (
        <div className="prpv-section">
          <div className="prpv-sec-label"><i className="bi bi-layout-split" /> Left Content</div>
          <div className="prpv-two-col">
            <div>
              <h2 className="prpv-h2">{leftContent.heading || <span className="prpv-empty">No heading</span>}</h2>
              {leftContent.btnText && <div className="prpv-btn">{leftContent.btnText}</div>}
            </div>
            <div className="prpv-img-col">
              {leftContent.image ? (
                <img src={leftContent.image} className="prpv-section-img" alt="" onError={(e) => (e.target.style.display = "none")} />
              ) : (
                <div className="prpv-img-placeholder"><i className="bi bi-image" /><span>No image</span></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── INTRO ── */}
      {(intro.heading || intro.description) && (
        <div className="prpv-section" style={{ textAlign: "center" }}>
          <div className="prpv-sec-label" style={{ justifyContent: "center" }}><i className="bi bi-text-paragraph" /> Intro</div>
          {intro.heading    && <h2 className="prpv-h2">{intro.heading}</h2>}
          {intro.description && <p className="prpv-p" style={{ maxWidth: 600, margin: "0 auto" }}>{intro.description}</p>}
        </div>
      )}

      {/* ── PRICING TABS ── */}
      {activeTabs.length > 0 && (
        <div className="prpv-section">
          <div className="prpv-sec-label"><i className="bi bi-table" /> Pricing Tables</div>

          {/* Tab buttons */}
          <div className="prpv-tab-btns">
            {activeTabs.map((tab, i) => (
              <button key={i}
                className={`prpv-tab-btn ${activeTabKey === tab.tabKey ? "active" : ""}`}
                onClick={() => setActiveTabKey(tab.tabKey)}>
                {tab.icon && <img src={tab.icon} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} onError={(e) => (e.target.style.display = "none")} />}
                {tab.label || tab.tabKey}
              </button>
            ))}
          </div>

          {/* Pricing table */}
          {currentTab && sortedCols.length > 0 && (
            <div className="prpv-table-wrap">
              <table className="prpv-table">
                <thead>
                  <tr>
                    <th className="prpv-th-feature"></th>
                    {sortedCols.map((col, ci) => (
                      <th key={ci} className={`prpv-th ${col.isPopular ? "popular" : ""}`}>
                        {col.isPopular && <div className="prpv-popular-badge">Most Popular</div>}
                        {col.label || col.key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row, ri) => (
                    <tr key={ri}>
                      <td className="prpv-td-feature">{row.feature}</td>
                      {sortedCols.map((col, ci) => (
                        <td key={ci} className={`prpv-td ${col.isPopular ? "popular" : ""}`}>
                          {(row.values || {})[col.key] || <span style={{ color: "#d1d5db" }}>—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* CTA row */}
                  <tr className="prpv-cta-row">
                    <td></td>
                    {sortedCols.map((col, ci) => (
                      <td key={ci} className={col.isPopular ? "popular" : ""}>
                        <div className="prpv-cta-btn">{currentTab.cta?.btnText || "Select Plan"}</div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {currentTab && sortedCols.length === 0 && (
            <div className="prpv-empty">No columns added to this tab yet.</div>
          )}
        </div>
      )}

      {/* ── BILLING ── */}
      {(billing.heading || activeCards.length > 0) && (
        <div className="prpv-section prpv-billing-section">
          <div className="prpv-sec-label" style={{ color: "#4ade80" }}><i className="bi bi-credit-card" /> Billing</div>
          {billing.heading && <h2 className="prpv-h2" style={{ color: "#fff", textAlign: "center" }}>{billing.heading}</h2>}

          {/* Toggle preview */}
          {(billing.toggle?.yearlyLabel || billing.toggle?.monthlyLabel) && (
            <div className="prpv-toggle-preview">
              <span className="prpv-toggle-btn active">{billing.toggle?.yearlyLabel || "Billed Yearly"}</span>
              <span className="prpv-toggle-btn">{billing.toggle?.monthlyLabel || "Billed Monthly"}</span>
              {billing.toggle?.savingsBadge && (
                <span className="prpv-savings-badge">{billing.toggle.savingsBadge}</span>
              )}
            </div>
          )}

          {/* Billing cards */}
          <div className="prpv-cards-grid">
            {activeCards.map((card, ci) => (
              <div key={ci} className={`prpv-bill-card ${card.isFeatured ? "featured" : ""}`}>
                <div className="prpv-bill-card-header">
                  <div className={`prpv-bill-icon ${card.iconClass || ""}`} />
                  <div>
                    <p className="prpv-bill-title">{card.title || `Plan ${ci + 1}`}</p>
                    {card.subtitle && <p className="prpv-bill-subtitle">{card.subtitle}</p>}
                  </div>
                </div>
                <div className="prpv-bill-divider" />
                {card.featureHeading && <p className="prpv-bill-feat-heading">{card.featureHeading}</p>}
                <div className="prpv-bill-features">
                  {(card.features || []).map((feat, fi) => (
                    <div key={fi} className="prpv-bill-feat-row">
                      <i className={`${feat.included ? "bi bi-check-lg prpv-check" : "bi bi-x-lg prpv-cross"}`} />
                      <span className={feat.included ? "" : "prpv-feat-excluded"}>{feat.text}</span>
                    </div>
                  ))}
                </div>
                <div className={`prpv-bill-btn ${card.isFeatured ? "featured" : ""}`}>
                  {card.btnText || "Choose Your Plan"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SEO ── */}
      <div className="prpv-section">
        <div className="prpv-sec-label"><i className="bi bi-search" /> SEO</div>
        <div className="pr-serp-box" style={{ maxWidth: 560 }}>
          <p className="pr-serp-url">yourdomain.com/pricing</p>
          <p className="pr-serp-title">{seo.title || <span style={{ color: "#9ca3af" }}>Meta title not set</span>}</p>
          <p className="pr-serp-desc">{seo.description || <span style={{ color: "#9ca3af" }}>Meta description not set</span>}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PricingAdminPage() {
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
        const res = await getPricingPageServ();
        if (res?.data?.success) {
          const data = res.data.data;
          if (data) { setFormData(data); setIsPublished(data.isPublished !== false); }
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
      const res = await createPricingPageServ({ ...formData, isPublished });
      if (res.data?.success) { showToast("Pricing page saved successfully!", "success"); setUnsaved(false); }
      else showToast("Failed to save. Please try again.", "error");
    } catch { showToast("Network error. Please try again.", "error"); }
    finally { setSaving(false); }
  };

  const update = (section, val) => {
    setFormData((prev) => ({ ...prev, [section]: val }));
    setUnsaved(true);
  };

  const renderEditor = () => {
    switch (activeTab) {
      case "hero":        return <HeroEditor        data={formData.hero}        onChange={(v) => update("hero", v)} />;
      case "leftContent": return <LeftContentEditor data={formData.leftContent} onChange={(v) => update("leftContent", v)} />;
      case "intro":       return <IntroEditor       data={formData.intro}       onChange={(v) => update("intro", v)} />;
      case "tabs":        return <PricingTabsEditor data={formData.tabs}        onChange={(v) => update("tabs", v)} />;
      case "billing":     return <BillingEditor     data={formData.billing}     onChange={(v) => update("billing", v)} />;
      case "seo":         return <SeoEditor         data={formData.seo}         onChange={(v) => update("seo", v)} />;
      default: return null;
    }
  };

  if (loading) return (
    <HomePageSkeleton/> 
  );

  return (
    <>
      <style>{`
        .pr-content  { padding: 24px; background: #f9fafb; min-height: 60vh; }
        .pr-grid-2   { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .pr-grid-3   { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .pr-section-block { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; margin-bottom: 18px; }
        .pr-block-title   { font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 6px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 7px; }
        .pr-block-title i { color: #16a34a; }
        .pr-section-hint  { font-size: 13px; color: #9ca3af; margin: 0 0 16px; }
        .pr-field  { margin-bottom: 16px; } .pr-field:last-child { margin-bottom: 0; }
        .pr-label  { display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .pr-hint   { font-size: 13px; color: #9ca3af; margin-top: 4px; }
        .pr-input  { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; transition: border .15s; box-sizing: border-box; }
        .pr-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .pr-input.popular-input { border-color: #fbbf24; background: #fffbeb; }
        .pr-textarea { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; resize: vertical; font-family: inherit; transition: border .15s; box-sizing: border-box; line-height: 1.6; }
        .pr-textarea:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .pr-char-count { font-size: 12px; color: #9ca3af; text-align: right; margin-top: 3px; }
        .pr-char-count.over { color: #ef4444; }
        .pr-img-upload { display: flex; flex-direction: column; gap: 8px; }
        .pr-img-preview { position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .pr-img-preview img { width: 100%; height: 160px; object-fit: cover; display: block; }
        .pr-img-remove  { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.6); color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; }
        .pr-img-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 24px; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer; color: #9ca3af; font-size: 13px; text-align: center; }
        .pr-img-placeholder:hover { border-color: #16a34a; color: #16a34a; }
        .pr-img-placeholder i { font-size: 24px; }
        .pr-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
        .pr-switch { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
        .pr-switch input { opacity: 0; width: 0; height: 0; }
        .pr-slider { position: absolute; inset: 0; background: #d1d5db; border-radius: 24px; cursor: pointer; transition: .2s; }
        .pr-slider:before { content: ""; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
        .pr-switch input:checked + .pr-slider { background: #16a34a; }
        .pr-switch input:checked + .pr-slider:before { transform: translateX(18px); }
        .pr-list-item     { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
        .pr-list-header   { display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; cursor: pointer; user-select: none; }
        .pr-list-header:hover { background: #eef0f2; }
        .pr-list-header-left { display: flex; align-items: center; gap: 8px; }
        .pr-chevron  { font-size: 13px; color: #6b7280; }
        .pr-list-title { font-size: 14px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 8px; }
        .pr-list-actions { display: flex; gap: 5px; }
        .pr-list-actions button { padding: 5px 9px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; color: #6b7280; transition: all .15s; }
        .pr-list-actions button:hover { background: #f3f4f6; }
        .pr-list-actions button.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .pr-list-body { padding: 16px; }
        .pr-add-btn  { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1.5px dashed #d1d5db; background: transparent; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; width: 100%; justify-content: center; transition: all .15s; margin-top: 4px; }
        .pr-add-btn:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .pr-icon-btn { padding: 9px 11px; border: 1px solid #d1d5db; background: #fff; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; flex-shrink: 0; }
        .pr-icon-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .pr-empty-state { font-size: 13px; color: #9ca3af; font-style: italic; padding: 14px; background: #f9fafb; border-radius: 8px; border: 1px dashed #e5e7eb; text-align: center; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .pr-popular-chip { font-size: 11px; font-weight: 700; padding: 2px 8px; background: #fef9c3; color: #854d0e; border-radius: 20px; border: 1px solid #fde047; }
        .pr-inactive-badge { font-size: 11px; padding: 2px 7px; background: #f3f4f6; color: #9ca3af; border-radius: 10px; }

        /* Tab selector */
        .pr-tab-selector { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
        .pr-tab-sel-btn  { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; background: #f9fafb; color: #6b7280; font-size: 14px; font-weight: 500; cursor: pointer; transition: all .15s; }
        .pr-tab-sel-btn.active { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .pr-tab-sel-add  { display: flex; align-items: center; gap: 5px; padding: 8px 14px; border: 1.5px dashed #d1d5db; border-radius: 8px; background: transparent; color: #6b7280; font-size: 14px; cursor: pointer; }
        .pr-tab-sel-add:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .pr-tab-meta-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; }
        .pr-tab-meta-actions { display: flex; gap: 6px; }
        .pr-sm-btn { padding: 6px 10px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; color: #6b7280; display: flex; align-items: center; gap: 4px; }
        .pr-sm-btn:hover { background: #f3f4f6; }
        .pr-sm-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }

        /* Column pills */
        .pr-col-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .pr-col-pill  { display: flex; align-items: center; gap: 5px; padding: 5px 12px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 20px; font-size: 13px; color: #374151; }
        .pr-col-pill.popular { background: #fef9c3; border-color: #fde047; color: #854d0e; }
        .pr-popular-dot { width: 6px; height: 6px; background: #eab308; border-radius: 50%; }

        /* Mini table */
        .pr-mini-table-wrap { overflow-x: auto; margin-bottom: 16px; border-radius: 8px; border: 1px solid #e5e7eb; }
        .pr-mini-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .pr-mini-table th { padding: 8px 12px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; text-align: left; font-weight: 600; color: #374151; white-space: nowrap; }
        .pr-mini-table th.popular { background: #fef9c3; color: #854d0e; }
        .pr-mini-popular { margin-right: 4px; }
        .pr-mini-table td { padding: 7px 12px; border-bottom: 1px solid #f3f4f6; color: #6b7280; }
        .pr-mini-table td.popular { background: #fffbeb; }
        .pr-mini-feature { font-weight: 600; color: #374151 !important; white-space: nowrap; }
        .pr-mini-del { padding: 4px 7px; border: 1px solid #fca5a5; background: #fef2f2; border-radius: 5px; cursor: pointer; color: #ef4444; font-size: 12px; }
        .pr-row-values-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }

        /* Feature rows in billing */
        .pr-para-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .pr-add-inline-btn { display: flex; align-items: center; gap: 5px; padding: 5px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #16a34a; font-size: 13px; font-weight: 600; cursor: pointer; }
        .pr-add-inline-btn:hover { background: #dcfce7; }
        .pr-feature-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .pr-feat-icon   { width: 30px; height: 30px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; font-size: 14px; transition: all .15s; }
        .pr-feat-icon.check { background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; }
        .pr-feat-icon.cross  { background: #f3f4f6; color: #9ca3af; border: 1px solid #e5e7eb; }
        .pr-feat-icon:hover  { opacity: .75; }

        /* SEO */
        .pr-serp-wrap  { margin-top: 20px; }
        .pr-serp-label { font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .pr-serp-box   { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; }
        .pr-serp-url   { font-size: 14px; color: #16a34a; margin: 0 0 4px; }
        .pr-serp-title { font-size: 18px; color: #1a0dab; font-weight: 500; margin: 0 0 4px; }
        .pr-serp-desc  { font-size: 14px; color: #4d5156; margin: 0; line-height: 1.5; }
        .pr-kw-chips   { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .pr-kw-chip    { font-size: 12px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 3px 10px; border-radius: 20px; }

        /* Preview divider */
        .pr-preview-divider { display: flex; align-items: center; gap: 12px; margin: 32px 0 0; }
        .pr-preview-divider span { font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
        .pr-preview-divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .pr-preview-note { font-size: 13px; color: #9ca3af; text-transform: none !important; letter-spacing: 0 !important; font-weight: 400 !important; }

        /* Toast */
        .pr-toast { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: prSlide .2s ease; }
        .pr-toast.success { background: #16a34a; color: #fff; }
        .pr-toast.error   { background: #ef4444; color: #fff; }
        @keyframes prSlide { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* Loading */
        .pr-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #6b7280; font-size: 16px; }
        .pr-spinner { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: prSpin .8s linear infinite; }
        @keyframes prSpin { to { transform: rotate(360deg); } }

        /* ══ PREVIEW ══════════════════════════════ */
        .prpv-wrap { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; margin-top: 32px; }
        .prpv-chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .prpv-chrome-left { display: flex; align-items: center; gap: 10px; }
        .prpv-dots { display: flex; gap: 5px; }
        .prpv-dot  { width: 10px; height: 10px; border-radius: 50%; }
        .prpv-dot.r { background: #f87171; } .prpv-dot.y { background: #fbbf24; } .prpv-dot.g { background: #4ade80; }
        .prpv-url  { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 14px; font-size: 13px; color: #6b7280; min-width: 220px; text-align: center; }
        .prpv-chrome-label { font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; display: flex; align-items: center; gap: 5px; }
        .prpv-hero { background: linear-gradient(135deg,#0f2618,#1e3d28); padding: 32px; text-align: center; }
        .prpv-hero-bread  { font-size: 13px; color: rgba(255,255,255,.45); margin-bottom: 8px; }
        .prpv-hero-title  { font-size: 26px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .prpv-hero-desc   { font-size: 14px; color: #d1fae5; margin: 0 auto; max-width: 500px; }
        .prpv-section { padding: 24px 28px; border-top: 1px solid #f3f4f6; }
        .prpv-sec-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 12px; display: flex; align-items: center; gap: 5px; }
        .prpv-h2    { font-size: 19px; font-weight: 700; color: #111827; margin: 0 0 8px; }
        .prpv-p     { font-size: 14px; color: #6b7280; margin: 0 0 8px; line-height: 1.6; }
        .prpv-empty { font-size: 13px; color: #d1d5db; font-style: italic; }
        .prpv-btn   { display: inline-block; margin-top: 10px; padding: 8px 20px; background: #16a34a; color: #fff; border-radius: 8px; font-size: 14px; font-weight: 600; }
        .prpv-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
        .prpv-img-col { display: flex; }
        .prpv-section-img { width: 100%; border-radius: 10px; object-fit: cover; max-height: 180px; }
        .prpv-img-placeholder { width: 100%; min-height: 120px; background: #f3f4f6; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #d1d5db; font-size: 13px; }
        .prpv-img-placeholder i { font-size: 24px; }
        /* Tab buttons preview */
        .prpv-tab-btns { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
        .prpv-tab-btn  { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; background: #f9fafb; color: #6b7280; font-size: 13px; cursor: pointer; }
        .prpv-tab-btn.active { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        /* Pricing table preview */
        .prpv-table-wrap { overflow-x: auto; border-radius: 10px; border: 1px solid #e5e7eb; }
        .prpv-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .prpv-th    { padding: 10px 14px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 600; color: #374151; }
        .prpv-th.popular { background: #fef9c3; color: #854d0e; }
        .prpv-th-feature { padding: 10px 14px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .prpv-popular-badge { font-size: 10px; font-weight: 700; background: #eab308; color: #fff; padding: 2px 6px; border-radius: 4px; margin-bottom: 4px; display: inline-block; }
        .prpv-td    { padding: 8px 14px; border-bottom: 1px solid #f3f4f6; text-align: center; color: #6b7280; }
        .prpv-td.popular { background: #fffbeb; }
        .prpv-td-feature { padding: 8px 14px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151; white-space: nowrap; }
        .prpv-cta-row td { padding: 10px 14px; }
        .prpv-cta-btn { padding: 7px 16px; background: #16a34a; color: #fff; border-radius: 6px; font-size: 13px; font-weight: 600; text-align: center; }
        /* Billing preview */
        .prpv-billing-section { background: #0f2618; }
        .prpv-toggle-preview { display: flex; align-items: center; gap: 8px; justify-content: center; margin: 12px 0 20px; flex-wrap: wrap; }
        .prpv-toggle-btn { padding: 7px 18px; border-radius: 20px; font-size: 13px; font-weight: 600; background: rgba(255,255,255,.08); color: rgba(255,255,255,.5); cursor: pointer; }
        .prpv-toggle-btn.active { background: #fff; color: #111827; }
        .prpv-savings-badge { font-size: 11px; font-weight: 700; background: #16a34a; color: #fff; padding: 3px 10px; border-radius: 20px; }
        .prpv-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-top: 16px; }
        .prpv-bill-card { background: #fff; border-radius: 12px; padding: 18px; border: 1.5px solid #e5e7eb; }
        .prpv-bill-card.featured { border-color: #4ade80; }
        .prpv-bill-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .prpv-bill-icon { width: 38px; height: 38px; background: #f3f4f6; border-radius: 8px; }
        .prpv-bill-title    { font-size: 15px; font-weight: 700; color: #111827; margin: 0; }
        .prpv-bill-subtitle { font-size: 12px; color: #9ca3af; margin: 2px 0 0; }
        .prpv-bill-divider  { height: 1px; background: #f3f4f6; margin: 10px 0; }
        .prpv-bill-feat-heading { font-size: 12px; font-weight: 700; color: #374151; margin: 0 0 8px; }
        .prpv-bill-features { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .prpv-bill-feat-row { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #374151; }
        .prpv-check { color: #16a34a; font-size: 13px; flex-shrink: 0; }
        .prpv-cross  { color: #d1d5db; font-size: 12px; flex-shrink: 0; }
        .prpv-feat-excluded { color: #9ca3af; text-decoration: line-through; }
        .prpv-bill-btn { padding: 8px; background: #f3f4f6; color: #374151; border-radius: 8px; font-size: 13px; font-weight: 600; text-align: center; }
        .prpv-bill-btn.featured { background: #16a34a; color: #fff; }

        @media (max-width: 640px) {
          .pr-grid-2, .pr-grid-3 { grid-template-columns: 1fr; }
          .prpv-two-col { grid-template-columns: 1fr; }
        }
      `}</style>

      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle="Pricing Page"
        pageSubtitle="Manage all sections of your Pricing page"
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl="/pricing"
      >
        <div className="pr-content">
          {renderEditor()}

          <div className="pr-preview-divider">
            <span><i className="bi bi-eye" /> Page Preview</span>
            <div className="pr-preview-divider-line" />
            <span className="pr-preview-note">Updates as you edit any section above</span>
          </div>

          <PricingPreview formData={formData} />
        </div>
      </CmsTabs>

      {toast && (
        <div className={`pr-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"} />
          {toast.msg}
        </div>
      )}
    </>
  );
}