import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceCategory from "@/models/ServiceCategory";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/* =======================
   🔹 PREFLIGHT
======================= */
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 GET SINGLE CATEGORY
======================= */
export async function GET(req, {params}) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { status: 400, message: "Category ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const category = await ServiceCategory.findById(id);

    if (!category) {
      return NextResponse.json(
        { status: 404, message: "Service category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Service category fetched successfully",
        data: category,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
