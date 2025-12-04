import { cookies } from "next/headers";
import Link from "next/link";
import { LANGUAGE_COOKIE, defaultLanguage, isLanguageCode, LanguageCode, translations } from "@/lib/i18n";
import { HeroVideo } from "@/components/HeroVideo";

async function resolveLanguage(): Promise<LanguageCode> {
  const cookieLang = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return isLanguageCode(cookieLang) ? cookieLang : defaultLanguage;
}

export default async function Home() {
  const language = await resolveLanguage();
  const t = translations[language];

  return (
    <section className="relative isolate overflow-hidden rounded-[36px] border border-white/8 bg-[#0b0907] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
      <div className="relative mx-auto max-w-6xl px-4 pt-6 sm:px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[32px] shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
          <HeroVideo
            className="w-full object-cover brightness-105 saturate-110 h-[74vh] sm:h-[80vh] lg:h-[88vh]"
            src="/Garrafeira_escurecida.MP4"
            poster="/hero-bg.png"
            playbackRate={1.6}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/55"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 pb-12 pt-10 text-center sm:px-8 md:max-w-5xl md:px-12 md:pb-16">
        <div className="space-y-5 md:space-y-6">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/55 md:text-xs">Oxalá · Ovar</p>
          <div className="space-y-4">
            <h1 className="h-display text-3xl text-[#f0e8d9] sm:text-4xl md:text-5xl">{t.home.heroTitle}</h1>
            <p className="mx-auto max-w-3xl text-[0.95rem] leading-relaxed text-white/75 sm:text-base md:text-lg">
              {t.home.heroDescription}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href="/ementa"
            className="inline-flex items-center gap-2 rounded-xl border border-[#d8b77a] bg-gradient-to-r from-[#d8b77a] via-[#c8a46b] to-[#b89156] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#2b1d0e] shadow-[0_18px_38px_rgba(200,164,107,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(200,164,107,0.45)] md:px-7 md:py-3.5 md:text-base md:tracking-[0.2em]"
          >
            {t.home.ctaMenu}
          </Link>
          <Link
            href="/vinhos"
            className="inline-flex items-center gap-2 rounded-xl border border-[#ffffff33] bg-[#12100d]/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_16px_36px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-[#d8b77a] hover:bg-[#1a1611] md:px-7 md:py-3.5 md:text-base md:tracking-[0.2em]"
          >
            {t.home.ctaWines}
          </Link>
        </div>
      </div>
    </section>
  );
}
