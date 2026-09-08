import QRCode from "qrcode";
import crypto from "crypto";

// Generates a hard-to-guess token that becomes the ticket's QR content.
export function generateQrToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export async function generateQrPng(token: string): Promise<Buffer> {
  return QRCode.toBuffer(token, {
    width: 600,
    margin: 2,
    color: { dark: "#141312", light: "#F6F3EC" },
  });
}
