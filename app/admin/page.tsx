import { supabaseAdmin, Ticket } from "@/lib/supabase";
import Charts from "./Charts";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data: tickets } = await supabaseAdmin
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: true });

  const list: Ticket[] = tickets || [];

  const totalSold = list.length;
  const checkedIn = list.filter((t) => t.status === "used").length;
  const revenue = list.reduce((sum, t) => sum + (t.price_paid || 0), 0) / 100;

  const ageBuckets = bucketAges(list);
  const salesByDay = bucketByDay(list);

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Dashboard</h1>
        <Link
          href="/scan"
          className="text-sm border border-line rounded-sm px-4 py-2 hover:bg-white"
        >
          Open scanner →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <Stat label="Tickets sold" value={totalSold.toString()} />
        <Stat label="Checked in" value={checkedIn.toString()} />
        <Stat label="Revenue" value={`€${revenue.toFixed(2)}`} />
      </div>

      <Charts ageBuckets={ageBuckets} salesByDay={salesByDay} />

      <h2 className="font-display text-xl mt-10 mb-4">All tickets</h2>
      <div className="border border-line rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/60 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Purchased</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => (
              <tr key={t.id} className="border-t border-line">
                <td className="px-4 py-2">{t.name}</td>
                <td className="px-4 py-2">{t.email}</td>
                <td className="px-4 py-2">{t.age ?? "—"}</td>
                <td className="px-4 py-2">
                  {new Date(t.created_at).toLocaleString("en-GB")}
                </td>
                <td className="px-4 py-2">
                  {t.status === "used" ? "Checked in" : "Not arrived"}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ink/50">
                  No tickets sold yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line rounded-sm p-5 bg-white/50">
      <p className="text-xs uppercase tracking-wide text-ink/50 mb-1">
        {label}
      </p>
      <p className="font-display text-2xl">{value}</p>
    </div>
  );
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
