import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { EVENT_NAME, EVENT_DATE } from "@/lib/stripe";
import { ADMIN_COOKIE_NAME, expectedSessionValue } from "@/lib/auth";

// Live counter for the door scanner: how many tickets of the CURRENT
// event (EVENT_NAME + EVENT_DATE) are checked in, out of how many sold.
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function count(onlyCheckedIn: boolean) {
  let q = supabaseAdmin
    .from("tickets")
    .select("id", { head: true, count: "exact" })
    .eq("event_name", EVENT_NAME)
    .eq("event_date", EVENT_DATE);
  if (onlyCheckedIn) q = q.eq("status", "used");
  const { count, error } = await q;
  if (error) throw error;
  return count || 0;
}

async function handler(req: NextRequest) {
  // Same login as /admin and /scan.
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!cookie || cookie !== expectedSessionValue()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [checkedIn, total] = await Promise.all([count(true), count(false)]);
    return NextResponse.json(
      { checkedIn, total, eventName: EVENT_NAME },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    console.error("scan-stats error", err);
    return NextResponse.json({ error: "Could not load stats" }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
