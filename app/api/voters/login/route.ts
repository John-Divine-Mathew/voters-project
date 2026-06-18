import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Voter from "@/models/Voter";

const SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const voter = await Voter.findOne({ email: email.trim().toLowerCase() }).select(
      "+password"
    );

    if (!voter) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, voter.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: voter._id,
        email: voter.email,
        role: "voter",
        voterId: voter.voterId,
      },
      SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      {
        success: true,
        token,
        voter: {
          _id: voter._id,
          name: voter.name,
          email: voter.email,
          voterId: voter.voterId,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("VOTER_LOGIN_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Unable to login voter." },
      { status: 500 }
    );
  }
}
