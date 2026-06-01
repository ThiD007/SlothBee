CREATE TABLE IF NOT EXISTS `cronometros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `modo` enum('cronometro','contagem_regressiva') NOT NULL DEFAULT 'cronometro',
  `duracao_segundos` int DEFAULT NULL,
  `iniciado_em` datetime NOT NULL,
  `finalizado_em` datetime DEFAULT NULL,
  `status` enum('ativo','finalizado') NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (`id`),
  KEY `idx_cronometros_usuario_status` (`usuario_id`, `status`),
  CONSTRAINT `fk_cronometros_usuario`
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE
);
