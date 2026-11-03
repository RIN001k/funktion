import BuyTicketsButton from "./BuyTicketsButton";
import NumberTicker from "./NumberTicker";
import EventTickerBar from "./EventTickerBar";
import AboutTextCollage from "./AboutTextCollage";
import IndexRule from "./IndexRule";
import DesktopCanvas from "./DesktopCanvas";
import TicketChooser from "./TicketChooser";

const INTRO_PARAGRAPH =
  "friday the 13th at fritz club! it’s our last club funktion of the year, with a night full of your favorite pop hits. dress up as whoever (or whatever) you want and get ready for good music, drinks and dancing all night.";

export default function HomePage() {
  return (
    <main id="top" className="bg-paper text-ink">
      {/* ============================= MOBILE ============================= */}
      <div className="md:hidden px-5 pt-6 pb-10">
        <div className="flex items-start justify-between mb-24">
          <h1 className="font-helvetica font-normal text-[22px] leading-[25px]">
            THE
            <br />
            FUNKTION
          </h1>
          <BuyTicketsButton />
        </div>

        <nav className="flex flex-col items-center gap-2 font-helvetica font-light text-[17px] leading-[20px] text-center mt-[190px] mb-[190px]">
          {/* The star hangs outside the link box so the word HOME itself sits
              on the same centre line as the other menu items. */}
          <a href="#top" className="relative -left-[5px]">
            HOME
            <span aria-hidden className="absolute left-full top-0 ml-1">
              ★
            </span>
          </a>
          <a href="#whats-next">WHAT&apos;S NEXT</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <p className="text-[10px] leading-[13px] font-normal mb-2">
          Klagenfurt, Austria
          <br />
          Since 2025
        </p>

        <div className="border-t border-line" />
        <EventTickerBar />

        <section id="whats-next" className="pt-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-bold text-[16px] leading-[20px] relative top-[2px]">
              WHAT&apos;S NEXT <span aria-hidden>↘</span>
            </h2>
            <BuyTicketsButton />
          </div>

          <p className="text-center text-[11px] leading-[14px] font-helvetica font-normal lowercase mb-2 max-w-[165px] mx-auto">
            {INTRO_PARAGRAPH}
          </p>
          <p className="text-center mb-10">—</p>

          <div className="grid grid-cols-3 gap-1 mb-6">
            {["f13-1", "f13-2", "f13-3"].map((f) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={f}
                src={`/gallery/v3/${f}.jpg`}
                alt="THE FUNKTION — club night"
                className="w-full aspect-[576/618] object-cover"
              />
            ))}
          </div>

          <p className="text-center text-[10px] leading-[13px] mb-10">
            SCROLL TO EXPLORE
            <br />
            <span aria-hidden>↓</span>
          </p>
        </section>

        <div className="pt-24">
          <IndexRule noLine />
        </div>

        <section id="about" className="pt-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-bold text-[16px] leading-[20px] relative top-[2px]">
              ABOUT
            </h2>
            <BuyTicketsButton />
          </div>

          <div className="mt-20">
            <AboutTextCollage />
          </div>

          <div className="mt-36 mb-6">
            <NumberTicker orientation="horizontal" />
          </div>

          <div className="flex justify-end mt-8 mb-32">
            <BuyTicketsButton />
          </div>
        </section>

        <section id="contact" className="min-h-[70vh] flex flex-col justify-center">
          <h2 className="font-bold text-[26px] leading-[31px] mb-4">
            LET&apos;S MAKE
            <br />
            SOMETHING HAPPEN.
          </h2>
          <p className="text-[13px] leading-[17px] font-medium mb-4">
            Brands, venues, artists or just a good idea — we&apos;re always
            open to something new.
          </p>
          <a
            href="mailto:thefunktion9020@gmail.com"
            className="text-[10px] leading-[12px] font-bold hover:text-[#FF0099] transition-colors"
          >
            [CONTACT]
          </a>
        </section>
      </div>

      {/* ============================= DESKTOP ============================= */}
      <div className="hidden md:block">
        <DesktopCanvas />
      </div>

      <TicketChooser />
    </main>
  );
}
