const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const prisma = require('../lib/prisma');
const upload = require('../middleware/upload');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { cleanRecord, parsePositiveInt, clampNumber } = require('../utils/input');

const TIPOS_TRAMITE = ['reclamo', 'patente', 'licencia', 'subsidio'];
const ESTADOS_VALIDOS = ['INGRESADO', 'RECEPCIONADO', 'EN_REVISION', 'OBSERVADO', 'APROBADO', 'RECHAZADO'];
const ESTADOS_FINALES = ['APROBADO', 'RECHAZADO'];

function generarTicket(id) {
  return `TRK-${String(id).padStart(4, '0')}`;
}

async function crearNotificacion(usuarioId, mensaje, tramiteId) {
  await prisma.notificacion.create({
    data: { usuarioId, mensaje, tramiteId },
  });
}

async function agregarHistorial(tramiteId, estado, actor, motivo) {
  await prisma.historialEstado.create({
    data: { tramiteId, estado, actor, motivo: motivo ?? null },
  });
}

const INCLUDE_COMPLETO = {
  ciudadano: { select: { id: true, nombre: true, correo: true, rut: true } },
  observaciones: {
    include: { funcionario: { select: { id: true, nombre: true } } },
    orderBy: { creadoEn: 'asc' },
  },
  historialEstados: { orderBy: { creadoEn: 'asc' } },
};

function subtractBusinessDays(from, days) {
  const date = new Date(from);
  let removed = 0;
  while (removed < days) {
    date.setDate(date.getDate() - 1);
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) removed++;
  }
  return date;
}

function parseTramiteId(req, res) {
  const id = parsePositiveInt(req.params.id);
  if (!id) {
    res.status(400).json({ error: 'ID de tramite invalido' });
    return null;
  }
  return id;
}

function buildTramitesWhere(req) {
  const where = req.user.rol === 'CIUDADANO' ? { ciudadanoId: req.user.id } : {};
  const estado = typeof req.query.estado === 'string' ? req.query.estado.toUpperCase() : null;
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
  const urgentes = req.query.urgentes === 'true';

  if (estado && ESTADOS_VALIDOS.includes(estado)) where.estado = estado;

  if (search) {
    where.OR = [
      { ticket: { contains: search, mode: 'insensitive' } },
      { asunto: { contains: search, mode: 'insensitive' } },
      { tipo: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (urgentes) {
    where.estado = { notIn: ESTADOS_FINALES };
    where.creadoEn = { lte: subtractBusinessDays(new Date(), 17) };
  }

  return where;
}

function unlinkUpload(filename) {
  if (!filename) return;
  const abs = path.join(__dirname, '../../uploads', filename);
  if (fs.existsSync(abs)) fs.unlinkSync(abs);
}

// GET /api/tramites — ciudadano: solo los suyos; funcionario: todos
router.get('/', authenticateToken, async (req, res) => {
  try {
    const where = buildTramitesWhere(req);
    const paginate = req.query.page !== undefined || req.query.pageSize !== undefined;
    const page = clampNumber(req.query.page, 1, 100000, 1);
    const pageSize = clampNumber(req.query.pageSize, 1, 100, 50);

    const query = {
      where,
      include: INCLUDE_COMPLETO,
      orderBy: { creadoEn: 'desc' },
      ...(paginate ? { skip: (page - 1) * pageSize, take: pageSize } : {}),
    };

    const [tramites, total] = await prisma.$transaction([
      prisma.tramite.findMany(query),
      prisma.tramite.count({ where }),
    ]);

    if (paginate) {
      return res.status(200).json({
        data: tramites,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    }

    return res.status(200).json(tramites);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/tramites/:id — detalle con observaciones e historial
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const id = parseTramiteId(req, res);
    if (!id) return;
    const tramite = await prisma.tramite.findUnique({ where: { id }, include: INCLUDE_COMPLETO });

    if (!tramite) return res.status(404).json({ error: 'Trámite no encontrado' });
    if (req.user.rol === 'CIUDADANO' && tramite.ciudadanoId !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permisos para ver este trámite' });
    }
    return res.status(200).json(tramite);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/tramites/:id/archivo — descarga el archivo del ciudadano
router.get('/:id/archivo', authenticateToken, async (req, res) => {
  try {
    const id = parseTramiteId(req, res);
    if (!id) return;
    const tramite = await prisma.tramite.findUnique({ where: { id } });

    if (!tramite || !tramite.archivoPath) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }
    if (req.user.rol === 'CIUDADANO' && tramite.ciudadanoId !== req.user.id) {
      return res.status(403).json({ error: 'Sin permisos' });
    }

    const filePath = path.join(__dirname, '../../uploads', tramite.archivoPath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no disponible en el servidor' });
    }
    return res.download(filePath, tramite.archivoNombre || 'archivo');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/tramites/:id/archivo-correccion — descarga el archivo de subsanación
router.get('/:id/archivo-correccion', authenticateToken, async (req, res) => {
  try {
    const id = parseTramiteId(req, res);
    if (!id) return;
    const tramite = await prisma.tramite.findUnique({ where: { id } });

    if (!tramite || !tramite.archivoCorreccionPath) {
      return res.status(404).json({ error: 'Archivo de corrección no encontrado' });
    }
    if (req.user.rol === 'CIUDADANO' && tramite.ciudadanoId !== req.user.id) {
      return res.status(403).json({ error: 'Sin permisos' });
    }

    const filePath = path.join(__dirname, '../../uploads', tramite.archivoCorreccionPath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no disponible en el servidor' });
    }
    return res.download(filePath, tramite.archivoCorreccionNombre || 'correccion');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/tramites — crea trámite (solo CIUDADANO)
router.post('/', authenticateToken, requireRole('CIUDADANO'), (req, res, next) => {
  upload.single('archivo')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, async (req, res) => {
  const { tipo, asunto, descripcion } = cleanRecord(req.body, {
    tipo: { maxLength: 40 },
    asunto: { maxLength: 140 },
    descripcion: { maxLength: 3000, multiline: true },
  });

  if (!tipo || !asunto || !descripcion) {
    return res.status(400).json({ error: 'tipo, asunto y descripcion son requeridos' });
  }
  if (!TIPOS_TRAMITE.includes(tipo)) {
    return res.status(400).json({ error: `Tipo invalido. Valores posibles: ${TIPOS_TRAMITE.join(', ')}` });
  }

  try {
    const ciudadano = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { nombre: true },
    });
    const actorNombre = ciudadano?.nombre ?? 'Ciudadano';

    const tramite = await prisma.tramite.create({
      data: {
        ticket: `TRK-TEMP-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        tipo,
        asunto,
        descripcion,
        estado: 'INGRESADO',
        ciudadanoId: req.user.id,
      },
    });

    const ticket = generarTicket(tramite.id);
    const tramiteActualizado = await prisma.tramite.update({
      where: { id: tramite.id },
      data: {
        ticket,
        archivoNombre: req.file?.originalname ?? null,
        archivoPath:   req.file?.filename   ?? null,
      },
      include: INCLUDE_COMPLETO,
    });

    await agregarHistorial(tramite.id, 'INGRESADO',    actorNombre);
    await agregarHistorial(tramite.id, 'RECEPCIONADO', 'Sistema OIRS');

    await crearNotificacion(
      req.user.id,
      `Tu trámite ${ticket} ha sido ingresado exitosamente.`,
      tramite.id
    );

    return res.status(201).json(tramiteActualizado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PATCH /api/tramites/:id/estado — cambia estado (solo FUNCIONARIO)
// PATCH /api/tramites/:id - edita datos base del tramite (ciudadano creador)
router.patch('/:id', authenticateToken, requireRole('CIUDADANO'), (req, res, next) => {
  upload.single('archivo')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, async (req, res) => {
  const id = parseTramiteId(req, res);
  if (!id) return;

  const payload = cleanRecord(req.body, {
    tipo: { maxLength: 40 },
    asunto: { maxLength: 140 },
    descripcion: { maxLength: 3000, multiline: true },
  });

  try {
    const tramite = await prisma.tramite.findUnique({ where: { id } });
    if (!tramite) return res.status(404).json({ error: 'Tramite no encontrado' });
    if (tramite.ciudadanoId !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permisos sobre este tramite' });
    }
    if (ESTADOS_FINALES.includes(tramite.estado)) {
      return res.status(409).json({ error: 'No se puede editar un tramite finalizado' });
    }

    const data = {};
    if (payload.tipo !== undefined) {
      if (!TIPOS_TRAMITE.includes(payload.tipo)) {
        return res.status(400).json({ error: `Tipo invalido. Valores posibles: ${TIPOS_TRAMITE.join(', ')}` });
      }
      data.tipo = payload.tipo;
    }
    if (payload.asunto !== undefined) data.asunto = payload.asunto;
    if (payload.descripcion !== undefined) data.descripcion = payload.descripcion;
    if (req.file) {
      unlinkUpload(tramite.archivoPath);
      data.archivoNombre = req.file.originalname;
      data.archivoPath = req.file.filename;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No hay campos validos para actualizar' });
    }

    const ciudadano = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { nombre: true },
    });
    const actorNombre = ciudadano?.nombre ?? 'Ciudadano';

    const actualizado = await prisma.tramite.update({
      where: { id },
      data,
      include: INCLUDE_COMPLETO,
    });

    await agregarHistorial(id, tramite.estado, actorNombre, 'Datos del tramite actualizados');
    await crearNotificacion(
      req.user.id,
      `Actualizaste los datos del tramite ${tramite.ticket}.`,
      id
    );

    return res.status(200).json(actualizado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.patch('/:id/estado', authenticateToken, requireRole('FUNCIONARIO'), async (req, res) => {
  const { estado } = req.body;
  const estadosValidos = ESTADOS_VALIDOS;

  if (!estado || !estadosValidos.includes(estado)) {
    return res.status(400).json({ error: `Estado inválido. Valores posibles: ${estadosValidos.join(', ')}` });
  }

  try {
    const id = parseTramiteId(req, res);
    if (!id) return;
    const tramite = await prisma.tramite.findUnique({ where: { id } });
    if (!tramite) return res.status(404).json({ error: 'Trámite no encontrado' });

    const funcionario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { nombre: true },
    });
    const actorNombre = funcionario?.nombre ?? 'Funcionario';

    const tramiteActualizado = await prisma.tramite.update({ where: { id }, data: { estado } });
    await agregarHistorial(id, estado, actorNombre);
    await crearNotificacion(
      tramite.ciudadanoId,
      `El estado de tu trámite ${tramite.ticket} ha cambiado a ${estado}.`,
      id
    );

    return res.status(200).json(tramiteActualizado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/tramites/:id/observacion — agrega observación (solo FUNCIONARIO)
router.post('/:id/observacion', authenticateToken, requireRole('FUNCIONARIO'), async (req, res) => {
  const { motivo } = cleanRecord(req.body, {
    motivo: { maxLength: 2000, multiline: true },
  });
  if (!motivo) return res.status(400).json({ error: 'El motivo de la observación es requerido' });

  try {
    const id = parseTramiteId(req, res);
    if (!id) return;
    const tramite = await prisma.tramite.findUnique({ where: { id } });
    if (!tramite) return res.status(404).json({ error: 'Trámite no encontrado' });

    const funcionario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { nombre: true },
    });
    const actorNombre = funcionario?.nombre ?? 'Funcionario';

    const observacion = await prisma.observacion.create({
      data: { motivo, tramiteId: id, funcionarioId: req.user.id },
    });

    await prisma.tramite.update({ where: { id }, data: { estado: 'OBSERVADO' } });
    await agregarHistorial(id, 'OBSERVADO', actorNombre, motivo);
    await crearNotificacion(
      tramite.ciudadanoId,
      `Tu trámite ${tramite.ticket} tiene una observación pendiente de subsanación.`,
      id
    );

    return res.status(201).json(observacion);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PATCH /api/tramites/:id/subsanacion — ciudadano responde observación (con archivo opcional)
router.patch('/:id/subsanacion', authenticateToken, requireRole('CIUDADANO'), (req, res, next) => {
  upload.single('archivo')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, async (req, res) => {
  const { respuesta } = cleanRecord(req.body, {
    respuesta: { maxLength: 3000, multiline: true },
  });
  const { observacionId } = req.body;
  if (!respuesta || !observacionId) {
    return res.status(400).json({ error: 'respuesta y observacionId son requeridos' });
  }
  const observacionIdNumerico = parsePositiveInt(observacionId);
  if (!observacionIdNumerico) {
    return res.status(400).json({ error: 'observacionId invalido' });
  }

  try {
    const id = parseTramiteId(req, res);
    if (!id) return;
    const tramite = await prisma.tramite.findUnique({ where: { id } });
    if (!tramite) return res.status(404).json({ error: 'Trámite no encontrado' });
    if (tramite.ciudadanoId !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permisos sobre este trámite' });
    }

    const observacion = await prisma.observacion.findFirst({
      where: { id: observacionIdNumerico, tramiteId: id },
    });
    if (!observacion) return res.status(404).json({ error: 'Observación no encontrada' });

    const ciudadano = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { nombre: true },
    });
    const actorNombre = ciudadano?.nombre ?? 'Ciudadano';

    const observacionActualizada = await prisma.observacion.update({
      where: { id: observacionIdNumerico },
      data: { respuesta },
    });

    await prisma.tramite.update({
      where: { id },
      data: {
        estado: 'EN_REVISION',
        archivoCorreccionNombre: req.file?.originalname ?? tramite.archivoCorreccionNombre,
        archivoCorreccionPath:   req.file?.filename   ?? tramite.archivoCorreccionPath,
      },
    });

    await agregarHistorial(id, 'EN_REVISION', actorNombre);

    await crearNotificacion(
      tramite.ciudadanoId,
      `Tu trámite ${tramite.ticket} fue enviado a revisión luego de tu subsanación.`,
      id
    );
    await crearNotificacion(
      observacion.funcionarioId,
      `El ciudadano subsanó la observación del trámite ${tramite.ticket}. El trámite volvió a EN REVISIÓN.`,
      id
    );

    return res.status(200).json(observacionActualizada);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/tramites/:id — elimina trámite (solo FUNCIONARIO)
router.delete('/:id', authenticateToken, requireRole('FUNCIONARIO'), async (req, res) => {
  try {
    const id = parseTramiteId(req, res);
    if (!id) return;
    const tramite = await prisma.tramite.findUnique({ where: { id } });
    if (!tramite) return res.status(404).json({ error: 'Trámite no encontrado' });

    // Eliminar archivos físicos si existen
    for (const filePath of [tramite.archivoPath, tramite.archivoCorreccionPath]) {
      if (filePath) {
        unlinkUpload(filePath);
      }
    }

    // historialEstados se elimina en CASCADE automáticamente
    await prisma.$transaction([
      prisma.notificacion.deleteMany({ where: { tramiteId: id } }),
      prisma.observacion.deleteMany({ where: { tramiteId: id } }),
      prisma.tramite.delete({ where: { id } }),
    ]);

    return res.status(200).json({ message: 'Trámite eliminado correctamente', id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
