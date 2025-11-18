export interface IAnimal {
  id: string;
  nome: string;
  especie: EspecieAnimal;
  raca: string;
  sexo: SexoAnimal;
  dataNascimento?: Date;
  idadeEstimada?: string;
  peso: number;
  microchip?: string;
  foto?: string;
  responsavelId: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
}

export enum EspecieAnimal {
  CANINO = 'CANINO',
  FELINO = 'FELINO',
  AVE = 'AVE',
  ROEDOR = 'ROEDOR',
  REPTIL = 'REPTIL',
  OUTRO = 'OUTRO',
}

export enum SexoAnimal {
  MACHO = 'MACHO',
  FEMEA = 'FEMEA',
}

export interface IAnimalFormData {
  nome: string;
  especie: EspecieAnimal;
  raca: string;
  sexo: SexoAnimal;
  dataNascimento?: Date;
  idadeEstimada?: string;
  peso: number;
  microchip?: string;
  foto?: File | string;
  responsavelId: string;
}

export interface IHistoricoAnimal {
  consultas: number;
  vacinas: number;
  ultimaConsulta?: Date;
  proximaVacina?: Date;
}
