const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticateToken } = require('../middleware/auth');

// GET /api/notificaciones — lista notificaciones del usuario autenticado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notificaciones = await prisma.notificacion.findMany({
      where: { usuarioId: req.user.id },
      include: {
        tramite: {
          select: {
            id: true,
            ticket: true,
            tipo: true,
            estado: true,
            asunto: true,
          },
        },
      },
      orderBy: { creadoEn: 'desc' },
    });
    return res.status(200).json(notificaciones);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PATCH /api/notificaciones/:id/leer — marca como leída
// PATCH /api/notificaciones/leer-todas - marca todas como leidas
router.patch('/leer-todas', authenticateToken, async (req, res) => {
  try {
    const result = await prisma.notificacion.updateMany({
      where: { usuarioId: req.user.id, leida: false },
      data: { leida: true },
    });

    return res.status(200).json({ message: 'Notificaciones marcadas como leidas', count: result.count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.patch('/:id/leer', authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID de notificacion invalido' });
    }
    const notificacion = await prisma.notificacion.findUnique({ where: { id } });

    if (!notificacion) return res.status(404).json({ error: 'Notificación no encontrada' });
    if (notificacion.usuarioId !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permisos sobre esta notificación' });
    }

    const actualizada = await prisma.notificacion.update({
      where: { id },
      data: { leida: true },
    });

    return res.status(200).json(actualizada);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/notificaciones/:id - elimina una notificacion propia
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID de notificacion invalido' });
    }

    const notificacion = await prisma.notificacion.findUnique({ where: { id } });

    if (!notificacion) return res.status(404).json({ error: 'Notificacion no encontrada' });
    if (notificacion.usuarioId !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permisos sobre esta notificacion' });
    }

    await prisma.notificacion.delete({ where: { id } });
    return res.status(200).json({ message: 'Notificacion eliminada correctamente', id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
