const db = require("../config/db");

async function findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}

async function createUser(name, email, senha) {
    const [result] = await db.query(
        "INSERT INTO users (name, email, senha) VALUES (?, ?, ?)",
        [name, email, senha]
    );
    return result.insertId;
}

async function findById(id) {
    const [rows] = await db.query("SELECT id, name, email FROM users where id = ?",[id]);
    return rows[0]
}

async function userUpdate(id, name, email, senha) {
    await db.query(
        "UPDATE users SET name = ?, email = ?, senha = ? WHERE id = ?",
        [name, email,senha, id]
    );
}

async function userDelete(id) {
  await db.query("DELETE FROM users WHERE id = ?",[id]
  );
}

module.exports = {findByEmail, createUser, findById, userUpdate, userDelete};