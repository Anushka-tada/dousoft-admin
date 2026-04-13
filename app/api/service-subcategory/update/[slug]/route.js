import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";

/* =======================
   🔹 CORS
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 UPDATE BY SLUG (FULL CMS)
======================= */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { status: 400, message: "Slug is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const body = await req.json();

    // optional: if name changed → update slug
    let updatedSlug = slug;

    if (body.name) {
      updatedSlug = body.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // check duplicate slug
      let counter = 1;
      let exists = await ServiceSubCategory.findOne({
        slug: updatedSlug,
        _id: { $ne: body._id }, // exclude current doc
      });

      while (exists) {
        updatedSlug = `${updatedSlug}-${counter}`;
        exists = await ServiceSubCategory.findOne({ slug: updatedSlug });
        counter++;
      }
    }

    const updatedData = {
      ...body,
      slug: updatedSlug,
    };

    const updatedSubCategory = await ServiceSubCategory.findOneAndUpdate(
      { slug },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSubCategory) {
      return NextResponse.json(
        { status: 404, message: "Subcategory not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Subcategory updated successfully",
        data: updatedSubCategory,
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