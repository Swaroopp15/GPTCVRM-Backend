const tables = `
CREATE TABLE college_info (
  id int NOT NULL AUTO_INCREMENT,
  info_key varchar(100) NOT NULL,
  info_value text,
  PRIMARY KEY (id),
  UNIQUE KEY info_key (info_key)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE departments (
  depo_code varchar(10) NOT NULL,
  department_name varchar(100) NOT NULL,
  vision text,
  mission text,
  avg_pass decimal(6,4) DEFAULT NULL,
  department_image varchar(100) DEFAULT NULL,
  PRIMARY KEY (depo_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE committees (
  id int NOT NULL AUTO_INCREMENT,
  committee_name varchar(100) DEFAULT NULL,
  about text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE faculty (
  faculty_id int NOT NULL AUTO_INCREMENT,
  faculty_name varchar(115) NOT NULL,
  email varchar(100) DEFAULT NULL,
  faculty_role varchar(50) DEFAULT NULL,
  depo_code varchar(10) DEFAULT NULL,
  image_name varchar(150) DEFAULT NULL,
  department_id int DEFAULT NULL,
  date_of_joining varchar(10) DEFAULT NULL,
  qualification varchar(15) DEFAULT NULL,
  number varchar(20) DEFAULT NULL,
  experience smallint DEFAULT NULL,
  PRIMARY KEY (faculty_id),
  UNIQUE KEY email (email),
  KEY idx_faculty_depo_code (depo_code),
  CONSTRAINT faculty_ibfk_1 FOREIGN KEY (depo_code) REFERENCES departments (depo_code) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE admissions (
  admission_id int NOT NULL AUTO_INCREMENT,
  year year NOT NULL,
  intake int NOT NULL,
  allocated int NOT NULL,
  depo_code varchar(10) DEFAULT NULL,
  PRIMARY KEY (admission_id),
  KEY depo_code (depo_code),
  CONSTRAINT admissions_ibfk_1 FOREIGN KEY (depo_code) REFERENCES departments (depo_code) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE committee_members (
  committee_id int NOT NULL,
  faculty_id int NOT NULL,
  role varchar(255) DEFAULT NULL,
  PRIMARY KEY (committee_id,faculty_id),
  KEY faculty_id (faculty_id),
  CONSTRAINT committee_members_ibfk_1 FOREIGN KEY (committee_id) REFERENCES committees (id) ON DELETE CASCADE,
  CONSTRAINT committee_members_ibfk_2 FOREIGN KEY (faculty_id) REFERENCES faculty (faculty_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE ebooks (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  author varchar(100) NOT NULL,
  link varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE events (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) DEFAULT NULL,
  description varchar(5000) DEFAULT NULL,
  images varchar(50) DEFAULT NULL,
  event_date date DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE facilities (
  name varchar(60) DEFAULT NULL,
  about text,
  id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE images (
  id int NOT NULL AUTO_INCREMENT,
  image_name varchar(255) NOT NULL,
  image_path varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE labs (
  id int NOT NULL AUTO_INCREMENT,
  depo_code varchar(10) NOT NULL,
  lab_name varchar(100) NOT NULL,
  description text,
  capacity int DEFAULT NULL,
  equipment text,
  image_name varchar(255) NOT NULL,
  budget decimal(10,4) DEFAULT NULL,
  conducted_labs varchar(60) DEFAULT NULL,
  specifications varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY depo_code (depo_code),
  CONSTRAINT labs_ibfk_1 FOREIGN KEY (depo_code) REFERENCES departments (depo_code) ON DELETE CASCADE,
  CONSTRAINT labs_chk_1 CHECK ((capacity > 0))
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE library (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  author varchar(255) DEFAULT NULL,
  volumes int DEFAULT NULL,
  type enum('book','journal') DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE notifications (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  date date DEFAULT NULL,
  isLink tinyint(1) DEFAULT NULL,
  link varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE students (
  id int NOT NULL AUTO_INCREMENT,
  pin varchar(30) NOT NULL,
  name varchar(100) NOT NULL,
  admission_year year DEFAULT NULL,
  depo_code varchar(10) DEFAULT NULL,
  semester enum('1','2','3','4','5','6','completed','pending') DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY pin (pin),
  UNIQUE KEY pin_2 (pin),
  KEY FK_DEPO_STUDENT (depo_code),
  CONSTRAINT FK_DEPO_STUDENT FOREIGN KEY (depo_code) REFERENCES departments (depo_code)
) ENGINE=InnoDB AUTO_INCREMENT=536 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE results (
  id int NOT NULL AUTO_INCREMENT,
  student_id int NOT NULL,
  application_id varchar(30) NOT NULL,
  percentage decimal(8,4) DEFAULT NULL,
  passed_year year DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY student_id (student_id),
  UNIQUE KEY application_id (application_id),
  CONSTRAINT results_ibfk_1 FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB AUTO_INCREMENT=288 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE placements (
  id int NOT NULL AUTO_INCREMENT,
  student_id int NOT NULL,
  company varchar(100) NOT NULL,
  package double NOT NULL,
  role varchar(50) DEFAULT NULL,
  placement_year year DEFAULT NULL,
  PRIMARY KEY (id),
  KEY student_id (student_id),
  CONSTRAINT placements_ibfk_1 FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  password varchar(250) DEFAULT NULL,
  role enum('principal','head of department','administrator') DEFAULT NULL,
  email varchar(40) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

module.exports = tables;
