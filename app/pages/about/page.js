// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import CmsTabs from "../../Components/CmsTabs";  

// const TABS = [
//   { key: "hero",            label: "Hero",          icon: "bi bi-house-door" },
//   { key: "whoWeAre",        label: "Who We Are",    icon: "bi bi-people" },
//   { key: "stats",           label: "Stats",         icon: "bi bi-bar-chart" },
//   { key: "Journey",    label: "Our Journey",  icon: "bi bi-chat-quote" },
//   { key: "seo",             label: "SEO",           icon: "bi bi-search" },
// ];


// export default function AboutPage(){
//     const [activeTab, setActiveTab] = useState("hero");
//       const [formData, setFormData] = useState({});
//       const [loading, setLoading] = useState(true);
//       const [saving, setSaving] = useState(false);
//       const [toast, setToast] = useState(null);
//       const [isPublished, setIsPublished] = useState(true);
//       const [unsaved, setUnsaved] = useState(false);
//       const toastRef = useRef(null);
    
//       useEffect(() => {
//         const load = async () => {
//           try {
//             const res = await fetch("/api/cms/home");
//             if (res.ok) {
//               const json = await res.json();
//               if (json.data) { setFormData(json.data); setIsPublished(json.data.isPublished !== false); }
//             }
//           } catch (e) { console.error(e); }
//           finally { setLoading(false); }
//         };
//         load();
//       }, []);
    
//       const showToast = (msg, type = "success") => {
//         setToast({ msg, type });
//         clearTimeout(toastRef.current);
//         toastRef.current = setTimeout(() => setToast(null), 3000);
//       };
    
//       const handleSave = async () => {
//         setSaving(true);
//         try {
//           const res = await fetch("", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ ...formData, isPublished }),
//           });
//           if (res.ok) { showToast("About page saved successfully!", "success"); setUnsaved(false); }
//           else showToast("Failed to save. Please try again.", "error");
//         } catch { showToast("Network error. Please try again.", "error"); }
//         finally { setSaving(false); }
//       };
    
//       const update = (section, val) => {
//         setFormData((prev) => ({ ...prev, [section]: val }));
//         setUnsaved(true);
//       };
    
//     //   const renderEditor = () => {
//     //     switch (activeTab) {
//     //       case "hero":            return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
//     //       case "marquee":         return <MarqueeEditor data={formData.marqueeServices} onChange={(v) => update("marqueeServices", v)} />;
//     //       case "whoWeAre":        return <WhoWeAreEditor data={formData.whoWeAre} onChange={(v) => update("whoWeAre", v)} />;
//     //       case "whyChooseUs":     return <WhyChooseUsEditor data={formData.whyChooseUs} onChange={(v) => update("whyChooseUs", v)} />;
//     //       case "futureSection":   return <FutureSectionEditor data={formData.futureSection} onChange={(v) => update("futureSection", v)} />;
//     //       case "stats":           return <StatsEditor data={formData.stats} onChange={(v) => update("stats", v)} />;
//     //       case "industrySection": return <IndustrySectionEditor data={formData.industrySection} onChange={(v) => update("industrySection", v)} />;
//     //       case "techSection":     return <TechSectionEditor data={formData.techSection} onChange={(v) => update("techSection", v)} />;
//     //       case "agileSection":    return <AgileSectionEditor data={formData.agileSection} onChange={(v) => update("agileSection", v)} />;
//     //       case "testimonials":    return <TestimonialEditor data={formData.testimonialSection} onChange={(v) => update("testimonialSection", v)} />;
//     //       case "faqSection":      return <FaqEditor data={formData.faqSection} onChange={(v) => update("faqSection", v)} />;
//     //       case "cta":             return <CtaEditor data={formData.cta} onChange={(v) => update("cta", v)} />;
//     //       case "seo":             return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
//     //       default:                return null;
//     //     }
//     //   };
    
//       if (loading) return (
//         <div className="cms-loading">
//           <div className="cms-spinner" />
//           <p>Loading About Page Data...</p>
//         </div>
//       );

//       return (

//           <CmsTabs
//                 tabs={TABS}
//                 activeTab={activeTab}
//                 onChange={setActiveTab}
//                 pageTitle="About Page"
//                 pageSubtitle="Manage all sections of your about page"
//                 isPublished={isPublished}
//                 onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
//                 onSave={handleSave}
//                 saving={saving}
//                 unsaved={unsaved}
//                 previewUrl="/"
//               ></CmsTabs>
//       );
// }







"use client";
import React, { useState, useEffect, useRef } from "react";
import CmsTabs from "../../Components/CmsTabs"; 

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: "hero",                label: "Hero",             icon: "bi bi-image" },
  { key: "whoWeAre",            label: "Who We Are",       icon: "bi bi-people" },
  { key: "stats",               label: "Stats",            icon: "bi bi-bar-chart" },
  { key: "missionVisionSection",label: "Mission & Vision", icon: "bi bi-bullseye" },
  { key: "timelineSection",     label: "Timeline",         icon: "bi bi-clock-history" },
  { key: "seo",                 label: "SEO",              icon: "bi bi-search" },
];

// ─── Shared primitives ────────────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="ab-field">
    <label className="ab-label">{label}</label>
    {children}
    {hint && <p className="ab-hint">{hint}</p>}
  </div>
);

const Input = (props) => <input className="ab-input" {...props} />;

const Textarea = ({ rows = 3, ...props }) => (
  <textarea className="ab-textarea" rows={rows} {...props} />
);

const Toggle = ({ label, checked, onChange }) => (
  <div className="ab-toggle-row">
    <span className="ab-label">{label}</span>
    <label className="ab-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="ab-slider" />
    </label>
  </div>
);

const ImageUpload = ({ label, value, onChange, hint }) => (
  <Field label={label} hint={hint}>
    <div className="ab-img-upload">
      {value ? (
        <div className="ab-img-preview">
          <img src={value} alt="preview" onError={(e) => (e.target.style.display = "none")} />
          <button className="ab-img-remove" onClick={() => onChange("")}>
            <i className="bi bi-x" />
          </button>
        </div>
      ) : (
        <label className="ab-img-placeholder">
          <i className="bi bi-cloud-upload" />
          <span>Click to upload</span>
          <input type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files[0]; if (f) onChange(URL.createObjectURL(f)); }} />
        </label>
      )}
      <input className="ab-input" style={{ marginTop: 8 }}
        placeholder="Or paste image URL..."
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </Field>
);

const SortableItem = ({ index, onMoveUp, onMoveDown, onDelete, title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="ab-list-item">
      <div className="ab-list-header" onClick={() => setOpen((p) => !p)}>
        <div className="ab-list-header-left">
          <i className={`bi bi-chevron-${open ? "down" : "right"} ab-chevron`} />
          <span className="ab-list-title">{title || `Item ${index + 1}`}</span>
        </div>
        <div className="ab-list-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={onMoveUp} title="Move up"><i className="bi bi-arrow-up" /></button>
          <button onClick={onMoveDown} title="Move down"><i className="bi bi-arrow-down" /></button>
          <button onClick={onDelete} className="danger" title="Delete"><i className="bi bi-trash" /></button>
        </div>
      </div>
      {open && <div className="ab-list-body">{children}</div>}
    </div>
  );
};

// ─── Section Editors ──────────────────────────────────────────────────────────

// 1. HERO
const HeroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="ab-section-block">
      <p className="ab-block-title"><i className="bi bi-image" /> Hero / Banner Section</p>
      <p className="ab-section-hint">This appears as the top banner of the About page with title, breadcrumb and description.</p>
      <Field label="Page Title" hint='e.g. "About Us"'>
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="About Us" />
      </Field>
      <Field label="Breadcrumb Text" hint='e.g. "Home / About"'>
        <Input value={data?.breadcrumb || ""} onChange={(e) => u("breadcrumb", e.target.value)} placeholder="Home / About" />
      </Field>
      <Field label="Short Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3}
          placeholder="A brief intro shown in the hero banner..." />
      </Field>
    </div>
  );
};

// 2. WHO WE ARE
const WhoWeAreEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });

  // description is [String] array — each item is a paragraph
  const paragraphs = data?.description || [];
  const addPara = () => u("description", [...paragraphs, ""]);
  const updPara = (i, v) => { const a = [...paragraphs]; a[i] = v; u("description", a); };
  const remPara = (i) => u("description", paragraphs.filter((_, idx) => idx !== i));

  // features array
  const features = data?.features || [];
  const addFeature = () => u("features", [...features, { title: "", icon: "", isActive: true, order: features.length }]);
  const updFeature = (i, k, v) => { const a = [...features]; a[i] = { ...a[i], [k]: v }; u("features", a); };
  const remFeature = (i) => u("features", features.filter((_, idx) => idx !== i).map((f, idx) => ({ ...f, order: idx })));
  const movFeature = (i, d) => {
    const a = [...features]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("features", a.map((f, idx) => ({ ...f, order: idx })));
  };

  return (
    <div>
      {/* Section content */}
      <div className="ab-section-block">
        <p className="ab-block-title"><i className="bi bi-people" /> Section Content</p>
        <div className="ab-grid-2">
          <Field label="Badge Text" hint='e.g. "Who We Are"'>
            <Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} placeholder="Who We Are" />
          </Field>
          <Field label="Section Heading">
            <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="About Our Company" />
          </Field>
        </div>

        {/* Paragraphs as array */}
        <div className="ab-para-section">
          <div className="ab-para-header">
            <label className="ab-label">Description Paragraphs</label>
            <button className="ab-add-inline-btn" onClick={addPara}>
              <i className="bi bi-plus-circle" /> Add Paragraph
            </button>
          </div>
          <p className="ab-hint" style={{ marginBottom: 10 }}>Each entry = one paragraph on the page.</p>
          {paragraphs.map((p, i) => (
            <div key={i} className="ab-para-row">
              <div className="ab-para-num">{i + 1}</div>
              <Textarea
                value={p}
                onChange={(e) => updPara(i, e.target.value)}
                rows={2}
                placeholder={`Paragraph ${i + 1}...`}
                style={{ flex: 1 }}
              />
              <button className="ab-icon-btn danger" onClick={() => remPara(i)} title="Remove">
                <i className="bi bi-trash" />
              </button>
            </div>
          ))}
          {paragraphs.length === 0 && (
            <div className="ab-empty-state">No paragraphs yet. Click &ldquo;Add Paragraph&ldquo; above.</div>
          )}
        </div>

        <ImageUpload
          label="Section Image"
          value={data?.image}
          onChange={(v) => u("image", v)}
          hint="Image shown beside the text. Recommended: 600×500px"
        />
      </div>

      {/* Features */}
      <div className="ab-section-block">
        <p className="ab-block-title"><i className="bi bi-check2-circle" /> Feature Points ({features.length})</p>
        <p className="ab-hint" style={{ marginBottom: 14 }}>Small icon+label chips shown below the description.</p>
        {features.map((f, i) => (
          <SortableItem key={i} index={i} title={f.title || `Feature ${i + 1}`}
            onMoveUp={() => movFeature(i, -1)} onMoveDown={() => movFeature(i, 1)}
            onDelete={() => remFeature(i)}>
            <div className="ab-grid-2">
              <Field label="Feature Title">
                <Input value={f.title} onChange={(e) => updFeature(i, "title", e.target.value)} placeholder="e.g. 500+ Projects" />
              </Field>
              <Field label="Icon Class" hint="Bootstrap Icons class">
                <div className="ab-icon-preview-row">
                  <i className={f.icon || "bi bi-star"} style={{ fontSize: 18, color: "#16a34a", flexShrink: 0 }} />
                  <Input value={f.icon} onChange={(e) => updFeature(i, "icon", e.target.value)} placeholder="bi bi-star" />
                </div>
              </Field>
            </div>
            <Toggle label="Active" checked={f.isActive !== false} onChange={(e) => updFeature(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        <button className="ab-add-btn" onClick={addFeature}><i className="bi bi-plus-circle" /> Add Feature</button>
      </div>
    </div>
  );
};

// 3. STATS
const StatsEditor = ({ data, onChange }) => {
  const stats = data || [];
  const add = () => onChange([...stats, { label: "", value: "", suffix: "", order: stats.length }]);
  const upd = (i, k, v) => { const a = [...stats]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const rem = (i) => onChange(stats.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, order: idx })));
  const mov = (i, d) => {
    const a = [...stats]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    onChange(a.map((s, idx) => ({ ...s, order: idx })));
  };
  return (
    <div className="ab-section-block">
      <p className="ab-block-title"><i className="bi bi-bar-chart" /> Counter Stats</p>
      <p className="ab-hint" style={{ marginBottom: 16 }}>Numbers shown in the stats strip (e.g. 98% Client Satisfaction).</p>
      {stats.map((s, i) => (
        <SortableItem key={i} index={i} title={`${s.value || "0"}${s.suffix || ""} — ${s.label || "Label"}`}
          onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)} defaultOpen>
          <div className="ab-grid-3">
            <Field label="Value" hint='e.g. "98"'>
              <Input value={s.value} onChange={(e) => upd(i, "value", e.target.value)} placeholder="98" />
            </Field>
            <Field label="Suffix" hint='e.g. "%" or "+"'>
              <Input value={s.suffix} onChange={(e) => upd(i, "suffix", e.target.value)} placeholder="%" />
            </Field>
            <Field label="Label">
              <Input value={s.label} onChange={(e) => upd(i, "label", e.target.value)} placeholder="Client Satisfaction" />
            </Field>
          </div>
        </SortableItem>
      ))}
      {stats.length === 0 && <div className="ab-empty-state">No stats yet. Add your first counter below.</div>}
      <button className="ab-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Stat</button>

      {/* inline preview */}
      {stats.length > 0 && (
        <div className="ab-stats-preview">
          {stats.map((s, i) => (
            <div key={i} className="ab-stat-chip">
              <span className="ab-stat-num">{s.value}{s.suffix}</span>
              <span className="ab-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. MISSION / VISION SECTION
const TAB_TYPES = [
  { value: "mission", label: "Mission",  icon: "bi bi-rocket",    color: "#3b82f6" },
  { value: "vision",  label: "Vision",   icon: "bi bi-eye",       color: "#8b5cf6" },
  { value: "about",   label: "About",    icon: "bi bi-info-circle",color: "#10b981" },
];

const MissionVisionEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const uIntro = (k, v) => onChange({ ...data, intro: { ...data?.intro, [k]: v } });

  const tabs = data?.tabs || [];
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const addTab = () => {
    onChange({ ...data, tabs: [...tabs, { type: "", items: [] }] });
    setActiveTabIdx(tabs.length);
  };
  const updTab = (i, k, v) => {
    const a = [...tabs]; a[i] = { ...a[i], [k]: v }; u("tabs", a);
  };
  const remTab = (i) => {
    const a = tabs.filter((_, idx) => idx !== i);
    u("tabs", a);
    setActiveTabIdx(Math.max(0, activeTabIdx - 1));
  };

  // Items within a tab
  const addItem = (tabIdx) => {
    const a = [...tabs];
    a[tabIdx] = {
      ...a[tabIdx],
      items: [...(a[tabIdx].items || []), { heading: "", image: "", paragraphs: [], isActive: true, order: (a[tabIdx].items || []).length }],
    };
    u("tabs", a);
  };
  const updItem = (tabIdx, itemIdx, k, v) => {
    const a = [...tabs];
    const items = [...(a[tabIdx].items || [])];
    items[itemIdx] = { ...items[itemIdx], [k]: v };
    a[tabIdx] = { ...a[tabIdx], items };
    u("tabs", a);
  };
  const remItem = (tabIdx, itemIdx) => {
    const a = [...tabs];
    a[tabIdx] = { ...a[tabIdx], items: a[tabIdx].items.filter((_, idx) => idx !== itemIdx) };
    u("tabs", a);
  };
  const movItem = (tabIdx, itemIdx, d) => {
    const a = [...tabs];
    const items = [...(a[tabIdx].items || [])];
    const j = itemIdx + d;
    if (j < 0 || j >= items.length) return;
    [items[itemIdx], items[j]] = [items[j], items[itemIdx]];
    a[tabIdx] = { ...a[tabIdx], items: items.map((it, idx) => ({ ...it, order: idx })) };
    u("tabs", a);
  };
  // Paragraphs within item
  const updItemParas = (tabIdx, itemIdx, val) => {
    updItem(tabIdx, itemIdx, "paragraphs", val.split("\n").filter((l) => l.trim()));
  };

  const currentTab = tabs[activeTabIdx];

  return (
    <div>
      {/* Intro block */}
      <div className="ab-section-block">
        <p className="ab-block-title"><i className="bi bi-text-paragraph" /> Section Intro</p>
        <div className="ab-grid-2">
          <Field label="Intro Heading">
            <Input value={data?.intro?.heading || ""} onChange={(e) => uIntro("heading", e.target.value)} placeholder="Our Core Beliefs" />
          </Field>
          <Field label="Highlight Text" hint="Colored/bold part of heading">
            <Input value={data?.intro?.highlightText || ""} onChange={(e) => uIntro("highlightText", e.target.value)} placeholder="Beliefs" />
          </Field>
        </div>
        <Field label="Intro Description">
          <Textarea value={data?.intro?.description || ""} onChange={(e) => uIntro("description", e.target.value)} rows={2} />
        </Field>
        <ImageUpload label="Intro Section Image" value={data?.intro?.image} onChange={(v) => uIntro("image", v)} hint="Large image shown beside intro text" />
      </div>

      {/* Tab management */}
      <div className="ab-section-block">
        <p className="ab-block-title"><i className="bi bi-tabs" /> Mission / Vision Tabs ({tabs.length})</p>
        <p className="ab-hint" style={{ marginBottom: 14 }}>Each tab = one section (Mission, Vision, About). Add items inside each tab.</p>

        {/* Tab selector */}
        <div className="ab-mv-tabs">
          {tabs.map((tab, i) => {
            const tabMeta = TAB_TYPES.find((t) => t.value === tab.type);
            return (
              <button
                key={i}
                className={`ab-mv-tab ${activeTabIdx === i ? "active" : ""}`}
                style={activeTabIdx === i && tabMeta ? { borderColor: tabMeta.color, color: tabMeta.color } : {}}
                onClick={() => setActiveTabIdx(i)}
              >
                {tabMeta && <i className={tabMeta.icon} />}
                {tab.type ? tab.type.charAt(0).toUpperCase() + tab.type.slice(1) : `Tab ${i + 1}`}
                <span className="ab-mv-tab-count">{(tab.items || []).length}</span>
                <span className="ab-mv-tab-del" onClick={(e) => { e.stopPropagation(); remTab(i); }}>
                  <i className="bi bi-x" />
                </span>
              </button>
            );
          })}
          <button className="ab-mv-add-tab" onClick={addTab}>
            <i className="bi bi-plus" /> Add Tab
          </button>
        </div>

        {/* Current tab editor */}
        {currentTab ? (
          <div className="ab-mv-tab-content">
            {/* Tab type selector */}
            <Field label="Tab Type">
              <div className="ab-tab-type-btns">
                {TAB_TYPES.map((t) => (
                  <button
                    key={t.value}
                    className={`ab-tab-type-btn ${currentTab.type === t.value ? "active" : ""}`}
                    style={currentTab.type === t.value ? { background: `${t.color}18`, borderColor: t.color, color: t.color } : {}}
                    onClick={() => updTab(activeTabIdx, "type", t.value)}
                  >
                    <i className={t.icon} /> {t.label}
                  </button>
                ))}
              </div>
            </Field>

            {/* Items inside tab */}
            <div style={{ marginTop: 16 }}>
              <div className="ab-para-header">
                <label className="ab-label">Items inside this tab ({(currentTab.items || []).length})</label>
                <button className="ab-add-inline-btn" onClick={() => addItem(activeTabIdx)}>
                  <i className="bi bi-plus-circle" /> Add Item
                </button>
              </div>

              {(currentTab.items || []).map((item, itemIdx) => (
                <SortableItem
                  key={itemIdx} index={itemIdx}
                  title={item.heading || `Item ${itemIdx + 1}`}
                  onMoveUp={() => movItem(activeTabIdx, itemIdx, -1)}
                  onMoveDown={() => movItem(activeTabIdx, itemIdx, 1)}
                  onDelete={() => remItem(activeTabIdx, itemIdx)}
                  defaultOpen={itemIdx === 0}
                >
                  <Field label="Heading">
                    <Input value={item.heading} onChange={(e) => updItem(activeTabIdx, itemIdx, "heading", e.target.value)} placeholder="e.g. Our Mission Statement" />
                  </Field>
                  <Field label="Paragraphs (one per line)" hint="Each line becomes a separate paragraph on the page.">
                    <Textarea
                      value={(item.paragraphs || []).join("\n")}
                      onChange={(e) => updItemParas(activeTabIdx, itemIdx, e.target.value)}
                      rows={4}
                      placeholder={"First paragraph...\nSecond paragraph..."}
                    />
                  </Field>
                  <ImageUpload label="Item Image" value={item.image}
                    onChange={(v) => updItem(activeTabIdx, itemIdx, "image", v)}
                    hint="Image shown beside this item's text" />
                  <Toggle label="Active"
                    checked={item.isActive !== false}
                    onChange={(e) => updItem(activeTabIdx, itemIdx, "isActive", e.target.checked)} />
                </SortableItem>
              ))}

              {(currentTab.items || []).length === 0 && (
                <div className="ab-empty-state">No items in this tab yet. Click &#34;Add Item&#34; above.</div>
              )}
            </div>
          </div>
        ) : (
          <div className="ab-empty-state" style={{ marginTop: 16 }}>
            No tabs yet. Click &ldquo;+ Add Tab&ldquo; to create Mission, Vision, or About tabs.
          </div>
        )}
      </div>
    </div>
  );
};

// 5. TIMELINE
const TimelineEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const timelines = data?.timelines || [];

  const add = () => u("timelines", [...timelines, { year: "", title: "", description: "", isActive: true, order: timelines.length }]);
  const upd = (i, k, v) => { const a = [...timelines]; a[i] = { ...a[i], [k]: v }; u("timelines", a); };
  const rem = (i) => u("timelines", timelines.filter((_, idx) => idx !== i).map((t, idx) => ({ ...t, order: idx })));
  const mov = (i, d) => {
    const a = [...timelines]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("timelines", a.map((t, idx) => ({ ...t, order: idx })));
  };

  return (
    <div>
      <div className="ab-section-block">
        <p className="ab-block-title"><i className="bi bi-flag" /> Section Header</p>
        <div className="ab-grid-2">
          <Field label="Badge Text" hint='e.g. "Our Journey"'>
            <Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} placeholder="Our Journey" />
          </Field>
          <Field label="Section Heading">
            <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Journey So Far" />
          </Field>
        </div>
      </div>

      <div className="ab-section-block">
        <p className="ab-block-title"><i className="bi bi-clock-history" /> Timeline Items ({timelines.length})</p>

        {/* Visual timeline strip */}
        {timelines.filter((t) => t.isActive !== false).length > 0 && (
          <div className="ab-timeline-strip">
            {timelines.filter((t) => t.isActive !== false).map((t, i) => (
              <div key={i} className="ab-timeline-strip-item">
                <div className="ab-timeline-strip-dot" />
                <div className="ab-timeline-strip-year">{t.year || "Year"}</div>
                <div className="ab-timeline-strip-title">{t.title || "Event"}</div>
              </div>
            ))}
            <div className="ab-timeline-strip-line" />
          </div>
        )}

        {timelines.map((t, i) => (
          <SortableItem key={i} index={i}
            title={<span><span className="ab-year-badge">{t.year || "?"}</span> {t.title || `Event ${i + 1}`}</span>}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}
            defaultOpen={i === 0}>
            <div className="ab-grid-2">
              <Field label="Year" hint='e.g. "2018" or "2018-2020"'>
                <Input value={t.year} onChange={(e) => upd(i, "year", e.target.value)} placeholder="2024" />
              </Field>
              <Field label="Event Title">
                <Input value={t.title} onChange={(e) => upd(i, "title", e.target.value)} placeholder="Company Founded" />
              </Field>
            </div>
            <Field label="Description">
              <Textarea value={t.description} onChange={(e) => upd(i, "description", e.target.value)} rows={2} placeholder="Brief description of this milestone..." />
            </Field>
            <Toggle label="Active" checked={t.isActive !== false} onChange={(e) => upd(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}

        {timelines.length === 0 && (
          <div className="ab-empty-state">No timeline events yet. Add your first milestone below.</div>
        )}
        <button className="ab-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Timeline Event</button>
      </div>
    </div>
  );
};

// 6. SEO
const SeoEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const descLen = (data?.description || "").length;
  return (
    <div className="ab-section-block">
      <p className="ab-block-title"><i className="bi bi-search" /> SEO Meta Tags</p>
      <Field label="Meta Title" hint="Recommended: 50–60 characters">
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} maxLength={70} />
        <p className={`ab-char-count ${(data?.title || "").length > 60 ? "over" : ""}`}>{(data?.title || "").length}/70</p>
      </Field>
      <Field label="Meta Description" hint="Recommended: 150–160 characters">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} maxLength={170} />
        <p className={`ab-char-count ${descLen > 160 ? "over" : ""}`}>{descLen}/170</p>
      </Field>
      <Field label="Keywords (comma separated)">
        <Textarea value={(data?.keywords || []).join(", ")} rows={2} placeholder="about us, software company, ..."
          onChange={(e) => u("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
      </Field>
      {/* SERP Preview */}
      <div className="ab-serp-wrap">
        <p className="ab-serp-label"><i className="bi bi-google" /> Google SERP Preview</p>
        <div className="ab-serp-box">
          <p className="ab-serp-url">https://yourdomain.com/about</p>
          <p className="ab-serp-title">{data?.title || <span style={{ color: "#9ca3af" }}>Meta title not set...</span>}</p>
          <p className="ab-serp-desc">{data?.description || <span style={{ color: "#9ca3af" }}>Meta description will appear here...</span>}</p>
        </div>
        {(data?.keywords || []).length > 0 && (
          <div className="ab-kw-chips">
            {data.keywords.map((kw, i) => <span key={i} className="ab-kw-chip">{kw}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Full-page Preview ────────────────────────────────────────────────────────
const AboutPreview = ({ formData }) => {
  const {
    hero = {},
    whoWeAre = {},
    stats = [],
    missionVisionSection = {},
    timelineSection = {},
    seo = {},
  } = formData;

  const activeTabs = (missionVisionSection.tabs || []);
  const [previewTabIdx, setPreviewTabIdx] = useState(0);
  const activeFeatures = (whoWeAre.features || []).filter((f) => f.isActive !== false);
  const activeTimelines = (timelineSection.timelines || []).filter((t) => t.isActive !== false);
  const currentPreviewTab = activeTabs[previewTabIdx];

  return (
    <div className="abpv-wrap">
      {/* Browser chrome */}
      <div className="abpv-chrome">
        <div className="abpv-chrome-left">
          <div className="abpv-dots">
            <span className="abpv-dot r" /><span className="abpv-dot y" /><span className="abpv-dot g" />
          </div>
          <div className="abpv-url">yourdomain.com/about</div>
        </div>
        <span className="abpv-chrome-label"><i className="bi bi-eye" /> Full Page Preview</span>
      </div>

      {/* ── HERO ── */}
      <div className="abpv-hero">
        
        <h1 className="abpv-hero-title">{hero.title || <span className="abpv-empty">Page title not set</span>}</h1>
        {hero.description && <p className="abpv-hero-desc">{hero.description}</p>}
        <div className="abpv-hero-bread">{hero.breadcrumb || "Home / About"}</div>
      </div>

      {/* ── WHO WE ARE ── */}
      <div className="abpv-section">
        <div className="abpv-sec-label"><i className="bi bi-people" /> Who We Are</div>
        <div className="abpv-two-col">
          <div>
            {whoWeAre.badge && <span className="abpv-badge">{whoWeAre.badge}</span>}
            <h2 className="abpv-h2">{whoWeAre.heading || <span className="abpv-empty">No heading</span>}</h2>
            {(whoWeAre.description || []).slice(0, 2).map((p, i) => (
              <p key={i} className="abpv-p">{p}</p>
            ))}
            {(whoWeAre.description || []).length > 2 && (
              <p className="abpv-more">+{whoWeAre.description.length - 2} more paragraphs</p>
            )}
            {activeFeatures.length > 0 && (
              <div className="abpv-features">
                {activeFeatures.slice(0, 6).map((f, i) => (
                  <div key={i} className="abpv-feature-chip">
                    <i className={f.icon || "bi bi-check-circle"} />
                    <span>{f.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="abpv-img-col">
            {whoWeAre.image ? (
              <img src={whoWeAre.image} className="abpv-section-img" alt=""
                onError={(e) => (e.target.style.display = "none")} />
            ) : (
              <div className="abpv-img-placeholder"><i className="bi bi-image" /><span>No image</span></div>
            )}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      {stats.length > 0 && (
        <div className="abpv-section abpv-stats-section">
          <div className="abpv-sec-label" style={{ color: "#4ade80" }}><i className="bi bi-bar-chart" /> Stats</div>
          <div className="abpv-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="abpv-stat">
                <div className="abpv-stat-num">{s.value}{s.suffix}</div>
                <div className="abpv-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MISSION / VISION ── */}
      {activeTabs.length > 0 && (
        <div className="abpv-section">
          <div className="abpv-sec-label"><i className="bi bi-bullseye" /> Mission & Vision</div>

          {/* Intro */}
          {missionVisionSection.intro?.heading && (
            <div className="abpv-mv-intro abpv-two-col ">
              <div>
                <h2 className="abpv-h2">
                {missionVisionSection.intro.heading}
                {missionVisionSection.intro.highlightText && (
                  <span className="abpv-highlight"> {missionVisionSection.intro.highlightText}</span>
                )}
              </h2>
              {missionVisionSection.intro.description && (
                <p className="abpv-p">{missionVisionSection.intro.description}</p>
              )}
              </div>
              <div className="abpv-img-col">
            {missionVisionSection.intro.image ? (
              <img src={missionVisionSection.intro.image} className="abpv-section-img" alt=""
                onError={(e) => (e.target.style.display = "none")} />
            ) : (
              <div className="abpv-img-placeholder"><i className="bi bi-image" /><span>No image</span></div>
            )}
          </div>
            </div>
          )}

          {/* Tabs */}
          <div className="abpv-mv-tabs">
            {activeTabs.map((tab, i) => {
              const meta = TAB_TYPES.find((t) => t.value === tab.type);
              return (
                <button key={i}
                  className={`abpv-mv-tab ${previewTabIdx === i ? "active" : ""}`}
                  style={previewTabIdx === i && meta ? { borderColor: meta.color, color: meta.color, background: `${meta.color}12` } : {}}
                  onClick={() => setPreviewTabIdx(i)}>
                  {meta && <i className={meta.icon} />}
                  {tab.type ? tab.type.charAt(0).toUpperCase() + tab.type.slice(1) : `Tab ${i + 1}`}
                </button>
              );
            })}
          </div>

          {/* Tab content preview */}
          {currentPreviewTab && (currentPreviewTab.items || []).filter((it) => it.isActive !== false).map((item, i) => (
            <div key={i} className="abpv-mv-item">
              <div className="abpv-two-col">
                <div>
                  {item.heading && <h3 className="abpv-h3">{item.heading}</h3>}
                  {(item.paragraphs || []).slice(0, 2).map((p, j) => (
                    <p key={j} className="abpv-p" style={{ fontSize: 13 }}>{p}</p>
                  ))}
                  {(item.paragraphs || []).length > 2 && (
                    <p className="abpv-more">+{item.paragraphs.length - 2} more paragraphs</p>
                  )}
                </div>
                <div className="abpv-img-col">
                  {item.image ? (
                    <img src={item.image} className="abpv-section-img" alt=""
                      onError={(e) => (e.target.style.display = "none")} />
                  ) : (
                    <div className="abpv-img-placeholder"><i className="bi bi-image" /><span>No image</span></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TIMELINE ── */}
      {activeTimelines.length > 0 && (
        <div className="abpv-section">
          <div className="abpv-sec-label"><i className="bi bi-clock-history" /> Timeline</div>
          {timelineSection.badge && <span className="abpv-badge">{timelineSection.badge}</span>}
          {timelineSection.heading && <h2 className="abpv-h2">{timelineSection.heading}</h2>}
          <div className="abpv-timeline">
            {activeTimelines.map((t, i) => (
              <div key={i} className={`abpv-tl-item ${i % 2 === 0 ? "left" : "right"}`}>
                <div className="abpv-tl-year">{t.year}</div>
                <div className="abpv-tl-dot" />
                <div className="abpv-tl-card">
                  <p className="abpv-tl-title">{t.title}</p>
                  <p className="abpv-tl-desc">{t.description}</p>
                </div>
              </div>
            ))}
            <div className="abpv-tl-line" />
          </div>
        </div>
      )}

      {/* ── SEO ── */}
      <div className="abpv-section">
        <div className="abpv-sec-label"><i className="bi bi-search" /> SEO</div>
        <div className="ab-serp-box" style={{ maxWidth: 560 }}>
          <p className="ab-serp-url">yourdomain.com/about</p>
          <p className="ab-serp-title">{seo.title || <span style={{ color: "#9ca3af" }}>Meta title not set</span>}</p>
          <p className="ab-serp-desc">{seo.description || <span style={{ color: "#9ca3af" }}>Meta description not set</span>}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AboutAdminPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [unsaved, setUnsaved] = useState(false);
  const toastRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/cms/about");
        if (res.ok) {
          const json = await res.json();
          if (json.data) { setFormData(json.data); setIsPublished(json.data.isPublished !== false); }
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
      const res = await fetch("/api/cms/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isPublished }),
      });
      if (res.ok) { showToast("About page saved successfully!", "success"); setUnsaved(false); }
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
      case "hero":                 return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
      case "whoWeAre":             return <WhoWeAreEditor data={formData.whoWeAre} onChange={(v) => update("whoWeAre", v)} />;
      case "stats":                return <StatsEditor data={formData.stats} onChange={(v) => update("stats", v)} />;
      case "missionVisionSection": return <MissionVisionEditor data={formData.missionVisionSection} onChange={(v) => update("missionVisionSection", v)} />;
      case "timelineSection":      return <TimelineEditor data={formData.timelineSection} onChange={(v) => update("timelineSection", v)} />;
      case "seo":                  return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
      default: return null;
    }
  };

  if (loading) return (
    <div className="ab-loading"><div className="ab-spinner" /><p>Loading About Page...</p></div>
  );

  return (
    <>
      <style>{`
        /* ── Layout ── */
        .ab-content     { padding: 24px; background: #f9fafb; min-height: 60vh; }
        .ab-grid-2      { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ab-grid-3      { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

        /* ── Blocks ── */
        .ab-section-block { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; margin-bottom: 18px; }
        .ab-block-title   { font-size: 13px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 6px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 7px; }
        .ab-block-title i { color: #16a34a; }
        .ab-section-hint  { font-size: 13px; color: #9ca3af; margin: 0 0 16px; }

        /* ── Fields ── */
        .ab-field     { margin-bottom: 16px; }
        .ab-field:last-child { margin-bottom: 0; }
        .ab-label     { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .ab-hint      { font-size: 12px; color: #9ca3af; margin-top: 4px; }
        .ab-input     { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; transition: border .15s; box-sizing: border-box; }
        .ab-input:focus   { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .ab-textarea  { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; resize: vertical; font-family: inherit; transition: border .15s; box-sizing: border-box; line-height: 1.6; }
        .ab-textarea:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .ab-char-count    { font-size: 12px; color: #9ca3af; text-align: right; margin-top: 3px; }
        .ab-char-count.over { color: #ef4444; }

        /* ── Image upload ── */
        .ab-img-upload { display: flex; flex-direction: column; gap: 8px; }
        .ab-img-preview { position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .ab-img-preview img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .ab-img-remove  { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.6); color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; }
        .ab-img-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 28px; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer; color: #9ca3af; font-size: 13px; text-align: center; transition: border .15s; }
        .ab-img-placeholder:hover { border-color: #16a34a; color: #16a34a; }
        .ab-img-placeholder i { font-size: 26px; }

        /* ── Toggle ── */
        .ab-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
        .ab-switch     { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
        .ab-switch input { opacity: 0; width: 0; height: 0; }
        .ab-slider     { position: absolute; inset: 0; background: #d1d5db; border-radius: 24px; cursor: pointer; transition: .2s; }
        .ab-slider:before { content: ""; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
        .ab-switch input:checked + .ab-slider { background: #16a34a; }
        .ab-switch input:checked + .ab-slider:before { transform: translateX(18px); }

        /* ── Sortable items ── */
        .ab-list-item     { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
        .ab-list-header   { display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; cursor: pointer; user-select: none; }
        .ab-list-header:hover { background: #eef0f2; }
        .ab-list-header-left { display: flex; align-items: center; gap: 8px; }
        .ab-chevron       { font-size: 11px; color: #6b7280; }
        .ab-list-title    { font-size: 13px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 8px; }
        .ab-list-actions  { display: flex; gap: 5px; }
        .ab-list-actions button { padding: 5px 9px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; color: #6b7280; transition: all .15s; }
        .ab-list-actions button:hover { background: #f3f4f6; }
        .ab-list-actions button.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .ab-list-body     { padding: 16px; }

        /* ── Paragraphs editor ── */
        .ab-para-section  { margin-bottom: 16px; }
        .ab-para-header   { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .ab-para-row      { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
        .ab-para-num      { width: 24px; height: 24px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #6b7280; flex-shrink: 0; margin-top: 10px; }
        .ab-add-inline-btn { display: flex; align-items: center; gap: 5px; padding: 5px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #16a34a; font-size: 12px; font-weight: 600; cursor: pointer; }
        .ab-add-inline-btn:hover { background: #dcfce7; }

        /* ── Add / icon buttons ── */
        .ab-add-btn  { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1.5px dashed #d1d5db; background: transparent; border-radius: 8px; cursor: pointer; font-size: 13px; color: #6b7280; width: 100%; justify-content: center; transition: all .15s; margin-top: 4px; }
        .ab-add-btn:hover  { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .ab-icon-btn { padding: 9px 11px; border: 1px solid #d1d5db; background: #fff; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; flex-shrink: 0; }
        .ab-icon-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }

        /* ── Icon preview row ── */
        .ab-icon-preview-row { display: flex; align-items: center; gap: 8px; }

        /* ── Year badge ── */
        .ab-year-badge { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; background: #dcfce7; color: #15803d; border-radius: 4px; }

        /* ── Empty state ── */
        .ab-empty-state { font-size: 13px; color: #9ca3af; font-style: italic; padding: 14px; background: #f9fafb; border-radius: 8px; border: 1px dashed #e5e7eb; text-align: center; }

        /* ── Stats inline preview ── */
        .ab-stats-preview { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid #f3f4f6; }
        .ab-stat-chip { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px 18px; text-align: center; min-width: 100px; }
        .ab-stat-num  { display: block; font-size: 22px; font-weight: 700; color: #16a34a; }
        .ab-stat-lbl  { display: block; font-size: 12px; color: #6b7280; margin-top: 3px; }

        /* ── Mission/Vision tabs in editor ── */
        .ab-mv-tabs       { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
        .ab-mv-tab        { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; background: #f9fafb; color: #6b7280; font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s; }
        .ab-mv-tab.active { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .ab-mv-tab-count  { font-size: 10px; background: #e5e7eb; color: #6b7280; padding: 1px 6px; border-radius: 10px; }
        .ab-mv-tab-del    { font-size: 13px; color: #9ca3af; margin-left: 2px; }
        .ab-mv-tab-del:hover { color: #ef4444; }
        .ab-mv-add-tab    { display: flex; align-items: center; gap: 5px; padding: 8px 14px; border: 1.5px dashed #d1d5db; border-radius: 8px; background: transparent; color: #6b7280; font-size: 13px; cursor: pointer; }
        .ab-mv-add-tab:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .ab-mv-tab-content { border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px; background: #fdfdfd; }
        .ab-tab-type-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .ab-tab-type-btn  { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1.5px solid #e5e7eb; border-radius: 8px; background: #f9fafb; color: #6b7280; font-size: 13px; cursor: pointer; transition: all .15s; }
        .ab-tab-type-btn:hover { background: #f3f4f6; }
        .ab-tab-type-btn.active { font-weight: 600; }

        /* ── Timeline strip ── */
        .ab-timeline-strip { display: flex; align-items: flex-start; gap: 0; overflow-x: auto; padding: 16px 0 24px; margin-bottom: 16px; position: relative; }
        .ab-timeline-strip-line { position: absolute; top: 28px; left: 0; right: 0; height: 2px; background: #e5e7eb; z-index: 0; }
        .ab-timeline-strip-item { display: flex; flex-direction: column; align-items: center; min-width: 100px; flex: 1; position: relative; z-index: 1; }
        .ab-timeline-strip-dot  { width: 14px; height: 14px; background: #16a34a; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 2px #16a34a; margin-bottom: 8px; }
        .ab-timeline-strip-year { font-size: 11px; font-weight: 700; color: #16a34a; }
        .ab-timeline-strip-title { font-size: 10px; color: #6b7280; text-align: center; margin-top: 2px; }

        /* ── SEO ── */
        .ab-serp-wrap  { margin-top: 20px; }
        .ab-serp-label { font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .ab-serp-box   { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; }
        .ab-serp-url   { font-size: 13px; color: #16a34a; margin: 0 0 4px; }
        .ab-serp-title { font-size: 18px; color: #1a0dab; font-weight: 500; margin: 0 0 4px; }
        .ab-serp-desc  { font-size: 13px; color: #4d5156; margin: 0; line-height: 1.5; }
        .ab-kw-chips   { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .ab-kw-chip    { font-size: 11px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 3px 10px; border-radius: 20px; }

        /* ── Preview divider ── */
        .ab-preview-divider { display: flex; align-items: center; gap: 12px; margin: 32px 0 0; padding-top: 8px; }
        .ab-preview-divider span { font-size: 13px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
        .ab-preview-divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .ab-preview-note { font-size: 12px; color: #9ca3af; text-transform: none; letter-spacing: 0; font-weight: 400 !important; }

        /* ── Toast ── */
        .ab-toast { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: abSlide .2s ease; }
        .ab-toast.success { background: #16a34a; color: #fff; }
        .ab-toast.error   { background: #ef4444; color: #fff; }
        @keyframes abSlide { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* ── Loading ── */
        .ab-loading  { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #6b7280; font-size: 15px; }
        .ab-spinner  { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: abSpin .8s linear infinite; }
        @keyframes abSpin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .ab-grid-2, .ab-grid-3 { grid-template-columns: 1fr; }
        }

        /* ══════════════════════════════════════
           PREVIEW STYLES
        ══════════════════════════════════════ */
        .abpv-wrap { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; margin-top: 32px; }

        /* Chrome bar */
        .abpv-chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .abpv-chrome-left { display: flex; align-items: center; gap: 10px; }
        .abpv-dots   { display: flex; gap: 5px; }
        .abpv-dot    { width: 10px; height: 10px; border-radius: 50%; }
        .abpv-dot.r  { background: #f87171; }
        .abpv-dot.y  { background: #fbbf24; }
        .abpv-dot.g  { background: #4ade80; }
        .abpv-url    { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 14px; font-size: 12px; color: #6b7280; min-width: 220px; text-align: center; }
        .abpv-chrome-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; display: flex; align-items: center; gap: 5px; }

        /* Hero */
        .abpv-hero { background: linear-gradient(135deg,#0f2618,#1e3d28); padding: 32px; text-align: center; }
        .abpv-hero-bread { font-size: 12px; color: rgba(255,255,255,.45); margin-bottom: 10px; }
        .abpv-hero-title { font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .abpv-hero-desc  { font-size: 14px; color: #d1fae5; margin: 0; max-width: 500px; margin: 0 auto; }

        /* Generic section */
        .abpv-section { padding: 28px 32px; border-top: 1px solid #f3f4f6; }
        .abpv-sec-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 14px; display: flex; align-items: center; gap: 5px; }
        .abpv-badge  { display: inline-block; font-size: 11px; font-weight: 600; padding: 3px 12px; border-radius: 20px; background: #dcfce7; color: #15803d; margin-bottom: 8px; }
        .abpv-h2     { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px; }
        .abpv-h3     { font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 6px; }
        .abpv-p      { font-size: 13px; color: #6b7280; margin: 0 0 8px; line-height: 1.6; }
        .abpv-highlight { color: #16a34a; }
        .abpv-more   { font-size: 11px; color: #9ca3af; font-style: italic; }
        .abpv-empty  { color: #d1d5db; font-style: italic; }

        /* Two col */
        .abpv-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .abpv-img-col { display: flex; align-items: flex-start; }
        .abpv-section-img { width: 100%; border-radius: 10px; object-fit: cover; max-height: 200px; }
        .abpv-img-placeholder { width: 100%; min-height: 140px; background: #f3f4f6; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #d1d5db; font-size: 12px; }
        .abpv-img-placeholder i { font-size: 28px; }

        /* Features chips */
        .abpv-features { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .abpv-feature-chip { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #374151; padding: 6px 12px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; }
        .abpv-feature-chip i { color: #16a34a; font-size: 13px; }

        /* Stats */
        .abpv-stats-section { background: #0f2618; border-top: none; }
        .abpv-stats-row  { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .abpv-stat       { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 16px; text-align: center; }
        .abpv-stat-num   { font-size: 26px; font-weight: 700; color: #4ade80; }
        .abpv-stat-lbl   { font-size: 12px; color: #d1fae5; margin-top: 4px; }

        /* Mission/Vision preview */
        .abpv-mv-intro { margin-bottom: 16px; }
        .abpv-mv-tabs  { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
        .abpv-mv-tab   { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1.5px solid #e5e7eb; border-radius: 8px; background: #f9fafb; color: #6b7280; font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s; }
        .abpv-mv-item  { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 10px; padding: 16px; margin-bottom: 10px; }

        /* Timeline */
        .abpv-timeline { position: relative; padding: 16px 0; }
        .abpv-tl-line  { position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; background: #e5e7eb; transform: translateX(-50%); }
        .abpv-tl-item  { display: flex; gap: 16px; margin-bottom: 20px; position: relative; align-items: flex-start; }
        .abpv-tl-item.left  { flex-direction: row; padding-right: calc(50% + 20px); }
        .abpv-tl-item.right { flex-direction: row-reverse; padding-left: calc(50% + 20px); }
        .abpv-tl-dot   { width: 14px; height: 14px; background: #16a34a; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 2px #16a34a; flex-shrink: 0; position: absolute; left: calc(50% - 7px); top: 4px; }
        .abpv-tl-year  { font-size: 13px; font-weight: 700; color: #16a34a; white-space: nowrap; padding-top: 2px; }
        .abpv-tl-card  { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 14px; flex: 1; }
        .abpv-tl-title { font-size: 13px; font-weight: 600; color: #111827; margin: 0 0 4px; }
        .abpv-tl-desc  { font-size: 12px; color: #6b7280; margin: 0; }

        @media (max-width: 640px) {
          .abpv-two-col { grid-template-columns: 1fr; }
          .abpv-stats-row { grid-template-columns: repeat(2,1fr); }
          .abpv-tl-item.left, .abpv-tl-item.right { padding: 0; flex-direction: column; }
          .abpv-tl-dot { display: none; }
        }
      `}</style>

      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle="About Page"
        pageSubtitle="Manage all sections of your About page"
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl="/about"
      >
        <div className="ab-content">
          {renderEditor()}

          {/* ── Full page preview (common, always at bottom) ── */}
          <div className="ab-preview-divider">
            <span><i className="bi bi-eye" /> Page Preview</span>
            <div className="ab-preview-divider-line" />
            <span className="ab-preview-note">Updates as you edit any section above</span>
          </div>

          <AboutPreview formData={formData} />
        </div>
      </CmsTabs>

      {toast && (
        <div className={`ab-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"} />
          {toast.msg}
        </div>
      )}
    </>
  );
}