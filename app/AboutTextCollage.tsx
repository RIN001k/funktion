const PARAGRAPH =
  "the funktion is an independent event collective based in Klagenfurt, Austria. We create events people actually want to go to.";

export default function AboutTextCollage() {
  return (
    <div className="flex justify-center gap-6 text-[9px] leading-[1.6] font-helvetica lowercase text-ink/70">
      <div className="flex flex-col gap-8 w-[110px] text-right">
        <p>{PARAGRAPH}</p>
        <p>{PARAGRAPH}</p>
      </div>
      <div className="flex flex-col gap-8 w-[110px] text-right mt-8">
        <p>{PARAGRAPH}</p>
        <p>{PARAGRAPH}</p>
      </div>
    </div>
  );
}
