import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { FormularioConsulta } from '@/components/FormularioConsulta';
import { consultaService } from '@/services/mock';
import { IConsulta, IConsultaFormData, StatusConsulta } from '@/types';

export const Consultas = () => {
  const [consultas, setConsultas] = useState<IConsulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingConsulta, setEditingConsulta] = useState<IConsulta | null>(null);
  const [filterStatus, setFilterStatus] = useState<StatusConsulta | 'TODOS'>('TODOS');

  useEffect(() => {
    loadConsultas();
  }, []);

  const loadConsultas = async () => {
    try {
      const data = await consultaService.getAll();
      setConsultas(data);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: IConsultaFormData) => {
    try {
      if (editingConsulta) {
        await consultaService.update(editingConsulta.id, data);
      } else {
        await consultaService.create(data);
      }
      await loadConsultas();
      setShowForm(false);
      setEditingConsulta(null);
    } catch (error) {
      console.error('Erro ao salvar consulta:', error);
    }
  };

  const handleEdit = (consulta: IConsulta) => {
    setEditingConsulta(consulta);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta consulta?')) {
      try {
        await consultaService.delete(id);
        await loadConsultas();
      } catch (error) {
        console.error('Erro ao excluir consulta:', error);
      }
    }
  };

  const getStatusColor = (status: StatusConsulta) => {
    switch (status) {
      case StatusConsulta.AGENDADO:
        return 'bg-blue-100 text-blue-800';
      case StatusConsulta.REALIZADO:
        return 'bg-green-100 text-green-800';
      case StatusConsulta.CANCELADO:
        return 'bg-red-100 text-red-800';
      case StatusConsulta.AUSENTE:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredConsultas = filterStatus === 'TODOS'
    ? consultas
    : consultas.filter(c => c.status === filterStatus);

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-text">Consultas</h1>
            <p className="text-text-light mt-1">Gerencie as consultas realizadas</p>
          </div>
          <button
            onClick={() => {
              setEditingConsulta(null);
              setShowForm(true);
            }}
            className="btn-primary"
          >
            + Nova Consulta
          </button>
        </div>

        <div className="card">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatus('TODOS')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'TODOS'
                  ? 'bg-primary text-white'
                  : 'bg-background text-text hover:bg-background-pink'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus(StatusConsulta.AGENDADO)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === StatusConsulta.AGENDADO
                  ? 'bg-primary text-white'
                  : 'bg-background text-text hover:bg-background-pink'
              }`}
            >
              Agendados
            </button>
            <button
              onClick={() => setFilterStatus(StatusConsulta.REALIZADO)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === StatusConsulta.REALIZADO
                  ? 'bg-primary text-white'
                  : 'bg-background text-text hover:bg-background-pink'
              }`}
            >
              Realizados
            </button>
            <button
              onClick={() => setFilterStatus(StatusConsulta.CANCELADO)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === StatusConsulta.CANCELADO
                  ? 'bg-primary text-white'
                  : 'bg-background text-text hover:bg-background-pink'
              }`}
            >
              Cancelados
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredConsultas.map(consulta => (
            <div key={consulta.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-text">
                      {new Date(consulta.dataHora).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(consulta.dataHora).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(consulta.status)}`}>
                      {consulta.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-text-light">
                    <p>
                      <span className="font-medium text-text">Animal:</span> Rex
                    </p>
                    <p>
                      <span className="font-medium text-text">Veterinário:</span> Dr. Carlos Silva
                    </p>
                    <p>
                      <span className="font-medium text-text">Motivo:</span> {consulta.motivo}
                    </p>
                    {consulta.valorTotal && (
                      <p>
                        <span className="font-medium text-text">Valor:</span> R${' '}
                        {consulta.valorTotal.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(consulta)}
                    className="btn-outline text-sm py-2 px-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(consulta.id)}
                    className="btn-outline text-sm py-2 px-4 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredConsultas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light">Nenhuma consulta encontrada</p>
          </div>
        )}
      </div>

      {showForm && (
        <FormularioConsulta
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingConsulta(null);
          }}
          initialData={editingConsulta || undefined}
        />
      )}
    </Layout>
  );
};
