const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss');

function sanitizeValue(value) {
  if (typeof value === 'string') return xss(value);
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, sanitizeValue(nested)])
    );
  }
  return value;
}

function sanitizeRequest(req, _res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }

  if (req.query && typeof req.query === 'object') {
    const sanitized = sanitizeValue(req.query);
    for (const key of Object.keys(req.query)) delete req.query[key];
    Object.assign(req.query, sanitized);
  }

  next();
}

const securityHeaders = helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_MAX ?? 300),
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.AUTH_RATE_LIMIT_MAX ?? 30),
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Intenta nuevamente mas tarde.' },
});

module.exports = {
  securityHeaders,
  apiLimiter,
  authLimiter,
  sanitizeRequest,
};
