"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import MenuCard from "@/components/MenuCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Categoria } from "@/types/menu";

const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function MenuContent({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const { translations } = useLanguage();
  const t = translations.menu;
  const categories = useMemo(
    () =>
      categorias
        .filter(
          (cat) =>
            (cat.pratosSemSubcategoria || []).length ||
            (cat.subcategorias || []).some((sub) => sub.pratos?.length),
        )
        .map((cat) => ({
          ...cat,
          anchor: cat.slugBase || slugify(cat.nome) || cat._id,
        })),
    [categorias],
  );
  const [active, setActive] = useState("");
  const menuRef = useRef<HTMLElement>(null);
  const categoryNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = categoryNavRef.current;
    const menu = menuRef.current;
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!nav || !menu) return;

    const sections = categories.flatMap((cat) => {
      const element = document.getElementById(cat.anchor);
      if (!element) return [];
      const dishes = element.querySelectorAll<HTMLElement>(".menu-dish");
      const lastDish = dishes.item(dishes.length - 1);
      const contentEnd = lastDish
        ? Array.from(
            lastDish.querySelectorAll<HTMLElement>(
              ".dish-content, .dish-image",
            ),
          )
        : [element];
      return [{ anchor: cat.anchor, element, contentEnd }];
    });
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingTop = Math.max(
        header?.getBoundingClientRect().bottom ?? 0,
        nav.getBoundingClientRect().bottom,
      );
      let current = sections[0]?.anchor || "";
      for (const section of sections) {
        const top = section.element.getBoundingClientRect().top;
        const bottom = Math.max(
          ...section.contentEnd.map(
            (content) => content.getBoundingClientRect().bottom,
          ),
        );
        if (top <= readingTop) current = section.anchor;
        // Follow the first category with readable content below the fixed bars.
        // Ignore the spacing and borders after its last dish.
        if (bottom > readingTop && top < window.innerHeight) {
          current = section.anchor;
          break;
        }
      }
      setActive(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      const offset =
        (header?.getBoundingClientRect().height ?? 0) +
        nav.getBoundingClientRect().height +
        20;
      menu.style.setProperty("--menu-scroll-offset", `${offset}px`);
      scheduleUpdate();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    observer.observe(menu);
    if (header) observer.observe(header);
    measure();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
    };
  }, [categories]);

  useEffect(() => {
    const revealActiveCategory = () => {
      const scroller = categoryNavRef.current?.querySelector("div");
      const link = scroller?.querySelector<HTMLElement>(
        '[aria-current="location"]',
      );
      if (!scroller || !link) return;
      const bounds = scroller.getBoundingClientRect();
      const item = link.getBoundingClientRect();
      if (item.left < bounds.left || item.right > bounds.right) {
        scroller.scrollTo({
          left:
            scroller.scrollLeft +
            item.left -
            bounds.left -
            (scroller.clientWidth - item.width) / 2,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      }
    };
    revealActiveCategory();
    window.addEventListener("resize", revealActiveCategory);
    return () => window.removeEventListener("resize", revealActiveCategory);
  }, [active]);

  return (
    <section ref={menuRef} id="ementa" className="catalog-shell site-width">
      <div className="catalog-intro">
        <p className="eyebrow">{t.introTag}</p>
        <h1>
          {translations.nav.menu}
          <span className="gold-period">.</span>
        </h1>
        <p>{t.introDescription}</p>
      </div>
      <div className="menu-layout">
        <nav
          ref={categoryNavRef}
          className="category-nav"
          aria-label={t.categoryLabel}
        >
          <div>
            {categories.map((cat) => (
              <a
                key={cat._id}
                href={`#${cat.anchor}`}
                aria-current={active === cat.anchor ? "location" : undefined}
              >
                {cat.nome}
              </a>
            ))}
          </div>
        </nav>
        <div className="menu-sections">
          {categories.map((cat) => {
            const canonical = cat.slugBase || slugify(cat.nome);
            const note =
              canonical === "peixe"
                ? t.fishNote
                : canonical === "carne"
                  ? t.meatNote
                  : null;
            return (
              <section key={cat._id} id={cat.anchor} className="menu-category">
                <h2>{cat.nome}</h2>
                {note && <p className="category-note">{note}</p>}
                <div className="dish-list">
                  {(cat.pratosSemSubcategoria || []).map((dish) => (
                    <MenuCard key={dish._id} {...dish} />
                  ))}
                </div>
                {(cat.subcategorias || [])
                  .filter((sub) => sub.pratos?.length)
                  .map((sub) => (
                    <div key={sub._id} className="menu-subcategory">
                      <h3>{sub.nome}</h3>
                      <div className="dish-list">
                        {sub.pratos.map((dish) => (
                          <MenuCard key={dish._id} {...dish} headingLevel={4} />
                        ))}
                      </div>
                    </div>
                  ))}
              </section>
            );
          })}
          <Link href="/vinhos" className="menu-wine-link">
            <span>{t.winesButton}</span>
            <LuArrowUpRight aria-hidden />
          </Link>
          <div className="menu-legal">
            <p>{t.taxLine1}</p>
            <p>{t.taxLine2}</p>
            <p>{t.taxLaw}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
