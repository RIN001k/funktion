export default function EventTickerBar() {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-7 h-7 bg-[#262626] shrink-0" aria-hidden />
      <div className="text-[9px] font-semibold uppercase leading-[1.2]">
        <p>Next Event:</p>
        <p>Talk.Sip.Enjoy</p>
        <p>23.10.2026</p>
        <p>Molly Malone Bar</p>
      </div>
      <div className="text-[9px] font-semibold uppercase leading-[1.2]">
        <p>Presale Available</p>
        <p>Students 5€</p>
        <p>Non-Students 10€</p>
      </div>
    </div>
  );
}
