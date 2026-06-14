const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { cleanRecord } = require('../utils/input');

const SALT_ROUNDS = 10;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;

function generateToken(user) {
  return jwt.sign(
    { id: user.id, correo: user.correo, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
}

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
  const { password } = req.body;
  const { nombre, rut, correo, region, comuna } = cleanRecord(req.body, {
    nombre: { maxLength: 120 },
    rut: { maxLength: 16 },
    correo: { maxLength: 160 },
    region: { maxLength: 80 },
    comuna: { maxLength: 80 },
  });

  if (!nombre || !rut || !correo || !region || !comuna || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  if (String(password).length < 6 || String(password).length > 72) {
    return res.status(400).json({ error: 'La contrasena debe tener entre 6 y 72 caracteres' });
  }
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: 'Formato de correo inválido' });
  }
  if (!rutRegex.test(rut)) {
    return res.status(400).json({ error: 'Formato de RUT inválido (ej: 12.345.678-9)' });
  }

  try {
    const existente = await prisma.usuario.findFirst({
      where: { OR: [{ correo }, { rut }] },
    });
    if (existente) {
      return res.status(400).json({ error: 'El correo o RUT ya está registrado' });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const usuario = await prisma.usuario.create({
      data: { nombre, rut, correo, region, comuna, password: hash, rol: 'CIUDADANO' },
    });

    const token = generateToken(usuario);
    return res.status(201).json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rut: usuario.rut,
        region: usuario.region,
        comuna: usuario.comuna,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { password } = req.body;
  const { correo } = cleanRecord(req.body, {
    correo: { maxLength: 160 },
  });

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
  }
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: 'Formato de correo inválido' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { correo } });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = generateToken(usuario);
    return res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rut: usuario.rut,
        region: usuario.region,
        comuna: usuario.comuna,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/auth/claveunica — simula autenticación con ClaveÚnica (demo)
router.post('/claveunica', async (req, res) => {
  try {
    const usuario = await prisma.usuario.upsert({
      where: { correo: 'claveunica@gob.cl' },
      update: {},
      create: {
        nombre:   'Usuario ClaveÚnica',
        rut:      '00.000.000-0',
        correo:   'claveunica@gob.cl',
        region:   'Metropolitana de Santiago',
        comuna:   'Santiago',
        password: await bcrypt.hash(Math.random().toString(36), SALT_ROUNDS),
        rol:      'CIUDADANO',
      },
    });

    const token = generateToken(usuario);
    return res.status(200).json({
      token,
      usuario: {
        id:     usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rut:    usuario.rut,
        region: usuario.region,
        comuna: usuario.comuna,
        rol:    usuario.rol,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
