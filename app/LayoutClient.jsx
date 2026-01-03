"use client";

import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import TopNav from "./Components/TopNav";

export default function LayoutClient({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isCollapsed={isCollapsed} />

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
