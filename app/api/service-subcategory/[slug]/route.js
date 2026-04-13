import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";

/* =======================
   🔹 CORS
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 GET SUBCATEGORY BY SLUG
======================= */
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { status: 400, message: "Slug is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const subCategory = await ServiceSubCategory.findOne({
      slug,
      isPublished: true,
      status: "active",
    }).populate("categoryId", "name slug");

    if (!subCategory) {
      return NextResponse.json(
        { status: 404, message: "Subcategory not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Subcategory fetched successfully",
        data: subCategory,
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