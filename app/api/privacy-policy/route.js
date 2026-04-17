import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PrivacyPolicy from "@/models/PrivacyPolicy";

// ✅ CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight Request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}


export async function GET() {
  try {
    await connectDB();

    const policies = await PrivacyPolicy.find({
      status: "active",
    }).sort({ order: 1 });

    return NextResponse.json(
      {
        success: true,
        data: policies,
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

// ✅ POST API (create policy)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, order, status } = body;

    // validation
    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and Description are required",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const newPolicy = await PrivacyPolicy.create({
      title,
      description,
      order: order || 0,
      status: status || "active",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Privacy Policy created successfully",
        data: newPolicy,
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