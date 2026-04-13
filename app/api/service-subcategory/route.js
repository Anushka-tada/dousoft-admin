// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import ServiceSubCategory from "@/models/ServiceSubCategory";
// import ServiceCategory from "@/models/ServiceCategory";

// /* =======================
//    🔹 CORS HEADERS
// ======================= */
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };


// export async function OPTIONS() {
//   return NextResponse.json({}, { status: 200, headers: corsHeaders });
// }

// /* =======================
//    CREATE SUBCATEGORY
// ======================= */
// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const { categoryId, name, type, status , content } = body;

 
//     if (!categoryId || !name || !type) {
//       return NextResponse.json(
//         { status: 400,
//           message: "categoryId, name and type are required" },
//         { status: 400, headers: corsHeaders }
//       );
//     }


//     const categoryExists = await ServiceCategory.findById(categoryId);
//     if (!categoryExists) {
//       return NextResponse.json(
//         {  status: 404,
//            message: "Service category not found" },
//         { status: 404, headers: corsHeaders }
//       );
//     }


//     const slug = name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)/g, "");

//     const alreadyExists = await ServiceSubCategory.findOne({
//       categoryId,
//       slug,
//     });

//     if (alreadyExists) {
//       return NextResponse.json(
//         { status: 400,
//            message: "Subcategory already exists" },
//         { status: 409, headers: corsHeaders }
//       );
//     }

//     const subCategory = await ServiceSubCategory.create({
//       categoryId,
//       name,
//       slug,
//       type,
//       content,
//       status: status || "active",
//     });

//     return NextResponse.json(
//       { status:201,
//         message: "Service subcategory created successfully",
//         data: subCategory,
//       },
//       { status: 201, headers: corsHeaders }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { status: 500,
//         message: error.message },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

// /* =======================
//     LIST SUBCATEGORIES
// ======================= */
// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const categoryId = searchParams.get("categoryId");
//     const type = searchParams.get("type");
//     const status = searchParams.get("status") || "active";

//     const filter = { status };

//     if (categoryId) filter.categoryId = categoryId;
//     if (type) filter.type = type;

//     const subCategories = await ServiceSubCategory.find(filter)
//       .populate("categoryId", "name")
//       .sort({ createdAt: -1 });

//     return NextResponse.json(
//       { status: 200,
//         message: "Service subcategories fetched successfully",
//         data: subCategories,
//       },
//       { status: 200, headers: corsHeaders }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { status: 500,
//         message: error.message },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceSubCategory from "@/models/ServiceSubCategory";
import ServiceCategory from "@/models/ServiceCategory";

/* =======================
   🔹 CORS HEADERS
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

/* =======================
   🔹 CREATE SUBCATEGORY (FULL CMS)
======================= */
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      categoryId,
      name,
      type,
      status,
      order,
      isPublished,

      // FULL PAGE DATA
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
    if (!categoryId || !name || !type) {
      return NextResponse.json(
        { status: 400, message: "categoryId, name and type are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    /* 🔴 CHECK CATEGORY */
    const categoryExists = await ServiceCategory.findById(categoryId);
    if (!categoryExists) {
      return NextResponse.json(
        { status: 404, message: "Service category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    /* 🔴 GENERATE SLUG */
    let slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    /* 🔴 HANDLE DUPLICATE SLUG */
    let counter = 1;
    let existingSlug = await ServiceSubCategory.findOne({ slug });

    while (existingSlug) {
      slug = `${slug}-${counter}`;
      existingSlug = await ServiceSubCategory.findOne({ slug });
      counter++;
    }

    /* 🔴 CREATE */
    const subCategory = await ServiceSubCategory.create({
      categoryId,
      name,
      slug,
      type,
      status: status || "active",
      order: order || 1,
      isPublished: isPublished ?? true,

      // FULL PAGE DATA
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
        message: "Service subcategory created successfully",
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

/* =======================
   🔹 LIST SUBCATEGORIES
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
      .populate("categoryId", "name slug")
      .select("name slug type categoryId order") // 🔥 optimized for navbar/frontend
      .sort({ order: 1 });

    return NextResponse.json(
      {
        status: 200,
        message: "Service subcategories fetched successfully",
        data: subCategories,
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