// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  nombre: string;
  rut: string;
  correo: string;
  telefono?: string;
  region: string;
  comuna: string;
  role: 'ciudadano' | 'funcionario';
  password: string; // texto plano (demo)
  createdAt: string;
}

// ── Constantes ────────────────────────────────────────────────────────────────
const USERS_KEY = 'tramites_users';

/** Funcionario precargado (credenciales admin@gmail.com / admin) */
const ADMIN_USER: User = {
  id: 'func-001',
  nombre: 'Funcionario Municipal',
  rut: '11.111.111-1',
  correo: 'admin@gmail.com',
  telefono: '+56 9 0000 0000',
  region: 'Metropolitana de Santiago',
  comuna: 'Santiago',
  role: 'funcionario',
  password: 'admin',
  createdAt: '01/01/2026',
};

// ── Servicio ──────────────────────────────────────────────────────────────────
export const usersService = {
  /** Retorna todos los usuarios. El admin siempre está incluido. */
  getAll(): User[] {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      const ciudadanos: User[] = stored ? JSON.parse(stored) : [];
      // El funcionario no se persiste; siempre se inyecta en tiempo de lectura
      return [ADMIN_USER, ...ciudadanos];
    } catch {
      return [ADMIN_USER];
    }
  },

  /** Busca un usuario por su correo electrónico */
  findByEmail(correo: string): User | undefined {
    return this.getAll().find(u => u.correo === correo);
  },

  /** Busca un usuario por su id */
  findById(id: string): User | undefined {
    return this.getAll().find(u => u.id === id);
  },

  /**
   * Valida credenciales.
   * Retorna el usuario si son correctas, null en caso contrario.
   */
  validateCredentials(correo: string, password: string): User | null {
    const user = this.findByEmail(correo);
    if (user && user.password === password) return user;
    return null;
  },

  /**
   * Registra un nuevo ciudadano.
   * Lanza un error si el correo ya está en uso.
   */
  registerUser(data: {
    nombre: string;
    rut: string;
    correo: string;
    telefono?: string;
    region: string;
    comuna: string;
    password: string;
  }): User {
    // Comprobar duplicado de correo
    if (this.findByEmail(data.correo)) {
      throw new Error('El correo ya está registrado.');
    }

    const nuevoCiudadano: User = {
      id: `user-${Date.now()}`,
      nombre: data.nombre,
      rut: data.rut,
      correo: data.correo,
      telefono: data.telefono,
      region: data.region,
      comuna: data.comuna,
      role: 'ciudadano',
      password: data.password,
      createdAt: formatDateStr(new Date()),
    };

    // Solo persistimos ciudadanos (el admin se inyecta en tiempo de lectura)
    const stored = localStorage.getItem(USERS_KEY);
    const ciudadanos: User[] = stored ? JSON.parse(stored) : [];
    ciudadanos.push(nuevoCiudadano);
    localStorage.setItem(USERS_KEY, JSON.stringify(ciudadanos));

    return nuevoCiudadano;
  },
};

// ── Util ──────────────────────────────────────────────────────────────────────
export const formatDateStr = (date: Date): string => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};
