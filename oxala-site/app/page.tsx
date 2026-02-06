import { cookies } from "next/headers";
import Link from "next/link";
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { LANGUAGE_COOKIE, defaultLanguage, isLanguageCode, LanguageCode, translations } from "@/lib/i18n";

async function resolveLanguage(): Promise<LanguageCode> {
  const cookieLang = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return isLanguageCode(cookieLang) ? cookieLang : defaultLanguage;
}

export default async function Home() {
  const language = await resolveLanguage();
  const t = translations[language];

  return (
    <>
      <section className="relative isolate overflow-hidden rounded-[36px] bg-transparent">
        <div className="relative mx-auto max-w-5xl px-4 pt-6 sm:px-6 md:px-10">
          <div className="relative overflow-hidden rounded-[32px] shadow-none">
            <div
              className="aspect-[4/3] w-full bg-cover bg-center brightness-105 saturate-110"
              style={{ backgroundImage: "url('/hero-bg.png')" }}
            />
          </div>
        </div>
      </section>

      <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] pt-6">
        <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/40">
          <div
            className="h-40 w-full bg-cover bg-center grayscale sm:h-48 md:h-56 lg:h-64"
            style={{ backgroundImage: "url('/garrafas.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="font-big-caslon absolute inset-0 mx-auto flex max-w-[16ch] items-center justify-center px-4 text-center text-2xl font-normal leading-tight text-white sm:max-w-[18ch] sm:text-3xl md:max-w-[22ch] md:text-4xl lg:text-5xl">
            {t.home.highlightLine1}
            <br />
            {t.home.highlightLine2}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-start justify-center gap-12 px-6 pb-12 pt-10 text-left sm:px-8 md:max-w-5xl md:px-12 md:pb-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="h-display text-3xl text-[#f0e8d9] sm:text-4xl md:text-5xl">{t.home.heroTitle}</h1>
            <p className="max-w-3xl text-justify text-[0.95rem] leading-relaxed text-white/75 sm:text-base md:text-lg">
              {t.home.heroDescription}
            </p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="space-y-4">
            <h1 className="h-display text-3xl text-[#f0e8d9] sm:text-4xl md:text-5xl">{t.home.visitTitle}</h1>
            <p className="max-w-3xl text-justify text-[0.95rem] leading-relaxed text-white/75 sm:text-base md:text-lg">
              {t.home.visitLine1}, <br />
              {t.home.visitLine2}
            </p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="space-y-4">
            <h1 className="h-display text-3xl text-[#f0e8d9] sm:text-4xl md:text-5xl">{t.home.reservationsTitle}</h1>
            <p className="max-w-3xl text-justify text-[0.95rem] leading-relaxed text-white/75 sm:text-base md:text-lg">
              {t.home.reservationsLine1} <br />
              {t.home.reservationsLine2}
            </p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="space-y-4">
            <h1 className="h-display text-3xl text-[#f0e8d9] sm:text-4xl md:text-5xl">{t.home.socialsTitle}</h1>
            <div className="flex flex-col items-start gap-1.5">
              <Link
                href="https://www.instagram.com/oxalarestaurante/"
                className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-center text-[0.85rem] font-semibold leading-none text-white/85 transition hover:border-brand-gold hover:text-brand-gold sm:text-sm"
              >
                <LuInstagram className="h-4 w-4" aria-hidden />
                {t.home.instagramLabel}
              </Link>
              <Link
                href="https://www.facebook.com/oxalarestaurante"
                className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-center text-[0.85rem] font-semibold leading-none text-white/85 transition hover:border-brand-gold hover:text-brand-gold sm:text-sm"
              >
                <LuFacebook className="h-4 w-4" aria-hidden />
                {t.home.facebookLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
