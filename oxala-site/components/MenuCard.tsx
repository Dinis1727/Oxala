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
  const hasPreco = typeof preco === "number";
  const floatPreco = hasDescricao && hasPreco;

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-brand-line/70 bg-gradient-to-br from-white via-[#fdf9f2] to-[#f7ecdb] px-5 py-5 shadow-[0_18px_40px_rgba(17,9,2,0.09)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(17,9,2,0.14)] ${
        floatPreco ? "pr-28" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="h-display text-[1.3rem] font-medium tracking-[0.02em] text-brand-ink md:text-[1.5rem]">
            {nome}
          </h3>
          {hasDescricao && (
            <p className="text-sm leading-relaxed text-brand-ink/75 md:text-base">{descricao}</p>
          )}
        </div>
        {!floatPreco && hasPreco && (
          <span className="ml-auto inline-flex h-9 min-w-[78px] items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/12 px-3 text-sm font-semibold text-brand-gold shadow-inner shadow-brand-gold/20 whitespace-nowrap">
            {preco.toFixed(2)} €
          </span>
        )}
      </div>

      {floatPreco && (
        <div className="absolute inset-y-0 right-5 flex items-center">
          <span className="inline-flex h-9 min-w-[78px] items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/12 px-3 text-sm font-semibold text-brand-gold shadow-inner shadow-brand-gold/20 whitespace-nowrap">
            {preco!.toFixed(2)} €
          </span>
        </div>
      )}

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
