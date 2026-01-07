import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const password = "Admin@123";
  const hashedPassword = await bcrypt.hash(password, 10);

  return NextResponse.json({
    password,
    hashedPassword,
  });
}
