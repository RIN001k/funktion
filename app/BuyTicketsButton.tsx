"use client";

import { openTicketChooser } from "./TicketChooser";

export default function BuyTicketsButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      onClick={openTicketChooser}
      className={`inline-flex items-center justify-center gap-1 bg-[#FF0099] text-black font-bold uppercase text-[9px] leading-[11px] px-3 py-1.5 border border-[#141414] hover:bg-black hover:text-white transition-colors whitespace-nowrap ${className}`}
    >
      Buy Tickets
      <span aria-hidden>↗</span>
    </button>
  );
}
