export interface IUsuario {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
  dataCadastro: Date;
}

export enum PerfilUsuario {
  ADMIN = 'ADMIN',
  VETERINARIO = 'VETERINARIO',
}

export interface ILoginCredentials {
  email: string;
  senha: string;
}

export interface IAuthResponse {
  usuario: IUsuario;
  token: string;
}

export interface IAuthState {
  usuario: IUsuario | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
