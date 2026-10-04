import { NextRequest, NextResponse } from "next/server";
import { getTicketOptions } from "@/lib/availability";
import {
  stripe,
  TICKET_CURRENCY,
  EVENT_NAME,
  TICKET_TYPES,
  isTicketType,
  type TicketType,
} from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || process.env.SITE_URL || "";

    // Which ticket the buyer picked in the chooser (presale / student / regular).
    const body = await req.json().catch(() => ({}));
    if (!isTicketType(body?.type)) {
      return NextResponse.json(
        { error: "Unknown ticket type" },
        { status: 400 }
      );
    }
    const ticketType: TicketType = body.type;

    // Server decides what's actually on sale right now: while presale
    // tickets are left, only presale can be bought; after that, only
    // student / non-student. The chooser re-fetches on a 409.
    const options = await getTicketOptions();
    const allowed =
      ticketType === "presale" ? options.presaleOpen : !options.presaleOpen;
    if (!allowed) {
      return NextResponse.json(
        { error: "options_changed", options },
        { status: 409 }
      );
    }
    const { label, priceCents } = TICKET_TYPES[ticketType];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: TICKET_CURRENCY,
            product_data: {
              name: `${label} ticket — ${EVENT_NAME}`,
              ...(ticketType === "student"
                ? { description: "Valid student ID required at the entrance." }
                : {}),
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      metadata: { ticket_type: ticketType },
      // Custom fields guarantee we get a name and age even though
      // Stripe collects the email automatically for payment mode.
      custom_fields: [
        {
          key: "full_name",
          label: { type: "custom", custom: "Full name" },
          type: "text",
        },
        {
          key: "age",
          label: { type: "custom", custom: "Age" },
          type: "numeric",
          numeric: { minimum_length: 1, maximum_length: 3 },
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("checkout error", err);
    return NextResponse.json(
      { error: "Could not start checkout" },
      { status: 500 }
    );
  }
}
