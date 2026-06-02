const db = require("../config/db");

async function listTeams() {
  const [rows] = await db.query(
    `SELECT
       e.id,
       e.nome_equipe,
       COALESCE(points.total_pontos, 0) AS pontos_equipe,
       COALESCE(goals.total_metas, 0) AS metas_equipe,
       COALESCE(members.total_integrantes, 0) AS total_integrantes,
       COALESCE(members.integrantes, '') AS integrantes,
       COALESCE(activity.completed_sessions, 0) AS completed_sessions,
       COALESCE(activity.focus_seconds, 0) AS focus_seconds,
       COALESCE(activity.completed_goals, 0) AS completed_goals,
       COALESCE(activity.completed_focus_goals, 0) AS completed_focus_goals,
       COALESCE(activity.completed_rest_goals, 0) AS completed_rest_goals,
       activity.last_timer_at,
       activity.last_goal_at
     FROM equipes e
     LEFT JOIN (
       SELECT equipe_id, SUM(COALESCE(pontos_mel, 0)) AS total_pontos
       FROM usuarios
       WHERE equipe_id IS NOT NULL
       GROUP BY equipe_id
     ) points ON points.equipe_id = e.id
     LEFT JOIN (
       SELECT equipe_id, COUNT(*) AS total_integrantes, GROUP_CONCAT(id) AS integrantes
       FROM usuarios
       WHERE equipe_id IS NOT NULL
       GROUP BY equipe_id
     ) members ON members.equipe_id = e.id
     LEFT JOIN (
       SELECT u.equipe_id, COUNT(mc.id) AS total_metas
       FROM usuarios u
       LEFT JOIN metas_concluidas mc ON mc.usuario_id = u.id
       WHERE u.equipe_id IS NOT NULL
       GROUP BY u.equipe_id
     ) goals ON goals.equipe_id = e.id
     LEFT JOIN (
       SELECT
         team_users.equipe_id,
         COALESCE(SUM(timer_activity.completed_sessions), 0) AS completed_sessions,
         COALESCE(SUM(timer_activity.focus_seconds), 0) AS focus_seconds,
         COALESCE(SUM(goal_activity.completed_goals), 0) AS completed_goals,
         COALESCE(SUM(goal_activity.completed_focus_goals), 0) AS completed_focus_goals,
         COALESCE(SUM(goal_activity.completed_rest_goals), 0) AS completed_rest_goals,
         MAX(timer_activity.last_timer_at) AS last_timer_at,
         MAX(goal_activity.last_goal_at) AS last_goal_at
       FROM usuarios team_users
       LEFT JOIN (
         SELECT
           usuario_id,
           COUNT(*) AS completed_sessions,
           COALESCE(SUM(
             GREATEST(
               CASE
                 WHEN modo = 'contagem_regressiva' AND duracao_segundos IS NOT NULL THEN
                   LEAST(TIMESTAMPDIFF(SECOND, iniciado_em, finalizado_em), duracao_segundos)
                 ELSE
                   TIMESTAMPDIFF(SECOND, iniciado_em, finalizado_em)
               END,
               0
             )
           ), 0) AS focus_seconds,
           MAX(finalizado_em) AS last_timer_at
         FROM cronometros
         WHERE status = 'finalizado'
           AND finalizado_em >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         GROUP BY usuario_id
       ) timer_activity ON timer_activity.usuario_id = team_users.id
       LEFT JOIN (
         SELECT
           mc.usuario_id,
           COUNT(*) AS completed_goals,
           SUM(CASE WHEN m.tipo = 'today' THEN 1 ELSE 0 END) AS completed_focus_goals,
           SUM(CASE WHEN m.tipo = 'selfcare' THEN 1 ELSE 0 END) AS completed_rest_goals,
           MAX(mc.registrado_em) AS last_goal_at
         FROM metas_concluidas mc
         INNER JOIN metas m ON m.id = mc.meta_id
         WHERE mc.concluida_em >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
         GROUP BY mc.usuario_id
       ) goal_activity ON goal_activity.usuario_id = team_users.id
       WHERE team_users.equipe_id IS NOT NULL
       GROUP BY team_users.equipe_id
     ) activity ON activity.equipe_id = e.id
     ORDER BY e.nome_equipe`
  );

  return rows;
}

async function findTeamById(id) {
  const [rows] = await db.query(
    `SELECT
       e.id,
       e.nome_equipe,
       COALESCE(points.total_pontos, 0) AS pontos_equipe,
       COALESCE(goals.total_metas, 0) AS metas_equipe,
       COALESCE(members.total_integrantes, 0) AS total_integrantes,
       COALESCE(members.integrantes, '') AS integrantes,
       COALESCE(activity.completed_sessions, 0) AS completed_sessions,
       COALESCE(activity.focus_seconds, 0) AS focus_seconds,
       COALESCE(activity.completed_goals, 0) AS completed_goals,
       COALESCE(activity.completed_focus_goals, 0) AS completed_focus_goals,
       COALESCE(activity.completed_rest_goals, 0) AS completed_rest_goals,
       activity.last_timer_at,
       activity.last_goal_at
     FROM equipes e
     LEFT JOIN (
       SELECT equipe_id, SUM(COALESCE(pontos_mel, 0)) AS total_pontos
       FROM usuarios
       WHERE equipe_id IS NOT NULL
       GROUP BY equipe_id
     ) points ON points.equipe_id = e.id
     LEFT JOIN (
       SELECT equipe_id, COUNT(*) AS total_integrantes, GROUP_CONCAT(id) AS integrantes
       FROM usuarios
       WHERE equipe_id IS NOT NULL
       GROUP BY equipe_id
     ) members ON members.equipe_id = e.id
     LEFT JOIN (
       SELECT u.equipe_id, COUNT(mc.id) AS total_metas
       FROM usuarios u
       LEFT JOIN metas_concluidas mc ON mc.usuario_id = u.id
       WHERE u.equipe_id IS NOT NULL
       GROUP BY u.equipe_id
     ) goals ON goals.equipe_id = e.id
     LEFT JOIN (
       SELECT
         team_users.equipe_id,
         COALESCE(SUM(timer_activity.completed_sessions), 0) AS completed_sessions,
         COALESCE(SUM(timer_activity.focus_seconds), 0) AS focus_seconds,
         COALESCE(SUM(goal_activity.completed_goals), 0) AS completed_goals,
         COALESCE(SUM(goal_activity.completed_focus_goals), 0) AS completed_focus_goals,
         COALESCE(SUM(goal_activity.completed_rest_goals), 0) AS completed_rest_goals,
         MAX(timer_activity.last_timer_at) AS last_timer_at,
         MAX(goal_activity.last_goal_at) AS last_goal_at
       FROM usuarios team_users
       LEFT JOIN (
         SELECT
           usuario_id,
           COUNT(*) AS completed_sessions,
           COALESCE(SUM(
             GREATEST(
               CASE
                 WHEN modo = 'contagem_regressiva' AND duracao_segundos IS NOT NULL THEN
                   LEAST(TIMESTAMPDIFF(SECOND, iniciado_em, finalizado_em), duracao_segundos)
                 ELSE
                   TIMESTAMPDIFF(SECOND, iniciado_em, finalizado_em)
               END,
               0
             )
           ), 0) AS focus_seconds,
           MAX(finalizado_em) AS last_timer_at
         FROM cronometros
         WHERE status = 'finalizado'
           AND finalizado_em >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         GROUP BY usuario_id
       ) timer_activity ON timer_activity.usuario_id = team_users.id
       LEFT JOIN (
         SELECT
           mc.usuario_id,
           COUNT(*) AS completed_goals,
           SUM(CASE WHEN m.tipo = 'today' THEN 1 ELSE 0 END) AS completed_focus_goals,
           SUM(CASE WHEN m.tipo = 'selfcare' THEN 1 ELSE 0 END) AS completed_rest_goals,
           MAX(mc.registrado_em) AS last_goal_at
         FROM metas_concluidas mc
         INNER JOIN metas m ON m.id = mc.meta_id
         WHERE mc.concluida_em >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
         GROUP BY mc.usuario_id
       ) goal_activity ON goal_activity.usuario_id = team_users.id
       WHERE team_users.equipe_id IS NOT NULL
       GROUP BY team_users.equipe_id
     ) activity ON activity.equipe_id = e.id
     WHERE e.id = ?
     GROUP BY
       e.id,
       e.nome_equipe,
       points.total_pontos,
       goals.total_metas,
       members.total_integrantes,
       members.integrantes,
       activity.completed_sessions,
       activity.focus_seconds,
       activity.completed_goals,
       activity.completed_focus_goals,
       activity.completed_rest_goals,
       activity.last_timer_at,
       activity.last_goal_at`,
    [id]
  );

  return rows[0];
}

async function findTeamByUserId(userId) {
  const [rows] = await db.query("SELECT equipe_id FROM usuarios WHERE id = ?", [userId]);
  const teamId = rows[0]?.equipe_id;

  if (!teamId) return null;

  return findTeamById(teamId);
}

function focusSecondsExpression(alias = "c") {
  return `GREATEST(
    CASE
      WHEN ${alias}.modo = 'contagem_regressiva' AND ${alias}.duracao_segundos IS NOT NULL THEN
        LEAST(TIMESTAMPDIFF(SECOND, ${alias}.iniciado_em, ${alias}.finalizado_em), ${alias}.duracao_segundos)
      ELSE
        TIMESTAMPDIFF(SECOND, ${alias}.iniciado_em, ${alias}.finalizado_em)
    END,
    0
  )`;
}

async function getWeeklyChartData(teamId) {
  const focusSeconds = focusSecondsExpression("c");

  const [timerRows] = await db.query(
    `SELECT
       WEEKDAY(c.finalizado_em) AS day_index,
       COALESCE(SUM(${focusSeconds}), 0) AS focus_seconds
     FROM cronometros c
     INNER JOIN usuarios u ON u.id = c.usuario_id
     WHERE u.equipe_id = ?
       AND c.status = 'finalizado'
       AND YEARWEEK(c.finalizado_em, 1) = YEARWEEK(CURDATE(), 1)
     GROUP BY WEEKDAY(c.finalizado_em)`,
    [teamId]
  );

  const [goalRows] = await db.query(
    `SELECT
       WEEKDAY(mc.concluida_em) AS day_index,
       SUM(CASE WHEN m.tipo = 'today' THEN 1 ELSE 0 END) AS completed_focus_goals,
       SUM(CASE WHEN m.tipo = 'selfcare' THEN 1 ELSE 0 END) AS completed_rest_goals
     FROM metas_concluidas mc
     INNER JOIN metas m ON m.id = mc.meta_id
     INNER JOIN usuarios u ON u.id = mc.usuario_id
     WHERE u.equipe_id = ?
       AND YEARWEEK(mc.concluida_em, 1) = YEARWEEK(CURDATE(), 1)
     GROUP BY WEEKDAY(mc.concluida_em)`,
    [teamId]
  );

  const [memberRows] = await db.query(
    `SELECT
       u.id,
       u.nome,
       COALESCE(timer_activity.focus_seconds, 0) AS focus_seconds,
       COALESCE(goal_activity.completed_focus_goals, 0) AS completed_focus_goals,
       COALESCE(goal_activity.completed_rest_goals, 0) AS completed_rest_goals
     FROM usuarios u
     LEFT JOIN (
       SELECT
         c.usuario_id,
         COALESCE(SUM(${focusSeconds}), 0) AS focus_seconds
       FROM cronometros c
       WHERE c.status = 'finalizado'
         AND YEARWEEK(c.finalizado_em, 1) = YEARWEEK(CURDATE(), 1)
       GROUP BY c.usuario_id
     ) timer_activity ON timer_activity.usuario_id = u.id
     LEFT JOIN (
       SELECT
         mc.usuario_id,
         SUM(CASE WHEN m.tipo = 'today' THEN 1 ELSE 0 END) AS completed_focus_goals,
         SUM(CASE WHEN m.tipo = 'selfcare' THEN 1 ELSE 0 END) AS completed_rest_goals
       FROM metas_concluidas mc
       INNER JOIN metas m ON m.id = mc.meta_id
       WHERE YEARWEEK(mc.concluida_em, 1) = YEARWEEK(CURDATE(), 1)
       GROUP BY mc.usuario_id
     ) goal_activity ON goal_activity.usuario_id = u.id
     WHERE u.equipe_id = ?
     ORDER BY u.nome`,
    [teamId]
  );

  return { timerRows, goalRows, memberRows };
}

async function assignTeamMembers(connection, teamId, memberIds) {
  await connection.query("UPDATE usuarios SET equipe_id = NULL WHERE equipe_id = ?", [teamId]);

  if (memberIds.length === 0) return;

  const placeholders = memberIds.map(() => "?").join(", ");
  await connection.query(`UPDATE usuarios SET equipe_id = ? WHERE id IN (${placeholders})`, [teamId, ...memberIds]);
}

async function createTeam({ nome_equipe, integrantes }) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const [result] = await connection.query("INSERT INTO equipes (nome_equipe) VALUES (?)", [nome_equipe]);
    await assignTeamMembers(connection, result.insertId, integrantes);
    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function updateTeam(id, { nome_equipe, integrantes }) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const [result] = await connection.query("UPDATE equipes SET nome_equipe = ? WHERE id = ?", [nome_equipe, id]);
    if (result.affectedRows === 0) {
      await connection.rollback();
      return false;
    }

    await assignTeamMembers(connection, id, integrantes);
    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

}

async function deleteTeam(id) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("UPDATE usuarios SET equipe_id = NULL WHERE equipe_id = ?", [id]);
    const [result] = await connection.query("DELETE FROM equipes WHERE id = ?", [id]);
    await connection.commit();
    return result.affectedRows > 0;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  listTeams,
  findTeamById,
  findTeamByUserId,
  getWeeklyChartData,
  createTeam,
  updateTeam,
  deleteTeam,
};
