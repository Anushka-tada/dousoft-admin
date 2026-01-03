"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import {
  updateServiceCategoryServ,
  singleServiceCategoryServ
} from "@/app/services/serviceCategory.service";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);

 
  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const res = await singleServiceCategoryServ(id);

        setInitialValues({
          name: res.data.data.name || "",
          status: res.data.data.status || "active",
          order: res.data.data.order || 1,
          description: res.data.data.description || ""
        });
      } catch (error) {
        toast.error("Failed to load category");
      }
    };

    fetchCategory();
  }, [id]);

  /* ======================
     🔹 LOADING STATE
  ====================== */
  if (!initialValues) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="col-lg-12 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="ms-1 mb-0">Update Service Category</h5>
          </div>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const payload = {
                  name: values.name,
                  status: values.status,
                  order: values.order,
                  description: values.description
                };

                const res = await updateServiceCategoryServ(id, payload);

                toast.success(res.data.message);
                router.push("/service-category");
              } catch (err) {
                toast.error(
                  err?.response?.data?.message || "Update failed"
                );
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
                    {/* Name */}
                    <div className="col-md-4">
                      <label className="form-label">
                        Category Name <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

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
                    </div>

                     {/* Name */}
                    <div className="col-md-4">
                      <label className="form-label">
                        Category Description <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="description"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-end mb-5 mt-4">
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => router.push("/service-category")}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn bgThemePrimary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Category"}
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
