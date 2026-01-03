"use client";
import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createServiceCategoryServ } from "@/app/services/serviceCategory.service";

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
    const [formData, setFormData] = useState(null);

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

      <div className="container-fluid">
        <div className="col-lg-12 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="ms-1 mb-0">Create Service Category</h5>
          </div>

          <Formik
            initialValues={{
              name: "",
              status: "active",
              order: 1,
              description: ""
            }}
         onSubmit={async (values, { setSubmitting, resetForm }) => {
  try {
    const payload = {
      name: values.name,
      slug: values.slug,
      status: values.status,
      order: values.order,
      description: values.description
    };

    console.log("Payload:", payload);

    const res = await createServiceCategoryServ(payload);

    console.log("API Response:", res);

    toast.success("Service category created successfully");
    resetForm();
    router.push("/service-category");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Something went wrong");
  } finally {
    setSubmitting(false);
  }
}}

          >
            {({ isSubmitting }) => (
              <Form>
                {/* Category Details */}
                <div className="form-section shadow-sm mb-3">
                  <div className="form-section-header">
                    Service Category Details
                  </div>

                  <div className="form-section-body row g-3">
                    {/* Category Name */}
                    <div className="col-md-4">
                      <label className="form-label">
                        Category Name <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Category Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    {/* Slug */}
                    {/* <div className="col-md-4">
                      <label className="form-label">
                        Slug <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="slug"
                        className="form-control"
                        placeholder="enter-category-slug"
                      />
                      <ErrorMessage
                        name="slug"
                        component="div"
                        className="text-danger small"
                      />
                    </div> */}

                    {/* Status */}
                    <div className="col-md-2">
                      <label className="form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="status"
                        className="form-select"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    {/* Order */}
                    <div className="col-md-2">
                      <label className="form-label">
                        Order <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="number"
                        name="order"
                        className="form-control"
                        min="1"
                      />
                      <ErrorMessage
                        name="order"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                     <div className="col-md-4">
                      <label className="form-label">
                        Category description <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Enter Category Description"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="d-flex justify-content-end align-items-center mb-5 mt-4">
                  <button type="reset" className="btn btn-danger me-2">
                    Cancel
                  </button>
                  <button
                    className="btn bgThemePrimary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Save Category"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Page;
 