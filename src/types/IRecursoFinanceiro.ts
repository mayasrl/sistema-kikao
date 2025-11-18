export interface IRecursoFinanceiro {
  id: string;
  tipo: TipoTransacao;
  valor: number;
  data: Date;
  descricao: string;
  categoria: CategoriaTransacao;
  consultaId?: string;
  servicoId?: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
}

export enum TipoTransacao {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
}

export enum CategoriaTransacao {
  CONSULTA = 'CONSULTA',
  CIRURGIA = 'CIRURGIA',
  EXAME = 'EXAME',
  VACINA = 'VACINA',
  MEDICAMENTO = 'MEDICAMENTO',
  HOSPEDAGEM = 'HOSPEDAGEM',
  BANHO_TOSA = 'BANHO_TOSA',
  INSUMOS = 'INSUMOS',
  SALARIOS = 'SALARIOS',
  ALUGUEL = 'ALUGUEL',
  OUTROS = 'OUTROS',
}

export interface IRecursoFinanceiroFormData {
  tipo: TipoTransacao;
  valor: number;
  data: Date;
  descricao: string;
  categoria: CategoriaTransacao;
  consultaId?: string;
  servicoId?: string;
}

export interface IDashboardFinanceiro {
  saldoAtual: number;
  receitaMensal: number;
  despesaMensal: number;
  receitaAnual: number;
  despesaAnual: number;
  transacoesRecentes: IRecursoFinanceiro[];
  receitaPorCategoria: Record<CategoriaTransacao, number>;
  despesaPorCategoria: Record<CategoriaTransacao, number>;
}
