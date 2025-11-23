import { IAnimal, IAnimalFormData, EspecieAnimal, SexoAnimal, IHistoricoAnimal } from '@/types';

let mockAnimais: IAnimal[] = [
  {
    id: '1',
    nome: 'Rex',
    especie: EspecieAnimal.CANINO,
    raca: 'Labrador',
    sexo: SexoAnimal.MACHO,
    dataNascimento: new Date('2020-05-15'),
    peso: 28.5,
    microchip: '123456789012345',
    responsavelId: '1',
    dataCadastro: new Date('2024-01-10'),
    dataAtualizacao: new Date('2024-01-10'),
  },
  {
    id: '2',
    nome: 'Mimi',
    especie: EspecieAnimal.FELINO,
    raca: 'Siamês',
    sexo: SexoAnimal.FEMEA,
    dataNascimento: new Date('2021-03-20'),
    peso: 4.2,
    responsavelId: '2',
    dataCadastro: new Date('2024-02-15'),
    dataAtualizacao: new Date('2024-02-15'),
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const animalService = {
  async getAll(): Promise<IAnimal[]> {
    await delay(600);
    return [...mockAnimais];
  },

  async getById(id: string): Promise<IAnimal> {
    await delay(400);
    const animal = mockAnimais.find(a => a.id === id);
    
    if (!animal) {
      throw new Error('Animal não encontrado');
    }
    
    return { ...animal };
  },

  async getByResponsavel(responsavelId: string): Promise<IAnimal[]> {
    await delay(500);
    return mockAnimais.filter(a => a.responsavelId === responsavelId);
  },

  async create(data: IAnimalFormData): Promise<IAnimal> {
    await delay(800);
    
    const novoAnimal: IAnimal = {
      id: Date.now().toString(),
      nome: data.nome,
      especie: data.especie,
      raca: data.raca,
      sexo: data.sexo,
      dataNascimento: data.dataNascimento,
      idadeEstimada: data.idadeEstimada,
      peso: data.peso,
      microchip: data.microchip,
      foto: typeof data.foto === 'string' ? data.foto : undefined,
      responsavelId: data.responsavelId,
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    };
    
    mockAnimais.push(novoAnimal);
    return { ...novoAnimal };
  },

  async update(id: string, data: Partial<IAnimalFormData>): Promise<IAnimal> {
    await delay(800);
    
    const index = mockAnimais.findIndex(a => a.id === id);
    
    if (index === -1) {
      throw new Error('Animal não encontrado');
    }
    
    mockAnimais[index] = {
      ...mockAnimais[index],
      ...data,
      foto: typeof data.foto === 'string' ? data.foto : mockAnimais[index].foto,
      dataAtualizacao: new Date(),
    };
    
    return { ...mockAnimais[index] };
  },

  async delete(id: string): Promise<void> {
    await delay(600);
    
    const index = mockAnimais.findIndex(a => a.id === id);
    
    if (index === -1) {
      throw new Error('Animal não encontrado');
    }
    
    mockAnimais.splice(index, 1);
  },

  async getHistorico(id: string): Promise<IHistoricoAnimal> {
    await delay(500);
    
    const animal = mockAnimais.find(a => a.id === id);
    
    if (!animal) {
      throw new Error('Animal não encontrado');
    }
    
    return {
      consultas: 5,
      vacinas: 3,
      ultimaConsulta: new Date('2024-10-15'),
      proximaVacina: new Date('2025-01-20'),
    };
  },

  async uploadFoto(animalId: string, foto: File): Promise<string> {
    await delay(1000);
    
    const fotoUrl = URL.createObjectURL(foto);
    const index = mockAnimais.findIndex(a => a.id === animalId);
    
    if (index !== -1) {
      mockAnimais[index].foto = fotoUrl;
    }
    
    return fotoUrl;
  },
};
