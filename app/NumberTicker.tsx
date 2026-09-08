// Vertical ticker (desktop hero, right side): the full wraparound
// sequence as shown in the hero mockup.
const VERTICAL_NUMBERS = [
  "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14",
  "13", "12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02",
  "01", "26", "27",
];

// Horizontal ticker (About section): simple ascending sequence, as
// shown in that section's own mockup.
const HORIZONTAL_NUMBERS = [
  "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13",
  "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
];

const CIRCLED = new Set(["21", "04"]);

function NumberItem({ n }: { n: string }) {
  return (
    <span
      className={
        CIRCLED.has(n)
          ? "inline-flex items-center justify-center w-14 h-9 rounded-full border-[1.5px] border-[#0D0D0D] shrink-0"
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
  const numbers = isVertical ? VERTICAL_NUMBERS : HORIZONTAL_NUMBERS;

  // Two back-to-back copies of the sequence create a seamless infinite
  // loop: the track animates exactly -50% (one full copy's length),
  // then snaps back to 0 with no visible seam.
  const track = (
    <>
      {numbers.map((n, i) => (
        <NumberItem key={`a-${i}`} n={n} />
      ))}
      {numbers.map((n, i) => (
        <NumberItem key={`b-${i}`} n={n} />
      ))}
    </>
  );

  if (isVertical) {
    return (
      <div className="h-[420px] overflow-hidden select-none">
        <div className="flex flex-col items-end gap-2 font-bold text-[27px] leading-[33px] animate-marquee-y">
          {track}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden select-none">
      <div className="flex flex-row gap-x-4 font-bold text-[27px] leading-[33px] w-max animate-marquee-x">
        {track}
      </div>
    </div>
  );
}
