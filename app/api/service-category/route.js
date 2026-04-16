// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import ServiceCategory from "@/models/ServiceCategory";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };


// export async function OPTIONS() {
//   return NextResponse.json({}, { status: 200, headers: corsHeaders });
// }

// // CREATE CATEGORY 
// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const { name, status, order , description  } = body;

//     if (!name) {
//       return NextResponse.json(

//         {  status: 400,
//            message: "Name is required" },
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     const category = await ServiceCategory.create({
//       name,
//       status,
//       order,
//       description
//     });

//     return NextResponse.json(
//       {
//          status: 201,
//         message: "Service category created successfully",
//         data: category,
//       },
//       { status: 201, headers: corsHeaders }
//     );
//   } catch (error) {
//     return NextResponse.json(

//       {   status: 500,
//          message: error.message },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

// /*  LIST CATEGORIES */
// export async function GET(req) {
//   try {
//     await connectDB();

//     const categories = await ServiceCategory.find();

//     return NextResponse.json(
//       {   status: 200,
//         message: "Service categories fetched successfully",
//         data: categories,
//       },
//       { status: 200, headers: corsHeaders }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {  status: 500,
//         message: error.message },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceCategory from "@/models/ServiceCategory";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// ✅ CREATE CATEGORY (NOW SUPPORTS FULL DATA)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      categorySlug, // ✅ slug aa raha hai frontend se
      name,
      type,
      status,
      order,
      isPublished,

      hero,
      bestServiceSection,
      customServiceSection,
      capabilities,
      leftRightSections,
      getStartedSection,
      faqSection,
      seo,
    } = body;

    /* 🔴 VALIDATION */
    if (!categorySlug || !name || !type) {
      return NextResponse.json(
        { status: 400, message: "categorySlug, name and type are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    /* 🔴 FIND CATEGORY BY SLUG */
    const category = await ServiceCategory.findOne({ slug: categorySlug });

    if (!category) {
      return NextResponse.json(
        { status: 404, message: "Category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    /* 🔴 GENERATE SLUG */
    let slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    /* 🔴 HANDLE DUPLICATE */
    let counter = 1;
    let existingSlug = await ServiceSubCategory.findOne({ slug });

    while (existingSlug) {
      slug = `${slug}-${counter}`;
      existingSlug = await ServiceSubCategory.findOne({ slug });
      counter++;
    }

    /* 🔴 CREATE */
    const subCategory = await ServiceSubCategory.create({
      categoryId: category._id, // ✅ slug → id conversion
      name,
      slug,
      type,
      status: status || "active",
      order: order || 1,
      isPublished: isPublished ?? true,

      hero,
      bestServiceSection,
      customServiceSection,
      capabilities,
      leftRightSections,
      getStartedSection,
      faqSection,
      seo,
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Subcategory created successfully",
        data: subCategory,
      },
      { status: 201, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ GET ALL CATEGORIES (for navbar / listing)
export async function GET() {
  try {
    await connectDB();

    const categories = await ServiceCategory.find()
      // .select("name slug order") 
      // .sort({ order: 1 });

    return NextResponse.json(
      {
        message: "Service categories fetched successfully",
        data: categories,
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