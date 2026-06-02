const db = require("../config/db");

async function findActiveByUserId(userId) {
  const [rows] = await db.query(
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
     WHERE usuario_id = ? AND status = 'ativo'
     ORDER BY iniciado_em DESC
     LIMIT 1`,
    [userId]
  );

  return rows[0];
}

async function createSession(userId, mode, durationSeconds) {
  const dbMode = mode === "countdown" ? "contagem_regressiva" : "cronometro";

  const [result] = await db.query(
    `INSERT INTO cronometros (usuario_id, modo, duracao_segundos, iniciado_em, status)
     VALUES (?, ?, ?, NOW(), 'ativo')`,
    [userId, dbMode, durationSeconds]
  );

  return result.insertId;
}

async function findByIdAndUserId(id, userId) {
  const [rows] = await db.query(
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
     WHERE id = ? AND usuario_id = ?`,
    [id, userId]
  );

  return rows[0];
}

async function finishSession(id, userId) {
  await db.query(
    `UPDATE cronometros
     SET finalizado_em = NOW(), status = 'finalizado'
     WHERE id = ? AND usuario_id = ? AND status = 'ativo'`,
    [id, userId]
  );
}

function focusSecondsExpression() {
  return `GREATEST(
    CASE
      WHEN modo = 'contagem_regressiva' AND duracao_segundos IS NOT NULL THEN
        LEAST(TIMESTAMPDIFF(SECOND, iniciado_em, COALESCE(finalizado_em, NOW())), duracao_segundos)
      ELSE
        TIMESTAMPDIFF(SECOND, iniciado_em, COALESCE(finalizado_em, NOW()))
    END,
    0
  )`;
}

async function getFocusSummary(userId) {
  const focusSeconds = focusSecondsExpression();

  const [totalsRows] = await db.query(
    `SELECT
       COALESCE(SUM(CASE WHEN DATE(iniciado_em) = CURDATE() THEN ${focusSeconds} ELSE 0 END), 0) AS today_seconds,
       COALESCE(SUM(CASE WHEN YEARWEEK(iniciado_em, 1) = YEARWEEK(CURDATE(), 1) THEN ${focusSeconds} ELSE 0 END), 0) AS week_seconds
     FROM cronometros
     WHERE usuario_id = ? AND status = 'finalizado'`,
    [userId]
  );

  const [dailyRows] = await db.query(
    `SELECT
       WEEKDAY(iniciado_em) AS day_index,
       COALESCE(SUM(${focusSeconds}), 0) AS focus_seconds
     FROM cronometros
     WHERE usuario_id = ? AND status = 'finalizado' AND YEARWEEK(iniciado_em, 1) = YEARWEEK(CURDATE(), 1)
     GROUP BY WEEKDAY(iniciado_em)`,
    [userId]
  );

  const dailySeconds = Array.from({ length: 7 }, () => 0);
  dailyRows.forEach((row) => {
    dailySeconds[row.day_index] = Number(row.focus_seconds) || 0;
  });

  return {
    todaySeconds: Number(totalsRows[0]?.today_seconds) || 0,
    weekSeconds: Number(totalsRows[0]?.week_seconds) || 0,
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
