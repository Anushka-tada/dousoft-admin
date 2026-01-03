"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import {
  updateServiceCategoryServ,
  singleServiceCategoryServ
} from "@/app/services/serviceSubcategory.service";

import { getServiceCategoryServ } from "@/app/services/serviceCategory.service";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);
  const [categories, setCategories] = useState([]);

  /* ======================
     FETCH CATEGORIES
  ====================== */
  const fetchCategories = async () => {
    try {
      const res = await getServiceCategoryServ();
      setCategories(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  /* ======================
     FETCH SUBCATEGORY
  ====================== */
  useEffect(() => {
    if (!id) return;

    const fetchSubCategory = async () => {
      try {
        const res = await singleServiceCategoryServ(id);

        setInitialValues({
          categoryId: res.data.data.categoryId?._id || "",
          name: res.data.data.name || "",
          type: res.data.data.type || "general",
          status: res.data.data.status || "active",
        });
      } catch (error) {
        toast.error("Failed to load subcategory");
      }
    };

    fetchCategories();
    fetchSubCategory();
  }, [id]);

  /* ======================
     LOADING STATE
  ====================== */
  if (!initialValues) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="col-lg-12 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="ms-1 mb-0">Update Service Subcategory</h5>
          </div>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const payload = {
                  categoryId: values.categoryId,
                  name: values.name,
                  type: values.type,
                  status: values.status,
                };

                const res = await updateServiceCategoryServ(id, payload);

                toast.success(res?.data?.message || "Updated successfully");
                router.push("/service-subcategory");
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
                <div className="form-section shadow-sm mb-3">
                  <div className="form-section-header">
                    Service Subcategory Details
                  </div>

                  <div className="form-section-body row g-3">
                    {/* CATEGORY */}
                    <div className="col-md-4">
                      <label className="form-label">
                        Service Category{" "}
                        <span className="text-danger">*</span>
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
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="d-flex justify-content-end mb-5 mt-4">
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => router.push("/service-subcategory")}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn bgThemePrimary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Subcategory"}
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
