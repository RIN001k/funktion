"use client";

import { useState } from "react";

export default function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-pink text-ink font-body font-semibold uppercase tracking-[0.1em] text-sm py-4 rounded-full hover:bg-white transition-colors disabled:opacity-50"
      >
        {loading ? "One sec…" : "Buy ticket"}
      </button>
      {error && (
        <p className="text-sm text-pink mt-3 text-center">{error}</p>
      )}
    </div>
  );
}
