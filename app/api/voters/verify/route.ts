import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Voter from "@/models/Voter";

const SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization header missing." },
        { status: 401 }
      );
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET) as { id: string };

    const voter = await Voter.findById(decoded.id).select("-password");

    if (!voter) {
      return NextResponse.json(
        { success: false, message: "Voter not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, voter },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("VOTER_VERIFY_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Invalid or expired token." },
      { status: 401 }
    );
  }
}
