import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await dbConnect();

    // Check if demo admin already exists
    const existingAdmin = await Admin.findOne({ email: "mathewdivine95@gmail.com" });

    if (existingAdmin) {
      return NextResponse.json({
        message: "Demo admin account already exists",
        email: "mathewdivine95@gmail.com",
        password: "1234"
      });
    }

    // Create demo admin with requested credentials
    const hashedPassword = await bcrypt.hash("1234", 10);

    const demoAdmin = await Admin.create({
      name: "Mathew Divine",
      email: "mathewdivine95@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    return NextResponse.json({
      message: "Demo admin account created successfully",
      email: "mathewdivine95@gmail.com",
      password: "1234",
      note: "Use these credentials to login to the admin portal"
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { message: "Error creating test admin" },
      { status: 500 }
    );
  }
}
