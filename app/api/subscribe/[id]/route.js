import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subscribe from "@/models/Subscribe";

/* =======================
   🔹 CORS HEADERS
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}


// delete


export async function DELETE(req , {params}) {
  try {
    await connectDB();

     const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Subscriber ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const deletedSubscriber = await Subscribe.findByIdAndDelete(id);

    if (!deletedSubscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Subscriber deleted successfully",
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}