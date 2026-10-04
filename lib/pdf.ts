import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

// pdf-lib's built-in StandardFonts (Helvetica etc.) only support the
// WinAnsi charset — they throw on Cyrillic, and on quite a few accented
// Latin letters too. DejaVu Sans has broad Unicode coverage (Cyrillic,
// Greek, most of Latin Extended), so ticket holder names in any of those
// scripts render instead of crashing the whole checkout webhook.
const FONT_REGULAR_PATH = path.join(process.cwd(), "lib", "fonts", "DejaVuSans.ttf");
const FONT_BOLD_PATH = path.join(
  process.cwd(),
  "lib",
  "fonts",
  "DejaVuSans-Bold.ttf"
);

// THE FUNKTION brand colors (kept in sync with tailwind.config.js).
const INK = rgb(10 / 255, 10 / 255, 10 / 255); // #0A0A0A
const PAPER = rgb(1, 1, 1); // #FFFFFF
const PINK = rgb(254 / 255, 1 / 255, 135 / 255); // #FE0187
const GREY = rgb(0.55, 0.55, 0.55);

// Renders the ticket as a single-page, boarding-pass-style PDF: black
// background, pink accent, white QR card — matches the site's editorial
// black/white/pink look. This is what gets emailed as the ticket.
export async function generateTicketPdf(params: {
  qrPng: Buffer;
  name: string;
  eventName: string;
  eventDate: string;
  qrToken: string;
  ticketType?: "presale" | "student" | "regular";
}): Promise<Buffer> {
  const { qrPng, name, eventName, eventDate, qrToken } = params;
  const isStudent = params.ticketType === "student";

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const width = 400;
  const height = 700;
  const page = doc.addPage([width, height]);

  const helvetica = await doc.embedFont(fs.readFileSync(FONT_REGULAR_PATH), {
    subset: true,
  });
  const helveticaBold = await doc.embedFont(fs.readFileSync(FONT_BOLD_PATH), {
    subset: true,
  });

  const centerText = (
    text: string,
    y: number,
    size: number,
    font: typeof helvetica,
    color = PAPER
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - textWidth) / 2, y, size, font, color });
  };

  // Background
  page.drawRectangle({ x: 0, y: 0, width, height, color: INK });

  // Pink top accent bar
  page.drawRectangle({ x: 0, y: height - 6, width, height: 6, color: PINK });

  // Wordmark
  centerText("THE FUNKTION", height - 62, 26, helveticaBold);
  page.drawRectangle({
    x: width / 2 - 22,
    y: height - 76,
    width: 44,
    height: 3,
    color: PINK,
  });

  // Event info
  centerText(eventName.toUpperCase(), height - 108, 13, helveticaBold, PINK);
  centerText(eventDate, height - 128, 11, helvetica, GREY);

  // Ticket holder
  centerText("TICKET HOLDER", height - 168, 9, helveticaBold, PINK);
  centerText(name, height - 188, 14, helvetica, PAPER);

  // Ticket type badge — STUDENT gets a pink pill so door staff spot it
  // immediately and know to ask for a student ID.
  const typeText = isStudent
    ? "STUDENT TICKET"
    : params.ticketType === "presale"
    ? "PRESALE TICKET"
    : "STANDARD TICKET";
  const typeSize = 10;
  const typeWidth = helveticaBold.widthOfTextAtSize(typeText, typeSize);
  const badgeY = height - 228;
  if (isStudent) {
    page.drawRectangle({
      x: (width - typeWidth) / 2 - 10,
      y: badgeY - 6,
      width: typeWidth + 20,
      height: 22,
      color: PINK,
    });
    centerText(typeText, badgeY, typeSize, helveticaBold, INK);
  } else {
    centerText(typeText, badgeY, typeSize, helveticaBold, GREY);
  }

  // QR card
  const qrImage = await doc.embedPng(qrPng);
  const qrSize = 240;
  const cardPad = 20;
  const qrX = (width - qrSize) / 2;
  const qrY = 190;
  page.drawRectangle({
    x: qrX - cardPad,
    y: qrY - cardPad,
    width: qrSize + cardPad * 2,
    height: qrSize + cardPad * 2,
    color: PAPER,
  });
  page.drawImage(qrImage, { x: qrX, y: qrY, width: qrSize, height: qrSize });

  // Short reference code below the QR
  const ref = qrToken.slice(0, 8).toUpperCase();
  centerText(`REF ${ref}`, qrY - 34, 9, helvetica, GREY);

  // Footer
  page.drawLine({
    start: { x: 32, y: 86 },
    end: { x: width - 32, y: 86 },
    thickness: 0.5,
    color: rgb(0.25, 0.25, 0.25),
  });
  centerText(
    "Present this QR code at the entrance.",
    isStudent ? 66 : 60,
    9,
    helvetica,
    GREY
  );
  if (isStudent) {
    centerText(
      "Valid student ID required at the entrance.",
      52,
      9,
      helveticaBold,
      PAPER
    );
  }
  centerText("thefunktion.at", 30, 10, helveticaBold, PINK);

  const bytes = await doc.save();
  return Buffer.from(bytes);
}
