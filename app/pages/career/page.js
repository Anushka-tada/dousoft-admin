"use client";
import React, { useState, useEffect, useRef } from "react";
import CmsTabs from "../../Components/CmsTabs";
import { getCareerPageServ, createCareerPageServ } from "@/app/services/pages.service";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: "hero",           label: "Hero",            icon: "bi bi-image" },
  { key: "intro",          label: "Join Team",       icon: "bi bi-people" },
  { key: "valuesSection",  label: "Values",          icon: "bi bi-stars" },
  { key: "benefitsSection",label: "Benefits",        icon: "bi bi-gift" },
  { key: "hiringProcess",  label: "Hiring Process",  icon: "bi bi-list-check" },
  { key: "joinCTA",        label: "Join CTA",        icon: "bi bi-rocket" },
  { key: "seo",            label: "SEO",             icon: "bi bi-search" },
];

// ─── Shared primitives (same pattern as About page) ──────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="cr-field">
    <label className="cr-label">{label}</label>
    {children}
    {hint && <p className="cr-hint">{hint}</p>}
  </div>
);

const Input  = (props) => <input className="cr-input" {...props} />;
const Textarea = ({ rows = 3, ...props }) => <textarea className="cr-textarea" rows={rows} {...props} />;

const Toggle = ({ label, checked, onChange }) => (
  <div className="cr-toggle-row">
    <span className="cr-label">{label}</span>
    <label className="cr-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="cr-slider" />
    </label>
  </div>
);

const ImageUpload = ({ label, value, onChange, hint }) => (
  <Field label={label} hint={hint}>
    <div className="cr-img-upload">
      {value ? (
        <div className="cr-img-preview">
          <img src={value} alt="preview" onError={(e) => (e.target.style.display = "none")} />
          <button className="cr-img-remove" onClick={() => onChange("")}>
            <i className="bi bi-x" />
          </button>
        </div>
      ) : (
        <label className="cr-img-placeholder">
          <i className="bi bi-cloud-upload" />
          <span>Click to upload</span>
          <input type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files[0]; if (f) onChange(URL.createObjectURL(f)); }} />
        </label>
      )}
      <input className="cr-input" style={{ marginTop: 8 }}
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
    <div className="cr-list-item">
      <div className="cr-list-header" onClick={() => setOpen((p) => !p)}>
        <div className="cr-list-header-left">
          <i className={`bi bi-chevron-${open ? "down" : "right"} cr-chevron`} />
          <span className="cr-list-title">{title || `Item ${index + 1}`}</span>
        </div>
        <div className="cr-list-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={onMoveUp}   title="Move up">  <i className="bi bi-arrow-up" />   </button>
          <button onClick={onMoveDown} title="Move down"><i className="bi bi-arrow-down" />  </button>
          <button onClick={onDelete}   className="danger"><i className="bi bi-trash" />      </button>
        </div>
      </div>
      {open && <div className="cr-list-body">{children}</div>}
    </div>
  );
};

// ─── Section Editors ──────────────────────────────────────────────────────────

// 1. HERO
const HeroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="cr-section-block">
      <p className="cr-block-title"><i className="bi bi-image" /> Hero / Banner Section</p>
      <p className="cr-section-hint">Top banner shown on the Careers page.</p>
      <Field label="Page Heading" hint='e.g. "Careers at Dousoft"'>
        <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Join Our Team" />
      </Field>
      <Field label="Breadcrumb" hint='e.g. "Home / Careers"'>
        <Input value={data?.breadcrumb || ""} onChange={(e) => u("breadcrumb", e.target.value)} placeholder="Home / Careers" />
      </Field>
      <Field label="Short Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)}
          placeholder="Brief description shown in the hero banner..." rows={3} />
      </Field>
    </div>
  );
};

// 2. INTRO / JOIN TEAM
const IntroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const paragraphs = data?.paragraphs || [];
  const addPara  = ()      => u("paragraphs", [...paragraphs, ""]);
  const updPara  = (i, v)  => { const a = [...paragraphs]; a[i] = v; u("paragraphs", a); };
  const remPara  = (i)     => u("paragraphs", paragraphs.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="cr-section-block">
        <p className="cr-block-title"><i className="bi bi-people" /> Join Team Section</p>
        <Field label="Section Heading">
          <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)}
            placeholder="Why Work With Us?" />
        </Field>

        {/* Paragraphs */}
        <div className="cr-para-section">
          <div className="cr-para-header">
            <label className="cr-label">Description Paragraphs</label>
            <button className="cr-add-inline-btn" onClick={addPara}>
              <i className="bi bi-plus-circle" /> Add Paragraph
            </button>
          </div>
          <p className="cr-hint" style={{ marginBottom: 10 }}>Each entry = one paragraph on the page.</p>
          {paragraphs.map((p, i) => (
            <div key={i} className="cr-para-row">
              <div className="cr-para-num">{i + 1}</div>
              <Textarea value={p} onChange={(e) => updPara(i, e.target.value)}
                rows={2} placeholder={`Paragraph ${i + 1}...`} style={{ flex: 1 }} />
              <button className="cr-icon-btn danger" onClick={() => remPara(i)}><i className="bi bi-trash" /></button>
            </div>
          ))}
          {paragraphs.length === 0 && (
            <div className="cr-empty-state">No paragraphs yet. Click &ldquo;Add Paragraph&ldquo; above.</div>
          )}
        </div>

        <div className="cr-grid-2">
          <Field label="Button Text">
            <Input value={data?.buttonText || ""} onChange={(e) => u("buttonText", e.target.value)}
              placeholder="View Open Positions" />
          </Field>
          <Field label="Button Link">
            <Input value={data?.buttonLink || ""} onChange={(e) => u("buttonLink", e.target.value)}
              placeholder="#jobs" />
          </Field>
        </div>

        <ImageUpload label="Section Image" value={data?.image} onChange={(v) => u("image", v)}
          hint="Recommended: 600×500px" />
      </div>
    </div>
  );
};

// 3. VALUES
const ValuesEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const values = data?.values || [];

  const addValue = () => u("values", [...values, {
    title: "", icon: "", points: [], order: values.length, isActive: true
  }]);
  const updValue = (i, k, v) => { const a = [...values]; a[i] = { ...a[i], [k]: v }; u("values", a); };
  const remValue = (i) => u("values", values.filter((_, idx) => idx !== i).map((v, idx) => ({ ...v, order: idx })));
  const movValue = (i, d) => {
    const a = [...values]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("values", a.map((v, idx) => ({ ...v, order: idx })));
  };

  return (
    <div>
      <div className="cr-section-block">
        <p className="cr-block-title"><i className="bi bi-stars" /> Section Header</p>
        <div className="cr-grid-2">
          <Field label="Section Heading">
            <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)}
              placeholder="Our Core Values" />
          </Field>
          <Field label="Subheading">
            <Input value={data?.subheading || ""} onChange={(e) => u("subheading", e.target.value)}
              placeholder="What drives us every day" />
          </Field>
        </div>
      </div>

      <div className="cr-section-block">
        <p className="cr-block-title"><i className="bi bi-card-list" /> Value Cards ({values.length})</p>
        {values.map((val, i) => (
          <SortableItem key={i} index={i}
            title={val.title || `Value ${i + 1}`}
            onMoveUp={() => movValue(i, -1)} onMoveDown={() => movValue(i, 1)} onDelete={() => remValue(i)}>
            <div className="cr-grid-2">
              <Field label="Title">
                <Input value={val.title} onChange={(e) => updValue(i, "title", e.target.value)}
                  placeholder="e.g. Innovation" />
              </Field>
              <Field label="Icon Class" hint="Bootstrap Icons class">
                <div className="cr-icon-preview-row">
                  <i className={val.icon || "bi bi-star"} style={{ fontSize: 19, color: "#16a34a", flexShrink: 0 }} />
                  <Input value={val.icon} onChange={(e) => updValue(i, "icon", e.target.value)}
                    placeholder="bi bi-lightbulb" />
                </div>
              </Field>
            </div>

            {/* Points — one per line */}
            <Field label="Points (one per line)" hint="Each line = one bullet point">
              <Textarea
                value={(val.points || []).join("\n")}
                onChange={(e) => updValue(i, "points", e.target.value.split("\n").filter(Boolean))}
                rows={4} placeholder={"We embrace new ideas\nWe challenge the status quo\n..."} />
            </Field>

            <Toggle label="Active" checked={val.isActive !== false}
              onChange={(e) => updValue(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        {values.length === 0 && <div className="cr-empty-state">No values yet. Add your first value below.</div>}
        <button className="cr-add-btn" onClick={addValue}><i className="bi bi-plus-circle" /> Add Value</button>
      </div>
    </div>
  );
};

// 4. BENEFITS
const BenefitsEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const benefits = data?.benefits || [];

  const addBenefit = () => u("benefits", [...benefits, {
    title: "", description: "", icon: "", order: benefits.length, isActive: true
  }]);
  const updBenefit = (i, k, v) => { const a = [...benefits]; a[i] = { ...a[i], [k]: v }; u("benefits", a); };
  const remBenefit = (i) => u("benefits", benefits.filter((_, idx) => idx !== i).map((b, idx) => ({ ...b, order: idx })));
  const movBenefit = (i, d) => {
    const a = [...benefits]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("benefits", a.map((b, idx) => ({ ...b, order: idx })));
  };

  return (
    <div>
      <div className="cr-section-block">
        <p className="cr-block-title"><i className="bi bi-gift" /> Section Header</p>
        <Field label="Section Heading">
          <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)}
            placeholder="Perks & Benefits" />
        </Field>
      </div>

      <div className="cr-section-block">
        <p className="cr-block-title"><i className="bi bi-card-checklist" /> Benefit Cards ({benefits.length})</p>
        {benefits.map((b, i) => (
          <SortableItem key={i} index={i}
            title={b.title || `Benefit ${i + 1}`}
            onMoveUp={() => movBenefit(i, -1)} onMoveDown={() => movBenefit(i, 1)} onDelete={() => remBenefit(i)}>
            <div className="cr-grid-2">
              <Field label="Title">
                <Input value={b.title} onChange={(e) => updBenefit(i, "title", e.target.value)}
                  placeholder="e.g. Health Insurance" />
              </Field>
              <Field label="Icon Class">
                <div className="cr-icon-preview-row">
                  <i className={b.icon || "bi bi-heart"} style={{ fontSize: 19, color: "#16a34a", flexShrink: 0 }} />
                  <Input value={b.icon} onChange={(e) => updBenefit(i, "icon", e.target.value)}
                    placeholder="bi bi-heart" />
                </div>
              </Field>
            </div>
            <Field label="Description">
              <Textarea value={b.description} onChange={(e) => updBenefit(i, "description", e.target.value)}
                rows={2} placeholder="Brief description of this benefit..." />
            </Field>
            <Toggle label="Active" checked={b.isActive !== false}
              onChange={(e) => updBenefit(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        {benefits.length === 0 && <div className="cr-empty-state">No benefits yet. Add your first benefit below.</div>}
        <button className="cr-add-btn" onClick={addBenefit}><i className="bi bi-plus-circle" /> Add Benefit</button>
      </div>
    </div>
  );
};

// 5. HIRING PROCESS
const HiringProcessEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const steps = data?.steps || [];

  const addStep = () => u("steps", [...steps, {
    question: "", answer: "", order: steps.length, isActive: true
  }]);
  const updStep = (i, k, v) => { const a = [...steps]; a[i] = { ...a[i], [k]: v }; u("steps", a); };
  const remStep = (i) => u("steps", steps.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, order: idx })));
  const movStep = (i, d) => {
    const a = [...steps]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    u("steps", a.map((s, idx) => ({ ...s, order: idx })));
  };

  return (
    <div>
      <div className="cr-section-block">
        <p className="cr-block-title"><i className="bi bi-list-check" /> Section Header</p>
        <div className="cr-grid-2">
          <Field label="Section Heading">
            <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)}
              placeholder="Our Hiring Process" />
          </Field>
          <Field label="Subheading">
            <Input value={data?.subheading || ""} onChange={(e) => u("subheading", e.target.value)}
              placeholder="Simple, transparent, and fair" />
          </Field>
        </div>
      </div>

      <div className="cr-section-block">
        <p className="cr-block-title"><i className="bi bi-question-circle" /> Process Steps ({steps.length})</p>
        <p className="cr-hint" style={{ marginBottom: 14 }}>Displayed as an accordion / FAQ-style on the page.</p>

        {/* Step number strip */}
        {steps.length > 0 && (
          <div className="cr-steps-strip">
            {steps.filter((s) => s.isActive !== false).map((s, i) => (
              <div key={i} className="cr-step-strip-item">
                <div className="cr-step-strip-num">{i + 1}</div>
                <div className="cr-step-strip-label">{s.question ? s.question.slice(0, 18) + (s.question.length > 18 ? "…" : "") : `Step ${i + 1}`}</div>
              </div>
            ))}
          </div>
        )}

        {steps.map((s, i) => (
          <SortableItem key={i} index={i}
            title={<span><span className="cr-step-badge">{i + 1}</span> {s.question ? s.question.slice(0, 50) + (s.question.length > 50 ? "…" : "") : `Step ${i + 1}`}</span>}
            onMoveUp={() => movStep(i, -1)} onMoveDown={() => movStep(i, 1)} onDelete={() => remStep(i)}
            defaultOpen={i === 0}>
            <Field label="Question / Step Title">
              <Input value={s.question} onChange={(e) => updStep(i, "question", e.target.value)}
                placeholder="e.g. Application Review" />
            </Field>
            <Field label="Answer / Step Description">
              <Textarea value={s.answer} onChange={(e) => updStep(i, "answer", e.target.value)}
                rows={3} placeholder="Describe what happens in this step..." />
            </Field>
            <Toggle label="Active" checked={s.isActive !== false}
              onChange={(e) => updStep(i, "isActive", e.target.checked)} />
          </SortableItem>
        ))}
        {steps.length === 0 && <div className="cr-empty-state">No steps yet. Add your first hiring step below.</div>}
        <button className="cr-add-btn" onClick={addStep}><i className="bi bi-plus-circle" /> Add Step</button>
      </div>
    </div>
  );
};

// 6. JOIN CTA
const JoinCTAEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="cr-section-block">
      <p className="cr-block-title"><i className="bi bi-rocket" /> Join CTA Section</p>
      <p className="cr-section-hint">Bottom call-to-action with contact info.</p>
      <Field label="Heading">
        <Input value={data?.heading || ""} onChange={(e) => u("heading", e.target.value)}
          placeholder="Ready to Join Us?" />
      </Field>
      <Field label="Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)}
          rows={3} placeholder="Describe what makes your company a great place to work..." />
      </Field>
      <div className="cr-grid-2">
        <Field label="Contact Email">
          <Input type="email" value={data?.email || ""} onChange={(e) => u("email", e.target.value)}
            placeholder="careers@dousoft.com" />
        </Field>
        <Field label="Office Address">
          <Input value={data?.address || ""} onChange={(e) => u("address", e.target.value)}
            placeholder="123 Tech Park, Bhopal" />
        </Field>
      </div>
      <Field label="Bottom Text" hint="Small text shown at the very bottom of the CTA">
        <Input value={data?.bottomText || ""} onChange={(e) => u("bottomText", e.target.value)}
          placeholder="We're always looking for talented people." />
      </Field>

      {/* Inline CTA preview */}
      {/* {(data?.heading || data?.email) && (
        <div className="cr-cta-preview">
          <p className="cr-cta-preview-heading">{data?.heading || "Heading not set"}</p>
          {data?.description && <p className="cr-cta-preview-desc">{data.description}</p>}
          <div className="cr-cta-preview-meta">
            {data?.email   && <span><i className="bi bi-envelope" /> {data.email}</span>}
            {data?.address && <span><i className="bi bi-geo-alt"  /> {data.address}</span>}
          </div>
          {data?.bottomText && <p className="cr-cta-preview-bottom">{data.bottomText}</p>}
        </div>
      )} */}
    </div>
  );
};

// 7. SEO
const SeoEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const descLen = (data?.description || "").length;
  return (
    <div className="cr-section-block">
      <p className="cr-block-title"><i className="bi bi-search" /> SEO Meta Tags</p>
      <Field label="Meta Title" hint="Recommended: 50–60 characters">
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} maxLength={70} />
        <p className={`cr-char-count ${(data?.title || "").length > 60 ? "over" : ""}`}>{(data?.title || "").length}/70</p>
      </Field>
      <Field label="Meta Description" hint="Recommended: 150–160 characters">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} maxLength={170} />
        <p className={`cr-char-count ${descLen > 160 ? "over" : ""}`}>{descLen}/170</p>
      </Field>
      <Field label="Keywords (comma separated)">
        <Textarea value={(data?.keywords || []).join(", ")} rows={2}
          placeholder="careers, jobs, software developer, ..."
          onChange={(e) => u("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
      </Field>
      <div className="cr-serp-wrap">
        <p className="cr-serp-label"><i className="bi bi-google" /> Google SERP Preview</p>
        <div className="cr-serp-box">
          <p className="cr-serp-url">https://yourdomain.com/careers</p>
          <p className="cr-serp-title">{data?.title || <span style={{ color: "#9ca3af" }}>Meta title not set...</span>}</p>
          <p className="cr-serp-desc">{data?.description || <span style={{ color: "#9ca3af" }}>Meta description will appear here...</span>}</p>
        </div>
        {(data?.keywords || []).length > 0 && (
          <div className="cr-kw-chips">
            {data.keywords.map((kw, i) => <span key={i} className="cr-kw-chip">{kw}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Full Page Preview ────────────────────────────────────────────────────────
const CareerPreview = ({ formData }) => {
  const {
    hero = {}, intro = {}, valuesSection = {},
    benefitsSection = {}, hiringProcess = {}, joinCTA = {}, seo = {}
  } = formData;

  const [openStep, setOpenStep] = useState(null);
  const activeValues   = (valuesSection?.values   || []).filter((v) => v.isActive !== false);
  const activeBenefits = (benefitsSection?.benefits || []).filter((b) => b.isActive !== false);
  const activeSteps    = (hiringProcess?.steps     || []).filter((s) => s.isActive !== false);

  return (
    <div className="crpv-wrap">
      {/* Browser chrome */}
      <div className="crpv-chrome">
        <div className="crpv-chrome-left">
          <div className="crpv-dots">
            <span className="crpv-dot r"/><span className="crpv-dot y"/><span className="crpv-dot g"/>
          </div>
          <div className="crpv-url">yourdomain.com/careers</div>
        </div>
        <span className="crpv-chrome-label"><i className="bi bi-eye" /> Full Page Preview</span>
      </div>

      {/* ── HERO ── */}
      <div className="crpv-hero">   
        <h1 className="crpv-hero-title">{hero.heading || <span className="crpv-empty">Heading not set</span>}</h1>
        {hero.description && <p className="crpv-hero-desc">{hero.description}</p>}
         <div className="crpv-hero-bread">{hero.breadcrumb || "Home / Careers"}</div>
      </div>

      {/* ── INTRO ── */}
      <div className="crpv-section">
        <div className="crpv-sec-label"><i className="bi bi-people" /> Join Team</div>
        <div className="crpv-two-col">
          <div>
            <h2 className="crpv-h2">{intro.heading || <span className="crpv-empty">No heading</span>}</h2>
            {(intro.paragraphs || []).slice(0, 2).map((p, i) => (
              <p key={i} className="crpv-p">{p}</p>
            ))}
            {(intro.paragraphs || []).length > 2 && (
              <p className="crpv-more">+{intro.paragraphs.length - 2} more paragraphs</p>
            )}
            {intro.buttonText && (
              <div className="crpv-btn">{intro.buttonText}</div>
            )}
          </div>
          <div className="crpv-img-col">
            {intro.image ? (
              <img src={intro.image} className="crpv-section-img" alt=""
                onError={(e) => (e.target.style.display = "none")} />
            ) : (
              <div className="crpv-img-placeholder"><i className="bi bi-image" /><span>No image</span></div>
            )}
          </div>
        </div>
      </div>

      {/* ── VALUES ── */}
      {activeValues.length > 0 && (
        <div className="crpv-section">
          <div className="crpv-sec-label"><i className="bi bi-stars" /> Values</div>
          {valuesSection.heading && <h2 className="crpv-h2">{valuesSection.heading}</h2>}
          {valuesSection.subheading && <p className="crpv-p">{valuesSection.subheading}</p>}
          <div className="crpv-cards-grid">
            {activeValues.map((val, i) => (
              <div key={i} className="crpv-value-card">
                <div className="crpv-card-icon">
                  <i className={val.icon || "bi bi-star"} />
                </div>
                <p className="crpv-card-title">{val.title}</p>
                {(val.points || []).length > 0 && (
                  <ul className="crpv-points">
                    {val.points.slice(0, 3).map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                    {val.points.length > 3 && <li className="crpv-more">+{val.points.length - 3} more</li>}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BENEFITS ── */}
      {activeBenefits.length > 0 && (
        <div className="crpv-section crpv-benefits-section">
          <div className="crpv-sec-label" style={{ color: "#4ade80" }}><i className="bi bi-gift" /> Benefits</div>
          {benefitsSection.heading && <h2 className="crpv-h2" >{benefitsSection.heading}</h2>}
          <div className="crpv-benefits-grid">
            {activeBenefits.map((b, i) => (
              <div key={i} className="crpv-benefit-card">
                <i className={b.icon || "bi bi-check-circle"} />
                <div>
                  <p className="crpv-benefit-title">{b.title}</p>
                  {b.description && <p className="crpv-benefit-desc">{b.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── HIRING PROCESS ── */}
      {activeSteps.length > 0 && (
        <div className="crpv-section">
          <div className="crpv-sec-label"><i className="bi bi-list-check" /> Hiring Process</div>
          {hiringProcess.heading    && <h2 className="crpv-h2">{hiringProcess.heading}</h2>}
          {hiringProcess.subheading && <p className="crpv-p">{hiringProcess.subheading}</p>}
          <div className="crpv-accordion">
            {activeSteps.map((s, i) => (
              <div key={i} className={`crpv-acc-item ${openStep === i ? "open" : ""}`}>
                <div className="crpv-acc-header" onClick={() => setOpenStep(openStep === i ? null : i)}>
                  <div className="crpv-acc-left">
                    <span className="crpv-acc-num">{i + 1}</span>
                    <span className="crpv-acc-question">{s.question}</span>
                  </div>
                  <i className={`bi bi-chevron-${openStep === i ? "up" : "down"}`} />
                </div>
                {openStep === i && (
                  <div className="crpv-acc-body">{s.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── JOIN CTA ── */}
      {(joinCTA.heading || joinCTA.email) && (
        <div className="crpv-section crpv-cta-section">
          <div className="crpv-sec-label" style={{ color: "#4ade80" }}><i className="bi bi-rocket" /> Join CTA</div>
          <h2 className="crpv-h2" style={{ color: "#fff" }}>{joinCTA.heading}</h2>
          {joinCTA.description && <p className="crpv-p" style={{ color: "#d1fae5" }}>{joinCTA.description}</p>}
          <div className="crpv-cta-meta">
            {joinCTA.email   && <span><i className="bi bi-envelope" /> {joinCTA.email}</span>}
            {joinCTA.address && <span><i className="bi bi-geo-alt"  /> {joinCTA.address}</span>}
          </div>
          {joinCTA.bottomText && <p className="crpv-cta-bottom">{joinCTA.bottomText}</p>}
        </div>
      )}

      {/* ── SEO ── */}
      <div className="crpv-section">
        <div className="crpv-sec-label"><i className="bi bi-search" /> SEO</div>
        <div className="cr-serp-box" style={{ maxWidth: 560 }}>
          <p className="cr-serp-url">yourdomain.com/careers</p>
          <p className="cr-serp-title">{seo.title || <span style={{ color: "#9ca3af" }}>Meta title not set</span>}</p>
          <p className="cr-serp-desc">{seo.description || <span style={{ color: "#9ca3af" }}>Meta description not set</span>}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CareerAdminPage() {
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
        const res = await getCareerPageServ();
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
      const res = await createCareerPageServ({ ...formData, isPublished });
      if (res.data?.success) { showToast("Career page saved successfully!", "success"); setUnsaved(false); }
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
      case "hero":            return <HeroEditor           data={formData.hero}            onChange={(v) => update("hero", v)} />;
      case "intro":           return <IntroEditor          data={formData.intro}           onChange={(v) => update("intro", v)} />;
      case "valuesSection":   return <ValuesEditor         data={formData.valuesSection}   onChange={(v) => update("valuesSection", v)} />;
      case "benefitsSection": return <BenefitsEditor       data={formData.benefitsSection} onChange={(v) => update("benefitsSection", v)} />;
      case "hiringProcess":   return <HiringProcessEditor  data={formData.hiringProcess}   onChange={(v) => update("hiringProcess", v)} />;
      case "joinCTA":         return <JoinCTAEditor        data={formData.joinCTA}         onChange={(v) => update("joinCTA", v)} />;
      case "seo":             return <SeoEditor            data={formData.seo}             onChange={(v) => update("seo", v)} />;
      default: return null;
    }
  };

  if (loading) return (
    <div className="cr-loading"><div className="cr-spinner" /><p>Loading Career Page...</p></div>
  );

  return (
    <>
      <style>{`
        /* ── Layout ── */
        .cr-content  { padding: 24px; background: #f9fafb; min-height: 60vh; }
        .cr-grid-2   { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .cr-grid-3   { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

        /* ── Blocks ── */
        .cr-section-block { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; margin-bottom: 18px; }
        .cr-block-title   { font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 6px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 7px; }
        .cr-block-title i { color: #16a34a; }
        .cr-section-hint  { font-size: 14px; color: #9ca3af; margin: 0 0 16px; }

        /* ── Fields ── */
        .cr-field  { margin-bottom: 16px; }
        .cr-field:last-child { margin-bottom: 0; }
        .cr-label  { display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .cr-hint   { font-size: 13px; color: #9ca3af; margin-top: 4px; }
        .cr-input  { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; color: #111827; background: #fff; outline: none; transition: border .15s; box-sizing: border-box; }
        .cr-input:focus  { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .cr-textarea { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; color: #111827; background: #fff; outline: none; resize: vertical; font-family: inherit; transition: border .15s; box-sizing: border-box; line-height: 1.6; }
        .cr-textarea:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .cr-char-count { font-size: 13px; color: #9ca3af; text-align: right; margin-top: 3px; }
        .cr-char-count.over { color: #ef4444; }

        /* ── Image upload ── */
        .cr-img-upload { display: flex; flex-direction: column; gap: 8px; }
        .cr-img-preview { position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .cr-img-preview img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .cr-img-remove  { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.6); color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; }
        .cr-img-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 28px; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer; color: #9ca3af; font-size: 13px; text-align: center; transition: border .15s; }
        .cr-img-placeholder:hover { border-color: #16a34a; color: #16a34a; }
        .cr-img-placeholder i { font-size: 26px; }

        /* ── Toggle ── */
        .cr-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
        .cr-switch     { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
        .cr-switch input { opacity: 0; width: 0; height: 0; }
        .cr-slider     { position: absolute; inset: 0; background: #d1d5db; border-radius: 24px; cursor: pointer; transition: .2s; }
        .cr-slider:before { content: ""; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
        .cr-switch input:checked + .cr-slider { background: #16a34a; }
        .cr-switch input:checked + .cr-slider:before { transform: translateX(18px); }

        /* ── Sortable ── */
        .cr-list-item     { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
        .cr-list-header   { display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; cursor: pointer; user-select: none; }
        .cr-list-header:hover { background: #eef0f2; }
        .cr-list-header-left { display: flex; align-items: center; gap: 8px; }
        .cr-chevron       { font-size: 13px; color: #6b7280; }
        .cr-list-title    { font-size: 14px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 8px; }
        .cr-list-actions  { display: flex; gap: 5px; }
        .cr-list-actions button { padding: 5px 9px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-size: 14px; color: #6b7280; transition: all .15s; }
        .cr-list-actions button:hover { background: #f3f4f6; }
        .cr-list-actions button.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .cr-list-body     { padding: 16px; }

        /* ── Paragraphs ── */
        .cr-para-section { margin-bottom: 16px; }
        .cr-para-header  { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .cr-para-row     { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
        .cr-para-num     { width: 24px; height: 24px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #6b7280; flex-shrink: 0; margin-top: 10px; }
        .cr-add-inline-btn { display: flex; align-items: center; gap: 5px; padding: 5px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #16a34a; font-size: 13px; font-weight: 600; cursor: pointer; }
        .cr-add-inline-btn:hover { background: #dcfce7; }

        /* ── Buttons ── */
        .cr-add-btn  { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1.5px dashed #d1d5db; background: transparent; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; width: 100%; justify-content: center; transition: all .15s; margin-top: 4px; }
        .cr-add-btn:hover  { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .cr-icon-btn { padding: 9px 11px; border: 1px solid #d1d5db; background: #fff; border-radius: 8px; cursor: pointer; font-size: 15px; color: #6b7280; flex-shrink: 0; }
        .cr-icon-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .cr-icon-preview-row { display: flex; align-items: center; gap: 8px; }

        /* ── Steps strip ── */
        .cr-steps-strip { display: flex; gap: 0; overflow-x: auto; padding: 12px 0 18px; margin-bottom: 14px; position: relative; }
        .cr-step-strip-item { display: flex; flex-direction: column; align-items: center; min-width: 80px; flex: 1; position: relative; }
        .cr-step-strip-item:not(:last-child):after { content: ""; position: absolute; top: 14px; left: 50%; right: -50%; height: 2px; background: #e5e7eb; z-index: 0; }
        .cr-step-strip-num   { width: 28px; height: 28px; background: #16a34a; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; z-index: 1; margin-bottom: 6px; }
        .cr-step-strip-label { font-size: 11px; color: #6b7280; text-align: center; }
        .cr-step-badge { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; background: #dcfce7; color: #15803d; border-radius: 50%; font-size: 12px; font-weight: 700; flex-shrink: 0; }

        /* ── CTA inline preview ── */
        .cr-cta-preview { margin-top: 18px; padding: 20px; background: #0f2618; border-radius: 10px; }
        .cr-cta-preview-heading { font-size: 18px; font-weight: 700; color: #fff; margin: 0 0 8px; }
        .cr-cta-preview-desc    { font-size: 14px; color: #d1fae5; margin: 0 0 12px; }
        .cr-cta-preview-meta    { display: flex; gap: 16px; flex-wrap: wrap; font-size: 14px; color: #4ade80; margin-bottom: 10px; }
        .cr-cta-preview-meta i  { margin-right: 5px; }
        .cr-cta-preview-bottom  { font-size: 13px; color: rgba(255,255,255,.45); margin: 0; }

        /* ── SEO ── */
        .cr-serp-wrap  { margin-top: 20px; }
        .cr-serp-label { font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .cr-serp-box   { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; }
        .cr-serp-url   { font-size: 14px; color: #16a34a; margin: 0 0 4px; }
        .cr-serp-title { font-size: 18px; color: #1a0dab; font-weight: 500; margin: 0 0 4px; }
        .cr-serp-desc  { font-size: 14px; color: #4d5156; margin: 0; line-height: 1.5; }
        .cr-kw-chips   { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .cr-kw-chip    { font-size: 13px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 3px 10px; border-radius: 20px; }

        /* ── Empty / misc ── */
        .cr-empty-state { font-size: 14px; color: #9ca3af; font-style: italic; padding: 14px; background: #f9fafb; border-radius: 8px; border: 1px dashed #e5e7eb; text-align: center; }
        .cr-preview-divider { display: flex; align-items: center; gap: 12px; margin: 32px 0 0; padding-top: 8px; }
        .cr-preview-divider span { font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
        .cr-preview-divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .cr-preview-note { font-size: 13px; color: #9ca3af; text-transform: none !important; letter-spacing: 0 !important; font-weight: 400 !important; }

        /* ── Toast ── */
        .cr-toast { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: crSlide .2s ease; }
        .cr-toast.success { background: #16a34a; color: #fff; }
        .cr-toast.error   { background: #ef4444; color: #fff; }
        @keyframes crSlide { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* ── Loading ── */
        .cr-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #6b7280; font-size: 16px; }
        .cr-spinner { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: crSpin .8s linear infinite; }
        @keyframes crSpin { to { transform: rotate(360deg); } }

        /* ══ PREVIEW STYLES ══════════════════════════════ */
        .crpv-wrap { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; margin-top: 32px; }
        .crpv-chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .crpv-chrome-left { display: flex; align-items: center; gap: 10px; }
        .crpv-dots { display: flex; gap: 5px; }
        .crpv-dot  { width: 10px; height: 10px; border-radius: 50%; }
        .crpv-dot.r { background: #f87171; } .crpv-dot.y { background: #fbbf24; } .crpv-dot.g { background: #4ade80; }
        .crpv-url  { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 14px; font-size: 13px; color: #6b7280; min-width: 220px; text-align: center; }
        .crpv-chrome-label { font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; display: flex; align-items: center; gap: 5px; }
        .crpv-hero { background: linear-gradient(135deg,#0f2618,#1e3d28); padding: 32px; text-align: center; }
        .crpv-hero-bread  { font-size: 13px; color: rgba(255,255,255,.45); margin-bottom: 10px; }
        .crpv-hero-title  { font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .crpv-hero-desc   { font-size: 15px; color: #d1fae5; margin: 0 auto; max-width: 500px; }
        .crpv-section { padding: 28px 32px; border-top: 1px solid #f3f4f6; }
        .crpv-sec-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 14px; display: flex; align-items: center; gap: 5px; }
        .crpv-h2  { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px; }
        .crpv-p   { font-size: 14px; color: #6b7280; margin: 0 0 8px; line-height: 1.6; }
        .crpv-more { font-size: 13px; color: #9ca3af; font-style: italic; }
        .crpv-empty { color: #d1d5db; font-style: italic; }
        .crpv-btn { display: inline-block; margin-top: 10px; padding: 8px 20px; background: #16a34a; color: #fff; border-radius: 8px; font-size: 14px; font-weight: 600; }
        .crpv-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .crpv-img-col { display: flex; align-items: flex-start; }
        .crpv-section-img { width: 100%; border-radius: 10px; object-fit: cover; max-height: 200px; }
        .crpv-img-placeholder { width: 100%; min-height: 140px; background: #f3f4f6; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #d1d5db; font-size: 13px; }
        .crpv-img-placeholder i { font-size: 28px; }
        .crpv-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; margin-top: 16px; }
        .crpv-value-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
        .crpv-card-icon  { width: 36px; height: 36px; background: #dcfce7; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #16a34a; margin-bottom: 10px; }
        .crpv-card-title { font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 8px; }
        .crpv-points     { padding-left: 16px; margin: 0; }
        .crpv-points li  { font-size: 13px; color: #6b7280; margin-bottom: 3px; }
        .crpv-benefits-section { background: #e1f3e8; border-top: none; }
        .crpv-benefits-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(396px, 1fr)); gap: 12px; margin-top: 16px; }
        .crpv-benefit-card { display: flex; gap: 12px; align-items: flex-start; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 14px; }
        .crpv-benefit-card i { font-size: 20px; color: #4ade80; flex-shrink: 0; margin-top: 2px; }
        .crpv-benefit-title { font-size: 14px; font-weight: 600; color: #000; margin: 0 0 4px; }
        .crpv-benefit-desc  { font-size: 13px; color: #000; margin: 0; }
        .crpv-accordion { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
        .crpv-acc-item  { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .crpv-acc-item.open { border-color: #16a34a; }
        .crpv-acc-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; cursor: pointer; background: #f9fafb; }
        .crpv-acc-item.open .crpv-acc-header { background: #f0fdf4; }
        .crpv-acc-left   { display: flex; align-items: center; gap: 10px; }
        .crpv-acc-num    { width: 24px; height: 24px; background: #16a34a; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .crpv-acc-question { font-size: 14px; font-weight: 600; color: #111827; }
        .crpv-acc-body   { padding: 14px 16px; font-size: 14px; color: #6b7280; line-height: 1.6; border-top: 1px solid #e5e7eb; background: #fff; }
        .crpv-cta-section { background: #0f2618; }
        .crpv-cta-meta   { display: flex; gap: 16px; flex-wrap: wrap; font-size: 14px; color: #4ade80; margin: 12px 0; }
        .crpv-cta-meta i { margin-right: 5px; }
        .crpv-cta-bottom { font-size: 13px; color: rgba(255,255,255,.45); margin: 0; }
        @media (max-width: 640px) {
          .crpv-two-col { grid-template-columns: 1fr; }
          .cr-grid-2, .cr-grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle="Career Page"
        pageSubtitle="Manage all sections of your Career page"
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl="/careers"
      >
        <div className="cr-content">
          {renderEditor()}

          <div className="cr-preview-divider">
            <span><i className="bi bi-eye" /> Page Preview</span>
            <div className="cr-preview-divider-line" />
            <span className="cr-preview-note">Updates as you edit any section above</span>
          </div>

          <CareerPreview formData={formData} />
        </div>
      </CmsTabs>

      {toast && (
        <div className={`cr-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"} />
          {toast.msg}
        </div>
      )}
    </>
  );
}