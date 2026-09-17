"use client";

import { useState } from "react";
import Charts from "./Charts";
import { Ticket } from "@/lib/supabase";

export type EventGroup = {
  key: string;
  eventName: string;
  eventDate: string;
  tickets: Ticket[];
  totalSold: number;
  checkedIn: number;
  revenue: number;
  ageBuckets: { label: string; count: number }[];
  salesByDay: { day: string; count: number }[];
  latestPurchase: string;
};

export default function AdminDashboard({ groups }: { groups: EventGroup[] }) {
  const [selected, setSelected] = useState(0);

  if (groups.length === 0) {
    return (
      <p className="text-center text-ink/40 py-16">No tickets sold yet</p>
    );
  }

  const g = groups[Math.min(selected, groups.length - 1)];

  return (
    <div>
      {groups.length > 1 && (
        <div className="flex gap-2 overflow-x-auto mb-8 pb-1 -mx-1 px-1">
          {groups.map((group, i) => (
            <button
              key={group.key}
              onClick={() => setSelected(i)}
              className={`whitespace-nowrap text-xs uppercase tracking-wide rounded-sm px-3 py-2 border transition-colors ${
                i === selected
                  ? "bg-ink text-paper border-ink"
                  : "border-line text-ink/60 hover:border-ink hover:text-ink"
              }`}
            >
              {group.eventName} — {group.eventDate}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-10">
        <Stat label="Tickets sold" value={g.totalSold.toString()} />
        <Stat label="Checked in" value={g.checkedIn.toString()} />
        <Stat label="Revenue" value={`€${g.revenue.toFixed(2)}`} />
      </div>

      <Charts ageBuckets={g.ageBuckets} salesByDay={g.salesByDay} />

      <h2 className="font-display text-xl mt-10 mb-4">All tickets</h2>
      <div className="border border-line rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink/5 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Purchased</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {g.tickets.map((t) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line rounded-sm p-3 sm:p-5 bg-ink/5 overflow-hidden">
      <p className="text-[10px] sm:text-xs uppercase tracking-wide text-ink/50 mb-1 leading-tight min-h-[2em]">
        {label}
      </p>
      <p className="font-display text-lg sm:text-2xl text-ink whitespace-nowrap overflow-hidden text-ellipsis">
        {value}
      </p>
    </div>
  );
}
