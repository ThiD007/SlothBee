const db = require("../config/db");

const defaultSelfcareGoals = [
  ["Checar postura no foco", 15],
  ["Fazer pausas conscientes", 15],
  ["Alongar o corpo", 15],
  ["Modo sem tela", 15],
  ["Cuidar do humor", 15],
];

async function ensureSelfcareGoals(userId) {
  const result = await db.query(
    "SELECT COUNT(*) AS total FROM metas WHERE tipo = 'selfcare' AND usuario_id = $1 AND active = TRUE",
    [userId]
  );

  if (Number(result.rows[0].total) > 0) return;

  await Promise.all(
    defaultSelfcareGoals.map(([titulo, pontos]) =>
      db.query("INSERT INTO metas (titulo, pontos, tipo, usuario_id, active) VALUES ($1, $2, 'selfcare', $3, TRUE)", [
        titulo,
        pontos,
        userId,
      ])
    )
  );
}

async function listGoalsForUser(userId) {
  await ensureSelfcareGoals(userId);

  const result = await db.query(
    `SELECT
       m.id,
       m.titulo,
       m.pontos,
       m.tipo,
       CASE WHEN c.id IS NULL THEN 0 ELSE 1 END AS done
     FROM metas m
     LEFT JOIN metas_concluidas c
       ON c.meta_id = m.id AND c.usuario_id = $1 AND c.concluida_em = CURRENT_DATE
     WHERE m.active = TRUE
       AND (m.tipo = 'today' OR (m.tipo = 'selfcare' AND m.usuario_id = $2))
     ORDER BY m.tipo, m.id`,
    [userId, userId]
  );

  return result.rows;
}

async function countCompletedGoals(userId) {
  const result = await db.query(
    "SELECT COUNT(*) AS total FROM metas_concluidas WHERE usuario_id = $1 AND concluida_em = CURRENT_DATE",
    [userId]
  );
  return Number(result.rows[0]?.total) || 0;
}

async function listTodayAdminGoals() {
  const result = await db.query(
    "SELECT id, titulo, pontos, tipo FROM metas WHERE tipo = 'today' AND active = TRUE ORDER BY id"
  );

  return result.rows;
}

async function getAdminGoalsSummary() {
  const result = await db.query(
    `SELECT
       COUNT(*) AS total_sent_goals,
       SUM(CASE WHEN active = TRUE THEN 1 ELSE 0 END) AS active_sent_goals
     FROM metas
     WHERE tipo = 'today' AND usuario_id IS NULL`
  );

  return {
    totalSentGoals: Number(result.rows[0]?.total_sent_goals) || 0,
    activeSentGoals: Number(result.rows[0]?.active_sent_goals) || 0,
  };
}

async function createTodayGoal(titulo, pontos) {
  const result = await db.query(
    "INSERT INTO metas (titulo, pontos, tipo, usuario_id, active) VALUES ($1, $2, 'today', NULL, TRUE) RETURNING id",
    [titulo, pontos]
  );

  return result.rows[0].id;
}

async function updateTodayGoal(id, titulo, pontos) {
  await db.query("UPDATE metas SET titulo = $1, pontos = $2 WHERE id = $3 AND tipo = 'today'", [titulo, pontos, id]);
}

async function deleteTodayGoal(id) {
  await db.query("UPDATE metas SET active = FALSE WHERE id = $1 AND tipo = 'today'", [id]);
}

async function createSelfcareGoal(userId, titulo, pontos) {
  const result = await db.query(
    "INSERT INTO metas (titulo, pontos, tipo, usuario_id, active) VALUES ($1, $2, 'selfcare', $3, TRUE) RETURNING id",
    [titulo, pontos, userId]
  );

  return result.rows[0].id;
}

async function updateSelfcareGoal(id, userId, titulo, pontos) {
  await db.query("UPDATE metas SET titulo = $1, pontos = $2 WHERE id = $3 AND tipo = 'selfcare' AND usuario_id = $4", [
    titulo,
    pontos,
    id,
    userId,
  ]);
}

async function deleteSelfcareGoal(id, userId) {
  await db.query("UPDATE metas SET active = FALSE WHERE id = $1 AND tipo = 'selfcare' AND usuario_id = $2", [id, userId]);
}

async function findGoalForUser(id, userId) {
  const result = await db.query(
    `SELECT id, titulo, pontos, tipo, usuario_id
     FROM metas
     WHERE id = $1 AND active = TRUE AND (tipo = 'today' OR (tipo = 'selfcare' AND usuario_id = $2))`,
    [id, userId]
  );

  return result.rows[0];
}

async function findCompletion(goalId, userId) {
  const result = await db.query(
    "SELECT id FROM metas_concluidas WHERE meta_id = $1 AND usuario_id = $2 AND concluida_em = CURRENT_DATE",
    [goalId, userId]
  );

  return result.rows[0];
}

async function completeGoal(goalId, userId) {
  await db.query("INSERT INTO metas_concluidas (meta_id, usuario_id, concluida_em) VALUES ($1, $2, CURRENT_DATE)", [
    goalId,
    userId,
  ]);
}

async function uncompleteGoal(goalId, userId) {
  await db.query("DELETE FROM metas_concluidas WHERE meta_id = $1 AND usuario_id = $2 AND concluida_em = CURRENT_DATE", [
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
