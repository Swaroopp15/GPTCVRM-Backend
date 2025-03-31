USE gpt_cvrm;

CREATE TABLE `departments` (
  `depo_code` varchar(10) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `vision` text,
  `mission` text,
  PRIMARY KEY (`depo_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

CREATE TABLE `committees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `committee_name` varchar(30) DEFAULT NULL,
  `about` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `college_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `info_key` varchar(100) NOT NULL,
  `info_value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `info_key` (`info_key`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `committee_members` (
  `committee_id` int NOT NULL,
  `faculty_id` int NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`committee_id`,`faculty_id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `committee_members_ibfk_1` FOREIGN KEY (`committee_id`) REFERENCES `committees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `committee_members_ibfk_2` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

