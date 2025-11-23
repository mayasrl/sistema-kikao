import { useState, FormEvent, ChangeEvent } from 'react';
import { IAnimalFormData, EspecieAnimal, SexoAnimal } from '@/types';

interface FormularioAnimalProps {
  onSubmit: (data: IAnimalFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<IAnimalFormData>;
}

export const FormularioAnimal = ({ onSubmit, onCancel, initialData }: FormularioAnimalProps) => {
  const [formData, setFormData] = useState<IAnimalFormData>({
    nome: initialData?.nome || '',
    especie: initialData?.especie || EspecieAnimal.CANINO,
    raca: initialData?.raca || '',
    sexo: initialData?.sexo || SexoAnimal.MACHO,
    dataNascimento: initialData?.dataNascimento,
    idadeEstimada: initialData?.idadeEstimada,
    peso: initialData?.peso,
    microchip: initialData?.microchip,
    foto: initialData?.foto,
    responsavelId: initialData?.responsavelId || '',
  });

  const [fotoPreview, setFotoPreview] = useState<string | null>(
    typeof initialData?.foto === 'string' ? initialData.foto : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof IAnimalFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, foto: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-text">
            {initialData ? 'Editar Animal' : 'Novo Animal'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Nome</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Responsável</label>
              <select
                value={formData.responsavelId}
                onChange={(e) => handleChange('responsavelId', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Selecione</option>
                <option value="1">João Pedro Oliveira</option>
                <option value="2">Maria Fernanda Costa</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Espécie</label>
              <select
                value={formData.especie}
                onChange={(e) => handleChange('especie', e.target.value as EspecieAnimal)}
                className="input-field"
                required
              >
                <option value={EspecieAnimal.CANINO}>Canino</option>
                <option value={EspecieAnimal.FELINO}>Felino</option>
                <option value={EspecieAnimal.AVE}>Ave</option>
                <option value={EspecieAnimal.ROEDOR}>Roedor</option>
                <option value={EspecieAnimal.REPTIL}>Réptil</option>
                <option value={EspecieAnimal.OUTRO}>Outro</option>
              </select>
            </div>

            <div>
              <label className="label">Raça</label>
              <input
                type="text"
                value={formData.raca}
                onChange={(e) => handleChange('raca', e.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Sexo</label>
              <select
                value={formData.sexo}
                onChange={(e) => handleChange('sexo', e.target.value as SexoAnimal)}
                className="input-field"
                required
              >
                <option value={SexoAnimal.MACHO}>Macho</option>
                <option value={SexoAnimal.FEMEA}>Fêmea</option>
              </select>
            </div>

            <div>
              <label className="label">Data de Nascimento</label>
              <input
                type="date"
                value={formData.dataNascimento?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleChange('dataNascimento', e.target.value ? new Date(e.target.value) : undefined)}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Idade Estimada</label>
              <input
                type="text"
                value={formData.idadeEstimada || ''}
                onChange={(e) => handleChange('idadeEstimada', e.target.value)}
                className="input-field"
                placeholder="Ex: 2 anos"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.peso || ''}
                onChange={(e) => handleChange('peso', e.target.value ? parseFloat(e.target.value) : undefined)}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Microchip</label>
              <input
                type="text"
                value={formData.microchip || ''}
                onChange={(e) => handleChange('microchip', e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="label">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="input-field"
            />
            {fotoPreview && (
              <div className="mt-3">
                <img
                  src={fotoPreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-outline flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
