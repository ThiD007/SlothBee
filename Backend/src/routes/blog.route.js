const express = require("express");
const { create, list, listFavorites, remove, toggleFavorite, update } = require("../controllers/blog.controller");
const { authRequired, adminRequired } = require("../middlewares/auth.middleware");
const { uploadProfilePhoto } = require("../middlewares/upload.middleware");

const router = express.Router();

router.get("/blogs", list);
router.get("/blogs/favorites", authRequired, listFavorites);
router.post("/blogs/:id/favorite", authRequired, toggleFavorite);
router.post("/admin/blogs", authRequired, adminRequired, uploadProfilePhoto.single("foto_blog"), create);
router.put("/admin/blogs/:id", authRequired, adminRequired, uploadProfilePhoto.single("foto_blog"), update);
router.delete("/admin/blogs/:id", authRequired, adminRequired, remove);

module.exports = router;
