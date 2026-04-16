"use client";
import React, { useState } from "react";

export const Field = ({ label, children, hint }) => (
  <div className="sc-field">
    <label className="sc-label">{label}</label>
    {children}
    {hint && <p className="sc-hint">{hint}</p>}
  </div>
);

export const Input = (props) => <input className="sc-input" {...props} />;

export const Textarea = ({ rows = 3, ...props }) => (
  <textarea className="sc-textarea" rows={rows} {...props} />
);

export const Toggle = ({ label, checked, onChange }) => (
  <div className="sc-toggle-row">
    <span className="sc-label">{label}</span>
    <label className="sc-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="sc-slider" />
    </label>
  </div>
);

export const Select = ({ children, ...props }) => (
  <select className="sc-input" {...props}>{children}</select>
);

export const ImageUpload = ({ label, value, onChange, hint }) => (
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

export const SortableItem = ({ index, onMoveUp, onMoveDown, onDelete, title, children, defaultOpen = false }) => {
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

export const ParagraphsEditor = ({ value = [], onChange }) => {
  const add = () => onChange([...value, ""]);
  const upd = (i, v) => { const a = [...value]; a[i] = v; onChange(a); };
  const rem = (i) => onChange(value.filter((_, idx) => idx !== i));
  return (
    <div className="sc-para-section">
      <div className="sc-para-header">
        <label className="sc-label">Paragraphs</label>
        <button className="sc-add-inline-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Paragraph</button>
      </div>
      {value.map((p, i) => (
        <div key={i} className="sc-para-row">
          <div className="sc-para-num">{i + 1}</div>
          <Textarea value={p} onChange={(e) => upd(i, e.target.value)} rows={2} placeholder={`Paragraph ${i + 1}...`} style={{ flex: 1 }} />
          <button className="sc-icon-btn danger" onClick={() => rem(i)}><i className="bi bi-trash" /></button>
        </div>
      ))}
      {value.length === 0 && <div className="sc-empty-state">No paragraphs yet.</div>}
    </div>
  );
};

export const SeoEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-search" /> SEO Meta Tags</p>
      <Field label="Meta Title" hint="50–60 characters recommended">
        <Input value={data.title || ""} onChange={(e) => u("title", e.target.value)} maxLength={70} />
        <p className={`sc-char-count ${(data.title || "").length > 60 ? "over" : ""}`}>{(data.title || "").length}/70</p>
      </Field>
      <Field label="Meta Description" hint="150–160 characters recommended">
        <Textarea value={data.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} maxLength={170} />
        <p className={`sc-char-count ${(data.description || "").length > 160 ? "over" : ""}`}>{(data.description || "").length}/170</p>
      </Field>
      <Field label="Canonical URL" hint="Leave blank to use default page URL">
        <Input value={data.canonical || ""} onChange={(e) => u("canonical", e.target.value)} placeholder="https://yourdomain.com/services/..." />
      </Field>
      <Field label="Keywords (comma separated)">
        <Textarea value={(data.keywords || []).join(", ")} rows={2} placeholder="keyword1, keyword2..."
          onChange={(e) => u("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
      </Field>
      <div className="sc-serp-wrap">
        <p className="sc-serp-label"><i className="bi bi-google" /> Google SERP Preview</p>
        <div className="sc-serp-box">
          <p className="sc-serp-url">{data.canonical || "https://yourdomain.com/services/slug"}</p>
          <p className="sc-serp-title">{data.title || <span style={{ color: "#9ca3af" }}>Meta title not set...</span>}</p>
          <p className="sc-serp-desc">{data.description || <span style={{ color: "#9ca3af" }}>Meta description will appear here...</span>}</p>
        </div>
        {(data.keywords || []).length > 0 && (
          <div className="sc-kw-chips">
            {data.keywords.map((kw, i) => <span key={i} className="sc-kw-chip">{kw}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

export const HeroEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-image" /> Hero / Banner Section</p>
      <p className="sc-section-hint">Top banner shown on the page.</p>
      <Field label="Page Title">
        <Input value={data.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Service page title..." />
      </Field>
      <Field label="Breadcrumb" hint='e.g. "Home / Services / Cloud"'>
        <Input value={data.breadcrumb || ""} onChange={(e) => u("breadcrumb", e.target.value)} placeholder="Home / Services / Cloud" />
      </Field>
      <Field label="Description">
        <Textarea value={data.description || ""} onChange={(e) => u("description", e.target.value)} rows={3} placeholder="Brief description shown in the hero..." />
      </Field>
    </div>
  );
};

export const BestServiceEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-award" /> Best Service Section</p>
      <Field label="Title">
        <Input value={data.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Best service heading..." />
      </Field>
      <ParagraphsEditor value={data.paragraphs || []} onChange={(v) => u("paragraphs", v)} />
      <ImageUpload label="Section Image" value={data.image} onChange={(v) => u("image", v)} hint="Recommended: 600×500px" />
      <Field label="Image Caption / Paragraph" hint="Short text shown below or beside the image">
        <Textarea value={data.imagepara || ""} onChange={(e) => u("imagepara", e.target.value)} rows={2} placeholder="Caption text..." />
      </Field>
    </div>
  );
};

export const CustomServiceEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-sliders" /> Custom Service Section</p>
      <Field label="Title">
        <Input value={data.title || ""} onChange={(e) => u("title", e.target.value)} placeholder="Custom service heading..." />
      </Field>
      <ParagraphsEditor value={data.paragraphs || []} onChange={(v) => u("paragraphs", v)} />
      <ImageUpload label="Section Image" value={data.image} onChange={(v) => u("image", v)} hint="Recommended: 600×400px" />
    </div>
  );
};

export const CapabilitiesEditor = ({ data = {}, onChange }) => {
  const u = (k, v) => onChange({ ...data, [k]: v });
  const cards = data.cards || [];
  const addCard = () => u("cards", [...cards, { name: "", para: "", img: "" }]);
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
        <p className="sc-block-title"><i className="bi bi-lightning" /> Capabilities Section</p>
        <Field label="Heading"><Input value={data.heading || ""} onChange={(e) => u("heading", e.target.value)} placeholder="Our Capabilities" /></Field>
        <Field label="Sub Heading"><Input value={data.subHeading || ""} onChange={(e) => u("subHeading", e.target.value)} placeholder="Sub heading text..." /></Field>
      </div>
      <div className="sc-section-block">
        <p className="sc-block-title"><i className="bi bi-card-list" /> Capability Cards ({cards.length})</p>
        {cards.map((c, i) => (
          <SortableItem key={i} index={i} title={c.name || `Card ${i + 1}`}
            onMoveUp={() => movCard(i, -1)} onMoveDown={() => movCard(i, 1)} onDelete={() => remCard(i)} defaultOpen={i === 0}>
            <Field label="Name"><Input value={c.name} onChange={(e) => updCard(i, "name", e.target.value)} placeholder="Capability name..." /></Field>
            <Field label="Description"><Textarea value={c.para} onChange={(e) => updCard(i, "para", e.target.value)} rows={2} placeholder="Short description..." /></Field>
            <ImageUpload label="Card Image" value={c.img} onChange={(v) => updCard(i, "img", v)} hint="Recommended: 400×300px" />
          </SortableItem>
        ))}
        {cards.length === 0 && <div className="sc-empty-state">No capability cards yet.</div>}
        <button className="sc-add-btn" onClick={addCard}><i className="bi bi-plus-circle" /> Add Card</button>
      </div>
    </div>
  );
};

export const LeftRightEditor = ({ data = [], onChange }) => {
  const add = () => onChange([...data, { title: "", image: "", imagePosition: "right", paragraphs: [], bulletHead: "", bulletPoints: [], extraText: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const rem = (i) => onChange(data.filter((_, idx) => idx !== i));
  const mov = (i, d) => {
    const a = [...data]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; onChange(a);
  };
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-layout-split" /> Left/Right Content Sections ({data.length})</p>
      {data.map((s, i) => (
        <SortableItem key={i} index={i} title={s.title || `Section ${i + 1}`}
          onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)} defaultOpen={i === 0}>
          <div className="sc-grid-2">
            <Field label="Title"><Input value={s.title} onChange={(e) => upd(i, "title", e.target.value)} placeholder="Section title..." /></Field>
            <Field label="Image Position">
              <Select value={s.imagePosition || "right"} onChange={(e) => upd(i, "imagePosition", e.target.value)}>
                <option value="left">Image Left</option>
                <option value="right">Image Right</option>
              </Select>
            </Field>
          </div>
          <ImageUpload label="Image" value={s.image} onChange={(v) => upd(i, "image", v)} />
          <ParagraphsEditor value={s.paragraphs || []} onChange={(v) => upd(i, "paragraphs", v)} />
          <div className="sc-grid-2" style={{ marginTop: 12 }}>
            <Field label="Bullet Points Heading">
              <Input value={s.bulletHead || ""} onChange={(e) => upd(i, "bulletHead", e.target.value)} placeholder="Key highlights:" />
            </Field>
          </div>
          <Field label="Bullet Points (one per line)">
            <Textarea value={(s.bulletPoints || []).join("\n")} rows={3}
              onChange={(e) => upd(i, "bulletPoints", e.target.value.split("\n").filter((l) => l.trim()))}
              placeholder={"Feature one\nFeature two\nFeature three"} />
          </Field>
          <Field label="Extra Text" hint="Optional closing text below bullet points">
            <Textarea value={s.extraText || ""} onChange={(e) => upd(i, "extraText", e.target.value)} rows={2} />
          </Field>
        </SortableItem>
      ))}
      {data.length === 0 && <div className="sc-empty-state">No sections yet.</div>}
      <button className="sc-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add Section</button>
    </div>
  );
};

export const FaqEditor = ({ data = [], onChange }) => {
  const add = () => onChange([...data, { question: "", answer: "" }]);
  const upd = (i, k, v) => { const a = [...data]; a[i] = { ...a[i], [k]: v }; onChange(a); };
  const rem = (i) => onChange(data.filter((_, idx) => idx !== i));
  const mov = (i, d) => {
    const a = [...data]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; onChange(a);
  };
  return (
    <div className="sc-section-block">
      <p className="sc-block-title"><i className="bi bi-question-circle" /> FAQ Section ({data.length})</p>
      {data.map((faq, i) => (
        <SortableItem key={i} index={i} title={faq.question || `FAQ ${i + 1}`}
          onMoveUp={() => mov(i, -1)} onMoveDown={() => mov(i, 1)} onDelete={() => rem(i)} defaultOpen={i === 0}>
          <Field label="Question">
            <Input value={faq.question} onChange={(e) => upd(i, "question", e.target.value)} placeholder="Frequently asked question..." />
          </Field>
          <Field label="Answer">
            <Textarea value={faq.answer} onChange={(e) => upd(i, "answer", e.target.value)} rows={3} placeholder="Detailed answer..." />
          </Field>
        </SortableItem>
      ))}
      {data.length === 0 && <div className="sc-empty-state">No FAQs yet.</div>}
      <button className="sc-add-btn" onClick={add}><i className="bi bi-plus-circle" /> Add FAQ</button>
    </div>
  );
};

// Shared CSS
export const SharedStyles = () => (
  <style>{`
    .sc-field   { margin-bottom: 16px; }
    .sc-field:last-child { margin-bottom: 0; }
    .sc-label   { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 5px; }
    .sc-hint    { font-size: 12px; color: #9ca3af; margin-top: 3px; }
    .sc-input   { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; transition: border .15s; box-sizing: border-box; }
    .sc-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
    .sc-textarea { width: 100%; padding: 9px 13px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #111827; background: #fff; outline: none; resize: vertical; font-family: inherit; transition: border .15s; box-sizing: border-box; line-height: 1.6; }
    .sc-textarea:focus { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
    .sc-char-count { font-size: 12px; color: #9ca3af; text-align: right; margin-top: 2px; }
    .sc-char-count.over { color: #ef4444; }
    .sc-section-block { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; margin-bottom: 18px; }
    .sc-block-title { font-size: 13px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 6px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 7px; }
    .sc-block-title i { color: #16a34a; }
    .sc-section-hint { font-size: 13px; color: #9ca3af; margin: 0 0 16px; }
    .sc-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .sc-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
    .sc-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .sc-switch { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
    .sc-switch input { opacity: 0; width: 0; height: 0; }
    .sc-slider { position: absolute; inset: 0; background: #d1d5db; border-radius: 24px; cursor: pointer; transition: .2s; }
    .sc-slider:before { content: ""; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
    .sc-switch input:checked + .sc-slider { background: #16a34a; }
    .sc-switch input:checked + .sc-slider:before { transform: translateX(18px); }
    .sc-img-upload { display: flex; flex-direction: column; gap: 8px; }
    .sc-img-preview { position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
    .sc-img-preview img { width: 100%; height: 160px; object-fit: cover; display: block; }
    .sc-img-remove { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.6); color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
    .sc-img-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 24px; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer; color: #9ca3af; font-size: 13px; text-align: center; }
    .sc-img-placeholder:hover { border-color: #16a34a; color: #16a34a; }
    .sc-img-placeholder i { font-size: 24px; }
    .sc-list-item { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 10px; overflow: hidden; }
    .sc-list-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; cursor: pointer; user-select: none; }
    .sc-list-header:hover { background: #eef0f2; }
    .sc-list-header-left { display: flex; align-items: center; gap: 8px; }
    .sc-chevron { font-size: 12px; color: #6b7280; }
    .sc-list-title { font-size: 13px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 8px; }
    .sc-list-actions { display: flex; gap: 4px; }
    .sc-list-actions button { padding: 4px 8px; border: 1px solid #d1d5db; background: #fff; border-radius: 5px; cursor: pointer; font-size: 13px; color: #6b7280; }
    .sc-list-actions button:hover { background: #f3f4f6; }
    .sc-list-actions button.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
    .sc-list-body { padding: 14px; }
    .sc-para-section { margin-bottom: 16px; }
    .sc-para-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .sc-para-row { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
    .sc-para-num { width: 22px; height: 22px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #6b7280; flex-shrink: 0; margin-top: 10px; }
    .sc-add-inline-btn { display: flex; align-items: center; gap: 4px; padding: 4px 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #16a34a; font-size: 12px; font-weight: 600; cursor: pointer; }
    .sc-add-inline-btn:hover { background: #dcfce7; }
    .sc-add-btn { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1.5px dashed #d1d5db; background: transparent; border-radius: 8px; cursor: pointer; font-size: 14px; color: #6b7280; width: 100%; justify-content: center; transition: all .15s; margin-top: 4px; }
    .sc-add-btn:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
    .sc-icon-btn { padding: 8px 10px; border: 1px solid #d1d5db; background: #fff; border-radius: 7px; cursor: pointer; font-size: 14px; color: #6b7280; flex-shrink: 0; }
    .sc-icon-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
    .sc-empty-state { font-size: 13px; color: #9ca3af; font-style: italic; padding: 12px; background: #f9fafb; border-radius: 8px; border: 1px dashed #e5e7eb; text-align: center; margin-bottom: 8px; }
    .sc-icon-preview-row { display: flex; align-items: center; gap: 8px; }
    .sc-slug-row { display: flex; align-items: center; border: 1px solid #d1d5db; border-radius: 8px; overflow: hidden; background: #fff; }
    .sc-slug-row:focus-within { border-color: #16a34a; box-shadow: 0 0 0 3px #dcfce7; }
    .sc-slug-prefix { padding: 9px 10px; background: #f3f4f6; font-size: 13px; color: #9ca3af; white-space: nowrap; border-right: 1px solid #e5e7eb; }
    .sc-slug-row .sc-input { border: none; border-radius: 0; box-shadow: none; }
    .sc-slug-row .sc-input:focus { box-shadow: none; }
    .sc-serp-wrap { margin-top: 18px; }
    .sc-serp-label { font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
    .sc-serp-box { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 18px; }
    .sc-serp-url { font-size: 13px; color: #16a34a; margin: 0 0 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sc-serp-title { font-size: 17px; color: #1a0dab; font-weight: 500; margin: 0 0 3px; }
    .sc-serp-desc { font-size: 13px; color: #4d5156; margin: 0; line-height: 1.5; }
    .sc-kw-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
    .sc-kw-chip { font-size: 12px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 2px 9px; border-radius: 20px; }
    .sc-content { padding: 24px; background: #f9fafb; min-height: 60vh; }
    .sc-preview-divider { display: flex; align-items: center; gap: 12px; margin: 32px 0 0; padding: 0 24px 8px; }
    .sc-preview-divider span { font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
    .sc-preview-divider-line { flex: 1; height: 1px; background: #e5e7eb; }
    .sc-preview-note { font-size: 13px; color: #9ca3af; text-transform: none; letter-spacing: 0; font-weight: 400 !important; }
    .sc-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #6b7280; font-size: 16px; }
    .sc-spinner { width: 32px; height: 32px; border: 3px solid #e5e7eb; border-top-color: #16a34a; border-radius: 50%; animation: scSpin .8s linear infinite; }
    @keyframes scSpin { to { transform: rotate(360deg); } }
    .sc-toast { position: fixed; bottom: 24px; right: 24px; padding: 13px 22px; border-radius: 10px; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,.15); animation: scSlide .2s ease; }
    .sc-toast.success { background: #16a34a; color: #fff; }
    .sc-toast.error { background: #ef4444; color: #fff; }
    @keyframes scSlide { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @media (max-width: 768px) { .sc-grid-2, .sc-grid-3 { grid-template-columns: 1fr; } }
  `}</style>
);