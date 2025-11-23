import { IRecursoFinanceiro, IRecursoFinanceiroFormData, TipoTransacao, CategoriaTransacao, IDashboardFinanceiro } from '@/types';
import { startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from 'date-fns';

let mockRecursos: IRecursoFinanceiro[] = [
  {
    id: '1',
    tipo: TipoTransacao.RECEITA,
    valor: 150.00,
    data: new Date('2024-11-20'),
    descricao: 'Consulta - Rex',
    categoria: CategoriaTransacao.CONSULTA,
    consultaId: '1',
    dataCadastro: new Date('2024-11-20'),
    dataAtualizacao: new Date('2024-11-20'),
  },
  {
    id: '2',
    tipo: TipoTransacao.DESPESA,
    valor: 500.00,
    data: new Date('2024-11-15'),
    descricao: 'Compra de medicamentos',
    categoria: CategoriaTransacao.MEDICAMENTO,
    dataCadastro: new Date('2024-11-15'),
    dataAtualizacao: new Date('2024-11-15'),
  },
  {
    id: '3',
    tipo: TipoTransacao.RECEITA,
    valor: 80.00,
    data: new Date('2024-11-18'),
    descricao: 'Vacinação - Mimi',
    categoria: CategoriaTransacao.VACINA,
    dataCadastro: new Date('2024-11-18'),
    dataAtualizacao: new Date('2024-11-18'),
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const recursoFinanceiroService = {
  async getAll(): Promise<IRecursoFinanceiro[]> {
    await delay(600);
    return [...mockRecursos];
  },

  async getById(id: string): Promise<IRecursoFinanceiro> {
    await delay(400);
    const recurso = mockRecursos.find(r => r.id === id);
    
    if (!recurso) {
      throw new Error('Recurso financeiro não encontrado');
    }
    
    return { ...recurso };
  },

  async getByPeriodo(inicio: Date, fim: Date): Promise<IRecursoFinanceiro[]> {
    await delay(500);
    return mockRecursos.filter(r =>
      isWithinInterval(r.data, { start: inicio, end: fim })
    );
  },

  async getDashboard(): Promise<IDashboardFinanceiro> {
    await delay(800);
    
    const hoje = new Date();
    const inicioMes = startOfMonth(hoje);
    const fimMes = endOfMonth(hoje);
    const inicioAno = startOfYear(hoje);
    const fimAno = endOfYear(hoje);
    
    const recursosMes = mockRecursos.filter(r =>
      isWithinInterval(r.data, { start: inicioMes, end: fimMes })
    );
    
    const recursosAno = mockRecursos.filter(r =>
      isWithinInterval(r.data, { start: inicioAno, end: fimAno })
    );
    
    const receitaMensal = recursosMes
      .filter(r => r.tipo === TipoTransacao.RECEITA)
      .reduce((sum, r) => sum + r.valor, 0);
    
    const despesaMensal = recursosMes
      .filter(r => r.tipo === TipoTransacao.DESPESA)
      .reduce((sum, r) => sum + r.valor, 0);
    
    const receitaAnual = recursosAno
      .filter(r => r.tipo === TipoTransacao.RECEITA)
      .reduce((sum, r) => sum + r.valor, 0);
    
    const despesaAnual = recursosAno
      .filter(r => r.tipo === TipoTransacao.DESPESA)
      .reduce((sum, r) => sum + r.valor, 0);
    
    const receitaPorCategoria = {} as Record<CategoriaTransacao, number>;
    const despesaPorCategoria = {} as Record<CategoriaTransacao, number>;
    
    Object.values(CategoriaTransacao).forEach(cat => {
      receitaPorCategoria[cat] = 0;
      despesaPorCategoria[cat] = 0;
    });
    
    mockRecursos.forEach(r => {
      if (r.tipo === TipoTransacao.RECEITA) {
        receitaPorCategoria[r.categoria] += r.valor;
      } else {
        despesaPorCategoria[r.categoria] += r.valor;
      }
    });
    
    return {
      saldoAtual: receitaAnual - despesaAnual,
      receitaMensal,
      despesaMensal,
      receitaAnual,
      despesaAnual,
      transacoesRecentes: mockRecursos.slice(-5).reverse(),
      receitaPorCategoria,
      despesaPorCategoria,
    };
  },

  async create(data: IRecursoFinanceiroFormData): Promise<IRecursoFinanceiro> {
    await delay(800);
    
    const novoRecurso: IRecursoFinanceiro = {
      id: Date.now().toString(),
      ...data,
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    };
    
    mockRecursos.push(novoRecurso);
    return { ...novoRecurso };
  },

  async update(id: string, data: Partial<IRecursoFinanceiroFormData>): Promise<IRecursoFinanceiro> {
    await delay(800);
    
    const index = mockRecursos.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Recurso financeiro não encontrado');
    }
    
    mockRecursos[index] = {
      ...mockRecursos[index],
      ...data,
      dataAtualizacao: new Date(),
    };
    
    return { ...mockRecursos[index] };
  },

  async delete(id: string): Promise<void> {
    await delay(600);
    
    const index = mockRecursos.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Recurso financeiro não encontrado');
    }
    
    mockRecursos.splice(index, 1);
  },
};
