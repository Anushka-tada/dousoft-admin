// "use client";

// import React from 'react'
// // import { useGlobalState } from "../GlobalProvider";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState } from 'react';


// function TopNav({setIsCollapsed, isCollapsed}) {

//   const [open, setOpen] = useState(false);

//   // const { globalState, setGlobalState } = useGlobalState();
//     const router = useRouter();
//    const handleLogoutFunc = () => {
//     const confirmed = window.confirm("Are you sure you want to logout?");
//     if (confirmed) {
//       // setGlobalState({
//       //   user: null,
//       //   token: null,
//       //   permissions: null,
//       // });

//       toast.success("Admin logged out successfully");

//      localStorage.removeItem("admin_token");
//   localStorage.removeItem("admin_user");
//       router.replace("/authentication");
//     }
//   };
//   return (
//    <div className="topbar">
//           {/* ye mobile view ka menu button hai */}
//           <button id="hamburger" className="btn btn-light d-lg-none"  onClick={()=>setIsCollapsed(!isCollapsed)}>
//             <i className="bi bi-list" />
//           </button>
//           {/* ye desktop view ke liye hai */}
//           <button
//             id="toggleCollapse"
//             className="btn btn-sm menuBtn d-none d-lg-inline-flex"
//             onClick={()=>setIsCollapsed(!isCollapsed)}
//           >
//             <i className="bi bi-justify " />
//           </button>
//           <form className="input-group search ms-2 d-none d-md-flex">
//             <span className="input-group-text input-span">
//               <i className="bi bi-search" />
//             </span>
//             <input
//               type="search"
//               className="form-control search-input"
//               placeholder="Search Dashboard, Users, Orders ..."
//             />
//           </form>
//           <div className="ms-auto d-flex align-items-center gap-2">
//             <button  className="btn btn-light"  onClick={()=>alert("Dark Mode is in progress")}>
//               <i className="bi bi-moon" />
//             </button>
//             {/* Notifications */}
//             <div className="dropdown" data-hover="dropdown">
//               <button
//                 className="btn btn-light position-relative"
//                 data-bs-toggle="dropdown"
//               >
//                 <i className="bi bi-bell" />
//                 <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
//               </button>
//               <div
//                 className="dropdown-menu dropdown-menu-end p-0 shadow"
//                 style={{ minWidth: 340 }}
//               >
//                 <div
//                   className="p-3 border-bottom"
//                   style={{ borderColor: "var(--border)" }}
//                 >
//                   <strong>Notifications</strong>
//                 </div>
//                 <div className="p-2">
//                   <a
//                     className="dropdown-item d-flex gap-2 align-items-start rounded"
//                     href="#"
//                   >
//                     <span className="circle-8 bg-success mt-2" />
//                     <span>
//                       <div className="fw-semibold">Order #T12563 completed</div>
//                       <small className="text-muted">2m ago</small>
//                     </span>
//                   </a>
//                   <a
//                     className="dropdown-item d-flex gap-2 align-items-start rounded"
//                     href="#"
//                   >
//                     <span className="circle-8 bg-warning mt-2" />
//                     <span>
//                       <div className="fw-semibold">Server load high</div>
//                       <small className="text-muted">18m ago</small>
//                     </span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             {/* Profile */}
//            <div className="dropdown position-relative">
//   <button
//     className="btn btn-light d-flex align-items-center gap-2"
//     onClick={() => setOpen(!open)}
//   >
//     <img
//       src="https://static.vecteezy.com/system/resources/previews/051/718/888/non_2x/3d-cartoon-boy-avatar-with-open-mouth-and-eyes-free-png.png"
//       className="rounded-circle"
//       width={28}
//       height={28}
//       alt="avatar"
//     />
//   </button>

//   {open && (
//     <div className="dropdown-menu  shadow card-soft show" style={{right: 0}}>
//       <button
//         className="dropdown-item"
//         onClick={() => {
//           setOpen(false);
//           router.push("/my-profile");
//         }}
//       >
//         <i className="bi bi-person me-2" /> Profile
//       </button>

//       <button
//         className="dropdown-item"
//         onClick={() => {
//           setOpen(false);
//           router.push("/permissions");
//         }}
//       >
//         <i className="bi bi-grid me-2" /> Permissions
//       </button>

//       <div className="dropdown-divider" />

//       <button
//         className="dropdown-item text-danger"
//         onClick={handleLogoutFunc}
//       >
//         <i className="bi bi-box-arrow-right me-2" /> Logout
//       </button>
//     </div>
//   )}
// </div>

//           </div>
//         </div>
//   )
// }

// export default TopNav


"use client"
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

function Topbar({ isCollapsed, onToggleSidebar }) {
  const router = useRouter();
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Page title from pathname
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (!segments.length) return "Dashboard";
    const last = segments[segments.length - 1];
    return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
  };

  // Breadcrumbs
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return [{ label: "Home", path: "/dashboard" }, ...segments.map((s, i) => ({
      label: s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "),
      path: "/" + segments.slice(0, i + 1).join("/"),
    }))];
  };

  const notifications = [
    { id: 1, icon: "bi bi-calendar-check", text: "New appointment from Rahul Sharma", time: "2 min ago", unread: true },
    { id: 2, icon: "bi bi-envelope", text: "Contact request from Priya Verma", time: "15 min ago", unread: true },
    { id: 3, icon: "bi bi-briefcase", text: "Job application received", time: "1 hr ago", unread: false },
    { id: 4, icon: "bi bi-journal-plus", text: "Blog post published successfully", time: "3 hr ago", unread: false },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const breadcrumbs = getBreadcrumbs();

  const handleLogout = () => {
  const confirmed = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmed) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    toast.success("Admin logged out successfully");

    router.replace("/authentication");
  }
};

  return (
    <>
    

      <header className="tb-root">
        {/* Left */}
        <div className="tb-left">
          <button className="tb-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
            <i className="bi bi-layout-sidebar-inset" />
          </button>

          <div className="tb-title-wrap">
            <span className="tb-page-title">{getPageTitle()}</span>
            <nav className="tb-breadcrumb" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  {i < breadcrumbs.length - 1 ? (
                    <>
                      <a onClick={() => router.push(crumb.path)}>{crumb.label}</a>
                      <span className="sep">›</span>
                    </>
                  ) : (
                    <span className="current">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Search */}
        <div className="tb-search">
          <i className="bi bi-search" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>

        {/* Right */}
        <div className="tb-right">
          {/* Theme toggle */}
          {/* <button className="tb-theme-pill" aria-label="Toggle theme">
            <i className="bi bi-moon" />
            Dark
          </button> */}

          {/* Notifications */}
          {/* <div style={{ position: "relative" }} ref={notifRef}>
            <button className="tb-icon-btn" onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }} aria-label="Notifications">
              <i className="bi bi-bell" />
              {unreadCount > 0 && <span className="tb-badge">{unreadCount}</span>}
            </button>

            {notifOpen && (
              <div className="tb-dropdown tb-notif-dd">
                <div className="tb-dd-header">
                  <h6>Notifications</h6>
                  <button>Mark all read</button>
                </div>
                <div className="tb-notif-list">
                  {notifications.map((n) => (
                    <div key={n.id} className={`tb-notif-item ${n.unread ? "unread" : ""}`}>
                      <div className="tb-notif-icon"><i className={n.icon} /></div>
                      <div>
                        <div className="tb-notif-text">{n.text}</div>
                        <div className="tb-notif-time">{n.time}</div>
                      </div>
                      {n.unread && <span className="tb-unread-dot" />}
                    </div>
                  ))}
                </div>
                <div className="tb-dd-footer">
                  <a onClick={() => router.push("/notifications")}>View all notifications →</a>
                </div>
              </div>
            )}
          </div> */}

          {/* Settings */}
          {/* <button className="tb-icon-btn" onClick={() => router.push("/settings")} aria-label="Settings">
            <i className="bi bi-gear" />
          </button> */}

          {/* Profile */}
          <div style={{ position: "relative" }} ref={profileRef}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 6px", borderRadius: 9, transition: "background 0.13s" }}
              onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f0fdf4"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div className="tb-avatar-lg">AK</div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", whiteSpace: "nowrap" }}>Admin</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}> Admin</div>
              </div>
              <i className="bi bi-chevron-down" style={{ fontSize: 11, color: "#9ca3af", marginLeft: 2 }} />
            </div>

            {profileOpen && (
              <div className="tb-dropdown tb-profile-dd">
                <div className="tb-profile-header">
                  <div className="tb-avatar-lg">AK</div>
                  <div>
                    <div className="tb-profile-name">Admin</div>
                    <div className="tb-profile-role"> Admin</div>
                  </div>
                </div>
                <div className="tb-profile-menu">
                  {/* <div className="tb-profile-item" onClick={() => router.push("/profile")}>
                    <i className="bi bi-person" /> My Profile
                  </div>
                  <div className="tb-profile-item" onClick={() => router.push("/settings")}>
                    <i className="bi bi-gear" /> Settings
                  </div>
                  <div className="tb-profile-item">
                    <i className="bi bi-shield-check" /> Security
                  </div> */}
                  <div className="tb-profile-divider" />
                  {/* <div className="tb-profile-item danger" onClick={() => router.push("/logout")}>
                    <i className="bi bi-box-arrow-right" /> Logout
                  </div> */}
                  <div
  className="tb-profile-item danger"
  onClick={handleLogout}
>
  <i className="bi bi-box-arrow-right" /> Logout
</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Topbar;