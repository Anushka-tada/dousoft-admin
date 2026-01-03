"use client";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { deleteServiceCategoryServ, getServiceCategoryServ } from '../services/serviceSubcategory.service';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const kpiData = [
  {
    title: "Total Service Categories",
    value: "1,245",
    delta: "+5.2% from last month",
    icon: "bi-journal-text",
  },
  {
    title: "Active Category",
    value: "872",
    delta: "+3.8% from last month",
    icon: "bi-check2-circle",
  },
  {
    title: "Inactivity Category",
    value: "234",
    delta: "+6.1% from last month",
    icon: "bi-currency-rupee",
  },
  {
    title: "Jobs",
    value: "1,032",
    delta: "+4.5% from last month",
    icon: "bi-people",
  },
];

const Page = () => {
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("Select Status");

  const [subCategories, setSubCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  /* =======================
      FETCH SUBCATEGORIES
  ======================= */
  const fetchSubCategories = async () => {
    try {
      const res = await getServiceCategoryServ();
      setSubCategories(res?.data?.data || []);
      setAllSubCategories(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSubCategories();
  }, []);

  /* =======================
      DELETE SUBCATEGORY
  ======================= */
  const handleDeleteFunc = async () => {
    try {
      const res = await deleteServiceCategoryServ(deleteId);
      toast.success(res?.data?.message || "Deleted successfully");
      fetchSubCategories();
      setShowConfirm(false);
      setDeleteId(null);
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  /* =======================
      STATUS FILTER
  ======================= */
  const handleStatusFilter = (status) => {
    setLabel(status);
    setOpen(false);

    if (status === "All") {
      setSubCategories(allSubCategories);
    } else {
      setSubCategories(
        allSubCategories.filter(
          (item) => item.status === status.toLowerCase()
        )
      );
    }
  };

  return (
    <>
        <div className="container-fluid main-content-box py-3 ms-0">
      <div className="container maxw-1400">
        <div className="row g-3">
          {kpiData.map((item, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div className="card-soft p-4 kpi">
                <div className="d-flex justify-content-between align-items-center">
                  <span
                    className="icon"
                    style={{
                      background: "#f4f6ff",
                      color: "var(--primary)",
                    }}
                  >
                    <i className={`bi ${item.icon}`} />
                  </span>

                  <div className="card-soft-content">
                    <div className="text-uppercase small">
                      {item.title}
                    </div>
                    <div className="value my-2">
                      {item.value}
                    </div>
                    <div className="delta text-success">
                      {item.delta}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


      <div className="container-fluid user-table py-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center my-4">
          <h4 className="mb-0">All Service Subcategories</h4>

          <div className="d-flex align-items-center">
            {/* Search */}
            <form className="input-group search ms-2 d-none d-md-flex">
              <span className="input-group-text input-span">
                <i className="bi bi-search" />
              </span>
              <input
                type="search"
                className="form-control search-input"
                placeholder="Name"
              />
            </form>

            {/* Status Filter */}
            <div className="dropdown me-2">
              <button
                className="btn btn-light dropdown-toggle border height37"
                type="button"
                onClick={() => setOpen(!open)}
                style={{ width: "200px", fontSize: "14px" }}
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

            {/* Add Button */}
            <button
              className="btn bgThemePrimary shadow-sm"
              onClick={() => router.push("/service-subcategory/create")}
            >
              + Add Subcategory
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
                    <th>Subcategory Name</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {subCategories.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No subcategories found
                      </td>
                    </tr>
                  ) : (
                    subCategories.map((item, index) => (
                      <tr key={item._id}>
                        <td className="text-center">{index + 1}</td>

                        <td>{item.name}</td>

                        <td>{item.categoryId?.name || "-"}</td>

                        <td>
                          <span className="bg-primary badge px-3">
                            {item.type}
                          </span>
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
                          {/* Edit */}
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() =>
                              router.push(
                                `/service-subcategory/update/${item._id}`
                              )
                            }
                          >
                            <i className="bi bi-pencil" />
                          </button>

                          {/* Delete */}
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
          title="Delete Subcategory"
          body="Do you really want to delete this subcategory?"
        />
      </div>
    </>
  );
};

export default Page;
