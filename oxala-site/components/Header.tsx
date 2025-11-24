"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { translations } = useLanguage();
  const nav = [
    { href: "/", label: translations.nav.home },
    { href: "/ementa", label: translations.nav.menu },
    { href: "/vinhos", label: translations.nav.wines },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0e0b09]/85 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-5xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 pr-4 shadow-[0_12px_26px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-brand-gold/50 hover:bg-white/10"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white/12 to-white/5 p-[3px] shadow-[0_10px_22px_rgba(0,0,0,0.3)] sm:h-11 sm:w-11">
            <div className="absolute inset-0 rounded-full blur-[0.5px]" />
            <Image
              src="/oxala-logo-wb.png"
              alt="Oxalá"
              width={40}
              height={40}
              className="h-full w-full rounded-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="h-display text-base font-semibold tracking-[0.06em] text-brand-gold transition group-hover:text-white sm:text-lg">
              Restaurante Oxalá
            </span>
            <span className="text-[0.55rem] uppercase tracking-[0.28em] text-white/50 sm:text-[0.58rem]">Ovar · Portugal</span>
          </div>
        </Link>

        {/* desktop */}
        <nav className="hidden flex-wrap items-center gap-5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-white/70 md:ml-auto md:flex lg:gap-7 lg:text-[0.82rem]">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={clsx(
                "relative pb-1 transition hover:text-brand-gold",
                pathname === i.href
                  ? "text-brand-gold after:absolute after:-bottom-[2px] after:left-0 after:h-[1px] after:w-full after:bg-brand-gold"
                  : "text-white/65"
              )}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-2">
          <div className="hidden md:block">
            <LanguageSelector size="sm" />
          </div>
          {/* mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-brand-gold/60 hover:text-brand-gold md:hidden"
            aria-label={translations.header.menuToggle}
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={clsx(
                  "block h-0.5 w-full origin-center bg-current transition-transform duration-300 transform",
                  open ? "translate-y-1.5 rotate-45" : ""
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-full bg-current transition-opacity duration-300",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-full origin-center bg-current transition-transform duration-300 transform",
                  open ? "-translate-y-1.5 -rotate-45" : ""
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-white/10 bg-[#0f0c0a]/95 text-white shadow-inner md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 container-px py-4">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "rounded-lg px-2 py-2.5 text-sm font-medium uppercase tracking-[0.18em] transition",
                  pathname === i.href
                    ? "bg-brand-gold/15 text-brand-gold"
                    : "text-white/75 hover:bg-white/5"
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
