"use client";

import { useState } from "react";

export default function BuyTicketsButton({
  className = "",
}: {
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Failed");
      window.location.href = data.url;
    } catch {
      setLoading(false);
      alert("Could not start checkout. Please try again.");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 bg-pink text-white font-bold uppercase tracking-[0.05em] text-xs px-5 py-3 rounded-[16px] hover:bg-ink transition-colors disabled:opacity-60 whitespace-nowrap ${className}`}
    >
      {loading ? "One sec…" : "Buy Tickets"}
      {!loading && <span aria-hidden>↗</span>}
    </button>
  );
}
