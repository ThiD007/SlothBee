const db = require("../config/db");

async function getWeeklyBalanceStats(userId) {
  const [[timerStats]] = await db.query(
    `SELECT
       COUNT(*) AS completed_sessions,
       COALESCE(SUM(TIMESTAMPDIFF(SECOND, iniciado_em, finalizado_em)), 0) AS focus_seconds,
       MAX(finalizado_em) AS last_timer_at
     FROM cronometros
     WHERE usuario_id = ?
       AND status = 'finalizado'
       AND finalizado_em >= DATE_SUB(NOW(), INTERVAL 7 DAY)`,
    [userId]
  );

  const [[goalStats]] = await db.query(
    `SELECT
       COUNT(*) AS completed_goals,
       MAX(registrado_em) AS last_goal_at
     FROM metas_concluidas
     WHERE usuario_id = ?
       AND concluida_em >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)`,
    [userId]
  );

  return {
    completedSessions: Number(timerStats.completed_sessions) || 0,
    focusSeconds: Number(timerStats.focus_seconds) || 0,
    completedGoals: Number(goalStats.completed_goals) || 0,
    lastTimerAt: timerStats.last_timer_at,
    lastGoalAt: goalStats.last_goal_at,
  };
}

module.exports = { getWeeklyBalanceStats };
