

// "use client";
// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useRouter, useParams } from "next/navigation";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import BlogEditor from "@/app/Components/BlogEditor";
// import { getSingleBlogServ, UpdateBlogServ } from "@/app/services/blog.service";

// const validationSchema = Yup.object({
//   title:       Yup.string().required("Title is required"),
//   slug:        Yup.string().required("Slug is required"),
//   description: Yup.string().required("Description is required"),
//   content:     Yup.string().required("Content is required"),
//   image:       Yup.string().required("Image URL is required"),
//   category:    Yup.string().required("Category is required"),
//   tags:        Yup.string().required("Tags are required"),
//   status:      Yup.string().required("Status is required"),
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
//   const { id } = useParams();
//   const [initialValues, setInitialValues] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await getSingleBlogServ(id);
//         const data = res.data.data;
//         setInitialValues({
//           ...data,
//           tags: data.tags?.join(", ") || "",
//         });
//       } catch (err) {
//         toast.error("Failed to load blog");
//       }
//     };
//     if (id) fetchBlog();
//   }, [id]);

//   // ── Loading state ──
//   if (!initialValues) return (
//     <div className="form-page">
//       <div style={{
//         display: "flex", alignItems: "center", gap: 10,
//         color: "#6b7280", fontSize: 14, padding: "40px 0",
//       }}>
//         <div style={{
//           width: 18, height: 18,
//           border: "2px solid #d1e8d4",
//           borderTopColor: "#0b6f1e",
//           borderRadius: "50%",
//           animation: "spin 0.7s linear infinite",
//         }} />
//         Loading blog…
//       </div>
//     </div>
//   );

//   return (
//     <div className="form-page">

//       {/* Page header */}
//       <div className="form-page-header">
//         <div className="form-page-title">
//           <div className="title-icon">
//             <i className="bi bi-journal-text" />
//           </div>
//           Update Blog
//         </div>
//         <button
//           className="form-back-btn"
//           onClick={() => router.push("/blogs")}
//         >
//           <i className="bi bi-arrow-left" style={{ fontSize: 13 }} />
//           Back to Blogs
//         </button>
//       </div>

//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             const payload = {
//               ...values,
//               tags: values.tags
//                 ? values.tags.split(",").map((t) => t.trim())
//                 : [],
//             };
//             await UpdateBlogServ(id, payload);
//             toast.success("Blog updated successfully");
//             router.push("/blogs");
//           } catch (err) {
//             toast.error(err?.response?.data?.message || "Update failed");
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
//                 <span>Blog Content</span>
//               </div>
//               <div className="form-card-body">
//                 <label className="form-label">
//                   Content <span className="req">*</span>
//                 </label>
//                 <Field name="content">
//                   {({ field, form }) => (
//                     <BlogEditor
//                       value={field.value}
//                       onChange={(content) =>
//                         form.setFieldValue("content", content)
//                       }
//                     />
//                   )}
//                 </Field>
//                 <FieldError name="content" />
//               </div>
//             </div>

//             {/* ── Section 2: Basic Info ── */}
//             <div className="form-card">
//               <div className="form-card-header">
//                 <i className="bi bi-info-circle" />
//                 <span>Basic Information</span>
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
//                       placeholder="Enter blog title"
//                     />
//                     <FieldError name="title" />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">
//                       Slug <span className="req">*</span>
//                     </label>
//                     <Field
//                       name="slug"
//                       type="text"
//                       className="form-control"
//                       placeholder="enter-blog-slug"
//                     />
//                     <FieldError name="slug" />
//                   </div>

//                   <div className="col-md-12">
//                     <label className="form-label">
//                       Short Description <span className="req">*</span>
//                     </label>
//                     <Field
//                       as="textarea"
//                       name="description"
//                       className="form-control"
//                       rows="3"
//                       placeholder="Brief summary of the blog…"
//                     />
//                     <FieldError name="description" />
//                   </div>

//                   <div className="col-md-12">
//                     <label className="form-label">
//                       Image URL <span className="req">*</span>
//                     </label>
//                     <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
//                       <div style={{ flex: 1 }}>
//                         <Field
//                           name="image"
//                           type="text"
//                           className="form-control"
//                           placeholder="https://example.com/image.jpg"
//                         />
//                         <FieldError name="image" />
//                       </div>
//                       {/* Live preview thumbnail */}
//                       {values.image && (
//                         <div style={{
//                           width: 64, height: 64, borderRadius: 8,
//                           overflow: "hidden", flexShrink: 0,
//                           border: "0.5px solid #d1e8d4",
//                         }}>
//                           <img
//                             src={values.image}
//                             alt="preview"
//                             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                             onError={(e) => { e.target.style.display = "none"; }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </div>

//             {/* ── Section 3: Meta & Publishing ── */}
//             <div className="form-card">
//               <div className="form-card-header">
//                 <i className="bi bi-tags" />
//                 <span>Meta & Publishing</span>
//               </div>
//               <div className="form-card-body">
//                 <div className="row g-3">

//                   <div className="col-md-4">
//                     <label className="form-label">
//                       Category <span className="req">*</span>
//                     </label>
//                     <Field
//                       name="category"
//                       type="text"
//                       className="form-control"
//                       placeholder="e.g. Technology"
//                     />
//                     <FieldError name="category" />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label">
//                       Tags <span className="req">*</span>
//                     </label>
//                     <Field
//                       name="tags"
//                       type="text"
//                       className="form-control"
//                       placeholder="react, nextjs, webdev"
//                     />
//                     <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 4 }}>
//                       Comma separated
//                     </div>
//                     <FieldError name="tags" />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label">
//                       Status <span className="req">*</span>
//                     </label>
//                     <Field as="select" name="status" className="form-select">
//                       <option value="">Select status</option>
//                       <option value="draft">Draft</option>
//                       <option value="published">Published</option>
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
//                 onClick={() => router.push("/blogs")}
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
//                   <><div className="spinner" /> Updating…</>
//                 ) : (
//                   <><i className="bi bi-check2" style={{ fontSize: 15 }} /> Update Blog</>
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
import BlogEditor from "@/app/Components/BlogEditor";
import { getSingleBlogServ, UpdateBlogServ } from "@/app/services/blog.service";
import {
  IconArrowLeft,
  IconPencil,
  IconInfoCircle,
  IconTags,
  IconDeviceFloppy,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react";

const validationSchema = Yup.object({
  title:       Yup.string().required("Title is required"),
  slug:        Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  content:     Yup.string().required("Content is required"),
  image:       Yup.string().required("Image URL is required"),
  category:    Yup.string().required("Category is required"),
  tags:        Yup.string().required("Tags are required"),
  status:      Yup.string().required("Status is required"),
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlogServ(id);
        const data = res.data.data;
        setInitialValues({
          ...data,
          tags: data.tags?.join(", ") || "",
        });
      } catch (err) {
        toast.error("Failed to load blog");
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (!initialValues) {
    return (
      <div className="form-page">
        <div className="form-loading">
          <span className="form-loading-spinner" />
          Loading blog…
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
            onClick={() => router.push("/blogs")}
            type="button"
          >
            <IconArrowLeft size={16} />
          </button>
          <div>
            <h4 className="form-page-title">Update Blog</h4>
            <p className="form-page-subtitle">Edit and republish this blog post</p>
          </div>
        </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const payload = {
              ...values,
              tags: values.tags ? values.tags.split(",").map((t) => t.trim()) : [],
            };
            await UpdateBlogServ(id, payload);
            toast.success("Blog updated successfully");
            router.push("/blogs");
          } catch (err) {
            toast.error(err?.response?.data?.message || "Update failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>

            {/* ── Section 1: Blog Content ── */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <IconPencil size={17} />
                </div>
                Blog Content
              </div>
              <div className="form-card-body">
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Content <span className="form-required">*</span>
                  </label>
                  <Field name="content">
                    {({ field, form }) => (
                      <BlogEditor
                        value={field.value}
                        onChange={(content) => form.setFieldValue("content", content)}
                      />
                    )}
                  </Field>
                  <FieldError name="content" />
                </div>
              </div>
            </div>

            {/* ── Section 2: Basic Information ── */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <IconInfoCircle size={17} />
                </div>
                Basic Information
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
                      placeholder="Enter blog title"
                    />
                    <FieldError name="title" />
                  </div>

                  {/* Slug */}
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Slug <span className="form-required">*</span>
                    </label>
                    <Field
                      name="slug"
                      type="text"
                      className="form-control"
                      placeholder="enter-blog-slug"
                    />
                    <FieldError name="slug" />
                  </div>

                  {/* Description */}
                  <div className="form-group col-md-12">
                    <label className="form-label">
                      Short Description <span className="form-required">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                      rows="3"
                      placeholder="Brief summary of the blog…"
                    />
                    <FieldError name="description" />
                  </div>

                  {/* Image URL + preview */}
                  <div className="form-group col-md-12">
                    <label className="form-label">
                      Image URL <span className="form-required">*</span>
                    </label>
                    <div className="form-image-row">
                      <div style={{ flex: 1 }}>
                        <Field
                          name="image"
                          type="text"
                          className="form-control"
                          placeholder="https://example.com/image.jpg"
                        />
                        <FieldError name="image" />
                      </div>
                      {values.image && (
                        <div className="form-image-preview">
                          <img
                            src={values.image}
                            alt="preview"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ── Section 3: Meta & Publishing ── */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <IconTags size={17} />
                </div>
                Meta &amp; Publishing
              </div>
              <div className="form-card-body">
                <div className="form-row">

                  {/* Category */}
                  <div className="form-group col-md-4">
                    <label className="form-label">
                      Category <span className="form-required">*</span>
                    </label>
                    <Field
                      name="category"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Technology"
                    />
                    <FieldError name="category" />
                  </div>

                  {/* Tags */}
                  <div className="form-group col-md-4">
                    <label className="form-label">
                      Tags <span className="form-required">*</span>
                    </label>
                    <Field
                      name="tags"
                      type="text"
                      className="form-control"
                      placeholder="react, nextjs, webdev"
                    />
                    <div className="form-hint">Comma separated</div>
                    <FieldError name="tags" />
                  </div>

                  {/* Status */}
                  <div className="form-group col-md-4">
                    <label className="form-label">
                      Status <span className="form-required">*</span>
                    </label>
                    <Field as="select" name="status" className="form-select">
                      <option value="">Select status</option>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
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
                onClick={() => router.push("/blogs")}
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
                {isSubmitting ? "Updating…" : "Update Blog"}
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;