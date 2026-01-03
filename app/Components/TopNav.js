"use client";

import React from 'react'
// import { useGlobalState } from "../GlobalProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TopNav({setIsCollapsed, isCollapsed}) {
  // const { globalState, setGlobalState } = useGlobalState();
    const router = useRouter();
   const handleLogoutFunc = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // setGlobalState({
      //   user: null,
      //   token: null,
      //   permissions: null,
      // });
      toast.success("Admin logged out successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("permissions");
      router.push("/");
    }
  };
  return (
   <div className="topbar">
          {/* ye mobile view ka menu button hai */}
          <button id="hamburger" className="btn btn-light d-lg-none"  onClick={()=>setIsCollapsed(!isCollapsed)}>
            <i className="bi bi-list" />
          </button>
          {/* ye desktop view ke liye hai */}
          <button
            id="toggleCollapse"
            className="btn btn-sm menuBtn d-none d-lg-inline-flex"
            onClick={()=>setIsCollapsed(!isCollapsed)}
          >
            <i className="bi bi-justify " />
          </button>
          <form className="input-group search ms-2 d-none d-md-flex">
            <span className="input-group-text input-span">
              <i className="bi bi-search" />
            </span>
            <input
              type="search"
              className="form-control search-input"
              placeholder="Search Dashboard, Users, Orders ..."
            />
          </form>
          <div className="ms-auto d-flex align-items-center gap-2">
            <button  className="btn btn-light"  onClick={()=>alert("Dark Mode is in progress")}>
              <i className="bi bi-moon" />
            </button>
            {/* Notifications */}
            <div className="dropdown" data-hover="dropdown">
              <button
                className="btn btn-light position-relative"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell" />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-end p-0 shadow"
                style={{ minWidth: 340 }}
              >
                <div
                  className="p-3 border-bottom"
                  style={{ borderColor: "var(--border)" }}
                >
                  <strong>Notifications</strong>
                </div>
                <div className="p-2">
                  <a
                    className="dropdown-item d-flex gap-2 align-items-start rounded"
                    href="#"
                  >
                    <span className="circle-8 bg-success mt-2" />
                    <span>
                      <div className="fw-semibold">Order #T12563 completed</div>
                      <small className="text-muted">2m ago</small>
                    </span>
                  </a>
                  <a
                    className="dropdown-item d-flex gap-2 align-items-start rounded"
                    href="#"
                  >
                    <span className="circle-8 bg-warning mt-2" />
                    <span>
                      <div className="fw-semibold">Server load high</div>
                      <small className="text-muted">18m ago</small>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {/* Profile */}
            <div className="dropdown" data-hover="dropdown">
              <button
                className="btn btn-light d-flex align-items-center gap-2"
                data-bs-toggle="dropdown"

              >
                {/* <img
                  src= {globalState?.user?.profilePic || "https://static.vecteezy.com/system/resources/previews/051/718/888/non_2x/3d-cartoon-boy-avatar-with-open-mouth-and-eyes-free-png.png"}
                  className="rounded-circle"
                  width={28}
                  height={28}
                  alt="avatar"
                /> */}
                <img
  src="https://static.vecteezy.com/system/resources/previews/051/718/888/non_2x/3d-cartoon-boy-avatar-with-open-mouth-and-eyes-free-png.png"
  className="rounded-circle"
  width={28}
  height={28}
  alt="avatar"
/>

              </button>
              <div className="dropdown-menu dropdown-menu-end shadow card-soft">
                <a className="dropdown-item cursor" onClick={()=>router.push("/my-profile")}>
                  <i className="bi bi-person me-2" /> Profile
                </a>
                 <a className="dropdown-item cursor" onClick={()=>router.push("/permissions")}>
                  <i className="bi bi-grid me-2" /> Permissions
                </a>
                
                <div className="dropdown-divider" />
                <a className="dropdown-item text-danger cursor" onClick={()=>handleLogoutFunc()} >
                  <i className="bi bi-box-arrow-right me-2" />
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
  )
}

export default TopNav