const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const TIPOS_PERMITIDOS = [
  '.pdf', '.png', '.jpg', '.jpeg', '.webp', '.heic', '.heif', '.gif', '.bmp',
  '.docx', '.doc', '.odt', '.xlsx', '.xls', '.pptx', '.ppt', '.txt',
];

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (TIPOS_PERMITIDOS.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Tipo de archivo no permitido. Permitidos: ${TIPOS_PERMITIDOS.join(', ')}`));
    }
  },
});

module.exports = upload;
