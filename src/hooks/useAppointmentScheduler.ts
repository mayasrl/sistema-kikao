import { useState, useCallback, useMemo } from 'react';
import { IConsulta, IAgendaConsulta, StatusConsulta, VisualizacaoAgenda } from '@/types';
import { consultaService } from '@/services/mock';
import { format, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const useAppointmentScheduler = () => {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [visualizacao, setVisualizacao] = useState<VisualizacaoAgenda>('semana');
  const [agenda, setAgenda] = useState<IAgendaConsulta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consultaSelecionada, setConsultaSelecionada] = useState<IConsulta | null>(null);

  const fetchAgenda = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await consultaService.getAgenda(dataAtual, visualizacao);
      setAgenda(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar agenda');
    } finally {
      setIsLoading(false);
    }
  }, [dataAtual, visualizacao]);

  const proximoPeriodo = useCallback(() => {
    setDataAtual(prev => {
      switch (visualizacao) {
        case 'dia':
          return addDays(prev, 1);
        case 'semana':
          return addWeeks(prev, 1);
        case 'mes':
          return addMonths(prev, 1);
        default:
          return prev;
      }
    });
  }, [visualizacao]);

  const periodoAnterior = useCallback(() => {
    setDataAtual(prev => {
      switch (visualizacao) {
        case 'dia':
          return subDays(prev, 1);
        case 'semana':
          return subWeeks(prev, 1);
        case 'mes':
          return subMonths(prev, 1);
        default:
          return prev;
      }
    });
  }, [visualizacao]);

  const hoje = useCallback(() => {
    setDataAtual(new Date());
  }, []);

  const alterarVisualizacao = useCallback((novaVisualizacao: VisualizacaoAgenda) => {
    setVisualizacao(novaVisualizacao);
  }, []);

  const atualizarStatusConsulta = useCallback(async (id: string, status: StatusConsulta) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await consultaService.updateStatus(id, status);
      await fetchAgenda();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchAgenda]);

  const selecionarConsulta = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const consulta = await consultaService.getById(id);
      setConsultaSelecionada(consulta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar consulta');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const limparSelecao = useCallback(() => {
    setConsultaSelecionada(null);
  }, []);

  const tituloVisualizacao = useMemo(() => {
    switch (visualizacao) {
      case 'dia':
        return format(dataAtual, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
      case 'semana':
        return format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR });
      case 'mes':
        return format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR });
      default:
        return '';
    }
  }, [dataAtual, visualizacao]);

  const consultasPorStatus = useMemo(() => {
    return {
      agendadas: agenda.filter(c => c.status === StatusConsulta.AGENDADO).length,
      realizadas: agenda.filter(c => c.status === StatusConsulta.REALIZADO).length,
      canceladas: agenda.filter(c => c.status === StatusConsulta.CANCELADO).length,
      ausentes: agenda.filter(c => c.status === StatusConsulta.AUSENTE).length,
    };
  }, [agenda]);

  return {
    dataAtual,
    visualizacao,
    agenda,
    isLoading,
    error,
    consultaSelecionada,
    tituloVisualizacao,
    consultasPorStatus,
    fetchAgenda,
    proximoPeriodo,
    periodoAnterior,
    hoje,
    alterarVisualizacao,
    atualizarStatusConsulta,
    selecionarConsulta,
    limparSelecao,
  };
};
