"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuArrowUpRight, LuMenu, LuX } from "react-icons/lu";
import { useLanguage } from "@/contexts/LanguageContext";
import { designCopy } from "@/lib/design-copy";
import LanguageSelector from "@/components/LanguageSelector";
import SeahorseMark from "@/components/SeahorseMark";
import { restaurant } from "@/lib/restaurant";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { language, translations: t } = useLanguage();
  const copy = designCopy[language];
  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/ementa", label: t.nav.menu },
    { href: "/vinhos", label: t.nav.wines },
  ];

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <div className="header-inner site-width">
        <Link
          href="/"
          scroll={pathname !== "/"}
          className="header-brand"
          aria-label={t.home.heroTitle}
          onClick={(event) => {
            setOpen(false);
            if (
              pathname === "/" &&
              !event.metaKey &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey
            ) {
              window.scrollTo({ top: 0, behavior: "instant" });
            }
          }}
        >
          <SeahorseMark />
          <span className="wordmark" aria-hidden="true">
            <span>OXALÁ</span>
            <small>RESTAURANTE · OVAR</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={t.header.menuToggle}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSelector />
          <a href={restaurant.phones[0].href} className="reservation-link">
            {t.home.reservationsTitle}
            <LuArrowUpRight aria-hidden />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-label={open ? copy.closeMenu : t.header.menuToggle}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <LuX aria-hidden /> : <LuMenu aria-hidden />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        hidden={!open}
        aria-label={t.header.menuToggle}
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
            <LuArrowUpRight aria-hidden />
          </Link>
        ))}
        <a href={restaurant.phones[0].href} className="mobile-reservation">
          {t.home.reservationsTitle} · {restaurant.phones[0].label}
        </a>
      </nav>
    </header>
  );
}
