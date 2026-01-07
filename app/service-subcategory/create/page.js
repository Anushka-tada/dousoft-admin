"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { getServiceCategoryServ } from '@/app/services/serviceCategory.service';
import { createServiceCategoryServ } from "@/app/services/serviceSubcategory.service";
import Editor from "@/app/Components/Editor";

const kpiData = [
  {
    title: "Total Subcategories",
    value: "1,245",
    delta: "+5.2% from last month",
    icon: "bi-diagram-3",
  },
  {
    title: "Active Subcategories",
    value: "872",
    delta: "+3.8% from last month",
    icon: "bi-check2-circle",
  },
  {
    title: "Inactive Subcategories",
    value: "234",
    delta: "+6.1% from last month",
    icon: "bi-x-circle",
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
  const [categories, setCategories] = useState([]);

  /* =======================
      FETCH CATEGORIES
  ======================= */
  const fetchCategories = async () => {
    try {
      const res = await getServiceCategoryServ();
      setCategories(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* KPI SECTION */}
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
                      <div className="value my-2">{item.value}</div>
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

      {/* FORM */}
      <div className="container-fluid">
        <div className="col-lg-12 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="ms-1 mb-0">Create Service Subcategory</h5>
          </div>

          <Formik
            initialValues={{
              categoryId: "",
              name: "",
              type: "general",
              status: "active",
               content: "",   
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const payload = {
                  categoryId: values.categoryId,
                  name: values.name,
                  type: values.type,
                  status: values.status,
                    content: values.content, 
                };

                console.log("Payload:", payload);

                const res = await createServiceCategoryServ(payload);

                toast.success(
                  res?.data?.message || "Subcategory created successfully"
                );
                resetForm();
                router.push("/service-subcategory");
              } catch (err) {
                console.error(err);
                toast.error(
                  err?.response?.data?.message || "Something went wrong"
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (

              <Form>
                <div className="form-section shadow-sm mb-3">
                  <div className="form-section-header">
                    Service Subcategory Details
                  </div>

                  <div className="form-section-body row g-3">
                    {/* CATEGORY */}
                    <div className="col-md-4">
                      <label className="form-label">
                        Service Category <span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="categoryId"
                        className="form-select"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="categoryId"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    {/* SUBCATEGORY NAME */}
                    <div className="col-md-4">
                      <label className="form-label">
                        Subcategory Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Subcategory Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    {/* TYPE */}
                    <div className="col-md-2">
                      <label className="form-label">
                        Type <span className="text-danger">*</span>
                      </label>
                      <Field as="select" name="type" className="form-select">
                        <option value="general">General</option>
                        <option value="city">City</option>
                        <option value="technology">Technology</option>
                      </Field>
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    {/* STATUS */}
                    <div className="col-md-2">
                      <label className="form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <Field as="select" name="status" className="form-select">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTENT SECTION */}
<div className="form-section shadow-sm mb-3">
  <div className="form-section-header">
    Subcategory Page Content
  </div>

  <div className="form-section-body">
    <Editor
      value={values.content}
      onChange={(content) =>
        setFieldValue("content", content)
      }
    />
  </div>
</div>


             

                {/* BUTTONS */}
                <div className="d-flex justify-content-end align-items-center mb-5 mt-4">
                  <button type="reset" className="btn btn-danger me-2">
                    Cancel
                  </button>
                  <button
                    className="btn bgThemePrimary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Save Subcategory"}
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
