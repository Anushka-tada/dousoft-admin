import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ServiceCategory from "@/models/ServiceCategory";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// 🔹 CREATE CATEGORY (Admin)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, status, order , description  } = body;

    if (!name) {
      return NextResponse.json(

        {  status: 400,
           message: "Name is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const category = await ServiceCategory.create({
      name,
      status,
      order,
      description
    });

    return NextResponse.json(
      {
         status: 201,
        message: "Service category created successfully",
        data: category,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(

      {   status: 500,
         message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

/* =======================
   🔹 LIST CATEGORIES
======================= */
export async function GET() {
  try {
    await connectDB();

    const categories = await ServiceCategory.find();

    return NextResponse.json(
      {   status: 200,
        message: "Service categories fetched successfully",
        data: categories,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {  status: 500,
        message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}