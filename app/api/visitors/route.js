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

export async function GET() {
  try {
    await connectDB();

    const logs = await VisitorLog.find()
      .sort({ date: -1 })
      .limit(30)
      .lean();

    const total = logs.reduce((sum, l) => sum + l.count, 0);

    const last7 = logs.slice(0, 7);
    const weeklyTotal = last7.reduce(
      (sum, l) => sum + l.count,
      0
    );

    return NextResponse.json(
      {
        success: true,
        logs,
        total,
        weeklyTotal,
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