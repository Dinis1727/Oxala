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
    <section className="relative isolate overflow-hidden rounded-[36px] border border-[#e4c28b]/70 bg-brand-night shadow-[0_30px_80px_rgba(20,15,10,0.35)]">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-110 saturate-125"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/70" />
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-end px-6 pb-14 pt-16 text-center sm:px-10 md:px-12">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/ementa"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3.5 text-base font-semibold uppercase tracking-[0.2em] text-brand-night shadow-[0_15px_40px_rgba(222,182,117,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(222,182,117,0.5)]"
          >
            {t.home.ctaMenu}
          </Link>
          <Link
            href="/vinhos"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-6 py-3.5 text-base font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-gold/70 hover:bg-brand-gold/10"
          >
            {t.home.ctaWines}
          </Link>
        </div>
      </div>
    </section>
  );
}
