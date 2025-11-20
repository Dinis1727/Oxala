"use client";

export default function Hero() {
  return (
    <div className="relative flex justify-center">
      <div className="relative isolate w-full max-w-4xl overflow-hidden rounded-[32px] border border-[#241203]/30 bg-brand-night shadow-[0_25px_70px_rgba(17,9,2,0.45)]">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-110 saturate-125"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/35 to-black/65" />
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        <div className="relative z-10 min-h-[50vh] md:min-h-[56vh] lg:min-h-[60vh]" aria-hidden="true" />
      </div>
    </div>
  );
}
