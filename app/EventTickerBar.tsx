import { SALES_OPEN } from "@/lib/tickets";

export default function EventTickerBar() {
  return (
    <div className="flex items-center gap-4 py-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/gallery/v3/f13-thumb.jpg"
        alt=""
        aria-hidden
        className="w-7 h-7 object-cover shrink-0"
      />
      {/* Two equal-width columns: both blocks start on the same line and
          take the same width, text left-aligned in each. */}
      <div className="flex-1 grid grid-cols-2 gap-4 items-start text-[9px] font-semibold uppercase leading-[1.2]">
        <div>
          <p>Next Event:</p>
          <p>Techno</p>
          <p>20.11.2026</p>
          <p>Wohnzimmer Bar</p>
        </div>
        <div>
          {SALES_OPEN ? (
            <>
              <p>Tickets Available Now</p>
              <p>Limited Capacity</p>
              <p>Get Yours Early</p>
            </>
          ) : (
            <>
              <p>Online Sales Closed</p>
              <p>Tickets Available</p>
              <p>At The Door</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
