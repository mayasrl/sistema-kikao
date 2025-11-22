import { ReactNode, createContext, useContext } from 'react';
import { VisualizacaoAgenda, StatusConsulta } from '@/types';

interface SchedulerCalendarContextValue {
  visualizacao: VisualizacaoAgenda;
  onVisualizacaoChange: (visualizacao: VisualizacaoAgenda) => void;
  onProximo: () => void;
  onAnterior: () => void;
  onHoje: () => void;
  titulo: string;
}

const SchedulerCalendarContext = createContext<SchedulerCalendarContextValue | null>(null);

const useSchedulerCalendarContext = () => {
  const context = useContext(SchedulerCalendarContext);
  if (!context) {
    throw new Error('Componente deve ser usado dentro de SchedulerCalendar');
  }
  return context;
};

interface SchedulerCalendarProps {
  children: ReactNode;
  visualizacao: VisualizacaoAgenda;
  onVisualizacaoChange: (visualizacao: VisualizacaoAgenda) => void;
  onProximo: () => void;
  onAnterior: () => void;
  onHoje: () => void;
  titulo: string;
}

const SchedulerCalendarRoot = ({
  children,
  visualizacao,
  onVisualizacaoChange,
  onProximo,
  onAnterior,
  onHoje,
  titulo,
}: SchedulerCalendarProps) => {
  return (
    <SchedulerCalendarContext.Provider
      value={{
        visualizacao,
        onVisualizacaoChange,
        onProximo,
        onAnterior,
        onHoje,
        titulo,
      }}
    >
      <div className="bg-white rounded-lg shadow-sm">
        {children}
      </div>
    </SchedulerCalendarContext.Provider>
  );
};

const SchedulerCalendarHeader = () => {
  const { titulo, onAnterior, onProximo, onHoje, visualizacao, onVisualizacaoChange } =
    useSchedulerCalendarContext();

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-text">{titulo}</h2>
          <button onClick={onHoje} className="btn-outline py-1 px-3 text-sm">
            Hoje
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => onVisualizacaoChange('dia')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                visualizacao === 'dia'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-light hover:bg-gray-200'
              }`}
            >
              Dia
            </button>
            <button
              onClick={() => onVisualizacaoChange('semana')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                visualizacao === 'semana'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-light hover:bg-gray-200'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => onVisualizacaoChange('mes')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                visualizacao === 'mes'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-light hover:bg-gray-200'
              }`}
            >
              Mês
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onAnterior}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Período anterior"
            >
              ←
            </button>
            <button
              onClick={onProximo}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Próximo período"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SchedulerCalendarBodyProps {
  children: ReactNode;
}

const SchedulerCalendarBody = ({ children }: SchedulerCalendarBodyProps) => {
  return <div className="p-4">{children}</div>;
};

interface SchedulerCalendarEventProps {
  id: string;
  dataHora: Date;
  titulo: string;
  subtitulo: string;
  status: StatusConsulta;
  onClick?: () => void;
}

const SchedulerCalendarEvent = ({
  dataHora,
  titulo,
  subtitulo,
  status,
  onClick,
}: SchedulerCalendarEventProps) => {
  const statusColors = {
    [StatusConsulta.AGENDADO]: 'bg-blue-100 border-blue-500 text-blue-900',
    [StatusConsulta.REALIZADO]: 'bg-green-100 border-green-500 text-green-900',
    [StatusConsulta.CANCELADO]: 'bg-red-100 border-red-500 text-red-900',
    [StatusConsulta.AUSENTE]: 'bg-gray-100 border-gray-500 text-gray-900',
  };

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${statusColors[status]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{titulo}</p>
          <p className="text-sm opacity-75">{subtitulo}</p>
        </div>
        <span className="text-sm font-medium">
          {dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export const SchedulerCalendar = Object.assign(SchedulerCalendarRoot, {
  Header: SchedulerCalendarHeader,
  Body: SchedulerCalendarBody,
  Event: SchedulerCalendarEvent,
});
