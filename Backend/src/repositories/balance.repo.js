const db = require("../config/db");

async function getWeeklyBalanceStats(userId) {
  const timerResult = await db.query(
     `SELECT
       COUNT(*) AS completed_sessions,
       COALESCE(SUM(
         GREATEST(
           CASE
             WHEN modo = 'contagem_regressiva' AND duracao_segundos IS NOT NULL THEN
               LEAST(EXTRACT(EPOCH FROM (finalizado_em - iniciado_em)), duracao_segundos)
             ELSE
               EXTRACT(EPOCH FROM (finalizado_em - iniciado_em))
           END,
           0
         )
       ), 0) AS focus_seconds,
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
       COALESCE(SUM(CASE WHEN m.tipo = 'today' THEN 1 ELSE 0 END), 0) AS completed_focus_goals,
       COALESCE(SUM(CASE WHEN m.tipo = 'selfcare' THEN 1 ELSE 0 END), 0) AS completed_rest_goals,
       MAX(registrado_em) AS last_goal_at
     FROM metas_concluidas mc
     INNER JOIN metas m ON m.id = mc.meta_id
     WHERE mc.usuario_id = $1
       AND mc.concluida_em >= CURRENT_DATE - INTERVAL '6 days'`,
    [userId]
  );

  const timerStats = timerResult.rows[0] || {};
  const goalStats = goalResult.rows[0] || {};

  return {
    completedSessions: Number(timerStats.completed_sessions) || 0,
    focusSeconds: Number(timerStats.focus_seconds) || 0,
    completedGoals: Number(goalStats.completed_goals) || 0,
    completedFocusGoals: Number(goalStats.completed_focus_goals) || 0,
    completedRestGoals: Number(goalStats.completed_rest_goals) || 0,
    lastTimerAt: timerStats.last_timer_at,
    lastGoalAt: goalStats.last_goal_at,
  };
}

module.exports = { getWeeklyBalanceStats };
