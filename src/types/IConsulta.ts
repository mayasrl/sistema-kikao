export interface IConsulta {
  id: string;
  dataHora: Date;
  veterinarioId: string;
  veterinarioNome: string;
  animalId: string;
  animalNome: string;
  responsavelId: string;
  responsavelNome: string;
  motivo: string;
  anotacoesClinicas?: string;
  diagnostico?: string;
  prescricao?: string;
  status: StatusConsulta;
  valorTotal: number;
  dataCadastro: Date;
  dataAtualizacao: Date;
}

export enum StatusConsulta {
  AGENDADO = 'AGENDADO',
  REALIZADO = 'REALIZADO',
  CANCELADO = 'CANCELADO',
  AUSENTE = 'AUSENTE',
}

export interface IConsultaFormData {
  dataHora: Date;
  veterinarioId: string;
  animalId: string;
  motivo: string;
  anotacoesClinicas?: string;
  diagnostico?: string;
  prescricao?: string;
  valorTotal: number;
}

export interface IAgendaConsulta {
  id: string;
  dataHora: Date;
  veterinarioNome: string;
  animalNome: string;
  responsavelNome: string;
  status: StatusConsulta;
  duracao: number;
}

export type VisualizacaoAgenda = 'dia' | 'semana' | 'mes';
