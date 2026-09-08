import BuyTicketsButton from "./BuyTicketsButton";
import NumberTicker from "./NumberTicker";
import EventTickerBar from "./EventTickerBar";
import AboutTextCollage from "./AboutTextCollage";
import IndexRule from "./IndexRule";

const INTRO_PARAGRAPH =
  "the funktion is an independent event collective based in Klagenfurt, Austria. We create events people actually want to go to.";

function NavLinks({ className = "" }: { className?: string }) {
  return (
    <nav className={className}>
      <a href="#top" className="block font-extrabold hover:text-pink transition-colors">
        HOME ★
      </a>
      <a
        href="#whats-next"
        className="block font-extrabold hover:text-pink transition-colors"
      >
        WHAT&apos;S NEXT
      </a>
      <a href="#about" className="block font-extrabold hover:text-pink transition-colors">
        ABOUT
      </a>
      <a
        href="#contact"
        className="block font-extrabold hover:text-pink transition-colors"
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
          <h1 className="font-black text-3xl leading-[0.95]">
            THE
            <br />
            FUNKTION
          </h1>
          <BuyTicketsButton />
        </div>

        <nav className="flex flex-col items-center gap-4 text-2xl mb-24">
          <a href="#top" className="font-extrabold">
            HOME ★
          </a>
          <a href="#whats-next" className="font-extrabold">
            WHAT&apos;S NEXT
          </a>
          <a href="#about" className="font-extrabold">
            ABOUT
          </a>
          <a href="#contact" className="font-extrabold">
            CONTACT
          </a>
        </nav>

        <p className="text-[10px] font-bold uppercase tracking-[0.03em] mb-4">
          Klagenfurt, Austria
          <br />
          Since 2025
        </p>

        <div className="border-t border-line" />
        <EventTickerBar />

        <section id="whats-next" className="pt-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-[26px] leading-[30px]">
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

          <p className="text-center text-[10px] tracking-[0.03em] mb-10">
            SCROLL TO EXPLORE
            <br />
            <span aria-hidden>↓</span>
          </p>
        </section>

        <IndexRule />

        <section id="about" className="pt-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-bold text-[26px] leading-[30px]">ABOUT</h2>
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
          <h2 className="font-black text-3xl leading-[1.05] mb-4">
            LET&apos;S MAKE
            <br />
            SOMETHING HAPPEN.
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Brands, venues, artists or just a good idea — we&apos;re always
            open to something new.
          </p>
          <a
            href="mailto:thefunktion9020@gmail.com"
            className="text-[11px] font-bold tracking-[0.03em] hover:text-pink transition-colors"
          >
            [CONTACT]
          </a>
        </section>
      </div>

      {/* ============================= DESKTOP ============================= */}
      <div className="hidden md:block px-10 lg:px-16 pt-12 pb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-black text-4xl lg:text-5xl mb-8">
              THE FUNKTION
            </h1>
            <NavLinks className="flex flex-col gap-3 text-2xl lg:text-3xl" />
          </div>
          <NumberTicker orientation="vertical" />
        </div>

        <div className="border-t border-line mt-16" />
        <EventTickerBar />

        <section id="whats-next" className="pt-10">
          <div className="flex items-center justify-between mb-14">
            <h2 className="font-bold text-[30px] leading-[36px]">
              WHAT&apos;S NEXT <span aria-hidden>↘</span>
            </h2>
            <BuyTicketsButton />
          </div>

          <p className="text-center text-[14px] leading-[17px] font-helvetica font-normal lowercase max-w-md mx-auto mb-2">
            {INTRO_PARAGRAPH}
          </p>
          <p className="text-center mb-10">—</p>

          <div className="grid grid-cols-3 gap-6 mb-10">
            {["/gallery/v2/desktop-1.jpg", "/gallery/v2/desktop-2.jpg", "/gallery/v2/desktop-1.jpg"].map(
              (src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt="THE FUNKTION — past night"
                  className="w-full aspect-[4/3] object-cover"
                />
              )
            )}
          </div>
        </section>

        <div className="mt-16">
          <IndexRule />
        </div>

        <section id="about" className="pt-16">
          <div className="flex items-center justify-between mb-14">
            <h2 className="font-bold text-[30px] leading-[36px]">ABOUT US</h2>
            <BuyTicketsButton />
          </div>

          <AboutTextCollage />

          <p className="text-center text-[10px] tracking-[0.03em] mt-16">
            SCROLL TO EXPLORE
            <br />
            <span aria-hidden>↓</span>
          </p>
        </section>

        <div className="mt-16">
          <IndexRule />
        </div>

        <div className="flex justify-end mt-10 mb-16">
          <BuyTicketsButton />
        </div>

        <section id="contact" className="mb-20">
          <h2 className="font-black text-5xl lg:text-6xl leading-[1.05] mb-6">
            LET&apos;S MAKE
            <br />
            SOMETHING HAPPEN.
          </h2>
          <p className="text-base leading-relaxed max-w-md mb-3">
            Brands, venues, artists or just a good idea — we&apos;re always
            open to something new.
          </p>
          <a
            href="mailto:thefunktion9020@gmail.com"
            className="text-xs font-bold tracking-[0.03em] hover:text-pink transition-colors"
          >
            [CONTACT]
          </a>
        </section>
      </div>
    </main>
  );
}
