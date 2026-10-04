import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.SITE_URL || "https://thefunktion.at";
const TITLE = "THE FUNKTION — Events in Klagenfurt";
const DESCRIPTION =
  "THE FUNKTION is a student-led event collective in Klagenfurt, creating parties, open airs, workshops and new event formats across the city.";

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
