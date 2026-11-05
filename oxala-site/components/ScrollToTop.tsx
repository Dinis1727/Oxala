"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LuArrowUp } from "react-icons/lu";
import { useLanguage } from "@/contexts/LanguageContext";
import { designCopy } from "@/lib/design-copy";

export default function ScrollToTop() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return visible ? (
    <button
      type="button"
      className="back-to-top"
      aria-label={designCopy[language].top}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        })
      }
    >
      <LuArrowUp aria-hidden />
    </button>
  ) : null;
}
