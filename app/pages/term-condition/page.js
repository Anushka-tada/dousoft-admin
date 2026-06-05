"use client";
import React, { useState, useEffect, useRef } from "react";
import CmsTabs from "../../Components/CmsTabs";
import { createTermsConditionServ, getTermsConditionServ } from "@/app/services/pages.service";
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
  { key: "hero",           label: "Hero",         icon: "bi bi-image" },
  { key: "introduction",   label: "Introduction", icon: "bi bi-text-paragraph" },
  { key: "sections",       label: "Sections",     icon: "bi bi-list-ul" },
  { key: "contactSection", label: "Contact CTA",  icon: "bi bi-envelope" },
  { key: "seo",            label: "SEO",          icon: "bi bi-search" },
];

// ─── Shared Primitives ────────────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="tc-field">
    <label className="tc-label">{label}</label>
    {children}
    {hint && <p className="tc-hint">{hint}</p>}
  </div>
);
const Input    = (props) => <input className="tc-input" {...props} />;
const Textarea = ({ rows = 3, ...props }) => <textarea className="tc-textarea" rows={rows} {...props} />;

const SortableItem = ({ index, onMoveUp, onMoveDown, onDelete, title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="tc-list-item">
      <div className="tc-list-header" onClick={() => setOpen((p) => !p)}>
        <div className="tc-list-header-left">
          <i className={`bi bi-chevron-${open ? "down" : "right"} tc-chevron`} />
          <span className="tc-list-title">{title || `Item ${index + 1}`}</span>
        </div>
        <div className="tc-list-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={onMoveUp}   title="Move up">  <i className="bi bi-arrow-up" /></button>
          <button onClick={onMoveDown} title="Move down"><i className="bi bi-arrow-down" /></button>
          <button onClick={onDelete}   className="danger" title="Delete"><i className="bi bi-trash" /></button>
        </div>
      </div>
      {open && <div className="tc-list-body">{children}</div>}
    </div>
  );
};

// ─── Section Editors ──────────────────────────────────────────────────────────

// 1. HERO
const HeroEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="tc-section-block">
      <p className="tc-block-title"><i className="bi bi-image" /> Hero / Banner</p>
      <p className="tc-section-hint">Top banner of the Terms & Conditions page.</p>
      <Field label="Page Title" hint='e.g. "Terms and Conditions"'>
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Terms and Conditions" />
      </Field>
      <Field label="Subtitle / Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={2} placeholder="Please read these terms carefully before using our services." />
      </Field>
      <Field label="Breadcrumb" hint='e.g. "Home > Terms and Conditions"'>
        <Input value={data?.breadcrumb || ""} onChange={(e) => u("breadcrumb", e.target.value)} placeholder="Home > Terms and Conditions" />
      </Field>
    </div>
  );
};

// 2. INTRODUCTION
const IntroductionEditor = ({ data, onChange }) => (
  <div className="tc-section-block">
    <p className="tc-block-title"><i className="bi bi-text-paragraph" /> Introduction Paragraph</p>
    <p className="tc-section-hint">This paragraph appears right below the hero, before the main sections. Usually covers effective date, overview, etc.</p>
    <Field label="Introduction Text">
      <Textarea
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="Welcome to our Terms and Conditions. By accessing or using our services, you agree to be bound by these terms..."
      />
    </Field>
    <div className="tc-char-preview">
      <span className="tc-char-count">{(data || "").length} characters</span>
      {(data || "").length > 800 && <span className="tc-char-warn">Long intro — consider splitting into sections</span>}
    </div>
  </div>
);

// 3. SECTIONS — the main dynamic content
const SectionsEditor = ({ data, onChange }) => {
  const sections = data || [];

  const addSection = () => {
    onChange([...sections, {
      id: `section-${Date.now()}`,
      title: "",
      subTitle: "",
      content: [],
      lists: [],
    }]);
  };

  const updSection = (i, k, v) => {
    const a = [...sections];
    a[i] = { ...a[i], [k]: v };
    onChange(a);
  };

  const remSection = (i) => onChange(sections.filter((_, idx) => idx !== i));

  const movSection = (i, d) => {
    const a = [...sections];
    const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    onChange(a);
  };

  // Content paragraphs
  const addPara = (i) => updSection(i, "content", [...(sections[i].content || []), ""]);
  const updPara = (i, pi, v) => {
    const c = [...(sections[i].content || [])];
    c[pi] = v;
    updSection(i, "content", c);
  };
  const remPara = (i, pi) => updSection(i, "content", sections[i].content.filter((_, idx) => idx !== pi));

  // Lists within section
  const addList = (i) => updSection(i, "lists", [...(sections[i].lists || []), { title: "", items: [] }]);
  const updList = (i, li, k, v) => {
    const ls = [...(sections[i].lists || [])];
    ls[li] = { ...ls[li], [k]: v };
    updSection(i, "lists", ls);
  };
  const remList = (i, li) => updSection(i, "lists", sections[i].lists.filter((_, idx) => idx !== li));

  // Items inside a list
  const addListItem  = (i, li) => {
    const ls = [...(sections[i].lists || [])];
    ls[li] = { ...ls[li], items: [...(ls[li].items || []), ""] };
    updSection(i, "lists", ls);
  };
  const updListItem  = (i, li, ii, v) => {
    const ls = [...(sections[i].lists || [])];
    const items = [...(ls[li].items || [])];
    items[ii] = v;
    ls[li] = { ...ls[li], items };
    updSection(i, "lists", ls);
  };
  const remListItem  = (i, li, ii) => {
    const ls = [...(sections[i].lists || [])];
    ls[li] = { ...ls[li], items: ls[li].items.filter((_, idx) => idx !== ii) };
    updSection(i, "lists", ls);
  };

  return (
    <div>
      {/* Section count bar */}
      <div className="tc-sections-topbar">
        <div className="tc-sections-count">
          <i className="bi bi-list-ul" />
          <span>{sections.length} section{sections.length !== 1 ? "s" : ""}</span>
        </div>
        <button className="tc-add-section-btn" onClick={addSection}>
          <i className="bi bi-plus-circle" /> Add Section
        </button>
      </div>

      {sections.length === 0 && (
        <div className="tc-empty-hero">
          <i className="bi bi-file-text" />
          <p>No sections yet</p>
          <span>Click &#34;Add Section&#34; to create your first Terms section</span>
          <button className="tc-add-btn" onClick={addSection} style={{ marginTop: 12, width: "auto", padding: "10px 24px" }}>
            <i className="bi bi-plus-circle" /> Add First Section
          </button>
        </div>
      )}

      {sections.map((sec, i) => (
        <SortableItem
          key={sec.id || i}
          index={i}
          title={
            <span className="tc-section-item-title">
              <span className="tc-section-num">{i + 1}</span>
              {sec.title || `Section ${i + 1}`}
            </span>
          }
          onMoveUp={() => movSection(i, -1)}
          onMoveDown={() => movSection(i, 1)}
          onDelete={() => remSection(i)}
          defaultOpen={i === 0}
        >
          {/* Section ID + Headings */}
          <div className="tc-inner-block">
            {/* <p className="tc-inner-title">Section Identity</p> */}
            <div className="tc-grid-3">
              {/* <Field label="Section ID" hint="URL anchor (no spaces), e.g. intellectual-property">
                <Input
                  value={sec.id || ""}
                  onChange={(e) => updSection(i, "id", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="section-id"
                />
              </Field> */}
              <Field label="Title (H2)">
                <Input value={sec.title || ""} onChange={(e) => updSection(i, "title", e.target.value)} placeholder="Section Heading" />
              </Field>
              <Field label="Sub Title (H3)" hint="Optional">
                <Input value={sec.subTitle || ""} onChange={(e) => updSection(i, "subTitle", e.target.value)} placeholder="Optional sub-heading" />
              </Field>
            </div>
          </div>

          {/* Content paragraphs */}
          <div className="tc-inner-block">
            <div className="tc-inner-header">
              <p className="tc-inner-title">Paragraphs ({(sec.content || []).length})</p>
              <button className="tc-add-inline-btn" onClick={() => addPara(i)}>
                <i className="bi bi-plus-circle" /> Add Paragraph
              </button>
            </div>
            {(sec.content || []).map((para, pi) => (
              <div key={pi} className="tc-para-row">
                <div className="tc-para-badge">{pi + 1}</div>
                <Textarea
                  value={para}
                  onChange={(e) => updPara(i, pi, e.target.value)}
                  rows={2}
                  placeholder={`Paragraph ${pi + 1}...`}
                  style={{ flex: 1 }}
                />
                <button className="tc-icon-btn danger" onClick={() => remPara(i, pi)} title="Remove">
                  <i className="bi bi-trash" />
                </button>
              </div>
            ))}
            {(sec.content || []).length === 0 && (
              <div className="tc-empty-state">No paragraphs yet.</div>
            )}
          </div>

          {/* Lists (You may / You may not) */}
          <div className="tc-inner-block">
            <div className="tc-inner-header">
              <p className="tc-inner-title">Lists ({(sec.lists || []).length})</p>
              <button className="tc-add-inline-btn" onClick={() => addList(i)}>
                <i className="bi bi-plus-circle" /> Add List
              </button>
            </div>
            <p className="tc-hint" style={{ marginBottom: 10 }}>Use for &ldquo;You may:&ldquo; / &#34;You may not:&ldquo; style bullet lists.</p>

            {(sec.lists || []).map((lst, li) => (
              <div key={li} className="tc-list-inner">
                <div className="tc-list-inner-header">
                  <Field label={`List ${li + 1} Title`} hint='e.g. "You may:" or "Restrictions:"'>
                    <Input
                      value={lst.title || ""}
                      onChange={(e) => updList(i, li, "title", e.target.value)}
                      placeholder="You may:"
                    />
                  </Field>
                  <button className="tc-icon-btn danger" style={{ marginTop: 22, flexShrink: 0 }} onClick={() => remList(i, li)}>
                    <i className="bi bi-trash" />
                  </button>
                </div>

                {/* List items */}
                <div className="tc-list-items-wrap">
                  {(lst.items || []).map((item, ii) => (
                    <div key={ii} className="tc-listitem-row">
                      <i className="bi bi-dot tc-list-dot" />
                      <Input
                        value={item}
                        onChange={(e) => updListItem(i, li, ii, e.target.value)}
                        placeholder={`Item ${ii + 1}`}
                        style={{ flex: 1 }}
                      />
                      <button className="tc-icon-btn danger sm" onClick={() => remListItem(i, li, ii)}>
                        <i className="bi bi-x" />
                      </button>
                    </div>
                  ))}
                  <button className="tc-add-list-item-btn" onClick={() => addListItem(i, li)}>
                    <i className="bi bi-plus" /> Add Item
                  </button>
                </div>
              </div>
            ))}
            {(sec.lists || []).length === 0 && (
              <div className="tc-empty-state">No lists in this section.</div>
            )}
          </div>
        </SortableItem>
      ))}

      {sections.length > 0 && (
        <button className="tc-add-btn" onClick={addSection}>
          <i className="bi bi-plus-circle" /> Add Another Section
        </button>
      )}
    </div>
  );
};

// 4. CONTACT CTA
const ContactSectionEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="tc-section-block">
      <p className="tc-block-title"><i className="bi bi-envelope" /> Contact CTA Section</p>
      <p className="tc-section-hint">Shown at the bottom of the page — usually &ldquo;Have questions? Contact us.&ldquo;</p>
      <Field label="Section Title">
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Have Questions?" />
      </Field>
      <Field label="Description">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3}
          placeholder="If you have any questions about these terms, please feel free to contact us." />
      </Field>
      <div className="tc-grid-2">
        <Field label="Button Text">
          <Input value={data?.buttonText || ""} onChange={(e) => u("buttonText", e.target.value)} placeholder="Contact Us" />
        </Field>
        <Field label="Button Link">
          <Input value={data?.buttonLink || ""} onChange={(e) => u("buttonLink", e.target.value)} placeholder="/contact-us" />
        </Field>
      </div>

      {/* Inline preview */}
      {(data?.title || data?.description) && (
        <div className="tc-contact-preview">
          <p className="tc-preview-label"><i className="bi bi-eye" /> Preview</p>
          <div className="tc-contact-preview-inner">
            <h3>{data?.title || "Section Title"}</h3>
            <p>{data?.description}</p>
            {data?.buttonText && <span className="tc-preview-btn">{data.buttonText} →</span>}
          </div>
        </div>
      )}
    </div>
  );
};

// 5. SEO
const SeoEditor = ({ data, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const descLen = (data?.description || "").length;
  return (
    <div className="tc-section-block">
      <p className="tc-block-title"><i className="bi bi-search" /> SEO Meta Tags</p>
      <Field label="Meta Title" hint="50–60 characters recommended">
        <Input value={data?.title || ""} onChange={(e) => u("title", e.target.value)} maxLength={70} />
        <p className={`tc-char-count ${(data?.title || "").length > 60 ? "over" : ""}`}>{(data?.title || "").length}/70</p>
      </Field>
      <Field label="Meta Description" hint="150–160 characters recommended">
        <Textarea value={data?.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} maxLength={170} />
        <p className={`tc-char-count ${descLen > 160 ? "over" : ""}`}>{descLen}/170</p>
      </Field>
      <Field label="Keywords (comma separated)">
        <Textarea value={(data?.keywords || []).join(", ")} rows={2} placeholder="terms and conditions, legal, usage policy, ..."
          onChange={(e) => u("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
      </Field>
      {/* SERP Preview */}
      <div className="tc-serp-wrap">
        <p className="tc-serp-label"><i className="bi bi-google" /> Google SERP Preview</p>
        <div className="tc-serp-box">
          <p className="tc-serp-url">yourdomain.com/terms-and-conditions</p>
          <p className="tc-serp-title">{data?.title || <span className="tc-serp-empty">Meta title not set...</span>}</p>
          <p className="tc-serp-desc">{data?.description || <span className="tc-serp-empty">Meta description will appear here...</span>}</p>
        </div>
        {(data?.keywords || []).length > 0 && (
          <div className="tc-kw-chips">
            {data.keywords.map((kw, i) => <span key={i} className="tc-kw-chip">{kw}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Full-page Preview ────────────────────────────────────────────────────────
const TermsPreview = ({ formData }) => {
  const {
    hero = {},
    introduction = "",
    sections = [],
    contactSection = {},
    seo = {},
  } = formData;

  const [activeAnchor, setActiveAnchor] = useState(null);
  const activeSections = sections.filter((s) => s.title);

  return (
    <div className="tcpv-wrap">
      {/* Browser chrome */}
      <div className="tcpv-chrome">
        <div className="tcpv-chrome-left">
          <div className="tcpv-dots">
            <span className="tcpv-dot r" /><span className="tcpv-dot y" /><span className="tcpv-dot g" />
          </div>
          <div className="tcpv-url">yourdomain.com/terms-and-conditions</div>
        </div>
        <span className="tcpv-chrome-label"><i className="bi bi-eye" /> Full Page Preview</span>
      </div>

      {/* ── HERO ── */}
      <div className="tcpv-hero">
        {hero.breadcrumb && <div className="tcpv-bread">{hero.breadcrumb}</div>}
        <h1 className="tcpv-hero-title">{hero.title || <span className="tcpv-empty">Page title not set</span>}</h1>
        {hero.description && <p className="tcpv-hero-desc">{hero.description}</p>}
      </div>

      {/* ── TWO COLUMN LAYOUT: TOC + CONTENT ── */}
      <div className="tcpv-body">

        {/* Sticky table of contents (left) */}
        {activeSections.length > 0 && (
          <aside className="tcpv-toc">
            <div className="tcpv-toc-inner">
              <p className="tcpv-toc-heading"><i className="bi bi-list-ul" /> Contents</p>
              <ul className="tcpv-toc-list">
                {activeSections.map((sec, i) => (
                  <li key={i}>
                    <button
                      className={`tcpv-toc-item ${activeAnchor === sec.id ? "active" : ""}`}
                      onClick={() => setActiveAnchor(sec.id)}
                    >
                      <span className="tcpv-toc-num">{i + 1}</span>
                      {sec.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Main content (right) */}
        <main className="tcpv-main">
          {/* Introduction */}
          {introduction && (
            <div className="tcpv-intro">
              <p className="tcpv-intro-text">{introduction}</p>
            </div>
          )}

          {/* Sections */}
          {activeSections.length === 0 && !introduction && (
            <div className="tcpv-no-content">
              <i className="bi bi-file-text" />
              <p>No sections added yet</p>
              <span>Add sections from the &#34;Sections&#34; tab</span>
            </div>
          )}

          {sections.map((sec, i) => (
            <div
              key={i}
              id={sec.id}
              className={`tcpv-section ${activeAnchor === sec.id ? "highlighted" : ""}`}
            >
              {/* Section number + title */}
              <div className="tcpv-sec-heading">
                <span className="tcpv-sec-num">{i + 1}</span>
                <div>
                  <h2 className="tcpv-h2">{sec.title || `Section ${i + 1}`}</h2>
                  {sec.subTitle && <h3 className="tcpv-h3">{sec.subTitle}</h3>}
                </div>
              </div>

              {/* Paragraphs */}
              {(sec.content || []).map((para, pi) => (
                <p key={pi} className="tcpv-para">{para}</p>
              ))}

              {/* Lists */}
              {(sec.lists || []).map((lst, li) => (
                <div key={li} className="tcpv-list-block">
                  {lst.title && <p className="tcpv-list-title">{lst.title}</p>}
                  <ul className="tcpv-list">
                    {(lst.items || []).map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                    {(lst.items || []).length === 0 && (
                      <li className="tcpv-empty-item">No items added</li>
                    )}
                  </ul>
                </div>
              ))}

              {/* Empty section indicator */}
              {!(sec.content || []).length && !(sec.lists || []).length && (
                <p className="tcpv-sec-empty">No content added for this section yet.</p>
              )}
            </div>
          ))}

          {/* Contact CTA */}
          {(contactSection.title || contactSection.description) && (
            <div className="tcpv-contact">
              <div className="tcpv-contact-inner">
                <h2 className="tcpv-contact-title">{contactSection.title || "Have Questions?"}</h2>
                {contactSection.description && (
                  <p className="tcpv-contact-desc">{contactSection.description}</p>
                )}
                {contactSection.buttonText && (
                  <span className="tcpv-contact-btn">{contactSection.buttonText} →</span>
                )}
              </div>
            </div>
          )}

          {/* SEO row */}
          {seo.title && (
            <div className="tcpv-seo-row">
              <span className="tcpv-seo-tag"><i className="bi bi-search" /> {seo.title}</span>
              {(seo.keywords || []).slice(0, 4).map((kw, i) => (
                <span key={i} className="tcpv-seo-kw">{kw}</span>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TermsAdminPage() {
  const [activeTab,    setActiveTab]    = useState("hero");
  const [formData,     setFormData]     = useState({});
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [toast,        setToast]        = useState(null);
  const [isPublished,  setIsPublished]  = useState(true);
  const [unsaved,      setUnsaved]      = useState(false);
  const toastRef = useRef(null);



  useEffect(() => {
    (async () => {
      try {
        const res = await getTermsConditionServ();
       setFormData(res?.data?.data); setIsPublished(res.data.isPublished !== false); 
        
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
      const res = await createTermsConditionServ(payload);
      if (res.data.success) { showToast("Terms page saved successfully!", "success"); setUnsaved(false); }
      else showToast("Failed to save. Please try again.", "error");
    } catch { showToast("Network error.", "error"); }
    finally { setSaving(false); }
  };

  const update = (section, val) => {
    setFormData((prev) => ({ ...prev, [section]: val }));
    setUnsaved(true);
  };

  const renderEditor = () => {
    switch (activeTab) {
      case "hero":           return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
      case "introduction":   return <IntroductionEditor data={formData.introduction} onChange={(v) => update("introduction", v)} />;
      case "sections":       return <SectionsEditor data={formData.sections} onChange={(v) => update("sections", v)} />;
      case "contactSection": return <ContactSectionEditor data={formData.contactSection} onChange={(v) => update("contactSection", v)} />;
      case "seo":            return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
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
        .tc-content      { padding: 24px; background: #f9fafb; min-height: 60vh; }
        .tc-grid-2       { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .tc-grid-3       { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

        /* ── Section blocks ── */
        .tc-section-block  { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; margin-bottom: 18px; }
        .tc-block-title    { font-size: 13px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 6px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 7px; }
        .tc-block-title i  { color: #16a34a; }
        .tc-section-hint   { font-size: 13px; color: #9ca3af; margin: 0 0 16px; line-height: 1.5; }

        /* ── Fields ── */
        .tc-field      { margin-bottom: 16px; }
        .tc-field:last-child { margin-bottom: 0; }
        .tc-label      { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .tc-hint       { font-size: 12px; color: #9ca3af; margin-top: 4px; }
        .tc-input      { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; transition: border .15s; box-sizing: border-box; }
        .tc-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .tc-textarea   { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; resize: vertical; font-family: inherit; transition: border .15s; box-sizing: border-box; line-height: 1.6; }
        .tc-textarea:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
        .tc-char-count { font-size: 12px; color: #9ca3af; text-align: right; margin-top: 3px; }
        .tc-char-count.over { color: #ef4444; }
        .tc-char-preview { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; }
        .tc-char-warn  { font-size: 11px; color: #d97706; background: #fef3c7; padding: 2px 10px; border-radius: 10px; }

        /* ── Sections topbar ── */
        .tc-sections-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .tc-sections-count  { display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600; color: #374151; }
        .tc-sections-count i { color: #16a34a; font-size: 16px; }
        .tc-add-section-btn { display: flex; align-items: center; gap: 6px; padding: 9px 18px; background: #16a34a; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .15s; }
        .tc-add-section-btn:hover { background: #15803d; }

        /* ── Empty hero ── */
        .tc-empty-hero  { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; background: #fff; border: 1.5px dashed #e5e7eb; border-radius: 12px; text-align: center; gap: 8px; }
        .tc-empty-hero i { font-size: 36px; color: #d1d5db; }
        .tc-empty-hero p { font-size: 16px; font-weight: 600; color: #374151; margin: 0; }
        .tc-empty-hero span { font-size: 13px; color: #9ca3af; }

        /* ── Sortable list items ── */
        .tc-list-item      { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 14px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.04); }
        .tc-list-header    { display: flex; align-items: center; justify-content: space-between; padding: 13px 18px; background: #f9fafb; border-bottom: 1px solid #f3f4f6; cursor: pointer; user-select: none; }
        .tc-list-header:hover { background: #f3f4f6; }
        .tc-list-header-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .tc-chevron        { font-size: 11px; color: #6b7280; flex-shrink: 0; }
        .tc-list-title     { font-size: 13px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 8px; min-width: 0; }
        .tc-section-item-title { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .tc-section-num    { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: #16a34a; color: #fff; border-radius: 50%; font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .tc-list-actions   { display: flex; gap: 5px; flex-shrink: 0; }
        .tc-list-actions button { padding: 5px 9px; border: 1px solid #e5e7eb; background: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; color: #6b7280; transition: all .15s; }
        .tc-list-actions button:hover { background: #f3f4f6; }
        .tc-list-actions button.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .tc-list-body      { padding: 18px; display: flex; flex-direction: column; gap: 14px; }

        /* ── Inner blocks (inside section) ── */
        .tc-inner-block    { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 10px; padding: 16px; }
        .tc-inner-header   { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .tc-inner-title    { font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; margin: 0 0 12px; }
        .tc-inner-header .tc-inner-title { margin: 0; }

        /* ── Para rows ── */
        .tc-para-row       { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
        .tc-para-badge     { width: 22px; height: 22px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #6b7280; flex-shrink: 0; margin-top: 10px; }

        /* ── List-within-section ── */
        .tc-list-inner        { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; margin-bottom: 10px; }
        .tc-list-inner-header { display: flex; align-items: flex-end; gap: 10px; margin-bottom: 10px; }
        .tc-list-inner-header .tc-field { flex: 1; margin: 0; }
        .tc-list-items-wrap   { display: flex; flex-direction: column; gap: 6px; padding-left: 4px; }
        .tc-listitem-row      { display: flex; align-items: center; gap: 8px; }
        .tc-list-dot          { font-size: 20px; color: #16a34a; flex-shrink: 0; line-height: 1; }
        .tc-add-list-item-btn { display: flex; align-items: center; gap: 5px; padding: 6px 12px; background: #f0fdf4; border: 1px dashed #bbf7d0; border-radius: 6px; color: #16a34a; font-size: 12px; font-weight: 600; cursor: pointer; margin-top: 4px; width: fit-content; }
        .tc-add-list-item-btn:hover { background: #dcfce7; }

        /* ── Shared buttons ── */
        .tc-add-inline-btn { display: flex; align-items: center; gap: 5px; padding: 5px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #16a34a; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; }
        .tc-add-inline-btn:hover { background: #dcfce7; }
        .tc-add-btn        { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1.5px dashed #d1d5db; background: transparent; border-radius: 8px; cursor: pointer; font-size: 13px; color: #6b7280; width: 100%; justify-content: center; transition: all .15s; margin-top: 4px; }
        .tc-add-btn:hover  { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .tc-icon-btn       { padding: 9px 11px; border: 1px solid #e5e7eb; background: #fff; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; flex-shrink: 0; }
        .tc-icon-btn.sm    { padding: 5px 8px; font-size: 13px; }
        .tc-icon-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
        .tc-empty-state    { font-size: 13px; color: #9ca3af; font-style: italic; padding: 12px; background: #f9fafb; border-radius: 8px; border: 1px dashed #e5e7eb; text-align: center; }

        /* ── Contact CTA preview ── */
        .tc-contact-preview       { margin-top: 18px; }
        .tc-preview-label         { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .tc-contact-preview-inner { background: linear-gradient(135deg,#0f2618,#1e3d28); border-radius: 10px; padding: 20px 24px; }
        .tc-contact-preview-inner h3 { font-size: 16px; font-weight: 700; color: #fff; margin: 0 0 8px; }
        .tc-contact-preview-inner p  { font-size: 13px; color: #d1fae5; margin: 0 0 14px; }
        .tc-preview-btn { display: inline-flex; align-items: center; font-size: 12px; font-weight: 600; padding: 7px 18px; border-radius: 20px; background: #16a34a; color: #fff; }

        /* ── SEO ── */
        .tc-serp-wrap  { margin-top: 20px; }
        .tc-serp-label { font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .tc-serp-box   { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; }
        .tc-serp-url   { font-size: 13px; color: #16a34a; margin: 0 0 4px; }
        .tc-serp-title { font-size: 18px; color: #1a0dab; font-weight: 500; margin: 0 0 4px; }
        .tc-serp-desc  { font-size: 13px; color: #4d5156; margin: 0; line-height: 1.5; }
        .tc-serp-empty { color: #9ca3af; }
        .tc-kw-chips   { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .tc-kw-chip    { font-size: 11px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 3px 10px; border-radius: 20px; }

        /* ── Preview divider ── */
        .tc-preview-divider      { display: flex; align-items: center; gap: 12px; margin: 32px 0 0; }
        .tc-preview-divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .tc-preview-title  { font-size: 13px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
        .tc-preview-note   { font-size: 12px; color: #9ca3af; white-space: nowrap; }

        /* ── Toast ── */
        .tc-toast      { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: tcSlide .2s ease; }
        .tc-toast.success { background: #16a34a; color: #fff; }
        .tc-toast.error   { background: #ef4444; color: #fff; }
        @keyframes tcSlide { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* ── Loading ── */
        .tc-loading    { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #6b7280; font-size: 15px; }
        .tc-spinner    { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: tcSpin .8s linear infinite; }
        @keyframes tcSpin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 768px) { .tc-grid-2, .tc-grid-3 { grid-template-columns: 1fr; } }

        /* ═══════════════════════════════════
           PREVIEW STYLES
        ═══════════════════════════════════ */
        .tcpv-wrap { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; margin-top: 32px; font-family: inherit; }

        /* Chrome bar */
        .tcpv-chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .tcpv-chrome-left { display: flex; align-items: center; gap: 10px; }
        .tcpv-dots  { display: flex; gap: 5px; }
        .tcpv-dot   { width: 10px; height: 10px; border-radius: 50%; }
        .tcpv-dot.r { background: #f87171; }
        .tcpv-dot.y { background: #fbbf24; }
        .tcpv-dot.g { background: #4ade80; }
        .tcpv-url   { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 14px; font-size: 12px; color: #6b7280; min-width: 200px; text-align: center; }
        .tcpv-chrome-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; display: flex; align-items: center; gap: 5px; }

        /* Hero */
        .tcpv-hero       { background: linear-gradient(135deg, #071a0e, #0f2618); padding: 36px 32px; text-align: center; }
        .tcpv-bread      { font-size: 12px; color: rgba(255,255,255,.4); margin-bottom: 10px; }
        .tcpv-hero-title { font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .tcpv-hero-desc  { font-size: 14px; color: #d1fae5; margin: 0 auto; max-width: 520px; line-height: 1.6; }
        .tcpv-empty      { color: rgba(255,255,255,.25); font-style: italic; }

        /* Two-col body */
        .tcpv-body { display: grid; grid-template-columns: 220px 1fr; min-height: 400px; }

        /* TOC sidebar */
        .tcpv-toc        { background: #f9fafb; border-right: 1px solid #f3f4f6; padding: 20px 0; }
        .tcpv-toc-inner  { position: sticky; top: 0; padding: 0 16px; }
        .tcpv-toc-heading { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin: 0 0 12px; display: flex; align-items: center; gap: 5px; }
        .tcpv-toc-list   { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
        .tcpv-toc-item   { display: flex; align-items: center; gap: 8px; width: 100%; padding: 7px 10px; border-radius: 7px; border: none; background: transparent; font-size: 12px; color: #6b7280; cursor: pointer; text-align: left; transition: all .15s; line-height: 1.4; }
        .tcpv-toc-item:hover { background: #f3f4f6; color: #111827; }
        .tcpv-toc-item.active { background: #dcfce7; color: #15803d; font-weight: 600; }
        .tcpv-toc-num    { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; background: #e5e7eb; border-radius: 50%; font-size: 10px; font-weight: 700; color: #6b7280; flex-shrink: 0; }
        .tcpv-toc-item.active .tcpv-toc-num { background: #16a34a; color: #fff; }

        /* Main content */
        .tcpv-main { padding: 28px 32px; display: flex; flex-direction: column; gap: 0; overflow: hidden; }

        /* Intro */
        .tcpv-intro      { padding: 16px 20px; background: #f0fdf4; border-left: 3px solid #16a34a; border-radius: 0 8px 8px 0; margin-bottom: 28px; }
        .tcpv-intro-text { font-size: 13px; color: #374151; line-height: 1.7; margin: 0; }

        /* No content placeholder */
        .tcpv-no-content { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; gap: 8px; text-align: center; }
        .tcpv-no-content i    { font-size: 32px; color: #e5e7eb; }
        .tcpv-no-content p    { font-size: 15px; font-weight: 600; color: #d1d5db; margin: 0; }
        .tcpv-no-content span { font-size: 12px; color: #e5e7eb; }

        /* Individual section */
        .tcpv-section    { padding: 20px 0; border-bottom: 1px solid #f3f4f6; transition: background .2s; }
        .tcpv-section:last-of-type { border-bottom: none; }
        .tcpv-section.highlighted { background: #f0fdf4; border-radius: 8px; padding: 20px 16px; margin: 0 -16px; }
        .tcpv-sec-heading { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
        .tcpv-sec-num    { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #0f2618; color: #4ade80; border-radius: 8px; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
        .tcpv-h2         { font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 4px; line-height: 1.3; }
        .tcpv-h3         { font-size: 14px; font-weight: 600; color: #6b7280; margin: 0; }
        .tcpv-para       { font-size: 13px; color: #374151; line-height: 1.7; margin: 0 0 10px; }
        .tcpv-sec-empty  { font-size: 12px; color: #d1d5db; font-style: italic; }

        /* List blocks inside section */
        .tcpv-list-block  { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px; padding: 14px 16px; margin: 10px 0; }
        .tcpv-list-title  { font-size: 13px; font-weight: 600; color: #374151; margin: 0 0 8px; }
        .tcpv-list        { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
        .tcpv-list li     { font-size: 13px; color: #374151; padding: 3px 0 3px 18px; position: relative; line-height: 1.5; }
        .tcpv-list li::before { content: "✓"; position: absolute; left: 0; color: #16a34a; font-size: 11px; font-weight: 700; top: 4px; }
        .tcpv-empty-item  { color: #d1d5db; font-style: italic; }
        .tcpv-empty-item::before { display: none; }

        /* Contact CTA */
        .tcpv-contact       { background: linear-gradient(135deg, #0f2618, #1e3d28); border-radius: 12px; padding: 28px 24px; margin-top: 24px; text-align: center; }
        .tcpv-contact-inner { max-width: 440px; margin: 0 auto; }
        .tcpv-contact-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 10px; }
        .tcpv-contact-desc  { font-size: 13px; color: #d1fae5; margin: 0 0 16px; line-height: 1.6; }
        .tcpv-contact-btn   { display: inline-flex; align-items: center; font-size: 13px; font-weight: 600; padding: 10px 24px; border-radius: 24px; background: #16a34a; color: #fff; }

        /* SEO row */
        .tcpv-seo-row  { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 20px; padding-top: 16px; border-top: 1px dashed #f3f4f6; }
        .tcpv-seo-tag  { font-size: 11px; background: #f3f4f6; border: 1px solid #e5e7eb; color: #6b7280; padding: 3px 10px; border-radius: 20px; display: flex; align-items: center; gap: 4px; }
        .tcpv-seo-kw   { font-size: 11px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 3px 10px; border-radius: 20px; }

        @media (max-width: 640px) {
          .tcpv-body { grid-template-columns: 1fr; }
          .tcpv-toc  { display: none; }
          .tcpv-main { padding: 20px 16px; }
        }
      `}</style>

      <CmsTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        pageTitle="Terms & Conditions"
        pageSubtitle="Manage all sections of your Terms and Conditions page"
        isPublished={isPublished}
        onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
        onSave={handleSave}
        saving={saving}
        unsaved={unsaved}
        previewUrl="/terms-and-conditions"
      >
        <div className="tc-content">
          {renderEditor()}

          {/* ── Full-page preview ── */}
          <div className="tc-preview-divider">
            <span className="tc-preview-title"><i className="bi bi-eye" /> Page Preview</span>
            <div className="tc-preview-divider-line" />
            <span className="tc-preview-note">Updates as you edit any section above</span>
          </div>

          <TermsPreview formData={formData} />
        </div>
      </CmsTabs>

      {toast && (
        <div className={`tc-toast ${toast.type}`}>
          <i className={toast.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle"} />
          {toast.msg}
        </div>
      )}
    </>
  );
}