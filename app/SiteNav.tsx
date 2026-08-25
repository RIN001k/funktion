import Link from "next/link";

// Update these once real handles/links are available.
const INSTAGRAM_URL = "https://www.instagram.com/the.funktion_klg";
const TIKTOK_URL = "https://www.tiktok.com/@the.funktion.klg";

export default function SiteNav() {
  return (
    <>
      {/* Small brand mark — deliberately quiet, top-left */}
      <Link
        href="#top"
        className="fixed top-5 left-5 z-50 block w-8 h-8 opacity-80 hover:opacity-100 transition-opacity"
        aria-label="THE FUNKTION — home"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/dragon-white.png"
          alt=""
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </Link>

      {/* Side nav */}
      <nav className="fixed top-5 right-5 z-50 flex flex-col items-end gap-3 text-right">
        <Link
          href="#tickets"
          className="bg-pink text-ink text-xs uppercase tracking-[0.15em] font-body font-semibold px-4 py-2.5 rounded-full hover:bg-white transition-colors"
        >
          Get Tickets
        </Link>
        <div className="flex flex-col items-end gap-2 text-[11px] uppercase tracking-[0.15em] text-paper/70 font-body">
          <Link href="#about" className="hover:text-pink transition-colors">
            About us
          </Link>
          <Link href="#contact" className="hover:text-pink transition-colors">
            Contact us
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink transition-colors"
          >
            Instagram
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink transition-colors"
          >
            TikTok
          </a>
        </div>
      </nav>
    </>
  );
}
