export interface Prato {
  _id: string;
  nome: string;
  descricao?: string;
  preco?: number;
  imagemUrl?: string;
}

export interface Subcategoria {
  _id: string;
  nome: string;
  ordem?: number;
  pratos: Prato[];
}

export interface Categoria {
  _id: string;
  nome: string;
  slugBase?: string;
  slug?: { current: string };
  ordem?: number;
  subcategorias: Subcategoria[];
  pratosSemSubcategoria: Prato[];
}
