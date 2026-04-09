/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../Components/ConfirmDeleteModal";
import { useRouter } from "next/navigation";
import {
  getCareerRequestsServ,
} from "../../services/career.service";

const Page = () => {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("All Status");

  const [showView, setShowView] = useState(false);
const [selectedData, setSelectedData] = useState(null);

  // 🔹 Fetch Requests
  const fetchRequests = async () => {
    try {
      const res = await getCareerRequestsServ();
      setRequests(res?.data?.data || []);
      setAllRequests(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔹 KPI Data
  const kpiData = [
    {
      title: "Total Applications",
      value: requests.length,
      icon: "bi-people",
    },
    {
      title: "Pending",
      value: requests.filter((r) => r.status === "pending").length,
      icon: "bi-hourglass",
    },
    {
      title: "Selected",
      value: requests.filter((r) => r.status === "selected").length,
      icon: "bi-check-circle",
    },
    {
      title: "Rejected",
      value: requests.filter((r) => r.status === "rejected").length,
      icon: "bi-x-circle",
    },
  ];

  // 🔥 Delete Request
  const handleDeleteFunc = async () => {
    try {
    //   await deleteJobRequestServ(deleteId);
      setShowConfirm(false);
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Status Filter
  const handleStatusFilter = (status) => {
    setLabel(status);
    setOpen(false);

    if (status === "All") {
      setRequests(allRequests);
    } else {
      setRequests(
        allRequests.filter(
          (item) => item.status.toLowerCase() === status.toLowerCase()
        )
      );
    }
  };

  // 🔍 Search Filter
  const filteredRequests = requests.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h4 className="mb-0">Job Applications</h4>

          <div className="d-flex align-items-center">
            {/* Search */}
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search candidate name"
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
                  {["All", "Pending", "Selected", "Rejected"].map((item) => (
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
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Job</th>
                  <th>Status</th>
                  <th>Resume</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>

                      <td>{item.jobId?.title || "-"}</td>

                      <td>
                        <span
                          className={`badge ${
                            item.status === "selected"
                              ? "bg-success"
                              : item.status === "rejected"
                              ? "bg-danger"
                              : "bg-warning"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        {item.resume ? (
                          <button
                            onClick={() => {
    setSelectedData(item);
    setShowView(true);
  }}
                        
                            className="btn btn-sm btn-outline-info"
                          >
                            View
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
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
          title="Delete Application"
          body="Do you really want to delete this application?"
        />
      </div>

      <ViewModal
  show={showView}
  handleClose={() => setShowView(false)}
  data={selectedData}
/>
    </>
  );
};

export default Page;

const ViewModal = ({ show, handleClose, data }) => {
  if (!show || !data) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Job Application Details</h5>
            <button className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body">

            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Name:</strong> {data.name}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Email:</strong> {data.email}
              </div>

              <div className="col-md-6 mb-2">
                <strong>Phone:</strong> {data.phone}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Experience:</strong> {data.experience}
              </div>

              <div className="col-md-6 mb-2">
                <strong>LinkedIn:</strong>{" "}
                <a href={data.linkedin} target="_blank">
                  {data.linkedin}
                </a>
              </div>

              <div className="col-md-6 mb-2">
                <strong>Portfolio:</strong>{" "}
                <a href={data.portfolio} target="_blank">
                  {data.portfolio}
                </a>
              </div>

              <div className="col-12 mb-3">
                <strong>Cover Letter:</strong>
                <p className="mt-1">{data.coverLetter}</p>
              </div>

              {/* Resume Button */}
              <div className="col-12">
                <strong>Resume:</strong><br />
                <a
                  href={data.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm mt-2"
                >
                  View Resume
                </a>
              </div>
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>

        </div>
      </div>

      {/* backdrop */}
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};