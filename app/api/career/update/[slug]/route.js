import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Career from "@/models/Career";

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


// 🔹 UPDATE JOB BY SLUG
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;
    const body = await req.json();

    const {
      title,
      location,
      jobType,
      experience,
      status,
    } = body;

    // Check if job exists
    const existingJob = await Career.findOne({ slug });

    if (!existingJob) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Update fields
    existingJob.title = title || existingJob.title;
    existingJob.location = location || existingJob.location;
    existingJob.jobType = jobType || existingJob.jobType;
    existingJob.experience = experience || existingJob.experience;
    existingJob.status = status || existingJob.status;

    await existingJob.save();

    return NextResponse.json(
      {
        message: "Job updated successfully",
        data: existingJob,
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