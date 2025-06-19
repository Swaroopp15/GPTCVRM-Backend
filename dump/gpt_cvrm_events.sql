-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: gpt_cvrm
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `images` varchar(50) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (6,'farewell-2026','In a solemn ceremony at Government Polytechnic Chodavaram, under the supervision of Principal Dr. A. Nagaraju and the heads of various departments, students bid farewell to their academic journey. The event was filled with emotional speeches, heartfelt memories, and well-wishing for the students\' future endeavors.','uploads/events/farewell-2025','2025-03-25'),(7,'farewell-2025','In a solemn ceremony at Government Polytechnic Chodavaram, under the supervision of Principal Dr. A. Nagaraju and the heads of various departments, students bid farewell to their academic journey. The event was filled with emotional speeches, heartfelt memories, and well-wishing for the students\' future endeavors.','uploads/events/farewell-2025','2025-03-25'),(9,'Sankrathi Celebrations','A cheerful celebrations for this year Sankrathi is held in our college on 14-01-2024, under the supervision of our honorable Principle and other staff.','uploads/events/Sankrathi Celebrations','2024-01-14'),(10,'Sankrathi Celebrations','A cheerful celebrations for this year Sankrathi is held in our college on 14-01-2024, under the supervision of our honorable Principle and other staff.','uploads/events/Sankrathi Celebrations','2024-01-14'),(14,'Fest','A cheerful celebrations for this year Sankrathi is held in our college on 14-01-2024, under the supervision of our honorable Principle and other staff.','uploads/events/,,,,','2024-01-14'),(15,'upload test','dadfaljesonoao','uploads/events/upload-test','2025-05-29');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19  9:42:59
