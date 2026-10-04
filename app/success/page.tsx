export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[#FBFBFA] text-center">
      <div className="w-full max-w-md text-ink">
        <p className="uppercase tracking-[0.2em] text-xs text-pink mb-5">
          Payment complete
        </p>
        <h1 className="font-display text-4xl leading-[1.05] mb-7">
          Your ticket is on
          <br />
          its way
        </h1>
        <p className="text-ink/70 text-[15px] leading-relaxed max-w-[340px] mx-auto">
          We&apos;ve sent your personal QR code to the email you provided.
          If it&apos;s not there in a couple of minutes, check your spam
          folder.
        </p>
      </div>
    </main>
  );
}
