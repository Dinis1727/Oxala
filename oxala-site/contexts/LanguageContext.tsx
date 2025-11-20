"use client";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  defaultLanguage,
  languageOptions,
  LanguageCode,
  translations,
  LANGUAGE_COOKIE,
  isLanguageCode,
} from "@/lib/i18n";

type LanguageContextShape = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  translations: (typeof translations)[LanguageCode];
  options: typeof languageOptions;
};

const STORAGE_KEY = "oxala-language";

const LanguageContext = createContext<LanguageContextShape | undefined>(undefined);

type LanguageProviderProps = {
  children: React.ReactNode;
  initialLanguage?: LanguageCode;
};

export function LanguageProvider({ children, initialLanguage = defaultLanguage }: LanguageProviderProps) {
  const router = useRouter();
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);

  const persistLanguage = useCallback((lang: LanguageCode) => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.cookie = `${LANGUAGE_COOKIE}=${lang};path=/;max-age=31536000`;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isLanguageCode(stored) && stored !== language) {
      setLanguageState(stored);
      persistLanguage(stored);
      router.refresh();
    } else if (!stored) {
      persistLanguage(language);
    }
  }, [language, persistLanguage, router]);

  const setLanguage = useCallback(
    (lang: LanguageCode) => {
      if (language === lang) {
        persistLanguage(lang);
        return;
      }
      setLanguageState(lang);
      persistLanguage(lang);
      router.refresh();
    },
    [language, persistLanguage, router]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      translations: translations[language],
      options: languageOptions,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
