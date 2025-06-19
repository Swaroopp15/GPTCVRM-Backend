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
-- Table structure for table `committes`
--

DROP TABLE IF EXISTS `committes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `committes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `about` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `committes`
--

LOCK TABLES `committes` WRITE;
/*!40000 ALTER TABLE `committes` DISABLE KEYS */;
INSERT INTO `committes` VALUES (1,'Anti Ragging','For a better future with no more Ragging cases'),(2,'GRIVENCE REDRESSAL COMMITTEE','As per AICTE approve a process hand book instruction issued wide memo under reference cited above,the under signed is hereby constitute GRIEVANCE REDRESSAL COMMITTEE,with the following staff members to address grievances etc.'),(3,'ICC COMPRISES','In pursuance of AICT regulations,2015 read with the sexual harassment of the women at workplace Act,2073,Internal Complaints Committee(ICC) is re-constituted as under to deal with complaints relating to sexual harassment at Workplace'),(4,'ORDER','In pursuance of the instructions of the Commisioner of Technical Education, Andra Pradesh  ,vide reference read above ,the principle Government Polytechnic,Chodavaram is the hereby re constitute the Institution Industry  Cell Commitee for the Academic Year 2024-2025 with the following staff members of this Polytechnic'),(5,'SC/ST COMMITTEE','As per the scheduled Castes and Scheduled Tribes Act,1989,dated 1989 ,Committee for SC and ST is being reconstituted comprising of following  persons for Government polytechnic chodavaram to prevent commission of offences of atrocities against the members of the Scheduled Castes and Scheduled Tribes , to provide for special courts for the trail of such offences and for the relief & rehaibition of the victims of such offences and for matters connected therewith or incidental there to');
/*!40000 ALTER TABLE `committes` ENABLE KEYS */;
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
