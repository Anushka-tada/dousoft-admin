import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Career from "@/models/Career";

// ✅ CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight Request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}


// 🔹 CREATE JOB
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      slug,
      location,
      jobType,
      experience,
      status,
    } = body;

    if (!title || !slug || !location || !jobType || !experience) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400, headers: corsHeaders }
      );
    }

    const job = await Career.create({
      title,
      slug,
      location,
      jobType,
      experience,
      status: status || "active",
    });

    return NextResponse.json(
      {
        message: "Job created successfully",
        data: job,
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


// 🔹 LIST JOBS
export async function GET() {
  try {
    await connectDB();

    const jobs = await Career.find({ status: "active" });

    return NextResponse.json(
      {
        message: "Jobs fetched successfully",
        data: jobs,
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