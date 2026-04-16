import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";
import ServiceCategory from "@/models/ServiceCategory";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { categorySlug, subSlug } = params;

    if (!categorySlug || !subSlug) {
      return NextResponse.json(
        { message: "categorySlug and subSlug are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 🔹 find category
    const category = await ServiceCategory.findOne({ slug: categorySlug });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // 🔹 find subcategory
    const subCategory = await ServiceSubCategory.findOne({
      categoryId: category._id,
      slug: subSlug,
      isPublished: true,
      status: "active",
    }).populate("categoryId", "name slug");

    if (!subCategory) {
      return NextResponse.json(
        { message: "Subcategory not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
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