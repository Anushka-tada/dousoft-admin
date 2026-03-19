"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import BlogEditor from "@/app/Components/BlogEditor"; // reuse editor
import * as Yup from "yup";
import { createBlogServ } from "@/app/services/blog.service"; // baad me change kar lena
import { createpolicyServ } from "@/app/services/policy.service";

const Page = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    status: Yup.string().required("Status is required"),
  });

  return (
    <div className="container-fluid">
      <div className="col-lg-12 p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="ms-1 mb-0">Create Privacy Policy</h5>
        </div>

        <Formik
          initialValues={{
            title: "",
            content: "",
            status: "active",
            order: 0,
          }}
          validationSchema={validationSchema}

          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const payload = {
                title: values.title,
                description: values.content, // 👈 backend me description use ho raha hai
                status: values.status,
                order: values.order || 0,
              };

              await createpolicyServ(payload); 

              toast.success("Policy created successfully");

              resetForm();
              router.push("/privacy-policy");

            } catch (err) {
              toast.error(
                err?.response?.data?.message || "Something went wrong"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>

              <div className="form-section shadow-sm mb-3">
                <div className="form-section-header">
                  Policy Details
                </div>

                <div className="form-section-body row g-3">

                  {/* Content */}
                  <div className="col-md-12">
                    <label className="form-label">
                      Content <span className="text-danger">*</span>
                    </label>

                    <BlogEditor
                      value={values.content}
                      onChange={(content) =>
                        setFieldValue("content", content)
                      }
                    />

                    <ErrorMessage
                      name="content"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  {/* Title */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Title <span className="text-danger">*</span>
                    </label>

                    <Field
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter title"
                    />

                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  {/* Order */}
                  <div className="col-md-3">
                    <label className="form-label">
                      Order
                    </label>

                    <Field
                      type="number"
                      name="order"
                      className="form-control"
                    />
                  </div>

                  {/* Status */}
                  <div className="col-md-3">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>

                    <Field
                      as="select"
                      name="status"
                      className="form-select"
                    >
                      <option value="">Select</option>
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

              <div className="d-flex justify-content-end mt-4 mb-5">
                <button type="reset" className="btn btn-danger me-2">
                  Cancel
                </button>

                <button
                  className="btn bgThemePrimary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Save Policy"}
                </button>
              </div>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default Page;