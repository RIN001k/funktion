import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Falls back to the production domain rather than localhost — this URL
// is loaded by the recipient's inbox, not by our own server.
const SITE_URL =
  process.env.SITE_URL && !process.env.SITE_URL.includes("localhost")
    ? process.env.SITE_URL
    : "https://thefunktion.at";

export async function sendTicketEmail(params: {
  to: string;
  name: string;
  eventDate: string;
  pdfBuffer: Buffer;
}) {
  const { to, name, eventDate, pdfBuffer } = params;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "tickets@example.com",
    to,
    subject: "Your THE FUNKTION ticket",
    html: renderTicketEmailHtml({ eventDate }),
    attachments: [
      {
        filename: "funktion-ticket.pdf",
        content: pdfBuffer.toString("base64"),
      },
    ],
  });
}

function renderTicketEmailHtml(params: { eventDate: string }) {
  const { eventDate } = params;
  const ink = "#0A0A0A";
  const pink = "#FE0187";
  const line = "#1F1F1F";

  return `
    <div style="background:#F4F4F4; padding:32px 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width:480px; margin:0 auto; background:#FFFFFF; border:1px solid ${line};">
        <img
          src="${SITE_URL}/email/hero.jpg"
          width="480"
          alt="THE FUNKTION"
          style="width:100%; display:block; border-bottom:4px solid ${pink};"
        />
        <div style="padding:32px 28px 28px; line-height:1.6; color:${ink};">
          <p style="font-size:14px; margin:0 0 16px;">
            Thank you for purchasing your ticket to THE FUNKTION on ${escapeHtml(
              eventDate
            )}.
          </p>
          <p style="font-size:14px; margin:0 0 16px;">
            Please have your ticket or QR code ready at the entrance.
          </p>
          <p style="font-size:14px; margin:0 0 16px;">
            If you purchased a student ticket, please be prepared to present
            a valid student ID.
          </p>
          <p style="font-size:14px; margin:0 0 16px;">
            We look forward to welcoming you.
          </p>
          <p style="font-size:14px; margin:0;">See you at FUNKTION.</p>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
