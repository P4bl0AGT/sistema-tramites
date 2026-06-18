require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const hashFunc   = await bcrypt.hash('func123',   10);
  const hashVecino = await bcrypt.hash('vecino123', 10);

  // ── Funcionarios ─────────────────────────────────────────────────────────────
  const funcionarios = [
    {
      nombre:  'Admin Municipal',
      rut:     '11.111.111-1',
      correo:  'admin@municipio.cl',
      region:  'Valparaíso',
      comuna:  'Santo Domingo',
      password: hashFunc,
      rol:     'FUNCIONARIO',
    },
    {
      nombre:  'Carlos Muñoz Reyes',
      rut:     '15.234.567-K',
      correo:  'carlos.munoz@municipio.cl',
      region:  'Valparaíso',
      comuna:  'Santo Domingo',
      password: hashFunc,
      rol:     'FUNCIONARIO',
    },
    {
      nombre:  'Ana Valenzuela Torres',
      rut:     '16.789.012-3',
      correo:  'ana.valenzuela@municipio.cl',
      region:  'Valparaíso',
      comuna:  'Santo Domingo',
      password: hashFunc,
      rol:     'FUNCIONARIO',
    },
  ];

  for (const u of funcionarios) {
    const created = await prisma.usuario.upsert({
      where:  { correo: u.correo },
      update: {},
      create: u,
    });
    console.log(`Funcionario: ${created.correo}`);
  }

  // ── Ciudadanos ────────────────────────────────────────────────────────────────
  const ciudadanos = [
    {
      nombre:  'María González Flores',
      rut:     '17.543.210-5',
      correo:  'maria.gonzalez@gmail.com',
      region:  'Valparaíso',
      comuna:  'Santo Domingo',
      password: hashVecino,
      rol:     'CIUDADANO',
    },
    {
      nombre:  'Juan Hernández Díaz',
      rut:     '18.234.567-8',
      correo:  'juan.hernandez@gmail.com',
      region:  'Valparaíso',
      comuna:  'San Antonio',
      password: hashVecino,
      rol:     'CIUDADANO',
    },
    {
      nombre:  'Claudia Martínez Silva',
      rut:     '19.876.543-2',
      correo:  'claudia.martinez@gmail.com',
      region:  'Valparaíso',
      comuna:  'Cartagena',
      password: hashVecino,
      rol:     'CIUDADANO',
    },
    {
      nombre:  'Roberto Lagos Fuentes',
      rut:     '20.123.456-7',
      correo:  'roberto.lagos@gmail.com',
      region:  'Metropolitana de Santiago',
      comuna:  'Santiago',
      password: hashVecino,
      rol:     'CIUDADANO',
    },
    {
      nombre:  'Daniela Soto Arriagada',
      rut:     '21.654.321-0',
      correo:  'daniela.soto@gmail.com',
      region:  'Valparaíso',
      comuna:  'Santo Domingo',
      password: hashVecino,
      rol:     'CIUDADANO',
    },
  ];

  for (const u of ciudadanos) {
    const created = await prisma.usuario.upsert({
      where:  { correo: u.correo },
      update: {},
      create: u,
    });
    console.log(`Ciudadano:   ${created.correo}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
