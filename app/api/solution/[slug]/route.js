// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import SolutionSchema from "@/models/SolutionPage";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//   return NextResponse.json({}, { status: 200, headers: corsHeaders });
// }

// export async function GET(req, { params }) {
//   try {
//     await connectDB();
    
//     const { slug } = await params;

//     const solution = await SolutionSchema.findOne({
//       slug: slug,
//       isPublished: true,
//     })
//       .select("-__v")
//       .lean();

//     if (!solution) {
//       return NextResponse.json(
//         { success: false, message: "Solution not found" },
//         { status: 404, headers: corsHeaders }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         data: solution,
//       },
//       { status: 200, headers: corsHeaders }
//     );

//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SolutionSchema from "@/models/SolutionPage";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}


export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const solution = await SolutionSchema.findOne({ slug }).lean();

    if (!solution) {
      return NextResponse.json(
        { success: false, message: "Solution not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data: solution },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ UPDATE
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;
    const body = await req.json();

    const updated = await SolutionSchema.findOneAndUpdate(
      { slug },
      body,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Solution not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Solution updated",
        data: updated,
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const deleted = await SolutionSchema.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Solution not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Solution deleted successfully",
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}