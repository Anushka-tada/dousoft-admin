import React from "react";

const kpiData = [
  {
    title: "Total Appointments",
    value: "1,245",
    delta: "+5.2% from last month",
    icon: "bi-journal-text",
  },
  {
    title: "Total Blogs",
    value: "872",
    delta: "+3.8% from last month",
    icon: "bi-check2-circle",
  },
  {
    title: "Total Users",
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

function Dashboard() {
  return (
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
  );
}

export default Dashboard;
