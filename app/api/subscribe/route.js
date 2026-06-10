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
    const { email, source, blogId } = await req.json();

    if (!email) {
    return NextResponse.json(
  { error: "Email is required" },
  { status: 400, headers: corsHeaders }
);
    }

    // Check if already subscribed
    const existingEmail = await Subscribe.findOne({email});

   if (existingEmail) {
  return NextResponse.json(
    {
      message: "Already subscribed",
      data: existingEmail,
    },
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}

    const subscriber = await Subscribe.create({ email , source , blogId });

   return NextResponse.json(
  {
    message: "Thank you for subscribing to our newsletter!",
    data: subscriber,
  },
  {
    status: 201,
    headers: corsHeaders,
  }
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


