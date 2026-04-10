import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HomeSchema from "@/models/Homepage";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


// CREATE or UPDATE (UPSERT)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const data = await HomeSchema.findOneAndUpdate(
      {},               // single document
      body,
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Home data saved",
      data,
    },
    { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    { statusCode: 500, headers: corsHeaders }
    );
  }
}

// GET 
export async function GET() {
  try {
    await connectDB();

    const data = await HomeSchema.findOne();

    return NextResponse.json({
      success: true,
      data,
    },
    { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
      { statusCode: 500, headers: corsHeaders }
    );
  }
}