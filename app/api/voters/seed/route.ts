import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import Voter from "@/models/Voter";

export async function GET() {
  try {
    await dbConnect();

    const existingVoter = await Voter.findOne({ email: "mathewdivine95@gmail.com" });

    if (existingVoter) {
      return NextResponse.json({
        message: "Demo voter already exists",
        email: "mathewdivine95@gmail.com",
        password: "1234",
        voterId: existingVoter.voterId,
      });
    }

    const hashedPassword = await bcrypt.hash("1234", 10);
    const voter = await Voter.create({
      name: "Mathew Divine",
      email: "mathewdivine95@gmail.com",
      password: hashedPassword,
      phone: "9999999999",
      aadhar: "999999999999",
      dob: new Date("1995-01-01"),
      address: "Registered Voter Road, City Center",
      gender: "Male",
      voterId: `VOTER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    });

    return NextResponse.json({
      message: "Demo voter created successfully",
      email: "mathewdivine95@gmail.com",
      password: "1234",
      voterId: voter.voterId,
    });
  } catch (error: any) {
    console.error("VOTER_SEED_ERROR:", error);
    return NextResponse.json(
      { message: "Unable to create demo voter." },
      { status: 500 }
    );
  }
}
