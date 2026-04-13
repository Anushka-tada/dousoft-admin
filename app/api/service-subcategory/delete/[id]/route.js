import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";

/* =======================
   🔹 CORS
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 DELETE SUBCATEGORY
======================= */
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { status: 400, message: "ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const subCategory = await ServiceSubCategory.findById(id);

    if (!subCategory) {
      return NextResponse.json(
        { status: 404, message: "Subcategory not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    await ServiceSubCategory.findByIdAndDelete(id);

    return NextResponse.json(
      {
        status: 200,
        message: "Subcategory deleted successfully",
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