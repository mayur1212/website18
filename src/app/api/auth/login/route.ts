import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user } = body;

    if (!user) {
      return NextResponse.json({ error: "User is required" }, { status: 400 });
    }

    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Session could not be created" },
        { status: 500 }
      );
    }

    // SIMPLE ASSIGN (no validation)
    session.user = user;
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}




