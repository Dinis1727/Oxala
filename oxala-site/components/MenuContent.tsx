"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LuArrowUpRight, LuChevronUp } from "react-icons/lu";
import MenuCard from "@/components/MenuCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Categoria } from "@/types/menu";

type Props = {
  categorias: Categoria[];
};

export default function MenuContent({ categorias }: Props) {
  const { translations } = useLanguage();
  const t = translations.menu;
  const categoryNavRef = useRef<HTMLDivElement | null>(null);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

  const filteredCategorias = useMemo(
    () =>
      categorias.filter((categoria) => {
        const subcategorias = (categoria.subcategorias || []).filter((sub) => (sub.pratos || []).length > 0);
        const pratosSoltos = categoria.pratosSemSubcategoria || [];
        return subcategorias.length > 0 || pratosSoltos.length > 0;
      }),
    [categorias]
  );

  const slugify = useCallback((text?: string) => {
    if (!text) return "";
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }, []);

  const categoriesWithId = useMemo(
    () =>
      filteredCategorias.map((categoria) => {
        const id = categoria.slugBase || slugify(categoria.nome) || categoria._id;
        return { ...categoria, _anchorId: id };
      }),
    [filteredCategorias, slugify]
  );

  const firstAnchorId = categoriesWithId[0]?._anchorId || null;
  const [activeCategory, setActiveCategory] = useState<string | null>(firstAnchorId);
  const [showTop, setShowTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeCategoryRef = useRef<string | null>(firstAnchorId);

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateActiveCategory = () => {
      ticking = false;
      if (!categoriesWithId.length) return;

      const focusLine = window.innerHeight * 0.32;
      let bestId: string | null = categoriesWithId[0]?._anchorId || null;
      let bestDistance = Number.POSITIVE_INFINITY;

      categoriesWithId.forEach(({ _anchorId }) => {
        const el = document.getElementById(_anchorId);
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (rect.bottom <= 56 || rect.top >= window.innerHeight * 0.9) {
          return;
        }

        const distance = Math.abs(rect.top - focusLine);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = _anchorId;
        }
      });

      if (bestId && bestId !== activeCategoryRef.current) {
        activeCategoryRef.current = bestId;
        setActiveCategory(bestId);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveCategory);
    };

    updateActiveCategory();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [categoriesWithId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!categoriesWithId.length) return;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 12;
      if (nearBottom) {
        const lastId = categoriesWithId[categoriesWithId.length - 1]._anchorId;
        if (lastId !== activeCategoryRef.current) {
          activeCategoryRef.current = lastId;
          setActiveCategory(lastId);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categoriesWithId]);

  useEffect(() => {
    const top = topSentinelRef.current;
    const bottom = bottomSentinelRef.current;
    if (!top || !bottom) return;

    let topVisible = true;
    let bottomVisible = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === top) topVisible = entry.isIntersecting;
          if (entry.target === bottom) bottomVisible = entry.isIntersecting;
        });
        setShowTop(!topVisible && !bottomVisible);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(top);
    observer.observe(bottom);
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="ementa"
      className="relative rounded-[36px] border border-white/12 bg-gradient-to-br from-[#f5f0e7]/95 via-[#f7f2e9]/92 to-[#eee4d3]/90 px-5 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:px-8 md:px-12 md:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.5em] text-brand-smoke">{t.introTag}</p>
        <h2 className="mt-3 h-display text-3xl text-brand-ink sm:text-4xl">{t.introTitle}</h2>
        <p className="mt-4 text-base text-brand-ink/75">{t.introDescription}</p>
      </div>

      <div className="mt-12 flex flex-col gap-6">
        <div ref={topSentinelRef} aria-hidden className="h-px w-full" />
        <div ref={categoryNavRef} className="lg:hidden">
          <div className="flex items-center justify-between">
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-brand-smoke">{t.categoryLabel}</p>
          </div>
          <div className="mt-3 grid w-full grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-3">
            {categoriesWithId.map((cat) => (
              <button
                key={cat._anchorId}
                className={`w-full whitespace-nowrap rounded-full border px-5 py-2.5 text-center text-sm font-semibold shadow-[0_10px_22px_rgba(0,0,0,0.08)] transition ${
                  activeCategory === cat._anchorId
                    ? "border-brand-gold/70 bg-brand-gold/15 text-brand-ink"
                    : "border-brand-line/70 bg-white/90 text-brand-ink/80"
                }`}
                onClick={() => {
                  setActiveCategory(cat._anchorId);
                  scrollToId(cat._anchorId);
                }}
              >
                {cat.nome}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="hidden w-full shrink-0 lg:block lg:w-64">
            <div className="sticky top-28 rounded-3xl border border-brand-line/70 bg-white/90 p-5 shadow-[0_16px_44px_rgba(0,0,0,0.12)]">
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-brand-smoke">{t.categoryLabel}</p>
              <div className="mt-3 flex flex-col gap-2">
                {categoriesWithId.map((cat) => (
                  <button
                    key={cat._anchorId}
                    className={`flex items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-brand-line/30 ${
                      activeCategory === cat._anchorId ? "bg-brand-gold/15 text-brand-ink shadow-inner shadow-brand-gold/20" : "text-brand-ink/80"
                    }`}
                    onClick={() => {
                      setActiveCategory(cat._anchorId);
                      scrollToId(cat._anchorId);
                    }}
                  >
                    <span className="truncate">{cat.nome}</span>
                    <span className={`text-xs ${activeCategory === cat._anchorId ? "text-brand-gold" : "text-brand-smoke"}`}>↘</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <div className="flex-1 space-y-12 md:space-y-16">
            {categoriesWithId.map((categoria) => {
            const subcategorias = (categoria.subcategorias || []).filter((sub) => (sub.pratos || []).length > 0);
            const pratosSoltos = categoria.pratosSemSubcategoria || [];
            const canonicalSlug = categoria.slugBase || "";
            const isPeixe = canonicalSlug === "peixe";
            const isCarne = canonicalSlug === "carne";

            return (
              <article
                key={categoria._id}
                id={categoria._anchorId}
                className="rounded-[32px] border border-brand-line/70 bg-[#f7f1e6]/90 p-6 shadow-[0_26px_60px_rgba(0,0,0,0.12)] ring-1 ring-brand-line/40 scroll-mt-28 md:p-10 lg:scroll-mt-32"
              >
                <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.45em] text-brand-smoke">{t.categoryLabel}</p>
                    <h3 className="h-display text-2xl text-brand-ink sm:text-3xl">{categoria.nome}</h3>
                  </div>
                  <a
                    href="/vinhos"
                    className="inline-flex items-center gap-2 self-start rounded-full border border-brand-gold/60 bg-brand-gold/10 px-4 py-2 text-sm font-semibold text-brand-gold shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
                  >
                    {t.winesButton}
                    <LuArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </header>

                {(isPeixe || isCarne) && (
                  <p className="mt-4 text-sm text-brand-ink/75">{isPeixe ? t.fishNote : t.meatNote}</p>
                )}

                <div className="mt-8 space-y-8">
                  {pratosSoltos.length > 0 && (
                    <div className="grid grid-cols-1 gap-5">
                      {pratosSoltos.map((prato) => (
                        <MenuCard
                          key={prato._id}
                          nome={prato.nome}
                          descricao={prato.descricao}
                          preco={prato.preco}
                          imagemUrl={prato.imagemUrl}
                        />
                      ))}
                    </div>
                  )}

                  {subcategorias.map((subcategoria) => (
                    <div key={subcategoria._id} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="h-px flex-1 bg-gradient-to-r from-brand-gold/40 via-brand-line to-transparent" />
                        <h4 className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-ink/60">{subcategoria.nome}</h4>
                        <span className="h-px flex-1 bg-gradient-to-l from-brand-gold/40 via-brand-line to-transparent" />
                      </div>
                      <div className="grid grid-cols-1 gap-5">
                        {subcategoria.pratos.map((prato) => (
                          <MenuCard
                            key={prato._id}
                            nome={prato.nome}
                            descricao={prato.descricao}
                            preco={prato.preco}
                            imagemUrl={prato.imagemUrl}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-3xl border border-[#d7b27d]/50 bg-[#f7e4c6]/80 px-6 py-5 text-center text-xs leading-relaxed text-brand-ink/80">
        <p>{t.taxLine1}</p>
        <p className="mt-2">{t.taxLine2}</p>
        <p className="mt-2 font-semibold tracking-[0.25em] text-brand-smoke">{t.taxLaw}</p>
      </div>
      <div ref={bottomSentinelRef} aria-hidden className="h-px w-full" />

      {mounted &&
        createPortal(
          <div
            className={`pointer-events-none fixed bottom-0 right-0 z-40 flex items-end justify-end pb-12 pr-2 transition-all duration-300 ease-out sm:pr-3 md:pr-6 lg:pr-10 md:pb-16 ${
              showTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            aria-hidden={!showTop}
          >
            <button
              aria-label="Voltar ao topo"
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/60 bg-brand-gold/90 text-base font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${
              showTop ? "pointer-events-auto" : "pointer-events-none"
            }`}
            onClick={() => scrollToId("ementa")}
          >
            <LuChevronUp className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
          </button>
          </div>,
          document.body
        )}
    </section>
  );
}
