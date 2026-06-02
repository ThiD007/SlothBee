const db = require("../config/db");

const defaultSelfcareGoals = [
  ["Checar postura no foco", 15],
  ["Fazer pausas conscientes", 15],
  ["Alongar o corpo", 15],
  ["Modo sem tela", 15],
  ["Cuidar do humor", 15],
];

async function ensureSelfcareGoals(userId) {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS total FROM metas WHERE tipo = 'selfcare' AND usuario_id = ? AND active = 1",
    [userId]
  );

  if (rows[0].total > 0) return;

  await Promise.all(
    defaultSelfcareGoals.map(([titulo, pontos]) =>
      db.query("INSERT INTO metas (titulo, pontos, tipo, usuario_id, active) VALUES (?, ?, 'selfcare', ?, 1)", [
        titulo,
        pontos,
        userId,
      ])
    )
  );
}

async function listGoalsForUser(userId) {
  await ensureSelfcareGoals(userId);

  const [rows] = await db.query(
    `SELECT
       m.id,
       m.titulo,
       m.pontos,
       m.tipo,
       CASE WHEN c.id IS NULL THEN 0 ELSE 1 END AS done
     FROM metas m
     LEFT JOIN metas_concluidas c
       ON c.meta_id = m.id AND c.usuario_id = ? AND c.concluida_em = CURDATE()
     WHERE m.active = 1
       AND (m.tipo = 'today' OR (m.tipo = 'selfcare' AND m.usuario_id = ?))
     ORDER BY m.tipo, m.id`,
    [userId, userId]
  );

  return rows;
}

async function countCompletedGoals(userId) {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS total FROM metas_concluidas WHERE usuario_id = ? AND concluida_em = CURDATE()",
    [userId]
  );
  return rows[0]?.total || 0;
}

async function listTodayAdminGoals() {
  const [rows] = await db.query(
    "SELECT id, titulo, pontos, tipo FROM metas WHERE tipo = 'today' AND active = 1 ORDER BY id"
  );

  return rows;
}

async function getAdminGoalsSummary() {
  const [rows] = await db.query(
    `SELECT
       COUNT(*) AS total_sent_goals,
       SUM(CASE WHEN active = 1 THEN 1 ELSE 0 END) AS active_sent_goals
     FROM metas
     WHERE tipo = 'today' AND usuario_id IS NULL`
  );

  return {
    totalSentGoals: Number(rows[0]?.total_sent_goals) || 0,
    activeSentGoals: Number(rows[0]?.active_sent_goals) || 0,
  };
}

async function createTodayGoal(titulo, pontos) {
  const [result] = await db.query(
    "INSERT INTO metas (titulo, pontos, tipo, usuario_id, active) VALUES (?, ?, 'today', NULL, 1)",
    [titulo, pontos]
  );

  return result.insertId;
}

async function updateTodayGoal(id, titulo, pontos) {
  await db.query("UPDATE metas SET titulo = ?, pontos = ? WHERE id = ? AND tipo = 'today'", [titulo, pontos, id]);
}

async function deleteTodayGoal(id) {
  await db.query("UPDATE metas SET active = 0 WHERE id = ? AND tipo = 'today'", [id]);
}

async function createSelfcareGoal(userId, titulo, pontos) {
  const [result] = await db.query(
    "INSERT INTO metas (titulo, pontos, tipo, usuario_id, active) VALUES (?, ?, 'selfcare', ?, 1)",
    [titulo, pontos, userId]
  );

  return result.insertId;
}

async function updateSelfcareGoal(id, userId, titulo, pontos) {
  await db.query("UPDATE metas SET titulo = ?, pontos = ? WHERE id = ? AND tipo = 'selfcare' AND usuario_id = ?", [
    titulo,
    pontos,
    id,
    userId,
  ]);
}

async function deleteSelfcareGoal(id, userId) {
  await db.query("UPDATE metas SET active = 0 WHERE id = ? AND tipo = 'selfcare' AND usuario_id = ?", [id, userId]);
}

async function findGoalForUser(id, userId) {
  const [rows] = await db.query(
    `SELECT id, titulo, pontos, tipo, usuario_id
     FROM metas
     WHERE id = ? AND active = 1 AND (tipo = 'today' OR (tipo = 'selfcare' AND usuario_id = ?))`,
    [id, userId]
  );

  return rows[0];
}

async function findCompletion(goalId, userId) {
  const [rows] = await db.query(
    "SELECT id FROM metas_concluidas WHERE meta_id = ? AND usuario_id = ? AND concluida_em = CURDATE()",
    [goalId, userId]
  );

  return rows[0];
}

async function completeGoal(goalId, userId) {
  await db.query("INSERT INTO metas_concluidas (meta_id, usuario_id, concluida_em) VALUES (?, ?, CURDATE())", [
    goalId,
    userId,
  ]);
}

async function uncompleteGoal(goalId, userId) {
  await db.query("DELETE FROM metas_concluidas WHERE meta_id = ? AND usuario_id = ? AND concluida_em = CURDATE()", [
    goalId,
    userId,
  ]);
}

module.exports = {
  listGoalsForUser,
  countCompletedGoals,
  listTodayAdminGoals,
  getAdminGoalsSummary,
  createTodayGoal,
  updateTodayGoal,
  deleteTodayGoal,
  createSelfcareGoal,
  updateSelfcareGoal,
  deleteSelfcareGoal,
  findGoalForUser,
  findCompletion,
  completeGoal,
  uncompleteGoal,
};
