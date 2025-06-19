

DROP TABLE IF EXISTS `college_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `college_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `info_key` varchar(100) NOT NULL,
  `info_value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `info_key` (`info_key`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `college_info`
--

LOCK TABLES `college_info` WRITE;
/*!40000 ALTER TABLE `college_info` DISABLE KEYS */;
INSERT INTO `college_info` VALUES (1,'college_name','GOVERNMENT POLYTECHNIC ANAKAPALLE'),(2,'principal_name','Dr. A. Nagaraju'),(3,'vision','To impart quality Technical Education in semi-urban areas of northern Andhra Pradesh and to produce quality technician manpower to meet technological needs for economic development of the State and become an outstanding Polytechnic, an ultimate destination for learning multi-technical job skills.'),(4,'mission','Offer demand-driven diploma programs to cater to the needs of the local industries and other public, private sector agencies. Provide the best academic environment for the students to realize their full potential for acquiring technical knowledge and job skills. Infuse the human values of integrity, social responsibility, and contribute their might for nationaldevelopment with their technical knowledge.'),(5,'principal_message','Welcome to Government Polytechnic Chodavaram...'),(6,'contact_email','gptcvrm@gmail.com'),(7,'contact_number','0000000000'),(8,'principle_message','At Our College, we are committed to excellence in education, research, and service to society. Our mission is to equip students with the tools they need to shape the future.'),(9,'banner_title','Welcome to Government Polytechnic Chodavaram'),(10,'banner_subtitle','A place for innovation, learning, and research excellence.'),(13,'library_budget','25000'),(14,'library_area','525 sq.m'),(15,'ebooks','0'),(18,'college_logo','uploads/college/college_logo.jpeg'),(20,'college_image','uploads/college/college_image.png'),(21,'commissioner_image','uploads/college/commissioner_image.png'),(22,'commissioner_message','As Commissioner of Technical Education, I envision a future where our youth are skilled, empowered, and globally competitive. Let us work together to build a knowledge-driven society.'),(23,'commissioner_name','Sri G. Ganesh Kumar, I.A.S.');
/*!40000 ALTER TABLE `college_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19  9:43:01
