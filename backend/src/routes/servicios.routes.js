const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const HOLIDAYS_URL = process.env.FERIADOS_API_URL || 'https://api.boostr.cl/holidays.json';
const HOLIDAY_BY_DATE_URL =
  process.env.FERIADO_DIA_API_URL || 'https://api.boostr.cl/holidays/is/{date}.json';

const FALLBACK_2026 = [
  { date: '2026-01-01', title: 'Anio Nuevo', type: 'Civil', inalienable: true },
  { date: '2026-04-03', title: 'Viernes Santo', type: 'Civil', inalienable: false },
  { date: '2026-04-04', title: 'Sabado Santo', type: 'Civil', inalienable: false },
  { date: '2026-05-01', title: 'Dia Nacional del Trabajo', type: 'Civil', inalienable: true },
  { date: '2026-05-21', title: 'Dia de las Glorias Navales', type: 'Civil', inalienable: false },
  { date: '2026-06-21', title: 'Dia Nacional de los Pueblos Indigenas', type: 'Civil', inalienable: false },
  { date: '2026-06-29', title: 'San Pedro y San Pablo', type: 'Religioso', inalienable: false },
  { date: '2026-07-16', title: 'Dia de la Virgen del Carmen', type: 'Religioso', inalienable: false },
  { date: '2026-08-15', title: 'Asuncion de la Virgen', type: 'Religioso', inalienable: false },
  { date: '2026-09-18', title: 'Independencia Nacional', type: 'Civil', inalienable: true },
  { date: '2026-09-19', title: 'Dia de las Glorias del Ejercito', type: 'Civil', inalienable: true },
  { date: '2026-10-12', title: 'Encuentro de Dos Mundos', type: 'Civil', inalienable: false },
  { date: '2026-10-31', title: 'Dia de las Iglesias Evangelicas y Protestantes', type: 'Religioso', inalienable: false },
  { date: '2026-11-01', title: 'Todos los Santos', type: 'Religioso', inalienable: false },
  { date: '2026-12-08', title: 'Inmaculada Concepcion', type: 'Religioso', inalienable: false },
  { date: '2026-12-25', title: 'Navidad', type: 'Religioso', inalienable: true },
];

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Servicio externo respondio ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeHolidays(payload) {
  const items = Array.isArray(payload) ? payload : payload?.data;
  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    fecha: item.date ?? item.fecha,
    nombre: item.title ?? item.nombre,
    tipo: item.type ?? item.tipo ?? 'Feriado',
    irrenunciable: Boolean(item.inalienable ?? item.irrenunciable),
  }));
}

router.get('/feriados', authenticateToken, async (req, res) => {
  const year = String(req.query.year || new Date().getFullYear());

  try {
    const payload = await fetchJson(HOLIDAYS_URL);
    const feriados = normalizeHolidays(payload).filter((holiday) =>
      String(holiday.fecha).startsWith(year)
    );

    return res.status(200).json({
      source: 'Boostr Feriados Chile',
      fallback: false,
      year,
      feriados,
    });
  } catch (err) {
    const feriados = FALLBACK_2026.filter((holiday) => holiday.date.startsWith(year)).map((holiday) => ({
      fecha: holiday.date,
      nombre: holiday.title,
      tipo: holiday.type,
      irrenunciable: holiday.inalienable,
    }));

    return res.status(200).json({
      source: 'fallback-local',
      fallback: true,
      year,
      feriados,
      warning: 'No se pudo consultar el servicio externo de feriados.',
    });
  }
});

router.get('/feriados/:fecha', authenticateToken, async (req, res) => {
  const { fecha } = req.params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return res.status(400).json({ error: 'La fecha debe usar formato YYYY-MM-DD' });
  }

  try {
    const payload = await fetchJson(HOLIDAY_BY_DATE_URL.replace('{date}', fecha));
    return res.status(200).json({
      source: 'Boostr Feriados Chile',
      fallback: false,
      fecha,
      data: payload,
    });
  } catch (err) {
    const holiday = FALLBACK_2026.find((item) => item.date === fecha);
    return res.status(200).json({
      source: 'fallback-local',
      fallback: true,
      fecha,
      esFeriado: Boolean(holiday),
      feriado: holiday
        ? {
            fecha: holiday.date,
            nombre: holiday.title,
            tipo: holiday.type,
            irrenunciable: holiday.inalienable,
          }
        : null,
    });
  }
});

module.exports = router;
