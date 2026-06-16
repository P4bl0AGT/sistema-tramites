import api from './api';

export interface Feriado {
  fecha: string;
  nombre: string;
  tipo: string;
  irrenunciable: boolean;
}

export const serviciosService = {
  async getProximosFeriados(year = new Date().getFullYear()): Promise<Feriado[]> {
    try {
      const { data } = await api.get<{ feriados: Feriado[] }>('/servicios/feriados', { params: { year } });
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      return (data.feriados ?? [])
        .filter((f) => new Date(f.fecha + 'T00:00:00') >= hoy)
        .slice(0, 6);
    } catch {
      return [];
    }
  },
};
