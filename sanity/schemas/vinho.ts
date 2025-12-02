import { defineType } from 'sanity'

export default defineType({
  name: 'vinho',
  title: 'Vinho',
  type: 'document',
  fields: [
    {name: 'language', type: 'string', hidden: true, readOnly: true},
    { name: 'nome', title: 'Nome', type: 'string' },
    {
      name: 'tipo',
      title: 'Tipo (tinto, branco, verde, etc.)',
      type: 'string',
      options: {
        list: [
          { title: 'Verde', value: 'Verde' },
          { title: 'Branco', value: 'Branco' },
          { title: 'Tinto', value: 'Tinto' },
          { title: 'Rosé', value: 'Rosé' },
          { title: 'Espumantes', value: 'Espumantes' },
          { title: 'Sangrias', value: 'Sangrias' },
          { title: 'Magnums', value: 'Magnums' },
          { title: 'Cafetaria', value: 'Cafetaria' },
          { title: 'Champagnes', value: 'Champagnes' },
          { title: "Gin's & Vodkas", value: "Gin's & Vodkas" },
          { title: 'Aguardentes e Cognac', value: 'Aguardentes e Cognac' },
          { title: 'Whiskys', value: 'Whiskys' },
          { title: 'Madeira', value: 'Madeira' },
          { title: 'Portos', value: 'Portos' },
          { title: 'Águas, Refrigerantes e Cervejas', value: 'Águas, Refrigerantes e Cervejas' },
        ],
      },
    },
    {
      name: 'regiao',
      title: 'Região',
      type: 'string',
      options: {
        list: [
          { title: 'Trás-os-Montes', value: 'Trás-os-Montes' },
          { title: 'Douro', value: 'Douro' },
          { title: 'Távora-Varosa', value: 'Távora-Varosa' },
          { title: 'Dão', value: 'Dão' },
          { title: 'Beira Interior', value: 'Beira Interior' },
          { title: 'Bairrada', value: 'Bairrada' },
          { title: 'Lisboa', value: 'Lisboa' },
          { title: 'Tejo', value: 'Tejo' },
          { title: 'Península de Setúbal', value: 'Península de Setúbal' },
          { title: 'Alentejo', value: 'Alentejo' },
          { title: 'Algarve', value: 'Algarve' },
          { title: 'Madeira', value: 'Madeira' },
          { title: 'Açores', value: 'Açores' },
        ],
      },
    },
    { name: 'ano', title: 'Ano (colheita)', type: 'number' },
    { name: 'preco', title: 'Preço (€)', type: 'number' },
    { name: 'imagem', title: 'Imagem', type: 'image', options: { hotspot: true } },
    {
      name: 'volumeMl',
      title: 'Quantidade da garrafa (ml)',
      type: 'number',
      initialValue: 750,
      options: {
        list: [
          { title: 'Piccolo: 187,5 ml', value: 187.5 },
          { title: 'Meia garrafa: 375 ml', value: 375 },
          { title: 'Garrafa padrão: 750 ml', value: 750 },
          { title: 'Magnum: 1,5 L (1500 ml)', value: 1500 },
          { title: 'Jeroboão: 3 L (3000 ml)', value: 3000 },
          { title: 'Roboão: 4,5 L (4500 ml)', value: 4500 },
          { title: 'Matusalém: 6 L (6000 ml)', value: 6000 },
          { title: 'Salmanazar: 9 L (9000 ml)', value: 9000 },
          { title: 'Baltazar: 12 L (12000 ml)', value: 12000 },
          { title: 'Nabucodonosor: 15 L (15000 ml)', value: 15000 },
          { title: 'Salomão: 18 L (18000 ml)', value: 18000 },
          { title: 'Golias: 27 L (27000 ml)', value: 27000 },
          { title: 'Melchizedec: 30 L (30000 ml)', value: 30000 },
        ],
      },
    },
    {
      name: 'teorAlcoolico',
      title: 'Teor alcoólico (% vol.)',
      type: 'number',
      description: 'Percentagem de álcool por volume (ABV)',
    },
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
