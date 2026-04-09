import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import Career from "@/models/Career";

// ✅ CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}


// 🔹 APPLY JOB (JSON BASED)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      jobId,
      name,
      email,
      phone,
      linkedin,
      portfolio,
      experience,
      coverLetter,
      resume, 
    } = body;

    // ✅ Validation
    if (!jobId || !name || !email || !phone || !coverLetter || !resume) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Check job exists
    const job = await Career.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { message: "Invalid job" },
        { status: 404, headers: corsHeaders }
      );
    }

    // ✅ Create application
    const application = await JobApplication.create({
      jobId,
      name,
      email,
      phone,
      linkedin,
      portfolio,
      experience,
      coverLetter,
      resume,
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        data: application,
      },
      { status: 201, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}



export async function GET() {
  try {
    await connectDB();

    const applications = await JobApplication.find()
      .populate("jobId", "title slug");

    return NextResponse.json(
      {
        message: "Applications fetched successfully",
        data: applications,
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