const db = require("../config/db");

async function findByEmail(email) {
  const result = await db.query(
    "SELECT id, nome, email, telefone, cargo, foto_perfil, senha AS password_hash FROM usuarios WHERE email = $1",
    [email]
  );

  return result.rows[0];
}

async function createUser(nome, email, senha, telefone = null, cargo = null) {
  const result = await db.query(
    "INSERT INTO usuarios (nome, email, senha, telefone, cargo) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [nome, email, senha, telefone, cargo]
  );

  return result.rows[0].id;
}

async function findById(id) {
  const result = await db.query(
    "SELECT id, nome, email, telefone, cargo, foto_perfil FROM usuarios WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

async function listUsers() {
  const result = await db.query(
    `SELECT
      id,
      nome,
      email,
      telefone,
      cargo,
      foto_perfil,
      COALESCE(pontos_mel, 0) AS pontos_mel,
      equipe_id
    FROM usuarios
    ORDER BY nome`
  );

  return result.rows;
}

async function userUpdate(id, { nome, email, telefone, cargo, senha }) {
  const fields = ["nome = $1", "email = $2", "telefone = $3", "cargo = $4"];
  const values = [nome, email, telefone || null, cargo || null];

  if (senha) {
    fields.push("senha = $5");
    values.push(senha);
    values.push(id);

    await db.query(
      `UPDATE usuarios SET ${fields.join(", ")} WHERE id = $6`,
      values
    );
    return;
  }

  values.push(id);

  await db.query(
    `UPDATE usuarios SET ${fields.join(", ")} WHERE id = $5`,
    values
  );
}

async function userPhotoUpdate(id, foto_perfil) {
  await db.query(
    "UPDATE usuarios SET foto_perfil = $1 WHERE id = $2",
    [foto_perfil, id]
  );
}

async function userDelete(id) {
  await db.query(
    "DELETE FROM usuarios WHERE id = $1",
    [id]
  );
}

module.exports = {
  findByEmail,
  createUser,
  findById,
  listUsers,
  userUpdate,
  userPhotoUpdate,
  userDelete
};