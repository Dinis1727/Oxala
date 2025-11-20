"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { translations } = useLanguage();
  const nav = [
    { href: "/", label: translations.nav.menu },
    { href: "/vinhos", label: translations.nav.wines },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#ddb57b]/70 bg-gradient-to-b from-[#fff6e5]/90 via-[#f1cf9c]/88 to-[#d79d52]/82 shadow-[0_12px_40px_rgba(158,104,39,0.35)] backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 container-px">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
          <img
            src="/oxala-logo.png"
            alt="Oxalá"
            className="h-10 w-10 rounded-full border-2 border-brand-gold/80 object-cover shadow-soft"
          />
          <div className="flex flex-col leading-tight">
            <span className="h-display text-xl tracking-wide text-brand-gold">Restaurante Oxalá</span>
          </div>
        </Link>

        {/* desktop */}
        <nav className="hidden items-center gap-7 text-sm font-semibold text-brand-ink/80 md:ml-auto md:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={clsx(
                "relative transition hover:text-brand-gold",
                pathname === i.href
                  ? "text-brand-gold after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-brand-gold"
                  : "text-brand-ink/75"
              )}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSelector size="sm" />
          </div>
          {/* mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e0bb83]/80 bg-white/80 text-brand-ink transition md:hidden"
            aria-label={translations.header.menuToggle}
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={clsx(
                  "block h-0.5 w-full origin-center bg-brand-ink transition-transform duration-300 transform",
                  open ? "translate-y-1.5 rotate-45" : ""
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-full bg-brand-ink transition-opacity duration-300",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-full origin-center bg-brand-ink transition-transform duration-300 transform",
                  open ? "-translate-y-1.5 -rotate-45" : ""
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-[#edc999]/60 bg-white/95 text-brand-ink shadow-inner md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 container-px py-4">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "rounded-lg px-2 py-2.5 text-sm font-medium transition",
                  pathname === i.href
                    ? "bg-brand-gold/20 text-brand-gold"
                    : "text-brand-ink/80 hover:bg-brand-shell"
                )}
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <div className="container-px pb-4">
            <LanguageSelector direction="column" size="sm" />
          </div>
        </div>
      )}
    </header>
  );
}
