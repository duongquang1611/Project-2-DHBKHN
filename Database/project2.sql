-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: ptpmcn
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chi_tiet_hoa_don_ban`
--

DROP TABLE IF EXISTS `chi_tiet_hoa_don_ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chi_tiet_hoa_don_ban` (
  `ma_hoa_don_ban` varchar(45) NOT NULL,
  `ma_sach` varchar(45) NOT NULL,
  `so_luong` int(11) NOT NULL,
  KEY `cds_idx` (`ma_hoa_don_ban`),
  KEY `ds_idx` (`ma_sach`),
  CONSTRAINT `cds` FOREIGN KEY (`ma_hoa_don_ban`) REFERENCES `hoa_don_ban` (`ma_hoa_don_ban`),
  CONSTRAINT `ds` FOREIGN KEY (`ma_sach`) REFERENCES `sach` (`ma_sach`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_hoa_don_ban`
--

LOCK TABLES `chi_tiet_hoa_don_ban` WRITE;
/*!40000 ALTER TABLE `chi_tiet_hoa_don_ban` DISABLE KEYS */;
INSERT INTO `chi_tiet_hoa_don_ban` VALUES ('2','30',1),('4','30',1),('5','30',2),('6','34',3),('7','38',1),('7','34',3),('8','8',2),('9','34',3),('9','34',2),('10','37',2),('10','37',1),('11','37',2),('11','8',4),('12','25',2),('12','30',1),('12','37',2),('12','38',3),('13','18',1),('14','30',1);
/*!40000 ALTER TABLE `chi_tiet_hoa_don_ban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_hoa_don_nhap`
--

DROP TABLE IF EXISTS `chi_tiet_hoa_don_nhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chi_tiet_hoa_don_nhap` (
  `ma_hoa_don_nhap` varchar(45) NOT NULL,
  `ma_sach` varchar(45) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `gia_nhap` double NOT NULL,
  PRIMARY KEY (`ma_hoa_don_nhap`,`ma_sach`),
  UNIQUE KEY `ma_hoa_don_nhap_UNIQUE` (`ma_hoa_don_nhap`),
  KEY `fk_ma_sach_idx` (`ma_sach`),
  CONSTRAINT `fk_ma_hoa_don_nhap` FOREIGN KEY (`ma_hoa_don_nhap`) REFERENCES `hoa_don_nhap` (`ma_hoa_don_nhap`),
  CONSTRAINT `fk_ma_sach` FOREIGN KEY (`ma_sach`) REFERENCES `sach` (`ma_sach`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_hoa_don_nhap`
--

LOCK TABLES `chi_tiet_hoa_don_nhap` WRITE;
/*!40000 ALTER TABLE `chi_tiet_hoa_don_nhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `chi_tiet_hoa_don_nhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don_ban`
--

DROP TABLE IF EXISTS `hoa_don_ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hoa_don_ban` (
  `ma_hoa_don_ban` varchar(45) NOT NULL,
  `ma_tai_khoan` varchar(45) NOT NULL,
  `ngay_tao` date NOT NULL,
  `trang_thai_don` varchar(45) NOT NULL,
  `id_shipper` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ma_hoa_don_ban`),
  KEY `fk_maTK_nguoi_dung_idx` (`ma_tai_khoan`),
  CONSTRAINT `fk_maTK_nguoi_dung` FOREIGN KEY (`ma_tai_khoan`) REFERENCES `nguoi_dung` (`ma_tai_khoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_ban`
--

LOCK TABLES `hoa_don_ban` WRITE;
/*!40000 ALTER TABLE `hoa_don_ban` DISABLE KEYS */;
INSERT INTO `hoa_don_ban` VALUES ('10','44','2018-12-24','dang_giao','a2'),('11','44','2018-12-24','da_duyet','a1'),('12','43','2018-12-24','da_huy','b2'),('13','46','2018-12-24','da_duyet','a1'),('14','46','2018-12-24','cho_duyet','b2'),('2','44','2018-12-24','da_duyet','a2'),('4','44','2018-12-24','da_thanh_toan','b2'),('5','44','2018-12-24','da_thanh_toan','b1'),('6','44','2018-12-24','da_thanh_toan','b1'),('7','44','2018-12-24','da_thanh_toan','a1'),('8','44','2018-12-24','da_thanh_toan','b2'),('9','43','2018-12-24','da_huy','b1');
/*!40000 ALTER TABLE `hoa_don_ban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don_nhap`
--

DROP TABLE IF EXISTS `hoa_don_nhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hoa_don_nhap` (
  `ma_hoa_don_nhap` varchar(45) NOT NULL,
  `ma_nha_cung_cap` varchar(45) NOT NULL,
  `ngay_tao` date NOT NULL,
  PRIMARY KEY (`ma_hoa_don_nhap`),
  UNIQUE KEY `ma_hoa_don_nhap_UNIQUE` (`ma_hoa_don_nhap`),
  KEY `fk_maNhaCC_nhaCC_idx` (`ma_nha_cung_cap`),
  CONSTRAINT `fk_maNhaCC_nhaCC` FOREIGN KEY (`ma_nha_cung_cap`) REFERENCES `nha_cung_cap` (`ma_nha_cung_cap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_nhap`
--

LOCK TABLES `hoa_don_nhap` WRITE;
/*!40000 ALTER TABLE `hoa_don_nhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoa_don_nhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `nguoi_dung` (
  `ma_tai_khoan` varchar(45) NOT NULL,
  `ho_ten` varchar(45) NOT NULL,
  `dia_chi` varchar(100) DEFAULT NULL,
  `sdt` varchar(45) NOT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ma_tai_khoan`),
  UNIQUE KEY `ma_tai_khoan_UNIQUE` (`ma_tai_khoan`),
  CONSTRAINT `fk_maTK_tai_khoan` FOREIGN KEY (`ma_tai_khoan`) REFERENCES `tai_khoan` (`ma_tai_khoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES ('10','Nguyễn Thị Thúy A','Đắk Lắk','0336721124','2006-07-05','Nữ','saigontourist@gmail.com'),('11','Nguyễn Thị Huyền Trâ','Cao Bằng','0865428930','1995-10-21','Nữ','vanphuocfuneral@gmail.com'),('12','Đỗ Nguyễn Nhất Anh','Bến Tre','0338243407','1983-10-04','Nữ','info@gmail.com'),('13','Phan Huỳnh Ngọc Dung ','Bình Định','0386156927','1969-01-29','Nữ','mamnonbuuhoa@gmail.com'),('14','Lê Minh Huy','Bình Thuận','0373250653','1980-05-31','Nam','reservation@gmail.com'),('15','Lê Thùy Trúc Ly ','Đồng Tháp','0386156927','1986-08-15','Nam','k30x1bd@gmail.com'),('16','Ngô Hồng Nhung ','Bình Định','0329682776','1980-05-31','Nam','ngdo@gmail.com'),('17','nguyễn thiện toàn','Đồng Nai','0868970174','2001-07-22','Nữ','phuong.tt@gmail.com'),('18',' Trần Châu Bảo Ngọc ','Bà Rịa - Vũng Tàu','0336721124','2007-02-20','Nữ','xvinhnh@gmail.com'),('19','Trần Doanh  ','Bến Tre','0336721124','2014-04-15','Nam','chienhoangduc@gmail.com'),('20','Trần Khải Huy ','Gia Lai','0865467531','2017-01-26','Nữ','hoangdangphatco@gmail.com'),('21','Dương Hoài Phương','Đồng Nai','0363604811','2000-06-28','Nữ','ngdo@gmail.com'),('22','Dương Hoài Phương','Cà Mau','0373250653','1956-08-13','Nam','vandung159@gmail.com'),('23','Trương Thị Bích Ngọ','Bình Thuận','0363604811','2001-07-22','Nữ','info@datngoc.com.vn'),('24','Trương Hoài Thuận ','Bắc Giang','0867565024','1995-10-21','Nam','info@datngoc.com.vn'),('25','Dương Hoài Phương','Bắc Ninh','0363604811','1962-07-09','Nam','fidi@gmail.com'),('26','Hồ Thị Bích Ngọ','Bình Định','0868970174','2000-06-28','Nam','dangnh09@gmail.com'),('27','Đỗ Nguyễn Nhất Anh','Đắk Nông','0363604811','1991-06-18','Nam','nguyenquocaic13@gmail.com'),('28','Võ Minh Thư ','Bắc Ninh','0867565024','1959-01-29','Nam','cnmoitruong@gmail.com'),('29','Sity- HaChar ','Bình Thuận','0363604811','1968-04-08','Nữ','kientruc@gmail.com'),('30',' Trần Châu Bảo Ngọc ','Bắc Kạn','0373250653','2000-06-28','Nữ','qhquocte@gmail.com'),('31','Le Thi Hong Khanh ','Cà Mau','0338243407','1960-01-03','Nữ','dtvienthong@gmail.com'),('32','Ta thị thanh tuye','Đồng Nai','0865467531','1999-01-18','Nữ','reservation@gmail.com'),('33','Phạm Văn Đồng ','Đồng Nai','0386156927','1981-10-10','Nam','vantotvo.yp@gmail.com'),('34','Ta thị thanh tuye','Bình Dương','0373250653','1996-08-09','Nam','dainam_27@ggmail.com'),('35','Phan Vũ Minh Quyền ','Bắc Kạn','0865467531','2001-04-30','Nữ','namk47@gmail.com'),('36','Đặng Thị Thủy Tiên ','Bắc Giang','0393021143','1974-10-09','Nam','angkor@gmail.com'),('37','Phạm Văn Đồng ','Đắk Lắk','0334648300','1993-12-06','Nữ','chienhoangduc@gmail.com'),('38','Nguyen Thi Thanh Bíc','Cao Bằng','0865428930','2001-04-30','Nữ','xvinhnh@gmail.com'),('39','Trần Phan Bảo Anh ','Đắk Nông','0386156927','2000-06-28','Nữ','xaydung@gmail.com'),('40','Doãn Phan Trung Hải ','Bình Dương','0336721124','2003-10-31','Nữ','toilahung84@gmail.com'),('41','Dương Đình Quang','Hà Nội','0124568888','2018-12-08','Nam','crazyforlovegemini66@gmail.com'),('42','Dương Đình Quang','Hà Nội','01234596660','2018-02-01','Nam','duongquang16111997@gmail.com'),('43','Admin','Earth','0124568888','2018-12-07','Nam','admin@gmail.com'),('44','Dương Đình Quang','Hà Nội','01234596660','2018-12-01','Nam','duongquang16111997@gmail.com'),('45','Đào Thị Lệ','Hà Nội','0123459852','2018-12-08','Nữ','xauxaugg@gmail.com'),('46','I\'m Thu Kho','Kho hàng','012222222222','2018-12-14','Nam','crazyforlovegemini66@gmail.com'),('47','Đào Thị Lệ','Hưng Yên','01554554534','2018-12-14','Nữ','talaanhsangvietnam@gmail.com'),('8','Võ tường duy  ','Bình Dương','0334648300','1996-08-09','Nam','caohoptuan@gmail.com'),('9','Nguyễn Minh Châu A','Điện Biên','0867565024','2001-04-30','Nam','k30x1bd@gmail.com');
/*!40000 ALTER TABLE `nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nha_cung_cap`
--

DROP TABLE IF EXISTS `nha_cung_cap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `nha_cung_cap` (
  `ma_nha_cung_cap` varchar(45) NOT NULL,
  `ten_nha_cung_cap` varchar(100) NOT NULL,
  `dia_chi` varchar(100) NOT NULL,
  `sdt` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`ma_nha_cung_cap`),
  UNIQUE KEY `ma_nha_cung_cap_UNIQUE` (`ma_nha_cung_cap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nha_cung_cap`
--

LOCK TABLES `nha_cung_cap` WRITE;
/*!40000 ALTER TABLE `nha_cung_cap` DISABLE KEYS */;
/*!40000 ALTER TABLE `nha_cung_cap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sach`
--

DROP TABLE IF EXISTS `sach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sach` (
  `ma_sach` varchar(45) NOT NULL,
  `ma_the_loai` varchar(45) NOT NULL,
  `ten_sach` varchar(100) NOT NULL,
  `tac_gia` varchar(100) NOT NULL,
  `nha_xuat_ban` varchar(100) NOT NULL,
  `nam_xuat_ban` year(4) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `gia_nhap` double NOT NULL,
  `gia_ban` double NOT NULL,
  PRIMARY KEY (`ma_sach`),
  UNIQUE KEY `ma_sach_UNIQUE` (`ma_sach`),
  KEY `fk_maTL_the_loai_idx` (`ma_the_loai`),
  CONSTRAINT `fk_maTL_the_loai` FOREIGN KEY (`ma_the_loai`) REFERENCES `the_loai` (`ma_the_loai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sach`
--

LOCK TABLES `sach` WRITE;
/*!40000 ALTER TABLE `sach` DISABLE KEYS */;
INSERT INTO `sach` VALUES ('1','6','Tlön, Uqbar, Orbis Tertius','Iranian','Thanh Niên',2014,308,250000,332500),('10','5',' The Information','Malaysian','Sân khấu',2014,425,100000,66500),('11','2','The Clue of the Candle Wax','Lithuanian','Tôn giáo',2010,465,50000,66500),('12','2','Three Versions of Judas','Japanese','Tôn giáo',2014,462,250000,66500),('13','5','The Lotus Murder','Jamaican','Thanh Niên',2009,125,250000,199500),('14','5',' London Fields','New Zealand','Hội nhà văn',2009,184,200000,199500),('15','5','The Hanging Tree','Lebanese','Thanh Niên',2018,390,250000,66500),('16','6','Murder for Love v. Murder for Gain','Japanese','Công an nhân dân',2008,429,100000,332500),('17','5','An Examination of the Work of Herbert Quain','Iranian','Giao thông',2013,301,250000,332500),('18','0',' The Information','Irish','Kim Đồng',2014,384,50000,133000),('19','6','The Cat it Was Who Died','Nicaraguan','Công an nhân dân',2017,230,50000,133000),('2','5','The Zahir','Latvian','Kim Đồng',2010,488,100000,133000),('20','6','A Mysterious Affair of Style','Japanese','Giao thông',2012,244,50000,199500),('21','2','The Tendency of the Criminal','Malaysian','Khoa học và kỹ thuật',2015,167,250000,133000),('22','3','The Library of Babel','Jamaican','Khoa học xã hội',2014,104,100000,66500),('23','3',' London Fields','Jamaican','Bản đồ',2012,538,100000,66500),('24','6','An Examination of the Work of Herbert Quain','Hungarian','Lao động xã hội',2010,311,250000,66500),('25','0','The Body in the Library','Luxembourg','Kim Đồng',2013,137,250000,66500),('26','4','The Clue of the Candle Wax','Moroccan','Tôn giáo',2015,281,250000,66500),('27','4',' London Fields','Malaysian','Công an nhân dân',2018,372,150000,199500),('28','2','A Closed Book','Nicaraguan','Tôn giáo',2015,180,150000,332500),('29','4','The Lotus Murder','Kenyan','Bản đồ',2008,385,100000,133000),('3','5','Murder for Love v. Murder for Gain','Ghanaian','Công an nhân dân',2011,193,150000,66500),('30','0','The Hanging Tree','Korean','Sân khấu',2017,223,150000,199500),('31','5','The Zahir','Irish','Thanh Niên',2009,389,50000,66500),('32','1','Death and the Compass','Nigerian','Sân khấu',2008,282,150000,133000),('33','1','An Examination of the Work of Herbert Quain','Guyanese','Tôn giáo',2014,320,150000,66500),('34','6','Murder for Love v. Murder for Gain','Iranian','Khoa học xã hội',2014,273,200000,332500),('35','5','The Hanging Tree','Malaysian','Khoa học xã hội',2015,134,50000,199500),('36','3','Death of a Debutante','Guyanese','Sân khấu',2015,223,100000,133000),('37','0','Famous Crimes Passionnels','Macedonian','Hội nhà văn',2010,158,200000,266000),('38','0',' Doctor Who','Korean','Bản đồ',2014,378,50000,199500),('39','6','The Cat it Was Who Died','Korean','Lao động xã hội',2014,218,50000,66500),('4','1',' The Robber Bride','Latvian','Khoa học xã hội',2014,223,50000,133000),('40','2','The Affair of the Second Goldfish','Lebanese','Bưu điện',2017,596,250000,133000),('5','5',' Doctor Who','Luxembourg','Kim Đồng',2017,308,100000,199500),('6','4','Three Versions of Judas','Lebanese','Thanh Niên',2009,488,50000,66500),('7','6','The Clue of the Candle Wax','Ivorian','Giao thông',2008,223,50000,66500),('8','0','The Clue of the Candle Wax','Ivorian','Hội nhà văn',2012,180,250000,199500),('9','3','Rivers of London','Malaysian','Lao động xã hội',2013,397,150000,199500);
/*!40000 ALTER TABLE `sach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan`
--

DROP TABLE IF EXISTS `tai_khoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tai_khoan` (
  `ma_tai_khoan` varchar(45) NOT NULL,
  `tai_khoan` varchar(45) NOT NULL,
  `mat_khau` varchar(45) NOT NULL,
  `quyen_su_dung` varchar(45) NOT NULL,
  PRIMARY KEY (`ma_tai_khoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan`
--

LOCK TABLES `tai_khoan` WRITE;
/*!40000 ALTER TABLE `tai_khoan` DISABLE KEYS */;
INSERT INTO `tai_khoan` VALUES ('1','hqernf','rxsdud','admin'),('10','5id09xx','zc5ewa','user'),('11','4vbka','uyjt3k','ke_toan'),('12','ul1xr','zvnxzm','thu_kho'),('13','raxdb','zvnxzm','ke_toan'),('14','87ejln','9k3v3','admin'),('15','v4yf46','ixf6pp','user'),('16','ta3c48','08veph','admin'),('17','7k93g','uyjt3k','thu_kho'),('18','ergnw','hv8l7a','user'),('19','bgdljh','olhdef','ke_toan'),('2','5lupqa','yx6umu','ke_toan'),('20','f9m29i','zvnxzm','admin'),('21','i64s6s','zvnxzm','user'),('22','5kmmyq','9k3v3','user'),('23','tu','1','user'),('24','50wtvf','modh5','thu_kho'),('25','vxqkl5','f7zfpr','ke_toan'),('26','vxqkl5','ipp1tk','admin'),('27','cdqqtu','f7zfpr','user'),('28','bgdljh','ixf6pp','ke_toan'),('29','4vbka','ixf6pp','user'),('3','ip167','modh5','thu_kho'),('30','kd26rd','rxsdud','thu_kho'),('31','87ejln','ipp1tk','thu_kho'),('32','389w1','uyjt3k','user'),('33','ul1xr','modh5','thu_kho'),('34','y6uaj','f8syyp','user'),('35','46fy4','2e4vaj','ke_toan'),('36','46fy4','rxsdud','ke_toan'),('37','ta3c48','lqncyd','user'),('38','kd26rd','md498g','thu_kho'),('39','4vbka','k5c2wt','admin'),('4','eeqra','wzc0yn','admin'),('40','5lupqa','zc5ewa','ke_toan'),('41','duongquang','xxx','user'),('42','duongquang12345','123123','user'),('43','admin','admin','admin'),('44','user','user','user'),('45','user2','user2','user'),('46','thukho','thukho','thu_kho'),('47','ketoan','ketoan','ke_toan'),('5','v4yf46','i3aftr','thu_kho'),('6','lnfljj','2e4vaj','ke_toan'),('7','v4yf46','1ywoj','thu_kho'),('8','lnfljjxx','wpfpac','user'),('9','c22gz','wpfpac','user');
/*!40000 ALTER TABLE `tai_khoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `the_loai`
--

DROP TABLE IF EXISTS `the_loai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `the_loai` (
  `ma_the_loai` varchar(45) NOT NULL,
  `ten_the_loai` varchar(45) NOT NULL,
  PRIMARY KEY (`ma_the_loai`),
  UNIQUE KEY `ma_the_loai_UNIQUE` (`ma_the_loai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `the_loai`
--

LOCK TABLES `the_loai` WRITE;
/*!40000 ALTER TABLE `the_loai` DISABLE KEYS */;
INSERT INTO `the_loai` VALUES ('0','Học Đường'),('1','Tiểu Thuyết'),('2','Ngôn Tình'),('3','Trinh Thám'),('4','Hành Động'),('5','Siêu Nhiên'),('6','Khoa Học Viễn Tưởng'),('7','Kinh Dị'),('8','18+');
/*!40000 ALTER TABLE `the_loai` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-27  3:04:29
