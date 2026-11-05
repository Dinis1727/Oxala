"use client";

import Link from "next/link";
import { LuArrowUpRight, LuFacebook, LuInstagram } from "react-icons/lu";
import { useLanguage } from "@/contexts/LanguageContext";
import { restaurant } from "@/lib/restaurant";

export default function Footer() {
  const { translations: t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="site-width footer-main">
        <Link href="/" className="wordmark">
          <span>OXALÁ</span>
          <small>RESTAURANTE · OVAR</small>
        </Link>
        <p>{t.footer.description}</p>
        <div className="footer-socials">
          <a href={restaurant.instagram} target="_blank" rel="noreferrer">
            <LuInstagram aria-hidden />
            Instagram
            <LuArrowUpRight aria-hidden />
          </a>
          <a href={restaurant.facebook} target="_blank" rel="noreferrer">
            <LuFacebook aria-hidden />
            Facebook
            <LuArrowUpRight aria-hidden />
          </a>
        </div>
      </div>
      <div className="site-width footer-bottom">
        <p>
          © {new Date().getFullYear()} Restaurante Oxalá. {t.footer.rights}
        </p>
        <nav aria-label={t.footer.tagline}>
          <Link href="/">{t.nav.home}</Link>
          <Link href="/ementa">{t.nav.menu}</Link>
          <Link href="/vinhos">{t.nav.wines}</Link>
        </nav>
      </div>
    </footer>
  );
}
