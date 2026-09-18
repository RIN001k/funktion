import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Supabase's free tier auto-pauses a project after about a week with no
// database activity. This route just touches the DB with a cheap read so
// a Vercel Cron Job (see vercel.json) can hit it every couple of days and
// keep the project awake — no external service or account needed.
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabaseAdmin
    .from("tickets")
    .select("id", { head: true, count: "exact" });

  if (error) {
    console.error("Keepalive query failed", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
}
