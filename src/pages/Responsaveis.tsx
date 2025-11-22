import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FormularioResponsavel } from '@/components/FormularioResponsavel';
import { useResponsaveis } from '@/hooks/useResponsaveis';
import { responsavelService } from '@/services/mock';
import { IResponsavel, IResponsavelFormData } from '@/types';

export const Responsaveis = () => {
  const { responsaveis, isLoading, error, deleteResponsavel, searchResponsaveis } = useResponsaveis();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingResponsavel, setEditingResponsavel] = useState<IResponsavel | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchResponsaveis(query);
    }
  };

  const handleDelete = async (id: string, nome: string) => {
    if (window.confirm(`Deseja realmente excluir o responsável ${nome}?`)) {
      try {
        await deleteResponsavel(id);
      } catch (error) {
        console.error('Erro ao excluir:', error);
      }
    }
  };

  const maskCpfCnpj = (cpfCnpj: string) => {
    const numbers = cpfCnpj.replace(/\D/g, '');
    if (numbers.length <= 3) return cpfCnpj;
    return `${numbers.substring(0, 3)}.***.***-**`;
  };

  if (isLoading && responsaveis.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-text-light">Carregando responsáveis...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text">Responsáveis</h1>
          <button onClick={() => { setEditingResponsavel(null); setShowForm(true); }} className="btn-primary">Novo Responsável</button>
        </div>

        <div className="card">
          <input
            type="text"
            placeholder="Buscar por nome, CPF/CNPJ, telefone ou e-mail..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="input-field"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {responsaveis.map(responsavel => (
            <div key={responsavel.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text">{responsavel.nomeCompleto}</h3>
                  <p className="text-sm text-text-light">{maskCpfCnpj(responsavel.cpfCnpj)}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <span className="text-text-light w-20">Telefone:</span>
                  <span className="text-text">{responsavel.telefone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-text-light w-20">E-mail:</span>
                  <span className="text-text">{responsavel.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-text-light w-20">Cidade:</span>
                  <span className="text-text">
                    {responsavel.endereco.cidade} - {responsavel.endereco.estado}
                  </span>
                </div>
              </div>

              {responsavel.observacoes && (
                <div className="mb-4 p-2 bg-background-pink rounded-lg">
                  <p className="text-sm text-text-light">{responsavel.observacoes}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <button onClick={() => { setEditingResponsavel(responsavel); setShowForm(true); }} className="btn-outline flex-1 py-2 text-sm">Editar</button>
                <button
                  onClick={() => handleDelete(responsavel.id, responsavel.nomeCompleto)}
                  className="btn-secondary flex-1 py-2 text-sm bg-red-600 hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {responsaveis.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-text-light">Nenhum responsável encontrado</p>
          </div>
        )}
      </div>

      {showForm && (
        <FormularioResponsavel
          onSubmit={async (data: IResponsavelFormData) => {
            if (editingResponsavel) {
              await responsavelService.update(editingResponsavel.id, data);
            } else {
              await responsavelService.create(data);
            }
            window.location.reload();
          }}
          onCancel={() => { setShowForm(false); setEditingResponsavel(null); }}
          initialData={editingResponsavel || undefined}
        />
      )}
    </Layout>
  );
};
