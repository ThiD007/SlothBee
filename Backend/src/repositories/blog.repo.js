const db = require("../config/db");

async function listBlogs() {
  const result = await db.query(
    "SELECT id, titulo, categoria, resumo, foto_url, criado_em FROM blogs ORDER BY criado_em DESC, id DESC"
  );

  return result.rows;
}

async function findBlogById(id) {
  const result = await db.query("SELECT id, titulo, categoria, resumo, foto_url, criado_em FROM blogs WHERE id = $1", [
    id,
  ]);

  return result.rows[0];
}

async function createBlog({ titulo, categoria, resumo, foto_url }) {
  const result = await db.query(
    "INSERT INTO blogs (titulo, categoria, resumo, foto_url) VALUES ($1, $2, $3, $4) RETURNING id",
    [titulo, categoria, resumo, foto_url || null]
  );

  return result.rows[0].id;
}

async function updateBlog(id, { titulo, categoria, resumo, foto_url }) {
  const fields = ["titulo = $1", "categoria = $2", "resumo = $3"];
  const values = [titulo, categoria, resumo];

  if (foto_url !== undefined) {
    fields.push(`foto_url = $${fields.length + 1}`);
    values.push(foto_url || null);
  }

  values.push(id);

  const result = await db.query(`UPDATE blogs SET ${fields.join(", ")} WHERE id = $${values.length}`, values);
  return result.rowCount > 0;
}

async function deleteBlog(id) {
  await db.query("DELETE FROM blogs WHERE id = $1", [id]);
}

async function listFavoriteBlogIds(userId) {
  const result = await db.query("SELECT blog_id FROM blog_favoritos WHERE usuario_id = $1 ORDER BY criado_em DESC", [
    userId,
  ]);

  return result.rows.map((row) => row.blog_id);
}

async function findFavorite(userId, blogId) {
  const result = await db.query(
    "SELECT usuario_id, blog_id FROM blog_favoritos WHERE usuario_id = $1 AND blog_id = $2",
    [userId, blogId]
  );

  return result.rows[0];
}

async function addFavorite(userId, blogId) {
  await db.query("INSERT INTO blog_favoritos (usuario_id, blog_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [
    userId,
    blogId,
  ]);
}

async function removeFavorite(userId, blogId) {
  await db.query("DELETE FROM blog_favoritos WHERE usuario_id = $1 AND blog_id = $2", [userId, blogId]);
}

module.exports = {
  listBlogs,
  findBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  listFavoriteBlogIds,
  findFavorite,
  addFavorite,
  removeFavorite,
};
