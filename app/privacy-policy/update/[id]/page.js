"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import BlogEditor from "@/app/Components/BlogEditor";
import { getSingleBlogServ, UpdateBlogServ } from "@/app/services/blog.service"; 
import { getSinglePolicyServ, updatePolicyServ } from "@/app/services/policy.service";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);

  // 🔹 Fetch Policy
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await getSinglePolicyServ(id); 
        const data = res.data.data;

        setInitialValues({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "active",
          order: data.order || 0,
        });
      } catch (err) {
        toast.error("Failed to load policy");
      }
    };

    if (id) fetchPolicy();
  }, [id]);

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="container-fluid">
      <div className="col-lg-12 p-4">

        <h5 className="mb-4">Update Privacy Policy</h5>

        <Formik
          enableReinitialize
          initialValues={initialValues}

          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                title: values.title,
                description: values.description,
                status: values.status,
                order: values.order || 0,
              };

              await updatePolicyServ(id, payload); 

              toast.success("Policy updated successfully");
              router.push("/privacy-policy");

            } catch (err) {
              toast.error(err.message || "Update failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>

              {/* CONTENT (EDITOR) */}
              <div className="mb-3">
                <label className="form-label">
                  Content <span className="text-danger">*</span>
                </label>

                <BlogEditor
                  value={values.description}
                  onChange={(content) =>
                    setFieldValue("description", content)
                  }
                />

                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* TITLE */}
              <div className="mb-3">
                <label className="form-label">
                  Title <span className="text-danger">*</span>
                </label>

                <Field
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

              {/* ORDER */}
              <div className="mb-3">
                <label className="form-label">
                  Order
                </label>

                <Field
                  type="number"
                  name="order"
                  className="form-control"
                />
              </div>

              {/* STATUS */}
              <div className="mb-3">
                <label className="form-label">
                  Status
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

              <button
                type="submit"
                className="btn bgThemePrimary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Policy"}
              </button>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default Page;