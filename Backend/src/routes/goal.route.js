const express = require("express");
const {
  list,
  toggle,
  createSelfcare,
  updateSelfcare,
  deleteSelfcare,
  adminListToday,
  adminCreateToday,
  adminUpdateToday,
  adminDeleteToday,
} = require("../controllers/goal.controller");
const { authRequired } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/goals", authRequired, list);
router.patch("/goals/:id/toggle", authRequired, toggle);
router.post("/goals/selfcare", authRequired, createSelfcare);
router.put("/goals/selfcare/:id", authRequired, updateSelfcare);
router.delete("/goals/selfcare/:id", authRequired, deleteSelfcare);

router.get("/admin/goals/today", adminListToday);
router.post("/admin/goals/today", adminCreateToday);
router.put("/admin/goals/today/:id", adminUpdateToday);
router.delete("/admin/goals/today/:id", adminDeleteToday);

module.exports = router;
