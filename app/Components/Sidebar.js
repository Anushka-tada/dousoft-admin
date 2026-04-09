"use client"
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";


function Sidebar({ isCollapsed }) {
 const router = useRouter();          // ✅ replaced
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState([]);

  const toggleMenu = (menu) => {
    setIsOpen((prev) =>
      prev.includes(menu)
        ? prev.filter((m) => m !== menu)
        : [...prev, menu]
    );
  };

  const navItems = [
    {
      title: "Dashboard",
      list: [
        {
          menu: "Dashboard",
          path: "/dashboard",
          icon: "bi bi-speedometer2",
        },
        {
          menu: "Users",
          path: "/analytics",
          icon: "bi bi-graph-up",
        },
      ],
    },
    {
      title: "Appointment Management",
      list: [
        {
          menu: "Appointments",
          icon: "bi bi-cash-coin",
          path:"/appointments"
        },
         {
          menu: "Contact Requests",
          icon: "bi bi-cash-coin",
          path:"/contact-requests"
        },
       
      ],
    },
    {
      title: "Career Management",
      list: [
        {
          menu: "All Jobs",
          icon: "bi bi-people",
           path:"/career"
        },
          {
          menu: "Create Job",
          icon: "bi bi-people",
           path:"/career/create"
        },
         {
          menu: "Job Requests",
          icon: "bi bi-people",
           path:"/career/requests"
        },
      ],
    },
    {
      title: "Service Management",
      list: [
        {
          menu: "Service Category",
          icon: "bi bi-gear",
          path: "/service-category",
        },

         {
          menu: "Add Service Category",
          icon: "bi bi-plus-circle",
          path: "/service-category/create",
        },

          {
          menu: "Service SubCategory",
          icon: "bi bi-gear",
          path: "/service-subcategory",
        },

         {
          menu: "Add Service SubCategory",
         icon: "bi bi-plus-circle",
          path: "/service-subcategory/create",
        },
       
      ],
    },
     {
      title: "Blog Management",
      list: [
        {
          menu: "Blogs",
          icon: "bi bi-journal-text",
          path: "/blogs",
        },

         {
          menu: "Add Blog",
         icon: "bi bi-journal-plus",
          path: "/blogs/create",
        },
       
      ],
    },
     {
      title: "Policy Management",
      list: [
        {
          menu: "Privacy policies",
          icon: "bi bi-journal-text",
          path: "/privacy-policy",
        },

         {
          menu: "Add Privacy Policy",
         icon: "bi bi-journal-plus",
          path: "/privacy-policy/create",
        },
       
      ],
    },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <div className="">
          <img src="/assets/logo.png" alt="logo" width="100%" />
        </div>
      </div>

      <nav className="menu">
        {navItems.map((section, i) => (
          <div key={i} className="mb-4">
            {!isCollapsed && (
              <div className="section-title">{section.title}</div>
            )}

            <ul className="list-unstyled m-0">
              {section.list.map((item, j) => {
                if (item.subMenu) {
                  return (
                    <li key={j} className="nav-item">
                      <a
                        className="nav-link cursor"
                        onClick={() => toggleMenu(item.menu)}
                      >
                        <i className={item.icon} />
                        <span className="text">{item.menu}</span>
                        <i className="bi bi-chevron-down caret" />
                      </a>

                      {!isCollapsed && isOpen.includes(item.menu) && (
                        <div className="submenu">
                          {item.subMenu.map((sub, k) => (
                            <a
                              key={k}
                              className={`subitem ${
                                                              pathname === sub.path ? "active" : ""

                              
                              }`}
                              onClick={() => router.push(sub.path)} 
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={j} className="nav-item">
                    <a
                      className={`nav-link cursor ${
                        pathname === item.path ? "active" : ""
                      }`}
                      onClick={() => router.push(item.path)}
                    >
                      <i className={item.icon} />
                      <span className="text">{item.menu}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
