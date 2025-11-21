import { IUsuario, ILoginCredentials, IAuthResponse, PerfilUsuario } from '@/types';

const MOCK_USERS: IUsuario[] = [
  {
    id: '1',
    nome: 'Dr. Carlos Silva',
    email: 'admin@kikao.vet',
    perfil: PerfilUsuario.ADMIN,
    ativo: true,
    dataCadastro: new Date('2024-01-01'),
  },
  {
    id: '2',
    nome: 'Dra. Maria Santos',
    email: 'vet@kikao.vet',
    perfil: PerfilUsuario.VETERINARIO,
    ativo: true,
    dataCadastro: new Date('2024-01-15'),
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    await delay(800);

    const usuario = MOCK_USERS.find(u => u.email === credentials.email);

    if (!usuario || credentials.senha !== 'senha123') {
      throw new Error('Credenciais inválidas');
    }

    const token = btoa(`${usuario.id}:${Date.now()}`);

    return {
      usuario,
      token,
    };
  },

  async logout(): Promise<void> {
    await delay(300);
  },

  async validateToken(token: string): Promise<IUsuario> {
    await delay(500);

    try {
      const decoded = atob(token);
      const [userId] = decoded.split(':');
      const usuario = MOCK_USERS.find(u => u.id === userId);

      if (!usuario) {
        throw new Error('Token inválido');
      }

      return usuario;
    } catch {
      throw new Error('Token inválido');
    }
  },

  async getCurrentUser(): Promise<IUsuario | null> {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return null;
    }

    try {
      return await this.validateToken(token);
    } catch {
      return null;
    }
  },
};
