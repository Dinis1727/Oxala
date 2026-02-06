"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0e0b09]/85 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
      <div className="mx-auto flex min-h-[76px] max-w-5xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <Link
          href="/"
          className="group flex flex-col items-start rounded-full bg-transparent px-4 py-2 transition hover:-translate-y-0.5 hover:bg-transparent"
        >
          <span className="font-maison text-lg font-semibold uppercase tracking-[0.32em] text-brand-gold drop-shadow-sm transition group-hover:text-white sm:text-[1.5rem]">
            OXALÁ
          </span>
          <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white/55 sm:text-[0.6rem]">Restaurante</span>
        </Link>

        {/* desktop */}
        <nav className="hidden flex-wrap items-center gap-5 text-[0.8rem] font-light uppercase tracking-[0.2em] text-white/70 md:ml-auto md:flex lg:gap-7 lg:text-[0.82rem]">
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
                  "rounded-lg px-2 py-2.5 text-sm font-light uppercase tracking-[0.18em] transition",
                  pathname === i.href
                    ? "bg-brand-gold/15 text-brand-gold"
                    : "text-white/75 hover:bg-white/5"
                )}
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
