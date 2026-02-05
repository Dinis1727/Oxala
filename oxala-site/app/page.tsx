import { cookies } from "next/headers";
import Link from "next/link";
import { LANGUAGE_COOKIE, defaultLanguage, isLanguageCode, LanguageCode, translations } from "@/lib/i18n";

async function resolveLanguage(): Promise<LanguageCode> {
  const cookieLang = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return isLanguageCode(cookieLang) ? cookieLang : defaultLanguage;
}

export default async function Home() {
  const language = await resolveLanguage();
  const t = translations[language];

  return (
    <section className="relative isolate overflow-hidden rounded-[36px] border border-white/8 bg-[#0b0907] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
      <div className="relative mx-auto max-w-5xl px-4 pt-6 sm:px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[32px] shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
          <div
            className="aspect-[4/3] w-full bg-cover bg-center brightness-105 saturate-110"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
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
      </div>
    </section>
  );
}
