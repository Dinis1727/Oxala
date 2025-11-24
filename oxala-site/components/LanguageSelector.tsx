"use client";
import clsx from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  direction?: "row" | "column";
  size?: "sm" | "md";
};

export default function LanguageSelector({ direction = "row", size = "md" }: Props) {
  const { language, setLanguage, options } = useLanguage();
  const isRow = direction === "row";
  const baseText = size === "sm" ? "text-[0.7rem]" : "text-xs";
  const getLabel = (optionLabel: string, shortLabel: string) => (isRow ? shortLabel : optionLabel);

  return (
    <div
      className={clsx(
        "rounded-full border border-white/15 bg-white/5 px-3 py-1 font-semibold text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur",
        isRow ? "flex items-center gap-1" : "flex flex-col gap-1 text-left py-3 px-4 rounded-2xl border-white/15 bg-white/8 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
      )}
    >
      {options.map((option, index) => (
        <div key={option.code} className="flex items-center">
          <button
            type="button"
            onClick={() => setLanguage(option.code)}
            className={clsx(baseText, "uppercase transition hover:text-brand-gold", option.code === language ? "text-brand-gold" : "text-white/70")}
          >
            {getLabel(option.label, option.shortLabel)}
          </button>
          {isRow && index < options.length - 1 && <span className={`${baseText} px-1 text-white/30`}>/</span>}
        </div>
      ))}
    </div>
  );
}
