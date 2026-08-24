import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendTicketEmail(params: {
  to: string;
  name: string;
  qrPng: Buffer;
}) {
  const { to, name, qrPng } = params;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "tickets@example.com",
    to,
    subject: "Your FUNKTION ticket",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="font-size: 20px;">Hey ${escapeHtml(name)},</h1>
        <p>Thanks for grabbing a ticket to <strong>FUNKTION</strong>.</p>
        <p>Your personal QR code is attached to this email.
        Just show it on your phone or print it out at the door.</p>
        <p style="color: #777; font-size: 13px;">This QR code is single-use:
        it becomes invalid as soon as it's scanned at entry.</p>
      </div>
    `,
    attachments: [
      {
        filename: "ticket-qr.png",
        content: qrPng.toString("base64"),
      },
    ],
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
