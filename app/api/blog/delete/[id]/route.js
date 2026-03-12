// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Blog from "@/models/Blog";
// import mongoose from "mongoose";

// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();
 
//     const {id} = await params;

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { message: "Invalid blog ID" },
//         { status: 400 }
//       );
//     }

//     const deletedBlog = await Blog.findByIdAndDelete(id);

//     if (!deletedBlog) {
//       return NextResponse.json(
//         { message: "Blog not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Blog deleted successfully",
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid blog ID" },
        { status: 400, headers: corsHeaders }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Blog deleted successfully",
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}