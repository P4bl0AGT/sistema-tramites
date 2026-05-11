import { formatDateStr } from './users.service';

// ── Tipos ─────────────────────────────────────────────────────────────────────
export type EstadoTramite =
  | 'ingresado'
  | 'recepcionado'
  | 'en_revision'
  | 'observado'
  | 'aprobado'
  | 'rechazado';

export type PillStatus = 'ok' | 'warn' | 'danger';

export interface EntradaHistorial {
  fecha: string;
  estado: EstadoTramite;
  actor: string;
  motivo?: string;
}

export interface Tramite {
  id: string;              // SD-2026-XXX
  tipo: string;            // reclamo | patente | licencia | subsidio
  asunto: string;
  descripcion: string;
  archivoNombre?: string;
  archivoCorreccionNombre?: string;
  estado: EstadoTramite;
  ciudadanoId: string;
  ciudadanoNombre: string;
  ciudadanoEmail: string;
  fechaIngreso: string;    // DD/MM/YYYY
  fechaLimite: string;     // DD/MM/YYYY
  diasRestantes: number;
  unidad: string;
  plazoLegal: number;      // días hábiles
  historial: EntradaHistorial[];
  motivoObservacion?: string;
}

// ── Constantes ────────────────────────────────────────────────────────────────
const TRAMITES_KEY  = 'tramites_data';
const COUNTER_KEY   = 'tramites_counter';
const SELECTED_KEY  = 'tramites_selected';

const UNIDADES: Record<string, string> = {
  reclamo:  'Oficina de Reclamos',
  patente:  'Dir. de Rentas y Patentes',
  licencia: 'Dir. de Tránsito',
  subsidio: 'Dir. de Desarrollo Social',
};

const TIPO_LABELS: Record<string, string> = {
  reclamo:  'Reclamo Municipal',
  patente:  'Patente Comercial',
  licencia: 'Licencia de Conducir',
  subsidio: 'Subsidio Social',
};

// ── Utilidades de fecha ───────────────────────────────────────────────────────
/** Agrega N días hábiles a la fecha actual y retorna DD/MM/YYYY */
const addBusinessDays = (days: number): string => {
  const date = new Date();
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return formatDateStr(date);
};

/** Calcula días hábiles restantes desde hoy hasta fechaLimite (DD/MM/YYYY) */
const calcDiasRestantes = (fechaLimite: string): number => {
  const [d, m, y] = fechaLimite.split('/').map(Number);
  const limit = new Date(y, m - 1, d);
  limit.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (limit <= now) return 0;
  let days = 0;
  const cur = new Date(now);
  while (cur < limit) {
    cur.setDate(cur.getDate() + 1);
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) days++;
  }
  return days;
};

// ── Servicio ──────────────────────────────────────────────────────────────────
export const tramitesService = {
  /** Retorna todos los trámites con diasRestantes recalculado. */
  getAll(): Tramite[] {
    try {
      const stored = localStorage.getItem(TRAMITES_KEY);
      const tramites: Tramite[] = stored ? JSON.parse(stored) : [];
      return tramites.map(t => ({
        ...t,
        diasRestantes: calcDiasRestantes(t.fechaLimite),
      }));
    } catch {
      return [];
    }
  },

  /** Trámites de un ciudadano específico (por correo). */
  getByUser(correo: string): Tramite[] {
    return this.getAll().filter(t => t.ciudadanoEmail === correo);
  },

  /** Trámite por ID. */
  getById(id: string): Tramite | undefined {
    return this.getAll().find(t => t.id === id);
  },

  /** Trámites urgentes (≤ 3 días hábiles, no resueltos). */
  getUrgentes(): Tramite[] {
    return this.getAll().filter(
      t => t.diasRestantes <= 3 &&
        t.estado !== 'aprobado' &&
        t.estado !== 'rechazado',
    );
  },

  /** Trámites activos (no aprobado ni rechazado). */
  getActivos(): Tramite[] {
    return this.getAll().filter(
      t => t.estado !== 'aprobado' && t.estado !== 'rechazado',
    );
  },

  /** Trámites resueltos (aprobado o rechazado). */
  getResueltos(): Tramite[] {
    return this.getAll().filter(
      t => t.estado === 'aprobado' || t.estado === 'rechazado',
    );
  },

  /**
   * Crea un nuevo trámite y lo guarda en localStorage.
   * Devuelve el trámite recién creado.
   */
  create(data: {
    tipo: string;
    asunto: string;
    descripcion: string;
    archivoNombre?: string;
    ciudadanoId: string;
    ciudadanoNombre: string;
    ciudadanoEmail: string;
  }): Tramite {
    const counter = parseInt(localStorage.getItem(COUNTER_KEY) ?? '0') + 1;
    localStorage.setItem(COUNTER_KEY, String(counter));

    const year = new Date().getFullYear();
    const id = `SD-${year}-${String(counter).padStart(3, '0')}`;
    const fechaIngreso = formatDateStr(new Date());
    const fechaLimite  = addBusinessDays(20);

    const tramite: Tramite = {
      id,
      tipo:               data.tipo,
      asunto:             data.asunto,
      descripcion:        data.descripcion,
      archivoNombre:      data.archivoNombre,
      estado:             'recepcionado',   // auto-recepcionado al ingresar
      ciudadanoId:        data.ciudadanoId,
      ciudadanoNombre:    data.ciudadanoNombre,
      ciudadanoEmail:     data.ciudadanoEmail,
      fechaIngreso,
      fechaLimite,
      diasRestantes:      20,
      unidad:             UNIDADES[data.tipo] ?? 'Unidad Municipal',
      plazoLegal:         20,
      historial: [
        { fecha: fechaIngreso, estado: 'ingresado',    actor: data.ciudadanoNombre },
        { fecha: fechaIngreso, estado: 'recepcionado', actor: 'Sistema OIRS' },
      ],
    };

    const all = this.getRaw();
    all.push(tramite);
    localStorage.setItem(TRAMITES_KEY, JSON.stringify(all));
    return tramite;
  },

  /**
   * Actualiza el estado de un trámite y registra la entrada en el historial.
   * Retorna el trámite actualizado o null si no se encontró.
   */
  updateEstado(
    id: string,
    estado: EstadoTramite,
    actor: string,
    motivo?: string,
  ): Tramite | null {
    const all = this.getRaw();
    const idx = all.findIndex(t => t.id === id);
    if (idx === -1) return null;

    const t = all[idx];
    t.estado = estado;
    t.historial.push({
      fecha: formatDateStr(new Date()),
      estado,
      actor,
      motivo,
    });

    if (estado === 'observado')  t.motivoObservacion = motivo;
    if (estado === 'en_revision') delete t.motivoObservacion;

    localStorage.setItem(TRAMITES_KEY, JSON.stringify(all));
    return { ...t, diasRestantes: calcDiasRestantes(t.fechaLimite) };
  },

  /**
   * Registra la subsanación del ciudadano (sube el archivo corregido
   * y cambia el estado a 'en_revision').
   */
  subsanar(
    id: string,
    ciudadanoNombre: string,
    archivoCorreccionNombre?: string,
    comentario?: string,
  ): Tramite | null {
    const all = this.getRaw();
    const idx = all.findIndex(t => t.id === id);
    if (idx === -1) return null;

    const t = all[idx];
    if (archivoCorreccionNombre) t.archivoCorreccionNombre = archivoCorreccionNombre;
    t.estado = 'en_revision';
    delete t.motivoObservacion;
    t.historial.push({
      fecha:  formatDateStr(new Date()),
      estado: 'en_revision',
      actor:  ciudadanoNombre,
      motivo: comentario ?? 'Documentos corregidos enviados.',
    });

    localStorage.setItem(TRAMITES_KEY, JSON.stringify(all));
    return { ...t, diasRestantes: calcDiasRestantes(t.fechaLimite) };
  },

  // ── Trámite seleccionado (para paso RF03/RF04 → RF05, RF07 → RF06) ──────────
  setSelected(id: string) {
    localStorage.setItem(SELECTED_KEY, id);
  },

  getSelected(): string | null {
    return localStorage.getItem(SELECTED_KEY);
  },

  clearSelected() {
    localStorage.removeItem(SELECTED_KEY);
  },

  // ── Helpers ──────────────────────────────────────────────────────────────────
  getPillStatus(diasRestantes: number): PillStatus {
    if (diasRestantes <= 1) return 'danger';
    if (diasRestantes <= 3) return 'warn';
    return 'ok';
  },

  getTipoLabel(tipo: string): string {
    return TIPO_LABELS[tipo] ?? tipo;
  },

  /** Lee los datos crudos (sin recalcular diasRestantes) */
  getRaw(): Tramite[] {
    try {
      const stored = localStorage.getItem(TRAMITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
};

// ── Tipos auxiliares exportados ───────────────────────────────────────────────
export const pillStyles: Record<PillStatus, React.CSSProperties> = {
  warn:   { background: '#fff4e5', color: '#8a4b08' },
  danger: { background: '#ffe9e9', color: '#8b1f1f' },
  ok:     { background: '#e8f5f2', color: '#1d5d64' },
};

export const borderColors: Record<PillStatus, string> = {
  warn:   '#E0701E',
  danger: '#FE6565',
  ok:     '#2D717C',
};

/** Mapea estado → índice de paso en el timeline (0-4) */
export const estadoToStep: Record<EstadoTramite, number> = {
  ingresado:    0,
  recepcionado: 1,
  en_revision:  2,
  observado:    2,
  aprobado:     4,
  rechazado:    4,
};

export type StepStatus = 'done' | 'current' | 'observed' | 'pending';

/** Calcula el StepStatus de cada paso dado el estado del trámite */
export const getStepStatus = (stepIndex: number, estado: EstadoTramite): StepStatus => {
  const passed = estadoToStep[estado];
  if (estado === 'aprobado' || estado === 'rechazado') return 'done';
  if (stepIndex < passed) return 'done';
  if (stepIndex === passed) return estado === 'observado' ? 'observed' : 'current';
  return 'pending';
};
