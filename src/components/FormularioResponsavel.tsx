import { useState, FormEvent } from 'react';
import { IResponsavelFormData } from '@/types';

interface FormularioResponsavelProps {
  onSubmit: (data: IResponsavelFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<IResponsavelFormData>;
}

export const FormularioResponsavel = ({ onSubmit, onCancel, initialData }: FormularioResponsavelProps) => {
  const [formData, setFormData] = useState<IResponsavelFormData>({
    nomeCompleto: initialData?.nomeCompleto || '',
    cpfCnpj: initialData?.cpfCnpj || '',
    telefone: initialData?.telefone || '',
    email: initialData?.email || '',
    endereco: initialData?.endereco || {
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
    },
    observacoes: initialData?.observacoes,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof IResponsavelFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      endereco: { ...prev.endereco, [field]: value }
    }));
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
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-text">
            {initialData ? 'Editar Responsável' : 'Novo Responsável'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-text mb-4">Dados Pessoais</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Nome Completo</label>
                <input
                  type="text"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleChange('nomeCompleto', e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">CPF/CNPJ</label>
                  <input
                    type="text"
                    value={formData.cpfCnpj}
                    onChange={(e) => handleChange('cpfCnpj', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="label">Telefone</label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">E-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text mb-4">Endereço</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="label">Logradouro</label>
                  <input
                    type="text"
                    value={formData.endereco.logradouro}
                    onChange={(e) => handleEnderecoChange('logradouro', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="label">Número</label>
                  <input
                    type="text"
                    value={formData.endereco.numero}
                    onChange={(e) => handleEnderecoChange('numero', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Complemento</label>
                <input
                  type="text"
                  value={formData.endereco.complemento || ''}
                  onChange={(e) => handleEnderecoChange('complemento', e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label">Bairro</label>
                  <input
                    type="text"
                    value={formData.endereco.bairro}
                    onChange={(e) => handleEnderecoChange('bairro', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="label">Cidade</label>
                  <input
                    type="text"
                    value={formData.endereco.cidade}
                    onChange={(e) => handleEnderecoChange('cidade', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="label">Estado</label>
                  <input
                    type="text"
                    value={formData.endereco.estado}
                    onChange={(e) => handleEnderecoChange('estado', e.target.value)}
                    className="input-field"
                    maxLength={2}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">CEP</label>
                <input
                  type="text"
                  value={formData.endereco.cep}
                  onChange={(e) => handleEnderecoChange('cep', e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="label">Observações</label>
            <textarea
              value={formData.observacoes || ''}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              className="input-field"
              rows={3}
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
