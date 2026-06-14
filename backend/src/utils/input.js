const xss = require('xss');

function cleanText(value, maxLength = 1000) {
  if (typeof value !== 'string') return value;
  const normalized = value.trim().replace(/\s+/g, ' ');
  return xss(normalized).slice(0, maxLength);
}

function cleanMultilineText(value, maxLength = 5000) {
  if (typeof value !== 'string') return value;
  const normalized = value.trim().replace(/\r\n/g, '\n');
  return xss(normalized).slice(0, maxLength);
}

function cleanRecord(source, schema) {
  const output = {};

  for (const [key, options] of Object.entries(schema)) {
    const value = source?.[key];
    if (value === undefined || value === null) continue;

    const maxLength = options.maxLength ?? 1000;
    const cleaner = options.multiline ? cleanMultilineText : cleanText;
    output[key] = cleaner(String(value), maxLength);
  }

  return output;
}

function parsePositiveInt(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function clampNumber(value, min, max, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

module.exports = {
  cleanText,
  cleanMultilineText,
  cleanRecord,
  parsePositiveInt,
  clampNumber,
};
