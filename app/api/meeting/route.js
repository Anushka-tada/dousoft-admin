import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Meeting from "@/models/Meeting";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight request handle karne ke liye
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const meeting = await Meeting.create({
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Your request has been submitted successfully.",
        data: meeting,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { status: 500, message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const bookings = await Meeting.find();

    return NextResponse.json(
      {
        status: 200,
        message: "Bookings fetched successfully",
        data: bookings,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { status: 500, message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
