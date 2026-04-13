import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PortfolioSchema from "@/models/Portfolio";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// ✅ GET (Fetch portfolio page)
export async function GET() {
  try {
    await connectDB();

    const data = await PortfolioSchema.findOne({ isPublished: true })
      .select("-__v")
      .lean();

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ POST (Create / Update portfolio page)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const data = await PortfolioSchema .findOneAndUpdate(
      {},          // 🔥 single document
      body,
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Portfolio data saved",
        data,
      },
      { status: 201, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}