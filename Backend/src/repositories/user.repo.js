const db = require("../config/db");

async function findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}

async function findByCpf(cpf) {
  const [rows] = await db.query("SELECT * FROM users WHERE cpf = ?",[cpf]);
  return rows[0];
}

async function createUser(name, cpf, email, password_hash) {
    const [result] = await db.query(
        "INSERT INTO users (name, cpf, email, password_hash) VALUES (?, ?, ?, ?)",
        [name, cpf, email, password_hash]
    );
    return result.insertId;
}

async function findById(id) {
    const [rows] = await db.query("SELECT id, name, email FROM users where id = ?",[id]);
    return rows[0]
}

async function userUpdate(id, name, cpf, email, password_hash) {
    await db.query(
        "UPDATE users SET name = ?, cpf = ?, email = ?, password_hash = ? WHERE id = ?",
        [name, cpf, email, password_hash, id]
    );
}

async function userDelete(id) {
  await db.query("DELETE FROM users WHERE id = ?",[id]
  );
}

module.exports = {findByEmail, findByCpf, createUser, findById, userUpdate, userDelete};