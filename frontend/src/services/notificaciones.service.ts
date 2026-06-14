import api from './api';
import { EstadoTramite } from './tramites.service';
import type React from 'react';

export interface NotificacionApi {
  id: number;
  mensaje: string;
  leida: boolean;
  creadoEn: string;
  usuarioId: number;
  tramiteId?: number | null;
  tramite?: {
    id: number;
    ticket: string;
    tipo: string;
    estado: string;
    asunto: string;
  } | null;
}

export interface NotificacionVista {
  id: string;
  tramiteId?: string;
  tramiteTicket: string;
  tipoLabel: string;
  titulo: string;
  fecha: string;
  pillLabel: string;
  pillStyle: React.CSSProperties;
  h3: string;
  cuerpo: string;
  accionLink: string;
  accionLabel: string;
  estado: EstadoTramite;
  leida: boolean;
}

const TIPO_LABELS: Record<string, string> = {
  reclamo: 'Reclamo Municipal',
  patente: 'Patente Comercial',
  licencia: 'Licencia de Conducir',
  subsidio: 'Subsidio Social',
};

const estadoStyles: Record<EstadoTramite, { label: string; bg: string; color: string }> = {
  ingresado: { label: 'Ingresado', bg: '#e7f1fb', color: '#075d92' },
  recepcionado: { label: 'Recibido', bg: '#e7f1fb', color: '#075d92' },
  en_revision: { label: 'En revision', bg: '#fff4e5', color: '#8a4b08' },
  observado: { label: 'Observado', bg: '#ffe9e9', color: '#8b1f1f' },
  aprobado: { label: 'Aprobado', bg: '#e8f5f2', color: '#1d5d64' },
  rechazado: { label: 'Rechazado', bg: '#ffe9e9', color: '#8b1f1f' },
};

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const normalizeEstado = (estado?: string): EstadoTramite => (
  (estado ?? 'ingresado').toLowerCase() as EstadoTramite
);

function mapNotificacion(item: NotificacionApi): NotificacionVista {
  const estado = normalizeEstado(item.tramite?.estado);
  const style = estadoStyles[estado] ?? estadoStyles.ingresado;
  const ticket = item.tramite?.ticket ?? 'Sin ticket';
  const tipoLabel = item.tramite?.tipo ? (TIPO_LABELS[item.tramite.tipo] ?? item.tramite.tipo) : 'Tramite municipal';
  const requiereSubsanacion = estado === 'observado';

  return {
    id: String(item.id),
    tramiteId: item.tramiteId ? String(item.tramiteId) : undefined,
    tramiteTicket: ticket,
    tipoLabel,
    titulo: item.leida ? 'Notificacion' : 'Nueva notificacion',
    fecha: formatDate(item.creadoEn),
    pillLabel: style.label,
    pillStyle: { background: style.bg, color: style.color },
    h3: `Actualizacion del tramite ${ticket}`,
    cuerpo: item.mensaje,
    accionLink: requiereSubsanacion ? '/ciudadano/subsanacion' : '/ciudadano/trazabilidad',
    accionLabel: requiereSubsanacion ? 'Corregir documentacion' : 'Ver trazabilidad',
    estado,
    leida: item.leida,
  };
}

export const notificacionesService = {
  async getAll(): Promise<NotificacionVista[]> {
    const { data } = await api.get<NotificacionApi[]>('/notificaciones');
    return data.map(mapNotificacion);
  },

  async markRead(id: string): Promise<void> {
    await api.patch(`/notificaciones/${id}/leer`);
  },

  async markAllRead(): Promise<void> {
    await api.patch('/notificaciones/leer-todas');
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/notificaciones/${id}`);
  },
};
