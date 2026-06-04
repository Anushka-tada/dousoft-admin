
// "use client";
// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import BlogEditor from "@/app/Components/BlogEditor";
// import * as Yup from "yup";
// import { createpolicyServ } from "@/app/services/policy.service";

// const validationSchema = Yup.object({
//   title:   Yup.string().required("Title is required"),
//   content: Yup.string().required("Content is required"),
//   status:  Yup.string().required("Status is required"),
// });

// const FieldError = ({ name }) => (
//   <ErrorMessage name={name}>
//     {(msg) => (
//       <div className="field-error">
//         <i className="bi bi-exclamation-circle" style={{ fontSize: 11 }} />
//         {msg}
//       </div>
//     )}
//   </ErrorMessage>
// );

// const Page = () => {
//   const router = useRouter();

//   return (
//     <div className="form-page">

//       {/* Page header */}
//       <div className="form-page-header">
//         <div className="form-page-title">
//           <div className="title-icon">
//             <i className="bi bi-shield-check" />
//           </div>
//           Create Privacy Policy
//         </div>
//         <button
//           className="form-back-btn"
//           onClick={() => router.push("/privacy-policy")}
//         >
//           <i className="bi bi-arrow-left" style={{ fontSize: 13 }} />
//           Back to Policies
//         </button>
//       </div>

//       <Formik
//         initialValues={{
//           title:   "",
//           content: "",
//           status:  "active",
//           order:   0,
//         }}
//         validationSchema={validationSchema}
//         onSubmit={async (values, { setSubmitting, resetForm }) => {
//           try {
//             const payload = {
//               title:       values.title,
//               description: values.content,
//               status:      values.status,
//               order:       values.order || 0,
//             };
//             await createpolicyServ(payload);
//             toast.success("Policy created successfully");
//             resetForm();
//             router.push("/privacy-policy");
//           } catch (err) {
//             toast.error(err?.response?.data?.message || "Something went wrong");
//           } finally {
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ isSubmitting, setFieldValue, values }) => (
//           <Form>

//             {/* ── Section 1: Content Editor ── */}
//             <div className="form-card">
//               <div className="form-card-header">
//                 <i className="bi bi-pencil-square" />
//                 <span>Policy Content</span>
//               </div>
//               <div className="form-card-body">
//                 <label className="form-label">
//                   Content <span className="req">*</span>
//                 </label>
//                 <BlogEditor
//                   value={values.content}
//                   onChange={(content) => setFieldValue("content", content)}
//                 />
//                 <FieldError name="content" />
//               </div>
//             </div>

//             {/* ── Section 2: Policy Details ── */}
//             <div className="form-card">
//               <div className="form-card-header">
//                 <i className="bi bi-info-circle" />
//                 <span>Policy Details</span>
//               </div>
//               <div className="form-card-body">
//                 <div className="row g-3">

//                   <div className="col-md-6">
//                     <label className="form-label">
//                       Title <span className="req">*</span>
//                     </label>
//                     <Field
//                       name="title"
//                       type="text"
//                       className="form-control"
//                       placeholder="e.g. Data Collection Policy"
//                     />
//                     <FieldError name="title" />
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label">Order</label>
//                     <Field
//                       name="order"
//                       type="number"
//                       className="form-control"
//                       placeholder="0"
//                       min="0"
//                     />
//                     <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 4 }}>
//                       Display order on page
//                     </div>
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label">
//                       Status <span className="req">*</span>
//                     </label>
//                     <Field as="select" name="status" className="form-select">
//                       <option value="">Select status</option>
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </Field>
//                     <FieldError name="status" />
//                   </div>

//                 </div>
//               </div>
//             </div>

//             {/* ── Actions ── */}
//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="btn-form-cancel"
//                 onClick={() => router.push("/privacy-policy")}
//               >
//                 <i className="bi bi-x-lg" style={{ fontSize: 12 }} />
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn-form-submit"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <><div className="spinner" /> Saving…</>
//                 ) : (
//                   <><i className="bi bi-check2" style={{ fontSize: 15 }} /> Save Policy</>
//                 )}
//               </button>
//             </div>

//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { getSinglePolicyServ, updatePolicyServ } from "@/app/services/policy.service";
import BlogEditor from "@/app/Components/BlogEditor";
import {
  IconArrowLeft,
  IconShieldCheck,
  IconInfoCircle,
  IconDeviceFloppy,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react";

const validationSchema = Yup.object({
  title:   Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  status:  Yup.string().required("Status is required"),
  order:   Yup.number().min(0, "Order must be 0 or more"),
});

const FieldError = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <div className="form-error">
        <IconAlertCircle size={11} />
        {msg}
      </div>
    )}
  </ErrorMessage>
);

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await getSinglePolicyServ(id);
        const data = res?.data;
        setInitialValues({
          title:   data?.title   || "",
          content: data?.description || "",
          status:  data?.status  || "",
          order:   data?.order   ?? 0,
        });
      } catch (err) {
        toast.error("Failed to load policy");
        router.push("/privacy-policy");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPolicy();
  }, [id]);

  if (loading) {
    return (
      <div className="form-page">
        <div className="form-loading">Loading…</div>
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
            onClick={() => router.push("/privacy-policy")}
            type="button"
          >
            <IconArrowLeft size={16} />
          </button>
          <div>
            <h4 className="form-page-title">Update Privacy Policy</h4>
            <p className="form-page-subtitle">Edit and update the privacy policy section</p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const payload = {
              title:       values.title,
              description: values.content,
              status:      values.status,
              order:       values.order || 0,
            };
            await updatePolicyServ(id, payload);
            toast.success("Policy updated successfully");
            router.push("/privacy-policy");
          } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>

            {/* ── Section 1: Policy Content ── */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <IconShieldCheck size={17} />
                </div>
                Policy Content
              </div>
              <div className="form-card-body">
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Content <span className="form-required">*</span>
                  </label>
                  <BlogEditor
                    value={values.content}
                    onChange={(content) => setFieldValue("content", content)}
                  />
                  <FieldError name="content" />
                </div>
              </div>
            </div>

            {/* ── Section 2: Policy Details ── */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <IconInfoCircle size={17} />
                </div>
                Policy Details
              </div>
              <div className="form-card-body">
                <div className="form-row">

                  {/* Title */}
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Title <span className="form-required">*</span>
                    </label>
                    <Field
                      name="title"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Data Collection Policy"
                    />
                    <FieldError name="title" />
                  </div>

                  {/* Order */}
                  <div className="form-group col-md-3">
                    <label className="form-label">Order</label>
                    <Field
                      name="order"
                      type="number"
                      className="form-control"
                      placeholder="0"
                      min="0"
                    />
                    <div className="form-hint">Display order on page</div>
                  </div>

                  {/* Status */}
                  <div className="form-group col-md-3">
                    <label className="form-label">
                      Status <span className="form-required">*</span>
                    </label>
                    <Field as="select" name="status" className="form-select">
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Field>
                    <FieldError name="status" />
                  </div>

                </div>
              </div>
            </div>

            {/* ── Form Actions ── */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-form-cancel"
                onClick={() => router.push("/privacy-policy")}
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
                {isSubmitting ? "Updating…" : "Update Policy"}
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;