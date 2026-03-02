"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createBlogServ } from "@/app/services/blog.service";
import BlogEditor from "@/app/Components/BlogEditor";

const Page = () => {
  const router = useRouter();

  return (
    <div className="container-fluid">
      <div className="col-lg-12 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="ms-1 mb-0">Create Blog</h5>
        </div>

        <Formik
          initialValues={{
            title: "",
            slug: "",
            description: "",
            content: "",
            image: "",
            category: "General",
            tags: "",
            status: "draft",
            author: "Admin",
            publishedAt: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const payload = {
                ...values,
                tags: values.tags
                  ? values.tags.split(",").map((tag) => tag.trim())
                  : [],
              };

              const res = await createBlogServ(payload);

              toast.success("Blog created successfully");
              resetForm();
              router.push("/blogs ");
            } catch (err) {
              toast.error(
                err?.response?.data?.message || "Something went wrong"
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
                  Blog Details
                </div>

                <div className="form-section-body row g-3">

                  {/* Title */}
                 <div className="col-md-12">
  <label className="form-label">
    Content <span className="text-danger">*</span>
  </label>

  <Field name="content">
    {({ field, form }) => (
      <BlogEditor
        value={field.value}
        onChange={(content) =>
          form.setFieldValue("content", content)
        }
      />
    )}
  </Field>

  <ErrorMessage
    name="content"
    component="div"
    className="text-danger small"
  />
</div>

  {/* title  */}
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

                  {/* Slug */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Slug <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      name="slug"
                      className="form-control"
                      placeholder="enter-blog-slug"
                    />
                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  {/* Description */}
                  <div className="col-md-12">
                    <label className="form-label">
                      Short Description <span className="text-danger">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                      rows="3"
                    />
                  </div>

                  {/* Content */}
                  {/* <div className="col-md-12">
                    <label className="form-label">
                      Content <span className="text-danger">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="content"
                      className="form-control"
                      rows="6"
                    />
                  </div> */}

                  {/* Image URL */}
                  <div className="col-md-6">
                    <label className="form-label">Image URL</label>
                    <Field
                      type="text"
                      name="image"
                      className="form-control"
                      placeholder="Enter Image URL"
                    />
                  </div>

                  {/* Category */}
                  <div className="col-md-3">
                    <label className="form-label">Category</label>
                    <Field
                      type="text"
                      name="category"
                      className="form-control"
                    />
                  </div>

                  {/* Tags */}
                  <div className="col-md-3">
                    <label className="form-label">
                      Tags (comma separated)
                    </label>
                    <Field
                      type="text"
                      name="tags"
                      className="form-control"
                      placeholder="react, nextjs, mongodb"
                    />
                  </div>

                  {/* Status */}
                  <div className="col-md-3">
                    <label className="form-label">Status</label>
                    <Field
                      as="select"
                      name="status"
                      className="form-select"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </Field>
                  </div>

                  {/* Author */}
                  <div className="col-md-3">
                    <label className="form-label">Author</label>
                    <Field
                      type="text"
                      name="author"
                      className="form-control"
                    />
                  </div>

                  {/* Published Date */}
                  <div className="col-md-3">
                    <label className="form-label">Publish Date</label>
                    <Field
                      type="date"
                      name="publishedAt"
                      className="form-control"
                    />
                  </div>

                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end align-items-center mb-5 mt-4">
                <button type="reset" className="btn btn-danger me-2">
                  Cancel
                </button>
                <button
                  className="btn bgThemePrimary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Save Blog"}
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