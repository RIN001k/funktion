export default function EventTickerBar() {
  return (
    <div className="flex items-center gap-6 py-4">
      <div className="w-14 h-14 bg-ink shrink-0" aria-hidden />
      <div className="text-[11px] font-bold uppercase tracking-[0.03em] leading-snug">
        <p>Next Event</p>
        <p>Open Air + Workshop</p>
        <p>03.07.2026</p>
        <p>Klagenfurt</p>
      </div>
      <div className="text-[11px] font-bold uppercase tracking-[0.03em] leading-snug">
        <p>Sold Out</p>
        <p>Pizza Workshop</p>
        <p>Early Bird Tickets</p>
      </div>
    </div>
  );
}
