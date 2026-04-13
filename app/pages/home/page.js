"use client";
import React, { useState, useEffect, useRef } from "react";
import CmsTabs from "../../Components/CmsTabs";      
import HomePreview from "./HomePreview"; // adjust path
import { createHomePageServ, getHomePageServ } from "@/app/services/homepage.service";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: "hero",            label: "Hero",          icon: "bi bi-house-door" },
  { key: "marquee",         label: "Marquee",       icon: "bi bi-collection-play" },
  { key: "whoWeAre",        label: "Who We Are",    icon: "bi bi-people" },
  { key: "whyChooseUs",     label: "Why Choose Us", icon: "bi bi-patch-check" },
  { key: "futureSection",   label: "Services",      icon: "bi bi-gear" },
  { key: "stats",           label: "Stats",         icon: "bi bi-bar-chart" },
  { key: "industrySection", label: "Industries",    icon: "bi bi-building" },
  { key: "techSection",     label: "Technologies",  icon: "bi bi-cpu" },
  { key: "agileSection",    label: "Agile Process", icon: "bi bi-arrow-repeat" },
  { key: "testimonials",    label: "Testimonials",  icon: "bi bi-chat-quote" },
  { key: "faqSection",      label: "FAQ",           icon: "bi bi-question-circle" },
  { key: "cta",             label: "CTA",           icon: "bi bi-rocket" },
  { key: "seo",             label: "SEO",           icon: "bi bi-search" },
];

// ─── Reusable primitives ──────────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="cms-field">
    <label className="cms-label">{label}</label>
    {children}
    {hint && <p className="cms-hint">{hint}</p>}
  </div>
);

const Input = (props) => <input className="cms-input" {...props} />;
const Textarea = (props) => <textarea className="cms-textarea" rows={3} {...props} />;

const Toggle = ({ label, checked, onChange }) => (
  <div className="cms-toggle-row">
    <span className="cms-label">{label}</span>
    <label className="cms-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="cms-slider" />
    </label>
  </div>
);

const ImageUpload = ({ label, value, onChange, hint }) => (
  <Field label={label} hint={hint}>
    <div className="cms-img-upload">
      {value ? (
        <div className="cms-img-preview">
          <img src={value} alt="preview" onError={(e) => (e.target.style.display = "none")} />
          <button className="cms-img-remove" onClick={() => onChange("")}>
            <i className="bi bi-x" />
          </button>
        </div>
      ) : (
        <label className="cms-img-placeholder">
          <i className="bi bi-cloud-upload" />
          <span>Click to upload or paste URL below</span>
          <input type="file" style={{ display: "none" }} accept="image/*"
            onChange={(e) => { const f = e.target.files[0]; if (f) onChange(URL.createObjectURL(f)); }} />
        </label>
      )}
      <input className="cms-input" style={{ marginTop: 8 }} placeholder="Or paste image URL..."
        value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  </Field>
);

const SortableItem = ({ index, onMoveUp, onMoveDown, onDelete, children, title }) => (
  <div className="cms-list-item">
    <div className="cms-list-item-header">
      <span className="cms-list-item-title">{title || `Item ${index + 1}`}</span>
      <div className="cms-list-item-actions">
        <button onClick={onMoveUp}><i className="bi bi-arrow-up" /></button>
        <button onClick={onMoveDown}><i className="bi bi-arrow-down" /></button>
        <button onClick={onDelete} className="danger"><i className="bi bi-trash" /></button>
      </div>
    </div>
    <div className="cms-list-item-body">{children}</div>
  </div>
);

const CAT_COLORS = [
  { bg: "#dbeafe", text: "#1e40af" }, // blue
  { bg: "#dcfce7", text: "#15803d" }, // green
  { bg: "#fef3c7", text: "#92400e" }, // amber
  { bg: "#fce7f3", text: "#9d174d" }, // pink
  { bg: "#ede9fe", text: "#5b21b6" }, // purple
  { bg: "#ffedd5", text: "#9a3412" }, // orange
  { bg: "#ccfbf1", text: "#115e59" }, // teal
];


// ─── Section Editors ──────────────────────────────────────────────────────────

const HeroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="cms-section-block">
      <p className="cms-block-title">Hero Content</p>
      <div className="cms-grid-2-inner">
        <Field label="Main Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="We Build Digital Products" /></Field>
        
      </div>
      <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} /></Field>
      <Field label="Trust Text" hint='e.g. "500+ companies trust us"'><Input value={data?.trustText || ""} onChange={(e) => u("trustText", e.target.value)} /></Field>
      <div className="cms-grid-2-inner">
        <Field label="Primary Button Text"><Input value={data?.primaryBtnText || ""} onChange={(e) => u("primaryBtnText", e.target.value)} /></Field>
        <Field label="Primary Button Link"><Input value={data?.primaryBtnLink || ""} onChange={(e) => u("primaryBtnLink", e.target.value)} /></Field>
        <Field label="Secondary Button Text"><Input value={data?.secondaryBtnText || ""} onChange={(e) => u("secondaryBtnText", e.target.value)} /></Field>
        <Field label="Secondary Button Link"><Input value={data?.secondaryBtnLink || ""} onChange={(e) => u("secondaryBtnLink", e.target.value)} /></Field>
      </div>
      <ImageUpload label="Hero Image" value={data?.image} onChange={(v) => u("image", v)} hint="Recommended: 1440×800px, WebP/PNG" />
    </div>
  );
};

const MarqueeEditor = ({ data, onChange }) => {
  const add = () => onChange([...(data || []), ""]);
  const upd = (i, v) => { const a = [...(data || [])]; a[i] = v; onChange(a); };
  const rem = (i) => onChange((data || []).filter((_, idx) => idx !== i));
  return (
    <div className="cms-section-block">
      <p className="cms-block-title">Marquee Services</p>
      <p className="cms-hint" style={{ marginBottom: 14 }}>These scroll across the banner strip below the hero section.</p>
      {(data || []).map((s, i) => (
        <div key={i} className="cms-tag-row">
          <Input value={s} onChange={(e) => upd(i, e.target.value)} placeholder={`Service ${i + 1}`} />
          <button className="cms-icon-btn danger" onClick={() => rem(i)}><i className="bi bi-trash" /></button>
        </div>
      ))}
      <button className="cms-add-btn" onClick={add}><i className="bi bi-plus" /> Add Service</button>
    </div>
  );
};

const WhoWeAreEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const features = data?.features || [];
  const addF = () => u("features", [...features, { title: "", description: "", icon: "", isActive: true, order: features.length }]);
  const updF = (i, k, v) => { const a = [...features]; a[i] = { ...a[i], [k]: v }; u("features", a); };
  const remF = (i) => u("features", features.filter((_, idx) => idx !== i));
  const movF = (i, d) => { const a = [...features]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; u("features", a); };
  return (
    <div>
      <div className="cms-section-block">
        <p className="cms-block-title">Section Content</p>
        <div className="cms-grid-2-inner">
          <Field label="Badge Text"><Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} placeholder="Who We Are" /></Field>
          <Field label="Button Text"><Input value={data?.buttonText || ""} onChange={(e) => u("buttonText", e.target.value)} /></Field>
          <Field label="Button Link"><Input value={data?.buttonLink || ""} onChange={(e) => u("buttonLink", e.target.value)} /></Field>
        </div>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} /></Field>
        <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} /></Field>
      </div>
      <div className="cms-section-block">
        <p className="cms-block-title">Features / Points</p>
        {features.map((f, i) => (
          <SortableItem key={i} index={i} title={f.title || `Feature ${i + 1}`}
            onMoveUp={() => movF(i, -1)} onMoveDown={() => movF(i, 1)} onDelete={() => remF(i)}>
            <div className="cms-grid-2-inner">
              <Field label="Title"><Input value={f.title} onChange={(e) => updF(i, "title", e.target.value)} /></Field>
              <Field label="Icon class"><Input value={f.icon} onChange={(e) => updF(i, "icon", e.target.value)} placeholder="bi bi-star" /></Field>
            </div>
            <Field label="Description"><Textarea value={f.description} onChange={(e) => updF(i, "description", e.target.value)} rows={2} /></Field>
            <Toggle label="Active" checked={f.isActive !== false} onChange={(e) => updF(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        <button className="cms-add-btn" onClick={addF}><i className="bi bi-plus" /> Add Feature</button>
      </div>
    </div>
  );
};

const WhyChooseUsEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const points = data?.points || [];
  const add = () => u("points", [...points, { title: "", description: "", icon: "", img: "", type: "", isActive: true, order: points.length }]);
  const upd = (i, k, v) => { const a = [...points]; a[i] = { ...a[i], [k]: v }; u("points", a); };
  const rem = (i) => u("points", points.filter((_, idx) => idx !== i));
  const mov = (i, d) => { const a = [...points]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; u("points", a); };
  return (
    <div>
      <div className="cms-section-block">
        <p className="cms-block-title">Section Heading</p>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} /></Field>
      </div>
       <div className="cms-section-block">
        <p className="cms-block-title">Description</p>
        <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} /></Field>
      </div>
      <div className="cms-section-block">
        <p className="cms-block-title">Points / Cards</p>
        {points.map((p, i) => (
          <SortableItem key={i} index={i} title={p.title || `Point ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
            <div className="cms-grid-2-inner">
              <Field label="Title"><Input value={p.title} onChange={(e) => upd(i, "title", e.target.value)} /></Field>
              <Field label="Icon class"><Input value={p.icon} onChange={(e) => upd(i, "icon", e.target.value)} placeholder="bi bi-gear" /></Field>
              {/* <Field label="Type"><Input value={p.type} onChange={(e) => upd(i, "type", e.target.value)} /></Field> */}
            </div>
            <Field label="Description"><Textarea value={p.description} onChange={(e) => upd(i, "description", e.target.value)} rows={2} /></Field>
            <ImageUpload label="Image" value={p.img} onChange={(v) => upd(i, "img", v)} />
            <Toggle label="Active" checked={p.isActive !== false} onChange={(e) => upd(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        <button className="cms-add-btn" onClick={add}><i className="bi bi-plus" /> Add Point</button>
      </div>
    </div>
  );
};

const FutureSectionEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const uc = (k, v) => onChange({ ...data, ctaCard: { ...data?.ctaCard, [k]: v } });
  const services = data?.services || [];
  const add = () => u("services", [...services, { name: "", icon: "", description: "", subtitle: "", points: [], link: "", order: services.length }]);
  const upd = (i, k, v) => { const a = [...services]; a[i] = { ...a[i], [k]: v }; u("services", a); };
  const rem = (i) => u("services", services.filter((_, idx) => idx !== i));
  const mov = (i, d) => { const a = [...services]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; u("services", a); };
  return (
    <div>
      <div className="cms-section-block">
        <p className="cms-block-title">Section Header</p>
        <div className="cms-grid-2-inner">
          <Field label="Badge"><Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} placeholder="Future Ready" /></Field>
          <Field label="Highlight Text"><Input value={data?.highlightText || ""} onChange={(e) => u("highlightText", e.target.value)} /></Field>
        </div>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} /></Field>
        <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} /></Field>
      </div>
      <div className="cms-section-block">
        <p className="cms-block-title">Services ({services.length})</p>
        {services.map((s, i) => (
          <SortableItem key={i} index={i} title={s.name || `Service ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
            <div className="cms-grid-2-inner">
              <Field label="Name"><Input value={s.name} onChange={(e) => upd(i, "name", e.target.value)} /></Field>
              <Field label="Icon (React Icons name)"><Input value={s.icon} onChange={(e) => upd(i, "icon", e.target.value)} placeholder="FaLaptopCode" /></Field>
            
              <Field label="Page Link"><Input value={s.link} onChange={(e) => upd(i, "link", e.target.value)} /></Field>

            </div>
            <Field label="Description"><Textarea value={s.description} onChange={(e) => upd(i, "description", e.target.value)} rows={2} /></Field>
              <Field label="Points Heading"><Input value={s.subtitle} onChange={(e) => upd(i, "subtitle", e.target.value)} /></Field>
            <Field label="Points (one per line)" hint="Each line becomes one bullet point">
              <Textarea value={(s.points || []).join("\n")} onChange={(e) => upd(i, "points", e.target.value.split("\n").filter(Boolean))} rows={3} />
            </Field>
          </SortableItem>
        ))}
        <button className="cms-add-btn" onClick={add}><i className="bi bi-plus" /> Add Service</button>
      </div>
      <div className="cms-section-block">
        <p className="cms-block-title">Last CTA Card</p>
        <div className="cms-grid-2-inner">
          <Field label="Title"><Input value={data?.ctaCard?.title || ""} onChange={(e) => uc("title", e.target.value)} /></Field>
          <Field label="Button Text"><Input value={data?.ctaCard?.buttonText || ""} onChange={(e) => uc("buttonText", e.target.value)} /></Field>
          <Field label="Button Link"><Input value={data?.ctaCard?.buttonLink || ""} onChange={(e) => uc("buttonLink", e.target.value)} /></Field>
        </div>
        <Field label="Description"><Textarea value={data?.ctaCard?.description || ""} onChange={(e) => uc("description", e.target.value)} rows={2} /></Field>
        <ImageUpload label="Card Icon" value={data?.ctaCard?.image} onChange={(v) => uc("image", v)} />
      </div>
    </div>
  );
};

const StatsEditor = ({ data, onChange }) => {
  const stats = data || [];
  const add = () => onChange([...stats, { label: "", value: "", suffix: "", order: stats.length }]);
  const upd = (i, k, v) => { const a = [...stats]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const rem = (i) => onChange(stats.filter((_, idx) => idx !== i));
  const mov = (i, d) => { const a = [...stats]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a); };
  return (
    <div className="cms-section-block">
      <p className="cms-block-title">Counter Stats</p>
      {stats.map((s, i) => (
        <SortableItem key={i} index={i} title={`${s.value || "?"}${s.suffix || ""} — ${s.label || "Label"}`}
          onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
          <div className="cms-grid-3-inner">
            <Field label="Value"><Input value={s.value} onChange={(e) => upd(i, "value", e.target.value)} placeholder="98" /></Field>
            <Field label="Suffix"><Input value={s.suffix} onChange={(e) => upd(i, "suffix", e.target.value)} placeholder="% or +" /></Field>
            <Field label="Label"><Input value={s.label} onChange={(e) => upd(i, "label", e.target.value)} placeholder="Client Satisfaction" /></Field>
          </div>
        </SortableItem>
      ))}
      <button className="cms-add-btn" onClick={add}><i className="bi bi-plus" /> Add Stat</button>
    </div>
  );
};

const IndustrySectionEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const industries = data?.industries || [];
  const add = () => u("industries", [...industries, { name: "", description: "", image: "", link: "", btn: "", isActive: true, order: industries.length }]);
  const upd = (i, k, v) => { const a = [...industries]; a[i] = { ...a[i], [k]: v }; u("industries", a); };
  const rem = (i) => u("industries", industries.filter((_, idx) => idx !== i));
  const mov = (i, d) => { const a = [...industries]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; u("industries", a); };
  return (
    <div>
      <div className="cms-section-block">
        <p className="cms-block-title">Section Header</p>
        <div className="cms-grid-2-inner">
          <Field label="Badge"><Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} /></Field>
          <Field label="Highlight Text"><Input value={data?.highlightText || ""} onChange={(e) => u("highlightText", e.target.value)} /></Field>
        </div>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} /></Field>
        <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} /></Field>
      </div>
      <div className="cms-section-block">
        <p className="cms-block-title">Industry Cards ({industries.length})</p>
        {industries.map((ind, i) => (
          <SortableItem key={i} index={i} title={ind.name || `Industry ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
            <div className="cms-grid-2-inner">
              <Field label="Name"><Input value={ind.name} onChange={(e) => upd(i, "name", e.target.value)} /></Field>
              <Field label="Link"><Input value={ind.link} onChange={(e) => upd(i, "link", e.target.value)} placeholder="/healthcare" /></Field>
              <Field label="Button Text"><Input value={ind.btn} onChange={(e) => upd(i, "btn", e.target.value)} /></Field>
            </div>
            <Field label="Description"><Textarea value={ind.description} onChange={(e) => upd(i, "description", e.target.value)} rows={2} /></Field>
            <ImageUpload label="Card Image" value={ind.image} onChange={(v) => upd(i, "image", v)} />
            <Toggle label="Active" checked={ind.isActive !== false} onChange={(e) => upd(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        <button className="cms-add-btn" onClick={add}><i className="bi bi-plus" /> Add Industry</button>
      </div>
    </div>
  );
};

const TechSectionEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });

  const techs = data?.technologies || [];
  const cats  = data?.categories  || [];

  const defaultOrbit = { rx: 200, ry: 80, duration: 10, delay: 0 };

  // ── Category CRUD ──────────────────────────────────────────────────────────
  const addCat = () => {
    u("categories", [...cats, ""]);
  };

  const updCat = (i, val) => {
    const a = [...cats];
    a[i] = val;
    u("categories", a);
  };

  const remCat = (i) => {
    const updated = cats.filter((_, idx) => idx !== i);
    // Also clear category on any tech that used removed cat
    const removedVal = cats[i];
    const updatedTechs = techs.map((t) =>
      t.category === removedVal ? { ...t, category: "" } : t
    );
    onChange({ ...data, categories: updated, technologies: updatedTechs });
  };

  // ── Technology CRUD ────────────────────────────────────────────────────────
  const addTech = () => {
    u("technologies", [
      ...techs,
      { name: "", logo: "", category: "", isActive: true, order: techs.length, orbit: defaultOrbit },
    ]);
  };

  const upd = (i, k, v) => {
    const a = [...techs];
    a[i] = { ...a[i], [k]: v };
    u("technologies", a);
  };

  const updOrbit = (i, k, v) => {
    const a = [...techs];
    a[i] = { ...a[i], orbit: { ...(a[i].orbit || defaultOrbit), [k]: Number(v) } };
    u("technologies", a);
  };

  const remTech = (i) => {
    u("technologies", techs.filter((_, idx) => idx !== i).map((t, idx) => ({ ...t, order: idx })));
  };

  const movTech = (i, d) => {
    const a = [...techs];
    const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("technologies", a.map((t, idx) => ({ ...t, order: idx })));
  };

  return (
    <div>
      {/* ── SECTION HEADER ── */}
      <div className="cms-section-block">
        <p className="cms-block-title">Section Header</p>

        <div className="cms-grid-2-inner">
          <Field label="Badge">
            <Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} />
          </Field>
          <Field label="Heading">
            <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} />
          </Field>
        </div>

        <Field label="Highlight Text">
          <Input value={data?.highlightText || ""} onChange={(e) => u("highlightText", e.target.value)} />
        </Field>

        <Field label="Description">
          <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} />
        </Field>

        <ImageUpload
          label="Center Logo"
          value={data?.centerLogo}
          onChange={(v) => u("centerLogo", v)}
        />
      </div>

      {/* ── CATEGORIES ── */}
      <div className="cms-section-block">
        <p className="cms-block-title">Filter Categories</p>
        <p className="cms-hint" style={{ marginBottom: 14 }}>
          Add categories here first — then assign them to each technology below.
        </p>

        {cats.length === 0 && (
          <p className="cms-empty-state">No categories yet. Click &#34;+ Add Category&#34; to start.</p>
        )}

        <div className="cms-cat-list">
          {cats.map((cat, i) => (
            <div key={i} className="cms-cat-row">
              {/* colour pill preview */}
              <div
                className="cms-cat-pill"
                style={{ background: CAT_COLORS[i % CAT_COLORS.length].bg, color: CAT_COLORS[i % CAT_COLORS.length].text }}
              >
                {cat || `Category ${i + 1}`}
              </div>

              <Input
                value={cat}
                onChange={(e) => updCat(i, e.target.value)}
                placeholder={`Category name (e.g. Frontend)`}
                style={{ flex: 1 }}
              />

              <button
                className="cms-icon-btn danger"
                onClick={() => remCat(i)}
                title="Remove category"
              >
                <i className="bi bi-trash" />
              </button>
            </div>
          ))}
        </div>

        <button className="cms-add-btn" onClick={addCat}>
          <i className="bi bi-plus-circle" /> Add Category
        </button>
      </div>

      {/* ── TECHNOLOGIES ── */}
      <div className="cms-section-block">
        <p className="cms-block-title">Technologies ({techs.length})</p>

        {techs.map((t, i) => {
          const orbit = t.orbit || defaultOrbit;
          const catIndex = cats.indexOf(t.category);
          const catColor = catIndex >= 0 ? CAT_COLORS[catIndex % CAT_COLORS.length] : null;

          return (
            <SortableItem
             key={i}
              index={i}
              title={
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {t.logo && (
                    <img src={t.logo} alt="" style={{ width: 18, height: 18, objectFit: "contain", borderRadius: 3 }}
                      onError={(e) => (e.target.style.display = "none")} />
                  )}
                  {t.name || `Tech ${i + 1}`}
                  {t.category && catColor && (
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: catColor.bg, color: catColor.text, fontWeight: 600 }}>
                      {t.category}
                    </span>
                  )}
                </span>
              }
              onMoveUp={() => movTech(i, -1)}
              onMoveDown={() => movTech(i, 1)}
              onDelete={() => remTech(i)}
            >
              <div className="cms-grid-2-inner">
                <Field label="Technology Name">
                  <Input value={t.name} onChange={(e) => upd(i, "name", e.target.value)} placeholder="e.g. React" />
                </Field>

                {/* Category dropdown — pulls from cats array */}
                <Field label="Category">
                  {cats.length === 0 ? (
                    <div className="cms-no-cats-msg">
                      <i className="bi bi-exclamation-circle" /> Add categories above first
                    </div>
                  ) : (
                    <select
                      className="cms-select"
                      value={t.category}
                      onChange={(e) => upd(i, "category", e.target.value)}
                    >
                      <option value="">— Select Category —</option>
                      {cats.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  )}
                </Field>
              </div>

              <ImageUpload
                label="Technology Logo"
                value={t.logo}
                onChange={(v) => upd(i, "logo", v)}
                hint="Recommended: 64×64px, transparent PNG"
              />

              {/* Orbit settings — collapsible look */}
              <div className="cms-orbit-block">
                <p style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                  <i className="bi bi-circle" style={{ marginRight: 5 }} />Orbit Animation Settings
                </p>
                <div className="cms-grid-2-inner">
                  <Field label="RX — Ellipse Width" hint="Horizontal radius of orbit">
                    <Input type="number" value={orbit.rx} onChange={(e) => updOrbit(i, "rx", e.target.value)} />
                  </Field>
                  <Field label="RY — Ellipse Height" hint="Vertical radius of orbit">
                    <Input type="number" value={orbit.ry} onChange={(e) => updOrbit(i, "ry", e.target.value)} />
                  </Field>
                  <Field label="Duration (seconds)" hint="Speed of full rotation">
                    <Input type="number" value={orbit.duration} onChange={(e) => updOrbit(i, "duration", e.target.value)} />
                  </Field>
                  <Field label="Delay (seconds)" hint="Start delay for spread effect">
                    <Input type="number" value={orbit.delay} onChange={(e) => updOrbit(i, "delay", e.target.value)} />
                  </Field>
                </div>
              </div>

              <Toggle
                label="Active (show on site)"
                checked={t.isActive !== false}
                onChange={(e) => upd(i, "isActive", e.target.checked)}
              />
            </SortableItem>
          );
        })}

        <button className="cms-add-btn" onClick={addTech}>
          <i className="bi bi-plus-circle" /> Add Technology
        </button>
      </div>

      {/* Inline styles specific to this editor */}
      <style>{`
        .cms-cat-list    { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
        .cms-cat-row     { display: flex; align-items: center; gap: 10px; }
        .cms-cat-pill    { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; min-width: 90px; text-align: center; }
        .cms-select      { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; cursor: pointer; transition: border 0.15s; box-sizing: border-box; }
        .cms-select:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .cms-no-cats-msg { padding: 9px 13px; background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; font-size: 13px; color: #92400e; display: flex; align-items: center; gap: 6px; }
        .cms-orbit-block { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; margin: 12px 0; }
        .cms-empty-state { font-size: 13px; color: #9ca3af; font-style: italic; padding: 12px; background: #f9fafb; border-radius: 8px; border: 1px dashed #e5e7eb; text-align: center; margin-bottom: 12px; }
      `}</style>
    </div>
  );
};


const AgileSectionEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const steps = data?.steps || [];
  const add = () => u("steps", [...steps, { title: "", description: "", color: "#22c55e", progress: 0, order: steps.length }]);
  const upd = (i, k, v) => { const a = [...steps]; a[i] = { ...a[i], [k]: v }; u("steps", a); };
  const rem = (i) => u("steps", steps.filter((_, idx) => idx !== i));
  const mov = (i, d) => { const a = [...steps]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; u("steps", a); };
  return (
    <div>
      <div className="cms-section-block">
        <p className="cms-block-title">Section Header</p>
        <div className="cms-grid-2-inner">
          <Field label="Badge"><Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} /></Field>
          <Field label="Highlight Text"><Input value={data?.highlightText || ""} onChange={(e) => u("highlightText", e.target.value)} /></Field>
        </div>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} /></Field>
        <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} /></Field>
      </div>
      <div className="cms-section-block">
        <p className="cms-block-title">Process Steps</p>
        {steps.map((s, i) => (
          <SortableItem key={i} index={i} title={s.title || `Step ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
            <div className="cms-grid-2-inner">
              <Field label="Title"><Input value={s.title} onChange={(e) => upd(i, "title", e.target.value)} /></Field>
              <Field label="Accent Color">
                <div className="cms-color-row">
                  <input type="color" value={s.color || "#22c55e"} onChange={(e) => upd(i, "color", e.target.value)} className="cms-color-input" />
                  <Input value={s.color || ""} onChange={(e) => upd(i, "color", e.target.value)} />
                </div>
              </Field>
              <Field label="Progress %"><Input type="number" min={0} max={100} value={s.progress || 0} onChange={(e) => upd(i, "progress", Number(e.target.value))} /></Field>
            </div>
            <Field label="Description"><Textarea value={s.description} onChange={(e) => upd(i, "description", e.target.value)} rows={2} /></Field>
          </SortableItem>
        ))}
        <button className="cms-add-btn" onClick={add}><i className="bi bi-plus" /> Add Step</button>
      </div>
    </div>
  );
};

const TestimonialEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const items = data?.featuredTestimonials || [];
  const add = () => u("featuredTestimonials", [...items, { name: "", designation: "", company: "", image: "", quote: "", title: "", description: "", rating: 5, tagLine: "", isVerified: true, isActive: true, order: items.length }]);
  const upd = (i, k, v) => { const a = [...items]; a[i] = { ...a[i], [k]: v }; u("featuredTestimonials", a); };
  const rem = (i) => u("featuredTestimonials", items.filter((_, idx) => idx !== i));
  const mov = (i, d) => { const a = [...items]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; u("featuredTestimonials", a); };
  return (
    <div>
      <div className="cms-section-block">
        <div className="cms-grid-2-inner">
          <Field label="Badge"><Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} /></Field>
          <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} /></Field>
        </div>
      </div>
      <div className="cms-section-block">
        <p className="cms-block-title">Testimonials ({items.length})</p>
        {items.map((t, i) => (
          <SortableItem key={i} index={i} title={t.name ? `${t.name} @ ${t.company}` : `Testimonial ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
            <div className="cms-grid-2-inner">
              <Field label="Name"><Input value={t.name} onChange={(e) => upd(i, "name", e.target.value)} /></Field>
              <Field label="Designation"><Input value={t.designation} onChange={(e) => upd(i, "designation", e.target.value)} /></Field>
              <Field label="Company"><Input value={t.company} onChange={(e) => upd(i, "company", e.target.value)} /></Field>
              <Field label="Rating (1–5)"><Input type="number" min={1} max={5} value={t.rating || 5} onChange={(e) => upd(i, "rating", Number(e.target.value))} /></Field>
            </div>
            <Field label="Quote / Main Text"><Textarea value={t.quote} onChange={(e) => upd(i, "quote", e.target.value)} rows={2} /></Field>
            <Field label="Review Title"><Input value={t.title} onChange={(e) => upd(i, "title", e.target.value)} /></Field>
            <Field label="Review Description"><Textarea value={t.description} onChange={(e) => upd(i, "description", e.target.value)} rows={2} /></Field>
            <Field label="Tag Line"><Input value={t.tagLine} onChange={(e) => upd(i, "tagLine", e.target.value)} /></Field>
            <ImageUpload label="Client Photo" value={t.image} onChange={(v) => upd(i, "image", v)} />
            <div className="cms-grid-2-inner">
              <Toggle label="Verified" checked={t.isVerified !== false} onChange={(e) => upd(i, "isVerified", e.target.checked)} />
              <Toggle label="Active" checked={t.isActive !== false} onChange={(e) => upd(i, "isActive", e.target.checked)} />
            </div>
          </SortableItem>
        ))}
        <button className="cms-add-btn" onClick={add}><i className="bi bi-plus" /> Add Testimonial</button>
      </div>
    </div>
  );
};

const FaqEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const faqs = data?.faqs || [];
  const add = () => u("faqs", [...faqs, { question: "", answer: "", isActive: true, order: faqs.length }]);
  const upd = (i, k, v) => { const a = [...faqs]; a[i] = { ...a[i], [k]: v }; u("faqs", a); };
  const rem = (i) => u("faqs", faqs.filter((_, idx) => idx !== i));
  const mov = (i, d) => { const a = [...faqs]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; u("faqs", a); };
  return (
    <div>
      <div className="cms-section-block">
        <div className="cms-grid-2-inner">
          <Field label="Badge"><Input value={data?.badge || ""} onChange={(e) => u("badge", e.target.value)} /></Field>
          <Field label="Section Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} /></Field>
        </div>
      </div>
      <div className="cms-section-block">
        <p className="cms-block-title">FAQs ({faqs.length})</p>
        {faqs.map((f, i) => (
          <SortableItem key={i} index={i} title={f.question ? f.question.substring(0, 55) + "..." : `FAQ ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
            <Field label="Question"><Input value={f.question} onChange={(e) => upd(i, "question", e.target.value)} /></Field>
            <Field label="Answer"><Textarea value={f.answer} onChange={(e) => upd(i, "answer", e.target.value)} rows={3} /></Field>
            <Toggle label="Active" checked={f.isActive !== false} onChange={(e) => upd(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        <button className="cms-add-btn" onClick={add}><i className="bi bi-plus" /> Add FAQ</button>
      </div>
    </div>
  );
};

const CtaEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const features = data?.features || [];
  const addF = () => u("features", [...features, { title: "", icon: "" }]);
  const updF = (i, k, v) => { const a = [...features]; a[i] = { ...a[i], [k]: v }; u("features", a); };
  const remF = (i) => u("features", features.filter((_, idx) => idx !== i));
  return (
    <div className="cms-section-block">
      <p className="cms-block-title">CTA Section</p>
      <div className="cms-grid-2-inner">
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} /></Field>
        <Field label="Icon class"><Input value={data?.icon || ""} onChange={(e) => u("icon", e.target.value)} placeholder="bi bi-rocket" /></Field>
        <Field label="Primary Button Text"><Input value={data?.primaryBtnText || ""} onChange={(e) => u("primaryBtnText", e.target.value)} /></Field>
        <Field label="Primary Button Link"><Input value={data?.primaryBtnLink || ""} onChange={(e) => u("primaryBtnLink", e.target.value)} /></Field>
        <Field label="Secondary Button Text"><Input value={data?.secondaryBtnText || ""} onChange={(e) => u("secondaryBtnText", e.target.value)} /></Field>
        <Field label="Secondary Button Link"><Input value={data?.secondaryBtnLink || ""} onChange={(e) => u("secondaryBtnLink", e.target.value)} /></Field>
      </div>
      <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} /></Field>
      <p className="cms-block-title" style={{ marginTop: 16 }}>Feature Chips</p>
      {features.map((f, i) => (
        <div key={i} className="cms-tag-row">
          <Input value={f.icon} onChange={(e) => updF(i, "icon", e.target.value)} placeholder="bi bi-check" style={{ width: 140, flexShrink: 0 }} />
          <Input value={f.title} onChange={(e) => updF(i, "title", e.target.value)} placeholder="Feature label" />
          <button className="cms-icon-btn danger" onClick={() => remF(i)}><i className="bi bi-trash" /></button>
        </div>
      ))}
      <button className="cms-add-btn" onClick={addF}><i className="bi bi-plus" /> Add Feature</button>
    </div>
  );
};

const SeoEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const descLen = (data?.description || "").length;
  return (
    <div className="cms-section-block">
      <p className="cms-block-title">SEO Meta Tags</p>
      <Field label="Meta Title" hint="Recommended: 50–60 characters">
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} maxLength={70} />
        <p className="cms-char-count">{(data?.title || "").length}/70</p>
      </Field>
      <Field label="Meta Description" hint="Recommended: 150–160 characters">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} maxLength={170} />
        <p className={`cms-char-count ${descLen > 160 ? "over" : ""}`}>{descLen}/170</p>
      </Field>
      <Field label="Keywords (comma separated)">
        <Textarea value={(data?.keywords || []).join(", ")} onChange={(e) => u("keywords", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} rows={2} placeholder="web development, software company, ..." />
      </Field>
      <div style={{ marginTop: 20 }}>
        <p className="cms-block-title">Google SERP Preview</p>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px" }}>
          <p style={{ fontSize: 13, color: "#16a34a", margin: "0 0 4px" }}>https://dousoft.com</p>
          <p style={{ fontSize: 18, color: "#1a0dab", fontWeight: 500, margin: "0 0 4px" }}>{data?.title || "Page title not set"}</p>
          <p style={{ fontSize: 14, color: "#4d5156", margin: 0, lineHeight: 1.5 }}>{data?.description || "Meta description will appear here..."}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomeAdminPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [unsaved, setUnsaved] = useState(false);
  const toastRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getHomePageServ();
        if (res.ok) {
          const json = await res.json();
          if (json.data) { setFormData(json.data); setIsPublished(json.data.isPublished !== false); }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...formData, isPublished }; // ← same payload
      const res = await createHomePageServ(payload);
      if (res.ok) { showToast("Home page saved successfully!", "success"); setUnsaved(false); }
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
      case "hero":            return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
      case "marquee":         return <MarqueeEditor data={formData.marqueeServices} onChange={(v) => update("marqueeServices", v)} />;
      case "whoWeAre":        return <WhoWeAreEditor data={formData.whoWeAre} onChange={(v) => update("whoWeAre", v)} />;
      case "whyChooseUs":     return <WhyChooseUsEditor data={formData.whyChooseUs} onChange={(v) => update("whyChooseUs", v)} />;
      case "futureSection":   return <FutureSectionEditor data={formData.futureSection} onChange={(v) => update("futureSection", v)} />;
      case "stats":           return <StatsEditor data={formData.stats} onChange={(v) => update("stats", v)} />;
      case "industrySection": return <IndustrySectionEditor data={formData.industrySection} onChange={(v) => update("industrySection", v)} />;
      case "techSection":     return <TechSectionEditor data={formData.techSection} onChange={(v) => update("techSection", v)} />;
      case "agileSection":    return <AgileSectionEditor data={formData.agileSection} onChange={(v) => update("agileSection", v)} />;
      case "testimonials":    return <TestimonialEditor data={formData.testimonialSection} onChange={(v) => update("testimonialSection", v)} />;
      case "faqSection":      return <FaqEditor data={formData.faqSection} onChange={(v) => update("faqSection", v)} />;
      case "cta":             return <CtaEditor data={formData.cta} onChange={(v) => update("cta", v)} />;
      case "seo":             return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
      default:                return null;
    }
  };

  if (loading) return (
    <div className="cms-loading">
      <div className="cms-spinner" />
      <p>Loading Home Page Data...</p>
    </div>
  );



  return (
    <>
      <style>{`
        /* ── Base ── */
        .cms-content    { padding: 24px; background: #f9fafb; min-height: 60vh; }
        .cms-grid-2-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .cms-grid-3-inner { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

        /* ── Section blocks ── */
        .cms-section-block {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 22px;
          margin-bottom: 18px;
        }
        .cms-block-title {
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f3f4f6;
        }

        /* ── Fields ── */
        .cms-field      { margin-bottom: 16px; }
        .cms-field:last-child { margin-bottom: 0; }
        .cms-label      { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .cms-hint       { font-size: 12px; color: #9ca3af; margin-top: 5px; }
        .cms-input {
          width: 100%;
          padding: 9px 13px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #111827;
          background: #fff;
          outline: none;
          transition: border 0.15s;
          box-sizing: border-box;
        }
        .cms-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .cms-textarea {
          width: 100%;
          padding: 9px 13px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #111827;
          background: #fff;
          outline: none;
          resize: vertical;
          font-family: inherit;
          transition: border 0.15s;
          box-sizing: border-box;
          line-height: 1.6;
        }
        .cms-textarea:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .cms-char-count { font-size: 12px; color: #9ca3af; text-align: right; margin-top: 4px; }
        .cms-char-count.over { color: #ef4444; }

        /* ── Image upload ── */
        .cms-img-upload { display: flex; flex-direction: column; gap: 8px; }
        .cms-img-preview { position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .cms-img-preview img { width: 100%; height: 160px; object-fit: cover; display: block; }
        .cms-img-remove { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.6); color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; }
        .cms-img-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 28px; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer; color: #9ca3af; font-size: 13px; text-align: center; transition: border 0.15s; }
        .cms-img-placeholder:hover { border-color: #16a34a; color: #16a34a; }
        .cms-img-placeholder i { font-size: 26px; }

        /* ── Toggle ── */
        .cms-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
        .cms-switch { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
        .cms-switch input { opacity: 0; width: 0; height: 0; }
        .cms-slider { position: absolute; inset: 0; background: #d1d5db; border-radius: 24px; cursor: pointer; transition: 0.2s; }
        .cms-slider:before { content: ""; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
        .cms-switch input:checked + .cms-slider { background: #16a34a; }
        .cms-switch input:checked + .cms-slider:before { transform: translateX(18px); }

        /* ── Sortable list items ── */
        .cms-list-item { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 14px; overflow: hidden; }
        .cms-list-item-header { display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; }
        .cms-list-item-title { font-size: 13px; font-weight: 600; color: #374151; }
        .cms-list-item-actions { display: flex; gap: 5px; }
        .cms-list-item-actions button { padding: 5px 9px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; color: #6b7280; transition: all 0.15s; }
        .cms-list-item-actions button:hover { background: #f3f4f6; color: #111; }
        .cms-list-item-actions button.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .cms-list-item-body { padding: 16px; }

        /* ── Tag rows / add buttons ── */
        .cms-tag-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
        .cms-icon-btn { padding: 9px 11px; border: 1px solid #d1d5db; background: #fff; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; flex-shrink: 0; }
        .cms-icon-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .cms-add-btn { display: flex; align-items: center; gap: 6px; padding: 9px 16px; border: 1.5px dashed #d1d5db; background: transparent; border-radius: 8px; cursor: pointer; font-size: 13px; color: #6b7280; width: 100%; justify-content: center; transition: all 0.15s; margin-top: 4px; }
        .cms-add-btn:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }

        /* ── Color input ── */
        .cms-color-row { display: flex; gap: 8px; align-items: center; }
        .cms-color-input { width: 42px; height: 38px; border: 1px solid #d1d5db; border-radius: 6px; padding: 2px; cursor: pointer; flex-shrink: 0; }

        /* ── Preview divider ── */
        .cms-preview-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 32px 0 0;
          padding-top: 8px;
        }
        .cms-preview-divider span {
          font-size: 13px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cms-preview-divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        /* ── Toast ── */
        .cms-toast { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: cmsSlideUp .2s ease; }
        .cms-toast.success { background: #16a34a; color: #fff; }
        .cms-toast.error   { background: #ef4444; color: #fff; }
        @keyframes cmsSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* ── Loading ── */
        .cms-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #6b7280; font-size: 15px; }
        .cms-spinner { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: cmsSpin .8s linear infinite; }
        @keyframes cmsSpin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .cms-grid-2-inner, .cms-grid-3-inner { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── CmsTabs: handles topbar + tab bar ── */}
      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle="Home Page"
        pageSubtitle="Manage all sections of your home page"
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl="/"
      >
        {/* ── Tab Content ── */}
        <div className="cms-content">
          {renderEditor()}

          {/* ── Shared full-page preview (always visible at bottom) ── */}
          <div className="cms-preview-divider">
            <span><i className="bi bi-eye" /> Page Preview</span>
            <div className="cms-preview-divider-line" />
            <span style={{ fontSize: 12, color: "#9ca3af", textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>
              Updates as you edit any section
            </span>
          </div>

          <HomePreview formData={formData} />
        </div>
      </CmsTabs>

      {/* ── Toast ── */}
      {toast && (
        <div className={`cms-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"} />
          {toast.msg}
        </div>
      )}
    </>
  );
}