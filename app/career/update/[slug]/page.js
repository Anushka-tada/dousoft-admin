// "use client";
// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useRouter, useParams } from "next/navigation";
// import { toast } from "react-toastify";

// import { getSingleCareerServ, updateCareerServ } from "../../../services/career.service";

// const Page = () => {
//   const router = useRouter();
//   const { slug } = useParams();

//   const [initialValues, setInitialValues] = useState(null);

//   // 🔹 Fetch Job by Slug
//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const res = await getSingleCareerServ(slug);
//         const data = res.data.data;

//         setInitialValues({
//           title: data.title || "",
//           location: data.location || "",
//           jobType: data.jobType || "",
//           experience: data.experience || "",
//           status: data.status || "active",
//         });

//       } catch (err) {
//         toast.error("Failed to load job");
//       }
//     };

//     if (slug) fetchJob();
//   }, [slug]);

//   if (!initialValues) return <p>Loading...</p>;

//   return (
//     <div className="container-fluid">
//       <div className="col-lg-12 p-4">

//         <h5 className="mb-4">Update Job</h5>

//         <Formik
//           enableReinitialize
//           initialValues={initialValues}

//           onSubmit={async (values, { setSubmitting }) => {
//             try {
//               const payload = {
//                 title: values.title,
//                 location: values.location,
//                 jobType: values.jobType,
//                 experience: values.experience,
//                 status: values.status,
//               };

//               await updateCareerServ(slug, payload);

//               toast.success("Job updated successfully");
//               router.push("/career");

//             } catch (err) {
//               toast.error(err.message || "Update failed");
//             } finally {
//               setSubmitting(false);
//             }
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form>

//               {/* TITLE */}
//               <div className="mb-3">
//                 <label className="form-label">
//                   Job Title <span className="text-danger">*</span>
//                 </label>

//                 <Field
//                   name="title"
//                   className="form-control"
//                   placeholder="Enter job title"
//                 />

//                 <ErrorMessage
//                   name="title"
//                   component="div"
//                   className="text-danger small"
//                 />
//               </div>

//               {/* LOCATION */}
//               <div className="mb-3">
//                 <label className="form-label">
//                   Location <span className="text-danger">*</span>
//                 </label>

//                 <Field
//                   name="location"
//                   className="form-control"
//                   placeholder="Enter location"
//                 />
//               </div>

//               {/* JOB TYPE */}
//               <div className="mb-3">
//                 <label className="form-label">
//                   Job Type
//                 </label>

//                 <Field
//                   as="select"
//                   name="jobType"
//                   className="form-select"
//                 >
//                   <option value="">Select</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Internship">Internship</option>
//                   <option value="Remote">Remote</option>
//                 </Field>
//               </div>

//               {/* EXPERIENCE */}
//               <div className="mb-3">
//                 <label className="form-label">
//                   Experience
//                 </label>

//                 <Field
//                   name="experience"
//                   className="form-control"
//                   placeholder="e.g. 2+ years"
//                 />
//               </div>

//               {/* STATUS */}
//               <div className="mb-3">
//                 <label className="form-label">
//                   Status
//                 </label>

//                 <Field
//                   as="select"
//                   name="status"
//                   className="form-select"
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </Field>
//               </div>

//               <button
//                 type="submit"
//                 className="btn bgThemePrimary"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Updating..." : "Update Job"}
//               </button>

//             </Form>
//           )}
//         </Formik>

//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { getSingleCareerServ, updateCareerServ } from "../../../services/career.service";
import {
  IconBriefcase,
  IconArrowLeft,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";

const Page = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getSingleCareerServ(slug);
        const data = res.data.data;
        setInitialValues({
          title:      data.title      || "",
          location:   data.location   || "",
          jobType:    data.jobType    || "",
          experience: data.experience || "",
          status:     data.status     || "active",
        });
      } catch (err) {
        toast.error("Failed to load job");
      }
    };
    if (slug) fetchJob();
  }, [slug]);

  if (!initialValues) {
    return (
      <div className="form-page">
        <div className="form-loading">
          <span className="form-loading-spinner" />
          Loading job details…
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">

      {/* ── Page Header ── */}
      <div className="form-page-header">
        <div className="form-page-header-left">
          <button
            className="form-back-btn"
            onClick={() => router.push("/career")}
            type="button"
          >
            <IconArrowLeft size={16} />
          </button>
          <div>
            <h4 className="form-page-title">Update Job</h4>
            <p className="form-page-subtitle">Edit the details of this job opening</p>
          </div>
        </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateCareerServ(slug, values);
            toast.success("Job updated successfully");
            router.push("/career");
          } catch (err) {
            toast.error(err?.response?.data?.message || "Update failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>

            {/* ── Section: Job Details ── */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <IconBriefcase size={17} />
                </div>
                Job Details
              </div>

              <div className="form-card-body">
                <div className="form-row">

                  {/* Title */}
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Job Title <span className="form-required">*</span>
                    </label>
                    <Field
                      name="title"
                      className="form-control"
                      placeholder="Enter job title"
                    />
                    <ErrorMessage name="title" component="div" className="form-error" />
                  </div>

                  {/* Location */}
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Location <span className="form-required">*</span>
                    </label>
                    <Field
                      name="location"
                      className="form-control"
                      placeholder="e.g. Remote / Indore"
                    />
                    <ErrorMessage name="location" component="div" className="form-error" />
                  </div>

                  {/* Job Type */}
                  <div className="form-group col-md-4">
                    <label className="form-label">Job Type</label>
                    <Field as="select" name="jobType" className="form-select">
                      <option value="">Select type</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="internship">Internship</option>
                      <option value="remote">Remote</option>
                    </Field>
                    <ErrorMessage name="jobType" component="div" className="form-error" />
                  </div>

                  {/* Experience */}
                  <div className="form-group col-md-4">
                    <label className="form-label">Experience</label>
                    <Field
                      name="experience"
                      className="form-control"
                      placeholder="e.g. 2+ years"
                    />
                    <ErrorMessage name="experience" component="div" className="form-error" />
                  </div>

                  {/* Status */}
                  <div className="form-group col-md-4">
                    <label className="form-label">Status</label>
                    <Field as="select" name="status" className="form-select">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="form-error" />
                  </div>

                </div>
              </div>
            </div>

            {/* ── Form Actions ── */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-form-cancel"
                onClick={() => router.push("/career")}
              >
                <IconX size={15} />
                Cancel
              </button>
              <button
                type="submit"
                className="btn-form-submit"
                disabled={isSubmitting}
              >
                <IconDeviceFloppy size={15} />
                {isSubmitting ? "Updating…" : "Update Job"}
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;