"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  {
    href: "https://www.instagram.com/restauranteoxalaovar/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/oxalarestaurante",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M14.5 7H16V4.5h-1.5C12.6 4.5 11 6.1 11 8v1.5H9v2.4h2v7.6h2.6v-7.6H16l.5-2.4h-2v-1c0-.6.4-1 1-1Z" />
      </svg>
    ),
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
    <footer className="border-t border-white/10 bg-gradient-to-b from-[#0d0b0a] via-[#0f0c0b] to-[#0c0a09] text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-10 text-sm text-white/70 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[1fr_0.8fr_0.8fr_0.8fr] lg:px-6 xl:px-8">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{t.tagline}</p>
          <p className="h-display text-lg text-white/90">{t.description}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t.visitUs}</p>
          <p className="text-white/80">R. Família Colares Pinto 1695</p>
          <p className="text-white/80">3880-163 Ovar</p>
        </div>

        <div className="space-y-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t.reservations}</p>
          <p className="text-white/80">256 591 371</p>
          <p className="text-white/80">962 076 410</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t.socials}</p>
          <div className="flex w-full max-w-[130px] flex-col gap-1.5 sm:max-w-[120px]">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.25 text-[0.85rem] font-semibold text-white/85 transition hover:border-brand-gold hover:text-brand-gold sm:text-sm"
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
