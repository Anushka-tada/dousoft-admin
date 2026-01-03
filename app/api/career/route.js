import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Career from "@/models/Career";


// CREATE JOB 
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
      description,
      requirements,
      status,
    } = body;

    if (
      !title ||
      !slug ||
      !location ||
      !jobType ||
      !experience ||
      !description ||
      !requirements
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const job = await Career.create({
      title,
      slug,
      location,
      jobType,
      experience,
      description,
      requirements,
      status,
    });

    return NextResponse.json(
      {
        message: "Job created successfully",
        data: job,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


// LIST JOBS 
export async function GET() {
  try {
    await connectDB();

    const jobs = await Career.find({ status: "active" });
    return NextResponse.json(
      {
        message: "Jobs fetched successfully",
        data: jobs,
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
