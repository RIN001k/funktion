import BuyTicketsButton from "./BuyTicketsButton";
import NumberTicker from "./NumberTicker";
import EventTickerBar from "./EventTickerBar";
import AboutTextCollage from "./AboutTextCollage";
import IndexRule from "./IndexRule";
import DesktopCanvas from "./DesktopCanvas";

const INTRO_PARAGRAPH =
  "the funktion is an independent event collective based in Klagenfurt, Austria. We create events people actually want to go to.";

function NavLinks({ className = "" }: { className?: string }) {
  return (
    <nav className={className}>
      <a href="#top" className="block font-bold text-[31px] leading-[38px] hover:text-[#FF0099] transition-colors">
        HOME ★
      </a>
      <a
        href="#whats-next"
        className="block font-normal text-[31px] leading-[38px] hover:text-[#FF0099] transition-colors"
      >
        WHAT&apos;S NEXT
      </a>
      <a href="#about" className="block font-normal text-[31px] leading-[38px] hover:text-[#FF0099] transition-colors">
        ABOUT
      </a>
      <a
        href="#contact"
        className="block font-normal text-[31px] leading-[38px] hover:text-[#FF0099] transition-colors"
      >
        CONTACT
      </a>
    </nav>
  );
}

export default function HomePage() {
  return (
    <main id="top" className="bg-paper text-ink">
      {/* ============================= MOBILE ============================= */}
      <div className="md:hidden px-5 pt-6 pb-10">
        <div className="flex items-start justify-between mb-24">
          <h1 className="font-helvetica font-normal text-[43px] leading-[49px]">
            THE
            <br />
            FUNKTION
          </h1>
          <BuyTicketsButton />
        </div>

        <nav className="flex flex-col items-center gap-4 font-helvetica font-light text-[38px] leading-[44px] text-center mb-24">
          <a href="#top">HOME ★</a>
          <a href="#whats-next">WHAT&apos;S NEXT</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <p className="text-[12px] leading-[15px] font-normal mb-4">
          Klagenfurt, Austria
          <br />
          Since 2025
        </p>

        <div className="border-t border-line" />
        <EventTickerBar />

        <section id="whats-next" className="pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-[30px] leading-[36px]">
              WHAT&apos;S NEXT <span aria-hidden>↘</span>
            </h2>
            <BuyTicketsButton />
          </div>

          <p className="text-center text-[14px] leading-[17px] font-helvetica font-normal lowercase mb-2 px-4">
            {INTRO_PARAGRAPH}
          </p>
          <p className="text-center mb-6">—</p>

          <div className="space-y-4 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gallery/v2/mobile-1.jpg"
              alt="THE FUNKTION — past night"
              className="w-full aspect-[4/3] object-cover"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gallery/v2/mobile-2.jpg"
              alt="THE FUNKTION — past night"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          <p className="text-center text-[12px] leading-[15px] mb-10">
            SCROLL TO EXPLORE
            <br />
            <span aria-hidden>↓</span>
          </p>
        </section>

        <div className="pt-16">
          <IndexRule noLine />
        </div>

        <section id="about" className="pt-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-bold text-[30px] leading-[36px]">ABOUT</h2>
            <BuyTicketsButton />
          </div>

          <AboutTextCollage />

          <div className="mt-16 mb-8">
            <NumberTicker orientation="horizontal" />
          </div>

          <div className="flex justify-center mb-16">
            <BuyTicketsButton />
          </div>
        </section>

        <section id="contact">
          <h2 className="font-bold text-[43px] leading-[52px] mb-4">
            LET&apos;S MAKE
            <br />
            SOMETHING HAPPEN.
          </h2>
          <p className="text-[21px] leading-[26px] font-medium mb-4">
            Brands, venues, artists or just a good idea — we&apos;re always
            open to something new.
          </p>
          <a
            href="mailto:thefunktion9020@gmail.com"
            className="text-[11px] leading-[13px] font-bold hover:text-[#FF0099] transition-colors"
          >
            [CONTACT]
          </a>
        </section>
      </div>

      {/* ============================= DESKTOP ============================= */}
      <div className="hidden md:block">
        <DesktopCanvas />
      </div>
    </main>
  );
}
