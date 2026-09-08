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
      <div className="border border-lineDark rounded-sm p-5 bg-white/5">
        <p className="text-sm text-paper/60 mb-3">Attendee age</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ageBuckets}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A232B" />
            <XAxis dataKey="label" fontSize={12} stroke="#F5F0EC99" />
            <YAxis fontSize={12} allowDecimals={false} stroke="#F5F0EC99" />
            <Tooltip
              contentStyle={{
                background: "#161318",
                border: "1px solid #2A232B",
                color: "#F5F0EC",
              }}
            />
            <Bar dataKey="count" fill="#FE0187" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-lineDark rounded-sm p-5 bg-white/5">
        <p className="text-sm text-paper/60 mb-3">Sales by day</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={salesByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A232B" />
            <XAxis dataKey="day" fontSize={12} stroke="#F5F0EC99" />
            <YAxis fontSize={12} allowDecimals={false} stroke="#F5F0EC99" />
            <Tooltip
              contentStyle={{
                background: "#161318",
                border: "1px solid #2A232B",
                color: "#F5F0EC",
              }}
            />
            <Line type="monotone" dataKey="count" stroke="#FE0187" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
