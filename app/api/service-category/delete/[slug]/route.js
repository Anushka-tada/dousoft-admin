import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceCategory from "@/models/ServiceCategory";

/* =======================
   🔹 CORS CONFIG
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/* =======================
   🔹 PREFLIGHT
======================= */
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 DELETE CATEGORY BY SLUG
======================= */
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const deletedCategory = await ServiceCategory.findOneAndDelete({
      slug,
    });

    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service category deleted successfully",
        data: deletedCategory,
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}