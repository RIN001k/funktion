import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, EVENT_NAME, EVENT_DATE, isTicketType } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { generateQrPng, generateQrToken } from "@/lib/qr";
import { generateTicketPdf } from "@/lib/pdf";
import { sendTicketEmail } from "@/lib/email";

// Stripe needs the raw request body to verify the webhook signature.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await handleCompletedCheckout(session);
    } catch (err) {
      console.error("Failed to process completed checkout", err);
      // Return 500 so Stripe retries the webhook automatically.
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCompletedCheckout(session: Stripe.Checkout.Session) {
  // Idempotency: if we already created a ticket for this session, stop.
  const { data: existing } = await supabaseAdmin
    .from("tickets")
    .select("id")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing) return;

  const email = session.customer_details?.email;
  if (!email) throw new Error("No email on completed session");

  const fullNameField = session.custom_fields?.find(
    (f) => f.key === "full_name"
  );
  const ageField = session.custom_fields?.find((f) => f.key === "age");

  const name =
    fullNameField?.text?.value || session.customer_details?.name || "Гость";
  const age = ageField?.numeric?.value
    ? parseInt(ageField.numeric.value, 10)
    : null;

  const ticketType = isTicketType(session.metadata?.ticket_type)
    ? session.metadata!.ticket_type
    : "regular";

  const qrToken = generateQrToken();

  const row = {
    email,
    name,
    age,
    stripe_session_id: session.id,
    qr_token: qrToken,
    status: "valid",
    price_paid: session.amount_total || 0,
    event_name: EVENT_NAME,
    event_date: EVENT_DATE,
    ticket_type: ticketType,
  };

  let { error: insertError } = await supabaseAdmin.from("tickets").insert(row);

  // Safety net: if the ticket_type column hasn't been added in Supabase
  // yet, still issue the ticket instead of failing the whole purchase.
  if (insertError && /ticket_type/.test(insertError.message || "")) {
    console.error("tickets.ticket_type column missing — run the migration", insertError);
    const { ticket_type: _omit, ...rowWithoutType } = row;
    ({ error: insertError } = await supabaseAdmin
      .from("tickets")
      .insert(rowWithoutType));
  }

  if (insertError) throw insertError;

  const qrPng = await generateQrPng(qrToken);
  const pdfBuffer = await generateTicketPdf({
    qrPng,
    name,
    eventName: EVENT_NAME,
    eventDate: EVENT_DATE,
    qrToken,
    ticketType,
  });
  await sendTicketEmail({ to: email, name, pdfBuffer });
}
