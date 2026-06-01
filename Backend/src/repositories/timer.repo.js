const db = require("../config/db");

async function findActiveByUserId(userId) {
  const [rows] = await db.query(
    `SELECT id, usuario_id, mode, duration_seconds, started_at, ended_at, status
     FROM sessoes_foco
     WHERE usuario_id = ? AND status = 'active'
     ORDER BY started_at DESC
     LIMIT 1`,
    [userId]
  );

  return rows[0];
}

async function createSession(userId, mode, durationSeconds) {
  const [result] = await db.query(
    `INSERT INTO sessoes_foco (usuario_id, mode, duration_seconds, started_at, status)
     VALUES (?, ?, ?, NOW(), 'active')`,
    [userId, mode, durationSeconds]
  );

  return result.insertId;
}

async function findByIdAndUserId(id, userId) {
  const [rows] = await db.query(
    `SELECT id, usuario_id, mode, duration_seconds, started_at, ended_at, status
     FROM sessoes_foco
     WHERE id = ? AND usuario_id = ?`,
    [id, userId]
  );

  return rows[0];
}

async function finishSession(id, userId) {
  await db.query(
    `UPDATE sessoes_foco
     SET ended_at = NOW(), status = 'finished'
     WHERE id = ? AND usuario_id = ? AND status = 'active'`,
    [id, userId]
  );
}

module.exports = {
  findActiveByUserId,
  createSession,
  findByIdAndUserId,
  finishSession,
};
