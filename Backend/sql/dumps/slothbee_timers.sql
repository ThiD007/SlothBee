CREATE TABLE IF NOT EXISTS `sessoes_foco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `mode` enum('stopwatch','countdown') NOT NULL DEFAULT 'stopwatch',
  `duration_seconds` int DEFAULT NULL,
  `started_at` datetime NOT NULL,
  `ended_at` datetime DEFAULT NULL,
  `status` enum('active','finished') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `idx_sessoes_foco_usuario_status` (`usuario_id`, `status`),
  CONSTRAINT `fk_sessoes_foco_usuario`
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE
);
