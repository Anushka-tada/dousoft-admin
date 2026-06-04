// "use client";

// import { useState } from "react";
// import Sidebar from "./Components/Sidebar";
// import TopNav from "./Components/TopNav";

// export default function LayoutClient({ children }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className="app-layout">
//       <Sidebar isCollapsed={isCollapsed} />

//       <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
//         <TopNav
//           setIsCollapsed={setIsCollapsed}
//           isCollapsed={isCollapsed}
//         />

//         <div className="content">{children}</div>
//       </div>
//     </div>
//   );
// }


















// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Sidebar from "./Components/Sidebar";
// import TopNav from "./Components/TopNav";

// const publicRoutes = ["/authentication"];

// export default function LayoutClient({ children }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null;

//   /* =========================
//      🔐 AUTH GUARD
//   ========================= */
//   useEffect(() => {
//     if (!token && !publicRoutes.includes(pathname)) {
//       router.push("/authentication");
//     }

//     if (token && pathname === "/authentication") {
//       router.push("/dashboard");
//     }
//   }, [pathname]);

//   /* =========================
//      ❌ LOGIN PAGE LAYOUT
//   ========================= */
//   if (publicRoutes.includes(pathname)) {
//     return <>{children}</>;
//   }

//   /* =========================
//      ✅ ADMIN LAYOUT
//   ========================= */
//   return (
//     <div className="app-layout">
//       <Sidebar isCollapsed={isCollapsed} />

//       <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
//         <TopNav
//           setIsCollapsed={setIsCollapsed}
//           isCollapsed={isCollapsed}
//         />

//         <div className="content">{children}</div>
//       </div>
//     </div>
//   );
// }




















// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Sidebar from "./Components/Sidebar";
// import TopNav from "./Components/TopNav";

// const publicRoutes = ["/authentication"];

// export default function LayoutClient({ children }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const [token, setToken] = useState(null);

//   const router = useRouter();
//   const pathname = usePathname();

//   /* =========================
//      🟢 CLIENT MOUNT CHECK
//   ========================= */
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setIsMounted(true);
//     const storedToken = localStorage.getItem("admin_token");
// setToken(storedToken);

//   }, []);

//   /* =========================
//      🔐 AUTH GUARD
//   ========================= */
//   useEffect(() => {
//     if (!isMounted) return;

//     if (!token && !publicRoutes.includes(pathname)) {
//       router.replace("/authentication");
//     }

//     if (token && pathname === "/authentication") {
//       router.replace("/dashboard");
//     }
//   }, [token, pathname, isMounted]);

//   /* =========================
//      ⏳ LOADING (important)
//   ========================= */
//   if (!isMounted) {
//     return null; // or loader
//   }

//   /* =========================
//      ❌ LOGIN PAGE (NO LAYOUT)
//   ========================= */
//   if (publicRoutes.includes(pathname)) {
//     return <>{children}</>;
//   }

//   /* =========================
//      ✅ ADMIN LAYOUT
//   ========================= */
//   return (
//     <div className="app-layout">
//       <Sidebar isCollapsed={isCollapsed} />

//       <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
//         <TopNav
//           setIsCollapsed={setIsCollapsed}
//           isCollapsed={isCollapsed}
//         />

//         <div className="content">{children}</div>
//       </div>
//     </div>
//   );
// }














"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import TopNav from "./Components/TopNav";

const publicRoutes = ["/authentication"];

export default function LayoutClient({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  /* =========================
     🟢 CLIENT MOUNT
  ========================= */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  /* =========================
     🔐 AUTH GUARD (NO STATE)
  ========================= */
  useEffect(() => {
    if (!isMounted) return;

    const token = localStorage.getItem("admin_token");

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/authentication");
    }

    if (token && pathname === "/authentication") {
      router.replace("/dashboard");
    }
  }, [pathname, isMounted]);

  if (!isMounted) return null;

  if (publicRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="app-layout">
      <Sidebar isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        <TopNav
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
