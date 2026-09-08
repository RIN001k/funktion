export default function EventTickerBar() {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-9 h-9 bg-[#262626] shrink-0" aria-hidden />
      <div className="text-[11px] font-semibold uppercase leading-[1.2]">
        <p>Next Event</p>
        <p>Open Air + Workshop</p>
        <p>03.07.2026</p>
        <p>Klagenfurt</p>
      </div>
      <div className="text-[11px] font-semibold uppercase leading-[1.2]">
        <p>Sold Out</p>
        <p>Pizza Workshop</p>
        <p>Early Bird Tickets</p>
      </div>
    </div>
  );
}
