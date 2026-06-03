const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticateToken } = require('../middleware/auth');

// GET /api/notificaciones — lista notificaciones del usuario autenticado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notificaciones = await prisma.notificacion.findMany({
      where: { usuarioId: req.user.id },
      orderBy: { creadoEn: 'desc' },
    });
    return res.status(200).json(notificaciones);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PATCH /api/notificaciones/:id/leer — marca como leída
router.patch('/:id/leer', authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
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

module.exports = router;
