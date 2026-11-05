"use client";

import Image from "next/image";
import { languageLocales } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  nome: string;
  descricao?: string;
  preco?: number;
  imagemUrl?: string;
  headingLevel?: 3 | 4;
};

export default function MenuCard({
  nome,
  descricao,
  preco,
  imagemUrl,
  headingLevel = 3,
}: Props) {
  const { language } = useLanguage();
  const Heading = headingLevel === 4 ? "h4" : "h3";
  return (
    <article className={`menu-dish${imagemUrl ? " has-image" : ""}`}>
      {imagemUrl && (
        <div className="dish-image">
          <Image src={imagemUrl} alt={nome} fill sizes="96px" />
        </div>
      )}
      <div className="dish-content">
        <div className="dish-title-row">
          <Heading>{nome}</Heading>
          <span className="dish-leader" aria-hidden />
          {typeof preco === "number" && (
            <span className="dish-price">
              {new Intl.NumberFormat(languageLocales[language], {
                style: "currency",
                currency: "EUR",
              }).format(preco)}
            </span>
          )}
        </div>
        {descricao?.trim() && <p>{descricao}</p>}
      </div>
    </article>
  );
}
