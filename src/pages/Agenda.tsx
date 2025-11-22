import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { SchedulerCalendar } from '@/components/SchedulerCalendar';
import { FormularioConsulta } from '@/components/FormularioConsulta';
import { useAppointmentScheduler } from '@/hooks/useAppointmentScheduler';
import { consultaService } from '@/services/mock';
import { IConsultaFormData } from '@/types';

export const Agenda = () => {
  const [showForm, setShowForm] = useState(false);

  const {
    agenda,
    isLoading,
    error,
    visualizacao,
    tituloVisualizacao,
    consultasPorStatus,
    fetchAgenda,
    proximoPeriodo,
    periodoAnterior,
    hoje,
    alterarVisualizacao,
    selecionarConsulta,
  } = useAppointmentScheduler();

  useEffect(() => {
    fetchAgenda();
  }, [fetchAgenda]);

  if (isLoading && agenda.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-text-light">Carregando agenda...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text">Agenda</h1>
          <button onClick={() => setShowForm(true)} className="btn-primary">Nova Consulta</button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="card">
            <p className="text-sm text-text-light">Agendadas</p>
            <p className="text-2xl font-bold text-blue-600">{consultasPorStatus.agendadas}</p>
          </div>
          <div className="card">
            <p className="text-sm text-text-light">Realizadas</p>
            <p className="text-2xl font-bold text-green-600">{consultasPorStatus.realizadas}</p>
          </div>
          <div className="card">
            <p className="text-sm text-text-light">Canceladas</p>
            <p className="text-2xl font-bold text-red-600">{consultasPorStatus.canceladas}</p>
          </div>
          <div className="card">
            <p className="text-sm text-text-light">Ausentes</p>
            <p className="text-2xl font-bold text-gray-600">{consultasPorStatus.ausentes}</p>
          </div>
        </div>

        <SchedulerCalendar
          visualizacao={visualizacao}
          onVisualizacaoChange={alterarVisualizacao}
          onProximo={proximoPeriodo}
          onAnterior={periodoAnterior}
          onHoje={hoje}
          titulo={tituloVisualizacao}
        >
          <SchedulerCalendar.Header />
          <SchedulerCalendar.Body>
            <div className="space-y-3">
              {agenda.length === 0 ? (
                <p className="text-center text-text-light py-8">
                  Nenhuma consulta agendada para este período
                </p>
              ) : (
                agenda.map(consulta => (
                  <SchedulerCalendar.Event
                    key={consulta.id}
                    id={consulta.id}
                    dataHora={consulta.dataHora}
                    titulo={`${consulta.animalNome} - ${consulta.responsavelNome}`}
                    subtitulo={`Dr(a). ${consulta.veterinarioNome}`}
                    status={consulta.status}
                    onClick={() => selecionarConsulta(consulta.id)}
                  />
                ))
              )}
            </div>
          </SchedulerCalendar.Body>
        </SchedulerCalendar>
      </div>

      {showForm && (
        <FormularioConsulta
          onSubmit={async (data: IConsultaFormData) => {
            await consultaService.create(data);
            await fetchAgenda();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </Layout>
  );
};
