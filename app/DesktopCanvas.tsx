"use client";

import { useState } from "react";
import ScaledCanvas from "./ScaledCanvas";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 3629;

function T({
  left,
  top,
  width,
  font = "Inter, -apple-system, Segoe UI, sans-serif",
  weight,
  size,
  lh,
  color = "#000",
  align,
  transform,
  tracking,
  opacity,
  href,
  children,
}: {
  left: number;
  top: number;
  width?: number;
  font?: string;
  weight: number;
  size: number;
  lh: number;
  color?: string;
  align?: string;
  transform?: string;
  tracking?: string;
  opacity?: number;
  href?: string;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    position: "absolute",
    left,
    top,
    width,
    fontFamily: font,
    fontWeight: weight,
    fontSize: size,
    lineHeight: `${lh}px`,
    color,
    textAlign: align as any,
    textTransform: transform as any,
    letterSpacing: tracking,
    opacity,
    whiteSpace: "pre-line",
  };
  if (href) {
    return (
      <a href={href} style={{ ...style, display: "block" }}>
        {children}
      </a>
    );
  }
  return <div style={style}>{children}</div>;
}

function TicketButton({ left, top }: { left: number; top: number }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Failed");
      window.location.href = data.url;
    } catch {
      setLoading(false);
      alert("Could not start checkout. Please try again.");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        position: "absolute",
        left,
        top,
        width: 190,
        height: 42,
        background: "#FF0099",
        border: "1px solid #141414",
        boxSizing: "border-box",
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: 11,
        lineHeight: "13px",
        color: "#000",
        cursor: "pointer",
      }}
    >
      {loading ? "One sec…" : "BUY TICKETS ↗"}
    </button>
  );
}

const VERTICAL_NUMBERS: [string, number][] = [
  ["25", -4], ["24", 34], ["23", 72], ["22", 110], ["21", 148], ["20", 186],
  ["19", 224], ["18", 262], ["17", 300], ["16", 338], ["15", 376], ["14", 414],
  ["13", 452], ["12", 490], ["11", 528], ["10", 566], ["09", 604], ["08", 642],
  ["07", 680], ["06", 718], ["05", 756], ["04", 794], ["03", 832], ["02", 870],
  ["01", 915], ["26", 956], ["27", 992],
];

export default function DesktopCanvas() {
  return (
    <ScaledCanvas width={DESIGN_WIDTH} height={DESIGN_HEIGHT}>
      <div style={{ position: "relative", width: DESIGN_WIDTH, height: DESIGN_HEIGHT, background: "#FFFFFF" }}>
        {/* Wordmark + nav */}
        <T href="#top" left={40} top={230} width={394} weight={700} size={44.8} lh={54}>
          THE FUNKTION
        </T>
        <T href="#top" left={40} top={345} width={284} weight={700} size={31.36} lh={38}>
          HOME ★
        </T>
        <T href="#whats-next" left={40} top={417} width={284} weight={400} size={31.36} lh={38}>
          WHAT&apos;S NEXT
        </T>
        <T href="#about" left={40} top={488} width={284} weight={400} size={31.36} lh={38}>
          ABOUT
        </T>
        <T href="#contact" left={40} top={560} width={284} weight={400} size={31.36} lh={38}>
          CONTACT
        </T>

        {/* Vertical number ticker */}
        {VERTICAL_NUMBERS.map(([n, top]) => (
          <T key={n} left={1313} top={top} width={55} weight={700} size={27} lh={33} color="#0A0A0A">
            {n}
          </T>
        ))}
        <div
          style={{
            position: "absolute",
            left: 1300,
            top: 144,
            width: 70,
            height: 38,
            border: "1.5px solid #0D0D0D",
            borderRadius: 999,
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 1300,
            top: 790,
            width: 70,
            height: 38,
            border: "1.5px solid #0D0D0D",
            borderRadius: 999,
            boxSizing: "border-box",
          }}
        />

        {/* Divider + ticker bar — the one and only line */}
        <div style={{ position: "absolute", left: 0, top: 910, width: 1440, height: 1, background: "#1F1F1F" }} />
        <div style={{ position: "absolute", left: 40, top: 934, width: 72, height: 60, background: "#262626" }} />
        <T left={130} top={930} width={260} weight={600} size={11} lh={13}>
          NEXT EVENT{"\n"}OPEN AIR + WORKSHOP{"\n"}03.07.2026{"\n"}KLAGENFURT
        </T>
        <T left={470} top={930} width={220} weight={600} size={11} lh={13}>
          SOLD OUT{"\n"}PIZZA WORKSHOP{"\n"}EARLY BIRD TICKETS
        </T>

        {/* WHAT'S NEXT */}
        <T left={40} top={1096} width={350} weight={700} size={44.8} lh={54} tracking="0.04em">
          WHAT&apos;S NEXT ↘
        </T>
        <TicketButton left={1180} top={1096} />
        <T
          left={1440 / 2 - 382 / 2 - 9}
          top={1250}
          width={382}
          font="Helvetica Neue, Helvetica, Arial, sans-serif"
          weight={400}
          size={14}
          lh={17}
          align="center"
          transform="lowercase"
        >
          the funktion is an independent event collective based in klagenfurt,
          austria. we create events people actually want to go to.
        </T>
        <T left={702} top={1337} weight={400} size={18} lh={22} color="#0A0A0A">
          —
        </T>

        {/* Photos */}
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 1430,
            width: 365,
            height: 230,
            backgroundImage: "url(/gallery/v2/desktop-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scaleX(-1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 551,
            top: 1430,
            width: 341,
            height: 232,
            backgroundImage: "url(/gallery/v2/desktop-2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 978,
            top: 1432,
            width: 365,
            height: 230,
            backgroundImage: "url(/gallery/v2/desktop-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scaleX(-1)",
          }}
        />

        <T left={50} top={1952} width={340} weight={400} size={9} lh={11} opacity={0.45}>
          EVENT INDEX — NIGHTS WE REMEMBER
        </T>

        {/* ABOUT US */}
        <T left={50} top={2061} width={314} weight={700} size={44.8} lh={54} tracking="0.04em">
          ABOUT US
        </T>
        <TicketButton left={1198} top={2051} />

        <T
          left={1440 / 2 - 107 / 2 - 75.5}
          top={2198}
          width={107}
          font="Helvetica Neue, Helvetica, Arial, sans-serif"
          weight={300}
          size={14}
          lh={17}
          transform="lowercase"
        >
          the funktion is an independent event collective based in klagenfurt,
          austria. we create events people actually want to go to.
        </T>
        <T
          left={1440 / 2 - 90 / 2 + 67}
          top={2229}
          width={90}
          font="Helvetica Neue, Helvetica, Arial, sans-serif"
          weight={300}
          size={14}
          lh={17}
          align="right"
          transform="lowercase"
        >
          the funktion is an independent event collective based in klagenfurt,
          austria. we create events people actually want to go to.
        </T>
        <T
          left={1440 / 2 - 100 / 2 - 77}
          top={2387}
          width={100}
          font="Helvetica Neue, Helvetica, Arial, sans-serif"
          weight={300}
          size={14}
          lh={17}
          transform="lowercase"
        >
          the funktion is an independent event collective based in klagenfurt,
          austria. we create events people actually want to go to.
        </T>

        <T left={660} top={2733} width={121} font="Helvetica Neue, Helvetica, Arial, sans-serif" weight={300} size={12} lh={15}>
          SCROLL TO EXPLORE ↓
        </T>

        <T left={50} top={2868} width={340} weight={400} size={9} lh={11} opacity={0.45}>
          EVENT INDEX — NIGHTS WE REMEMBER
        </T>

        <TicketButton left={1209} top={2967} />

        {/* CONTACT / CTA */}
        <T left={64} top={3126} width={485} weight={700} size={44.8} lh={54}>
          LET&apos;S MAKE{"\n"}SOMETHING HAPPEN.
        </T>
        <T left={64} top={3250} width={457} weight={500} size={21.41} lh={26}>
          Brands, venues, artists or just a good idea — we&apos;re always
          open to something new.
        </T>
        <T href="mailto:thefunktion9020@gmail.com" left={64} top={3331} weight={700} size={11} lh={13}>
          [CONTACT]
        </T>
      </div>
    </ScaledCanvas>
  );
}
