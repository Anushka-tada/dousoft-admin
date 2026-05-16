"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CmsTabs from "@/app/Components/CmsTabs";
import { createSolutionServ, getSolutionByIdServ, updateSolutionServ } from "@/app/services/pages.service";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: "meta",              label: "Meta",           icon: "bi bi-tag" },
  { key: "hero",              label: "Hero",           icon: "bi bi-image" },
  { key: "introSection",     label: "Intro",          icon: "bi bi-text-paragraph" },
  { key: "approachSection",  label: "Approach",       icon: "bi bi-grid-1x2" },
  { key: "frameworkSection", label: "Framework",      icon: "bi bi-diagram-3" },
  { key: "servicesSection",  label: "Services",       icon: "bi bi-gear" },
  { key: "benefitsSection",  label: "Benefits",       icon: "bi bi-star" },
  { key: "whyChooseSection", label: "Why Choose",     icon: "bi bi-trophy" },
  { key: "ctaSection",       label: "CTA",            icon: "bi bi-megaphone" },
  { key: "seo",              label: "SEO",            icon: "bi bi-search" },
];

// ─── Primitives ───────────────────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="sc-field">
    <label className="sc-label">{label}</label>
    {children}
    {hint && <p className="sc-hint">{hint}</p>}
  </div>
);
const Input    = (props) => <input className="sc-input" {...props} />;
const Textarea = ({ rows = 3, ...props }) => <textarea className="sc-textarea" rows={rows} {...props} />;
const Toggle   = ({ label, checked, onChange }) => (
  <div className="sc-toggle-row">
    <span className="sc-label">{label}</span>
    <label className="sc-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="sc-slider" />
    </label>
  </div>
);
const ImageUpload = ({ label, value, onChange, hint }) => (
  <Field label={label} hint={hint}>
    <div className="sc-img-upload">
      {value ? (
        <div className="sc-img-preview">
          <img src={value} alt="preview" onError={(e) => (e.target.style.display = "none")} />
          <button className="sc-img-remove" onClick={() => onChange("")}><i className="bi bi-x" /></button>
        </div>
      ) : (
        <label className="sc-img-placeholder">
          <i className="bi bi-cloud-upload" /><span>Click to upload</span>
          <input type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files[0]; if (f) onChange(URL.createObjectURL(f)); }} />
        </label>
      )}
      <input className="sc-input" style={{ marginTop: 8 }} placeholder="Or paste image URL..."
        value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  </Field>
);

const SortableItem = ({ index, onMoveUp, onMoveDown, onDelete, title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="sc-list-item">
      <div className="sc-list-header" onClick={() => setOpen((p) => !p)}>
        <div className="sc-list-header-left">
          <i className={`bi bi-chevron-${open ? "down" : "right"} sc-chevron`} />
          <span className="sc-list-title">{title || `Item ${index + 1}`}</span>
        </div>
        <div className="sc-list-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={onMoveUp} title="Move up"><i className="bi bi-arrow-up" /></button>
          <button onClick={onMoveDown} title="Move down"><i className="bi bi-arrow-down" /></button>
          <button onClick={onDelete} className="danger" title="Delete"><i className="bi bi-trash" /></button>
        </div>
      </div>
      {open && <div className="sc-list-body">{children}</div>}
    </div>
  );
};

// ─── Section Editors ──────────────────────────────────────────────────────────

// META (name, slug, order)
const MetaEditor = ({ data, onChange, formData, setFormData }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const autoSlug = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-tag" /> Solution Identity</p>
      <p className="sc-section-hint">Basic identifiers for this solution. Slug is used in the URL.</p>
      <div className="sc-grid-2">
        <Field label="Solution Name" hint='e.g. "Cloud Infrastructure"'>
          <Input value={formData.name || ""} placeholder="Cloud Infrastructure"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
                slug: prev.slug || autoSlug(e.target.value),
              }));
            }}
          />
        </Field>
        <Field label="URL Slug" hint='Auto-generated or custom. e.g. "cloud-infrastructure"'>
          <div className="sc-slug-row">
            <span className="sc-slug-prefix">/solutions/</span>
            <Input value={formData.slug || ""} placeholder="cloud-infrastructure"
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: autoSlug(e.target.value) }))}
            />
          </div>
        </Field>
      </div>
      <Field label="Display Order" hint="Lower number = appears first in the list">
        <Input type="number" value={formData.order ?? 0} style={{ maxWidth: 120 }}
          onChange={(e) => setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))} />
      </Field>
    </div>
  );
};

// HERO
const HeroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-image" /> Hero / Banner Section</p>
      <p className="sc-section-hint">Top banner shown on the solution&lsquo;s page.</p>
      <Field label="Page Title">
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Cloud Infrastructure Solutions" />
      </Field>
      <Field label="Breadcrumb" hint='e.g. "Home / Solutions / Cloud"'>
        <Input value={data?.breadcrumb || ""} onChange={(e) => u("breadcrumb", e.target.value)} placeholder="Home / Solutions / Cloud" />
      </Field>
      <Field label="Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} placeholder="Brief description shown in the hero..." />
      </Field>
    </div>
  );
};

// INTRO SECTION
const IntroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const paragraphs = data?.paragraphs || [];
  const addPara = () => u("paragraphs", [...paragraphs, ""]);
  const updPara = (i, v) => { const a = [...paragraphs]; a[i] = v; u("paragraphs", a); };
  const remPara = (i) => u("paragraphs", paragraphs.filter((_, idx) => idx !== i));

  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-text-paragraph" /> Intro Section</p>
      <Field label="Heading">
        <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Introduction heading..." />
      </Field>
      <Field label="Highlight Text">
  <Input
    value={data?.highlightText || ""}
    onChange={(e) => u("highlightText", e.target.value)}
    placeholder="Highlighted text..."
  />
</Field>

      {/* Paragraphs */}
      <div className="sc-para-section">
        <div className="sc-para-header">
          <label className="sc-label">Paragraphs</label>
          <button className="sc-add-inline-btn" onClick={addPara}><i className="bi bi-plus-circle" /> Add Paragraph</button>
        </div>
        {paragraphs.map((p, i) => (
          <div key={i} className="sc-para-row">
            <div className="sc-para-num">{i + 1}</div>
            <Textarea value={p} onChange={(e) => updPara(i, e.target.value)} rows={2} placeholder={`Paragraph ${i + 1}...`} style={{ flex: 1 }} />
            <button className="sc-icon-btn danger" onClick={() => remPara(i)}><i className="bi bi-trash" /></button>
          </div>
        ))}
        {paragraphs.length === 0 && <div className="sc-empty-state">No paragraphs yet.</div>}
      </div>

      <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)} hint="Recommended: 600×500px" />
    </div>
  );
};

// APPROACH SECTION
const ApproachEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const cards = data?.cards || [];

  const addCard = () => u("cards", [...cards, { title: "", description: "", icon: "", pointHeading: "", points: [], isActive: true, order: cards.length }]);
  const updCard = (i, k, v) => { const a = [...cards]; a[i] = { ...a[i], [k]: v }; u("cards", a); };
  const remCard = (i) => u("cards", cards.filter((_, idx) => idx !== i));
  const movCard = (i, d) => {
    const a = [...cards]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("cards", a.map((c, idx) => ({ ...c, order: idx })));
  };

  // Points inside a card
  const addPoint = (ci) => {
    const a = [...cards]; a[ci] = { ...a[ci], points: [...(a[ci].points || []), { text: "", icon: "" }] };
    u("cards", a);
  };
  const updPoint = (ci, pi, k, v) => {
    const a = [...cards]; const pts = [...(a[ci].points || [])];
    pts[pi] = { ...pts[pi], [k]: v }; a[ci] = { ...a[ci], points: pts }; u("cards", a);
  };
  const remPoint = (ci, pi) => {
    const a = [...cards]; a[ci] = { ...a[ci], points: a[ci].points.filter((_, idx) => idx !== pi) };
    u("cards", a);
  };

  return (
    <div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-grid-1x2" /> Approach Section</p>
        <Field label="Section Heading">
          <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Our Approach" />
        </Field>
        <Field label="Highlight Text">
  <Input
    value={data?.highlightText || ""}
    onChange={(e) => u("highlightText", e.target.value)}
    placeholder="Highlighted text..."
  />
</Field>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-card-list" /> Approach Cards ({cards.length})</p>
        {cards.map((c, ci) => (
          <SortableItem key={ci} index={ci} title={c.title || `Card ${ci + 1}`}
            onMoveUp={() => movCard(ci, -1)} onMoveDown={() => movCard(ci, 1)} onDelete={() => remCard(ci)} defaultOpen={ci === 0}>
            <div className="sc-grid-2">
              <Field label="Title">
                <Input value={c.title} onChange={(e) => updCard(ci, "title", e.target.value)} placeholder="Card title..." />
              </Field>
              <Field label="Icon Class">
                <div className="sc-icon-preview-row">
                  <i className={c.icon || "bi bi-star"} style={{ fontSize: 18, color: "#16a34a" }} />
                  <Input value={c.icon} onChange={(e) => updCard(ci, "icon", e.target.value)} placeholder="bi bi-star" />
                </div>
              </Field>
            </div>
            <Field label="Description">
              <Textarea value={c.description} onChange={(e) => updCard(ci, "description", e.target.value)} rows={2} placeholder="Card description..." />
            </Field>
            <Field label="Points Heading" hint="Heading above the bullet points list">
              <Input value={c.pointHeading || ""} onChange={(e) => updCard(ci, "pointHeading", e.target.value)} placeholder="Key features include:" />
            </Field>

            {/* Points */}
            <div className="sc-sub-section">
              <div className="sc-para-header">
                <label className="sc-label" style={{ fontSize: 13 }}>Points ({(c.points || []).length})</label>
                <button className="sc-add-inline-btn" onClick={() => addPoint(ci)}><i className="bi bi-plus-circle" /> Add Point</button>
              </div>
              {(c.points || []).map((pt, pi) => (
                <div key={pi} className="sc-point-row">
                  <div className="sc-icon-preview-row" style={{ flex: 1, gap: 6 }}>
                    <i className={pt.icon || "bi bi-check-circle"} style={{ fontSize: 16, color: "#16a34a", flexShrink: 0 }} />
                    <Input value={pt.icon || ""} onChange={(e) => updPoint(ci, pi, "icon", e.target.value)} placeholder="bi bi-check" style={{ width: 130 }} />
                    <Input value={pt.text} onChange={(e) => updPoint(ci, pi, "text", e.target.value)} placeholder="Point text..." style={{ flex: 1 }} />
                  </div>
                  <button className="sc-icon-btn danger" onClick={() => remPoint(ci, pi)}><i className="bi bi-trash" /></button>
                </div>
              ))}
              {(c.points || []).length === 0 && <div className="sc-empty-state" style={{ padding: "10px 12px", fontSize: 13 }}>No points yet.</div>}
            </div>
            <Toggle label="Active" checked={c.isActive !== false} onChange={(e) => updCard(ci, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        {cards.length === 0 && <div className="sc-empty-state">No approach cards yet.</div>}
        <button className="sc-add-btn" onClick={addCard}><i className="bi bi-plus-circle" /> Add Card</button>
      </div>
    </div>
  );
};

// FRAMEWORK SECTION
const FrameworkEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const steps = data?.steps || [];

  const addStep = () => u("steps", [...steps, { stepNumber: steps.length + 1, title: "", points: [], icon: "", isActive: true, order: steps.length }]);
  const updStep = (i, k, v) => { const a = [...steps]; a[i] = { ...a[i], [k]: v }; u("steps", a); };
  const remStep = (i) => u("steps", steps.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, order: idx, stepNumber: idx + 1 })));
  const movStep = (i, d) => {
    const a = [...steps]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("steps", a.map((s, idx) => ({ ...s, order: idx, stepNumber: idx + 1 })));
  };

  return (
    <div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-diagram-3" /> Framework Section</p>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Our Framework" /></Field>
        <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={2} placeholder="Brief framework overview..." /></Field>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-list-ol" /> Steps ({steps.length})</p>
        {steps.map((s, i) => (
          <SortableItem key={i} index={i}
            title={<span><span className="sc-step-badge">Step {s.stepNumber}</span> {s.title || `Step ${i + 1}`}</span>}
            onMoveUp={() => movStep(i, -1)} onMoveDown={() => movStep(i, 1)} onDelete={() => remStep(i)} defaultOpen={i === 0}>
            <div className="sc-grid-2">
              <Field label="Title"><Input value={s.title} onChange={(e) => updStep(i, "title", e.target.value)} placeholder="Step title..." /></Field>
              <Field label="Icon Class">
                <div className="sc-icon-preview-row">
                  <i className={s.icon || "bi bi-arrow-right-circle"} style={{ fontSize: 18, color: "#16a34a" }} />
                  <Input value={s.icon} onChange={(e) => updStep(i, "icon", e.target.value)} placeholder="bi bi-arrow-right-circle" />
                </div>
              </Field>
            </div>
            <Field label="Points (one per line)" hint="Each line = one bullet point">
              <Textarea
                value={(s.points || []).join("\n")}
                onChange={(e) => updStep(i, "points", e.target.value.split("\n").filter((l) => l.trim()))}
                rows={3} placeholder={"Define requirements\nPlan architecture\nSetup environment"} />
            </Field>
            <Toggle label="Active" checked={s.isActive !== false} onChange={(e) => updStep(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        {steps.length === 0 && <div className="sc-empty-state">No steps yet.</div>}
        <button className="sc-add-btn" onClick={addStep}><i className="bi bi-plus-circle" /> Add Step</button>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-chat-quote" /> Bottom Text</p>
        <Field label="Footer / Closing Text" hint="Text shown below the framework steps">
          <Textarea value={data?.bottomText || ""} onChange={(e) => u("bottomText", e.target.value)} rows={2} placeholder="Closing statement..." />
        </Field>
      </div>
    </div>
  );
};

// SERVICES SECTION
const ServicesEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const services = data?.services || [];

  const add = () => u("services", [...services, { title: "", description: "", image: "", isActive: true, order: services.length }]);
  const upd = (i, k, v) => { const a = [...services]; a[i] = { ...a[i], [k]: v }; u("services", a); };
  const rem = (i) => u("services", services.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, order: idx })));
  const mov = (i, d) => {
    const a = [...services]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("services", a.map((s, idx) => ({ ...s, order: idx })));
  };

  return (
    <div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-gear" /> Services Section</p>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Our Services" /></Field>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-collection" /> Service Cards ({services.length})</p>
        {services.map((s, i) => (
          <SortableItem key={i} index={i} title={s.title || `Service ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)}>
            <Field label="Title"><Input value={s.title} onChange={(e) => upd(i, "title", e.target.value)} placeholder="Service name..." /></Field>
            <Field label="Description"><Textarea value={s.description} onChange={(e) => upd(i, "description", e.target.value)} rows={2} placeholder="Service description..." /></Field>
            <ImageUpload label="Service Image" value={s.image} onChange={(v) => upd(i, "image", v)} hint="Recommended: 400×300px" />
            <Toggle label="Active" checked={s.isActive !== false} onChange={(e) => upd(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        {services.length === 0 && <div className="sc-empty-state">No services yet.</div>}
        <button className="sc-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Service</button>
      </div>
    </div>
  );
};

// BENEFITS SECTION
const BenefitsEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const benefits = data?.benefits || [];

  const add = () => u("benefits", [...benefits, { title: "", icon: "", isActive: true, order: benefits.length }]);
  const upd = (i, k, v) => { const a = [...benefits]; a[i] = { ...a[i], [k]: v }; u("benefits", a); };
  const rem = (i) => u("benefits", benefits.filter((_, idx) => idx !== i).map((b, idx) => ({ ...b, order: idx })));
  const mov = (i, d) => {
    const a = [...benefits]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("benefits", a.map((b, idx) => ({ ...b, order: idx })));
  };

  return (
    <div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-star" /> Benefits Section</p>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Key Benefits" /></Field>
        <Field label="Highlight Text">
  <Input
    value={data?.highlightText || ""}
    onChange={(e) => u("highlightText", e.target.value)}
    placeholder="Highlighted text..."
  />
</Field>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-check2-all" /> Benefits ({benefits.length})</p>
        {benefits.map((b, i) => (
          <SortableItem key={i} index={i} title={b.title || `Benefit ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)} defaultOpen>
            <div className="sc-grid-2">
              <Field label="Title"><Input value={b.title} onChange={(e) => upd(i, "title", e.target.value)} placeholder="e.g. Cost Reduction" /></Field>
              <Field label="Icon Class">
                <div className="sc-icon-preview-row">
                  <i className={b.icon || "bi bi-star"} style={{ fontSize: 18, color: "#16a34a" }} />
                  <Input value={b.icon} onChange={(e) => upd(i, "icon", e.target.value)} placeholder="bi bi-star" />
                </div>
              </Field>
            </div>
            <Toggle label="Active" checked={b.isActive !== false} onChange={(e) => upd(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        {benefits.length === 0 && <div className="sc-empty-state">No benefits yet.</div>}
        <button className="sc-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Benefit</button>
      </div>
    </div>
  );
};

// WHY CHOOSE SECTION
const WhyChooseEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const points = data?.points || [];

  const add = () => u("points", [...points, { text: "", icon: "", isActive: true, order: points.length }]);
  const upd = (i, k, v) => { const a = [...points]; a[i] = { ...a[i], [k]: v }; u("points", a); };
  const rem = (i) => u("points", points.filter((_, idx) => idx !== i).map((p, idx) => ({ ...p, order: idx })));
  const mov = (i, d) => {
    const a = [...points]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("points", a.map((p, idx) => ({ ...p, order: idx })));
  };

  return (
    <div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-trophy" /> Why Choose Us Section</p>
        <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Why Choose Us?" /></Field>
        <Field label="Highlight Text">
  <Input
    value={data?.highlightText || ""}
    onChange={(e) => u("highlightText", e.target.value)}
    placeholder="Highlighted text..."
  />
</Field>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-list-check" /> Points ({points.length})</p>
        {points.map((pt, i) => (
          <SortableItem key={i} index={i} title={pt.text || `Point ${i + 1}`}
            onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)} defaultOpen>
            <div className="sc-grid-2">
              <Field label="Text"><Input value={pt.text} onChange={(e) => upd(i, "text", e.target.value)} placeholder="e.g. 10+ Years Experience" /></Field>
              <Field label="Icon Class">
                <div className="sc-icon-preview-row">
                  <i className={pt.icon || "bi bi-check-circle"} style={{ fontSize: 18, color: "#16a34a" }} />
                  <Input value={pt.icon || ""} onChange={(e) => upd(i, "icon", e.target.value)} placeholder="bi bi-check-circle" />
                </div>
              </Field>
            </div>
            <Toggle label="Active" checked={pt.isActive !== false} onChange={(e) => upd(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        {points.length === 0 && <div className="sc-empty-state">No points yet.</div>}
        <button className="sc-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Point</button>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-image" /> Section Image & Text</p>
        <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)} hint="Image shown beside the points list" />
        <Field label="Bottom Text" hint="Closing sentence below the points">
          <Textarea value={data?.bottomText || ""} onChange={(e) => u("bottomText", e.target.value)} rows={2} placeholder="Closing statement..." />
        </Field>
      </div>
    </div>
  );
};

// CTA SECTION
const CtaEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-megaphone" /> Call to Action Section</p>
      <Field label="Heading"><Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Ready to get started?" /></Field>
      <Field label="Description"><Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={2} placeholder="Short CTA description..." /></Field>
      <div className="sc-grid-2">
        <Field label="Button Text"><Input value={data?.buttonText || ""} onChange={(e) => u("buttonText", e.target.value)} placeholder="Contact Us" /></Field>
        <Field label="Button Link"><Input value={data?.buttonLink || ""} onChange={(e) => u("buttonLink", e.target.value)} placeholder="/contact" /></Field>
      </div>
      {/* CTA Preview */}
      <div className="sc-cta-preview">
        <div className="sc-cta-box">
          <p className="sc-cta-heading">{data?.heading || "Your CTA Heading"}</p>
          <p className="sc-cta-desc">{data?.description || "CTA description will appear here."}</p>
          {data?.buttonText && (
            <div className="sc-cta-btn">{data.buttonText}</div>
          )}
        </div>
      </div>
    </div>
  );
};

// SEO
const SeoEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-search" /> SEO Meta Tags</p>
      <Field label="Meta Title" hint="50–60 characters recommended">
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} maxLength={70} />
        <p className={`sc-char-count ${(data?.title || "").length > 60 ? "over" : ""}`}>{(data?.title || "").length}/70</p>
      </Field>
      <Field label="Meta Description" hint="150–160 characters recommended">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} maxLength={170} />
        <p className={`sc-char-count ${(data?.description || "").length > 160 ? "over" : ""}`}>{(data?.description || "").length}/170</p>
      </Field>
      <Field label="Canonical URL" hint="Leave blank to use default page URL">
        <Input value={data?.canonical || ""} onChange={(e) => u("canonical", e.target.value)} placeholder="https://yourdomain.com/solutions/..." />
      </Field>
      <Field label="Keywords (comma separated)">
        <Textarea value={(data?.keywords || []).join(", ")} rows={2} placeholder="cloud, infrastructure, solutions..."
          onChange={(e) => u("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
      </Field>
      {/* SERP Preview */}
      <div className="sc-serp-wrap">
        <p className="sc-serp-label"><i className="bi bi-google" /> Google SERP Preview</p>
        <div className="sc-serp-box">
          <p className="sc-serp-url">{data?.canonical || "https://yourdomain.com/solutions/slug"}</p>
          <p className="sc-serp-title">{data?.title || <span style={{ color: "#9ca3af" }}>Meta title not set...</span>}</p>
          <p className="sc-serp-desc">{data?.description || <span style={{ color: "#9ca3af" }}>Meta description will appear here...</span>}</p>
        </div>
        {(data?.keywords || []).length > 0 && (
          <div className="sc-kw-chips">
            {data.keywords.map((kw, i) => <span key={i} className="sc-kw-chip">{kw}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Full-page Preview ────────────────────────────────────────────────────────
const SolutionPreview = ({ formData }) => {
  const {
    hero = {},
    introSection = {},
    approachSection = {},
    frameworkSection = {},
    servicesSection = {},
    benefitsSection = {},
    whyChooseSection = {},
    ctaSection = {},
    seo = {},
  } = formData;

  const activeCards    = (approachSection.cards    || []).filter((c) => c.isActive !== false);
  const activeSteps    = (frameworkSection.steps   || []).filter((s) => s.isActive !== false);
  const activeServices = (servicesSection.services || []).filter((s) => s.isActive !== false);
  const activeBenefits = (benefitsSection.benefits || []).filter((b) => b.isActive !== false);
  const activePoints   = (whyChooseSection.points  || []).filter((p) => p.isActive !== false);

  return (
    <div className="scpv-wrap">
      {/* Browser chrome */}
      <div className="scpv-chrome">
        <div className="scpv-chrome-left">
          <div className="scpv-dots">
            <span className="scpv-dot r" /><span className="scpv-dot y" /><span className="scpv-dot g" />
          </div>
          <div className="scpv-url">yourdomain.com/solutions/{formData.slug || "slug"}</div>
        </div>
        <span className="scpv-chrome-label"><i className="bi bi-eye" /> Full Page Preview</span>
      </div>

      {/* ── HERO ── */}
      <div className="scpv-hero">
     
        <h1 className="scpv-hero-title">{hero.title || <span className="scpv-empty">Page title not set</span>}</h1>
        {hero.description && <p className="scpv-hero-desc">{hero.description}</p>}
           <div className="scpv-hero-bread">{hero.breadcrumb || "Home / Solutions"}</div>
      </div>

      {/* ── INTRO ── */}
      {(introSection.heading || (introSection.paragraphs || []).length > 0 || introSection.image) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-text-paragraph" /> Intro</div>
          <div className="scpv-two-col">
            <div>
              {introSection.heading && <h2 className="scpv-h2">{introSection.heading}</h2>}
              {(introSection.paragraphs || []).slice(0, 2).map((p, i) => (
                <p key={i} className="scpv-p">{p}</p>
              ))}
              {(introSection.paragraphs || []).length > 2 && (
                <p className="scpv-more">+{introSection.paragraphs.length - 2} more paragraphs</p>
              )}
            </div>
            <div className="scpv-img-col">
              {introSection.image ? (
                <img src={introSection.image} className="scpv-section-img" alt="" onError={(e) => (e.target.style.display = "none")} />
              ) : (
                <div className="scpv-img-placeholder"><i className="bi bi-image" /><span>No image</span></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── APPROACH ── */}
      {(approachSection.heading || activeCards.length > 0) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-grid-1x2" /> Approach</div>
          {approachSection.heading && <h2 className="scpv-h2" style={{ marginBottom: 16 }}>{approachSection.heading}</h2>}
          <div className="scpv-cards-grid">
            {activeCards.map((c, i) => (
              <div key={i} className="scpv-approach-card">
                <div className="scpv-card-icon-row">
                  <i className={c.icon || "bi bi-star"} />
                  <span className="scpv-card-title">{c.title}</span>
                </div>
                {c.description && <p className="scpv-p" style={{ marginTop: 6 }}>{c.description}</p>}
                {(c.points || []).length > 0 && (
                  <div className="scpv-point-list">
                    {c.points.slice(0, 3).map((pt, j) => (
                      <div key={j} className="scpv-point-chip">
                        <i className={pt.icon || "bi bi-check-circle"} />
                        <span>{pt.text}</span>
                      </div>
                    ))}
                    {c.points.length > 3 && <p className="scpv-more">+{c.points.length - 3} more</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
          {activeCards.length === 0 && <div className="scpv-empty">No active cards</div>}
        </div>
      )}

      {/* ── FRAMEWORK ── */}
      {(frameworkSection.heading || activeSteps.length > 0) && (
        <div className="scpv-section scpv-dark-section">
          <div className="scpv-sec-label" style={{ color: "#4ade80" }}><i className="bi bi-diagram-3" /> Framework</div>
          {frameworkSection.heading && <h2 className="scpv-h2" style={{ color: "#fff", marginBottom: 16 }}>{frameworkSection.heading}</h2>}
          {frameworkSection.description && <p className="scpv-p" style={{ color: "#d1fae5", marginBottom: 16 }}>{frameworkSection.description}</p>}
          <div className="scpv-steps-row">
            {activeSteps.map((s, i) => (
              <div key={i} className="scpv-step-card">
                <div className="scpv-step-num">{s.stepNumber || i + 1}</div>
                <div className="scpv-step-title">{s.title || `Step ${i + 1}`}</div>
                {(s.points || []).length > 0 && (
                  <ul className="scpv-step-points">
                    {s.points.slice(0, 2).map((pt, j) => <li key={j}>{pt}</li>)}
                    {s.points.length > 2 && <li style={{ opacity: .6 }}>+{s.points.length - 2} more</li>}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {frameworkSection.bottomText && <p className="scpv-p" style={{ color: "rgba(255,255,255,.5)", marginTop: 16, fontStyle: "italic" }}>{frameworkSection.bottomText}</p>}
        </div>
      )}

      {/* ── SERVICES ── */}
      {(servicesSection.heading || activeServices.length > 0) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-gear" /> Services</div>
          {servicesSection.heading && <h2 className="scpv-h2" style={{ marginBottom: 16 }}>{servicesSection.heading}</h2>}
          <div className="scpv-services-grid">
            {activeServices.map((s, i) => (
              <div key={i} className="scpv-service-card">
                {s.image ? (
                  <img src={s.image} className="scpv-service-img" alt="" onError={(e) => (e.target.style.display = "none")} />
                ) : (
                  <div className="scpv-service-img-ph"><i className="bi bi-image" /></div>
                )}
                <div className="scpv-service-body">
                  <p className="scpv-card-title">{s.title || `Service ${i + 1}`}</p>
                  {s.description && <p className="scpv-p" style={{ fontSize: 13 }}>{s.description.slice(0, 80)}{s.description.length > 80 ? "…" : ""}</p>}
                </div>
              </div>
            ))}
          </div>
          {activeServices.length === 0 && <div className="scpv-empty">No active services</div>}
        </div>
      )}

      {/* ── BENEFITS ── */}
      {(benefitsSection.heading || activeBenefits.length > 0) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-star" /> Benefits</div>
          {benefitsSection.heading && <h2 className="scpv-h2" style={{ marginBottom: 16 }}>{benefitsSection.heading}</h2>}
          <div className="scpv-benefits-grid">
            {activeBenefits.map((b, i) => (
              <div key={i} className="scpv-benefit-chip">
                <i className={b.icon || "bi bi-check-circle"} />
                <span>{b.title}</span>
              </div>
            ))}
          </div>
          {activeBenefits.length === 0 && <div className="scpv-empty">No active benefits</div>}
        </div>
      )}

      {/* ── WHY CHOOSE ── */}
      {(whyChooseSection.heading || activePoints.length > 0 || whyChooseSection.image) && (
        <div className="scpv-section">
          <div className="scpv-sec-label"><i className="bi bi-trophy" /> Why Choose Us</div>
          <div className="scpv-two-col">
            <div>
              {whyChooseSection.heading && <h2 className="scpv-h2">{whyChooseSection.heading}</h2>}
              {activePoints.map((pt, i) => (
                <div key={i} className="scpv-why-point">
                  <i className={pt.icon || "bi bi-check-circle"} />
                  <span>{pt.text}</span>
                </div>
              ))}
              {activePoints.length === 0 && <div className="scpv-empty">No active points</div>}
              {whyChooseSection.bottomText && <p className="scpv-p" style={{ marginTop: 10, fontStyle: "italic" }}>{whyChooseSection.bottomText}</p>}
            </div>
            <div className="scpv-img-col">
              {whyChooseSection.image ? (
                <img src={whyChooseSection.image} className="scpv-section-img" alt="" onError={(e) => (e.target.style.display = "none")} />
              ) : (
                <div className="scpv-img-placeholder"><i className="bi bi-image" /><span>No image</span></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      {(ctaSection.heading || ctaSection.description) && (
        <div className="scpv-section scpv-cta-section">
          <div className="scpv-sec-label" style={{ color: "#4ade80" }}><i className="bi bi-megaphone" /> CTA</div>
          <p className="scpv-cta-heading">{ctaSection.heading || <span className="scpv-empty">No CTA heading</span>}</p>
          {ctaSection.description && <p className="scpv-p" style={{ color: "#d1fae5" }}>{ctaSection.description}</p>}
          {ctaSection.buttonText && (
            <div className="scpv-cta-btn">{ctaSection.buttonText}</div>
          )}
        </div>
      )}

      {/* ── SEO ── */}
      <div className="scpv-section">
        <div className="scpv-sec-label"><i className="bi bi-search" /> SEO</div>
        <div className="sc-serp-box" style={{ maxWidth: 560 }}>
          <p className="sc-serp-url">yourdomain.com/solutions/{formData.slug || "slug"}</p>
          <p className="sc-serp-title">{seo.title || <span style={{ color: "#9ca3af" }}>Meta title not set</span>}</p>
          <p className="sc-serp-desc">{seo.description || <span style={{ color: "#9ca3af" }}>Meta description not set</span>}</p>
        </div>
      </div>
    </div>
  );
};


// ─── Main Editor Component ────────────────────────────────────────────────────
export default function SolutionEditor({ mode = "create", slug = null }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("meta");
  const [formData, setFormData]   = useState({ isPublished: true, order: 0 });
  const [loading, setLoading]     = useState(mode === "edit");
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState(null);
  const [unsaved, setUnsaved]     = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const toastRef = useRef(null);

  // ── Load existing on edit ─────────────────────────────────────────────────

  useEffect(() => {
    console.log("inside fucntion" , slug);
    if (mode !== "edit" || !slug) return;
    (async () => {
      try {
        const res = await getSolutionByIdServ(slug);
        if (res?.data?.success && res.data.data) {
          setFormData(res.data.data);
          setIsPublished(res.data.data.isPublished !== false);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [mode, slug]);

  


  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.name?.trim()) { showToast("Solution name is required.", "error"); setActiveTab("meta"); return; }
    if (!formData.slug?.trim()) { showToast("Slug is required.", "error"); setActiveTab("meta"); return; }

    setSaving(true);
    try {
      const payload = { ...formData, isPublished };
      let res;
      if (mode === "create") {
        res = await createSolutionServ(payload);
      } else {
        res = await updateSolutionServ(slug, payload);
      }

      if (res?.data?.success) {
        showToast(mode === "create" ? "Solution created successfully!" : "Solution updated successfully!");
        setUnsaved(false);
        if (mode === "create") setTimeout(() => router.push("/pages/solution"), 1200);
      } else {
        showToast(res?.data?.message || "Failed to save. Please try again.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Section updater ───────────────────────────────────────────────────────
  const update = (section, val) => {
    setFormData((prev) => ({ ...prev, [section]: val }));
    setUnsaved(true);
  };

  // ── Render editor tabs ────────────────────────────────────────────────────
  const renderEditor = () => {
    switch (activeTab) {
      case "meta":              return <MetaEditor data={formData} onChange={() => {}} formData={formData} setFormData={(updater) => { setFormData(updater); setUnsaved(true); }} />;
      case "hero":              return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
      case "introSection":     return <IntroEditor data={formData.introSection} onChange={(v) => update("introSection", v)} />;
      case "approachSection":  return <ApproachEditor data={formData.approachSection} onChange={(v) => update("approachSection", v)} />;
      case "frameworkSection": return <FrameworkEditor data={formData.frameworkSection} onChange={(v) => update("frameworkSection", v)} />;
      case "servicesSection":  return <ServicesEditor data={formData.servicesSection} onChange={(v) => update("servicesSection", v)} />;
      case "benefitsSection":  return <BenefitsEditor data={formData.benefitsSection} onChange={(v) => update("benefitsSection", v)} />;
      case "whyChooseSection": return <WhyChooseEditor data={formData.whyChooseSection} onChange={(v) => update("whyChooseSection", v)} />;
      case "ctaSection":       return <CtaEditor data={formData.ctaSection} onChange={(v) => update("ctaSection", v)} />;
      case "seo":              return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
      default: return null;
    }
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="sc-loading"><div className="sc-spinner" /><p>Loading solution...</p></div>
  );

  return (
    <>
      <style>{`
        /* ── Layout ── */
        .sc-content   { padding: 24px; background: #f9fafb; min-height: 60vh; }
        .sc-grid-2    { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .sc-grid-3    { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

        /* ── Blocks ── */
        .sc-section-block { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; margin-bottom: 18px; }
        .sc-block-title   { font-size: 13px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 6px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 7px; }
        .sc-block-title i { color: #16a34a; }
        .sc-section-hint  { font-size: 13px; color: #9ca3af; margin: 0 0 16px; }

        /* ── Fields ── */
        .sc-field   { margin-bottom: 16px; }
        .sc-field:last-child { margin-bottom: 0; }
        .sc-label   { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 5px; }
        .sc-hint    { font-size: 12px; color: #9ca3af; margin-top: 3px; }
        .sc-input   { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; transition: border .15s; box-sizing: border-box; }
        .sc-input:focus   { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .sc-textarea { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; resize: vertical; font-family: inherit; transition: border .15s; box-sizing: border-box; line-height: 1.6; }
        .sc-textarea:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .sc-char-count { font-size: 12px; color: #9ca3af; text-align: right; margin-top: 2px; }
        .sc-char-count.over { color: #ef4444; }

        /* ── Slug row ── */
        .sc-slug-row { display: flex; align-items: center; border: 1px solid #d1d5db; border-radius: 8px; overflow: hidden; background: #fff; }
        .sc-slug-row:focus-within { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .sc-slug-prefix { padding: 9px 10px; background: #f3f4f6; font-size: 13px; color: #9ca3af; white-space: nowrap; border-right: 1px solid #e5e7eb; }
        .sc-slug-row .sc-input { border: none; border-radius: 0; box-shadow: none; }
        .sc-slug-row .sc-input:focus { box-shadow: none; }

        /* ── Toggle ── */
        .sc-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
        .sc-switch     { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
        .sc-switch input { opacity: 0; width: 0; height: 0; }
        .sc-slider     { position: absolute; inset: 0; background: #d1d5db; border-radius: 24px; cursor: pointer; transition: .2s; }
        .sc-slider:before { content: ""; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
        .sc-switch input:checked + .sc-slider { background: #16a34a; }
        .sc-switch input:checked + .sc-slider:before { transform: translateX(18px); }

        /* ── Image upload ── */
        .sc-img-upload { display: flex; flex-direction: column; gap: 8px; }
        .sc-img-preview { position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .sc-img-preview img { width: 100%; height: 160px; object-fit: cover; display: block; }
        .sc-img-remove  { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.6); color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
        .sc-img-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 24px; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer; color: #9ca3af; font-size: 13px; text-align: center; }
        .sc-img-placeholder:hover { border-color: #16a34a; color: #16a34a; }
        .sc-img-placeholder i { font-size: 24px; }

        /* ── Sortable ── */
        .sc-list-item   { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 10px; overflow: hidden; }
        .sc-list-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; cursor: pointer; user-select: none; }
        .sc-list-header:hover { background: #eef0f2; }
        .sc-list-header-left { display: flex; align-items: center; gap: 8px; }
        .sc-chevron     { font-size: 12px; color: #6b7280; }
        .sc-list-title  { font-size: 13px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 8px; }
        .sc-list-actions { display: flex; gap: 4px; }
        .sc-list-actions button { padding: 4px 8px; border: 1px solid #d1d5db; background: #fff; border-radius: 5px; cursor: pointer; font-size: 13px; color: #6b7280; }
        .sc-list-actions button:hover { background: #f3f4f6; }
        .sc-list-actions button.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .sc-list-body   { padding: 14px; }

        /* ── Paragraphs ── */
        .sc-para-section { margin-bottom: 16px; }
        .sc-para-header  { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .sc-para-row     { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
        .sc-para-num     { width: 22px; height: 22px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #6b7280; flex-shrink: 0; margin-top: 10px; }
        .sc-point-row    { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }

        /* ── Inline add / icon buttons ── */
        .sc-add-inline-btn { display: flex; align-items: center; gap: 4px; padding: 4px 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #16a34a; font-size: 12px; font-weight: 600; cursor: pointer; }
        .sc-add-inline-btn:hover { background: #dcfce7; }
        .sc-add-btn  { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1.5px dashed #d1d5db; background: transparent; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; width: 100%; justify-content: center; transition: all .15s; margin-top: 4px; }
        .sc-add-btn:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .sc-icon-btn { padding: 8px 10px; border: 1px solid #d1d5db; background: #fff; border-radius: 7px; cursor: pointer; font-size: 14px; color: #6b7280; flex-shrink: 0; }
        .sc-icon-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .sc-icon-preview-row { display: flex; align-items: center; gap: 8px; }

        /* ── Step badge ── */
        .sc-step-badge { display: inline-block; font-size: 12px; font-weight: 700; padding: 2px 8px; background: #eff6ff; color: #1d4ed8; border-radius: 4px; }

        /* ── Sub-section ── */
        .sc-sub-section { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-top: 12px; }

        /* ── Empty state ── */
        .sc-empty-state { font-size: 13px; color: #9ca3af; font-style: italic; padding: 12px; background: #f9fafb; border-radius: 8px; border: 1px dashed #e5e7eb; text-align: center; margin-bottom: 8px; }

        /* ── CTA Preview ── */
        .sc-cta-preview { margin-top: 20px; }
        .sc-cta-box     { background: linear-gradient(135deg,#0f2618,#1a3c28); border-radius: 12px; padding: 28px; text-align: center; }
        .sc-cta-heading { font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 8px; }
        .sc-cta-desc    { font-size: 14px; color: #d1fae5; margin: 0 0 18px; }
        .sc-cta-btn     { display: inline-block; padding: 10px 28px; background: #16a34a; color: #fff; border-radius: 8px; font-size: 14px; font-weight: 600; }

        /* ── SEO ── */
        .sc-serp-wrap  { margin-top: 18px; }
        .sc-serp-label { font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .sc-serp-box   { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 18px; }
        .sc-serp-url   { font-size: 13px; color: #16a34a; margin: 0 0 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sc-serp-title { font-size: 17px; color: #1a0dab; font-weight: 500; margin: 0 0 3px; }
        .sc-serp-desc  { font-size: 13px; color: #4d5156; margin: 0; line-height: 1.5; }
        .sc-kw-chips   { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
        .sc-kw-chip    { font-size: 12px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 2px 9px; border-radius: 20px; }

        /* ── Toast ── */
        .sc-toast { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: scSlide .2s ease; }
        .sc-toast.success { background: #16a34a; color: #fff; }
        .sc-toast.error   { background: #ef4444; color: #fff; }
        @keyframes scSlide { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* ── Loading ── */
        .sc-loading  { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #6b7280; font-size: 16px; }
        .sc-spinner  { width: 32px; height: 32px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: scSpin .8s linear infinite; }
        @keyframes scSpin { to { transform: rotate(360deg); } }

        @media (max-width: 768px) {
          .sc-grid-2, .sc-grid-3 { grid-template-columns: 1fr; }
        }
        
         /* ── Preview divider ── */
        .sc-preview-divider { display: flex; align-items: center; gap: 12px; margin: 32px 0 0; padding-top: 8px; }
        .sc-preview-divider span { font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
        .sc-preview-divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .sc-preview-note { font-size: 13px; color: #9ca3af; text-transform: none; letter-spacing: 0; font-weight: 400 !important; }

        /* ══════════════════════════════════════
           SOLUTION PREVIEW STYLES
        ══════════════════════════════════════ */
        .scpv-wrap { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; margin-top: 32px; }

        /* Chrome bar */
        .scpv-chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .scpv-chrome-left { display: flex; align-items: center; gap: 10px; }
        .scpv-dots  { display: flex; gap: 5px; }
        .scpv-dot   { width: 10px; height: 10px; border-radius: 50%; }
        .scpv-dot.r { background: #f87171; }
        .scpv-dot.y { background: #fbbf24; }
        .scpv-dot.g { background: #4ade80; }
        .scpv-url   { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 14px; font-size: 13px; color: #6b7280; min-width: 220px; text-align: center; }
        .scpv-chrome-label { font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; display: flex; align-items: center; gap: 5px; }

        /* Hero */
        .scpv-hero { background: linear-gradient(135deg,#0f2618,#1e3d28); padding: 32px; text-align: center; }
        .scpv-hero-bread { font-size: 13px; color: rgba(255,255,255,.45); margin-bottom: 10px; }
        .scpv-hero-title { font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .scpv-hero-desc  { font-size: 15px; color: #d1fae5; margin: 0 auto; max-width: 500px; }

        /* Generic section */
        .scpv-section { padding: 28px 32px; border-top: 1px solid #f3f4f6; }
        .scpv-sec-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 14px; display: flex; align-items: center; gap: 5px; }
        .scpv-h2    { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px; }
        .scpv-p     { font-size: 14px; color: #6b7280; margin: 0 0 8px; line-height: 1.6; }
        .scpv-more  { font-size: 13px; color: #9ca3af; font-style: italic; }
        .scpv-empty { font-size: 13px; color: #d1d5db; font-style: italic; padding: 8px 0; }

        /* Two col */
        .scpv-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .scpv-img-col { display: flex; align-items: flex-start; }
        .scpv-section-img { width: 100%; border-radius: 10px; object-fit: cover; max-height: 200px; }
        .scpv-img-placeholder { width: 100%; min-height: 140px; background: #f3f4f6; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #d1d5db; font-size: 13px; }
        .scpv-img-placeholder i { font-size: 28px; }

        /* Approach cards */
        .scpv-cards-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
        .scpv-approach-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
        .scpv-card-icon-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .scpv-card-icon-row i { font-size: 18px; color: #16a34a; }
        .scpv-card-title { font-size: 14px; font-weight: 600; color: #111827; }
        .scpv-point-list { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
        .scpv-point-chip { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #374151; }
        .scpv-point-chip i { font-size: 13px; color: #16a34a; }

        /* Framework / dark section */
        .scpv-dark-section { background: #0f2618; border-top: none; }
        .scpv-steps-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
        .scpv-step-card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 14px; }
        .scpv-step-num  { width: 28px; height: 28px; background: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .scpv-step-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 6px; }
        .scpv-step-points { padding-left: 14px; margin: 0; }
        .scpv-step-points li { font-size: 12px; color: rgba(255,255,255,.55); margin-bottom: 3px; }

        /* Services grid */
        .scpv-services-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
        .scpv-service-card  { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .scpv-service-img   { width: 100%; height: 100px; object-fit: cover; display: block; }
        .scpv-service-img-ph { width: 100%; height: 100px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #d1d5db; font-size: 24px; }
        .scpv-service-body  { padding: 10px 12px; }

        /* Benefits grid */
        .scpv-benefits-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .scpv-benefit-chip  { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #374151; padding: 6px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; }
        .scpv-benefit-chip i { color: #16a34a; font-size: 14px; }

        /* Why choose points */
        .scpv-why-point { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #374151; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
        .scpv-why-point i { color: #16a34a; font-size: 15px; }

        /* CTA section */
        .scpv-cta-section { background: linear-gradient(135deg,#0f2618,#1a3c28); border-top: none; }
        .scpv-cta-heading { font-size: 22px; font-weight: 700; color: #fff; margin: 0 0 8px; }
        .scpv-cta-btn { display: inline-block; padding: 10px 28px; background: #16a34a; color: #fff; border-radius: 8px; font-size: 14px; font-weight: 600; margin-top: 14px; }

        @media (max-width: 640px) {
          .scpv-two-col, .scpv-cards-grid { grid-template-columns: 1fr; }
          .scpv-steps-row { grid-template-columns: repeat(2,1fr); }
          .scpv-services-grid { grid-template-columns: repeat(2,1fr); }
        }

      `}</style>

      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle={mode === "create" ? "Create Solution" : (formData.name || "Edit Solution")}
        pageSubtitle={mode === "create" ? "Fill in the sections below to create a new solution page" : `Editing: /${formData.slug || "..."}`}
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl={formData.slug ? `/solutions/${formData.slug}` : undefined}
        backUrl="/pages/solution"
      >
        <div className="sc-content">
          {renderEditor()}
        </div>
       
       <div className="sc-preview-divider">
            <span><i className="bi bi-eye" /> Page Preview</span>
            <div className="sc-preview-divider-line" />
            <span className="sc-preview-note">Updates as you edit any section above</span>
          </div>

          <SolutionPreview formData={formData} />

      </CmsTabs>

      {toast && (
        <div className={`sc-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"} />
          {toast.msg}
        </div>
      )}
    </>
  );
}