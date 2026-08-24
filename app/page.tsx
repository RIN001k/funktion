import { EVENT_NAME, TICKET_PRICE_CENTS, TICKET_CURRENCY } from "@/lib/stripe";
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
          {EVENT_NAME}
        </h1>
        <p className="text-pop underline underline-offset-4 decoration-2 font-display text-2xl mb-16">
          билеты уже в продаже
        </p>

        <div className="w-full max-w-md border border-line rounded-sm p-10 bg-paper text-left">
          <p className="uppercase tracking-[0.2em] text-xs text-gold mb-3">
            Билет
          </p>
          <p className="text-ink/70 mb-8 leading-relaxed">
            Один билет — один вход. После оплаты мы вышлем именной QR-код
            на вашу почту. Покажите его на входе — распечатанным или на
            экране телефона.
          </p>

          <div className="flex items-baseline justify-between border-t border-line pt-6 mb-8">
            <span className="text-sm text-ink/60">Стоимость</span>
            <span className="font-display text-2xl">
              {currencySymbol}
              {price}
            </span>
          </div>

          <BuyButton />

          <p className="text-xs text-ink/50 mt-6 text-center">
            Оплата проходит через Stripe. Мы не храним данные вашей карты.
          </p>
        </div>
      </section>

      <PartyGallery />
    </main>
  );
}
