import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Career from "@/models/Career";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid job ID" },
        { status: 400 }
      );
    }

    const job = await Career.findById(id);

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Job fetched successfully",
        data: job,
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
