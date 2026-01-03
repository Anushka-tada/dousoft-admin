import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceCategory from "@/models/ServiceCategory";

/* =======================
   🔹 CORS CONFIG
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/* =======================
   🔹 PREFLIGHT
======================= */
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 UPDATE CATEGORY
======================= */
export async function PUT(req, {params}) {
  try {
    await connectDB();

     const {id} = await params;

    if (!id) {
      return NextResponse.json(
        { status: 400, message: "Category ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const body = await req.json();
    const { name, status, order  , description} = body;

    if (!name) {
      return NextResponse.json(
        { status: 400, message: "Name is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const updatedCategory = await ServiceCategory.findByIdAndUpdate(
      id,
      { name, status, order , description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { status: 404, message: "Service category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Service category updated successfully",
        data: updatedCategory,
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
