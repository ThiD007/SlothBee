const fs = require("fs");
const path = require("path");
const multer = require("multer");

const profileUploadDir = path.join(__dirname, "../../uploads/profile");

fs.mkdirSync(profileUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, profileUploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const fileName = `user-${req.user.id}-${Date.now()}${extension}`;
    cb(null, fileName);
  },
});

const uploadProfilePhoto = multer({
  storage,
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
