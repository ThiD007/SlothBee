const express = require("express");
const { active, start, finish } = require("../controllers/timer.controller");
const { authRequired } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/active", authRequired, active);
router.post("/start", authRequired, start);
router.patch("/:id/finish", authRequired, finish);

module.exports = router;
