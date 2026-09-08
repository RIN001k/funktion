export default function IndexRule({ noLine = false }: { noLine?: boolean }) {
  return (
    <div className={noLine ? "pt-3" : "border-t border-line pt-3"}>
      <p className="text-[9px] leading-[11px] text-ink opacity-45">
        EVENT INDEX — NIGHTS WE REMEMBER
      </p>
    </div>
  );
}
