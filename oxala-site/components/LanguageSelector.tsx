"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  size?: "sm" | "md";
};

export default function LanguageSelector({ size = "md" }: Props) {
  const { language, setLanguage, options } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const baseText = size === "sm" ? "text-[0.65rem]" : "text-xs";
  const labelText = size === "sm" ? "text-[0.7rem]" : "text-[0.75rem]";
  const tracking = size === "sm" ? "tracking-[0.28em]" : "tracking-[0.32em]";
  const pillHeight = size === "sm" ? "h-8" : "h-9";
  const pillPadding = size === "sm" ? "px-3" : "px-4";
  const arrowSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const current = options.find((option) => option.code === language);
  const otherOptions = options.filter((option) => option.code !== language);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-flex items-center">
      <div
        className={clsx(
          "inline-flex items-center rounded-full border border-white/15 bg-[#0e0b09]/85 font-semibold uppercase text-white/80 transition",
          pillHeight,
          pillPadding,
          tracking
        )}
      >
        <span className={clsx(labelText, "text-brand-gold")}>{current?.shortLabel ?? language.toUpperCase()}</span>

        <div
          role="listbox"
          aria-hidden={!open}
          className={clsx(
            "flex items-center overflow-hidden transition-[max-width,opacity,margin] duration-200 ease-out",
            open ? "max-w-[240px] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0 pointer-events-none"
          )}
        >
          {otherOptions.map((option, index) => (
            <div key={option.code} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  setLanguage(option.code);
                  setOpen(false);
                }}
                className={clsx(
                  baseText,
                  "uppercase transition hover:text-brand-gold",
                  option.code === language ? "text-brand-gold" : "text-white/70"
                )}
              >
                {option.shortLabel}
              </button>
              {index < otherOptions.length - 1 && <span className={`${baseText} px-1 text-white/30`}>/</span>}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={clsx(
            "ml-0 inline-flex items-center justify-center text-white/80 transition hover:text-brand-gold",
            arrowSize
          )}
        >
          <svg
            viewBox="0 0 8 12"
            className={clsx("h-3 w-3 transition-transform", open ? "" : "rotate-180")}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 1l4 5-4 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
