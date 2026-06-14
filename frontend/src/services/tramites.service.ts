import React from 'react';
import api from './api';
import { storageKeys, storageService } from './storage.service';

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
  id: string;              // id numérico como string (para llamadas API)
  ticket: string;          // TRK-XXXX (para mostrar en UI)
  tipo: string;
  asunto: string;
  descripcion: string;
  archivoNombre?: string;           // nombre original del archivo del ciudadano
  archivoCorreccionNombre?: string; // nombre original del archivo de subsanación
  estado: EstadoTramite;
  ciudadanoId: string;
  ciudadanoNombre: string;
  ciudadanoEmail: string;
  fechaIngreso: string;
  fechaLimite: string;
  diasRestantes: number;
  unidad: string;
  plazoLegal: number;
  historial: EntradaHistorial[];
  motivoObservacion?: string;
  _observaciones?: { id: number; motivo: string; respuesta?: string }[];
}

interface ApiObservacion {
  id: number;
  motivo: string;
  respuesta?: string;
  creadoEn: string;
  funcionario?: {
    nombre?: string;
  };
}

interface ApiHistorialEstado {
  id: number;
  estado: string;
  motivo?: string;
  actor: string;
  creadoEn: string;
}

interface ApiTramite {
  id: number | string;
  ticket: string;
  tipo: string;
  asunto: string;
  descripcion: string;
  estado: string;
  archivoNombre?: string;
  archivoCorreccionNombre?: string;
  ciudadanoId: number | string;
  creadoEn: string;
  ciudadano?: {
    nombre?: string;
    correo?: string;
  };
  observaciones?: ApiObservacion[];
  historialEstados?: ApiHistorialEstado[];
}

interface ApiListResponse {
  data: ApiTramite[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface TramitesQuery {
  page?: number;
  pageSize?: number;
  estado?: EstadoTramite;
  search?: string;
  urgentes?: boolean;
}

// ── Constantes ────────────────────────────────────────────────────────────────

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
const formatDateStr = (date: Date): string => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

const addBusinessDays = (from: Date, days: number): Date => {
  const date = new Date(from);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return date;
};

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

// ── Mapper respuesta API → Tramite ────────────────────────────────────────────
function mapApiTramite(t: ApiTramite): Tramite {
  const fechaIngreso = formatDateStr(new Date(t.creadoEn));
  const fechaLimite = formatDateStr(addBusinessDays(new Date(t.creadoEn), 20));
  const diasRestantes = calcDiasRestantes(fechaLimite);
  const estado = (t.estado as string).toLowerCase() as EstadoTramite;

  // Usar historial real de la BD si existe; si no, reconstruir (compatibilidad con trámites anteriores)
  const historial: EntradaHistorial[] = (t.historialEstados && t.historialEstados.length > 0)
    ? t.historialEstados.map((h) => ({
        fecha:  formatDateStr(new Date(h.creadoEn)),
        estado: h.estado.toLowerCase() as EstadoTramite,
        actor:  h.actor,
        motivo: h.motivo,
      }))
    : [
        { fecha: fechaIngreso, estado: 'ingresado'    as EstadoTramite, actor: t.ciudadano?.nombre ?? 'Ciudadano' },
        { fecha: fechaIngreso, estado: 'recepcionado' as EstadoTramite, actor: 'Sistema OIRS' },
      ];

  const observaciones: { id: number; motivo: string; respuesta?: string }[] =
    (t.observaciones ?? []).map((o) => ({
      id: o.id, motivo: o.motivo, respuesta: o.respuesta,
    }));

  const lastObservacion = observaciones[observaciones.length - 1];

  return {
    id: String(t.id),
    ticket: t.ticket,
    tipo: t.tipo,
    asunto: t.asunto,
    descripcion: t.descripcion,
    archivoNombre: t.archivoNombre ?? undefined,
    archivoCorreccionNombre: t.archivoCorreccionNombre ?? undefined,
    estado,
    ciudadanoId: String(t.ciudadanoId),
    ciudadanoNombre: t.ciudadano?.nombre ?? '',
    ciudadanoEmail: t.ciudadano?.correo ?? '',
    fechaIngreso,
    fechaLimite,
    diasRestantes,
    unidad: UNIDADES[t.tipo] ?? 'Unidad Municipal',
    plazoLegal: 20,
    historial,
    motivoObservacion: lastObservacion?.motivo,
    _observaciones: observaciones,
  };
}

// ── Servicio ──────────────────────────────────────────────────────────────────
function mapApiList(payload: ApiTramite[] | ApiListResponse): Tramite[] {
  const items = Array.isArray(payload) ? payload : payload.data;
  return items.map(mapApiTramite);
}

function toApiEstado(estado: EstadoTramite): string {
  return estado.toUpperCase();
}

export const tramitesService = {
  async getAll(query: TramitesQuery = {}): Promise<Tramite[]> {
    const params = {
      ...query,
      estado: query.estado ? toApiEstado(query.estado) : undefined,
    };
    const { data } = await api.get<ApiTramite[] | ApiListResponse>('/tramites', { params });
    return mapApiList(data);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getByUser(_correo: string): Promise<Tramite[]> {
    return this.getAll();
  },

  async getById(id: string): Promise<Tramite | undefined> {
    try {
      const { data } = await api.get(`/tramites/${id}`);
      return mapApiTramite(data);
    } catch {
      return undefined;
    }
  },

  async getUrgentes(): Promise<Tramite[]> {
    return this.getAll({ urgentes: true, pageSize: 50 });
  },

  async create(data: {
    tipo: string;
    asunto: string;
    descripcion: string;
    archivo?: File | null;
    ciudadanoId: string;
    ciudadanoNombre: string;
    ciudadanoEmail: string;
  }): Promise<Tramite> {
    const formData = new FormData();
    formData.append('tipo', data.tipo);
    formData.append('asunto', data.asunto);
    formData.append('descripcion', data.descripcion);
    if (data.archivo) formData.append('archivo', data.archivo);
    const { data: res } = await api.post('/tramites', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return mapApiTramite(res);
  },

  async update(
    id: string,
    data: {
      tipo?: string;
      asunto?: string;
      descripcion?: string;
      archivo?: File | null;
    },
  ): Promise<Tramite> {
    const formData = new FormData();
    if (data.tipo !== undefined) formData.append('tipo', data.tipo);
    if (data.asunto !== undefined) formData.append('asunto', data.asunto);
    if (data.descripcion !== undefined) formData.append('descripcion', data.descripcion);
    if (data.archivo) formData.append('archivo', data.archivo);
    const { data: res } = await api.patch(`/tramites/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return mapApiTramite(res);
  },

  async updateEstado(
    id: string,
    estado: EstadoTramite,
    _actor: string,
    motivo?: string,
  ): Promise<Tramite | null> {
    try {
      if (estado === 'observado' && motivo) {
        await api.post(`/tramites/${id}/observacion`, { motivo });
      } else {
        await api.patch(`/tramites/${id}/estado`, { estado: estado.toUpperCase() });
      }
      return await this.getById(id) ?? null;
    } catch {
      return null;
    }
  },

  async subsanar(
    id: string,
    _ciudadanoNombre: string,
    archivo?: File | null,
    comentario?: string,
  ): Promise<Tramite | null> {
    try {
      const tramite = await this.getById(id);
      if (!tramite || !tramite._observaciones?.length) return null;
      const lastObs = tramite._observaciones[tramite._observaciones.length - 1];
      const formData = new FormData();
      formData.append('respuesta', comentario ?? 'Documentos corregidos enviados.');
      formData.append('observacionId', String(lastObs.id));
      if (archivo) formData.append('archivo', archivo);
      await api.patch(`/tramites/${id}/subsanacion`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return await this.getById(id) ?? null;
    } catch {
      return null;
    }
  },

  async downloadArchivo(id: string, filename: string): Promise<void> {
    const response = await api.get(`/tramites/${id}/archivo`, { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  async downloadArchivoCorreccion(id: string, filename: string): Promise<void> {
    const response = await api.get(`/tramites/${id}/archivo-correccion`, { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // ── Trámite seleccionado (localStorage — navegación RF03/04 → RF05, RF02 → RF06) ──
  setSelected(id: string) { storageService.set(storageKeys.selectedTramite, id); },
  getSelected(): string | null { return storageService.get(storageKeys.selectedTramite); },
  clearSelected() { storageService.remove(storageKeys.selectedTramite); },

  // ── Helpers puros (sin API) ───────────────────────────────────────────────────
  getPillStatus(diasRestantes: number): PillStatus {
    if (diasRestantes <= 1) return 'danger';
    if (diasRestantes <= 3) return 'warn';
    return 'ok';
  },

  getTipoLabel(tipo: string): string {
    return TIPO_LABELS[tipo] ?? tipo;
  },
};

// ── Exportaciones de estilos y utilidades ─────────────────────────────────────
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

export const estadoToStep: Record<EstadoTramite, number> = {
  ingresado:    0,
  recepcionado: 1,
  en_revision:  2,
  observado:    2,
  aprobado:     4,
  rechazado:    4,
};

export type StepStatus = 'done' | 'current' | 'observed' | 'pending';

export const getStepStatus = (stepIndex: number, estado: EstadoTramite): StepStatus => {
  const passed = estadoToStep[estado];
  if (estado === 'aprobado' || estado === 'rechazado') return 'done';
  if (stepIndex < passed) return 'done';
  if (stepIndex === passed) return estado === 'observado' ? 'observed' : 'current';
  return 'pending';
};
