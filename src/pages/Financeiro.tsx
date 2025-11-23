import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { FormularioFinanceiro } from '@/components/FormularioFinanceiro';
import { IDashboardFinanceiro, IRecursoFinanceiroFormData } from '@/types';
import { recursoFinanceiroService } from '@/services/mock';

export const Financeiro = () => {
  const [dashboard, setDashboard] = useState<IDashboardFinanceiro | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await recursoFinanceiroService.getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-text-light">Carregando dashboard...</p>
        </div>
      </Layout>
    );
  }

  if (!dashboard) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Erro ao carregar dashboard financeiro</p>
        </div>
      </Layout>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text">Dashboard Financeiro</h1>
          <button onClick={() => setShowForm(true)} className="btn-primary">Nova Transação</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-gradient-to-br from-primary to-primary-dark text-white">
            <p className="text-sm opacity-90">Saldo Atual</p>
            <p className="text-3xl font-bold mt-2">{formatCurrency(dashboard.saldoAtual)}</p>
          </div>

          <div className="card">
            <p className="text-sm text-text-light">Receita Mensal</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {formatCurrency(dashboard.receitaMensal)}
            </p>
            <p className="text-xs text-text-light mt-1">
              Anual: {formatCurrency(dashboard.receitaAnual)}
            </p>
          </div>

          <div className="card">
            <p className="text-sm text-text-light">Despesa Mensal</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {formatCurrency(dashboard.despesaMensal)}
            </p>
            <p className="text-xs text-text-light mt-1">
              Anual: {formatCurrency(dashboard.despesaAnual)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-text mb-4">Receitas por Categoria</h2>
            <div className="space-y-3">
              {Object.entries(dashboard.receitaPorCategoria)
                .filter(([, valor]) => valor > 0)
                .sort(([, a], [, b]) => b - a)
                .map(([categoria, valor]) => (
                  <div key={categoria} className="flex justify-between items-center">
                    <span className="text-text-light">{categoria}</span>
                    <span className="font-medium text-green-600">{formatCurrency(valor)}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-text mb-4">Despesas por Categoria</h2>
            <div className="space-y-3">
              {Object.entries(dashboard.despesaPorCategoria)
                .filter(([, valor]) => valor > 0)
                .sort(([, a], [, b]) => b - a)
                .map(([categoria, valor]) => (
                  <div key={categoria} className="flex justify-between items-center">
                    <span className="text-text-light">{categoria}</span>
                    <span className="font-medium text-red-600">{formatCurrency(valor)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-text mb-4">Transações Recentes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboard.transacoesRecentes.map(transacao => (
                  <tr key={transacao.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                      {transacao.data.toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-text">{transacao.descricao}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                      {transacao.categoria}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                        transacao.tipo === 'RECEITA' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transacao.tipo === 'RECEITA' ? '+' : '-'} {formatCurrency(transacao.valor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <FormularioFinanceiro
          onSubmit={async (data: IRecursoFinanceiroFormData) => {
            await recursoFinanceiroService.create(data);
            window.location.reload();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </Layout>
  );
};
