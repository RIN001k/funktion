import { TICKET_PRICE_CENTS, TICKET_CURRENCY } from "@/lib/stripe";
import BuyButton from "./BuyButton";
import PartyGallery from "./PartyGallery";

export default function HomePage() {
  const price = (TICKET_PRICE_CENTS / 100).toFixed(2);
  const currencySymbol =
    TICKET_CURRENCY.toLowerCase() === "eur" ? "€" : TICKET_CURRENCY.toUpperCase();

  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <h1 className="font-display font-bold text-5xl sm:text-7xl tracking-tight mb-3">
          FUNKTION
        </h1>
        <p className="text-pop underline underline-offset-4 decoration-2 font-display text-2xl mb-16">
          tickets on sale now
        </p>

        <div className="w-full max-w-md border border-line rounded-sm p-10 bg-paper text-left">
          <p className="uppercase tracking-[0.2em] text-xs text-gold mb-3">
            Ticket
          </p>
          <p className="text-ink/70 mb-8 leading-relaxed">
            One ticket, one entry. After payment we&apos;ll email you a
            personal QR code — show it at the door, printed or on your
            phone.
          </p>

          <div className="flex items-baseline justify-between border-t border-line pt-6 mb-8">
            <span className="text-sm text-ink/60">Price</span>
            <span className="font-display text-2xl">
              {currencySymbol}
              {price}
            </span>
          </div>

          <BuyButton />

          <p className="text-xs text-ink/50 mt-6 text-center">
            Payment is handled by Stripe. We never see your card details.
          </p>
        </div>
      </section>

      <PartyGallery />
    </main>
  );
}
