"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CmsTabs from "../../Components/CmsTabs";
import {
  SharedStyles, Field, Input, Textarea, Toggle, Select, ImageUpload,
  SortableItem, ParagraphsEditor, SeoEditor, HeroEditor,
  BestServiceEditor, CustomServiceEditor, CapabilitiesEditor,
  LeftRightEditor, FaqEditor,
} from "../../Components/Sharededitorcomponents";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: "meta",               label: "Meta",            icon: "bi bi-tag" },
  { key: "hero",               label: "Hero",            icon: "bi bi-image" },
  { key: "bestServiceSection", label: "Best Service",    icon: "bi bi-award" },
  { key: "customServiceSection",label: "Custom Service", icon: "bi bi-sliders" },
  { key: "capabilities",       label: "Capabilities",    icon: "bi bi-lightning" },
  { key: "whyTopCompany",      label: "Why Top",         icon: "bi bi-trophy" },
  { key: "leftRightSections",  label: "Left/Right",      icon: "bi bi-layout-split" },
  { key: "industries",         label: "Industries",      icon: "bi bi-building" },
  { key: "process",            label: "Process",         icon: "bi bi-diagram-3" },
  { key: "seo",                label: "SEO",             icon: "bi bi-search" },
];

// ─── Meta Editor ──────────────────────────────────────────────────────────────
const MetaEditor = ({ formData, setFormData }) => {
  const autoSlug = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const u = (k, v) => setFormData((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-tag" /> Service Identity</p>
      <p className="sc-section-hint">Basic identifiers for this service. Slug is used in the URL.</p>
      <div className="sc-grid-2">
        <Field label="Service Name" hint='e.g. "Cloud Computing"'>
          <Input value={formData.name || ""} placeholder="Cloud Computing"
            onChange={(e) => {
              const name = e.target.value;
              setFormData((prev) => ({ ...prev, name, slug: prev.slug || autoSlug(name) }));
            }}
          />
        </Field>
        <Field label="URL Slug" hint='Auto-generated or custom e.g. "cloud-computing"'>
          <div className="sc-slug-row">
            <span className="sc-slug-prefix">/services/</span>
            <Input value={formData.slug || ""} placeholder="cloud-computing"
              onChange={(e) => u("slug", autoSlug(e.target.value))} />
          </div>
        </Field>
      </div>
      <Field label="Short Description" hint="Shown in service listings">
        <Textarea value={formData.description || ""} rows={3} placeholder="Brief overview of this service..."
          onChange={(e) => u("description", e.target.value)} />
      </Field>
      <div className="sc-grid-2">
        <Field label="Status">
          <Select value={formData.status || "active"} onChange={(e) => u("status", e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </Field>
        <Field label="Display Order" hint="Lower = appears first">
          <Input type="number" value={formData.order ?? 0} style={{ maxWidth: 120 }}
            onChange={(e) => u("order", parseInt(e.target.value) || 0)} />
        </Field>
      </div>
    </div>
  );
};

// ─── Why Top Company Editor ───────────────────────────────────────────────────
const WhyTopCompanyEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const cards = data.cards || [];
  const addCard = () => u("cards", [...cards, { title: "", desc: "", icon: "" }]);
  const updCard = (i, k, v) => { const a = [...cards]; a[i] = { ...a[i], [k]: v }; u("cards", a); };
  const remCard = (i) => u("cards", cards.filter((_, idx) => idx !== i));
  const movCard = (i, d) => {
    const a = [...cards]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; u("cards", a);
  };
  return (
    <div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-trophy" /> Why Top Company Section</p>
        <Field label="Heading"><Input value={data.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Why we're the top company" /></Field>
        <Field label="Description"><Textarea value={data.description || ""} rows={2} onChange={(e) => u("description", e.target.value)} placeholder="Overview description..." /></Field>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-card-list" /> Feature Cards ({cards.length})</p>
        {cards.map((c, i) => (
          <SortableItem key={i} index={i} title={c.title || `Card ${i + 1}`}
            onMoveUp={() => movCard(i, -1)} onMoveDown={() => movCard(i, 1)} onDelete={() => remCard(i)} defaultOpen={i === 0}>
            <div className="sc-grid-2">
              <Field label="Title"><Input value={c.title} onChange={(e) => updCard(i, "title", e.target.value)} placeholder="Card title..." /></Field>
              <Field label="Icon Class">
                <div className="sc-icon-preview-row">
                  <i className={c.icon || "bi bi-star"} style={{ fontSize: 18, color: "#16a34a" }} />
                  <Input value={c.icon} onChange={(e) => updCard(i, "icon", e.target.value)} placeholder="bi bi-star" />
                </div>
              </Field>
            </div>
            <Field label="Description"><Textarea value={c.desc} onChange={(e) => updCard(i, "desc", e.target.value)} rows={2} placeholder="Card description..." /></Field>
          </SortableItem>
        ))}
        {cards.length === 0 && <div className="sc-empty-state">No cards yet.</div>}
        <button className="sc-add-btn" onClick={addCard}><i className="bi bi-plus-circle" /> Add Card</button>
      </div>
    </div>
  );
};

// ─── Industries Editor ────────────────────────────────────────────────────────
const IndustriesEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const list = data.list || [];
  const add = () => u("list", [...list, { name: "", icon: "" }]);
  const upd = (i, k, v) => { const a = [...list]; a[i] = { ...a[i], [k]: v }; u("list", a); };
  const rem = (i) => u("list", list.filter((_, idx) => idx !== i));
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-building" /> Industries Section</p>
      <Field label="Heading"><Input value={data.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Industries We Serve" /></Field>
      <Field label="Description"><Textarea value={data.description || ""} rows={2} onChange={(e) => u("description", e.target.value)} placeholder="Overview..." /></Field>
      <div style={{ marginTop: 16 }}>
        <div className="sc-para-header">
          <label className="sc-label">Industry List ({list.length})</label>
          <button className="sc-add-inline-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Industry</button>
        </div>
        {list.map((item, i) => (
          <div key={i} className="sc-point-row" style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
            <i className={item.icon || "bi bi-building"} style={{ fontSize: 16, color: "#16a34a", flexShrink: 0, width: 20 }} />
            <Input value={item.icon || ""} onChange={(e) => upd(i, "icon", e.target.value)} placeholder="bi bi-building" style={{ width: 140 }} />
            <Input value={item.name} onChange={(e) => upd(i, "name", e.target.value)} placeholder="Industry name..." style={{ flex: 1 }} />
            <button className="sc-icon-btn danger" onClick={() => rem(i)}><i className="bi bi-trash" /></button>
          </div>
        ))}
        {list.length === 0 && <div className="sc-empty-state">No industries yet.</div>}
      </div>
    </div>
  );
};

// ─── Process Editor ───────────────────────────────────────────────────────────
const ProcessEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const steps = data.steps || [];
  const add = () => u("steps", [...steps, { name: "", icon: "", img: "" }]);
  const upd = (i, k, v) => { const a = [...steps]; a[i] = { ...a[i], [k]: v }; u("steps", a); };
  const rem = (i) => u("steps", steps.filter((_, idx) => idx !== i));
  const mov = (i, d) => {
    const a = [...steps]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; u("steps", a);
  };
  return (
    <div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-diagram-3" /> Process Section</p>
        <Field label="Heading"><Input value={data.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Our Process" /></Field>
        <Field label="Description"><Textarea value={data.description || ""} rows={2} onChange={(e) => u("description", e.target.value)} placeholder="Overview..." /></Field>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-list-ol" /> Process Steps ({steps.length})</p>
        {steps.map((s, i) => (
          <SortableItem key={i} index={i} title={s.name || `Step ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)} defaultOpen={i === 0}>
            <div className="sc-grid-2">
              <Field label="Step Name"><Input value={s.name} onChange={(e) => upd(i, "name", e.target.value)} placeholder="Step name..." /></Field>
              <Field label="Icon Class">
                <div className="sc-icon-preview-row">
                  <i className={s.icon || "bi bi-arrow-right-circle"} style={{ fontSize: 18, color: "#16a34a" }} />
                  <Input value={s.icon} onChange={(e) => upd(i, "icon", e.target.value)} placeholder="bi bi-arrow-right-circle" />
                </div>
              </Field>
            </div>
            <ImageUpload label="Step Image" value={s.img} onChange={(v) => upd(i, "img", v)} hint="Optional step illustration" />
          </SortableItem>
        ))}
        {steps.length === 0 && <div className="sc-empty-state">No steps yet.</div>}
        <button className="sc-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Step</button>
      </div>
    </div>
  );
};

// ─── Full Page Preview ────────────────────────────────────────────────────────
const ServicePreview = ({ formData }) => {
  const {
    hero = {}, bestServiceSection = {}, customServiceSection = {},
    capabilities = {}, whyTopCompany = {}, leftRightSections = [],
    industries = {}, process = {}, seo = {},
  } = formData;

  const activeCards = (capabilities.cards || []);
  const whyCards = (whyTopCompany.cards || []);
  const indList = (industries.list || []);
  const procSteps = (process.steps || []);
  const lrSections = leftRightSections || [];

  return (
    <div className="scpv-wrap" style={{ margin: "0 24px 24px" }}>
      <style>{`
        .scpv-wrap { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; }
        .scpv-chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .scpv-chrome-left { display: flex; align-items: center; gap: 10px; }
        .scpv-dots { display: flex; gap: 5px; }
        .scpv-dot { width: 10px; height: 10px; border-radius: 50%; }
        .scpv-dot.r { background: #f87171; } .scpv-dot.y { background: #fbbf24; } .scpv-dot.g { background: #4ade80; }
        .scpv-url { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 14px; font-size: 13px; color: #6b7280; min-width: 200px; text-align: center; }
        .scpv-chrome-label { font-size: 13px; font-weight: 600; color: #9ca3af; display: flex; align-items: center; gap: 5px; }
        .scpv-hero { background: linear-gradient(135deg,#0f2618,#1e3d28); padding: 40px 32px; text-align: center; }
        .scpv-hero-bread { font-size: 13px; color: rgba(255,255,255,.4); margin-bottom: 10px; }
        .scpv-hero-title { font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .scpv-hero-desc { font-size: 15px; color: #d1fae5; margin: 0 auto; max-width: 500px; }
        .scpv-section { padding: 28px 32px; border-top: 1px solid #f3f4f6; }
        .scpv-dark-section { background: #0f2618; border-top: none; }
        .scpv-sec-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 12px; display: flex; align-items: center; gap: 5px; }
        .scpv-h2 { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px; }
        .scpv-p { font-size: 14px; color: #6b7280; margin: 0 0 8px; line-height: 1.6; }
        .scpv-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .scpv-img-col { display: flex; align-items: flex-start; }
        .scpv-section-img { width: 100%; border-radius: 10px; object-fit: cover; max-height: 200px; }
        .scpv-img-ph { width: 100%; min-height: 140px; background: #f3f4f6; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #d1d5db; font-size: 13px; }
        .scpv-img-ph i { font-size: 28px; }
        .scpv-cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
        .scpv-cap-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
        .scpv-why-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-top: 16px; }
        .scpv-why-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; display: flex; gap: 10px; align-items: flex-start; }
        .scpv-why-card i { font-size: 20px; color: #16a34a; flex-shrink: 0; margin-top: 2px; }
        .scpv-card-title { font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 4px; }
        .scpv-lr-block { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; padding: 20px 0; border-bottom: 1px solid #f3f4f6; }
        .scpv-lr-block:last-child { border-bottom: none; }
        .scpv-bullet { display: flex; align-items: flex-start; gap: 6px; font-size: 13px; color: #374151; padding: 3px 0; }
        .scpv-bullet:before { content: "•"; color: #16a34a; font-size: 16px; line-height: 1; flex-shrink: 0; }
        .scpv-ind-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .scpv-ind-chip { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #374151; padding: 6px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; }
        .scpv-ind-chip i { color: #16a34a; }
        .scpv-proc-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 16px; }
        .scpv-step { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 10px; padding: 14px; text-align: center; }
        .scpv-step-num { width: 32px; height: 32px; background: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; margin: 0 auto 8px; }
        .scpv-step-name { font-size: 13px; font-weight: 600; color: #fff; }
        .scpv-empty { font-size: 13px; color: #d1d5db; font-style: italic; }
        .scpv-more { font-size: 12px; color: #9ca3af; font-style: italic; }
        @media(max-width:640px) { .scpv-two-col,.scpv-cards-grid,.scpv-why-cards,.scpv-proc-steps { grid-template-columns: 1fr; } }
      `}</style>

      {/* Browser chrome */}
      <div className="scpv-chrome">
        <div className="scpv-chrome-left">
          <div className="scpv-dots">
            <span className="scpv-dot r"/><span className="scpv-dot y"/><span className="scpv-dot g"/>
          </div>
          <div className="scpv-url">yourdomain.com/services/{formData.slug || "slug"}</div>
        </div>
        <span className="scpv-chrome-label"><i className="bi bi-eye"/> Full Page Preview</span>
      </div>

      {/* Hero */}
      <div className="scpv-hero">
        <div className="scpv-hero-bread">{hero.breadcrumb || "Home / Services"}</div>
        <h1 className="scpv-hero-title">{hero.title || <span style={{opacity:.4}}>Page title not set</span>}</h1>
        {hero.description && <p className="scpv-hero-desc">{hero.description}</p>}
      </div>

      {/* Best Service */}
      {(bestServiceSection.title || (bestServiceSection.paragraphs||[]).length > 0) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-award"/> Best Service</div>
          <div className="scpv-two-col">
            <div>
              {bestServiceSection.title && <h2 className="scpv-h2">{bestServiceSection.title}</h2>}
              {(bestServiceSection.paragraphs||[]).slice(0,2).map((p,i)=><p key={i} className="scpv-p">{p}</p>)}
              {(bestServiceSection.paragraphs||[]).length > 2 && <p className="scpv-more">+{bestServiceSection.paragraphs.length-2} more paragraphs</p>}
              {bestServiceSection.imagepara && <p className="scpv-p" style={{fontStyle:"italic",borderLeft:"3px solid #16a34a",paddingLeft:10,marginTop:8}}>{bestServiceSection.imagepara}</p>}
            </div>
            <div className="scpv-img-col">
              {bestServiceSection.image
                ? <img src={bestServiceSection.image} className="scpv-section-img" alt="" onError={e=>e.target.style.display="none"}/>
                : <div className="scpv-img-ph"><i className="bi bi-image"/><span>No image</span></div>}
            </div>
          </div>
        </div>
      )}

      {/* Custom Service */}
      {(customServiceSection.title || (customServiceSection.paragraphs||[]).length > 0) && (
        <div className="scpv-section" style={{background:"#f9fafb"}}>
          <div className="scpv-sec-label"><i className="bi bi-sliders"/> Custom Service</div>
          <div className="scpv-two-col">
            <div className="scpv-img-col">
              {customServiceSection.image
                ? <img src={customServiceSection.image} className="scpv-section-img" alt="" onError={e=>e.target.style.display="none"}/>
                : <div className="scpv-img-ph"><i className="bi bi-image"/><span>No image</span></div>}
            </div>
            <div>
              {customServiceSection.title && <h2 className="scpv-h2">{customServiceSection.title}</h2>}
              {(customServiceSection.paragraphs||[]).slice(0,2).map((p,i)=><p key={i} className="scpv-p">{p}</p>)}
            </div>
          </div>
        </div>
      )}

      {/* Capabilities */}
      {(capabilities.heading || activeCards.length > 0) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-lightning"/> Capabilities</div>
          {capabilities.heading && <h2 className="scpv-h2">{capabilities.heading}</h2>}
          {capabilities.subHeading && <p className="scpv-p">{capabilities.subHeading}</p>}
          <div className="scpv-cards-grid" style={{marginTop:12}}>
            {activeCards.slice(0,3).map((c,i)=>(
              <div key={i} className="scpv-cap-card">
                {c.img ? <img src={c.img} style={{width:"100%",height:80,objectFit:"cover",borderRadius:6,marginBottom:8}} alt="" onError={e=>e.target.style.display="none"}/> : <div style={{width:"100%",height:60,background:"#f3f4f6",borderRadius:6,marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center"}}><i className="bi bi-image" style={{color:"#d1d5db",fontSize:20}}/></div>}
                <p className="scpv-card-title">{c.name || `Card ${i+1}`}</p>
                {c.para && <p className="scpv-p" style={{fontSize:13}}>{c.para.slice(0,80)}{c.para.length>80?"…":""}</p>}
              </div>
            ))}
          </div>
          {activeCards.length > 3 && <p className="scpv-more" style={{marginTop:8}}>+{activeCards.length-3} more cards</p>}
          {activeCards.length === 0 && <div className="scpv-empty">No capability cards added.</div>}
        </div>
      )}

      {/* Why Top Company */}
      {(whyTopCompany.heading || whyCards.length > 0) && (
        <div className="scpv-section" style={{background:"#f9fafb"}}>
          <div className="scpv-sec-label"><i className="bi bi-trophy"/> Why Top Company</div>
          {whyTopCompany.heading && <h2 className="scpv-h2">{whyTopCompany.heading}</h2>}
          {whyTopCompany.description && <p className="scpv-p">{whyTopCompany.description}</p>}
          <div className="scpv-why-cards">
            {whyCards.slice(0,3).map((c,i)=>(
              <div key={i} className="scpv-why-card">
                <i className={c.icon||"bi bi-star"}/>
                <div><p className="scpv-card-title">{c.title}</p><p className="scpv-p" style={{fontSize:13,margin:0}}>{(c.desc||"").slice(0,60)}{(c.desc||"").length>60?"…":""}</p></div>
              </div>
            ))}
          </div>
          {whyCards.length > 3 && <p className="scpv-more" style={{marginTop:8}}>+{whyCards.length-3} more cards</p>}
        </div>
      )}

      {/* Left/Right Sections */}
      {lrSections.length > 0 && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-layout-split"/> Content Sections</div>
          {lrSections.slice(0,2).map((s,i)=>(
            <div key={i} className="scpv-lr-block" style={{flexDirection: s.imagePosition==="left"?"row-reverse":"row"}}>
              <div>
                {s.title && <h2 className="scpv-h2" style={{fontSize:17}}>{s.title}</h2>}
                {(s.paragraphs||[]).slice(0,2).map((p,j)=><p key={j} className="scpv-p">{p}</p>)}
                {(s.bulletPoints||[]).slice(0,3).map((b,j)=><div key={j} className="scpv-bullet">{b}</div>)}
              </div>
              <div>
                {s.image ? <img src={s.image} style={{width:"100%",borderRadius:10,objectFit:"cover",maxHeight:160}} alt="" onError={e=>e.target.style.display="none"}/> : <div className="scpv-img-ph" style={{minHeight:100}}><i className="bi bi-image"/></div>}
              </div>
            </div>
          ))}
          {lrSections.length > 2 && <p className="scpv-more">+{lrSections.length-2} more sections</p>}
        </div>
      )}

      {/* Industries */}
      {(industries.heading || indList.length > 0) && (
        <div className="scpv-section" style={{background:"#f0fdf4"}}>
          <div className="scpv-sec-label"><i className="bi bi-building"/> Industries</div>
          {industries.heading && <h2 className="scpv-h2">{industries.heading}</h2>}
          {industries.description && <p className="scpv-p">{industries.description}</p>}
          <div className="scpv-ind-chips">
            {indList.map((item,i)=>(
              <div key={i} className="scpv-ind-chip">
                <i className={item.icon||"bi bi-building"}/><span>{item.name}</span>
              </div>
            ))}
          </div>
          {indList.length===0 && <div className="scpv-empty">No industries added.</div>}
        </div>
      )}

      {/* Process */}
      {(process.heading || procSteps.length > 0) && (
        <div className="scpv-section scpv-dark-section">
          <div className="scpv-sec-label" style={{color:"#4ade80"}}><i className="bi bi-diagram-3"/> Process</div>
          {process.heading && <h2 className="scpv-h2" style={{color:"#fff"}}>{process.heading}</h2>}
          {process.description && <p className="scpv-p" style={{color:"#d1fae5"}}>{process.description}</p>}
          <div className="scpv-proc-steps">
            {procSteps.map((s,i)=>(
              <div key={i} className="scpv-step">
                <div className="scpv-step-num">{i+1}</div>
                <p className="scpv-step-name">{s.name||`Step ${i+1}`}</p>
              </div>
            ))}
          </div>
          {procSteps.length===0 && <div className="scpv-empty">No process steps added.</div>}
        </div>
      )}

      {/* SEO */}
      <div className="scpv-section">
        <div className="scpv-sec-label"><i className="bi bi-search"/> SEO Preview</div>
        <div className="sc-serp-box" style={{maxWidth:560}}>
          <p className="sc-serp-url">yourdomain.com/services/{formData.slug||"slug"}</p>
          <p className="sc-serp-title">{seo.title||<span style={{color:"#9ca3af"}}>Meta title not set</span>}</p>
          <p className="sc-serp-desc">{seo.description||<span style={{color:"#9ca3af"}}>Meta description not set</span>}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServiceEditor({ mode = "create", slug = null }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("meta");
  const [formData, setFormData]   = useState({ status: "active", order: 0, isPublished: true });
  const [loading, setLoading]     = useState(mode === "edit");
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState(null);
  const [unsaved, setUnsaved]     = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const toastRef = useRef(null);

  useEffect(() => {
    if (mode !== "edit" || !slug) return;
    (async () => {
      try {
        // Replace with your actual service: const res = await getServiceBySlugServ(slug);
        const res = { data: { success: true, data: {} } };
        if (res?.data?.success && res.data.data) {
          setFormData(res.data.data);
          setIsPublished(res.data.data.isPublished !== false);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [mode, slug]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) { showToast("Service name is required.", "error"); setActiveTab("meta"); return; }
    if (!formData.slug?.trim()) { showToast("Slug is required.", "error"); setActiveTab("meta"); return; }
    setSaving(true);
    try {
      const payload = { ...formData, isPublished };
      // Replace with your actual service calls:
      // const res = mode === "create" ? await createServiceServ(payload) : await updateServiceServ(slug, payload);
      const res = { data: { success: true } };
      if (res?.data?.success) {
        showToast(mode === "create" ? "Service created!" : "Service updated!");
        setUnsaved(false);
        if (mode === "create") setTimeout(() => router.push("/admin/services"), 1200);
      } else {
        showToast(res?.data?.message || "Failed to save.", "error");
      }
    } catch { showToast("Network error. Please try again.", "error"); }
    finally { setSaving(false); }
  };

  const update = (section, val) => {
    setFormData((prev) => ({ ...prev, [section]: val }));
    setUnsaved(true);
  };

  const renderEditor = () => {
    switch (activeTab) {
      case "meta":                return <MetaEditor formData={formData} setFormData={(u) => { setFormData(u); setUnsaved(true); }} />;
      case "hero":                return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
      case "bestServiceSection":  return <BestServiceEditor data={formData.bestServiceSection} onChange={(v) => update("bestServiceSection", v)} />;
      case "customServiceSection":return <CustomServiceEditor data={formData.customServiceSection} onChange={(v) => update("customServiceSection", v)} />;
      case "capabilities":        return <CapabilitiesEditor data={formData.capabilities} onChange={(v) => update("capabilities", v)} />;
      case "whyTopCompany":       return <WhyTopCompanyEditor data={formData.whyTopCompany} onChange={(v) => update("whyTopCompany", v)} />;
      case "leftRightSections":   return <LeftRightEditor data={formData.leftRightSections} onChange={(v) => update("leftRightSections", v)} />;
      case "industries":          return <IndustriesEditor data={formData.industries} onChange={(v) => update("industries", v)} />;
      case "process":             return <ProcessEditor data={formData.process} onChange={(v) => update("process", v)} />;
      case "seo":                 return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
      default: return null;
    }
  };

  if (loading) return (
    <div className="sc-loading"><div className="sc-spinner"/><p>Loading service...</p></div>
  );

  return (
    <>
      <SharedStyles />
      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle={mode === "create" ? "Create Service" : (formData.name || "Edit Service")}
        pageSubtitle={mode === "create" ? "Fill in the sections below to create a new service page" : `Editing: /services/${formData.slug || "..."}`}
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl={formData.slug ? `/services/${formData.slug}` : undefined}
        backUrl="/admin/services"
      >
        <div className="sc-content">{renderEditor()}</div>

        <div className="sc-preview-divider">
          <span><i className="bi bi-eye"/> Page Preview</span>
          <div className="sc-preview-divider-line"/>
          <span className="sc-preview-note">Updates as you edit any section above</span>
        </div>

        <ServicePreview formData={formData}/>
      </CmsTabs>

      {toast && (
        <div className={`sc-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"}/> {toast.msg}
        </div>
      )}
    </>
  );
}