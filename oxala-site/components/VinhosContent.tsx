"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Vinho } from "@/types/vinho";
import { useEffect, useMemo, useRef, useState } from "react";

type ScoredVinho = Vinho & { _score: number };

type Props = {
  vinhos: Vinho[];
};

function formatPreco(preco?: number) {
  if (typeof preco !== "number") return null;
  return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(preco);
}

export default function VinhosContent({ vinhos }: Props) {
  const { translations } = useLanguage();
  const t = translations.vinhos;
  const [selected, setSelected] = useState<Vinho | null>(null);
  const [filterType, setFilterType] = useState<string>("__all");
  const [filterRegion, setFilterRegion] = useState<string>("__all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const volumeLabelMap = useMemo(
    () => new Map(t.bottleSizes.map((item) => [item.value, item.label])),
    [t.bottleSizes]
  );

  const orderedVinhos = useMemo(
    () =>
      [...vinhos].sort((a, b) => {
        const regiaoA = a.regiao || "";
        const regiaoB = b.regiao || "";
        if (regiaoA && regiaoB && regiaoA !== regiaoB) {
          return regiaoA.localeCompare(regiaoB, undefined, { sensitivity: "base" });
        }
        return (a.nome || "").localeCompare(b.nome || "", undefined, { sensitivity: "base" });
      }),
    [vinhos]
  );

  const tipos = useMemo(() => {
    const set = new Set<string>();
    orderedVinhos.forEach((v) => v.tipo && set.add(v.tipo));
    return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }, [orderedVinhos]);

  const regioes = useMemo(() => {
    const set = new Set<string>();
    orderedVinhos.forEach((v) => v.regiao && set.add(v.regiao));
    return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }, [orderedVinhos]);

  const filteredVinhos = useMemo<ScoredVinho[]>(() => {
    const q = searchTerm.trim().toLowerCase();
    return orderedVinhos
      .map((v) => {
        const matchesType = filterType === "__all" || v.tipo === filterType;
        const matchesRegion = filterRegion === "__all" || v.regiao === filterRegion;
        if (!matchesType || !matchesRegion) return null;

        if (!q) {
          return { ...v, _score: 0 };
        }

        const nome = (v.nome || "").toLowerCase();
        const regiao = (v.regiao || "").toLowerCase();
        const tipo = (v.tipo || "").toLowerCase();
        const ano = v.ano ? String(v.ano) : "";
        const volume = v.volumeMl ? String(v.volumeMl) : "";
        const teor = typeof v.teorAlcoolico === "number" ? v.teorAlcoolico.toFixed(1) : "";

        let score = 0;
        if (nome.includes(q)) score += 4;
        if (regiao.includes(q)) score += 2;
        if (tipo.includes(q)) score += 1;
        if (ano.includes(q)) score += 1;
        if (volume.includes(q)) score += 1;
        if (teor.includes(q)) score += 1;

        if (score === 0) return null;
        return { ...v, _score: score };
      })
      .filter((v): v is ScoredVinho => v !== null)
      .sort((a, b) => {
        if (a._score !== b._score) return b._score - a._score;
        return (a.nome || "").localeCompare(b.nome || "", undefined, { sensitivity: "base" });
      });
  }, [orderedVinhos, filterType, filterRegion, searchTerm]);

  const resolveVolumeLabel = (volume?: number) => {
    if (typeof volume !== "number") return null;
    if (volumeLabelMap.has(volume)) return volumeLabelMap.get(volume);
    if (volume >= 1000) {
      return `${(volume / 1000).toLocaleString(undefined, {
        minimumFractionDigits: volume % 1000 === 0 ? 0 : 1,
        maximumFractionDigits: 2,
      })} L`;
    }
    return `${volume.toLocaleString(undefined, { maximumFractionDigits: 1 })} ml`;
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section className="overflow-hidden rounded-[28px] border border-brand-line/60 bg-gradient-to-br from-[#faf4e7]/80 via-[#f4e7d4]/78 to-[#e7dcc6]/78 px-4 py-8 shadow-[0_26px_70px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:px-6 md:px-8">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-[0.62rem] uppercase tracking-[0.45em] text-brand-smoke">{t.title}</p>
        <h1 className="h-display mt-3 text-2xl text-brand-ink sm:text-3xl">{t.description}</h1>
      </div>

      <div className="mt-8 flex flex-col gap-3 text-sm text-brand-ink/80 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-auto">
          <SearchInput
            placeholder={t.searchPlaceholder}
            label={t.searchLabel}
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[0.75rem] uppercase tracking-[0.35em] text-brand-smoke">{t.filters.title}</span>
          <FilterSelect
            label={t.filters.type}
            options={tipos}
            value={filterType}
            onChange={setFilterType}
            allLabel={t.filters.all}
          />
          <FilterSelect
            label={t.filters.region}
            options={regioes}
            value={filterRegion}
            onChange={setFilterRegion}
            allLabel={t.filters.all}
          />
        </div>
      </div>

      {filteredVinhos.length === 0 ? (
        <div className="mt-10 text-center text-brand-ink/70">{t.emptyState}</div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filteredVinhos.map((vinho) => (
            <article
              key={vinho._id}
              className="group relative overflow-hidden rounded-2xl border border-brand-line/70 bg-white/75 shadow-[0_14px_35px_rgba(0,0,0,0.12)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.16)]"
              onClick={() => setSelected(vinho)}
            >
              <div className="relative h-44 w-full overflow-hidden">
                {vinho.imagemUrl ? (
                  <Image
                    src={vinho.imagemUrl}
                    alt={vinho.nome}
                    fill
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 320px, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-brand-line/40 text-sm text-brand-ink/60">
                    {vinho.nome}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
                <div className="absolute inset-x-3 bottom-3">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/70">
                    {vinho.regiao || t.regionLabel}
                  </p>
                  <h3 className="h-display text-lg text-white drop-shadow">{vinho.nome}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] bg-white text-brand-ink shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <button
              aria-label={t.closeLabel}
              className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-brand-ink shadow-lg shadow-black/10 transition hover:scale-105"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            {selected.imagemUrl && (
              <div className="relative w-full overflow-hidden bg-gradient-to-b from-black via-black to-brand-night">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-[960px]">
                  <Image
                    src={selected.imagemUrl}
                    alt={selected.nome}
                    fill
                    className="h-full w-full object-contain"
                    sizes="(min-width: 1024px) 900px, 100vw"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-5 pt-16">
                  <div className="flex flex-col gap-2">
                    <h3 className="h-display text-3xl text-white drop-shadow-lg">{selected.nome}</h3>
                    {selected.regiao && (
                      <p className="text-sm uppercase tracking-[0.35em] text-brand-gold/90">{selected.regiao}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 bg-white px-6 pb-8 pt-6">
              {!selected.imagemUrl && (
                <h3 className="h-display text-2xl text-brand-ink">{selected.nome}</h3>
              )}
              <div className="flex flex-wrap gap-2 text-sm text-brand-ink/80">
                {selected.tipo && (
                  <span className="rounded-full bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-brand-gold/20 px-3 py-1 font-semibold text-brand-gold shadow-inner shadow-brand-gold/20">
                    {t.typeLabel}: {selected.tipo}
                  </span>
                )}
                {selected.regiao && (
                  <span className="rounded-full bg-brand-ink/5 px-3 py-1 font-semibold text-brand-ink/80">
                    {t.regionLabel}: {selected.regiao}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selected.ano && (
                  <DetailChip label={t.yearLabel} value={selected.ano.toString()} />
                )}
                {resolveVolumeLabel(selected.volumeMl) && (
                  <DetailChip label={t.bottleSizeLabel} value={resolveVolumeLabel(selected.volumeMl)!} />
                )}
                {typeof selected.teorAlcoolico === "number" && (
                  <DetailChip label={t.alcoholContentLabel} value={`${selected.teorAlcoolico.toFixed(1)} %`} />
                )}
                {typeof selected.preco === "number" && (
                  <DetailChip label={t.priceLabel} value={`${formatPreco(selected.preco)} €`} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function DetailChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brand-line/70 bg-gradient-to-br from-white to-[#f6e8d5] px-4 py-3 text-sm text-brand-ink/85 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
      <p className="text-[0.72rem] uppercase tracking-[0.25em] text-brand-smoke">{label}</p>
      <p className="mt-1 font-semibold text-brand-ink">{value}</p>
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  allLabel: string;
};

function FilterSelect({ label, options, value, onChange, allLabel }: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-flex items-center gap-2 rounded-full border border-brand-line/70 bg-gradient-to-br from-white to-[#f4e9d8] px-3 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.1)]">
      <span className="text-xs font-semibold text-brand-ink/70">{label}</span>
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ink focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value === "__all" ? allLabel : value}</span>
        <span className={`text-brand-gold transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="absolute left-2 top-[115%] z-30 min-w-[160px] overflow-hidden rounded-2xl border border-brand-line/70 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
          <ul className="max-h-64 overflow-y-auto text-sm text-brand-ink">
            <li>
              <button
                className={`flex w-full items-center justify-between px-3 py-2 text-left transition hover:bg-brand-line/20 ${
                  value === "__all" ? "font-semibold text-brand-gold" : ""
                }`}
                onClick={() => handleSelect("__all")}
              >
                <span>{allLabel}</span>
                {value === "__all" && <span className="text-brand-gold">•</span>}
              </button>
            </li>
            {options.map((opt) => (
              <li key={opt}>
                <button
                  className={`flex w-full items-center justify-between px-3 py-2 text-left transition hover:bg-brand-line/20 ${
                    value === opt ? "font-semibold text-brand-gold" : ""
                  }`}
                  onClick={() => handleSelect(opt)}
                >
                  <span>{opt}</span>
                  {value === opt && <span className="text-brand-gold">•</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type SearchInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onClear?: () => void;
};

function SearchInput({ label, placeholder, value, onChange, onClear }: SearchInputProps) {
  return (
    <label className="inline-flex w-full flex-1 items-center gap-2 rounded-full border border-brand-line/70 bg-white/95 px-4 py-2 shadow-[0_10px_26px_rgba(0,0,0,0.1)]">
      <span className="whitespace-nowrap text-xs font-semibold text-brand-ink/70">{label}</span>
      <div className="flex w-full min-w-0 items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-brand-smoke">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.79l5 4.99L20.49 19zM5 10a5 5 0 1 1 10 0a5 5 0 0 1-10 0"
          />
        </svg>
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-brand-ink placeholder:text-brand-smoke/70 focus:outline-none"
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            type="button"
            aria-label="Limpar"
            className="text-lg font-semibold text-brand-gold transition hover:scale-110"
            onClick={onClear}
          >
            ×
          </button>
        )}
      </div>
    </label>
  );
}
