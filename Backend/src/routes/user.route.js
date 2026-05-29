const express = require("express");
const { me, create, update, remove } = require("../controller/users.controller");
const { authRequired } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/me", authRequired, me);
router.post("/me", create)
router.put("/me", authRequired, update)
router.delete("/me", authRequired, remove)

module.exports = router;