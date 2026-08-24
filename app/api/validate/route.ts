import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token || typeof token !== "string") {
    return NextResponse.json({ valid: false, reason: "not_found" });
  }

  const { data: ticket, error } = await supabaseAdmin
    .from("tickets")
    .select("*")
    .eq("qr_token", token)
    .maybeSingle();

  if (error || !ticket) {
    return NextResponse.json({ valid: false, reason: "not_found" });
  }

  if (ticket.status === "used") {
    return NextResponse.json({
      valid: false,
      reason: "already_used",
      checked_in_at: ticket.checked_in_at,
      name: ticket.name,
    });
  }

  const { error: updateError } = await supabaseAdmin
    .from("tickets")
    .update({ status: "used", checked_in_at: new Date().toISOString() })
    .eq("id", ticket.id);

  if (updateError) {
    return NextResponse.json({ valid: false, reason: "not_found" });
  }

  return NextResponse.json({
    valid: true,
    name: ticket.name,
    age: ticket.age,
  });
}
