-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: slothbee
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `metas`
--

DROP TABLE IF EXISTS `metas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `pontos` int NOT NULL DEFAULT '0',
  `tipo` enum('today','selfcare') NOT NULL,
  `usuario_id` int DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_metas_tipo_usuario` (`tipo`,`usuario_id`,`active`),
  KEY `fk_metas_usuario` (`usuario_id`),
  CONSTRAINT `fk_metas_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metas`
--

LOCK TABLES `metas` WRITE;
/*!40000 ALTER TABLE `metas` DISABLE KEYS */;
INSERT INTO `metas` VALUES (1,'Fazer pausas',15,'selfcare',5,1,'2026-06-01 15:46:02'),(2,'Checar postura no foco',50,'selfcare',5,1,'2026-06-01 15:46:02'),(3,'Cuidar do humor',15,'selfcare',5,1,'2026-06-01 15:46:02'),(4,'Modo sem tela',30,'selfcare',5,1,'2026-06-01 15:46:02'),(5,'Alongar o corpo',20,'selfcare',5,0,'2026-06-01 15:46:02'),(6,'Beber 2l de água',15,'selfcare',5,1,'2026-06-01 15:46:42'),(7,'deydheyde',15,'selfcare',5,0,'2026-06-01 15:46:49'),(8,'deeeeeeeee',15,'selfcare',5,0,'2026-06-01 15:48:44'),(9,'ddddddddddd',15,'selfcare',5,0,'2026-06-01 15:48:49'),(10,'Checar postura no foco',15,'selfcare',6,1,'2026-06-01 16:16:43'),(11,'Fazer pausas conscientes',15,'selfcare',6,1,'2026-06-01 16:16:43'),(12,'Modo sem tela',15,'selfcare',6,1,'2026-06-01 16:16:43'),(13,'Alongar o corpo',15,'selfcare',6,1,'2026-06-01 16:16:43'),(14,'Cuidar do humor',15,'selfcare',6,1,'2026-06-01 16:16:43'),(15,'Desenvolver projeto x',15,'today',NULL,1,'2026-06-01 16:25:11'),(16,'Checar postura no foco',15,'selfcare',7,1,'2026-06-02 09:47:00'),(17,'Fazer pausas conscientes',15,'selfcare',7,1,'2026-06-02 09:47:00'),(18,'Alongar o corpo',15,'selfcare',7,1,'2026-06-02 09:47:00'),(19,'Modo sem tela',15,'selfcare',7,1,'2026-06-02 09:47:00'),(20,'Cuidar do humor',15,'selfcare',7,1,'2026-06-02 09:47:00'),(21,'Desing dos botões',15,'today',NULL,1,'2026-06-02 09:54:58'),(22,'Crud dos produtos',15,'today',NULL,1,'2026-06-02 09:55:21');
/*!40000 ALTER TABLE `metas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-02 10:11:25
