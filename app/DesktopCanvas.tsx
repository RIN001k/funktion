"use client";

import ScaledCanvas from "./ScaledCanvas";
import { openTicketChooser } from "./TicketChooser";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 3629;

// The canvas is scaled with a CSS transform inside an overflow:hidden box,
// which makes the browser's own "#anchor" jump land on the wrong spot on
// any window narrower than the 1440px design. So the nav scrolls the page
// itself, to the real on-screen position of the target.
function goTo(e: React.MouseEvent, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
}

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
  onClick,
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
  onClick?: (e: React.MouseEvent) => void;
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
    fontVariantNumeric: "tabular-nums",
  };
  if (href) {
    return (
      <a href={href} onClick={onClick} style={{ ...style, display: "block" }}>
        {children}
      </a>
    );
  }
  return <div style={style}>{children}</div>;
}

function TicketButton({ left, top }: { left: number; top: number }) {
  return (
    <button
      onClick={openTicketChooser}
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
      BUY TICKETS ↗
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

export default function DesktopCanvas({ salesOpen = true }: { salesOpen?: boolean }) {
  return (
    <ScaledCanvas width={DESIGN_WIDTH} height={DESIGN_HEIGHT}>
      <div style={{ position: "relative", width: DESIGN_WIDTH, height: DESIGN_HEIGHT, background: "#FFFFFF" }}>
        {/* Scroll targets for the nav links. The mobile layout (hidden on
            desktop) already uses #whats-next / #about / #contact, so these
            have their own ids. They sit inside the scaled canvas, so the
            browser scrolls to the right spot at any window width. */}
        <div id="d-whats-next" style={{ position: "absolute", left: 0, top: 1040, width: 1, height: 1 }} />
        <div id="d-about" style={{ position: "absolute", left: 0, top: 2005, width: 1, height: 1 }} />
        <div id="d-contact" style={{ position: "absolute", left: 0, top: 3070, width: 1, height: 1 }} />

        {/* Wordmark + nav */}
        <T href="#top" left={40} top={230} width={480} weight={700} size={44.8} lh={54}>
          THE FUNKTION
        </T>
        <T href="#top" left={40} top={345} width={340} weight={700} size={31.36} lh={38}>
          HOME ★
        </T>
        <T href="#d-whats-next" onClick={(e) => goTo(e, "d-whats-next")} left={40} top={417} width={340} weight={400} size={31.36} lh={38}>
          WHAT&apos;S NEXT
        </T>
        <T href="#d-about" onClick={(e) => goTo(e, "d-about")} left={40} top={488} width={340} weight={400} size={31.36} lh={38}>
          ABOUT
        </T>
        <T href="#d-contact" onClick={(e) => goTo(e, "d-contact")} left={40} top={560} width={340} weight={400} size={31.36} lh={38}>
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
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 40,
            top: 934,
            width: 72,
            height: 60,
            backgroundImage: "url(/gallery/v4/techno-thumb.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <T left={130} top={930} width={260} weight={600} size={11} lh={13}>
          NEXT EVENT:{"\n"}TECHNO{"\n"}20.11.2026{"\n"}WOHNZIMMER BAR
        </T>
        <T left={470} top={930} width={220} weight={600} size={11} lh={13}>
          {salesOpen
            ? "TICKETS AVAILABLE NOW\nLIMITED CAPACITY\nGET YOURS EARLY"
            : "ONLINE SALES CLOSED\nTICKETS AVAILABLE\nAT THE DOOR"}
        </T>

        {/* WHAT'S NEXT */}
        <T left={40} top={1096} width={450} weight={700} size={44.8} lh={54} tracking="0.04em">
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
          november 20th, 9pm at wohnzimmer bar! our very first techno-only
          funktion together with draussen drinnen! expect bouncy beats and
          groovy rhythms.
        </T>
        <T left={702} top={1320} weight={400} size={18} lh={22} color="#0A0A0A">
          —
        </T>

        {/* Photos — three equal frames side by side */}
        <div
          style={{
            position: "absolute",
            left: 156,
            top: 1430,
            width: 360,
            height: 386,
            backgroundImage: "url(/gallery/v4/techno-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 540,
            top: 1430,
            width: 360,
            height: 386,
            backgroundImage: "url(/gallery/v4/techno-2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 924,
            top: 1430,
            width: 360,
            height: 386,
            backgroundImage: "url(/gallery/v4/techno-3.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <T left={50} top={1952} width={340} weight={400} size={9} lh={11} opacity={0.45}>
          EVENT INDEX — NIGHTS WE REMEMBER
        </T>

        {/* ABOUT */}
        <T left={50} top={2061} width={400} weight={700} size={44.8} lh={54} tracking="0.04em">
          ABOUT
        </T>
        <TicketButton left={1198} top={2051} />

        {/* About — top left */}
        <T
          left={540}
          top={2198}
          width={190}
          font="Helvetica Neue, Helvetica, Arial, sans-serif"
          weight={300}
          size={14}
          lh={17}
          transform="lowercase"
        >
          the funktion is led by two students from the university of klagenfurt
          with one simple idea — to make klagenfurt a little more alive and
          create events people actually want to go to.
        </T>
        {/* About — top right */}
        <T
          left={760}
          top={2230}
          width={190}
          font="Helvetica Neue, Helvetica, Arial, sans-serif"
          weight={300}
          size={14}
          lh={17}
          align="right"
          transform="lowercase"
        >
          this semester, we&apos;re mixing things up — new places, different
          music and all kinds of event formats. from open airs and workshops
          to bar and club nights, we want every funktion to feel a little
          different.
        </T>
        {/* About — bottom left */}
        <T
          left={540}
          top={2410}
          width={190}
          font="Helvetica Neue, Helvetica, Arial, sans-serif"
          weight={300}
          size={14}
          lh={17}
          transform="lowercase"
        >
          we don&apos;t really have a formula. some ideas work, some are a
          little crazy, but we&apos;re always ready to try something new and
          see where it takes us.
        </T>
        {/* About — bottom right */}
        <T
          left={760}
          top={2440}
          width={190}
          font="Helvetica Neue, Helvetica, Arial, sans-serif"
          weight={300}
          size={14}
          lh={17}
          align="right"
          transform="lowercase"
        >
          everything we do is made possible by our student community. every
          ticket, every person who shows up and every friend you bring helps us
          keep creating new events in lovely klagefornia.
        </T>

        <T left={630} top={2733} width={180} align="center" font="Helvetica Neue, Helvetica, Arial, sans-serif" weight={300} size={12} lh={15}>
          SCROLL TO EXPLORE{"\n"}↓
        </T>

        <T left={50} top={2868} width={340} weight={400} size={9} lh={11} opacity={0.45}>
          EVENT INDEX — NIGHTS WE REMEMBER
        </T>

        <TicketButton left={1209} top={2967} />

        {/* CONTACT / CTA */}
        <T left={64} top={3126} width={620} weight={700} size={44.8} lh={54}>
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
