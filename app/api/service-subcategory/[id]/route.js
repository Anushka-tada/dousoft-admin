import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";

/* =======================
   🔹 CORS HEADERS
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 GET SINGLE SUBCATEGORY
======================= */
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

   
    if (!id) {
      return NextResponse.json(
        { message: "Subcategory ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const subCategory = await ServiceSubCategory.findById(id)
      .populate("categoryId", "name");

    if (!subCategory) {
      return NextResponse.json(
        { message: "Subcategory not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Service subcategory fetched successfully",
        data: subCategory,
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
