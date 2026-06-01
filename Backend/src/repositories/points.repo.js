const db = require("../config/db");

async function getHoneyPoints(userId) {
  const [rows] = await db.query("SELECT COALESCE(pontos_mel, 0) AS pontos_mel FROM usuarios WHERE id = ?", [userId]);
  return rows[0]?.pontos_mel || 0;
}

async function addHoneyPoints(userId, points) {
  if (!points) return getHoneyPoints(userId);

  await db.query("UPDATE usuarios SET pontos_mel = GREATEST(COALESCE(pontos_mel, 0) + ?, 0) WHERE id = ?", [
    points,
    userId,
  ]);

  return getHoneyPoints(userId);
}

module.exports = { getHoneyPoints, addHoneyPoints };
