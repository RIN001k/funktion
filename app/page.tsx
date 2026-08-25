import {
  TICKET_PRICE_CENTS,
  TICKET_CURRENCY,
  EVENT_DATE,
} from "@/lib/stripe";
import BuyButton from "./BuyButton";
import PhotoStack from "./PhotoStack";
import SiteNav from "./SiteNav";

export default function HomePage() {
  const price = (TICKET_PRICE_CENTS / 100).toFixed(2);
  const currencySymbol =
    TICKET_CURRENCY.toLowerCase() === "eur" ? "€" : TICKET_CURRENCY.toUpperCase();

  return (
    <main id="top" className="min-h-screen overflow-x-hidden">
      <SiteNav />

      {/* HERO — giant outline wordmark behind a scrollable stack of photos */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-40 sm:pt-32 pb-16">
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span className="font-display text-stroke-pink text-[11vw] leading-none whitespace-nowrap opacity-80">
            THE FUNKTION
          </span>
        </div>

        <p className="relative z-10 uppercase tracking-[0.3em] text-xs text-pink mb-6">
          Tickets on sale now
        </p>

        <PhotoStack />

        <div className="relative z-10 mt-8">
          <a
            href="#tickets"
            className="inline-block bg-pink text-ink font-body font-semibold uppercase tracking-[0.1em] text-sm px-8 py-4 rounded-full hover:bg-white transition-colors"
          >
            Get tickets
          </a>
        </div>
      </section>

      {/* TICKETS */}
      <section
        id="tickets"
        className="relative px-6 py-24 border-t border-lineDark"
      >
        <div className="max-w-md mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-pink mb-3 text-center">
            Ticket
          </p>
          <h2 className="font-display text-4xl text-center mb-10">
            {EVENT_DATE}
          </h2>

          <div className="border border-lineDark bg-white/[0.03] rounded-sm p-8">
            <p className="text-paper/70 mb-8 leading-relaxed text-sm">
              One ticket, one entry. After payment we&apos;ll email you a
              personal QR code — show it at the door, printed or on your
              phone.
            </p>

            <div className="flex items-baseline justify-between border-t border-lineDark pt-6 mb-8">
              <span className="text-sm text-paper/60">Price</span>
              <span className="font-display text-3xl text-pink">
                {currencySymbol}
                {price}
              </span>
            </div>

            <BuyButton />

            <p className="text-xs text-paper/40 mt-6 text-center">
              Payment is handled by Stripe. We never see your card details.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="relative px-6 py-24 border-t border-lineDark"
      >
        <div className="max-w-lg mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-pink mb-3">
            About
          </p>
          <h2 className="font-display text-4xl mb-6">The Function</h2>
          <p className="text-paper/70 leading-relaxed">
            THE FUNKTION started as a night between friends and turned into
            something people keep showing up for. Fog, lasers, a couple of
            dragons watching from the walls, and a sound system that
            doesn&apos;t hold back. No dress code, no bad music — just the
            function.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative px-6 py-24 border-t border-lineDark"
      >
        <div className="max-w-lg mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-pink mb-3">
            Contact
          </p>
          <h2 className="font-display text-4xl mb-6">Get in touch</h2>
          <p className="text-paper/70 leading-relaxed mb-8">
            Questions about tickets, bookings, or getting on the list —
            reach out.
          </p>
          <a
            href="mailto:thefunktion9020@gmail.com"
            className="inline-block border border-pink text-pink font-body uppercase tracking-[0.1em] text-sm px-8 py-3.5 rounded-full hover:bg-pink hover:text-ink transition-colors"
          >
            thefunktion9020@gmail.com
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 border-t border-lineDark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper/40 uppercase tracking-[0.15em]">
        <span>© {new Date().getFullYear()} The Funktion</span>
        <div className="flex gap-6">
          <a href="#about" className="hover:text-pink transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-pink transition-colors">
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}
