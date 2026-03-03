

"use client";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { deleteContactRequestServ, getContactRequestServ } from "../services/appointment.service";

const Page = () => {
  const [appointments, setAppointments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 🔹 Dummy Appointments Data
  const dummyAppointments = [
    {
      _id: "1",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      message: "Need service appointment urgently",
    },
    {
      _id: "2",
      name: "Priya Singh",
      email: "priya@gmail.com",
      phone: "9123456789",
      message: "Please call me back tomorrow",
    },
    {
      _id: "3",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9988776655",
      message: "Looking for consultation",
    },
  ];

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

  const [searchTerm, setSearchTerm] = useState("");


  const getContactRequest = async () => {
    try{
      const res = await getContactRequestServ();
      console.log(res?.data.data)
      setAppointments(res?.data.data);
    }
    catch(err){
      console.log("err");
    } 
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
      getContactRequest()
  }, []);

  // 🔥 Delete Appointment (Local State Only)
  const handleDeleteFunc = async () => {
     try{
       const res = await deleteContactRequestServ(deleteId);
       console.log(res);
       setShowConfirm(false);
       getContactRequest();

     }catch(err){
      console.log(err)
     }
  };

  return (
    <div className="container-fluid user-table py-3">

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

      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h4 className="mb-0">All Appointments</h4>

        <form className="input-group search d-none d-md-flex" style={{ width: "250px" }}>
          <span className="input-group-text">
            <i className="bi bi-search" />
          </span>
         <input
  type="search"
  className="form-control search-input"
  placeholder="Name"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
        </form>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center">Sr No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Message</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((item, index) => (
                    <tr key={item._id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.message}</td>
                      <td className="text-center">
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
        title="Delete Appointment"
        body="Do you really want to delete this Contact Request"
      />
    </div>
  );
};

export default Page;