import { defineType } from "sanity";

export default defineType({
  name: "subcategoria",
  title: "Subcategoria",
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
      name: "categoria",
      title: "Categoria Principal",
      type: "reference",
      to: [{ type: "categoria" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ordem",
      title: "Ordem",
      type: "number",
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
