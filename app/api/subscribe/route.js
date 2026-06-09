import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subscribe from "@/models/Subscribe";

/* =======================
   🔹 CORS HEADERS
======================= */
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
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if already subscribed
    const existingEmail = await Subscribe.findOne({ email });

    if (existingEmail) {
      return NextResponse.json(
        { message: "You are already subscribed." },
        { status: 201, headers: corsHeaders }
      );
    }

    const subscriber = await Subscribe.create({ email });

    return NextResponse.json(
      {
        message: "Thank you for subscribing to our newsletter!",
        data: subscriber,
      },
      { status: 201 },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}


// get api

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscribe.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Subscribers fetched successfully",
        data: subscribers,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// delete


export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Subscriber ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const deletedSubscriber = await Subscribe.findByIdAndDelete(id);

    if (!deletedSubscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: "Subscriber deleted successfully",
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}