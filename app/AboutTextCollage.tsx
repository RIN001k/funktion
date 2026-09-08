const PARAGRAPH =
  "the funktion is an independent event collective based in Klagenfurt, Austria. We create events people actually want to go to.";

export default function AboutTextCollage() {
  return (
    <div className="flex justify-center gap-6 text-[14px] leading-[17px] font-helvetica lowercase text-ink">
      <div className="flex flex-col gap-8 w-[100px] text-left font-normal">
        <p>{PARAGRAPH}</p>
        <p>{PARAGRAPH}</p>
      </div>
      <div className="flex flex-col gap-8 w-[90px] text-right font-normal mt-10">
        <p>{PARAGRAPH}</p>
        <p>{PARAGRAPH}</p>
      </div>
    </div>
  );
}
