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

module.exports = {
  findActiveByUserId,
  createSession,
  findByIdAndUserId,
  finishSession,
};
