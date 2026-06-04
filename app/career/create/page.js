// "use client";
// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import { createCareerServ } from "@/app/services/career.service";

// const Page = () => {
//   const router = useRouter();

//   const validationSchema = Yup.object({
//     title: Yup.string().required("Title is required"),
//     slug: Yup.string().required("Slug is required"),
//     location: Yup.string().required("Location is required"),
//     jobType: Yup.string().required("Job Type is required"),
//     experience: Yup.string().required("Experience is required"),
//     status: Yup.string().required("Status is required"),
//   });

//   return (
//     <div className="container-fluid">
//       <div className="col-lg-12 p-4">

//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h5 className="ms-1 mb-0">Create Job</h5>
//         </div>

//         <Formik
//           initialValues={{
//             title: "",
//             slug: "",
//             location: "",
//             jobType: "",
//             experience: "",
//             status: "",
//           }}
//           validationSchema={validationSchema}

//           onSubmit={async (values, { setSubmitting, resetForm }) => {
//             try {
//               await createCareerServ(values);

//               toast.success("Job created successfully");

//               resetForm();
//               router.push("/career");

//             } catch (err) {
//               toast.error(
//                 err?.response?.data?.message || "Something went wrong"
//               );
//             } finally {
//               setSubmitting(false);
//             }
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form>

//               <div className="form-section shadow-sm mb-3">
//                 <div className="form-section-header">
//                   Job Details
//                 </div>

//                 <div className="form-section-body row g-3">

//                   {/* Title */}
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       Title <span className="text-danger">*</span>
//                     </label>
//                     <Field
//                       type="text"
//                       name="title"
//                       className="form-control"
//                       placeholder="Enter job title"
//                     />
//                     <ErrorMessage name="title" component="div" className="text-danger small" />
//                   </div>

//                   {/* Slug */}
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       Slug <span className="text-danger">*</span>
//                     </label>
//                     <Field
//                       type="text"
//                       name="slug"
//                       className="form-control"
//                       placeholder="job-slug"
//                     />
//                     <ErrorMessage name="slug" component="div" className="text-danger small" />
//                   </div>

//                   {/* Location */}
//                   <div className="col-md-4">
//                     <label className="form-label">
//                       Location <span className="text-danger">*</span>
//                     </label>
//                     <Field
//                       type="text"
//                       name="location"
//                       className="form-control"
//                       placeholder="e.g. Remote / Indore"
//                     />
//                     <ErrorMessage name="location" component="div" className="text-danger small" />
//                   </div>

//                   {/* Job Type */}
//                   <div className="col-md-4">
//                     <label className="form-label">
//                       Job Type <span className="text-danger">*</span>
//                     </label>
//                     <Field
//                       as="select"
//                       name="jobType"
//                       className="form-select"
//                     >
//                       <option value="">Select</option>
//                       <option value="full-time">Full Time</option>
//                       <option value="part-time">Part Time</option>
//                       <option value="internship">Internship</option>
//                     </Field>
//                     <ErrorMessage name="jobType" component="div" className="text-danger small" />
//                   </div>

//                   {/* Experience */}
//                   <div className="col-md-4">
//                     <label className="form-label">
//                       Experience <span className="text-danger">*</span>
//                     </label>
//                     <Field
//                       type="text"
//                       name="experience"
//                       className="form-control"
//                       placeholder="e.g. 1-3 years"
//                     />
//                     <ErrorMessage name="experience" component="div" className="text-danger small" />
//                   </div>

//                   {/* Status */}
//                   <div className="col-md-4">
//                     <label className="form-label">
//                       Status <span className="text-danger">*</span>
//                     </label>
//                     <Field
//                       as="select"
//                       name="status"
//                       className="form-select"
//                     >
//                       <option value="">Select</option>
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </Field>
//                     <ErrorMessage name="status" component="div" className="text-danger small" />
//                   </div>

//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="d-flex justify-content-end mt-4 mb-5">
//                 <button type="reset" className="btn btn-danger me-2">
//                   Cancel
//                 </button>

//                 <button
//                   className="btn bgThemePrimary"
//                   type="submit"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Submitting..." : "Save Job"}
//                 </button>
//               </div>

//             </Form>
//           )}
//         </Formik>

//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createCareerServ } from "@/app/services/career.service";
import {
  IconBriefcase,
  IconArrowLeft,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";

const validationSchema = Yup.object({
  title:      Yup.string().required("Title is required"),
  slug:       Yup.string().required("Slug is required"),
  location:   Yup.string().required("Location is required"),
  jobType:    Yup.string().required("Job Type is required"),
  experience: Yup.string().required("Experience is required"),
  status:     Yup.string().required("Status is required"),
});

const Page = () => {
  const router = useRouter();

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
            <h4 className="form-page-title">Create Job</h4>
            <p className="form-page-subtitle">Add a new job opening to your careers page</p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={{
          title: "",
          slug: "",
          location: "",
          jobType: "",
          experience: "",
          status: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await createCareerServ(values);
            toast.success("Job created successfully");
            resetForm();
            router.push("/career");
          } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
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
                      Title <span className="form-required">*</span>
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="e.g. Frontend Developer"
                    />
                    <ErrorMessage name="title" component="div" className="form-error" />
                  </div>

                  {/* Slug */}
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Slug <span className="form-required">*</span>
                    </label>
                    <Field
                      type="text"
                      name="slug"
                      className="form-control"
                      placeholder="e.g. frontend-developer"
                    />
                    <ErrorMessage name="slug" component="div" className="form-error" />
                  </div>

                  {/* Location */}
                  <div className="form-group col-md-4">
                    <label className="form-label">
                      Location <span className="form-required">*</span>
                    </label>
                    <Field
                      type="text"
                      name="location"
                      className="form-control"
                      placeholder="e.g. Remote / Indore"
                    />
                    <ErrorMessage name="location" component="div" className="form-error" />
                  </div>

                  {/* Job Type */}
                  <div className="form-group col-md-4">
                    <label className="form-label">
                      Job Type <span className="form-required">*</span>
                    </label>
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
                    <label className="form-label">
                      Experience <span className="form-required">*</span>
                    </label>
                    <Field
                      type="text"
                      name="experience"
                      className="form-control"
                      placeholder="e.g. 1–3 years"
                    />
                    <ErrorMessage name="experience" component="div" className="form-error" />
                  </div>

                  {/* Status */}
                  <div className="form-group col-md-4">
                    <label className="form-label">
                      Status <span className="form-required">*</span>
                    </label>
                    <Field as="select" name="status" className="form-select">
                      <option value="">Select status</option>
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
                {isSubmitting ? "Saving…" : "Save Job"}
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;