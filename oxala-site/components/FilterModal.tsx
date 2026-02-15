"use client";

import { useEffect, useRef, useState } from "react";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  typeValue: string;
  onTypeChange: (value: string) => void;
  typeOptions: string[];
  regionValue: string;
  onRegionChange: (value: string) => void;
  regionOptions: string[];
  yearValue: string;
  onYearChange: (value: string) => void;
  yearOptions: string[];
  labels: {
    filtersTitle: string;
    refineTitle: string;
    typeLabel: string;
    regionLabel: string;
    yearLabel: string;
    allTypeLabel: string;
    allRegionLabel: string;
    allYearLabel: string;
    closeLabel: string;
    applyLabel: string;
    clearLabel: string;
  };
  onClearFilters: () => void;
};

export default function FilterModal({
  isOpen,
  onClose,
  typeValue,
  onTypeChange,
  typeOptions,
  regionValue,
  onRegionChange,
  regionOptions,
  yearValue,
  onYearChange,
  yearOptions,
  labels,
  onClearFilters,
}: FilterModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const previousOverflow = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen || isClosing) {
      if (previousOverflow.current === null) {
        previousOverflow.current = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
    } else if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }, [isOpen, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    closeTimeout.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 280);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
        aria-label={labels.closeLabel}
      />

      <div
        className={`fixed inset-0 z-50 flex justify-end transition-transform duration-300 ease-in-out ${
          isClosing ? "translate-y-full sm:translate-y-0 sm:translate-x-full" : "translate-y-0 sm:translate-x-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-screen max-h-screen w-full max-w-full flex-col overflow-hidden rounded-t-[28px] border border-brand-line/60 bg-white text-brand-ink shadow-[0_30px_90px_rgba(0,0,0,0.45)] font-maison uppercase sm:w-[min(70vw,820px)] md:w-[min(70vw,820px)] lg:w-[min(70vw,820px)] sm:rounded-none sm:border-l sm:border-t-0 sm:border-b-0 sm:ml-auto">
        <header className="flex items-center justify-between border-b border-brand-line/50 px-5 py-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-brand-smoke">{labels.filtersTitle}</p>
            <h3 className="text-lg font-semibold text-brand-ink">{labels.refineTitle}</h3>
          </div>
            <button
              aria-label={labels.closeLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-ink/5 text-lg font-semibold text-brand-ink transition hover:scale-105"
            onClick={handleClose}
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-ink/80">{labels.typeLabel}</h4>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {typeOptions.map((type) => (
                <label
                  key={type || "__all__"}
                  className="relative flex items-center gap-3 cursor-pointer rounded-2xl border border-brand-line/60 bg-white px-3 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5"
                >
                  <input
                    type="checkbox"
                    checked={typeValue === type}
                    onChange={(e) => onTypeChange(e.target.checked ? type : "__all")}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border transition ${typeValue === type ? "border-brand-ink" : "border-brand-line"}`}
                  >
                    {typeValue === type && (
                      <svg className="h-3 w-3 text-brand-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="truncate text-sm text-brand-ink">
                    {type === "__all" ? labels.allTypeLabel : type}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-ink/80">{labels.regionLabel}</h4>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {regionOptions.map((region) => (
                <label
                  key={region || "__all__"}
                  className="relative flex items-center gap-3 cursor-pointer rounded-2xl border border-brand-line/60 bg-white px-3 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5"
                >
                  <input
                    type="checkbox"
                    checked={regionValue === region}
                    onChange={(e) => onRegionChange(e.target.checked ? region : "__all")}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border transition ${regionValue === region ? "border-brand-ink" : "border-brand-line"}`}
                  >
                    {regionValue === region && (
                      <svg className="h-3 w-3 text-brand-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-brand-ink">
                    {region === "__all" ? labels.allRegionLabel : region}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-ink/80">{labels.yearLabel}</h4>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {yearOptions.map((year) => (
                <label
                  key={year || "__all__"}
                  className="relative flex items-center gap-3 cursor-pointer rounded-2xl border border-brand-line/60 bg-white px-3 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5"
                >
                  <input
                    type="checkbox"
                    checked={yearValue === year}
                    onChange={(e) => onYearChange(e.target.checked ? year : "__all")}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border transition ${yearValue === year ? "border-brand-ink" : "border-brand-line"}`}
                  >
                    {yearValue === year && (
                      <svg className="h-3 w-3 text-brand-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-brand-ink">
                    {year === "__all" ? labels.allYearLabel : year}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>
          <footer className="flex items-center gap-3 border-t border-brand-line/50 px-5 py-4">
            <button
              type="button"
              className="flex-1 rounded-full border border-brand-line/70 bg-brand-ink/5 px-4 py-2 text-sm font-semibold text-brand-ink transition hover:-translate-y-0.5"
              onClick={() => {
                onClearFilters();
                handleClose();
              }}
            >
              {labels.clearLabel}
            </button>
            <button
              type="button"
              className="flex-1 rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5"
              onClick={handleClose}
            >
              {labels.applyLabel}
            </button>
          </footer>
        </div>
      </div>

    </>
  );
}
