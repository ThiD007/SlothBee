UPDATE `usuarios` SET `pontos_mel` = 0 WHERE `pontos_mel` IS NULL;

ALTER TABLE `usuarios`
  MODIFY `pontos_mel` int NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS `metas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `pontos` int NOT NULL DEFAULT 0,
  `tipo` enum('today','selfcare') NOT NULL,
  `usuario_id` int DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_metas_tipo_usuario` (`tipo`, `usuario_id`, `active`),
  CONSTRAINT `fk_metas_usuario`
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `meta_conclusoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meta_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `completed_on` date NOT NULL,
  `completed_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_meta_usuario_dia` (`meta_id`, `usuario_id`, `completed_on`),
  KEY `idx_conclusoes_usuario_dia` (`usuario_id`, `completed_on`),
  CONSTRAINT `fk_conclusoes_meta`
    FOREIGN KEY (`meta_id`) REFERENCES `metas` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_conclusoes_usuario`
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE
);

INSERT INTO `metas` (`titulo`, `pontos`, `tipo`, `usuario_id`, `active`)
SELECT 'Beber 2 copos de agua', 50, 'today', NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM `metas` WHERE `tipo` = 'today' AND `titulo` = 'Beber 2 copos de agua');

INSERT INTO `metas` (`titulo`, `pontos`, `tipo`, `usuario_id`, `active`)
SELECT 'Fazer 30 min de caminhada', 20, 'today', NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM `metas` WHERE `tipo` = 'today' AND `titulo` = 'Fazer 30 min de caminhada');

INSERT INTO `metas` (`titulo`, `pontos`, `tipo`, `usuario_id`, `active`)
SELECT 'Planejar o almoco', 20, 'today', NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM `metas` WHERE `tipo` = 'today' AND `titulo` = 'Planejar o almoco');

INSERT INTO `metas` (`titulo`, `pontos`, `tipo`, `usuario_id`, `active`)
SELECT 'Meditar 10 min', 50, 'today', NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM `metas` WHERE `tipo` = 'today' AND `titulo` = 'Meditar 10 min');

INSERT INTO `metas` (`titulo`, `pontos`, `tipo`, `usuario_id`, `active`)
SELECT 'Anotar uma tarefa leve', 15, 'today', NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM `metas` WHERE `tipo` = 'today' AND `titulo` = 'Anotar uma tarefa leve');
