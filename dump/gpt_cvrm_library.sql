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
-- Table structure for table `library`
--

DROP TABLE IF EXISTS `library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `volumes` int DEFAULT NULL,
  `type` enum('book','journal') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library`
--

LOCK TABLES `library` WRITE;
/*!40000 ALTER TABLE `library` DISABLE KEYS */;
INSERT INTO `library` VALUES (1,'Programming in C','E. Balagurusamy',5,'book'),(2,'Data Structures Through C','Yashavant Kanetkar',4,'book'),(3,'Computer Organization and Architecture','William Stallings',3,'book'),(4,'Operating System Concepts','Abraham Silberschatz, Peter Baer Galvin, Greg Gagne',4,'book'),(5,'Database System Concepts','Abraham Silberschatz, Henry F. Korth, S. Sudarshan',3,'book'),(6,'Java: The Complete Reference','Herbert Schildt',5,'book'),(7,'Computer Networks','Andrew S. Tanenbaum, David J. Wetherall',4,'book'),(8,'Software Engineering','Roger S. Pressman',3,'book'),(9,'Digital Logic and Computer Design','M. Morris Mano',4,'book'),(10,'Web Technologies: HTML, JavaScript, PHP, Java, JSP, ASP.NET, XML and Ajax, Black Book','Kogent Learning Solutions Inc.',2,'book'),(11,'Electronic Devices and Circuits','David A. Bell',5,'book'),(12,'Principles of Electronic Communication Systems','Louis E. Frenzel',4,'book'),(13,'Digital Electronics: Principles and Applications','Roger L. Tokheim',3,'book'),(14,'Microprocessor Architecture, Programming and Applications with the 8085','Ramesh S. Gaonkar',4,'book'),(15,'Signals and Systems','Alan V. Oppenheim, Alan S. Willsky, S. Hamid Nawab',4,'book'),(16,'Linear Integrated Circuits','D. Roy Choudhury, Shail B. Jain',4,'book'),(17,'Control Systems Engineering','I.J. Nagrath, M. Gopal',3,'book'),(18,'Electromagnetic Field Theory','Matthew N.O. Sadiku',NULL,'book'),(19,'Communication Systemss','Simon Haykin',NULL,'book'),(20,'Antenna and Wave Propagation','John D. Kraus',2,'book'),(21,'CSI Communications','Computer Society of India',1,'journal'),(22,'International Journal of Computer Applications (IJCA)','Foundation of Computer Science',1,'journal'),(23,'IEEE Spectrum','Institute of Electrical and Electronics Engineers (IEEE)',1,'journal'),(24,'IETE Journal of Research','IETE',1,'journal'),(25,'Journal of Electronic Design Technology (JEDT)','Medknow Publications',1,'journal'),(26,'International Journal of Electronics and Communication Engineering (IJECE)','IAEME Publications',1,'journal'),(27,'International Journal of Computer Science and Technology (IJCST)','IJCST Editorial Board',1,'journal');
/*!40000 ALTER TABLE `library` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19  9:43:00
