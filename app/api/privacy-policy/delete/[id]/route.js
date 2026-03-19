import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PrivacyPolicy from "@/models/PrivacyPolicy";
import mongoose from "mongoose";

// ✅ CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// ✅ DELETE API
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400, headers: corsHeaders }
      );
    }

    const policy = await PrivacyPolicy.findByIdAndDelete(id);

    if (!policy) {
      return NextResponse.json(
        { success: false, message: "Policy not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Policy deleted successfully",
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