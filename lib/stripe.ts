import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export const TICKET_CURRENCY = process.env.TICKET_CURRENCY || "eur";

export { TICKET_TYPES, isTicketType } from "./tickets";
export type { TicketType } from "./tickets";
export const EVENT_NAME = process.env.EVENT_NAME || "FUNKTION";
export const EVENT_DATE = process.env.EVENT_DATE || "TBA";
