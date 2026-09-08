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
      className={`inline-flex items-center justify-center gap-1.5 bg-[#FF0099] text-black font-bold uppercase text-[11px] leading-[13px] px-5 py-3.5 border border-[#141414] hover:bg-black hover:text-white transition-colors disabled:opacity-60 whitespace-nowrap ${className}`}
    >
      {loading ? "One sec…" : "Buy Tickets"}
      {!loading && <span aria-hidden>↗</span>}
    </button>
  );
}
