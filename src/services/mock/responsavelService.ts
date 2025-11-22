import { IResponsavel, IResponsavelFormData } from '@/types';

let mockResponsaveis: IResponsavel[] = [
  {
    id: '1',
    nomeCompleto: 'João Pedro Oliveira',
    cpfCnpj: '123.456.789-00',
    telefone: '(38) 99999-1111',
    email: 'joao@email.com',
    endereco: {
      logradouro: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'Montes Claros',
      estado: 'MG',
      cep: '39400-000',
    },
    observacoes: 'Cliente preferencial',
    dataCadastro: new Date('2024-01-10'),
    dataAtualizacao: new Date('2024-01-10'),
  },
  {
    id: '2',
    nomeCompleto: 'Maria Fernanda Costa',
    cpfCnpj: '987.654.321-00',
    telefone: '(38) 98888-2222',
    email: 'maria@email.com',
    endereco: {
      logradouro: 'Av. Principal',
      numero: '456',
      complemento: 'Apto 201',
      bairro: 'São José',
      cidade: 'Montes Claros',
      estado: 'MG',
      cep: '39401-000',
    },
    dataCadastro: new Date('2024-02-15'),
    dataAtualizacao: new Date('2024-02-15'),
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const responsavelService = {
  async getAll(): Promise<IResponsavel[]> {
    await delay(600);
    return [...mockResponsaveis];
  },

  async getById(id: string): Promise<IResponsavel> {
    await delay(400);
    const responsavel = mockResponsaveis.find(r => r.id === id);
    
    if (!responsavel) {
      throw new Error('Responsável não encontrado');
    }
    
    return { ...responsavel };
  },

  async create(data: IResponsavelFormData): Promise<IResponsavel> {
    await delay(800);
    
    const novoResponsavel: IResponsavel = {
      id: Date.now().toString(),
      ...data,
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    };
    
    mockResponsaveis.push(novoResponsavel);
    return { ...novoResponsavel };
  },

  async update(id: string, data: Partial<IResponsavelFormData>): Promise<IResponsavel> {
    await delay(800);
    
    const index = mockResponsaveis.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Responsável não encontrado');
    }
    
    mockResponsaveis[index] = {
      ...mockResponsaveis[index],
      ...data,
      dataAtualizacao: new Date(),
    };
    
    return { ...mockResponsaveis[index] };
  },

  async delete(id: string): Promise<void> {
    await delay(600);
    
    const index = mockResponsaveis.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Responsável não encontrado');
    }
    
    mockResponsaveis.splice(index, 1);
  },

  async search(query: string): Promise<IResponsavel[]> {
    await delay(500);
    
    const lowerQuery = query.toLowerCase();
    return mockResponsaveis.filter(r =>
      r.nomeCompleto.toLowerCase().includes(lowerQuery) ||
      r.cpfCnpj.includes(query) ||
      r.telefone.includes(query) ||
      r.email.toLowerCase().includes(lowerQuery)
    );
  },
};
