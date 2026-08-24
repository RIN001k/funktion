import { NextRequest, NextResponse } from "next/server";
import { stripe, TICKET_PRICE_CENTS, TICKET_CURRENCY, EVENT_NAME } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || process.env.SITE_URL || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: TICKET_CURRENCY,
            product_data: { name: `Билет: ${EVENT_NAME}` },
            unit_amount: TICKET_PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
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
      { error: "Не удалось создать сессию оплаты" },
      { status: 500 }
    );
  }
}
