const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticateToken } = require('../middleware/auth');

// GET /api/usuarios/me — perfil del usuario autenticado
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nombre: true,
        rut: true,
        correo: true,
        region: true,
        comuna: true,
        rol: true,
        creadoEn: true,
      },
    });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.status(200).json(usuario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
