import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Career from "@/models/Career";
import mongoose from "mongoose";

// ✅ CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// ✅ GET SINGLE JOB
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIXED

    // 🔹 Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid job ID" },
        { status: 400, headers: corsHeaders }
      );
    }

    const job = await Career.findById(id);

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Job fetched successfully",
        data: job,
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