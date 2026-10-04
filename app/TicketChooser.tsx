"use client";

import { useCallback, useEffect, useState } from "react";

type TicketType = "presale" | "student" | "regular";

type Options = {
  presaleOpen: boolean;
  presaleRemaining: number;
  presaleLimit: number;
  prices: Record<TicketType, number>;
};

const OPEN_EVENT = "funktion:open-ticket-chooser";

// Any "Buy tickets" button (mobile or desktop) calls this to open the
// chooser. Using a window event keeps the buttons simple and lets the
// modal live once at the page root — outside the scaled desktop canvas,
// whose CSS transform would otherwise break a fixed-position overlay.
export function openTicketChooser() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function formatPrice(cents: number) {
  const euros = cents / 100;
  return `${Number.isInteger(euros) ? euros : euros.toFixed(2)}€`;
}

export default function TicketChooser() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Options | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState<TicketType | null>(null);

  // What's on sale changes as presale tickets sell, so ask the server
  // every time the chooser opens.
  const loadOptions = useCallback(async () => {
    setLoadError(false);
    try {
      const res = await fetch("/api/ticket-options", { cache: "no-store" });
      if (!res.ok) throw new Error();
      setOptions(await res.json());
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      loadOptions();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [loadOptions]);

  // Coming back from Stripe with the browser's back button can restore
  // the page from cache with the spinner still showing — reset it.
  useEffect(() => {
    const onShow = () => setLoading(null);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  async function buy(type: TicketType) {
    if (loading) return;
    setLoading(type);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (res.status === 409 && data.options) {
        // e.g. presale sold out while the chooser was open
        setOptions(data.options);
        setLoading(null);
        return;
      }
      if (!res.ok || !data.url) throw new Error(data.error || "Failed");
      window.location.href = data.url;
    } catch {
      setLoading(null);
      alert("Could not start checkout. Please try again.");
    }
  }

  if (!open) return null;

  const option = (type: TicketType, label: string, cents: number) => (
    <button
      key={type}
      onClick={() => buy(type)}
      disabled={loading !== null}
      className="w-full flex items-center justify-between bg-[#FF0099] text-black font-bold uppercase text-[12px] leading-[14px] px-4 py-4 border border-[#141414] hover:bg-black hover:text-white transition-colors disabled:opacity-60"
    >
      <span>{loading === type ? "One sec…" : label}</span>
      <span className="flex items-center gap-2">
        {formatPrice(cents)}
        <span aria-hidden>↗</span>
      </span>
    </button>
  );

  let body: React.ReactNode;
  if (loadError) {
    body = (
      <div className="text-[12px] leading-[16px]">
        <p className="mb-3">Couldn&apos;t load tickets.</p>
        <button
          onClick={loadOptions}
          className="underline hover:text-[#FF0099]"
        >
          Try again
        </button>
      </div>
    );
  } else if (!options) {
    body = <p className="text-[12px] text-ink/60 py-6">Loading…</p>;
  } else if (options.presaleOpen) {
    body = (
      <>
        <div className="space-y-3">
          {option("presale", "Presale ticket", options.prices.presale)}
        </div>
        <p className="text-[10px] leading-[13px] text-ink/60 mt-4">
          Limited presale — only the first {options.presaleLimit} tickets,
          same price for everyone.
        </p>
      </>
    );
  } else {
    body = (
      <>
        <div className="space-y-3">
          {option("student", "Student", options.prices.student)}
          {option("regular", "Non-student", options.prices.regular)}
        </div>
        <p className="text-[10px] leading-[13px] text-ink/60 mt-4">
          Student tickets: a valid student ID is required at the entrance.
        </p>
      </>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
      onClick={() => !loading && setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Choose your ticket"
    >
      <div
        className="relative w-full max-w-[340px] bg-white text-ink border border-[#141414] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-4 text-[18px] leading-none text-ink/60 hover:text-ink"
          aria-label="Close"
        >
          ×
        </button>

        <p className="font-helvetica font-bold text-[16px] leading-[20px] mb-1">
          {options?.presaleOpen ? "PRESALE" : "CHOOSE YOUR TICKET"}
        </p>
        <div className="w-10 h-[3px] bg-[#FF0099] mb-6" />

        {body}
      </div>
    </div>
  );
}
