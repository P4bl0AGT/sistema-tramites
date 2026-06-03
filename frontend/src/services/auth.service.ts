import api from './api';

export type UserRole = 'ciudadano' | 'funcionario';

export interface User {
  id: number;
  nombre: string;
  rut: string;
  correo: string;
  region: string;
  comuna: string;
  rol: string;
}

export const authService = {
  async login(correo: string, password: string): Promise<UserRole | null> {
    try {
      const { data } = await api.post('/auth/login', { correo, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.usuario));
      return data.usuario.rol.toLowerCase() as UserRole;
    } catch {
      return null;
    }
  },

  async register(payload: {
    nombre: string;
    rut: string;
    correo: string;
    region: string;
    comuna: string;
    password: string;
  }): Promise<void> {
    const { data } = await api.post('/auth/registro', payload);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.usuario));
  },

  async loginClaveUnica(): Promise<UserRole> {
    const { data } = await api.post('/auth/claveunica');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.usuario));
    return data.usuario.rol.toLowerCase() as UserRole;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getRole(): UserRole | null {
    const user = this.getCurrentUser();
    if (!user) return null;
    return user.rol.toLowerCase() as UserRole;
  },

  getCurrentEmail(): string | null {
    return this.getCurrentUser()?.correo ?? null;
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try { return JSON.parse(raw) as User; } catch { return null; }
  },
};
