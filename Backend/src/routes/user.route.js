const express = require("express");
const { list, me, update, updatePhoto, removePhoto, remove } = require("../controllers/user.controller");
const { authRequired } = require("../middlewares/auth.middleware");
const { uploadProfilePhoto } = require("../middlewares/upload.middleware");
const router = express.Router();

router.get("/", authRequired, list);
router.get("/me", authRequired, me);
router.put("/me", authRequired, update)
router.put("/me/foto", authRequired, uploadProfilePhoto.single("foto_perfil"), updatePhoto)
router.delete("/me/foto", authRequired, removePhoto)
router.delete("/me", authRequired, remove)

module.exports = router;
