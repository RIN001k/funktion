const NUMBERS = [
  "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14",
  "13", "12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02",
  "01", "26", "27",
];

const CIRCLED = new Set(["21", "04"]);

function NumberItem({ n }: { n: string }) {
  return (
    <span
      className={
        CIRCLED.has(n)
          ? "inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-ink shrink-0"
          : "shrink-0"
      }
    >
      {n}
    </span>
  );
}

export default function NumberTicker({
  orientation,
}: {
  orientation: "vertical" | "horizontal";
}) {
  const isVertical = orientation === "vertical";

  // Two back-to-back copies of the sequence create a seamless infinite
  // loop: the track animates exactly -50% (one full copy's length),
  // then snaps back to 0 with no visible seam.
  const track = (
    <>
      {NUMBERS.map((n, i) => (
        <NumberItem key={`a-${i}`} n={n} />
      ))}
      {NUMBERS.map((n, i) => (
        <NumberItem key={`b-${i}`} n={n} />
      ))}
    </>
  );

  if (isVertical) {
    return (
      <div className="h-[420px] overflow-hidden select-none">
        <div className="flex flex-col items-end gap-1 font-black text-lg animate-marquee-y">
          {track}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden select-none">
      <div className="flex flex-row gap-x-3 font-black text-base w-max animate-marquee-x">
        {track}
      </div>
    </div>
  );
}
