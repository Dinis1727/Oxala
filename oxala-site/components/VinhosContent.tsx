"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import {
  LuArrowUpRight,
  LuListFilter,
  LuSearch,
  LuWine,
  LuX,
} from "react-icons/lu";
import { useLanguage } from "@/contexts/LanguageContext";
import { languageLocales } from "@/lib/i18n";
import { designCopy } from "@/lib/design-copy";
import { Vinho } from "@/types/vinho";
import FilterModal from "@/components/FilterModal";
import Dialog from "@/components/Dialog";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const unique = (values: (string | undefined)[]) =>
  [...new Set(values.filter((value): value is string => Boolean(value)))].sort(
    (a, b) => a.localeCompare(b),
  );

export default function VinhosContent({ vinhos }: { vinhos: Vinho[] }) {
  const { language, translations } = useLanguage();
  const t = translations.vinhos;
  const copy = designCopy[language];
  const titleId = useId();
  const [selected, setSelected] = useState<Vinho | null>(null);
  const [type, setType] = useState("__all");
  const [region, setRegion] = useState("__all");
  const [year, setYear] = useState("__all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const types = useMemo(() => unique(vinhos.map((v) => v.tipo)), [vinhos]);
  const regions = useMemo(() => unique(vinhos.map((v) => v.regiao)), [vinhos]);
  const years = useMemo(
    () =>
      unique(vinhos.map((v) => (v.ano ? String(v.ano) : undefined))).sort(
        (a, b) => Number(b) - Number(a),
      ),
    [vinhos],
  );
  const filtered = useMemo(() => {
    const q = normalize(search.trim());
    return vinhos.filter(
      (v) =>
        (type === "__all" || v.tipo === type) &&
        (region === "__all" || v.regiao === region) &&
        (year === "__all" || String(v.ano) === year) &&
        (!q ||
          normalize(
            [v.nome, v.regiao, v.tipo, v.ano, v.volumeMl, v.teorAlcoolico].join(
              " ",
            ),
          ).includes(q)),
    );
  }, [vinhos, type, region, year, search]);
  const count = [type, region, year].filter(
    (value) => value !== "__all",
  ).length;
  const clear = () => {
    setType("__all");
    setRegion("__all");
    setYear("__all");
  };
  const price = (value: number) =>
    new Intl.NumberFormat(languageLocales[language], {
      style: "currency",
      currency: "EUR",
    }).format(value);
  const volume = (value: number) =>
    t.bottleSizes.find((item) => item.value === value)?.label ||
    `${new Intl.NumberFormat(languageLocales[language]).format(value)} ml`;

  return (
    <section className="catalog-shell site-width wine-catalog">
      <div className="catalog-intro">
        <p className="eyebrow">{t.introTag}</p>
        <h1>
          {t.title}
          <span className="gold-period">.</span>
        </h1>
        <p>{copy.wineDescription}</p>
      </div>
      <div className="wine-toolbar">
        <label className="wine-search">
          <LuSearch aria-hidden />
          <span className="sr-only">{t.searchLabel}</span>
          <input
            type="search"
            value={search}
            placeholder={t.searchPlaceholder}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="filter-trigger"
          onClick={() => setShowFilters(true)}
        >
          <LuListFilter aria-hidden />
          {t.filters.title}
          {count > 0 && <span>{count}</span>}
        </button>
      </div>
      <div className="wine-results">
        <p aria-live="polite">
          {filtered.length} {copy.results}
        </p>
        {(search || count > 0) && (
          <button
            type="button"
            onClick={() => {
              clear();
              setSearch("");
            }}
          >
            {copy.reset}
            <LuX aria-hidden />
          </button>
        )}
      </div>
      {filtered.length ? (
        <div className="wine-grid">
          {filtered.map((wine) => (
            <button
              type="button"
              key={wine._id}
              className="wine-card"
              onClick={() => setSelected(wine)}
              aria-label={`${copy.details}: ${wine.nome}`}
            >
              <div className="wine-image">
                {wine.imagemUrl ? (
                  <Image
                    src={wine.imagemUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1440px) 312px, (min-width: 1400px) calc((100vw - 184px) / 4), (min-width: 700px) and (orientation: portrait) calc((100vw - 72px) / 2), (min-width: 700px) calc((100vw - 96px) / 3), calc((100vw - 64px) / 2)"
                  />
                ) : (
                  <LuWine aria-hidden />
                )}
                <span className="wine-detail-arrow">
                  <LuArrowUpRight aria-hidden />
                </span>
              </div>
              <div className="wine-card-copy">
                <p className="eyebrow">{wine.regiao || wine.tipo}</p>
                <h2>{wine.nome}</h2>
                <div className="wine-card-meta">
                  <span>
                    {[wine.tipo, wine.ano].filter(Boolean).join(" · ")}
                  </span>
                  {typeof wine.preco === "number" && (
                    <strong>{price(wine.preco)}</strong>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="wine-empty">
          <LuWine aria-hidden />
          <p>{vinhos.length ? copy.noResults : t.emptyState}</p>
        </div>
      )}

      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        titleId={titleId}
        closeLabel={t.closeLabel}
        className="wine-dialog"
      >
        {selected && (
          <>
            <div className="wine-dialog-image">
              {selected.imagemUrl ? (
                <Image
                  src={selected.imagemUrl}
                  alt={selected.nome}
                  fill
                  sizes="(min-width: 700px) 380px, 100vw"
                />
              ) : (
                <LuWine aria-hidden />
              )}
            </div>
            <div className="wine-dialog-copy">
              <p className="eyebrow">{selected.regiao || t.introTag}</p>
              <h2 id={titleId}>{selected.nome}</h2>
              <dl>
                {selected.tipo && (
                  <div>
                    <dt>{t.typeLabel}</dt>
                    <dd>{selected.tipo}</dd>
                  </div>
                )}
                {selected.ano && (
                  <div>
                    <dt>{t.yearLabel}</dt>
                    <dd>{selected.ano}</dd>
                  </div>
                )}
                {typeof selected.volumeMl === "number" && (
                  <div>
                    <dt>{t.bottleSizeLabel}</dt>
                    <dd>{volume(selected.volumeMl)}</dd>
                  </div>
                )}
                {typeof selected.teorAlcoolico === "number" && (
                  <div>
                    <dt>{t.alcoholContentLabel}</dt>
                    <dd>
                      {new Intl.NumberFormat(languageLocales[language]).format(
                        selected.teorAlcoolico,
                      )}{" "}
                      %
                    </dd>
                  </div>
                )}
                {typeof selected.preco === "number" && (
                  <div className="wine-dialog-price">
                    <dt>{t.priceLabel}</dt>
                    <dd>{price(selected.preco)}</dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        )}
      </Dialog>
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        typeValue={type}
        onTypeChange={setType}
        typeOptions={["__all", ...types]}
        regionValue={region}
        onRegionChange={setRegion}
        regionOptions={["__all", ...regions]}
        yearValue={year}
        onYearChange={setYear}
        yearOptions={["__all", ...years]}
        labels={{
          filtersTitle: t.filters.title,
          refineTitle: t.filters.refine,
          typeLabel: t.filters.type,
          regionLabel: t.filters.region,
          yearLabel: t.yearLabel,
          allTypeLabel: t.filters.allType,
          allRegionLabel: t.filters.allRegion,
          allYearLabel: t.filters.allYear,
          closeLabel: t.closeLabel,
          applyLabel: t.filters.apply,
          clearLabel: t.filters.clear,
        }}
        onClearFilters={clear}
      />
    </section>
  );
}
