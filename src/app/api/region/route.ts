// app/api/region/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

// Simple Region type for now
type RegionData = {
  country?: string;
  city?: string;
  cinema?: string;
};

export async function GET() {
  try {
    const session: any = await getSession();

    const region: RegionData = session?.region || {
      country: undefined,
      city: undefined,
      cinema: undefined,
    };

    return NextResponse.json({ region });
  } catch (error) {
    console.error("Error getting region from session:", error);

    return NextResponse.json(
      {
        region: {
          country: undefined,
          city: undefined,
          cinema: undefined,
        },
      },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { region } = await request.json();

    if (!region || typeof region !== "object") {
      return NextResponse.json(
        { error: "Invalid region data" },
        { status: 400 }
      );
    }

    const session: any = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "No session available" },
        { status: 401 }
      );
    }

    session.region = {
      country: region.country,
      city: region.city,
      cinema: region.cinema,
    };

    return NextResponse.json({ success: true, region: session.region });
  } catch (error) {
    console.error("Error setting region in session:", error);

    return NextResponse.json(
      { error: "Failed to set region" },
      { status: 500 }
    );
  }
}
