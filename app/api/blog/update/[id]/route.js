// import { NextResponse } from "next/server";
// import Blog from "@/models/Blog";
// import { connectDB } from "@/lib/mongodb";

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = await params;

//     const body = await req.json();
//     const {
//       title,
//       description,
//       content,
//       image,
//       slug,
//       category,
//       tags,
//       status,
//       author,
//     } = body;

//     // Optional: required field validation
//     if (!title || !description || !content || !image || !slug || !category || !author) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       {
//         title,
//         description,
//         content,
//         image,
//         slug,
//         category,
//         tags,
//         status,
//         author,
//       },
//       { new: true } // 👈 updated document return karega
//     );

//     if (!updatedBlog) {
//       return NextResponse.json(
//         { message: "Blog not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Blog updated successfully",
//         data: updatedBlog,
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     return NextResponse.json(
//       { message: err.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { connectDB } from "@/lib/mongodb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const {
      title,
      description,
      content,
      image,
      slug,
      category,
      tags,
      status,
      author,
    metaTitle,
  metaDescription
    } = body;

    if (!title || !description || !content || !image || !slug || !category || !author) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
        content,
        image,
        slug,
        category,
        tags,
        status,
        author,
      metaTitle,
  metaDescription
      },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Blog updated successfully",
        data: updatedBlog,
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}