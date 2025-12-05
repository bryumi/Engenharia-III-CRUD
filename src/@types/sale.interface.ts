export interface ISale {
  codigoSale: string;
  description: string;
  tipo: string;
  valor: string;
  validoAte: string;
  acumulativa: boolean;
  ativa: boolean;
  id: string;
  isActive: boolean;
  deletedAt: string | null;
  created_at: string;
  updated_at: string;
}
export interface ISaleResponse {
  sales: ISale[];
  count: number;
}
