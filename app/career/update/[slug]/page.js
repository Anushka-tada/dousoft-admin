"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { getSingleCareerServ, updateCareerServ } from "../../../services/career.service";

const Page = () => {
  const router = useRouter();
  const { slug } = useParams();

  const [initialValues, setInitialValues] = useState(null);

  // 🔹 Fetch Job by Slug
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getSingleCareerServ(slug);
        const data = res.data.data;

        setInitialValues({
          title: data.title || "",
          location: data.location || "",
          jobType: data.jobType || "",
          experience: data.experience || "",
          status: data.status || "active",
        });

      } catch (err) {
        toast.error("Failed to load job");
      }
    };

    if (slug) fetchJob();
  }, [slug]);

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="container-fluid">
      <div className="col-lg-12 p-4">

        <h5 className="mb-4">Update Job</h5>

        <Formik
          enableReinitialize
          initialValues={initialValues}

          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                title: values.title,
                location: values.location,
                jobType: values.jobType,
                experience: values.experience,
                status: values.status,
              };

              await updateCareerServ(slug, payload);

              toast.success("Job updated successfully");
              router.push("/career");

            } catch (err) {
              toast.error(err.message || "Update failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* TITLE */}
              <div className="mb-3">
                <label className="form-label">
                  Job Title <span className="text-danger">*</span>
                </label>

                <Field
                  name="title"
                  className="form-control"
                  placeholder="Enter job title"
                />

                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* LOCATION */}
              <div className="mb-3">
                <label className="form-label">
                  Location <span className="text-danger">*</span>
                </label>

                <Field
                  name="location"
                  className="form-control"
                  placeholder="Enter location"
                />
              </div>

              {/* JOB TYPE */}
              <div className="mb-3">
                <label className="form-label">
                  Job Type
                </label>

                <Field
                  as="select"
                  name="jobType"
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </Field>
              </div>

              {/* EXPERIENCE */}
              <div className="mb-3">
                <label className="form-label">
                  Experience
                </label>

                <Field
                  name="experience"
                  className="form-control"
                  placeholder="e.g. 2+ years"
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
                {isSubmitting ? "Updating..." : "Update Job"}
              </button>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default Page;