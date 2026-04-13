import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SolutionSchema from "@/models/SolutionPage";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    const { slug } = await params;

    const solution = await SolutionSchema.findOne({
      slug: slug,
      isPublished: true,
    })
      .select("-__v")
      .lean();

    if (!solution) {
      return NextResponse.json(
        { success: false, message: "Solution not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: solution,
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}