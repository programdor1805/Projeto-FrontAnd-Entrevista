export interface Produto {
    id?: number;
    codigo: string;
    descricao: string;
    departamentoId: number;
    preco: number;
    status: boolean;
  }