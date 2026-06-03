require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);

  const funcionario = await prisma.usuario.upsert({
    where: { correo: 'admin@municipio.cl' },
    update: {},
    create: {
      nombre:   'Funcionario Municipal',
      rut:      '11.111.111-1',
      correo:   'admin@municipio.cl',
      region:   'Metropolitana de Santiago',
      comuna:   'Santiago',
      password: hash,
      rol:      'FUNCIONARIO',
    },
  });

  console.log('Funcionario creado:', funcionario.correo);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
