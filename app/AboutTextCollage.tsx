const PARAGRAPH =
  "the funktion is an independent event collective based in Klagenfurt, Austria. We create events people actually want to go to.";

export default function AboutTextCollage() {
  return (
    <div className="flex justify-center gap-3 text-[8px] leading-[10px] font-helvetica lowercase text-ink">
      <div className="flex flex-col gap-5 w-[65px] text-left font-normal">
        <p>{PARAGRAPH}</p>
        <p>{PARAGRAPH}</p>
      </div>
      <div className="flex flex-col gap-5 w-[58px] text-right font-normal mt-6">
        <p>{PARAGRAPH}</p>
        <p>{PARAGRAPH}</p>
      </div>
    </div>
  );
}
