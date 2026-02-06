"use client";
import Link from "next/link";
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  {
    href: "https://www.instagram.com/restauranteoxalaovar/",
    label: "@restauranteoxalaovar",
    icon: <LuInstagram className="h-4 w-4" aria-hidden />,
  },
  {
    href: "https://www.facebook.com/oxalarestaurante",
    label: "@oxalarestaurante",
    icon: <LuFacebook className="h-4 w-4" aria-hidden />,
  },
];

export default function Footer() {
  const { translations } = useLanguage();
  const quickLinks = [
    { href: "/", label: translations.nav.home },
    { href: "/ementa", label: translations.nav.menu },
    { href: "/vinhos", label: translations.nav.wines },
  ];
  const t = translations.footer;

  return (
    <footer className="font-maison font-light border-t border-white/10 bg-gradient-to-b from-[#0d0b0a] via-[#0f0c0b] to-[#0c0a09] text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-10 text-sm text-white/70 sm:grid-cols-2 md:grid-cols-[1fr_0.9fr_0.6fr_0.9fr] lg:grid-cols-[1fr_0.9fr_0.6fr_0.9fr] lg:px-6 xl:px-8">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{t.tagline}</p>
          <p className="h-display text-lg text-white/90">{t.description}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t.visitUs}</p>
          <p className="text-white/80">R. Família Colares Pinto 1695</p>
          <p className="text-white/80">3880-163 Ovar</p>
        </div>

        <div className="w-fit space-y-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t.reservations}</p>
          <p className="text-white/80">256 591 371</p>
          <p className="text-white/80">962 076 410</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t.socials}</p>
          <div className="flex flex-col items-start gap-1.5">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-center text-[0.85rem] font-semibold leading-none text-white/85 transition hover:border-brand-gold hover:text-brand-gold sm:text-sm"
              >
                {social.icon}
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Restaurante Oxalá. {t.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-brand-gold">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
