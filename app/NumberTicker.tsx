// Vertical ticker (desktop hero, right side): the full wraparound
// sequence as shown in the hero mockup.
const VERTICAL_NUMBERS = [
  "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14",
  "13", "12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02",
  "01", "26", "27",
];

// Horizontal ticker (mobile, About section): simple ascending sequence,
// with each number rotated sideways, as shown in that section's mockup.
const HORIZONTAL_NUMBERS = [
  "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13",
  "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
];

const CIRCLED = new Set(["21", "04"]);

function NumberItem({ n, rotated }: { n: string; rotated?: boolean }) {
  const circled = CIRCLED.has(n);
  const badgeSize = rotated
    ? "w-6 h-4 rounded-full border border-[#0D0D0D]"
    : "w-14 h-9 rounded-full border-[1.5px] border-[#0D0D0D]";
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${
        rotated ? "rotate-90" : ""
      } ${circled ? badgeSize : ""}`}
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

  if (isVertical) {
    return (
      <div className="flex flex-col items-end gap-2 font-bold text-[27px] leading-[33px] select-none">
        {VERTICAL_NUMBERS.map((n, i) => (
          <NumberItem key={i} n={n} />
        ))}
      </div>
    );
  }

  // Horizontal (mobile): a small, static single row — every number
  // fits on screen at once, no scrolling or animation.
  return (
    <div className="w-full flex flex-row items-center justify-between font-bold text-[11px] leading-[13px] select-none">
      {HORIZONTAL_NUMBERS.map((n, i) => (
        <NumberItem key={i} n={n} rotated />
      ))}
    </div>
  );
}
