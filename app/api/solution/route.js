

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SolutionSchema from "@/models/SolutionPage";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const data = await SolutionSchema.findOneAndUpdate(
      { slug: body.slug },  
      body,
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Solution data saved",
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


export async function GET() {
  try {
    await connectDB();

    const solutions = await SolutionSchema.find({ isPublished: true })
      .select("name slug hero")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: solutions,
      status: 200,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }

    );
  }
}