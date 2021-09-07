-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` mediumtext NOT NULL,
  `datecreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_post` (`post_id`),
  KEY `fk_comment_user` (`user_id`),
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (84,'test supp','2021-09-05 21:28:10',16,62),(87,'test supp 3','2021-09-05 21:34:46',3,62),(92,'comm 83','2021-09-06 16:09:06',16,56),(93,'comm 89','2021-09-06 16:17:42',17,56),(94,'comm 90','2021-09-06 16:18:31',17,62),(95,'comm 91','2021-09-06 16:21:02',6,56),(99,'comm 96 tout est ok ici ','2021-09-06 18:41:07',3,71),(100,'test comm 100','2021-09-07 14:56:05',12,56);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `dateCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_user_ida` (`user_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_post_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (56,'test fin','<template>\n    <div>\n        <h1>{{ title }} #{{ count }}</h1>\n        <ul>\n            <li v-for=\"item in list\" :key=\"item\">\n                {{ item }}\n            </li>\n        </ul>\n    </div>\n</template>\n\n<script>\nexport default {\n    props: {\n        list: {\n            type: Array\n        },\n        title: {\n            type: String,\n            required: true\n        },\n        count: {\n            type: Number\n        }\n    }\n}\n</script>','2021-09-01 15:38:59','',3),(62,'vrty','cccdccdc','2021-09-05 19:14:35','http://localhost:3000/images/P1070642.JPG1630862074808.jpg',6),(65,'test supp 2','test supp 2','2021-09-05 21:33:23','http://localhost:3000/images/P1070642.JPG1630870403298.jpg',16),(66,'test oubli','test oubli','2021-09-06 16:17:13','http://localhost:3000/images/P1070643.JPG1630937833353.jpg',17),(67,'test oubli 1','Cependant, ces props ont des exigences spécifiques, ce qui pose problème. Par exemple, title devrait être une string mais list devrait posséder un comportement itératif, comme un array ou un object. Plutôt que d\'espérer que ce soient bien les bonnes données qui sont passées, en croisant les doigts, ce serait quand même bien mieux de pouvoir empêcher le mauvais type de données de passer. Eh bien, c\'est possible en définissant les props à l\'aide d\'un objet au lieu d\'un tableau de chaînes de caractères.','2021-09-06 16:20:30','',6),(68,'test oubli 3 mongodb mysqql','MySQL\nMySQL est un système de gestion de base de données relationnelle open source développé, distribué et géré par Oracle. Vous pouvez prédéfinir votre schéma de base de données selon vos besoins et créer des règles qui définiraient les relations entre les champs de vos tables. Il stocke les données dans des formats de table (une collection d’entrées de données associées) et utilise SQL ou le langage de requête structuré pour l’accès à la base de données. SQL a été initialement créé dans les années 1970, il n’a donc pas été créé à l’origine pour la gestion de bases de données. SQL est un ANSI ou American National Standards Institute, mais il en existe plusieurs versions.\n\nMongoDB\nMongoDB est également une base de données non relationnelle open source développée par MongoDB, Inc. Les données sont stockées sous forme de documents au format binaire appelé BSON ou Binary JSON. Les informations qui peuvent être regroupées sont stockées ensemble pour une récupération facile et rapide. L’utilisation de schémas dynamiques est l’un des avantages majeurs de MongoDB, et cela élimine le besoin de prédéfinir les structures. MongoDB permet la représentation des relations hiérarchiques et la possibilité de modifier la structure des enregistrements en ajoutant/supprimant simplement des champs.','2021-09-06 16:23:43','',12),(71,'test github','test github avec projet cloné sur un dossier  comme validateur suit le readme et les indi. de création du fichier .env; bas de donnée MySQL et logiciel.','2021-09-06 18:39:18','',16);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`) /*!80000 INVISIBLE */,
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'Diveu Paul','roger@hotmail.fr','$2b$10$Sd8aK/mmVW7cTssfKHu3Q.GluYcvvwbaucMBex55ypqccwrSHN49i','0'),(6,'administrateur','drh@groupo.fr','$2b$10$nzYLLi4qscW2RjlBbxDYe.2UtVLfSy8DlL6Kf0ePW0QMbihLVT0EG','1'),(12,'rsesm','rsesm@hotmail.fr','$2b$10$2ZYq8xbR1IAlHer6A6wXA.zLOgIKhIeDzVkvVvM9cHh1knWbFgbxa','0'),(16,'Pierre Roger','roger@hotmail.com','$2b$10$gy9Ae7pLIcEYj5sHZbXCp.f.WpwvOgfaKSO5UBX8W5skQjUaYlVNi','0'),(17,'Roger Piquira','piquira@hotmail.fr','$2b$10$VW29k8cNVD5CInMxlWzrJupzDOjDs86v4I4cYy0gXTaymnveNjmZ.','0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-07 17:11:01
