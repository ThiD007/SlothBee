const express = require("express");
const { active, start, finish, summary } = require("../controllers/timer.controller");
const { authRequired } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/active", authRequired, active);
router.get("/summary", authRequired, summary);
router.post("/start", authRequired, start);
router.patch("/:id/finish", authRequired, finish);

module.exports = router;
