import { Resend } from "resend";
import { EVENT_DATE } from "./stripe";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendTicketEmail(params: {
  to: string;
  name: string;
  qrPng: Buffer;
}) {
  const { to, qrPng } = params;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "tickets@example.com",
    to,
    subject: "Your THE FUNKTION ticket",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; line-height: 1.6;">
        <p>Thank you for purchasing your ticket to THE FUNKTION on ${escapeHtml(
          EVENT_DATE
        )}.</p>
        <p>Please have your ticket or QR code ready at the entrance.</p>
        <p>If you purchased a student ticket, please be prepared to present a valid student ID.</p>
        <p>We look forward to welcoming you.</p>
        <p>See you at FUNKTION.</p>
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
