export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full max-w-md border border-line rounded-sm p-10 bg-paper">
        <p className="uppercase tracking-[0.2em] text-xs text-gold mb-3">
          Payment complete
        </p>
        <h1 className="font-display text-3xl mb-4">Your ticket is on its way</h1>
        <p className="text-ink/70 leading-relaxed">
          We&apos;ve sent your personal QR code to the email you provided.
          If it&apos;s not there in a couple of minutes, check your spam
          folder.
        </p>
      </div>
    </main>
  );
}
