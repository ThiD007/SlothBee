const db = require("../config/db");

async function getWeeklyBalanceStats(userId) {
  const timerResult = await db.query(
    `SELECT
       COUNT(*) AS completed_sessions,
       COALESCE(SUM(EXTRACT(EPOCH FROM (finalizado_em - iniciado_em))), 0) AS focus_seconds,
       MAX(finalizado_em) AS last_timer_at
     FROM cronometros
     WHERE usuario_id = $1
       AND status = 'finalizado'
       AND finalizado_em >= NOW() - INTERVAL '7 days'`,
    [userId]
  );

  const goalResult = await db.query(
    `SELECT
       COUNT(*) AS completed_goals,
       MAX(registrado_em) AS last_goal_at
     FROM metas_concluidas
     WHERE usuario_id = $1
       AND concluida_em >= CURRENT_DATE - INTERVAL '6 days'`,
    [userId]
  );

  const timerStats = timerResult.rows[0] || {};
  const goalStats = goalResult.rows[0] || {};

  return {
    completedSessions: Number(timerStats.completed_sessions) || 0,
    focusSeconds: Number(timerStats.focus_seconds) || 0,
    completedGoals: Number(goalStats.completed_goals) || 0,
    lastTimerAt: timerStats.last_timer_at,
    lastGoalAt: goalStats.last_goal_at,
  };
}

module.exports = { getWeeklyBalanceStats };
