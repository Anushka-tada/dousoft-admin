import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";

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
   🔹 DELETE CATEGORY
======================= */
export async function DELETE(req, {params}) {
 
  try {
    await connectDB();
 
    const {id} = await params;

     console.log("DELETE ID:", id);

    if (!id) {
      return NextResponse.json(
        {
          status: 400,
          message: "Category ID is required",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const category = await ServiceSubCategory.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        {
          status: 404,
          message: "Service category not found",
        },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Service category deleted successfully",
        data: category,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
