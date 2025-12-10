import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();

    // ✅ Handle case where no session exists
    if (!session) {
      return NextResponse.json(
        { success: false, message: "No active session" },
        { status: 200 }
      );
    }

    // ✅ Clear user from session
    session.user = undefined;
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
