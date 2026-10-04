import { NextResponse } from "next/server";
import { getTicketOptions } from "@/lib/availability";

// Always computed fresh — the presale counter changes with every sale.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getTicketOptions(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("ticket-options error", err);
    return NextResponse.json(
      { error: "Could not load tickets" },
      { status: 500 }
    );
  }
}
