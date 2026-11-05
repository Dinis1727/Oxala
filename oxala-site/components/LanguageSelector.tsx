"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { LuCheck, LuChevronDown, LuGlobe } from "react-icons/lu";
import { useLanguage } from "@/contexts/LanguageContext";
import { designCopy } from "@/lib/design-copy";

export default function LanguageSelector() {
  const { language, setLanguage, options } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const initialFocus = useRef(0);
  const menuId = useId();
  const current = options.find((option) => option.code === language)!;
  const label = designCopy[language].language;

  const openAt = (index: number) => {
    initialFocus.current = index;
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    optionRefs.current[initialFocus.current]?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = optionRefs.current.findIndex(
      (item) => item === document.activeElement,
    );
    let next: number | undefined;
    if (event.key === "ArrowDown") next = (index + 1) % options.length;
    else if (event.key === "ArrowUp")
      next = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close();
      return;
    } else if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      const match = options.findIndex((_, offset) => {
        const candidate = options[(index + offset + 1) % options.length];
        return candidate.label
          .toLocaleLowerCase()
          .startsWith(event.key.toLocaleLowerCase());
      });
      if (match !== -1) next = (index + match + 1) % options.length;
    }
    if (next !== undefined) {
      event.preventDefault();
      optionRefs.current[next]?.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className="language-picker"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="language-trigger"
        aria-label={`${label}: ${current.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() =>
          open
            ? setOpen(false)
            : openAt(options.findIndex((option) => option.code === language))
        }
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openAt(event.key === "ArrowDown" ? 0 : options.length - 1);
          }
        }}
      >
        <LuGlobe aria-hidden />
        <span>{current.shortLabel}</span>
        <LuChevronDown className={open ? "is-open" : undefined} aria-hidden />
      </button>
      {open && (
        <div
          id={menuId}
          className="language-menu"
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
        >
          <p className="language-menu-label" aria-hidden="true">
            {label}
          </p>
          {options.map((option, index) => (
            <button
              key={option.code}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              className="language-option"
              role="menuitemradio"
              aria-checked={option.code === language}
              lang={option.code}
              tabIndex={-1}
              onClick={() => {
                setLanguage(option.code);
                close();
              }}
            >
              <span className="language-code" aria-hidden="true">
                {option.shortLabel}
              </span>
              <span>{option.label}</span>
              {option.code === language && <LuCheck aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
