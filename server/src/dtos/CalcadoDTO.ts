export type CreateCalcadoDto = {
  nome_produto: string;
  cor: string;
  marca: string;
  tamanho: number;
  preco: number;
  quantidade_em_estoque: number;
};

export type UpdateCalcadoDto = Partial<CreateCalcadoDto>;
