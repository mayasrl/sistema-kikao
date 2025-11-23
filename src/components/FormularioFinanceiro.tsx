import { useState, FormEvent } from 'react';
import { IRecursoFinanceiroFormData, TipoTransacao, CategoriaTransacao } from '@/types';

interface FormularioFinanceiroProps {
  onSubmit: (data: IRecursoFinanceiroFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<IRecursoFinanceiroFormData>;
}

export const FormularioFinanceiro = ({ onSubmit, onCancel, initialData }: FormularioFinanceiroProps) => {
  const [formData, setFormData] = useState<IRecursoFinanceiroFormData>({
    tipo: initialData?.tipo || TipoTransacao.RECEITA,
    valor: initialData?.valor || 0,
    data: initialData?.data || new Date(),
    descricao: initialData?.descricao || '',
    categoria: initialData?.categoria || CategoriaTransacao.CONSULTA,
    consultaId: initialData?.consultaId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof IRecursoFinanceiroFormData, value: any) => {
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
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-text">
            {initialData ? 'Editar Transação' : 'Nova Transação'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">Tipo</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value={TipoTransacao.RECEITA}
                  checked={formData.tipo === TipoTransacao.RECEITA}
                  onChange={(e) => handleChange('tipo', e.target.value as TipoTransacao)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-green-600 font-medium">Receita</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value={TipoTransacao.DESPESA}
                  checked={formData.tipo === TipoTransacao.DESPESA}
                  onChange={(e) => handleChange('tipo', e.target.value as TipoTransacao)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-red-600 font-medium">Despesa</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => handleChange('valor', parseFloat(e.target.value))}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Data</label>
              <input
                type="date"
                value={formData.data.toISOString().split('T')[0]}
                onChange={(e) => handleChange('data', new Date(e.target.value))}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="label">Categoria</label>
            <select
              value={formData.categoria}
              onChange={(e) => handleChange('categoria', e.target.value as CategoriaTransacao)}
              className="input-field"
              required
            >
              <option value={CategoriaTransacao.CONSULTA}>Consulta</option>
              <option value={CategoriaTransacao.VACINA}>Vacina</option>
              <option value={CategoriaTransacao.EXAME}>Exame</option>
              <option value={CategoriaTransacao.CIRURGIA}>Cirurgia</option>
              <option value={CategoriaTransacao.MEDICAMENTO}>Medicamento</option>
              <option value={CategoriaTransacao.INTERNACAO}>Internação</option>
              <option value={CategoriaTransacao.OUTRO}>Outro</option>
            </select>
          </div>

          <div>
            <label className="label">Descrição</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              className="input-field"
              rows={3}
              required
            />
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
