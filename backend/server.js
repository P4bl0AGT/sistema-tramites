require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const tramitesRoutes = require('./src/routes/tramites.routes');
const notificacionesRoutes = require('./src/routes/notificaciones.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin(origin, callback) {
    // Permite cualquier origen localhost en desarrollo
    if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tramites', tramitesRoutes);
app.use('/api/notificaciones', notificacionesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
