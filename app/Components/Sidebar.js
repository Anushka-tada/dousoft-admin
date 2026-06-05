

// "use client"
// import React, { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";

// function Sidebar({ isCollapsed }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(["Dashboard", "Page Management"]);

//   const toggleMenu = (menu) => {
//     setIsOpen((prev) =>
//       prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
//     );
//   };

//   const navItems = [
//     {
//       title: "Dashboard",
//       icon: "bi bi-grid-1x2",
//       list: [
//         { menu: "Dashboard", path: "/dashboard", icon: "bi bi-speedometer2" },
//       ],
//     },
//     {
//       title: "Page Management",
//       icon: "bi bi-file-earmark-text",
//       list: [
//         { menu: "Home", icon: "bi bi-house", path: "/pages/home" },
//         { menu: "About", icon: "bi bi-info-circle", path: "/pages/about" },
//         { menu: "Pricing", icon: "bi bi-tags", path: "/pages/pricing" },
//         { menu: "Portfolio", icon: "bi bi-briefcase", path: "/pages/portfolio" },
//         { menu: "Career Page", icon: "bi bi-person-workspace", path: "/pages/career" },
//         { menu: "Solutions", icon: "bi bi-grid", path: "/pages/solution" },
//         { menu: "Services", icon: "bi bi-gear", path: "/pages/services" },
//         { menu: "Term & Conditions", icon: "bi bi-shield-check", path: "/pages/term-condition" },
//       ],
//     },
//     {
//       title: "Appointments",
//       icon: "bi bi-calendar-check",
//       list: [
//         { menu: "Appointments", icon: "bi bi-calendar3", path: "/appointments" },
//         { menu: "Contact Requests", icon: "bi bi-envelope", path: "/contact-requests" },
//       ],
//     },
//     {
//       title: "Career Management",
//       icon: "bi bi-briefcase",
//       list: [
//         { menu: "All Jobs", icon: "bi bi-list-ul", path: "/career" },
//         { menu: "Create Job", icon: "bi bi-plus-circle", path: "/career/create" },
//         { menu: "Job Requests", icon: "bi bi-people", path: "/career/requests" },
//       ],
//     },
//     {
//       title: "Blog Management",
//       icon: "bi bi-journal-text",
//       list: [
//         { menu: "Blogs", icon: "bi bi-journal-text", path: "/blogs" },
//         { menu: "Add Blog", icon: "bi bi-journal-plus", path: "/blogs/create" },
//       ],
//     },
//     {
//       title: "Policy Management",
//       icon: "bi bi-shield",
//       list: [
//         { menu: "Privacy Policies", icon: "bi bi-journal-text", path: "/privacy-policy" },
//         { menu: "Add Privacy Policy", icon: "bi bi-journal-plus", path: "/privacy-policy/create" },
//       ],
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         .sb-root {
//           position: fixed;
//           inset: 0 auto 0 0;
//           width: 260px;
//           background: #ffffff;
//           border-right: 1px solid #e2f0e8;
//           z-index: 1030;
//           height: 100vh;
//           overflow-y: auto;
//           overflow-x: hidden;
//           transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
//           display: flex;
//           flex-direction: column;
//           scrollbar-width: none;
//         }
//         .sb-root::-webkit-scrollbar { display: none; }
//         .sb-root.collapsed { width: 72px; }

//         /* Brand */
//         .sb-brand {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 0 18px;
//           height: 68px;
//           border-bottom: 1px solid #e2f0e8;
//           flex-shrink: 0;
//         }
//         .sb-logo-mark {
//           width: 36px;
//           height: 36px;
//           border-radius: 10px;
//           background: linear-gradient(135deg, #0b6f1e, #16a34a);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }
//         .sb-logo-mark i { color: #fff; font-size: 17px; }
//         .sb-brand-img {
//           height: 46px;
//           object-fit: contain;
//           transition: opacity 0.2s;
//         }
//         .collapsed .sb-brand-img { opacity: 0; width: 0; }

//         /* Nav */
//         .sb-nav { padding: 10px 10px 24px; flex: 1; }

//         .sb-section { margin-bottom: 2px; }

//         .sb-section-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 8px 10px 6px;
//           cursor: pointer;
//           border-radius: 8px;
//           transition: background 0.15s;
//           user-select: none;
//         }
//         .sb-section-header:hover { background: #f0fdf4; }

//         .sb-section-label {
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.07em;
//           text-transform: uppercase;
//           color: #6b7280;
//           white-space: nowrap;
//           overflow: hidden;
//           transition: opacity 0.2s;
//         }
//         .collapsed .sb-section-label { opacity: 0; }

//         .sb-chevron {
//           font-size: 11px;
//           color: #9ca3af;
//           transition: transform 0.2s, opacity 0.2s;
//           flex-shrink: 0;
//         }
//         .sb-chevron.open { transform: rotate(180deg); }
//         .collapsed .sb-chevron { opacity: 0; }

//         /* Nav items */
//         .sb-list { list-style: none; margin: 2px 0 6px; padding: 0; }

//         .sb-item {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 9px 10px;
//           margin-bottom: 1px;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: background 0.15s, color 0.15s;
//           color: #374151;
//           position: relative;
//           white-space: nowrap;
//           overflow: hidden;
//         }
//         .sb-item:hover { background: #f0fdf4; color: #0b6f1e; }
//         .sb-item:hover .sb-icon { color: #0b6f1e; }

//         .sb-item.active {
//           background: #dcfce7;
//           color: #0b6f1e;
//           font-weight: 600;
//         }
//         .sb-item.active .sb-icon { color: #0b6f1e; }
//         .sb-item.active::before {
//           content: '';
//           position: absolute;
//           left: 0;
//           top: 20%;
//           bottom: 20%;
//           width: 3px;
//           background: #0b6f1e;
//           border-radius: 0 3px 3px 0;
//         }

//         .sb-icon {
//           font-size: 16px;
//           color: #6b7280;
//           width: 20px;
//           text-align: center;
//           flex-shrink: 0;
//           transition: color 0.15s;
//         }

//         .sb-label {
//           font-size: 13.5px;
//           font-weight: 500;
//           transition: opacity 0.2s;
//           flex: 1;
//         }
//         .collapsed .sb-label { opacity: 0; pointer-events: none; }

//         /* Divider */
//         .sb-divider {
//           height: 1px;
//           background: #e2f0e8;
//           margin: 6px 10px;
//         }

//         /* Tooltip for collapsed state */
//         .sb-item-wrap { position: relative; }
//         .collapsed .sb-tooltip {
//           display: block;
//         }
//         .sb-tooltip {
//           display: none;
//           position: absolute;
//           left: 68px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: #0b6f1e;
//           color: #fff;
//           font-size: 12px;
//           font-weight: 500;
//           padding: 5px 10px;
//           border-radius: 6px;
//           white-space: nowrap;
//           z-index: 9999;
//           pointer-events: none;
//           box-shadow: 0 4px 12px rgba(11,111,30,0.25);
//         }
//         .sb-tooltip::before {
//           content: '';
//           position: absolute;
//           right: 100%;
//           top: 50%;
//           transform: translateY(-50%);
//           border: 5px solid transparent;
//           border-right-color: #0b6f1e;
//         }
//         .sb-item-wrap:hover .sb-tooltip { display: block; }
//       `}</style>

//       <aside className={`sb-root ${isCollapsed ? "collapsed" : ""}`}>
//         {/* Brand */}
//         <div className="sb-brand">
//           <div className="sb-logo-mark">
//             <i className="bi bi-lightning-charge-fill" />
//           </div>
//           <img
//             src="/assets/new-logo.webp"
//             alt="logo"
//             className="sb-brand-img"
//           />
//         </div>

//         {/* Navigation */}
//         <nav className="sb-nav">
//           {navItems.map((section, i) => (
//             <div key={i} className="sb-section">
//               {i !== 0 && <div className="sb-divider" />}

//               <div
//                 className="sb-section-header"
//                 onClick={() => toggleMenu(section.title)}
//               >
//                 <span className="sb-section-label">{section.title}</span>
//                 <i
//                   className={`bi bi-chevron-down sb-chevron ${
//                     isOpen.includes(section.title) ? "open" : ""
//                   }`}
//                 />
//               </div>

//               {isOpen.includes(section.title) && (
//                 <ul className="sb-list">
//                   {section.list.map((item, j) => (
//                     <li key={j} className="sb-item-wrap">
//                       <div
//                         className={`sb-item ${pathname === item.path ? "active" : ""}`}
//                         onClick={() => router.push(item.path)}
//                       >
//                         <i className={`${item.icon} sb-icon`} />
//                         <span className="sb-label">{item.menu}</span>
//                       </div>
//                       {/* <span className="sb-tooltip">{item.menu}</span> */}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;

"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

  .sb-root {
    position: fixed;
    inset: 0 auto 0 0;
    width: 260px;
    background: #ffffff;
    border-right: 1px solid #e2f0e8;
    z-index: 1030;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
   font-family: 'Geist', sans-serif;
  }
  .sb-root.collapsed { width: 68px; }

  /* ── Brand ── */
  .sb-brand {
    height: 64px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    border-bottom: 1px solid #e2f0e8;
    flex-shrink: 0;
    overflow: hidden;
  }
    .sb-root.collapsed .sb-brand {
  justify-content: center;
  padding: 0;
}

.sb-root.collapsed .sb-brand-img {
  width: 38px;
  height: 38px;
}
  .sb-logo-mark {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: #0b6f1e;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
    .sb-brand-img {
           height: 46px;
           object-fit: contain;
           transition: opacity 0.2s;
         }
  .sb-logo-mark svg { color: #fff; width: 18px; height: 18px; }
  .sb-brand-text {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: opacity 0.2s, width 0.28s;
  }
  .sb-root.collapsed .sb-brand-text { opacity: 0; width: 0; pointer-events: none; }
  .sb-brand-name {
    font-size: 14.5px;
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .sb-brand-sub {
    font-size: 10.5px;
    color: #9ca3af;
    font-weight: 400;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  /* ── User Card ── */
  .sb-user {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-bottom: 1px solid #e2f0e8;
    flex-shrink: 0;
    overflow: hidden;
  }
  .sb-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #dcfce7;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 11.5px;
    font-weight: 600;
    color: #0b6f1e;
    letter-spacing: 0.03em;
  }
  .sb-user-info { overflow: hidden; transition: opacity 0.2s; }
  .sb-root.collapsed .sb-user-info { opacity: 0; pointer-events: none; }
  .sb-user-name {
    font-size: 12.5px;
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
    line-height: 1.3;
  }
  .sb-user-role {
    font-size: 10.5px;
    color: #9ca3af;
    white-space: nowrap;
  }

  /* ── Nav ── */
  .sb-nav {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 8px 20px;
    scrollbar-width: none;
  }
  .sb-nav::-webkit-scrollbar { display: none; }

  .sb-section { margin-bottom: 2px; }

  .sb-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    cursor: pointer;
    border-radius: 7px;
    transition: background 0.15s;
    user-select: none;
  }
  .sb-section-header:hover { background: #f0fdf4; }

  .sb-section-label {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #9ca3af;
    white-space: nowrap;
    transition: opacity 0.2s;
  }
  .sb-root.collapsed .sb-section-label { opacity: 0; }

  .sb-chevron {
    width: 14px;
    height: 14px;
    color: #9ca3af;
    flex-shrink: 0;
    transition: transform 0.22s ease, opacity 0.2s;
  }
  .sb-chevron.open { transform: rotate(180deg); }
  .sb-root.collapsed .sb-chevron { opacity: 0; }

  .sb-list { list-style: none; padding: 0; margin: 1px 0 4px; }

  .sb-item-wrap { position: relative; }

  .sb-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 9px;
    margin-bottom: 1px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.14s, color 0.14s;
    color: #4b5563;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
  }
  .sb-item:hover { background: #f0fdf4; color: #0b6f1e; }
  .sb-item:hover .sb-icon { color: #0b6f1e; }
  .sb-item.active {
    background: #dcfce7;
    color: #0b6f1e;
    font-weight: 600;
  }
  .sb-item.active .sb-icon { color: #0b6f1e; }
  .sb-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    bottom: 20%;
    width: 3px;
    background: #0b6f1e;
    border-radius: 0 3px 3px 0;
  }

  // .sb-icon {
  //   width: 17px;
  //   height: 17px;
  //   color: #9ca3af;
  //   flex-shrink: 0;
  //   transition: color 0.14s;
  // }

  .sb-icon {
  width: 20px;
  min-width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #9ca3af;
  flex-shrink: 0;
  transition: color 0.14s;
}

.sb-icon svg {
  width: 18px;
  height: 18px;
  display: block;
}

  .sb-label {
    font-size: 15px;
    font-weight: 500;
    transition: opacity 0.2s;
    flex: 1;
  }
  // .sb-root.collapsed .sb-label { opacity: 0; pointer-events: none; }

  .sb-root.collapsed .sb-item {
  justify-content: center;
  padding: 10px 0;
}

.sb-root.collapsed .sb-footer-item {
  justify-content: center;
  padding: 10px 0;
}

.sb-root.collapsed .sb-label,
.sb-root.collapsed .sb-badge {
  display: none;
}

  .sb-badge {
    font-size: 9.5px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 20px;
    background: #dcfce7;
    color: #0b6f1e;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .sb-root.collapsed .sb-badge { opacity: 0; }

  /* ── Divider ── */
  .sb-divider { height: 1px; background: #e2f0e8; margin: 5px 6px; }

  /* ── Tooltip ── */
  .sb-tooltip {
    display: none;
    position: absolute;
    left: 62px;
    top: 50%;
    transform: translateY(-50%);
    background: #0b6f1e;
    color: #fff;
    font-size: 11.5px;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 7px;
    white-space: nowrap;
    z-index: 9999;
    pointer-events: none;
    box-shadow: 0 4px 14px rgba(11, 111, 30, 0.22);
  }
  .sb-tooltip::before {
    content: '';
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
    border-right-color: #0b6f1e;
  }
  .sb-root.collapsed .sb-item-wrap:hover .sb-tooltip { display: block; }

  /* ── Footer ── */
  .sb-footer {
    border-top: 1px solid #e2f0e8;
    padding: 8px;
    flex-shrink: 0;
  }
  .sb-footer-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 9px;
    border-radius: 8px;
    cursor: pointer;
    color: #4b5563;
    transition: background 0.14s, color 0.14s;
    white-space: nowrap;
    overflow: hidden;
  }
  .sb-footer-item:hover { background: #f0fdf4; color: #0b6f1e; }
  .sb-footer-item:hover .sb-icon { color: #0b6f1e; }
  .sb-footer-item.danger { color: #ef4444; }
  .sb-footer-item.danger:hover { background: #fef2f2; color: #dc2626; }
  .sb-footer-item.danger .sb-icon { color: #ef4444; }
  .sb-footer-item.danger:hover .sb-icon { color: #dc2626; }

  /* ── Toggle Button ── */
  .sb-toggle {
    position: fixed;
    top: 20px;
    left: 246px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #e2f0e8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1031;
    transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }
  .sb-toggle:hover {
    box-shadow: 0 2px 10px rgba(11, 111, 30, 0.18);
    border-color: #0b6f1e;
  }
.sb-toggle {
  left: 247px;
}

.sb-toggle.collapsed {
  left: 55px;
}
  .sb-toggle svg {
    width: 13px;
    height: 13px;
    color: #0b6f1e;
    transition: transform 0.28s;
  }
  .sb-toggle.collapsed svg { transform: rotate(180deg); }
`;

/* ── SVG Icons ── */
const Icon = {
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="11" x2="12" y2="16"/></svg>,
  tags: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>,
  briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.5"/></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>,
  list: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="3" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="3" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  journal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="13" y2="11"/></svg>,
  journalPlus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="10" y1="10" x2="14" y2="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>,
  shieldPlus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/></svg>,
  workspace: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  settingsIcon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  chevronDown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevronLeft: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
};

const navItems = [
  {
    title: "Dashboard",
    list: [
      { menu: "Dashboard", icon: Icon.dashboard, path: "/dashboard" },
    ],
  },
  {
    title: "Page Management",
    list: [
      { menu: "Home", icon: Icon.home, path: "/pages/home" },
      { menu: "About", icon: Icon.info, path: "/pages/about" },
      { menu: "Pricing", icon: Icon.tags, path: "/pages/pricing" },
      { menu: "Portfolio", icon: Icon.briefcase, path: "/pages/portfolio" },
      { menu: "Career Page", icon: Icon.workspace, path: "/pages/career" },
      { menu: "Solutions", icon: Icon.grid, path: "/pages/solution" },
      { menu: "Services", icon: Icon.gear, path: "/pages/services" },
      { menu: "Term & Conditions", icon: Icon.shield, path: "/pages/term-condition" },
    ],
  },
  {
    title: "Appointments",
    list: [
      { menu: "Appointments", icon: Icon.calendar, path: "/appointments",  },
      { menu: "Contact Requests", icon: Icon.mail, path: "/contact-requests",  },
    ],
  },
  {
    title: "Career Management",
    list: [
      { menu: "All Jobs", icon: Icon.list, path: "/career" },
      { menu: "Create Job", icon: Icon.plus, path: "/career/create" },
      { menu: "Job Requests", icon: Icon.people, path: "/career/requests" },
    ],
  },
  {
    title: "Blog Management",
    list: [
      { menu: "Blogs", icon: Icon.journal, path: "/blogs" },
      { menu: "Add Blog", icon: Icon.journalPlus, path: "/blogs/create" },
    ],
  },
  {
    title: "Policy Management",
    list: [
      { menu: "Privacy Policies", icon: Icon.journal, path: "/privacy-policy" },
      { menu: "Add Privacy Policy", icon: Icon.shieldPlus, path: "/privacy-policy/create" },
    ],
  },
];

function Sidebar({ isCollapsed, onToggle }) {
  const router = useRouter();
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState(["Dashboard", "Page Management", "Appointments"]);

  const toggleSection = (title) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <>
      <style>{styles}</style>

      {/* Collapse / Expand Toggle */}
      <div
        className={`sb-toggle ${isCollapsed ? "collapsed" : ""}`}
        onClick={onToggle}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          style={{ transform: isCollapsed ? "rotate(180deg)" : "none", transition: "transform 0.28s" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width={13}
          height={13}
          color="#0b6f1e"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>

      <aside className={`sb-root ${isCollapsed ? "collapsed" : ""}`}>

        {/* ── Brand ── */}
        <div className="sb-brand">
          <div className="">
            <img
             src="/assets/new-logo.webp"
             alt="logo"
             className="sb-brand-img"
           />
          </div>
          <div className="sb-brand-text">
            <span className="sb-brand-name">AdminPanel</span>
            <span className="sb-brand-sub">Management Suite</span>
          </div>
        </div>

        {/* ── User Card ── */}
        {/* <div className="sb-user">
          <div className="sb-avatar">AD</div>
          <div className="sb-user-info">
            <div className="sb-user-name">Admin User</div>
            <div className="sb-user-role">Super Admin</div>
          </div>
        </div> */}

        {/* ── Navigation ── */}
        <nav className="sb-nav">
          {navItems.map((section, i) => (
            <div key={i} className="sb-section">
              {i !== 0 && <div className="sb-divider" />}

              {/* Section Header */}
              <div
                className="sb-section-header"
                onClick={() => toggleSection(section.title)}
              >
                <span className="sb-section-label">{section.title}</span>
                <span
                  className={`sb-chevron ${openSections.includes(section.title) ? "open" : ""}`}
                >
                  {Icon.chevronDown}
                </span>
              </div>

{isCollapsed ? (
  <ul className="sb-list">
    {section.list.map((item, j) => (
      <li key={j} className="sb-item-wrap">
        <div
          className={`sb-item ${
            pathname === item.path ? "active" : ""
          }`}
          onClick={() => router.push(item.path)}
        >
          <span className="sb-icon">{item.icon}</span>
        </div>

        <span className="sb-tooltip">{item.menu}</span>
      </li>
    ))}
  </ul>
) : (
  openSections.includes(section.title) && (
     <ul className="sb-list">
                  {section.list.map((item, j) => (
                    <li key={j} className="sb-item-wrap">
                      <div
                        className={`sb-item ${pathname === item.path ? "active" : ""}`}
                        onClick={() => router.push(item.path)}
                      >
                        <span className="sb-icon">{item.icon}</span>
                        <span className="sb-label">{item.menu}</span>
                        {/* {item.badge && (
                          <span className="sb-badge">{item.badge}</span>
                        )} */}
                      </div>
                      <span className="sb-tooltip">{item.menu}</span>
                    </li>
                  ))}
                </ul>
  )
)}
              {/* Items */}
{/* {!isCollapsed && openSections.includes(section.title) && (
                <ul className="sb-list">
                  {section.list.map((item, j) => (
                    <li key={j} className="sb-item-wrap">
                      <div
                        className={`sb-item ${pathname === item.path ? "active" : ""}`}
                        onClick={() => router.push(item.path)}
                      >
                        <span className="sb-icon">{item.icon}</span>
                        <span className="sb-label">{item.menu}</span>
                        {item.badge && (
                          <span className="sb-badge">{item.badge}</span>
                        )}
                      </div>
                      <span className="sb-tooltip">{item.menu}</span>
                    </li>
                  ))}
                </ul>
              )} */}
            </div>
          ))}
        </nav>

        {/* ── Footer ── */}
        {/* <div className="sb-footer">
          <div
            className="sb-footer-item"
            onClick={() => router.push("/settings")}
          >
            <span className="sb-icon">{Icon.settingsIcon}</span>
            <span className="sb-label">Settings</span>
          </div>
          <div className="sb-footer-item danger">
            <span className="sb-icon">{Icon.logout}</span>
            <span className="sb-label">Logout</span>
          </div>
        </div> */}

      </aside>
    </>
  );
}

export default Sidebar;