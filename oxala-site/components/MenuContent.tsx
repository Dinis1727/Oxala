"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LuChevronUp } from "react-icons/lu";
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
    const updateShowTop = () => {
      setShowTop(window.scrollY > 240);
    };

    updateShowTop();
    window.addEventListener("scroll", updateShowTop, { passive: true });
    return () => window.removeEventListener("scroll", updateShowTop);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="ementa" className="relative bg-[#f7f2e9] px-6 py-10 sm:px-8 md:px-12 md:py-14">
      <div className="w-full text-left">
        <p className="text-[0.65rem] uppercase tracking-[0.5em] text-brand-smoke">{t.introTag}</p>
        <h2 className="mt-3 h-display text-4xl uppercase tracking-[0.18em] text-brand-ink sm:text-5xl">
          {t.introTitle}
        </h2>
        <p className="mt-4 text-base text-brand-ink/75 sm:text-lg">{t.introDescription}</p>
      </div>

      <div className="mt-14 flex flex-col gap-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm uppercase tracking-[0.35em] text-brand-smoke sm:text-base">
              {t.categoryLabel}
            </h3>
          </div>
          <div ref={categoryNavRef} className="border-y border-black/70 py-3">
            <div className="mt-2 flex w-full flex-nowrap items-center justify-between gap-x-4 overflow-x-auto">
              {categoriesWithId.map((cat) => (
                <button
                  key={cat._anchorId}
                  className={`pb-1 font-maison font-semibold text-[0.8rem] uppercase tracking-[0.22em] transition sm:text-[0.9rem] ${
                    activeCategory === cat._anchorId
                      ? "text-brand-ink border-b-2 border-brand-gold"
                      : "text-brand-ink/60 border-b-2 border-transparent hover:text-brand-ink"
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
        </div>

        <div className="space-y-12 md:space-y-16 mt-6">
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
                className="border-b border-black/70 pb-8 scroll-mt-28 lg:scroll-mt-32"
              >
                <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.45em] text-brand-smoke"></p>
                    <h3 className="h-display text-2xl uppercase text-brand-ink sm:text-3xl">{categoria.nome}</h3>
                  </div>
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

      <div className="mt-12 rounded-3xl border border-brand-line/60 bg-white/70 px-6 py-1 text-center text-xs leading-relaxed text-brand-ink/80">
        <p>{t.taxLine1}</p>
        <p className="mt-2">{t.taxLine2}</p>
        <p className="mt-2 font-semibold tracking-[0.25em] text-brand-smoke">{t.taxLaw}</p>
      </div>
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
