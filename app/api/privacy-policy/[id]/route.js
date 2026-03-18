import { NextResponse } from "next/server";
import PrivacyPolicy from "@/models/PrivacyPolicy";
import connectDB from "@/lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// ✅ CREATE POLICY
export async function POST(req) {
  try {
    await connectDB();

    const { title, description, order, status } = await req.json();

    // validation
    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and Description are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const policy = await PrivacyPolicy.create({
      title,
      description,
      order: order || 0,
      status: status || "active",
    });

    return NextResponse.json(
      {
        message: "Privacy Policy created successfully",
        data: policy,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ GET ALL POLICIES
export async function GET() {
  try {
    await connectDB();

    const policies = await PrivacyPolicy.find().sort({ order: 1 });

    return NextResponse.json(
      {
        message: "Policies fetched successfully",
        data: policies,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}