import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import VisitorLog from "@/models/VisitorLog";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}

export async function POST() {
  try {
    await connectDB();

    const today = new Date().toISOString().split("T")[0];

    await VisitorLog.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Visitor count updated",
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}