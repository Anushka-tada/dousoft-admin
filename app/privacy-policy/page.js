/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { useRouter } from "next/navigation";
import { deleteBlogServ, getBlogsServ } from "../services/blog.service";
import { getPolicyServ } from "../services/policy.service";

const Page = () => {
  const router = useRouter();

  const [policies, setPolicies] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("All Status");

  // 🔹 Fetch Policies
  const fetchPolicies = async () => {
    try {
      const res = await getPolicyServ(); 
      setPolicies(res?.data?.data || []);
      setAllPolicies(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 KPI Data
  const kpiData = [
    {
      title: "Total Policies",
      value: policies.length,
      icon: "bi-file-text",
    },
    {
      title: "Active",
      value: policies.filter(p => p.status === "active").length,
      icon: "bi-check-circle",
    },
    {
      title: "Inactive",
      value: policies.filter(p => p.status === "inactive").length,
      icon: "bi-x-circle",
    },
  ];

  useEffect(() => {
    fetchPolicies();
  }, []);

  // 🔥 Delete Policy
  const handleDeleteFunc = async () => {
    try {
      await deleteBlogServ(deleteId); // 👉 change later
      setShowConfirm(false);
      fetchPolicies();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Status Filter
  const handleStatusFilter = (status) => {
    setLabel(status);
    setOpen(false);

    if (status === "All") {
      setPolicies(allPolicies);
    } else {
      setPolicies(
        allPolicies.filter(
          (item) => item.status.toLowerCase() === status.toLowerCase()
        )
      );
    }
  };

  // 🔍 Search Filter
  const filteredPolicies = policies.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* KPI Section */}
      <div className="container-fluid main-content-box py-3">
        <div className="container maxw-1400">
          <div className="row g-3">
            {kpiData.map((item, index) => (
              <div className="col-12 col-sm-6 col-lg-4" key={index}>
                <div className="card-soft p-4 kpi">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="icon">
                      <i className={`bi ${item.icon}`} />
                    </span>
                    <div>
                      <div className="small">{item.title}</div>
                      <div className="value">{item.value}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container-fluid user-table py-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h4 className="mb-0">Privacy Policies</h4>

          <div className="d-flex align-items-center">
            {/* Search */}
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Status Filter */}
            <div className="dropdown me-2">
              <button
                className="btn btn-light dropdown-toggle border"
                onClick={() => setOpen(!open)}
              >
                {label}
              </button>
              {open && (
                <ul className="dropdown-menu show">
                  {["All", "Active", "Inactive"].map((item) => (
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
              className="btn bgThemePrimary"
              onClick={() => router.push("/privacy-policy/create")}
            >
              + Add Policy
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPolicies.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredPolicies.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "active"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() =>
                            router.push(`/privacy-policy/update/${item._id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowConfirm(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Modal */}
        <ConfirmDeleteModal
          show={showConfirm}
          handleClose={() => setShowConfirm(false)}
          handleConfirm={handleDeleteFunc}
          title="Delete Policy"
          body="Do you really want to delete this policy?"
        />
      </div>
    </>
  );
};

export default Page;