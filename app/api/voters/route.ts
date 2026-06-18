import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Voter from '@/models/Voter';

export async function POST(request: Request) {
  try {
    console.log("--- API START ---");
    await dbConnect();
    console.log("DB Connected Successfully");

    const body = await request.json();
    console.log("Request Body:", body);

    // Generate ID
    const generatedVoterId = `VOTER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newVoter = await Voter.create({
      ...body,
      voterId: generatedVoterId
    });

    console.log("Voter Created:", newVoter._id);
    return NextResponse.json({ success: true, data: newVoter }, { status: 201 });

  } catch (error: any) {
    // THIS LOG WILL APPEAR IN YOUR TERMINAL
    console.error("CRITICAL API ERROR:", error.message); 
    
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}

// GET route to fetch all voters
export async function GET() {
  try {
    await dbConnect();
    const voters = await Voter.find({});
    return NextResponse.json({ success: true, data: voters });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT route to update a voter
export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

    const updatedVoter = await Voter.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedVoter) {
      return NextResponse.json(
        { message: "Voter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Voter updated!", data: updatedVoter },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE route to remove a voter
export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

    const deletedVoter = await Voter.findByIdAndDelete(id);

    if (!deletedVoter) {
      return NextResponse.json(
        { message: "Voter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Voter deleted!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}