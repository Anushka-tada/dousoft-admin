import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST() {
  try {
    await connectDB();

    const alreadyExists = await Admin.findOne({
      email: "admin@dousoft.com",
    });

    if (alreadyExists) {
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await Admin.create({
      name: "Super Admin",
      email: "admin@dousoft.com",
      password: hashedPassword,
      role: "admin",
      status: "active",
    });

    return NextResponse.json({
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
