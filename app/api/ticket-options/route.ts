import { NextResponse } from "next/server";
import { getTicketOptions } from "@/lib/availability";

// Always computed fresh — the presale counter changes with every sale.
// The chooser on the site uses POST (POST responses are never cached by
// Next.js or the CDN); GET stays for checking it by hand in a browser.
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function handler() {
  try {
    return NextResponse.json(await getTicketOptions(), {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (err) {
    console.error("ticket-options error", err);
    return NextResponse.json(
      { error: "Could not load tickets" },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
