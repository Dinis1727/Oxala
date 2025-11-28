export const categoriasComPratos = `
*[_type == "categoria"] | order(ordem asc) {
  _id,
  nome,
  "slug": slug.current,
  "pratos": *[_type == "prato" && references(^._id)] | order(ordem asc, nome asc) {
    _id,
    nome,
    descricao,
    preco,
    "imagem": imagem.asset->url
  }
}
`;

export const vinhosPorIdioma = `
*[
  _type == "vinho" &&
  (
    language == $language || !defined(language)
  )
] | order(regiao asc, nome asc) {
  _id,
  nome,
  tipo,
  regiao,
  ano,
  preco,
  volumeMl,
  teorAlcoolico,
  "imagemUrl": imagem.asset->url
}
`;
