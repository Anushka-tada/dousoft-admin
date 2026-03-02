import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { connectDB } from "@/lib/mongodb";

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
    } = body;

    // Optional: required field validation
    if (!title || !description || !content || !image || !slug || !category || !author) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
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
      },
      { new: true } // 👈 updated document return karega
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Blog updated successfully",
        data: updatedBlog,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}