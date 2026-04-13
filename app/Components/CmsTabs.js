"use client";
import React from "react";

/**
 * CmsTabs — Reusable tab bar component for all CMS pages
 *
 * Props:
 *   tabs        — Array of { key, label, icon } objects
 *   activeTab   — Currently active tab key (string)
 *   onChange    — Callback (key) => void when a tab is clicked
 *   pageTitle   — Title shown in the top bar (e.g. "Home Page")
 *   pageSubtitle— Subtitle shown below title
 *   isPublished — boolean for publish toggle
 *   onPublishToggle — (bool) => void
 *   onSave      — async () => void
 *   saving      — boolean
 *   unsaved     — boolean
 *   previewUrl  — string, URL to open for live preview (default "/")
 */
export default function CmsTabs({
  tabs = [],
  activeTab,
  onChange,
  pageTitle = "CMS Page",
  pageSubtitle = "Manage page content",
  isPublished = true,
  onPublishToggle,
  onSave,
  saving = false,
  unsaved = false,
  previewUrl = "/",
  children,
}) {
  return (
    <>
    
      {/* ── Top Bar ── */}
      <div className="cmst-topbar">
        <div className="cmst-topbar-left">
          <h1>
            <i className="bi bi-file-earmark-text" />
            {pageTitle}
          </h1>
          <p>{pageSubtitle}</p>
        </div>
        <div className="cmst-topbar-right">
          {unsaved && <span className="cmst-unsaved">● Unsaved changes</span>}

          <div className="cmst-publish-row">
            <span>Published</span>
            <label className="cmst-switch">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => onPublishToggle?.(e.target.checked)}
              />
              <span className="cmst-slider" />
            </label>
          </div>

          <button
            className="cmst-btn cmst-btn-secondary"
            onClick={() => window.open(previewUrl, "_blank")}
          >
            <i className="bi bi-box-arrow-up-right" /> Preview Site
          </button>

          <button
            className="cmst-btn cmst-btn-primary"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="cmst-spinner" /> Saving...
              </>
            ) : (
              <>
                <i className="bi bi-floppy" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="cmst-tabbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`cmst-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => onChange(tab.key)}
          >
            <i className={tab.icon} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content (injected by parent) ── */}
      {children}
    </>
  );
}