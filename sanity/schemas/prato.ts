import { defineType } from "sanity";

export default defineType({
  name: "prato",
  title: "Prato",
  type: "document",
  fields: [
    {
      name: "language",
      type: "string",
      hidden: true,
      readOnly: true,
    },
    { name: "nome", title: "Nome", type: "string" },
    { name: "descricao", title: "Descrição", type: "text" },
    { name: "preco", title: "Preço (€)", type: "number" },
    {
      name: "ordem",
      title: "Ordem",
      type: "number",
      description: "Controla a posição deste prato dentro da categoria/subcategoria",
    },
    {
      name: "imagem",
      title: "Imagem",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "categoria",
      title: "Categoria",
      type: "reference",
      to: [{ type: "categoria" }],
    },
    {
      name: "subcategoria",
      title: "Subcategoria",
      type: "reference",
      to: [{ type: "subcategoria" }],
    },
  ],
  preview: {
    select: { title: "nome", subtitle: "language" },
    prepare({ title, subtitle }) {
      return {
        title: title || "(sem nome)",
        subtitle: subtitle ? subtitle.toUpperCase() : undefined,
      };
    },
  },
});
