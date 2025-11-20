import { defineType } from 'sanity'

export default defineType({
  name: 'vinho',
  title: 'Vinho',
  type: 'document',
  fields: [
    {name: 'language', type: 'string', hidden: true, readOnly: true},
    { name: 'nome', title: 'Nome', type: 'string' },
    { name: 'tipo', title: 'Tipo (tinto, branco, verde, etc.)', type: 'string' },
    { name: 'regiao', title: 'Região', type: 'string' },
    { name: 'preco', title: 'Preço (€)', type: 'number' },
    { name: 'imagem', title: 'Imagem', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: {title: 'nome', subtitle: 'language'},
    prepare({title, subtitle}) {
      return {
        title: title || '(sem nome)',
        subtitle: subtitle ? subtitle.toUpperCase() : undefined,
      }
    },
  },
})
