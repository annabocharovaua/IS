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
-- Table structure for table `film_reviews`
--

DROP TABLE IF EXISTS `film_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `id_film` int NOT NULL,
  `id_user` int DEFAULT NULL,
  `rating` int DEFAULT '10',
  `review_date` date DEFAULT NULL,
  `review_text` mediumtext,
  PRIMARY KEY (`review_id`),
  KEY `user_idx` (`id_user`),
  KEY `film_idx` (`id_film`),
  CONSTRAINT `film_id` FOREIGN KEY (`id_film`) REFERENCES `films` (`film_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user` FOREIGN KEY (`id_user`) REFERENCES `users1` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_reviews`
--

LOCK TABLES `film_reviews` WRITE;
/*!40000 ALTER TABLE `film_reviews` DISABLE KEYS */;
INSERT INTO `film_reviews` VALUES (6,3,2,9,NULL,'Супер, все чудово! '),(7,3,3,10,NULL,'Рекомендую до перегляду! '),(8,3,4,5,NULL,NULL),(9,3,26,8,'2023-11-06','Бомба!'),(10,3,26,8,'2023-11-06','Клас!!!'),(11,10,26,6,'2023-11-06','Не дуже зайшов мультфільм'),(12,10,26,4,'2023-11-06',''),(13,10,26,9,'2023-11-06',''),(15,9,32,7,'2023-11-28','Фільм чудовий, але чекав іншого фіналу '),(16,9,32,5,'2023-11-28',''),(17,8,32,7,'2023-11-28',''),(18,9,33,3,'2023-11-28','Не сподобалось, на жаль'),(19,3,34,10,'2023-11-28','Фільм чудовий'),(20,3,35,5,'2023-11-28','Не дуже сподобався');
/*!40000 ALTER TABLE `film_reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `film_reviews_AFTER_INSERT` AFTER INSERT ON `film_reviews` FOR EACH ROW BEGIN
UPDATE films 
SET rating = (rating * count_ratings + NEW.rating) / (count_ratings + 1) , count_ratings = count_ratings + 1
WHERE film_id = NEW.id_film;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 22:03:04
