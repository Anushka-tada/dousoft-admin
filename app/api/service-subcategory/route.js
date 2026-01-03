import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";
import ServiceCategory from "@/models/ServiceCategory";

/* =======================
   🔹 CORS HEADERS
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   CREATE SUBCATEGORY
======================= */
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { categoryId, name, type, status } = body;

 
    if (!categoryId || !name || !type) {
      return NextResponse.json(
        { message: "categoryId, name and type are required" },
        { status: 400, headers: corsHeaders }
      );
    }


    const categoryExists = await ServiceCategory.findById(categoryId);
    if (!categoryExists) {
      return NextResponse.json(
        { message: "Service category not found" },
        { status: 404, headers: corsHeaders }
      );
    }


    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const alreadyExists = await ServiceSubCategory.findOne({
      categoryId,
      slug,
    });

    if (alreadyExists) {
      return NextResponse.json(
        { message: "Subcategory already exists" },
        { status: 409, headers: corsHeaders }
      );
    }

    const subCategory = await ServiceSubCategory.create({
      categoryId,
      name,
      slug,
      type,
      status: status || "active",
    });

    return NextResponse.json(
      {
        message: "Service subcategory created successfully",
        data: subCategory,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

/* =======================
    LIST SUBCATEGORIES
======================= */
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId");
    const type = searchParams.get("type");
    const status = searchParams.get("status") || "active";

    const filter = { status };

    if (categoryId) filter.categoryId = categoryId;
    if (type) filter.type = type;

    const subCategories = await ServiceSubCategory.find(filter)
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Service subcategories fetched successfully",
        data: subCategories,
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
