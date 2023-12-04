-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: cinemadb
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `users1`
--

DROP TABLE IF EXISTS `users1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users1` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `is_admin` int DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users1`
--

LOCK TABLES `users1` WRITE;
/*!40000 ALTER TABLE `users1` DISABLE KEYS */;
INSERT INTO `users1` VALUES (2,'anna','bocharova','050224554','1254','1','anna1222',0),(3,'Олексій','Бочаров','3248214','2156','2','25633',0),(4,'Микола','Шевченко','25663','44552','3','59',0),(10,'sds','dz','+380666282447','sd@fdd.com','ADMIN123','798cebcaa66a6430e4787138fc75be786251c757',0),(20,'sds','dz','+380666282447','sd@fdd.com','ADMIN12324','fd667cdd5a3e26695f0666cfece0804d1b1ae058',0),(25,'sds','dz','+380666282447','sd@fdd.com','ADMIN32','3215d071634738c00df08468fea27ed5b8d01237',0),(26,'Тарас','Шевченко','+380508334828','bocharova27022003@gmail.com','taras','318e4c51f137c84e5be7226ce5979bf92aa7dd73',0),(28,'Анна','Бочарова','+380508334828','bocharova@gmail.com','anna','29e80e62684848688618d6700387ebdf6311de6e',0),(31,'Admin','Admin','+380506454545','sd@fdd.com','admin','cc21701989ac09722529f941e063d62dc1d55aa7',1),(32,'Микола','Олексійович','+380999999999','mykola@gmail.com','mykola','46c258af05ee2b1149177a62b7a5640d34ba2517',0),(33,'Андрій','Ярмоленко','+380667777777','andriy2000@gmail.com',' andriy','7909c0bc97e2211d2655f1d1bdb57f4ed953660c',0),(34,'Микита','Миколенко','+380508334826','nikita213@gmail.com','mykolaa','7cb04cd2c41328638237a26296a29f94965889ef',0),(35,'Степан','Коваленко','+380508334844','stepan@gmail.com','stepan','b0d4fede281c4e9cd2181c00ccd954186d506c2d',0);
/*!40000 ALTER TABLE `users1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 22:03:03
