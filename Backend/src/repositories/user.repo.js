const db = require("../config/db");

async function findByEmail(email) {
    const [rows] = await db.query(
        "SELECT id, nome, email, telefone, cargo, foto_perfil, senha AS password_hash FROM usuarios WHERE email = ?",
        [email]
    );
    return rows[0];
}

async function createUser(nome, email, senha, telefone = null, cargo = null) {
    const [result] = await db.query(
        "INSERT INTO usuarios (nome, email, senha, telefone, cargo) VALUES (?, ?, ?, ?, ?)",
        [nome, email, senha, telefone, cargo]
    );
    return result.insertId;
}

async function findById(id) {
    const [rows] = await db.query("SELECT id, nome, email, telefone, cargo, foto_perfil FROM usuarios WHERE id = ?",[id]);
    return rows[0]
}

async function userUpdate(id, { nome, email, telefone, cargo, senha }) {
    const fields = ["nome = ?", "email = ?", "telefone = ?", "cargo = ?"];
    const values = [nome, email, telefone || null, cargo || null];

    if (senha) {
        fields.push("senha = ?");
        values.push(senha);
    }

    values.push(id);

    await db.query(
        `UPDATE usuarios SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
}

async function userPhotoUpdate(id, foto_perfil) {
    await db.query(
        "UPDATE usuarios SET foto_perfil = ? WHERE id = ?",
        [foto_perfil, id]
    );
}

async function userDelete(id) {
  await db.query("DELETE FROM usuarios WHERE id = ?",[id]
  );
}

module.exports = {findByEmail, createUser, findById, userUpdate, userPhotoUpdate, userDelete};
