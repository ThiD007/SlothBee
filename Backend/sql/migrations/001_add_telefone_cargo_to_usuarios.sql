ALTER TABLE usuarios
  ADD COLUMN telefone varchar(30) DEFAULT NULL AFTER email,
  ADD COLUMN cargo varchar(255) DEFAULT NULL AFTER telefone;
