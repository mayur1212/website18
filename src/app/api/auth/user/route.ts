import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json({ user: session?.user ?? null });
  } catch (error) {
    console.error("Session read error:", error);
    return NextResponse.json({ user: null });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { user } = body;

    if (!user) {
      return NextResponse.json({ error: "User is required" }, { status: 400 });
    }

    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }

    session.user = user;
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}



