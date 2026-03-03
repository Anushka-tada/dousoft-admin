import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Meeting from "@/models/Meeting";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// DELETE API
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return NextResponse.json(
        { message: "Meeting not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Meeting deleted successfully",
        data: deletedMeeting,
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}