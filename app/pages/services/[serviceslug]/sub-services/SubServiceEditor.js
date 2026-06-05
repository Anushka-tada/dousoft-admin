"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CmsTabs from "../../../../Components/CmsTabs";
import {
  SharedStyles, Field, Input, Textarea, Toggle, Select, ImageUpload,
  SortableItem, ParagraphsEditor, SeoEditor, HeroEditor,
  BestServiceEditor, CustomServiceEditor, CapabilitiesEditor,
  LeftRightEditor, FaqEditor,
} from "../../../../Components/Sharededitorcomponents";
import { createServiceSubCategoryServ, getSingleSubCategoryServ, updateServiceSubCategoryServ } from "@/app/services/pages.service";
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

// import { createServiceSubCategoryServ, getSingleServiceSubCategoryServ } from "../../../../services/pages.service";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: "meta",                label: "Meta",           icon: "bi bi-tag" },
  { key: "hero",                label: "Hero",           icon: "bi bi-image" },
  { key: "bestServiceSection",  label: "Best Service",   icon: "bi bi-award" },
  { key: "customServiceSection",label: "Custom Service", icon: "bi bi-sliders" },
  { key: "capabilities",        label: "Capabilities",   icon: "bi bi-lightning" },
  { key: "leftRightSections",   label: "Left/Right",     icon: "bi bi-layout-split" },
  { key: "getStartedSection",   label: "Get Started",    icon: "bi bi-rocket" },
  { key: "faqSection",          label: "FAQ",            icon: "bi bi-question-circle" },
  { key: "seo",                 label: "SEO",            icon: "bi bi-search" },
];

// ─── Meta Editor (SubService-specific) ───────────────────────────────────────
const MetaEditor = ({ formData, setFormData, categorySlug }) => {
  const autoSlug = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const u = (k, v) => setFormData((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-tag" /> Sub-Service Identity</p>
      <p className="sc-section-hint">Basic identifiers. Slug is used in the URL under the parent service.</p>
      <div className="sc-grid-2">
        <Field label="Sub-Service Name" hint='e.g. "React Development"'>
          <Input value={formData.name || ""} placeholder="React Development"
            onChange={(e) => {
              const name = e.target.value;
              setFormData((prev) => ({ ...prev, name, slug: prev.slug || autoSlug(name) }));
            }}
          />
        </Field>
        <Field label="URL Slug" hint="Auto-generated or custom">
          <div className="sc-slug-row">
            <span className="sc-slug-prefix">/services/{categorySlug || "service"}/</span>
            <Input value={formData.slug || ""} placeholder="react-development"
              onChange={(e) => u("slug", autoSlug(e.target.value))} />
          </div>
        </Field>
      </div>
      <div className="sc-grid-2">
        <Field label="Type">
          <Select value={formData.type || "general"} onChange={(e) => u("type", e.target.value)}>
            <option value="general">General</option>
            <option value="city">City</option>
            <option value="technology">Technology</option>
          </Select>
        </Field>
        <Field label="Status">
          <Select value={formData.status || "active"} onChange={(e) => u("status", e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </Field>
      </div>
      <Field label="Display Order" hint="Lower = appears first">
        <Input type="number" value={formData.order ?? 1} style={{ maxWidth: 120 }}
          onChange={(e) => u("order", parseInt(e.target.value) || 1)} />
      </Field>
    </div>
  );
};

// ─── Get Started Editor ───────────────────────────────────────────────────────
const GetStartedEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const desc = data.description || [];

  const addDesc = () => u("description", [...desc, ""]);
  const updDesc = (i, v) => { const a = [...desc]; a[i] = v; u("description", a); };
  const remDesc = (i) => u("description", desc.filter((_, idx) => idx !== i));

  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-rocket" /> Get Started Section</p>
      <p className="sc-section-hint">CTA / closing section with action-oriented content.</p>
      <Field label="Title">
        <Input value={data.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Ready to get started?" />
      </Field>
      <div className="sc-para-section" style={{ marginTop: 16 }}>
        <div className="sc-para-header">
          <label className="sc-label">Description Paragraphs</label>
          <button className="sc-add-inline-btn" onClick={addDesc}><i className="bi bi-plus-circle" /> Add</button>
        </div>
        {desc.map((d, i) => (
          <div key={i} className="sc-para-row">
            <div className="sc-para-num">{i + 1}</div>
            <Textarea value={d} onChange={(e) => updDesc(i, e.target.value)} rows={2} placeholder={`Description ${i + 1}...`} style={{ flex: 1 }} />
            <button className="sc-icon-btn danger" onClick={() => remDesc(i)}><i className="bi bi-trash" /></button>
          </div>
        ))}
        {desc.length === 0 && <div className="sc-empty-state">No description paragraphs yet.</div>}
      </div>
      {/* Preview */}
      <div className="sc-cta-preview" style={{ marginTop: 20 }}>
        <div style={{ background: "linear-gradient(135deg,#0f2618,#1a3c28)", borderRadius: 12, padding: "28px", textAlign: "center" }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{data.title || "Get Started Heading"}</p>
          {desc.slice(0, 1).map((d, i) => <p key={i} style={{ fontSize: 14, color: "#d1fae5", margin: "0 0 6px" }}>{d}</p>)}
          <div style={{ display: "inline-block", padding: "10px 28px", background: "#16a34a", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, marginTop: 12 }}>Get Started</div>
        </div>
      </div>
    </div>
  );
};

// ─── Full Page Preview ────────────────────────────────────────────────────────
const SubServicePreview = ({ formData, categorySlug }) => {
  const {
    hero = {}, bestServiceSection = {}, customServiceSection = {},
    capabilities = {}, leftRightSections = [],
    getStartedSection = {}, faqSection = [], seo = {},
  } = formData;

  const capCards = capabilities.cards || [];
  const lrSections = leftRightSections || [];
  const faqs = faqSection || [];

  return (
    <div className="scpv-wrap" style={{ margin: "0 24px 24px" }}>
      <style>{`
        .scpv-wrap { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; }
        .scpv-chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .scpv-chrome-left { display: flex; align-items: center; gap: 10px; }
        .scpv-dots { display: flex; gap: 5px; }
        .scpv-dot { width: 10px; height: 10px; border-radius: 50%; }
        .scpv-dot.r { background: #f87171; } .scpv-dot.y { background: #fbbf24; } .scpv-dot.g { background: #4ade80; }
        .scpv-url { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 14px; font-size: 12px; color: #6b7280; min-width: 200px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 360px; }
        .scpv-chrome-label { font-size: 13px; font-weight: 600; color: #9ca3af; display: flex; align-items: center; gap: 5px; }
        .scpv-hero { background: linear-gradient(135deg,#0c1f30,#0f3348); padding: 40px 32px; text-align: center; }
        .scpv-hero-bread { font-size: 12px; color: rgba(255,255,255,.4); margin-bottom: 10px; }
        .scpv-hero-title { font-size: 26px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .scpv-hero-desc { font-size: 15px; color: #bae6fd; margin: 0 auto; max-width: 500px; }
        .scpv-type-badge { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 10px; background: rgba(255,255,255,.1); color: #7dd3fc; border: 1px solid rgba(125,211,252,.3); border-radius: 20px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: .05em; }
        .scpv-section { padding: 28px 32px; border-top: 1px solid #f3f4f6; }
        .scpv-dark-section { background: #0c1f30; border-top: none; }
        .scpv-sec-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 12px; display: flex; align-items: center; gap: 5px; }
        .scpv-h2 { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px; }
        .scpv-p { font-size: 14px; color: #6b7280; margin: 0 0 8px; line-height: 1.6; }
        .scpv-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .scpv-section-img { width: 100%; border-radius: 10px; object-fit: cover; max-height: 200px; }
        .scpv-img-ph { width: 100%; min-height: 140px; background: #f3f4f6; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #d1d5db; font-size: 13px; }
        .scpv-img-ph i { font-size: 28px; }
        .scpv-cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-top: 12px; }
        .scpv-cap-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; }
        .scpv-card-title { font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 4px; }
        .scpv-lr-block { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; padding: 20px 0; border-bottom: 1px solid #f3f4f6; }
        .scpv-lr-block:last-child { border-bottom: none; }
        .scpv-bullet { display: flex; align-items: flex-start; gap: 6px; font-size: 13px; color: #374151; padding: 3px 0; }
        .scpv-bullet:before { content: "•"; color: #0ea5e9; font-size: 16px; line-height: 1; flex-shrink: 0; }
        .scpv-faq-item { border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; margin-bottom: 8px; }
        .scpv-faq-q { font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 6px; display: flex; align-items: flex-start; gap: 8px; }
        .scpv-faq-q:before { content: "Q"; font-size: 11px; font-weight: 700; color: #0ea5e9; background: #e0f2fe; border-radius: 4px; padding: 1px 5px; flex-shrink: 0; margin-top: 1px; }
        .scpv-faq-a { font-size: 13px; color: #6b7280; margin: 0; line-height: 1.6; padding-left: 24px; }
        .scpv-empty { font-size: 13px; color: #d1d5db; font-style: italic; }
        .scpv-more { font-size: 12px; color: #9ca3af; font-style: italic; margin-top: 6px; }
        @media(max-width:640px) { .scpv-two-col,.scpv-cards-grid,.scpv-lr-block { grid-template-columns: 1fr; } }
      `}</style>

      {/* Chrome */}
      <div className="scpv-chrome">
        <div className="scpv-chrome-left">
          <div className="scpv-dots">
            <span className="scpv-dot r"/><span className="scpv-dot y"/><span className="scpv-dot g"/>
          </div>
          <div className="scpv-url">yourdomain.com/services/{categorySlug||"service"}/{formData.slug||"sub-service"}</div>
        </div>
        <span className="scpv-chrome-label"><i className="bi bi-eye"/> Full Page Preview</span>
      </div>

      {/* Hero */}
      <div className="scpv-hero">
        {/* {formData.type && <div className="scpv-type-badge">{formData.type}</div>} */}
       
        <h1 className="scpv-hero-title">{hero.title || <span style={{opacity:.4}}>Page title not set</span>}</h1>
        {hero.description && <p className="scpv-hero-desc">{hero.description}</p>}
         <div className="scpv-hero-bread">{hero.breadcrumb || `Home / Services / ${categorySlug||"service"}`}</div>
      </div>

      {/* Best Service */}
      {(bestServiceSection.title || (bestServiceSection.paragraphs||[]).length > 0) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-award"/> Best Service</div>
          <div className="scpv-two-col">
            <div>
              {bestServiceSection.title && <h2 className="scpv-h2">{bestServiceSection.title}</h2>}
              {(bestServiceSection.paragraphs||[]).slice(0,2).map((p,i)=><p key={i} className="scpv-p">{p}</p>)}
              {(bestServiceSection.paragraphs||[]).length>2 && <p className="scpv-more">+{bestServiceSection.paragraphs.length-2} more paragraphs</p>}
              {bestServiceSection.imagepara && <p className="scpv-p" style={{fontStyle:"italic",borderLeft:"3px solid #0ea5e9",paddingLeft:10,marginTop:8}}>{bestServiceSection.imagepara}</p>}
            </div>
            <div>
              {bestServiceSection.image
                ? <img src={bestServiceSection.image} className="scpv-section-img" alt="" onError={e=>e.target.style.display="none"}/>
                : <div className="scpv-img-ph"><i className="bi bi-image"/><span>No image</span></div>}
            </div>
          </div>
        </div>
      )}

      {/* Custom Service */}
      {(customServiceSection.title || (customServiceSection.paragraphs||[]).length > 0) && (
        <div className="scpv-section" style={{background:"#f0f9ff"}}>
          <div className="scpv-sec-label"><i className="bi bi-sliders"/> Custom Service</div>
          <div className="scpv-two-col">
            <div>
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
      {(capabilities.heading || capCards.length > 0) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-lightning"/> Capabilities</div>
          {capabilities.heading && <h2 className="scpv-h2">{capabilities.heading}</h2>}
          {capabilities.subHeading && <p className="scpv-p">{capabilities.subHeading}</p>}
          <div className="scpv-cards-grid">
            {capCards.slice(0,3).map((c,i)=>(
              <div key={i} className="scpv-cap-card">
                {c.img ? <img src={c.img} style={{width:"100%",height:70,objectFit:"cover",borderRadius:6,marginBottom:8}} alt="" onError={e=>e.target.style.display="none"}/> : <div style={{width:"100%",height:60,background:"#f3f4f6",borderRadius:6,marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center"}}><i className="bi bi-image" style={{color:"#d1d5db",fontSize:20}}/></div>}
                <p className="scpv-card-title">{c.name||`Card ${i+1}`}</p>
                {c.para && <p className="scpv-p" style={{fontSize:12}}>{c.para.slice(0,70)}{c.para.length>70?"…":""}</p>}
              </div>
            ))}
          </div>
          {capCards.length>3 && <p className="scpv-more">+{capCards.length-3} more cards</p>}
          {capCards.length===0 && <p className="scpv-empty">No capability cards added.</p>}
        </div>
      )}

      {/* Left/Right */}
      {lrSections.length > 0 && (
        <div className="scpv-section" style={{background:"#f9fafb"}}>
          <div className="scpv-sec-label"><i className="bi bi-layout-split"/> Content Sections</div>
          {lrSections.slice(0,2).map((s,i)=>(
            <div key={i} className="scpv-lr-block">
              <div style={{order: s.imagePosition==="left" ? 2 : 1}}>
                {s.title && <h2 className="scpv-h2" style={{fontSize:16}}>{s.title}</h2>}
                {(s.paragraphs||[]).slice(0,2).map((p,j)=><p key={j} className="scpv-p">{p}</p>)}
                {s.bulletHead && <p style={{fontWeight:600,fontSize:13,color:"#374151",marginBottom:4}}>{s.bulletHead}</p>}
                {(s.bulletPoints||[]).slice(0,3).map((b,j)=><div key={j} className="scpv-bullet">{b}</div>)}
              </div>
              <div style={{order: s.imagePosition==="left" ? 1 : 2}}>
                {s.image ? <img src={s.image} style={{width:"100%",borderRadius:10,objectFit:"cover",maxHeight:150}} alt="" onError={e=>e.target.style.display="none"}/> : <div className="scpv-img-ph" style={{minHeight:100}}><i className="bi bi-image"/></div>}
              </div>
            </div>
          ))}
          {lrSections.length>2 && <p className="scpv-more">+{lrSections.length-2} more sections</p>}
        </div>
      )}

      {/* Get Started */}
      {(getStartedSection.title || (getStartedSection.description||[]).length > 0) && (
        <div className="scpv-section scpv-dark-section">
          <div className="scpv-sec-label" style={{color:"#7dd3fc"}}><i className="bi bi-rocket"/> Get Started</div>
          <div style={{textAlign:"center",maxWidth:500,margin:"0 auto"}}>
            <h2 style={{fontSize:22,fontWeight:700,color:"#fff",margin:"0 0 10px"}}>{getStartedSection.title||<span style={{opacity:.4}}>Get Started</span>}</h2>
            {(getStartedSection.description||[]).slice(0,1).map((d,i)=><p key={i} style={{fontSize:14,color:"#bae6fd",margin:"0 0 16px"}}>{d}</p>)}
            <div style={{display:"inline-block",padding:"10px 28px",background:"#0ea5e9",color:"#fff",borderRadius:8,fontSize:14,fontWeight:600}}>Get Started Today</div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-question-circle"/> FAQ ({faqs.length})</div>
          {faqs.slice(0,3).map((f,i)=>(
            <div key={i} className="scpv-faq-item">
              <p className="scpv-faq-q">{f.question||`Question ${i+1}`}</p>
              {f.answer && <p className="scpv-faq-a">{f.answer.slice(0,120)}{f.answer.length>120?"…":""}</p>}
            </div>
          ))}
          {faqs.length>3 && <p className="scpv-more">+{faqs.length-3} more FAQs</p>}
        </div>
      )}

      {/* SEO */}
      <div className="scpv-section">
        <div className="scpv-sec-label"><i className="bi bi-search"/> SEO Preview</div>
        <div className="sc-serp-box" style={{maxWidth:560}}>
          <p className="sc-serp-url">yourdomain.com/services/{categorySlug||"service"}/{formData.slug||"sub-service"}</p>
          <p className="sc-serp-title">{seo.title||<span style={{color:"#9ca3af"}}>Meta title not set</span>}</p>
          <p className="sc-serp-desc">{seo.description||<span style={{color:"#9ca3af"}}>Meta description not set</span>}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SubServiceEditor({ mode = "create", serviceSlug = null, subServiceSlug = null }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("meta");
  const [formData, setFormData]   = useState({ type: "general", status: "active", order: 1, isPublished: true });
  const [loading, setLoading]     = useState(mode === "edit");
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState(null);
  const [unsaved, setUnsaved]     = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const toastRef = useRef(null);

  useEffect(() => {
    console.log("inside the function" , serviceSlug , subServiceSlug)
    if (mode !== "edit" || !subServiceSlug) return;
    (async () => {
      try {
         const res = await getSingleSubCategoryServ(serviceSlug, subServiceSlug);

        if (res?.data?.success || res.data.data) {
          setFormData(res.data.data);
          setIsPublished(res.data.data.isPublished !== false);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [mode, serviceSlug, subServiceSlug]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) { showToast("Sub-service name is required.", "error"); setActiveTab("meta"); return; }
    if (!formData.slug?.trim()) { showToast("Slug is required.", "error"); setActiveTab("meta"); return; }
    setSaving(true);
    try {
      const payload = { ...formData, isPublished, categorySlug: serviceSlug };
      // Replace with your actual calls:
      const res = mode === "create" ? await createServiceSubCategoryServ ( payload) 
       : await updateServiceSubCategoryServ(serviceSlug, subServiceSlug, payload);
     
      if (res?.data?.data) {
        showToast(mode === "create" ? "Sub-service created!" : "Sub-service updated!");
        setUnsaved(false);
        if (mode === "create") setTimeout(() => router.push(`/pages/services/${serviceSlug}/sub-services`), 1200);
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
      case "meta":                return <MetaEditor formData={formData} setFormData={(u) => { setFormData(u); setUnsaved(true); }} categorySlug={serviceSlug} />;
      case "hero":                return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
      case "bestServiceSection":  return <BestServiceEditor data={formData.bestServiceSection} onChange={(v) => update("bestServiceSection", v)} />;
      case "customServiceSection":return <CustomServiceEditor data={formData.customServiceSection} onChange={(v) => update("customServiceSection", v)} />;
      case "capabilities":        return <CapabilitiesEditor data={formData.capabilities} onChange={(v) => update("capabilities", v)} />;
      case "leftRightSections":   return <LeftRightEditor data={formData.leftRightSections} onChange={(v) => update("leftRightSections", v)} />;
      case "getStartedSection":   return <GetStartedEditor data={formData.getStartedSection} onChange={(v) => update("getStartedSection", v)} />;
      case "faqSection":          return <FaqEditor data={formData.faqSection} onChange={(v) => update("faqSection", v)} />;
      case "seo":                 return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
      default: return null;
    }
  };

  if (loading) return (
  <HomePageSkeleton/> 
  );

  return (
    <>
      <SharedStyles />
      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle={mode === "create" ? "Create Sub-Service" : (formData.name || "Edit Sub-Service")}
        pageSubtitle={mode === "create" ? `Under: /services/${serviceSlug}` : `Editing: /services/${serviceSlug}/${formData.slug||"..."}`}
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl={formData.slug ? `/services/${serviceSlug}/${formData.slug}` : undefined}
        backUrl={`/pages/services/${serviceSlug}/sub-services`}
      >
        <div className="sc-content">{renderEditor()}</div>

        <div className="sc-preview-divider">
          <span><i className="bi bi-eye"/> Page Preview</span>
          <div className="sc-preview-divider-line"/>
          <span className="sc-preview-note">Updates as you edit any section above</span>
        </div>

        <SubServicePreview formData={formData} categorySlug={serviceSlug} />
      </CmsTabs>

      {toast && (
        <div className={`sc-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"}/> {toast.msg}
        </div>
      )}
    </>
  );
}