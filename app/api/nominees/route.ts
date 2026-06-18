import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Nominee from '@/models/Nominee';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, party } = await request.json();

    if (!name || !party) {
      return NextResponse.json(
        { message: "Name and Party are required" },
        { status: 400 }
      );
    }

    const newNominee = await Nominee.create({ name, party });

    return NextResponse.json(
      { success: true, message: "Nominee added!", data: newNominee },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Optional: GET route to fetch all nominees
export async function GET() {
  try {
    await dbConnect();
    const nominees = await Nominee.find({});
    return NextResponse.json({ success: true, data: nominees });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT route to update a nominee
export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { id, name, party } = await request.json();

    if (!id || !name || !party) {
      return NextResponse.json(
        { message: "ID, Name and Party are required" },
        { status: 400 }
      );
    }

    const updatedNominee = await Nominee.findByIdAndUpdate(
      id,
      { name, party },
      { new: true }
    );

    if (!updatedNominee) {
      return NextResponse.json(
        { message: "Nominee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Nominee updated!", data: updatedNominee },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE route to remove a nominee
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

    const deletedNominee = await Nominee.findByIdAndDelete(id);

    if (!deletedNominee) {
      return NextResponse.json(
        { message: "Nominee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Nominee deleted!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}