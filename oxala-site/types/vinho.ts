export interface Vinho {
  _id: string;
  nome: string;
  tipo?: string;
  regiao?: string;
  ano?: number;
  preco?: number;
  volumeMl?: number;
  teorAlcoolico?: number;
  imagemUrl?: string;
}
