// Ticket types and prices. All prices (in cents) and the presale limit
// come from env so they can be changed in Vercel without touching code.
//
//   presale  — one price for everyone, only the first PRESALE_LIMIT
//              tickets of the current event (default 60 × 5€)
//   student  — after presale is sold out (default 7€, ID checked at door)
//   regular  — after presale is sold out, non-students (default 10€)
export type TicketType = "presale" | "student" | "regular";

export const TICKET_TYPES: Record<
  TicketType,
  { label: string; priceCents: number }
> = {
  presale: {
    label: "Presale",
    priceCents: parseInt(process.env.PRESALE_PRICE_CENTS || "500", 10),
  },
  student: {
    label: "Student",
    priceCents: parseInt(process.env.STUDENT_PRICE_CENTS || "700", 10),
  },
  regular: {
    label: "Non-student",
    priceCents: parseInt(process.env.REGULAR_PRICE_CENTS || "1000", 10),
  },
};

export const PRESALE_LIMIT = parseInt(process.env.PRESALE_LIMIT || "60", 10);

export function isTicketType(value: unknown): value is TicketType {
  return value === "presale" || value === "student" || value === "regular";
}
