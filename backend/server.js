require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const tramitesRoutes = require('./src/routes/tramites.routes');
const notificacionesRoutes = require('./src/routes/notificaciones.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const serviciosRoutes = require('./src/routes/servicios.routes');
const {
  securityHeaders,
  apiLimiter,
  authLimiter,
  sanitizeRequest,
} = require('./src/middleware/security');

const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = (process.env.CORS_ORIGINS ||
  'http://localhost:8100,http://127.0.0.1:8100,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(securityHeaders);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(sanitizeRequest);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'sistema-tramites-api' });
});

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/tramites', tramitesRoutes);
app.use('/api/notificaciones', notificacionesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/servicios', serviciosRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
