import { IConsulta, IConsultaFormData, StatusConsulta, IAgendaConsulta, VisualizacaoAgenda } from '@/types';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

let mockConsultas: IConsulta[] = [
  {
    id: '1',
    dataHora: new Date('2024-11-20T10:00:00'),
    veterinarioId: '1',
    veterinarioNome: 'Dr. Carlos Silva',
    animalId: '1',
    animalNome: 'Rex',
    responsavelId: '1',
    responsavelNome: 'João Pedro Oliveira',
    motivo: 'Consulta de rotina',
    anotacoesClinicas: 'Animal apresenta bom estado geral',
    diagnostico: 'Saudável',
    status: StatusConsulta.REALIZADO,
    valorTotal: 150.00,
    dataCadastro: new Date('2024-11-15'),
    dataAtualizacao: new Date('2024-11-20'),
  },
  {
    id: '2',
    dataHora: new Date('2024-11-25T14:30:00'),
    veterinarioId: '2',
    veterinarioNome: 'Dra. Maria Santos',
    animalId: '2',
    animalNome: 'Mimi',
    responsavelId: '2',
    responsavelNome: 'Maria Fernanda Costa',
    motivo: 'Vacinação',
    status: StatusConsulta.AGENDADO,
    valorTotal: 80.00,
    dataCadastro: new Date('2024-11-18'),
    dataAtualizacao: new Date('2024-11-18'),
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const consultaService = {
  async getAll(): Promise<IConsulta[]> {
    await delay(600);
    return [...mockConsultas];
  },

  async getById(id: string): Promise<IConsulta> {
    await delay(400);
    const consulta = mockConsultas.find(c => c.id === id);
    
    if (!consulta) {
      throw new Error('Consulta não encontrada');
    }
    
    return { ...consulta };
  },

  async getByAnimal(animalId: string): Promise<IConsulta[]> {
    await delay(500);
    return mockConsultas.filter(c => c.animalId === animalId);
  },

  async getByVeterinario(veterinarioId: string): Promise<IConsulta[]> {
    await delay(500);
    return mockConsultas.filter(c => c.veterinarioId === veterinarioId);
  },

  async getAgenda(data: Date, visualizacao: VisualizacaoAgenda): Promise<IAgendaConsulta[]> {
    await delay(600);
    
    let inicio: Date;
    let fim: Date;
    
    switch (visualizacao) {
      case 'dia':
        inicio = startOfDay(data);
        fim = endOfDay(data);
        break;
      case 'semana':
        inicio = startOfWeek(data, { weekStartsOn: 0 });
        fim = endOfWeek(data, { weekStartsOn: 0 });
        break;
      case 'mes':
        inicio = startOfMonth(data);
        fim = endOfMonth(data);
        break;
    }
    
    const consultasFiltradas = mockConsultas.filter(c =>
      isWithinInterval(c.dataHora, { start: inicio, end: fim })
    );
    
    return consultasFiltradas.map(c => ({
      id: c.id,
      dataHora: c.dataHora,
      veterinarioNome: c.veterinarioNome,
      animalNome: c.animalNome,
      responsavelNome: c.responsavelNome,
      status: c.status,
      duracao: 30,
    }));
  },

  async create(data: IConsultaFormData): Promise<IConsulta> {
    await delay(800);
    
    const novaConsulta: IConsulta = {
      id: Date.now().toString(),
      ...data,
      veterinarioNome: 'Dr. Carlos Silva',
      animalNome: 'Animal',
      responsavelId: '1',
      responsavelNome: 'Responsável',
      status: StatusConsulta.AGENDADO,
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    };
    
    mockConsultas.push(novaConsulta);
    return { ...novaConsulta };
  },

  async update(id: string, data: Partial<IConsultaFormData>): Promise<IConsulta> {
    await delay(800);
    
    const index = mockConsultas.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new Error('Consulta não encontrada');
    }
    
    mockConsultas[index] = {
      ...mockConsultas[index],
      ...data,
      dataAtualizacao: new Date(),
    };
    
    return { ...mockConsultas[index] };
  },

  async updateStatus(id: string, status: StatusConsulta): Promise<IConsulta> {
    await delay(600);
    
    const index = mockConsultas.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new Error('Consulta não encontrada');
    }
    
    mockConsultas[index].status = status;
    mockConsultas[index].dataAtualizacao = new Date();
    
    return { ...mockConsultas[index] };
  },

  async delete(id: string): Promise<void> {
    await delay(600);
    
    const index = mockConsultas.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new Error('Consulta não encontrada');
    }
    
    mockConsultas.splice(index, 1);
  },
};
