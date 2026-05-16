import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import About from "@/models/About"; 

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req) {

  try {
    await connectDB();
    const body = await req.json();

    console.log("BODY =>", body);

    const data = await About.findOneAndUpdate(
      {},   
      body,
      {
        new: true,
        upsert: true,
      }
    );

    console.log("UPDATED =>", data);

    return NextResponse.json(
      {
        success: true,
        message: "About data saved",
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

    const data = await About.findOne();

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


export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}