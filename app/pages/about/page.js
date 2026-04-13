"use client";
import React, { useState, useEffect, useRef } from "react";
import CmsTabs from "../../Components/CmsTabs";  

const TABS = [
  { key: "hero",            label: "Hero",          icon: "bi bi-house-door" },
  { key: "whoWeAre",        label: "Who We Are",    icon: "bi bi-people" },
  { key: "stats",           label: "Stats",         icon: "bi bi-bar-chart" },
  { key: "Journey",    label: "Our Journey",  icon: "bi bi-chat-quote" },
  { key: "seo",             label: "SEO",           icon: "bi bi-search" },
];


export default function AboutPage(){
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
            const res = await fetch("/api/cms/home");
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
          const res = await fetch("", {
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
    
    //   const renderEditor = () => {
    //     switch (activeTab) {
    //       case "hero":            return <HeroEditor data={formData.hero} onChange={(v) => update("hero", v)} />;
    //       case "marquee":         return <MarqueeEditor data={formData.marqueeServices} onChange={(v) => update("marqueeServices", v)} />;
    //       case "whoWeAre":        return <WhoWeAreEditor data={formData.whoWeAre} onChange={(v) => update("whoWeAre", v)} />;
    //       case "whyChooseUs":     return <WhyChooseUsEditor data={formData.whyChooseUs} onChange={(v) => update("whyChooseUs", v)} />;
    //       case "futureSection":   return <FutureSectionEditor data={formData.futureSection} onChange={(v) => update("futureSection", v)} />;
    //       case "stats":           return <StatsEditor data={formData.stats} onChange={(v) => update("stats", v)} />;
    //       case "industrySection": return <IndustrySectionEditor data={formData.industrySection} onChange={(v) => update("industrySection", v)} />;
    //       case "techSection":     return <TechSectionEditor data={formData.techSection} onChange={(v) => update("techSection", v)} />;
    //       case "agileSection":    return <AgileSectionEditor data={formData.agileSection} onChange={(v) => update("agileSection", v)} />;
    //       case "testimonials":    return <TestimonialEditor data={formData.testimonialSection} onChange={(v) => update("testimonialSection", v)} />;
    //       case "faqSection":      return <FaqEditor data={formData.faqSection} onChange={(v) => update("faqSection", v)} />;
    //       case "cta":             return <CtaEditor data={formData.cta} onChange={(v) => update("cta", v)} />;
    //       case "seo":             return <SeoEditor data={formData.seo} onChange={(v) => update("seo", v)} />;
    //       default:                return null;
    //     }
    //   };
    
      if (loading) return (
        <div className="cms-loading">
          <div className="cms-spinner" />
          <p>Loading About Page Data...</p>
        </div>
      );

      return (

          <CmsTabs
                tabs={TABS}
                activeTab={activeTab}
                onChange={setActiveTab}
                pageTitle="About Page"
                pageSubtitle="Manage all sections of your about page"
                isPublished={isPublished}
                onPublishToggle={(v) => { setIsPublished(v); setUnsaved(true); }}
                onSave={handleSave}
                saving={saving}
                unsaved={unsaved}
                previewUrl="/"
              ></CmsTabs>
      );
}