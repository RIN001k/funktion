const NUMBERS = [
  "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14",
  "13", "12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02",
  "01", "26", "27",
];

const CIRCLED = new Set(["21", "04"]);

export default function NumberTicker({
  orientation,
}: {
  orientation: "vertical" | "horizontal";
}) {
  const isVertical = orientation === "vertical";
  return (
    <div
      className={
        isVertical
          ? "flex flex-col items-end gap-1 font-black text-lg select-none"
          : "flex flex-row flex-nowrap gap-x-3 font-black text-base select-none w-max"
      }
    >
      {NUMBERS.map((n) => (
        <span
          key={n}
          className={
            CIRCLED.has(n)
              ? "inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-ink"
              : ""
          }
        >
          {n}
        </span>
      ))}
    </div>
  );
}
