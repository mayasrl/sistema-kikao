import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { responsavelService, animalService, consultaService, recursoFinanceiroService } from '@/services/mock';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalResponsaveis: 0,
    totalAnimais: 0,
    consultasHoje: 0,
    consultasSemana: 0,
    saldoMensal: 0,
    receitaMensal: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [responsaveis, animais, consultas, dashboard] = await Promise.all([
          responsavelService.getAll(),
          animalService.getAll(),
          consultaService.getAll(),
          recursoFinanceiroService.getDashboard(),
        ]);

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const consultasHoje = consultas.filter(c => {
          const dataConsulta = new Date(c.dataHora);
          dataConsulta.setHours(0, 0, 0, 0);
          return dataConsulta.getTime() === hoje.getTime();
        }).length;

        const semanaAtras = new Date();
        semanaAtras.setDate(semanaAtras.getDate() - 7);
        const consultasSemana = consultas.filter(c => 
          new Date(c.dataHora) >= semanaAtras
        ).length;

        setStats({
          totalResponsaveis: responsaveis.length,
          totalAnimais: animais.length,
          consultasHoje,
          consultasSemana,
          saldoMensal: dashboard.receitaMensal - dashboard.despesaMensal,
          receitaMensal: dashboard.receitaMensal,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-text-light">Carregando...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-text-light mt-1">Visão geral do sistema</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/responsaveis" className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light">Total de Responsáveis</p>
                <p className="text-3xl font-bold text-primary mt-2">{stats.totalResponsaveis}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </Link>

          <Link to="/animais" className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light">Total de Animais</p>
                <p className="text-3xl font-bold text-primary mt-2">{stats.totalAnimais}</p>
              </div>
              <div className="text-4xl">🐾</div>
            </div>
          </Link>

          <Link to="/agenda" className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light">Consultas Hoje</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.consultasHoje}</p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </Link>

          <Link to="/consultas" className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light">Consultas esta Semana</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.consultasSemana}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </Link>

          <Link to="/financeiro" className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light">Receita Mensal</p>
                <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(stats.receitaMensal)}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </Link>

          <div className="card bg-gradient-to-br from-primary to-primary-dark text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Saldo Mensal</p>
                <p className="text-2xl font-bold mt-2">{formatCurrency(stats.saldoMensal)}</p>
              </div>
              <div className="text-4xl">💵</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-text mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              <Link
                to="/agenda"
                className="flex items-center justify-between p-3 bg-background-pink rounded-lg hover:bg-primary-light transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📅</span>
                  <span className="font-medium text-text">Nova Consulta</span>
                </div>
                <span className="text-primary">→</span>
              </Link>

              <Link
                to="/responsaveis"
                className="flex items-center justify-between p-3 bg-background-pink rounded-lg hover:bg-primary-light transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👥</span>
                  <span className="font-medium text-text">Cadastrar Responsável</span>
                </div>
                <span className="text-primary">→</span>
              </Link>

              <Link
                to="/animais"
                className="flex items-center justify-between p-3 bg-background-pink rounded-lg hover:bg-primary-light transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🐾</span>
                  <span className="font-medium text-text">Cadastrar Animal</span>
                </div>
                <span className="text-primary">→</span>
              </Link>

              <Link
                to="/financeiro"
                className="flex items-center justify-between p-3 bg-background-pink rounded-lg hover:bg-primary-light transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💰</span>
                  <span className="font-medium text-text">Registrar Transação</span>
                </div>
                <span className="text-primary">→</span>
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-text mb-4">Atividades Recentes</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-background rounded-lg">
                <span className="text-xl">✅</span>
                <div>
                  <p className="text-sm font-medium text-text">Consulta realizada</p>
                  <p className="text-xs text-text-light">Rex - Consulta de rotina</p>
                  <p className="text-xs text-text-light mt-1">Há 2 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-background rounded-lg">
                <span className="text-xl">🐾</span>
                <div>
                  <p className="text-sm font-medium text-text">Novo animal cadastrado</p>
                  <p className="text-xs text-text-light">Mimi - Siamês</p>
                  <p className="text-xs text-text-light mt-1">Há 5 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-background rounded-lg">
                <span className="text-xl">💰</span>
                <div>
                  <p className="text-sm font-medium text-text">Receita registrada</p>
                  <p className="text-xs text-text-light">Vacinação - R$ 80,00</p>
                  <p className="text-xs text-text-light mt-1">Há 1 dia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
