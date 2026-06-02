const db = require("../config/db");

async function findActiveByUserId(userId) {
  const result = await db.query(
    `SELECT
       id,
       usuario_id,
       CASE modo
         WHEN 'contagem_regressiva' THEN 'countdown'
         ELSE 'stopwatch'
       END AS mode,
       duracao_segundos AS duration_seconds,
       iniciado_em AS started_at,
       finalizado_em AS ended_at,
       CASE status
         WHEN 'finalizado' THEN 'finished'
         ELSE 'active'
       END AS status
     FROM cronometros
     WHERE usuario_id = $1 AND status = 'ativo'
     ORDER BY iniciado_em DESC
     LIMIT 1`,
    [userId]
  );

  return result.rows[0];
}

async function createSession(userId, mode, durationSeconds) {
  const dbMode = mode === "countdown" ? "contagem_regressiva" : "cronometro";

  const result = await db.query(
    `INSERT INTO cronometros (usuario_id, modo, duracao_segundos, iniciado_em, status)
     VALUES ($1, $2, $3, NOW(), 'ativo')
     RETURNING id`,
    [userId, dbMode, durationSeconds]
  );

  return result.rows[0].id;
}

async function findByIdAndUserId(id, userId) {
  const result = await db.query(
    `SELECT
       id,
       usuario_id,
       CASE modo
         WHEN 'contagem_regressiva' THEN 'countdown'
         ELSE 'stopwatch'
       END AS mode,
       duracao_segundos AS duration_seconds,
       iniciado_em AS started_at,
       finalizado_em AS ended_at,
       CASE status
         WHEN 'finalizado' THEN 'finished'
         ELSE 'active'
       END AS status
     FROM cronometros
     WHERE id = $1 AND usuario_id = $2`,
    [id, userId]
  );

  return result.rows[0];
}

async function finishSession(id, userId) {
  await db.query(
    `UPDATE cronometros
     SET finalizado_em = NOW(), status = 'finalizado'
     WHERE id = $1 AND usuario_id = $2 AND status = 'ativo'`,
    [id, userId]
  );
}

function focusSecondsExpression() {
  return `GREATEST(
    CASE
      WHEN modo = 'contagem_regressiva' AND duracao_segundos IS NOT NULL THEN
        LEAST(EXTRACT(EPOCH FROM (COALESCE(finalizado_em, NOW()) - iniciado_em)), duracao_segundos)
      ELSE
        EXTRACT(EPOCH FROM (COALESCE(finalizado_em, NOW()) - iniciado_em))
    END,
    0
  )`;
}

async function getFocusSummary(userId) {
  const focusSeconds = focusSecondsExpression();

  const totalsResult = await db.query(
    `SELECT
       COALESCE(SUM(CASE WHEN iniciado_em::date = CURRENT_DATE THEN ${focusSeconds} ELSE 0 END), 0) AS today_seconds,
       COALESCE(SUM(CASE WHEN date_trunc('week', iniciado_em)::date = date_trunc('week', CURRENT_DATE)::date THEN ${focusSeconds} ELSE 0 END), 0) AS week_seconds
     FROM cronometros
     WHERE usuario_id = $1 AND status = 'finalizado'`,
    [userId]
  );

  const dailyResult = await db.query(
    `SELECT
       (EXTRACT(ISODOW FROM iniciado_em)::int - 1) AS day_index,
       COALESCE(SUM(${focusSeconds}), 0) AS focus_seconds
     FROM cronometros
     WHERE usuario_id = $1
       AND status = 'finalizado'
       AND date_trunc('week', iniciado_em)::date = date_trunc('week', CURRENT_DATE)::date
     GROUP BY (EXTRACT(ISODOW FROM iniciado_em)::int - 1)`,
    [userId]
  );

  const dailySeconds = Array.from({ length: 7 }, () => 0);
  dailyResult.rows.forEach((row) => {
    dailySeconds[row.day_index] = Number(row.focus_seconds) || 0;
  });

  return {
    todaySeconds: Number(totalsResult.rows[0]?.today_seconds) || 0,
    weekSeconds: Number(totalsResult.rows[0]?.week_seconds) || 0,
    dailySeconds,
  };
}

module.exports = {
  findActiveByUserId,
  createSession,
  findByIdAndUserId,
  finishSession,
  getFocusSummary,
};
