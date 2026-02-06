"use client";
import Image from "next/image";

type Props = {
  nome: string;
  descricao?: string;
  preco?: number;
  imagemUrl?: string;
};

export default function MenuCard({ nome, descricao, preco, imagemUrl }: Props) {
  const hasDescricao = Boolean(descricao?.trim());
  const isPerPerson = descricao
    ? descricao
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes("preco por pessoa")
    : false;
  const hasPreco = typeof preco === "number";

  return (
    <article className="group relative w-full overflow-hidden rounded-3xl bg-transparent py-2 transition duration-300">
      <div className={`grid w-full items-start gap-x-6 ${hasPreco ? "grid-cols-[1fr_auto]" : "grid-cols-1"}`}>
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="h-display text-[1.3rem] font-medium uppercase tracking-[0.02em] text-brand-ink md:text-[1.3rem]">
            {nome}
          </h3>
          {hasDescricao && (
            <p
              className={`text-sm leading-relaxed text-brand-ink/75 md:text-base ${
                isPerPerson ? "italic" : ""
              }`}
            >
              {descricao}
            </p>
          )}
        </div>
        {hasPreco && (
          <span className="inline-flex min-w-[78px] items-center justify-end text-right text-sm font-semibold text-brand-ink whitespace-nowrap justify-self-end">
            {preco!.toFixed(2)} €
          </span>
        )}
      </div>

      {imagemUrl && (
        <div
          className={`mt-4 overflow-hidden rounded-2xl ${
            hasDescricao ? "mx-auto max-w-[420px]" : ""
          }`}
        >
          <Image
            src={imagemUrl}
            alt={nome}
            width={960}
            height={400}
            className={`h-44 w-full object-cover transition duration-500 group-hover:scale-105 ${
              hasDescricao ? "object-center" : ""
            }`}
            sizes="(min-width: 768px) 480px, 100vw"
          />
        </div>
      )}
    </article>
  );
}
