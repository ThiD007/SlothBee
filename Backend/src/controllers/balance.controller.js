const balanceRepo = require("../repositories/balance.repo");

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getDaysSince(date) {
  if (!date) return 7;

  const diff = Date.now() - new Date(date).getTime();
  return clamp(Math.floor(diff / 86400000), 0, 7);
}

function buildBalance(stats) {
  const focusMinutes = Math.floor(stats.focusSeconds / 60);
  const timerScore = Math.min(60, (focusMinutes / 90) * 60);
  const missionScore = Math.min(35, stats.completedGoals * 7);
  const sessionScore = Math.min(5, stats.completedSessions);
  const focus = clamp(Math.round(timerScore + missionScore + sessionScore), 0, 100);

  const lastActivityAt = [stats.lastTimerAt, stats.lastGoalAt]
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];
  const inactivityDays = getDaysSince(lastActivityAt);
  const rest = 100 - focus;

  return {
    focus,
    rest,
    focusMinutes,
    completedGoals: stats.completedGoals,
    completedSessions: stats.completedSessions,
    inactivityDays,
  };
}

async function me(req, res, next) {
  try {
    const stats = await balanceRepo.getWeeklyBalanceStats(req.user.id);
    res.json({ balance: buildBalance(stats) });
  } catch (e) {
    next(e);
  }
}

module.exports = { me };
