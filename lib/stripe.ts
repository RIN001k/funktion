import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Ticket price in cents, and the currency, come from env so you can
// change the price without touching code.
export const TICKET_PRICE_CENTS = parseInt(
  process.env.TICKET_PRICE_CENTS || "2500",
  10
);
export const TICKET_CURRENCY = process.env.TICKET_CURRENCY || "eur";
export const EVENT_NAME = process.env.EVENT_NAME || "Наше мероприятие";
