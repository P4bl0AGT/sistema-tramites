import { usersService, User } from './users.service';

// ── Claves localStorage ───────────────────────────────────────────────────────
const AUTH_KEY  = 'tramites_auth';
const ROLE_KEY  = 'tramites_role';
const EMAIL_KEY = 'tramites_email';

export type UserRole = 'ciudadano' | 'funcionario';

// ── Servicio ──────────────────────────────────────────────────────────────────
export const authService = {
  /**
   * Valida credenciales contra users.service.
   * Retorna el rol si son correctas, null si son incorrectas.
   */
  login(correo: string, password: string): UserRole | null {
    const user = usersService.validateCredentials(correo, password);
    if (!user) return null;

    localStorage.setItem(AUTH_KEY,  'true');
    localStorage.setItem(ROLE_KEY,  user.role);
    localStorage.setItem(EMAIL_KEY, user.correo);
    return user.role;
  },

  /** Login simulado de ClaveÚnica: genera un ciudadano temporal. */
  loginClaveUnica(): UserRole {
    const email = 'claveunica@gob.cl';
    // Crear usuario temporal si no existe
    if (!usersService.findByEmail(email)) {
      usersService.registerUser({
        nombre:   'Usuario ClaveÚnica',
        rut:      '00.000.000-0',
        correo:   email,
        region:   '',
        comuna:   '',
        password: '',
      });
    }
    localStorage.setItem(AUTH_KEY,  'true');
    localStorage.setItem(ROLE_KEY,  'ciudadano');
    localStorage.setItem(EMAIL_KEY, email);
    return 'ciudadano';
  },

  /** Elimina la sesión activa. */
  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EMAIL_KEY);
  },

  /** True si hay una sesión activa en localStorage. */
  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  /** Rol del usuario autenticado. */
  getRole(): UserRole | null {
    return localStorage.getItem(ROLE_KEY) as UserRole | null;
  },

  /** Correo del usuario autenticado. */
  getCurrentEmail(): string | null {
    return localStorage.getItem(EMAIL_KEY);
  },

  /** Objeto User completo del usuario autenticado (o null). */
  getCurrentUser(): User | null {
    const email = this.getCurrentEmail();
    if (!email) return null;
    return usersService.findByEmail(email) ?? null;
  },
};
