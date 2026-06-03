const multer = require("multer");

const IMAGE_MAX_SIZE_MB = 8;
const IMAGE_MAX_SIZE_BYTES = IMAGE_MAX_SIZE_MB * 1024 * 1024;

const uploadProfilePhoto = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: IMAGE_MAX_SIZE_BYTES,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      const error = new Error("Envie apenas arquivos de imagem");
      error.status = 400;
      cb(error);
      return;
    }

    cb(null, true);
  },
});

module.exports = { uploadProfilePhoto, IMAGE_MAX_SIZE_MB };
