import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.SITE_URL || "https://thefunktion.at";
const TITLE = "THE FUNKTION — Klagenfurt Event Collective";
const DESCRIPTION =
  "THE FUNKTION is an independent event collective based in Klagenfurt, Austria. We create events people actually want to go to. Get tickets for the next night.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — THE FUNKTION",
  },
  description: DESCRIPTION,
  keywords: [
    "THE FUNKTION",
    "Klagenfurt events",
    "Klagenfurt nightlife",
    "Austria event tickets",
    "open air Klagenfurt",
    "event collective",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "THE FUNKTION",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
