import { defineType } from "sanity";

export default defineType({
  name: "categoria",
  title: "Categoria",
  type: "document",
  fields: [
    {
      name: "language",
      type: "string",
      hidden: true,
      readOnly: true,
    },
    {
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nome", maxLength: 96 },
    },
    {
      name: "ordem",
      title: "Ordem",
      type: "number",
      description: "Usado para ordenar as categorias no menu",
    },
  ],
  orderings: [
    {
      title: "Por ordem",
      name: "ordemAsc",
      by: [{ field: "ordem", direction: "asc" }],
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
