const PARAGRAPH =
  "the funktion is an independent event collective based in Klagenfurt, Austria. We create events people actually want to go to.";

export default function AboutTextCollage() {
  return (
    <div className="flex justify-center gap-8 text-[11px] leading-relaxed text-ink/80">
      <div className="flex flex-col gap-10 w-[130px] text-right">
        <p>{PARAGRAPH}</p>
        <p>{PARAGRAPH}</p>
      </div>
      <div className="flex flex-col gap-10 w-[130px] text-right mt-10">
        <p>{PARAGRAPH}</p>
        <p>{PARAGRAPH}</p>
      </div>
    </div>
  );
}
