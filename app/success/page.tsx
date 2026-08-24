export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full max-w-md border border-line rounded-sm p-10 bg-paper">
        <p className="uppercase tracking-[0.2em] text-xs text-gold mb-3">
          Оплата прошла
        </p>
        <h1 className="font-display text-3xl mb-4">Билет уже в пути</h1>
        <p className="text-ink/70 leading-relaxed">
          Мы отправили ваш персональный QR-код на указанную почту. Если
          письма нет через пару минут — проверьте папку «Спам».
        </p>
      </div>
    </main>
  );
}
