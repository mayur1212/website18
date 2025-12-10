import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ success: false, message: "No session" });
    }

    // Clear user (use null so TS does not complain)
    session.user = null;
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
