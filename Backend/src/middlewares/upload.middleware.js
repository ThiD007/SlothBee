const multer = require("multer");

const uploadProfilePhoto = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
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

module.exports = { uploadProfilePhoto };
