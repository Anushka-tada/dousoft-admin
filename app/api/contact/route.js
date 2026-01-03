import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, email, phone, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const contact = await Contact.create({ name, email, phone, message });

    return NextResponse.json({
    message: "We have received your query and will get back to you.",
    data: contact,
  }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const contacts = await Contact.find();
  return NextResponse.json( {
      message: "Contacts fetched successfully",
      data: contacts,
    }, { status: 200 });
}
