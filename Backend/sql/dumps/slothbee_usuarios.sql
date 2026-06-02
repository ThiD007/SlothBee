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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `pontos_mel` int DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `equipe_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_usuario_equipe` (`equipe_id`),
  CONSTRAINT `fk_usuario_equipe` FOREIGN KEY (`equipe_id`) REFERENCES `equipes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (5,'Maria Lima','maria@gmail.com','$2b$10$vlUyIwDtWv94LpzKeETFmuIUU6bJ4nM5WlE9ghEwxLN6f90qMFTte',150,'84738473858','Desenvolvedora Frontend','https://res.cloudinary.com/djblkndqo/image/upload/v1780404814/slothbee/perfis/user-5.jpg',2),(6,'João Oliveira','joao@gmail.com.adm','$2b$10$uw5w5iqTevy/Lzc7sf5TLuspbYcKd/e3iEDn0xu..eAbmaN7ErLaC',NULL,'4257686798','Líder da gestão',NULL,NULL),(7,'Yasmim Kriese','yasmim@gmail.com','$2b$10$BCVLlAF3iygPSFzBiai.su6BcQNWrsD/pkPhwWxSaG0oSlesVUVwC',75,'745667845','Designer','https://res.cloudinary.com/djblkndqo/image/upload/v1780404758/slothbee/perfis/user-7.jpg',2),(8,'Thiago Silva','thiago@gmail.com','$2b$10$SpHBRui4rnXe9Csft3gslupwVTsWqmXdPRXi3DMNMBNa0n9RVL53e',NULL,'8567674693','Desenvolvedor banco de dados',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
