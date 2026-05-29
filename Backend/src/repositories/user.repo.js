const db = require("../config/db");

async function findByEmail(email) {
    const [rows] = await db.query(
        "SELECT id, nome, email, senha AS password_hash FROM usuarios WHERE email = ?",
        [email]
    );
    return rows[0];
}

async function createUser(nome, email, senha) {
    const [result] = await db.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senha]
    );
    return result.insertId;
}

async function findById(id) {
    const [rows] = await db.query("SELECT id, nome, email FROM usuarios WHERE id = ?",[id]);
    return rows[0]
}

async function userUpdate(id, nome, email, senha) {
    await db.query(
        "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?",
        [nome, email,senha, id]
    );
}

async function userDelete(id) {
  await db.query("DELETE FROM usuarios WHERE id = ?",[id]
  );
}

module.exports = {findByEmail, createUser, findById, userUpdate, userDelete};
