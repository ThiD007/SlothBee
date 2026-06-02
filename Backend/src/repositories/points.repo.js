const db = require("../config/db");

async function getHoneyPoints(userId) {
  const result = await db.query("SELECT COALESCE(pontos_mel, 0) AS pontos_mel FROM usuarios WHERE id = $1", [userId]);
  return result.rows[0]?.pontos_mel || 0;
}

async function addHoneyPoints(userId, points) {
  if (!points) return getHoneyPoints(userId);

  await db.query("UPDATE usuarios SET pontos_mel = GREATEST(COALESCE(pontos_mel, 0) + $1, 0) WHERE id = $2", [
    points,
    userId,
  ]);

  return getHoneyPoints(userId);
}

module.exports = { getHoneyPoints, addHoneyPoints };
