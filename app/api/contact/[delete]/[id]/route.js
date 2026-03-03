import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: "Contact deleted successfully" },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}