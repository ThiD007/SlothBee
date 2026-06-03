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
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `categoria` varchar(80) NOT NULL,
  `resumo` text NOT NULL,
  `foto_url` text,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'A Importância da Hidratação para o Corpo e a Mente','Autocuidado','Beber água diariamente é essencial para manter o organismo funcionando corretamente. Além de regular a temperatura corporal e transportar nutrientes, a hidratação influencia diretamente a concentração, a memória e a disposição. A falta de água pode causar cansaço, dores de cabeça e dificuldade de foco. Por isso, criar o hábito de se hidratar ao longo do dia é um passo simples, mas fundamental para uma rotina mais saudável e produtiva.','https://res.cloudinary.com/djblkndqo/image/upload/v1780451070/slothbee/blogs/e0ihvwsdsfy0esyevyp1.png','2026-06-03 01:44:31'),(2,'Prevenção de Acidentes no Ambiente de Trabalho','Segurança e prevenção','A prevenção de acidentes depende da conscientização e do cumprimento das normas de segurança. Manter o ambiente organizado, sinalizar áreas de risco e participar de treinamentos são atitudes que ajudam a evitar incidentes. Uma cultura de prevenção fortalece a segurança de todos e promove um ambiente de trabalho mais protegido e eficiente.','https://res.cloudinary.com/djblkndqo/image/upload/v1780451904/slothbee/blogs/bdt5juovspwjadwwrb9x.png','2026-06-03 01:50:38'),(3,'A Importância das Pausas Durante o Expediente','Sáude','Realizar pausas ao longo da jornada de trabalho ajuda a reduzir o estresse, aumentar a concentração e prevenir problemas físicos. Pequenos intervalos para alongamento, hidratação e descanso visual contribuem para o bem-estar geral e melhoram o desempenho das atividades. Cuidar da saúde durante o expediente é investir em qualidade de vida.','https://res.cloudinary.com/djblkndqo/image/upload/v1780452297/slothbee/blogs/fvpiynciibpxcltlepca.png','2026-06-03 01:51:05'),(4,'Como o Excesso de Telas Afeta Sua Saúde Mental','Bem-Estar Digital','Celulares, computadores e redes sociais fazem parte da rotina moderna, mas o uso excessivo pode trazer consequências negativas. Passar muitas horas conectado pode causar ansiedade, dificuldade de concentração, problemas de sono e sensação de esgotamento mental. Fazer pausas regulares, limitar o tempo de tela e reservar momentos para atividades offline ajuda a criar uma relação mais saudável com a tecnologia.','https://res.cloudinary.com/djblkndqo/image/upload/v1780451574/slothbee/blogs/vq0gbtzwqtpj5g7telgt.png','2026-06-03 01:52:54');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-02 23:06:40
