export interface IResponsavel {
  id: string;
  nomeCompleto: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  endereco: IEndereco;
  observacoes?: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
}

export interface IEndereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface IResponsavelFormData {
  nomeCompleto: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  endereco: IEndereco;
  observacoes?: string;
}
