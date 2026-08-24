import { Resend } from "resend";
import { EVENT_NAME } from "./stripe";

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
    subject: `Ваш билет на «${EVENT_NAME}»`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="font-size: 20px;">Привет, ${escapeHtml(name)}!</h1>
        <p>Спасибо за покупку билета на <strong>${escapeHtml(
          EVENT_NAME
        )}</strong>.</p>
        <p>Ваш персональный QR-код на входе — во вложении этого письма.
        Просто покажите его на телефоне или распечатайте.</p>
        <p style="color: #777; font-size: 13px;">Этот QR-код одноразовый:
        он станет недействительным сразу после сканирования на входе.</p>
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
