import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  LuArrowDown,
  LuArrowUpRight,
  LuMapPin,
  LuPhone,
  LuMail,
  LuInstagram,
} from "react-icons/lu";
import {
  LANGUAGE_COOKIE,
  defaultLanguage,
  isLanguageCode,
  translations,
} from "@/lib/i18n";
import { designCopy } from "@/lib/design-copy";
import { restaurant } from "@/lib/restaurant";

export default async function Home() {
  const cookieLang = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  const language = isLanguageCode(cookieLang) ? cookieLang : defaultLanguage;
  const t = translations[language];
  const copy = designCopy[language];
  return (
    <>
      <section className="home-hero site-width">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            {copy.eyebrow}
          </p>
          <h1>
            {copy.title}
            <em>{copy.titleAccent}</em>
          </h1>
          <p className="hero-description">{copy.menuDescription}</p>
          <div className="hero-actions">
            <Link href="/ementa" className="button button-gold">
              {t.home.ctaMenu}
              <LuArrowUpRight aria-hidden />
            </Link>
            <Link href="/vinhos" className="text-link">
              {t.home.ctaWines}
              <LuArrowUpRight aria-hidden />
            </Link>
          </div>
          <a href="#descobrir" className="discover-link">
            <LuArrowDown aria-hidden />
            {copy.discover}
          </a>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-bg.png"
            alt={t.home.heroTitle}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 54vw"
          />
          <span className="hero-visual-caption">OXALÁ · OVAR</span>
        </div>
      </section>

      <section id="descobrir" className="discovery-section">
        <div className="site-width">
          <div className="section-intro">
            <p className="eyebrow">{t.home.heroTitle}</p>
            <h2>
              {t.home.highlightLine1}
              <em>{t.home.highlightLine2}</em>
            </h2>
            <p>{t.home.heroDescription}</p>
          </div>
          <div className="discovery-links">
            <Link href="/ementa" className="discovery-item">
              <span className="item-number">01</span>
              <div>
                <p className="eyebrow">{t.menu.introTag}</p>
                <h3>{t.nav.menu}</h3>
                <p>{t.menu.introDescription}</p>
              </div>
              <LuArrowUpRight aria-hidden />
            </Link>
            <Link href="/vinhos" className="discovery-item">
              <span className="item-number">02</span>
              <div>
                <p className="eyebrow">{t.vinhos.introTag}</p>
                <h3>{t.nav.wines}</h3>
                <p>{copy.wineDescription}</p>
              </div>
              <LuArrowUpRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="atmosphere-section site-width"
        aria-labelledby="atmosphere-heading"
      >
        <div className="atmosphere-heading">
          <div>
            <p className="eyebrow">{t.home.heroTitle}</p>
            <h2 id="atmosphere-heading">{copy.galleryTitle}</h2>
          </div>
          <a
            href={restaurant.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            <LuInstagram aria-hidden />
            {copy.galleryLink}
            <LuArrowUpRight aria-hidden />
          </a>
        </div>
        <div className="atmosphere-grid">
          {[
            { src: "/images/oxala/cozinha.jpg", caption: t.menu.introTag },
            { src: "/images/oxala/garrafeira.jpg", caption: t.vinhos.introTag },
            {
              src: "/images/oxala/ambiente.jpg",
              caption: copy.galleryAmbience,
            },
          ].map((photo) => (
            <figure key={photo.src}>
              <div className="atmosphere-photo">
                <Image
                  src={photo.src}
                  alt={`${photo.caption} — ${t.home.heroTitle}`}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 30vw, 424px"
                />
              </div>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="cellar-banner">
        <Image src="/garrafas.jpg" alt="" fill sizes="100vw" />
        <div className="site-width cellar-content">
          <p className="eyebrow">{t.vinhos.introTag}</p>
          <h2>{copy.cellarTitle}</h2>
          <p>{copy.cellarDescription}</p>
          <Link href="/vinhos" className="button button-outline">
            {t.home.ctaWines}
            <LuArrowUpRight aria-hidden />
          </Link>
        </div>
      </section>

      <section className="visit-section site-width">
        <div>
          <p className="eyebrow">{t.home.heroTitle}</p>
          <h2>
            {t.home.visitTitle}
            <span className="gold-period">.</span>
          </h2>
        </div>
        <div className="visit-info">
          <LuMapPin aria-hidden />
          <div>
            <p className="eyebrow">OVAR, PORTUGAL</p>
            <p>
              {t.home.visitLine1}
              <br />
              {t.home.visitLine2}
            </p>
            <a
              href={restaurant.directions}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {copy.visitLink}
              <LuArrowUpRight aria-hidden />
            </a>
          </div>
        </div>
        <div className="visit-info">
          <LuPhone aria-hidden />
          <div>
            <p className="eyebrow">{t.home.reservationsTitle}</p>
            {restaurant.phones.map((phone) => (
              <a key={phone.href} href={phone.href}>
                {phone.label}
              </a>
            ))}
          </div>
        </div>
        <div className="visit-info visit-email">
          <LuMail aria-hidden />
          <div>
            <p className="eyebrow">{copy.emailLabel}</p>
            <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
