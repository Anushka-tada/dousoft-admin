/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { useRouter } from "next/navigation";
import {  getCareerServ } from "../services/career.service";

const Page = () => {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("All Status");

  // 🔹 Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await getCareerServ();
      setJobs(res?.data?.data || []);
      setAllJobs(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 KPI Data
  const kpiData = [
    {
      title: "Total Jobs",
      value: jobs.length,
      icon: "bi-briefcase",
    },
    {
      title: "Active Jobs",
      value: jobs.filter((j) => j.status === "active").length,
      icon: "bi-check2-circle",
    },
    {
      title: "Inactive Jobs",
      value: jobs.filter((j) => j.status === "inactive").length,
      icon: "bi-x-circle",
    },
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🔥 Delete Job
  const handleDeleteFunc = async () => {
    try {
    //   await deleteCareerServ(deleteId);
      setShowConfirm(false);
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Status Filter
  const handleStatusFilter = (status) => {
    setLabel(status);
    setOpen(false);

    if (status === "All") {
      setJobs(allJobs);
    } else {
      setJobs(
        allJobs.filter(
          (item) => item.status.toLowerCase() === status.toLowerCase()
        )
      );
    }
  };

  // 🔍 Search Filter
  const filteredJobs = jobs.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* KPI */}
      <div className="container-fluid main-content-box py-3">
        <div className="container maxw-1400">
          <div className="row g-3">
            {kpiData.map((item, index) => (
              <div className="col-12 col-sm-6 col-lg-3" key={index}>
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

      {/* TABLE */}
      <div className="container-fluid user-table py-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h4 className="mb-0">All Jobs</h4>

          <div className="d-flex align-items-center">
            {/* Search */}
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search job title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Status Filter */}
            <div className="dropdown me-2">
              <button
                className="btn btn-light border dropdown-toggle"
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
              onClick={() => router.push("/career/create")}
            >
              + Add Job
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No jobs found
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.location}</td>
                      <td>{item.jobType}</td>
                      <td>{item.experience}</td>

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

                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() =>
                            router.push(`/career/update/${item._id}`)
                          }
                        >
                          ✏️
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            setDeleteId(item._id);
                            setShowConfirm(true);
                          }}
                        >
                          🗑
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
          title="Delete Job"
          body="Do you really want to delete this job?"
        />
      </div>
    </>
  );
};

export default Page;