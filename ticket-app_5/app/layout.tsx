import "./globals.css";

export const metadata = {
  title: "THE FUNKTION",
  description: "Tickets for THE FUNKTION",
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
