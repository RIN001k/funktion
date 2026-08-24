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
      <div className="border border-line rounded-sm p-5 bg-white/50">
        <p className="text-sm text-ink/60 mb-3">Возраст посетителей</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ageBuckets}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DFD9C8" />
            <XAxis dataKey="label" fontSize={12} />
            <YAxis fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#B08A3E" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-line rounded-sm p-5 bg-white/50">
        <p className="text-sm text-ink/60 mb-3">Продажи по дням</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={salesByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DFD9C8" />
            <XAxis dataKey="day" fontSize={12} />
            <YAxis fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#141312" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
