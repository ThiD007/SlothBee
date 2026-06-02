const balanceRepo = require("../repositories/balance.repo");

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const FOCUS_DECAY_PER_INACTIVE_HOUR = 2;

function getInactiveHoursSince(date) {
  if (!date) return 168;

  const diff = Date.now() - new Date(date).getTime();
  return clamp(Math.floor(diff / 3600000), 0, 168);
}

function buildBalance(stats) {
  const focusMinutes = Math.floor(stats.focusSeconds / 60);
  const hasActivity = focusMinutes > 0 || stats.completedGoals > 0 || stats.completedSessions > 0;

  if (!hasActivity) {
    return {
      focus: 0,
      rest: 0,
      focusMinutes,
      completedGoals: stats.completedGoals,
      completedSessions: stats.completedSessions,
      inactiveHours: 0,
    };
  }

  const timerScore = Math.min(60, (focusMinutes / 90) * 60);
  const missionScore = Math.min(35, stats.completedGoals * 7);
  const sessionScore = Math.min(5, stats.completedSessions);
  const focus = clamp(Math.round(timerScore + missionScore + sessionScore), 0, 100);

  const lastActivityAt = [stats.lastTimerAt, stats.lastGoalAt]
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];
  const inactiveHours = getInactiveHoursSince(lastActivityAt);
  const decay = inactiveHours * FOCUS_DECAY_PER_INACTIVE_HOUR;
  const adjustedFocus = clamp(focus - decay, 0, 100);
  const rest = 100 - adjustedFocus;

  return {
    focus: adjustedFocus,
    rest,
    focusMinutes,
    completedGoals: stats.completedGoals,
    completedSessions: stats.completedSessions,
    inactiveHours,
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
