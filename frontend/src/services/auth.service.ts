import api from './api';
import { storageKeys, storageService } from './storage.service';

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
      storageService.set(storageKeys.token, data.token);
      storageService.setJson(storageKeys.user, data.usuario);
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
    storageService.set(storageKeys.token, data.token);
    storageService.setJson(storageKeys.user, data.usuario);
  },

  async loginClaveUnica(): Promise<UserRole> {
    const { data } = await api.post('/auth/claveunica');
    storageService.set(storageKeys.token, data.token);
    storageService.setJson(storageKeys.user, data.usuario);
    return data.usuario.rol.toLowerCase() as UserRole;
  },

  logout(): void {
    storageService.remove(storageKeys.token);
    storageService.remove(storageKeys.user);
  },

  isAuthenticated(): boolean {
    return !!storageService.get(storageKeys.token);
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
    return storageService.getJson<User>(storageKeys.user);
  },
};
