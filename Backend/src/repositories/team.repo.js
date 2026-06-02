const db = require("../config/db");

function focusSecondsExpression(alias = "c") {
  return `GREATEST(
    CASE
      WHEN ${alias}.modo = 'contagem_regressiva' AND ${alias}.duracao_segundos IS NOT NULL THEN
        LEAST(EXTRACT(EPOCH FROM (${alias}.finalizado_em - ${alias}.iniciado_em)), ${alias}.duracao_segundos)
      ELSE
        EXTRACT(EPOCH FROM (${alias}.finalizado_em - ${alias}.iniciado_em))
    END,
    0
  )`;
}

function teamActivityJoin() {
  const focusSeconds = focusSecondsExpression("c");

  return `LEFT JOIN (
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
        c.usuario_id,
        COUNT(*) AS completed_sessions,
        COALESCE(SUM(${focusSeconds}), 0) AS focus_seconds,
        MAX(c.finalizado_em) AS last_timer_at
      FROM cronometros c
      WHERE c.status = 'finalizado'
        AND c.finalizado_em >= NOW() - INTERVAL '7 days'
      GROUP BY c.usuario_id
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
      WHERE mc.concluida_em >= CURRENT_DATE - INTERVAL '6 days'
      GROUP BY mc.usuario_id
    ) goal_activity ON goal_activity.usuario_id = team_users.id
    WHERE team_users.equipe_id IS NOT NULL
    GROUP BY team_users.equipe_id
  ) activity ON activity.equipe_id = e.id`;
}

function teamSelectQuery(whereClause = "") {
  return `SELECT
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
     SELECT equipe_id, COUNT(*) AS total_integrantes, string_agg(id::text, ',') AS integrantes
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
   ${teamActivityJoin()}
   ${whereClause}
   ORDER BY e.nome_equipe`;
}

async function listTeams() {
  const result = await db.query(teamSelectQuery());

  return result.rows;
}

async function findTeamById(id) {
  const result = await db.query(teamSelectQuery("WHERE e.id = $1"), [id]);

  return result.rows[0];
}

async function findTeamByUserId(userId) {
  const result = await db.query("SELECT equipe_id FROM usuarios WHERE id = $1", [userId]);
  const teamId = result.rows[0]?.equipe_id;

  if (!teamId) return null;

  return findTeamById(teamId);
}

async function getWeeklyChartData(teamId) {
  const focusSeconds = focusSecondsExpression("c");

  const timerResult = await db.query(
    `SELECT
       (EXTRACT(ISODOW FROM c.finalizado_em)::int - 1) AS day_index,
       COALESCE(SUM(${focusSeconds}), 0) AS focus_seconds
     FROM cronometros c
     INNER JOIN usuarios u ON u.id = c.usuario_id
     WHERE u.equipe_id = $1
       AND c.status = 'finalizado'
       AND date_trunc('week', c.finalizado_em)::date = date_trunc('week', CURRENT_DATE)::date
     GROUP BY (EXTRACT(ISODOW FROM c.finalizado_em)::int - 1)`,
    [teamId]
  );

  const goalResult = await db.query(
    `SELECT
       (EXTRACT(ISODOW FROM mc.concluida_em)::int - 1) AS day_index,
       SUM(CASE WHEN m.tipo = 'today' THEN 1 ELSE 0 END) AS completed_focus_goals,
       SUM(CASE WHEN m.tipo = 'selfcare' THEN 1 ELSE 0 END) AS completed_rest_goals
     FROM metas_concluidas mc
     INNER JOIN metas m ON m.id = mc.meta_id
     INNER JOIN usuarios u ON u.id = mc.usuario_id
     WHERE u.equipe_id = $1
       AND date_trunc('week', mc.concluida_em)::date = date_trunc('week', CURRENT_DATE)::date
     GROUP BY (EXTRACT(ISODOW FROM mc.concluida_em)::int - 1)`,
    [teamId]
  );

  const memberResult = await db.query(
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
         AND date_trunc('week', c.finalizado_em)::date = date_trunc('week', CURRENT_DATE)::date
       GROUP BY c.usuario_id
     ) timer_activity ON timer_activity.usuario_id = u.id
     LEFT JOIN (
       SELECT
         mc.usuario_id,
         SUM(CASE WHEN m.tipo = 'today' THEN 1 ELSE 0 END) AS completed_focus_goals,
         SUM(CASE WHEN m.tipo = 'selfcare' THEN 1 ELSE 0 END) AS completed_rest_goals
       FROM metas_concluidas mc
       INNER JOIN metas m ON m.id = mc.meta_id
       WHERE date_trunc('week', mc.concluida_em)::date = date_trunc('week', CURRENT_DATE)::date
       GROUP BY mc.usuario_id
     ) goal_activity ON goal_activity.usuario_id = u.id
     WHERE u.equipe_id = $1
     ORDER BY u.nome`,
    [teamId]
  );

  return { timerRows: timerResult.rows, goalRows: goalResult.rows, memberRows: memberResult.rows };
}

async function assignTeamMembers(client, teamId, memberIds) {
  await client.query("UPDATE usuarios SET equipe_id = NULL WHERE equipe_id = $1", [teamId]);

  if (memberIds.length === 0) return;

  const placeholders = memberIds.map((_, index) => `$${index + 2}`).join(", ");
  await client.query(`UPDATE usuarios SET equipe_id = $1 WHERE id IN (${placeholders})`, [teamId, ...memberIds]);
}

async function createTeam({ nome_equipe, integrantes }) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query("INSERT INTO equipes (nome_equipe) VALUES ($1) RETURNING id", [nome_equipe]);
    const teamId = result.rows[0].id;
    await assignTeamMembers(client, teamId, integrantes);
    await client.query("COMMIT");
    return teamId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function updateTeam(id, { nome_equipe, integrantes }) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query("UPDATE equipes SET nome_equipe = $1 WHERE id = $2", [nome_equipe, id]);
    if (result.rowCount === 0) {
      await client.query("ROLLBACK");
      return false;
    }

    await assignTeamMembers(client, id, integrantes);
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function deleteTeam(id) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    await client.query("UPDATE usuarios SET equipe_id = NULL WHERE equipe_id = $1", [id]);
    const result = await client.query("DELETE FROM equipes WHERE id = $1", [id]);
    await client.query("COMMIT");
    return result.rowCount > 0;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
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
