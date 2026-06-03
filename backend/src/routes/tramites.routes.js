const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const prisma = require('../lib/prisma');
const upload = require('../middleware/upload');
const { authenticateToken, requireRole } = require('../middleware/auth');

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

// GET /api/tramites — ciudadano: solo los suyos; funcionario: todos
router.get('/', authenticateToken, async (req, res) => {
  try {
    const where = req.user.rol === 'CIUDADANO' ? { ciudadanoId: req.user.id } : {};
    const tramites = await prisma.tramite.findMany({
      where,
      include: INCLUDE_COMPLETO,
      orderBy: { creadoEn: 'desc' },
    });
    return res.status(200).json(tramites);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/tramites/:id — detalle con observaciones e historial
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
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
    const id = parseInt(req.params.id);
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
    const id = parseInt(req.params.id);
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
  const { tipo, asunto, descripcion } = req.body;

  if (!tipo || !asunto || !descripcion) {
    return res.status(400).json({ error: 'tipo, asunto y descripcion son requeridos' });
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
router.patch('/:id/estado', authenticateToken, requireRole('FUNCIONARIO'), async (req, res) => {
  const { estado } = req.body;
  const estadosValidos = ['INGRESADO', 'RECEPCIONADO', 'EN_REVISION', 'OBSERVADO', 'APROBADO', 'RECHAZADO'];

  if (!estado || !estadosValidos.includes(estado)) {
    return res.status(400).json({ error: `Estado inválido. Valores posibles: ${estadosValidos.join(', ')}` });
  }

  try {
    const id = parseInt(req.params.id);
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
  const { motivo } = req.body;
  if (!motivo) return res.status(400).json({ error: 'El motivo de la observación es requerido' });

  try {
    const id = parseInt(req.params.id);
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
  const { respuesta, observacionId } = req.body;
  if (!respuesta || !observacionId) {
    return res.status(400).json({ error: 'respuesta y observacionId son requeridos' });
  }

  try {
    const id = parseInt(req.params.id);
    const tramite = await prisma.tramite.findUnique({ where: { id } });
    if (!tramite) return res.status(404).json({ error: 'Trámite no encontrado' });
    if (tramite.ciudadanoId !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permisos sobre este trámite' });
    }

    const observacion = await prisma.observacion.findFirst({
      where: { id: parseInt(observacionId), tramiteId: id },
    });
    if (!observacion) return res.status(404).json({ error: 'Observación no encontrada' });

    const ciudadano = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { nombre: true },
    });
    const actorNombre = ciudadano?.nombre ?? 'Ciudadano';

    const observacionActualizada = await prisma.observacion.update({
      where: { id: parseInt(observacionId) },
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
    const id = parseInt(req.params.id);
    const tramite = await prisma.tramite.findUnique({ where: { id } });
    if (!tramite) return res.status(404).json({ error: 'Trámite no encontrado' });

    // Eliminar archivos físicos si existen
    for (const filePath of [tramite.archivoPath, tramite.archivoCorreccionPath]) {
      if (filePath) {
        const abs = path.join(__dirname, '../../uploads', filePath);
        if (fs.existsSync(abs)) fs.unlinkSync(abs);
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
