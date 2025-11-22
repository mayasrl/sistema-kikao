import { useState, FormEvent } from 'react';
import { IConsultaFormData, StatusConsulta } from '@/types';

interface FormularioConsultaProps {
  onSubmit: (data: IConsultaFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<IConsultaFormData>;
}

export const FormularioConsulta = ({ onSubmit, onCancel, initialData }: FormularioConsultaProps) => {
  const [formData, setFormData] = useState<IConsultaFormData>({
    dataHora: initialData?.dataHora || new Date(),
    veterinarioId: initialData?.veterinarioId || '',
    animalId: initialData?.animalId || '',
    motivo: initialData?.motivo || '',
    anotacoesClinicas: initialData?.anotacoesClinicas,
    diagnostico: initialData?.diagnostico,
    status: initialData?.status || StatusConsulta.AGENDADO,
    valorTotal: initialData?.valorTotal,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof IConsultaFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            {initialData ? 'Editar Consulta' : 'Nova Consulta'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Data e Hora</label>
              <input
                type="datetime-local"
                value={formData.dataHora.toISOString().slice(0, 16)}
                onChange={(e) => handleChange('dataHora', new Date(e.target.value))}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Veterinário</label>
              <select
                value={formData.veterinarioId}
                onChange={(e) => handleChange('veterinarioId', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Selecione</option>
                <option value="1">Dr. Carlos Silva</option>
                <option value="2">Dra. Maria Santos</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Animal</label>
            <select
              value={formData.animalId}
              onChange={(e) => handleChange('animalId', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Selecione</option>
              <option value="1">Rex - João Pedro Oliveira</option>
              <option value="2">Mimi - Maria Fernanda Costa</option>
            </select>
          </div>

          <div>
            <label className="label">Motivo da Consulta</label>
            <textarea
              value={formData.motivo}
              onChange={(e) => handleChange('motivo', e.target.value)}
              className="input-field"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="label">Anotações Clínicas</label>
            <textarea
              value={formData.anotacoesClinicas || ''}
              onChange={(e) => handleChange('anotacoesClinicas', e.target.value)}
              className="input-field"
              rows={3}
            />
          </div>

          <div>
            <label className="label">Diagnóstico</label>
            <textarea
              value={formData.diagnostico || ''}
              onChange={(e) => handleChange('diagnostico', e.target.value)}
              className="input-field"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as StatusConsulta)}
                className="input-field"
              >
                <option value={StatusConsulta.AGENDADO}>Agendado</option>
                <option value={StatusConsulta.REALIZADO}>Realizado</option>
                <option value={StatusConsulta.CANCELADO}>Cancelado</option>
                <option value={StatusConsulta.AUSENTE}>Ausente</option>
              </select>
            </div>

            <div>
              <label className="label">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.valorTotal || ''}
                onChange={(e) => handleChange('valorTotal', parseFloat(e.target.value))}
                className="input-field"
              />
            </div>
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
