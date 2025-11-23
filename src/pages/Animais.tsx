import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { FormularioAnimal } from '@/components/FormularioAnimal';
import { animalService } from '@/services/mock';
import { IAnimal, IAnimalFormData } from '@/types';

export const Animais = () => {
  const [animais, setAnimais] = useState<IAnimal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<IAnimal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAnimais();
  }, []);

  const loadAnimais = async () => {
    try {
      const data = await animalService.getAll();
      setAnimais(data);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: IAnimalFormData) => {
    try {
      if (editingAnimal) {
        await animalService.update(editingAnimal.id, data);
      } else {
        await animalService.create(data);
      }
      await loadAnimais();
      setShowForm(false);
      setEditingAnimal(null);
    } catch (error) {
      console.error('Erro ao salvar animal:', error);
    }
  };

  const handleEdit = (animal: IAnimal) => {
    setEditingAnimal(animal);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este animal?')) {
      try {
        await animalService.delete(id);
        await loadAnimais();
      } catch (error) {
        console.error('Erro ao excluir animal:', error);
      }
    }
  };

  const filteredAnimais = animais.filter(animal =>
    animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.raca.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-text">Animais</h1>
            <p className="text-text-light mt-1">Gerencie os animais cadastrados</p>
          </div>
          <button
            onClick={() => {
              setEditingAnimal(null);
              setShowForm(true);
            }}
            className="btn-primary"
          >
            + Novo Animal
          </button>
        </div>

        <div className="card">
          <input
            type="text"
            placeholder="Buscar por nome ou raça..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimais.map(animal => (
            <div key={animal.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-background-pink rounded-lg flex items-center justify-center text-3xl">
                  {animal.foto ? (
                    <img src={animal.foto} alt={animal.nome} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    '🐾'
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text">{animal.nome}</h3>
                  <p className="text-sm text-text-light">{animal.especie} - {animal.raca}</p>
                  <p className="text-sm text-text-light mt-1">
                    {animal.sexo} {animal.peso && `• ${animal.peso}kg`}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-text-light mb-3">
                  Responsável: <span className="text-text font-medium">João Pedro</span>
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(animal)}
                    className="btn-outline flex-1 text-sm py-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(animal.id)}
                    className="btn-outline flex-1 text-sm py-2 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAnimais.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light">Nenhum animal encontrado</p>
          </div>
        )}
      </div>

      {showForm && (
        <FormularioAnimal
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingAnimal(null);
          }}
          initialData={editingAnimal || undefined}
        />
      )}
    </Layout>
  );
};
