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

  // Look up this person's history at past events (by email), excluding
  // the ticket currently being scanned, so the door staff can see if
  // they've been to previous events by this organizer.
  const previousEvents = await getPreviousEvents(ticket.email, ticket.id);

  if (ticket.status === "used") {
    return NextResponse.json({
      valid: false,
      reason: "already_used",
      checked_in_at: ticket.checked_in_at,
      name: ticket.name,
      age: ticket.age,
      previousEvents,
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
    previousEvents,
  });
}

async function getPreviousEvents(email: string, excludeTicketId: string) {
  const { data } = await supabaseAdmin
    .from("tickets")
    .select("event_name, event_date, created_at")
    .eq("email", email)
    .neq("id", excludeTicketId)
    .order("created_at", { ascending: true });

  if (!data) return [];

  // De-duplicate by event_name + event_date, in case someone somehow
  // bought two tickets to the same event.
  const seen = new Set<string>();
  const result: { event_name: string; event_date: string }[] = [];
  for (const row of data) {
    const eventName = row.event_name || "Unknown event";
    const eventDate = row.event_date || "";
    const key = `${eventName}__${eventDate}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ event_name: eventName, event_date: eventDate });
  }
  return result;
}
