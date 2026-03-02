"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import BlogEditor from "@/app/Components/BlogEditor";
import { getSingleBlogServ, UpdateBlogServ } from "@/app/services/blog.service";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);

  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlogServ(id);
        const data =  res.data

        setInitialValues({
          ...data.data,
          tags: data.data.tags?.join(", "),
        });
      } catch (err) {
        toast.error("Failed to load blog");
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="container-fluid">
      <div className="col-lg-12 p-4">
        <h5 className="mb-4">Update Blog</h5>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                ...values,
                tags: values.tags
                  ? values.tags.split(",").map((tag) => tag.trim())
                  : [],
              };

              await UpdateBlogServ(id , payload)

              toast.success("Blog updated successfully");
              router.push("/blogs");
            } catch (err) {
              toast.error(err.message || "Update failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* CONTENT */}
              <div className="mb-3">
                <label className="form-label">Content</label>
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
              </div>

              {/* TITLE */}
              <div className="mb-3">
                <label>Title</label>
                <Field name="title" className="form-control" />
              </div>

              {/* SLUG */}
              <div className="mb-3">
                <label>Slug</label>
                <Field name="slug" className="form-control" />
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label>Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                />
              </div>

              {/* IMAGE */}
              <div className="mb-3">
                <label>Image</label>
                <Field name="image" className="form-control" />
              </div>

              {/* CATEGORY */}
              <div className="mb-3">
                <label>Category</label>
                <Field name="category" className="form-control" />
              </div>

              {/* TAGS */}
              <div className="mb-3">
                <label>Tags</label>
                <Field name="tags" className="form-control" />
              </div>

              {/* STATUS */}
              <div className="mb-3">
                <label>Status</label>
                <Field as="select" name="status" className="form-select">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Field>
              </div>

              <button
                type="submit"
                className="btn bgThemePrimary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Blog"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;