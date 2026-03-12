// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = await params; 

//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return NextResponse.json(
//         { message: "Blog not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Blog fetched successfully",
//         data: blog,
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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Blog fetched successfully",
        data: blog,
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