export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight request handle
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req) {

   console.log("🔥 LOGIN API CALLED");
  try {

    
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    /* 🔴 VALIDATION */
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    /* 🔴 CHECK ADMIN */
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401, headers: corsHeaders }
      );
    }

    if (admin.status !== "active") {
      return NextResponse.json(
        { message: "Admin account inactive" },
        { status: 403, headers: corsHeaders }
      );
    }

    /* 🔴 PASSWORD MATCH */
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401, headers: corsHeaders }
      );
    }

    /* 🔐 CREATE JWT */
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}