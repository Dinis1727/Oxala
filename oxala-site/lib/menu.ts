import { unstable_noStore as noStore } from "next/cache";
import { client } from "@/sanity/lib/client";
import { Categoria } from "@/types/menu";
import { LanguageCode, defaultLanguage } from "@/lib/i18n";

const MENU_QUERY = `
*[_type == "categoria" && coalesce(language, $baseLang) == $baseLang] | order(ordem asc, nome asc) {
  _id,
  ordem,
  "slugBase": slug.current,
  "nome": select(
    $lang == $baseLang => nome,
    coalesce(
      *[_type == "categoria" && coalesce(language, $baseLang) == $lang && ordem == ^.ordem][0].nome,
      nome
    )
  ),
  "subcategorias": *[
      _type == "subcategoria" &&
      coalesce(language, $baseLang) == $baseLang &&
      references(^._id)
    ] | order(ordem asc, nome asc) {
    _id,
    ordem,
    "nome": select(
      $lang == $baseLang => nome,
      coalesce(
        *[
          _type == "subcategoria" &&
          references(^.categoria._ref) &&
          coalesce(language, $baseLang) == $lang &&
          ordem == ^.ordem
        ][0].nome,
        nome
      )
    ),
    "pratos": *[
        _type == "prato" &&
        references(^._id) &&
        coalesce(language, $baseLang) == $lang
      ] | order(ordem asc, nome asc) {
      _id,
      preco,
      "imagemUrl": imagem.asset->url,
      nome,
      descricao
    }
  },
  "pratosSemSubcategoria": *[
      _type == "prato" &&
      references(^._id) &&
      !defined(subcategoria) &&
      coalesce(language, $baseLang) == $lang
    ] | order(ordem asc, nome asc) {
    _id,
    preco,
    "imagemUrl": imagem.asset->url,
    nome,
    descricao
  }
}
`;

export async function fetchMenu(language: LanguageCode): Promise<Categoria[]> {
  noStore();
  return client.fetch(MENU_QUERY, {
    lang: language,
    baseLang: defaultLanguage,
  });
}
