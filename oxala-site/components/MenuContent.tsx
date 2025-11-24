"use client";
import { useMemo } from "react";
import MenuCard from "@/components/MenuCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Categoria } from "@/types/menu";

type Props = {
  categorias: Categoria[];
};

export default function MenuContent({ categorias }: Props) {
  const { translations } = useLanguage();
  const t = translations.menu;

  const filteredCategorias = useMemo(
    () =>
      categorias.filter((categoria) => {
        const subcategorias = (categoria.subcategorias || []).filter((sub) => (sub.pratos || []).length > 0);
        const pratosSoltos = categoria.pratosSemSubcategoria || [];
        return subcategorias.length > 0 || pratosSoltos.length > 0;
      }),
    [categorias]
  );

  return (
    <section
      id="ementa"
      className="rounded-[36px] border border-white/12 bg-gradient-to-br from-[#f5f0e7]/95 via-[#f7f2e9]/92 to-[#eee4d3]/90 px-5 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:px-8 md:px-12 md:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.5em] text-brand-smoke">{t.introTag}</p>
        <h2 className="mt-3 h-display text-3xl text-brand-ink sm:text-4xl">{t.introTitle}</h2>
        <p className="mt-4 text-base text-brand-ink/75">{t.introDescription}</p>
      </div>

      <div className="mt-12 space-y-12 md:space-y-16">
        {filteredCategorias.map((categoria) => {
          const subcategorias = (categoria.subcategorias || []).filter((sub) => (sub.pratos || []).length > 0);
          const pratosSoltos = categoria.pratosSemSubcategoria || [];
          const canonicalSlug = categoria.slugBase || "";
          const isPeixe = canonicalSlug === "peixe";
          const isCarne = canonicalSlug === "carne";

          return (
            <article
              key={categoria._id}
              className="rounded-[32px] border border-brand-line/60 bg-[#f7f1e6]/90 p-6 shadow-[0_26px_60px_rgba(0,0,0,0.12)] md:p-10"
            >
              <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.45em] text-brand-smoke">{t.categoryLabel}</p>
                  <h3 className="h-display text-2xl text-brand-ink sm:text-3xl">{categoria.nome}</h3>
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

      <div className="mt-12 rounded-3xl border border-[#d7b27d]/50 bg-[#f7e4c6]/80 px-6 py-5 text-center text-xs leading-relaxed text-brand-ink/80">
        <p>{t.taxLine1}</p>
        <p className="mt-2">{t.taxLine2}</p>
        <p className="mt-2 font-semibold tracking-[0.25em] text-brand-smoke">{t.taxLaw}</p>
      </div>
    </section>
  );
}
