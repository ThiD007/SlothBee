-- Ideia de banco de dados para o SlothBee
-- Use este arquivo como referencia para evoluir o banco atual.

ALTER TABLE usuarios
  ADD COLUMN telefone VARCHAR(20) NULL AFTER email,
  ADD COLUMN cargo VARCHAR(120) NULL AFTER telefone;

CREATE TABLE profissionais (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  especialidade VARCHAR(120) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  imagem_url VARCHAR(255) NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
);

CREATE TABLE posts_blog (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(160) NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  resumo VARCHAR(255) NOT NULL,
  conteudo TEXT NOT NULL,
  imagem_url VARCHAR(255) NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE contatos_profissionais (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NULL,
  profissional_id INT NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_contatos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_contatos_profissional
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
    ON DELETE CASCADE
);

INSERT INTO profissionais (nome, especialidade, telefone, imagem_url)
VALUES ('Dra. Mariana Alves', 'Psicologa clinica', '(11) 99876-5432', '/profissionais/mariana-alves.png');
