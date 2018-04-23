-- MySQL dump 10.16  Distrib 10.2.14-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: Sipega
-- ------------------------------------------------------
-- Server version	10.2.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Acceso`
--

DROP TABLE IF EXISTS `Acceso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Acceso` (
  `AccesoId` int(11) NOT NULL AUTO_INCREMENT,
  `AccesoUsuarioId` int(11) NOT NULL,
  `AccesoPrivilegioId` int(11) NOT NULL,
  `AccesoLectura` bit(1) NOT NULL,
  `AccesoEscritura` bit(1) NOT NULL,
  `AccesoEjecucion` bit(1) NOT NULL,
  `AccesoFechaCreacion` datetime NOT NULL,
  PRIMARY KEY (`AccesoId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Acceso`
--

LOCK TABLES `Acceso` WRITE;
/*!40000 ALTER TABLE `Acceso` DISABLE KEYS */;
INSERT INTO `Acceso` VALUES (1,1,1,'','','','2018-04-22 17:17:42');
/*!40000 ALTER TABLE `Acceso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Docente`
--

DROP TABLE IF EXISTS `Docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Docente` (
  `DocenteNoControl` char(8) NOT NULL,
  `DocenteTitulo` varchar(50) DEFAULT NULL,
  `DocenteNombre` varchar(50) DEFAULT NULL,
  `DocenteApellidoPaterno` varchar(25) DEFAULT NULL,
  `DocenteApellidoMaterno` varchar(25) DEFAULT NULL,
  `DocenteTelefono` varchar(10) DEFAULT NULL,
  `DocenteCorreoElectronico` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`DocenteNoControl`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Docente`
--

LOCK TABLES `Docente` WRITE;
/*!40000 ALTER TABLE `Docente` DISABLE KEYS */;
/*!40000 ALTER TABLE `Docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocenteUsuario`
--

DROP TABLE IF EXISTS `DocenteUsuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DocenteUsuario` (
  `DocenteUsuarioId` int(11) NOT NULL AUTO_INCREMENT,
  `DocenteUsuarioUsuarioId` int(11) NOT NULL,
  `DocenteUsuarioDocenteNoControl` char(8) NOT NULL,
  PRIMARY KEY (`DocenteUsuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocenteUsuario`
--

LOCK TABLES `DocenteUsuario` WRITE;
/*!40000 ALTER TABLE `DocenteUsuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocenteUsuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Privilegio`
--

DROP TABLE IF EXISTS `Privilegio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Privilegio` (
  `PrivilegioId` int(11) NOT NULL AUTO_INCREMENT,
  `PrivilegioDescripcion` varchar(50) DEFAULT NULL,
  `PrivilegioFechaCreacion` datetime NOT NULL,
  PRIMARY KEY (`PrivilegioId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Privilegio`
--

LOCK TABLES `Privilegio` WRITE;
/*!40000 ALTER TABLE `Privilegio` DISABLE KEYS */;
INSERT INTO `Privilegio` VALUES (1,'root','2018-04-22 17:16:05');
/*!40000 ALTER TABLE `Privilegio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario` (
  `UsuarioId` int(11) NOT NULL AUTO_INCREMENT,
  `UsuarioClave` char(64) NOT NULL,
  `UsuarioFechaCreacion` datetime NOT NULL,
  PRIMARY KEY (`UsuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,'22eabc24527fa889c1f5df4a96562a0e80681c192937bc8c968cad5409d919d6','2018-04-22 16:36:52');
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-22 20:46:10
