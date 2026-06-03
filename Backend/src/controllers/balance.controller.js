const balanceRepo = require("../repositories/balance.repo");

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const GOAL_WEIGHT_IN_MINUTES = 30;

function buildBalance(stats) {
  const focusMinutes = Math.floor(stats.focusSeconds / 60);
  const completedFocusGoals = Number(stats.completedFocusGoals || 0);
  const completedRestGoals = Number(stats.completedRestGoals || 0);
  const focusScore = focusMinutes + completedFocusGoals * GOAL_WEIGHT_IN_MINUTES;
  const restScore = completedRestGoals * GOAL_WEIGHT_IN_MINUTES;
  const totalScore = focusScore + restScore;

  if (totalScore === 0) {
    return {
      focus: 0,
      rest: 0,
      focusMinutes,
      completedGoals: stats.completedGoals,
      completedFocusGoals,
      completedRestGoals,
      completedSessions: stats.completedSessions,
    };
  }

  const focus = clamp(Math.round((focusScore / totalScore) * 100), 0, 100);
  const rest = 100 - focus;

  return {
    focus,
    rest,
    focusMinutes,
    completedGoals: stats.completedGoals,
    completedFocusGoals,
    completedRestGoals,
    completedSessions: stats.completedSessions,
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
