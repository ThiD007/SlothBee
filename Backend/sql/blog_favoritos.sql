CREATE TABLE IF NOT EXISTS blog_favoritos (
  usuario_id INT NOT NULL,
  blog_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, blog_id),
  CONSTRAINT fk_blog_favoritos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_blog_favoritos_blog
    FOREIGN KEY (blog_id) REFERENCES blogs(id)
    ON DELETE CASCADE
);
