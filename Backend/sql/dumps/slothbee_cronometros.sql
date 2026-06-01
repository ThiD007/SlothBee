-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: slothbee
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `cronometros`
--

DROP TABLE IF EXISTS `cronometros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cronometros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `modo` enum('cronometro','contagem_regressiva') NOT NULL DEFAULT 'cronometro',
  `duracao_segundos` int DEFAULT NULL,
  `iniciado_em` datetime NOT NULL,
  `finalizado_em` datetime DEFAULT NULL,
  `status` enum('ativo','finalizado') NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cronometros`
--

LOCK TABLES `cronometros` WRITE;
/*!40000 ALTER TABLE `cronometros` DISABLE KEYS */;
INSERT INTO `cronometros` VALUES (1,5,'cronometro',NULL,'2026-06-01 15:31:36','2026-06-01 15:31:43','finalizado'),(2,5,'contagem_regressiva',1500,'2026-06-01 15:31:50','2026-06-01 15:31:54','finalizado'),(3,5,'contagem_regressiva',1500,'2026-06-01 15:35:39','2026-06-01 15:35:41','finalizado'),(4,5,'cronometro',NULL,'2026-06-01 15:35:48','2026-06-01 15:35:51','finalizado'),(5,5,'cronometro',NULL,'2026-06-01 15:35:57','2026-06-01 15:35:59','finalizado'),(6,5,'contagem_regressiva',1500,'2026-06-01 15:36:03','2026-06-01 15:36:07','finalizado');
/*!40000 ALTER TABLE `cronometros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-01 16:33:39
