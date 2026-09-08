"use client";

import { useEffect, useRef, useState } from "react";

type PreviousEvent = { event_name: string; event_date: string };

type ScanResult = {
  valid: boolean;
  name?: string;
  age?: number | null;
  reason?: "already_used" | "not_found";
  checked_in_at?: string;
  previousEvents?: PreviousEvent[];
};

export default function ScanPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<any>(null);
  const busyRef = useRef(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("html5-qrcode").then(({ Html5Qrcode }) => {
      if (cancelled || !containerRef.current) return;
      const scanner = new Html5Qrcode(containerRef.current.id);
      scannerRef.current = scanner;

      scanner
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 260, height: 260 } },
          onScan,
          () => {} // ignore per-frame decode errors
        )
        .catch((err: any) => {
          console.error("Camera start failed", err);
        });
    });

    return () => {
      cancelled = true;
      scannerRef.current?.stop().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onScan(token: string) {
    if (busyRef.current) return;
    busyRef.current = true;

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data: ScanResult = await res.json();
      setResult(data);
    } catch {
      setResult({ valid: false, reason: "not_found" });
    }

    // Show the result for 4 seconds (a bit longer now that there's more
    // to read), then allow the next scan.
    setTimeout(() => {
      setResult(null);
      busyRef.current = false;
    }, 4000);
  }

  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-paper font-display text-2xl mb-6">Scan tickets</h1>

      <div
        id="qr-reader"
        ref={containerRef}
        className="w-full max-w-sm rounded-sm overflow-hidden"
      />

      <div className="min-h-28 flex items-center justify-center mt-6 w-full max-w-sm">
        {result && (
          <div
            className={`w-full rounded-sm p-5 text-center ${
              result.valid ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            <p className="font-display text-xl mb-1">
              {result.valid ? (
                <>Entry allowed{result.name ? ` — ${result.name}` : ""}</>
              ) : result.reason === "already_used" ? (
                "Ticket already used"
              ) : (
                "Ticket not found"
              )}
            </p>

            {result.age != null && (
              <p className="text-sm opacity-90 mb-2">Age: {result.age}</p>
            )}

            {result.previousEvents && (
              <div className="text-sm opacity-90 mt-2 pt-2 border-t border-white/30">
                {result.previousEvents.length === 0 ? (
                  <p>First time at a FUNKTION event 🎉</p>
                ) : (
                  <>
                    <p className="mb-1">Previously attended:</p>
                    <ul>
                      {result.previousEvents.map((ev, i) => (
                        <li key={i}>
                          {ev.event_name}
                          {ev.event_date ? ` — ${ev.event_date}` : ""}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
