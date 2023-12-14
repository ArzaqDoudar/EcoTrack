DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `data_type` varchar(45) DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `location` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;