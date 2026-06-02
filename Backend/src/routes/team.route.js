const express = require("express");
const { list, me, chart, create, update, remove } = require("../controllers/team.controller");
const { authRequired, adminRequired } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", authRequired, me);
router.get("/", authRequired, adminRequired, list);
router.get("/:id/chart", authRequired, adminRequired, chart);
router.post("/", authRequired, adminRequired, create);
router.put("/:id", authRequired, adminRequired, update);
router.delete("/:id", authRequired, adminRequired, remove);

module.exports = router;
