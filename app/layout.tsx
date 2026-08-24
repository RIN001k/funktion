import "./globals.css";
import { EVENT_NAME } from "@/lib/stripe";

export const metadata = {
  title: EVENT_NAME,
  description: `Билеты на ${EVENT_NAME}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
