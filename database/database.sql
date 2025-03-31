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
-- Table structure for table `admissions`
--

DROP TABLE IF EXISTS `admissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admissions` (
  `admission_id` int NOT NULL AUTO_INCREMENT,
  `year` year NOT NULL,
  `intake` int NOT NULL,
  `allocated` int NOT NULL,
  `depo_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`admission_id`),
  KEY `depo_code` (`depo_code`),
  CONSTRAINT `admissions_ibfk_1` FOREIGN KEY (`depo_code`) REFERENCES `departments` (`depo_code`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admissions`
--

LOCK TABLES `admissions` WRITE;
/*!40000 ALTER TABLE `admissions` DISABLE KEYS */;
INSERT INTO `admissions` VALUES (15,2019,60,66,'CME'),(16,2020,58,66,'CME'),(17,2021,55,66,'CME'),(18,2022,50,66,'CME'),(19,2023,62,66,'CME'),(20,2024,59,66,'CME'),(21,2025,57,66,'CME'),(22,2019,52,66,'ECE'),(23,2020,54,66,'ECE'),(24,2021,50,66,'ECE'),(25,2022,48,66,'ECE'),(26,2023,55,66,'ECE'),(27,2024,53,66,'ECE'),(28,2025,51,66,'ECE');
/*!40000 ALTER TABLE `admissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `college_info`
--

DROP TABLE IF EXISTS `college_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `college_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `info_key` varchar(100) NOT NULL,
  `info_value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `info_key` (`info_key`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `college_info`
--

LOCK TABLES `college_info` WRITE;
/*!40000 ALTER TABLE `college_info` DISABLE KEYS */;
INSERT INTO `college_info` VALUES (1,'college_name','GOVERNMENT POLYTECHNIC CHODAVARAM'),(2,'principal_name','Dr. A. Nagaraju'),(3,'vision','To impart quality Technical Education in semi-urban areas of northern Andhra Pradesh and to produce quality technician manpower to meet technological needs for economic development of the State and become an outstanding Polytechnic, an ultimate destination for learning multi-technical job skills.'),(4,'mission','Offer demand-driven diploma programs to cater to the needs of the local industries and other public, private sector agencies. Provide the best academic environment for the students to realize their full potential for acquiring technical knowledge and job skills. Infuse the human values of integrity, social responsibility, and contribute their might for nationaldevelopment with their technical knowledge.'),(5,'principal_message','Welcome to Government Polytechnic Chodavaram...'),(6,'contact_email','gptcvrm@gmail.com'),(7,'contact_number','0000000000'),(8,'principle_message','At Our College, we are committed to excellence in education, research, and service to society. Our mission is to equip students with the tools they need to shape the future.'),(9,'banner_title','Welcome to Government Polytechnic Chodavaram'),(10,'banner_subtitle','A place for innovation, learning, and research excellence.'),(11,'college_image','https://github.com/Swaroop0915/gitImages/blob/main/images/Collage1.png?raw=true'),(12,'commisioner_image','https://github.com/Swaroop0915/gitImages/blob/main/images/commissioner.png?raw=true');
/*!40000 ALTER TABLE `college_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `committee_members`
--

DROP TABLE IF EXISTS `committee_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `committee_members` (
  `committee_id` int NOT NULL,
  `faculty_id` int NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`committee_id`,`faculty_id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `committee_members_ibfk_1` FOREIGN KEY (`committee_id`) REFERENCES `committees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `committee_members_ibfk_2` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `committee_members`
--

LOCK TABLES `committee_members` WRITE;
/*!40000 ALTER TABLE `committee_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `committee_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `committees`
--

DROP TABLE IF EXISTS `committees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `committees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `committee_name` varchar(30) DEFAULT NULL,
  `about` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `committees`
--

LOCK TABLES `committees` WRITE;
/*!40000 ALTER TABLE `committees` DISABLE KEYS */;
INSERT INTO `committees` VALUES (14,'GRIVENCE REDRESSAL COMMITTEE','As per AICTE approve a process hand book instruction issued wide memo under reference cited above,the under signed is hereby constitute GRIEVANCE REDRESSAL COMMITTEE,with the following staff members to address grievances etc.'),(15,'ICC COMPRISES','In pursuance of AICT regulations,2015 read with the sexual harassment of the women at workplace Act,2073,Internal Complaints Committee(ICC) is re-constituted as under to deal with complaints relating to sexual harassment at Workplace'),(16,'ORDER','In pursuance of the instructions of the Commisioner of Technical Education, Andra Pradesh  ,vide reference read above ,the principle Government Polytechnic,Chodavaram is the hereby re constitute the Institution Industry  Cell Commitee for the Academic Year 2024-2025 with the following staff members of this Polytechnic'),(17,'SC/ST COMMITTEE','As per the scheduled Castes and Scheduled Tribes Act,1989,dated 1989 ,Committee for SC and ST is being reconstituted comprising of following  persons for Government polytechnic chodavaram to prevent commission of offences of atrocities against the members of the Scheduled Castes and Scheduled Tribes , to provide for special courts for the trail of such offences and for the relief & rehaibition of the victims of such offences and for matters connected therewith or incidental there to');
/*!40000 ALTER TABLE `committees` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `depo_code` varchar(10) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `vision` text,
  `mission` text,
  PRIMARY KEY (`depo_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES ('CME','Computer Engineering','To create wonderful students','To create wonderful students'),('ece','Electronics and Communication Engineering','To make the students better at Communication','To make the students better at Communication');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `faculty_id` int NOT NULL AUTO_INCREMENT,
  `faculty_name` varchar(115) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `faculty_role` varchar(50) DEFAULT NULL,
  `depo_code` varchar(10) DEFAULT NULL,
  `image_name` varchar(150) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `date_of_joining` varchar(10) DEFAULT NULL,
  `qualification` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`faculty_id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_faculty_depo_code` (`depo_code`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`depo_code`) REFERENCES `departments` (`depo_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labs`
--

DROP TABLE IF EXISTS `labs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `depo_code` varchar(10) NOT NULL,
  `lab_name` varchar(100) NOT NULL,
  `description` text,
  `capacity` int DEFAULT NULL,
  `equipment` text,
  `image_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `depo_code` (`depo_code`),
  CONSTRAINT `labs_ibfk_1` FOREIGN KEY (`depo_code`) REFERENCES `departments` (`depo_code`) ON DELETE CASCADE,
  CONSTRAINT `labs_chk_1` CHECK ((`capacity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labs`
--

LOCK TABLES `labs` WRITE;
/*!40000 ALTER TABLE `labs` DISABLE KEYS */;
INSERT INTO `labs` VALUES (6,'cme','computer lab','a lab used by students to practice programming',50,'20 computers','computer_lab'),(7,'cme','computer lab','a lab used by students to practice programming',50,'20 computers','labs/computer_lab'),(8,'cme','Computer Networks lab','a lab used by students to practice programming',50,'20 computers','labs/computer_networks'),(9,'cme','Computer Networks lab','a lab used by students to practice programming',50,'20 computers','labs/computer_networks');
/*!40000 ALTER TABLE `labs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placements`
--

DROP TABLE IF EXISTS `placements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `package` double(5,4) NOT NULL,
  `year` year DEFAULT NULL,
  `student_pin` varchar(30) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `depo_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placements`
--

LOCK TABLES `placements` WRITE;
/*!40000 ALTER TABLE `placements` DISABLE KEYS */;
INSERT INTO `placements` VALUES (1,'Lohith Vasantha','PIXELWIND TECHNOLOGIES',1.7000,2025,'22635-cm-049','DIGITAL MARKETING','cme'),(2,'Yuva Teja Reddi','PIXELWIND TECHNOLOGIES',1.7000,2025,'22635-cm-058','DIGITAL MARKETING','cme'),(3,'Rohit .S','TECHNICS',3.5000,2025,'22635-cm-042','DEVELOPER','cme'),(4,'Jayanth Petchetti','THoughtworks India Private LTD',8.0000,2025,'22635-cm-032','intern','cme'),(5,'Lohith Vasantha','PIXELWIND TECHNOLOGIES',1.7000,2025,'22635-cm-049','DIGITAL MARKETING','cme'),(6,'Yuva Teja Reddi','PIXELWIND TECHNOLOGIES',1.7000,2025,'22635-cm-058','DIGITAL MARKETING','cme'),(7,'Rohit .S','TECHNICS',3.5000,2025,'22635-cm-042','DEVELOPER','cme');
/*!40000 ALTER TABLE `placements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pin` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `application_id` varchar(30) NOT NULL,
  `percentage` decimal(6,4) DEFAULT NULL,
  `year` year DEFAULT NULL,
  `depo_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_REFER` (`depo_code`),
  CONSTRAINT `FK_REFER` FOREIGN KEY (`depo_code`) REFERENCES `departments` (`depo_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-31  9:02:43
