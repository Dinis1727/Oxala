"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function VinhosContent() {
  const { translations } = useLanguage();
  const t = translations.vinhos;

  return (
    <>
      <h1 className="text-3xl font-bold text-[#CFAE70] mb-6">{t.title}</h1>
      <p className="text-lg text-gray-700">{t.description}</p>
    </>
  );
}
