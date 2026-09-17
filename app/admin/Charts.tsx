"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts({
  ageBuckets,
  salesByDay,
}: {
  ageBuckets: { label: string; count: number }[];
  salesByDay: { day: string; count: number }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-line rounded-sm p-5 bg-ink/5">
        <p className="text-sm text-ink/60 mb-3">Attendee age</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ageBuckets}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0A0A0A1A" />
            <XAxis dataKey="label" fontSize={12} stroke="#0A0A0A99" />
            <YAxis fontSize={12} allowDecimals={false} stroke="#0A0A0A99" />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #1F1F1F",
                color: "#0A0A0A",
              }}
            />
            <Bar dataKey="count" fill="#FE0187" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-line rounded-sm p-5 bg-ink/5">
        <p className="text-sm text-ink/60 mb-3">Sales by day</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={salesByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0A0A0A1A" />
            <XAxis dataKey="day" fontSize={12} stroke="#0A0A0A99" />
            <YAxis fontSize={12} allowDecimals={false} stroke="#0A0A0A99" />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #1F1F1F",
                color: "#0A0A0A",
              }}
            />
            <Line type="monotone" dataKey="count" stroke="#FE0187" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
