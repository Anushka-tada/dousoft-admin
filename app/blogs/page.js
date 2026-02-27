"use client";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("All Status");

  // 🔹 Dummy Blog Data
  const dummyBlogs = [
    {
      _id: "1",
      title: "How to Choose the Right Service",
      author: "Admin",
      status: "published",
      createdAt: "2024-01-10",
    },
    {
      _id: "2",
      title: "Top 10 Maintenance Tips",
      author: "Editor",
      status: "draft",
      createdAt: "2024-01-15",
    },
    {
      _id: "3",
      title: "Why Regular Servicing Matters",
      author: "Admin",
      status: "published",
      createdAt: "2024-01-20",
    },
  ];

  // 🔹 KPI Data
  const kpiData = [
    {
      title: "Total Blogs",
      value: dummyBlogs.length,
      delta: "+4% this month",
      icon: "bi-journal-text",
    },
    {
      title: "Published",
      value: dummyBlogs.filter(b => b.status === "published").length,
      delta: "+2% this month",
      icon: "bi-check2-circle",
    },
    {
      title: "Drafts",
      value: dummyBlogs.filter(b => b.status === "draft").length,
      delta: "+1% this month",
      icon: "bi-file-earmark",
    },
    {
      title: "Authors",
      value: "2",
      delta: "Stable",
      icon: "bi-people",
    },
  ];

  useEffect(() => {
    setBlogs(dummyBlogs);
    setAllBlogs(dummyBlogs);
  }, []);

  // 🔥 Delete Blog (Local)
  const handleDeleteFunc = () => {
    const updated = blogs.filter((item) => item._id !== deleteId);
    setBlogs(updated);
    setAllBlogs(updated);
    setShowConfirm(false);
    setDeleteId(null);
  };

  // 🔹 Status Filter
  const handleStatusFilter = (status) => {
    setLabel(status);
    setOpen(false);

    if (status === "All") {
      setBlogs(allBlogs);
    } else {
      setBlogs(
        allBlogs.filter(
          (item) => item.status.toLowerCase() === status.toLowerCase()
        )
      );
    }
  };

  // 🔍 Search Filter
  const filteredBlogs = blogs.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* KPI Section */}
      <div className="container-fluid main-content-box py-3">
        <div className="container maxw-1400">
          <div className="row g-3">
            {kpiData.map((item, index) => (
              <div className="col-12 col-sm-6 col-lg-3" key={index}>
                <div className="card-soft p-4 kpi">
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className="icon"
                      style={{ background: "#f4f6ff", color: "var(--primary)" }}
                    >
                      <i className={`bi ${item.icon}`} />
                    </span>
                    <div className="card-soft-content">
                      <div className="text-uppercase small">{item.title}</div>
                      <div className="value my-2">{item.value}</div>
                      <div className="delta text-success">{item.delta}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="container-fluid user-table py-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center my-4">
          <h4 className="mb-0">All Blogs</h4>

          <div className="d-flex align-items-center">
            {/* Search */}
            <form className="input-group search d-none d-md-flex me-2">
              <span className="input-group-text">
                <i className="bi bi-search" />
              </span>
              <input
                type="search"
                className="form-control"
                placeholder="Search blog title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            {/* Status Filter */}
            <div className="dropdown me-2">
              <button
                className="btn btn-light dropdown-toggle border"
                onClick={() => setOpen(!open)}
                style={{ width: "180px", fontSize: "14px" }}
              >
                {label}
              </button>
              {open && (
                <ul className="dropdown-menu show">
                  {["All", "Published", "Draft"].map((item) => (
                    <li key={item}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleStatusFilter(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              className="btn bgThemePrimary shadow-sm"
              onClick={() => router.push("/blogs/create")} style={{whiteSpace:"nowrap"}}
            >
              + Add Blog
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">Sr No.</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No blogs found
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((item, index) => (
                      <tr key={item._id}>
                        <td className="text-center">{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.createdAt}</td>
                        <td className="text-center">
                          <span
                            className={`badge ${
                              item.status === "published"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() =>
                              router.push(`/blogs/update/${item._id}`)
                            }
                          >
                            <i className="bi bi-pencil" />
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              setDeleteId(item._id);
                              setShowConfirm(true);
                            }}
                          >
                            <i className="bi bi-trash" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        <ConfirmDeleteModal
          show={showConfirm}
          handleClose={() => setShowConfirm(false)}
          handleConfirm={handleDeleteFunc}
          title="Delete Blog"
          body="Do you really want to delete this blog?"
        />
      </div>
    </>
  );
};

export default Page;