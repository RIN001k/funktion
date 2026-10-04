import { supabaseAdmin, Ticket } from "@/lib/supabase";
import AdminDashboard, { EventGroup } from "./AdminDashboard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data: tickets } = await supabaseAdmin
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: true });

  const list: Ticket[] = tickets || [];
  const groups = groupByEvent(list);

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto text-ink bg-paper">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Dashboard</h1>
        <Link
          href="/scan"
          className="text-sm border border-line rounded-sm px-4 py-2 hover:border-[#FF0099] hover:text-[#FF0099] transition-colors"
        >
          Open scanner →
        </Link>
      </div>

      <AdminDashboard groups={groups} />
    </main>
  );
}

// Group tickets by the event they were sold for, so past events keep
// their own numbers instead of blending into one running total. Every
// ticket is tagged with event_name/event_date at purchase time (see
// lib/stripe.ts + the webhook), so changing those env vars for a new
// event automatically starts a fresh tab going forward.
function groupByEvent(list: Ticket[]): EventGroup[] {
  const map = new Map<
    string,
    { eventName: string; eventDate: string; tickets: Ticket[] }
  >();

  for (const t of list) {
    const eventName = t.event_name || "Untitled event";
    const eventDate = t.event_date || "TBA";
    const key = `${eventName}::${eventDate}`;
    if (!map.has(key)) map.set(key, { eventName, eventDate, tickets: [] });
    map.get(key)!.tickets.push(t);
  }

  const groups = Array.from(map.entries()).map(([key, g]) => {
    const totalSold = g.tickets.length;
    const checkedIn = g.tickets.filter((t) => t.status === "used").length;
    const presaleSold = g.tickets.filter(
      (t) => t.ticket_type === "presale"
    ).length;
    const studentSold = g.tickets.filter(
      (t) => t.ticket_type === "student"
    ).length;
    const revenue =
      g.tickets.reduce((sum, t) => sum + (t.price_paid || 0), 0) / 100;
    const latestPurchase = g.tickets.reduce(
      (max, t) => (t.created_at > max ? t.created_at : max),
      g.tickets[0].created_at
    );

    return {
      key,
      eventName: g.eventName,
      eventDate: g.eventDate,
      tickets: g.tickets,
      totalSold,
      presaleSold,
      studentSold,
      regularSold: totalSold - presaleSold - studentSold,
      checkedIn,
      revenue,
      ageBuckets: bucketAges(g.tickets),
      salesByDay: bucketByDay(g.tickets),
      latestPurchase,
    };
  });

  // Most recently active event first (so the dashboard opens on the
  // current event by default), earlier events after it as history.
  groups.sort((a, b) => (a.latestPurchase < b.latestPurchase ? 1 : -1));

  return groups;
}

function bucketAges(list: Ticket[]) {
  const ranges: [string, number, number][] = [
    ["<18", 0, 17],
    ["18–24", 18, 24],
    ["25–34", 25, 34],
    ["35–44", 35, 44],
    ["45–54", 45, 54],
    ["55+", 55, 999],
  ];
  return ranges.map(([label, min, max]) => ({
    label,
    count: list.filter((t) => t.age != null && t.age >= min && t.age <= max)
      .length,
  }));
}

function bucketByDay(list: Ticket[]) {
  const counts: Record<string, number> = {};
  for (const t of list) {
    const day = new Date(t.created_at).toLocaleDateString("en-GB");
    counts[day] = (counts[day] || 0) + 1;
  }
  return Object.entries(counts).map(([day, count]) => ({ day, count }));
}
