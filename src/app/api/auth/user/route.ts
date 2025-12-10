import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { validatePartialUser } from "@/lib/validators";

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json({ user: session?.user ?? null });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { user: update } = body;

    if (!update) {
      return NextResponse.json({ error: "User data is required" }, { status: 400 });
    }

    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const validated = validatePartialUser(update);

    session.user = { ...session.user, ...validated };
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Error updating user:", error);
    const message = error instanceof Error ? error.message : "Failed to update user";
    return NextResponse.json(
      { error: message },
      { status: message.includes("Invalid") ? 400 : 500 }
    );
  }
}


