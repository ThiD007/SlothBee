const db = require("../config/db");

async function listBlogs() {
  const [rows] = await db.query(
    "SELECT id, titulo, categoria, resumo, foto_url, criado_em FROM blogs ORDER BY criado_em DESC, id DESC"
  );

  return rows;
}

async function createBlog({ titulo, categoria, resumo, foto_url }) {
  const [result] = await db.query(
    "INSERT INTO blogs (titulo, categoria, resumo, foto_url) VALUES (?, ?, ?, ?)",
    [titulo, categoria, resumo, foto_url || null]
  );

  return result.insertId;
}

async function deleteBlog(id) {
  await db.query("DELETE FROM blogs WHERE id = ?", [id]);
}

async function listFavoriteBlogIds(userId) {
  const [rows] = await db.query("SELECT blog_id FROM blog_favoritos WHERE usuario_id = ? ORDER BY criado_em DESC", [
    userId,
  ]);

  return rows.map((row) => row.blog_id);
}

async function findFavorite(userId, blogId) {
  const [rows] = await db.query("SELECT usuario_id, blog_id FROM blog_favoritos WHERE usuario_id = ? AND blog_id = ?", [
    userId,
    blogId,
  ]);

  return rows[0];
}

async function addFavorite(userId, blogId) {
  await db.query("INSERT IGNORE INTO blog_favoritos (usuario_id, blog_id) VALUES (?, ?)", [userId, blogId]);
}

async function removeFavorite(userId, blogId) {
  await db.query("DELETE FROM blog_favoritos WHERE usuario_id = ? AND blog_id = ?", [userId, blogId]);
}

module.exports = {
  listBlogs,
  createBlog,
  deleteBlog,
  listFavoriteBlogIds,
  findFavorite,
  addFavorite,
  removeFavorite,
};
