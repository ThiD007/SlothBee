const express = require("express");
const {
  list,
  completedCount,
  toggle,
  createSelfcare,
  updateSelfcare,
  deleteSelfcare,
  adminListToday,
  adminSummary,
  adminCreateToday,
  adminUpdateToday,
  adminDeleteToday,
} = require("../controllers/goal.controller");
const { authRequired, adminRequired } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/goals", authRequired, list);
router.get("/goals/completed-count", authRequired, completedCount);
router.patch("/goals/:id/toggle", authRequired, toggle);
router.post("/goals/selfcare", authRequired, createSelfcare);
router.put("/goals/selfcare/:id", authRequired, updateSelfcare);
router.delete("/goals/selfcare/:id", authRequired, deleteSelfcare);

router.get("/admin/goals/summary", authRequired, adminRequired, adminSummary);
router.get("/admin/goals/today", authRequired, adminRequired, adminListToday);
router.post("/admin/goals/today", authRequired, adminRequired, adminCreateToday);
router.put("/admin/goals/today/:id", authRequired, adminRequired, adminUpdateToday);
router.delete("/admin/goals/today/:id", authRequired, adminRequired, adminDeleteToday);

module.exports = router;
