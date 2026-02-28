import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params; 

    const blog = await Blog.findOne({
      slug: slug,
      status: "published",
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Blog fetched successfully",
        data: blog,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}