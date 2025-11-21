import { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { PerfilUsuario } from '@/types';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { usuario, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', perfis: [PerfilUsuario.ADMIN, PerfilUsuario.VETERINARIO] },
    { path: '/responsaveis', label: 'Responsáveis', icon: '👥', perfis: [PerfilUsuario.ADMIN, PerfilUsuario.VETERINARIO] },
    { path: '/animais', label: 'Animais', icon: '🐾', perfis: [PerfilUsuario.ADMIN, PerfilUsuario.VETERINARIO] },
    { path: '/consultas', label: 'Consultas', icon: '📋', perfis: [PerfilUsuario.ADMIN, PerfilUsuario.VETERINARIO] },
    { path: '/agenda', label: 'Agenda', icon: '📅', perfis: [PerfilUsuario.ADMIN, PerfilUsuario.VETERINARIO] },
    { path: '/financeiro', label: 'Financeiro', icon: '💰', perfis: [PerfilUsuario.ADMIN] },
  ];

  const menuFiltrado = menuItems.filter(item =>
    usuario && item.perfis.includes(usuario.perfil)
  );

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-primary">Kikão</h1>
          <p className="text-sm text-text-light mt-1">Sistema Veterinário</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuFiltrado.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-background-pink'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="mb-3">
            <p className="text-sm font-medium text-text">{usuario?.nome}</p>
            <p className="text-xs text-text-light">{usuario?.perfil}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full btn-outline py-2 text-sm"
          >
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
