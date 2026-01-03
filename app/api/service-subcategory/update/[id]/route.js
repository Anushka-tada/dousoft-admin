import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";
import ServiceCategory from "@/models/ServiceCategory";

/* =======================
   🔹 CORS CONFIG
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/* =======================
   🔹 PREFLIGHT
======================= */
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 UPDATE SUBCATEGORY
======================= */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Subcategory ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const body = await req.json();
    const { categoryId, name, type, status } = body;

    // 🔴 Mandatory fields check
    if (!categoryId || !name || !type) {
      return NextResponse.json(
        { message: "categoryId, name and type are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 🔎 Check parent category
    const categoryExists = await ServiceCategory.findById(categoryId);
    if (!categoryExists) {
      return NextResponse.json(
        { message: "Service category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // 🔗 Generate new slug if name changed
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // 🔒 Prevent duplicate slug in same category
    const duplicate = await ServiceSubCategory.findOne({
      _id: { $ne: id },
      categoryId,
      slug,
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "Subcategory with this name already exists" },
        { status: 409, headers: corsHeaders }
      );
    }

    const updatedSubCategory =
      await ServiceSubCategory.findByIdAndUpdate(
        id,
        {
          categoryId,
          name,
          slug,
          type,
          status,
        },
        { new: true }
      ).populate("categoryId", "name");

    if (!updatedSubCategory) {
      return NextResponse.json(
        { message: "Service subcategory not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Service subcategory updated successfully",
        data: updatedSubCategory,
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
