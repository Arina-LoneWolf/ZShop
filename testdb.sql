-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Oct 21, 2021 at 02:48 PM
-- Server version: 8.0.26
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `id` tinyint NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Áo'),
(2, 'Quần'),
(3, 'Đầm Váy'),
(4, 'Gấu bông'),
(5, 'Quà tặng'),
(6, 'Đồ trang trí'),
(7, 'Túi ví');

-- --------------------------------------------------------

--
-- Table structure for table `Color`
--

CREATE TABLE `Color` (
  `id` int NOT NULL,
  `colorLink` varchar(200) NOT NULL,
  `productId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Color`
--

INSERT INTO `Color` (`id`, `colorLink`, `productId`) VALUES
(1, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS118/edcd67d64167ba39e376.jpg', 1),
(2, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-902/570-aobra.jpg', 2),
(3, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-898/800-aobraxam.jpg', 3),
(4, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-898/800-aobrado.jpg', 3),
(5, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-898/800-aobraxanh.jpg', 3),
(6, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-900/800-aothethaonu-barrel.jpg', 4),
(7, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-897/750-aobrathethaonu-den.jpg', 5),
(8, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-897/aobra-tap-gym-yoga.jpg', 5),
(9, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/FFF/F05/850-aothunnutaitho.jpg', 6),
(10, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309180730_1159735690.jpg', 7),
(11, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg', 7),
(12, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K260/O1CN01vqpPYH1PDeHdGyioD_!!1612671807.jpg', 8),
(13, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K260/O1CN01HnbXq01PDeHem6Dei_!!1612671807.jpg', 8),
(14, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K268/O1CN01uQ1u1w283iPBp0P8y_!!731817877.jpg', 9),
(15, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K267/750.jpg', 10),
(16, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K263/O1CN01JefzCt1y6mx5MPpq6_!!1950826530.jpg', 11),
(17, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K261/500.jpg', 12),
(18, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K271/750.jpg', 13),
(19, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K265/O1CN01RkcEE31pZnSLavzqA_!!909315375.jpg', 14),
(20, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K264/O1CN015x1fhv283iPeaNewc_!!731817877.jpg', 15),
(21, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K264/O1CN01CCzGv1283iPbXwVqW_!!731817877.jpg', 15),
(22, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K262/15880982664_1159735690.jpg', 16),
(23, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K269/O1CN01ZNOtC4283iPUpH0Zl_!!731817877.jpg', 17),
(24, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K269/O1CN011AstHf283iPTA8JSQ_!!731817877.jpg', 17),
(25, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K259/O1CN014Vz4YW1y6muRi4MbO_!!1950826530-0-lubanu-s.jpg', 18),
(26, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K259/O1CN01MWDond1y6muU5mRAR_!!1950826530-0-lubanu-s.jpg', 18),
(27, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K178/500-aothun-nu-hoodie-den.jpg', 19),
(28, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K256/O1CN01YcNAfA1yJ9bB77tL6_!!846046557.jpg', 20),
(29, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K255/O1CN0158P6yI1wLKF8b6Zm2_!!654466291.jpg', 21),
(30, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K243/500-xanh.jpg', 22),
(31, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K241/O1CN01WZG3WT1qBLvqoyh4A_!!2204106625457.jpg', 23),
(32, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K241/O1CN01lvPDC71qBLvvZsuVN_!!2204106625457.jpg', 23),
(33, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K250/13454914236_788064225.jpg', 24),
(34, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K250/13416582935_788064225.jpg', 24),
(35, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K249/750.jpg', 25),
(36, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K240/14503720734_788064225.jpg', 26),
(37, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K253/O1CN01ztTgB12FLlKAq7q3g_!!1774018864.jpg', 27),
(38, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/13888927764_1159735690.jpg', 28),
(39, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K239/O1CN01dgAMtR283iOx95C91_!!731817877.jpg', 29),
(40, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K239/O1CN011OimOk283iOx92yvQ_!!731817877.jpg', 29),
(41, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K246/14505690905_1159735690.jpg', 30),
(42, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K245/13935151965_1159735690.jpg', 31),
(43, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K245/13935157894_1159735690.jpg', 31),
(44, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K251/19565488218_1159735690.jpg', 32),
(45, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K242/O1CN01WzV9AE283iPPRZiIQ_!!731817877.jpg', 33),
(46, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K242/O1CN01078UgN283iPSqsblR_!!731817877.jpg', 33),
(47, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-760-1/O1CN01a1zsHX1ro6xxF5yiu_!!213755677.jpg', 34),
(48, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-760-1/O1CN01TadXBb1ro6xxmoUGv_!!213755677.jpg', 34),
(49, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-906/aothunteennucomu-xam.jpg', 35),
(50, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-906/aothunteennucomu-den.jpg', 35),
(51, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-977/750-aothun-nu-xinh.jpg', 36),
(52, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K142/500-aothun-nu-den-non-trang.jpg', 37),
(53, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K142/500-aothun-nu-trang-non-den.jpg', 37),
(54, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K109/500-aothun-nu-hoodie-hong.jpg', 38),
(55, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K109/500-aothun-nu-hoodie-trang.jpg', 38),
(56, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-858/aothunhoodie-trang.jpg', 39),
(57, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-858/aothunhoodie-den.jpg', 39),
(58, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-950/aothunteen-thocarot-trang.jpg', 40),
(59, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K206/750-atnu-cao.jpg', 41),
(60, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-866/aothunteennoncarot-hong.jpg', 42),
(61, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K201/O1CN01eI5hiA28qiiVZzIhA_!!3402207984.jpg', 43),
(62, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-862/aothunteen-cogainhatban.jpg', 44),
(63, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS122/bae2b66fb7c54c9b15d4.jpg', 45),
(64, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS122/2f06d288d322287c7133.jpg', 45),
(65, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS122/4bedaa9eab34506a0925.jpg', 45),
(66, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-826/O1CN01kVO5z81y6muwmE0zL_!!1950826530-0-lubanu-s.jpg', 46),
(67, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-751/750-ao-nu-caro-nhatban-dep.jpg', 47),
(68, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-824/750.jpg', 48),
(69, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-810/10820493287_1159735690.jpg', 49),
(70, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-782/500-aokieunu-xanh.jpg', 50),
(71, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuvang.jpg', 51),
(72, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunu-xanhreu.jpg', 51),
(73, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-771/500-ao-baby-doll-nu-trang.jpg', 52),
(74, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-778/750-aoren-nu-morigirl-nhatban-meo-form-rong.jpg', 53),
(75, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-756/500-aokieu-nu-khom-hong.jpg', 54),
(76, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-756/750-ao-kieu-nu-khom-vang.jpg', 54),
(77, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-761/500-aovoan-nu-beo-xanh.jpg', 55),
(78, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-749/500-aovoan-nu-taybeo-hong.jpg', 56),
(79, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-749/500-aovoan-nu-taybeo-trang.jpg', 56);

-- --------------------------------------------------------

--
-- Table structure for table `Image`
--

CREATE TABLE `Image` (
  `id` int NOT NULL,
  `imageLink` varchar(200) NOT NULL,
  `productId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Image`
--

INSERT INTO `Image` (`id`, `imageLink`, `productId`) VALUES
(1, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS118/edcd67d64167ba39e376.jpg', 1),
(2, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS118/4d6a9e148ea675f82cb7.jpg', 1),
(3, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS118/f68a2f6206d3fd8da4c2.jpg', 1),
(4, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS118/99e006ba1608ed56b419.jpg', 1),
(5, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/SetBo/GS118/f68a2f6206d3fds8da4c2.jpg', 1),
(6, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-902/800-setthethaonudep.jpg', 2),
(7, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-902/570-aobra.jpg', 2),
(8, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-902/800-quanshort-denvienxam.jpg', 2),
(9, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-898/800-setaoquan.jpg', 3),
(10, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-898/800-quanthethaonu.jpg', 3),
(11, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-898/800-aobraxanh.jpg', 3),
(12, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-898/800-aobraxam.jpg', 3),
(13, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-898/800-aobrado.jpg', 3),
(14, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-900/800-setbo.jpg', 4),
(15, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-900/800-quanshort.jpg', 4),
(16, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-900/800-aothethaonu-barrel.jpg', 4),
(17, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-897/aobra-tap-gym-yoga.jpg', 5),
(18, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-897/750-aobrathethaonu-den.jpg', 5),
(19, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/750-atnu.jpg', 7),
(20, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg', 7),
(21, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309180730_1159735690.jpg', 7),
(22, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K260/750.jpg', 8),
(23, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K260/O1CN01HnbXq01PDeHem6Dei_!!1612671807.jpg', 8),
(24, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K260/O1CN01vqpPYH1PDeHdGyioD_!!1612671807.jpg', 8),
(25, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K268/750.jpg', 9),
(26, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K268/O1CN01uQ1u1w283iPBp0P8y_!!731817877.jpg', 9),
(27, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K267/750.jpg', 10),
(28, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K267/750.jpg', 10),
(29, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K263/750.jpg', 11),
(30, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K263/O1CN01JefzCt1y6mx5MPpq6_!!1950826530.jpg', 11),
(31, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K261/750.jpg', 12),
(32, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K261/500.jpg', 12),
(33, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K271/750.jpg', 13),
(34, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K271/750.jpg', 13),
(35, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K265/750.jpg', 14),
(36, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K265/O1CN01RkcEE31pZnSLavzqA_!!909315375.jpg', 14),
(37, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K264/750.jpg', 15),
(38, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K264/O1CN015x1fhv283iPeaNewc_!!731817877.jpg', 15),
(39, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K264/O1CN01CCzGv1283iPbXwVqW_!!731817877.jpg', 15),
(40, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K262/750.jpg', 16),
(41, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K262/15880982664_1159735690.jpg', 16),
(42, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K269/750.jpg', 17),
(43, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K269/O1CN01ZNOtC4283iPUpH0Zl_!!731817877.jpg', 17),
(44, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K269/O1CN011AstHf283iPTA8JSQ_!!731817877.jpg', 17),
(45, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K259/750.jpg', 18),
(46, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K259/O1CN01MWDond1y6muU5mRAR_!!1950826530-0-lubanu-s.jpg', 18),
(47, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K259/O1CN01OdSqKv1uX7DPXDS2O_!!2201313106046.jpg', 18),
(48, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K178/750-aothun-nu-hoodie-co-mu-nhatban.jpg', 19),
(49, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K178/500-aothun-nu-hoodie-den.jpg', 19),
(50, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K256/750.jpg', 20),
(51, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K256/O1CN01YcNAfA1yJ9bB77tL6_!!846046557.jpg', 20),
(52, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K256/O1CN01OrJVxu1yJ9b6oUUQu_!!846046557.jpg', 20),
(53, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K255/750.jpg', 21),
(54, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K255/O1CN0158P6yI1wLKF8b6Zm2_!!654466291.jpg', 21),
(55, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K243/750.jpg', 22),
(56, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K243/500-attrang.jpg', 22),
(57, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K243/500-xanh.jpg', 22),
(58, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K241/750.jpg', 23),
(59, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K241/O1CN01WZG3WT1qBLvqoyh4A_!!2204106625457.jpg', 23),
(60, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K241/O1CN01lvPDC71qBLvvZsuVN_!!2204106625457.jpg', 23),
(61, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K250/750.jpg', 24),
(62, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K250/13416582935_788064225.jpg', 24),
(63, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K250/13454914236_788064225.jpg', 24),
(64, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K249/750.jpg', 25),
(65, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K249/750.jpg', 25),
(66, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K240/750.jpg', 26),
(67, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K240/14556038436_788064225.jpg', 26),
(68, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K240/14503720734_788064225.jpg', 26),
(69, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/750.jpg', 28),
(70, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/13888927764_1159735690.jpg', 28),
(71, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K239/750.jpg', 29),
(72, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K239/O1CN011OimOk283iOx92yvQ_!!731817877.jpg', 29),
(73, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K239/O1CN01dgAMtR283iOx95C91_!!731817877.jpg', 29),
(74, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K246/750.jpg', 30),
(75, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K246/14505690905_1159735690.jpg', 30),
(76, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K246/14596238479_1159735690.jpg', 30),
(77, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K245/750-aothunnu.jpg', 31),
(78, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K245/13935157894_1159735690.jpg', 31),
(79, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K245/13935151965_1159735690.jpg', 31),
(80, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K251/750.jpg', 32),
(81, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K251/19565458847_1159735690.jpg', 32),
(82, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K251/19565488218_1159735690.jpg', 32),
(83, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K251/19642046600_1159735690.jpg', 32),
(84, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K242/750-avatar.jpg', 33),
(85, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K242/O1CN01WzV9AE283iPPRZiIQ_!!731817877.jpg', 33),
(86, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K242/O1CN01078UgN283iPSqsblR_!!731817877.jpg', 33),
(87, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-760-1/O1CN01ZQv0H11ro6xxmpMKf_!!213755677.jpg', 34),
(88, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-760-1/O1CN01a1zsHX1ro6xxF5yiu_!!213755677.jpg', 34),
(89, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-760-1/O1CN01JKwZRo1ro6xwAFtJP_!!213755677.jpg', 34),
(90, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-906/aothunteennucomu-xam.jpg', 35),
(91, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-906/aothunteennucomu-den.jpg', 35),
(92, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-906/aothunteennucomu-xam.jpg', 35),
(93, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K142/750-aothun-nu-co-non-hoodie-meo.jpg', 37),
(94, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K142/500-aothun-nu-den-non-trang.jpg', 37),
(95, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K142/500-aothun-nu-trang-non-den.jpg', 37),
(96, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K109/750-aothun-nu-hoodie-khunglong.jpg', 38),
(97, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K109/500-aothun-nu-hoodie-hong.jpg', 38),
(98, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K109/500-aothun-nu-hoodie-trang.jpg', 38),
(99, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-858/aothunteencomutrumdau.jpg', 39),
(100, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-858/aothunhoodie-trang.jpg', 39),
(101, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-858/aothunhoodie-hong.jpg', 39),
(102, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-858/aothunhoodie-den.jpg', 39),
(103, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-950/aothunteen-thocarot.jpg', 40),
(104, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-950/aothunteen-thocarot-hong.jpg', 40),
(105, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-950/aothunteen-thocarot-trang1.jpg', 40),
(106, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K206/750-atnu-cao.jpg', 41),
(107, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K206/O1CN01keBPR81y6mqDI2727_!!1950826530.jpg', 41),
(108, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-866/aothunteennu-hoatietthocarot.jpg', 42),
(109, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-866/aothunteennoncarot-den.jpg', 42),
(110, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-866/aothunteennoncarot-hong.jpg', 42),
(111, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-866/aothunteennoncarot-trang.jpg', 42),
(112, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K201/750-aothunnu.jpg', 43),
(113, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K201/O1CN01eI5hiA28qiiVZzIhA_!!3402207984.jpg', 43),
(114, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K201/O1CN01cWFJUg28qiiTBYcLq_!!3402207984.jpg', 43),
(115, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-826/750.jpg', 46),
(116, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-826/O1CN01kVO5z81y6muwmE0zL_!!1950826530-0-lubanu-s.jpg', 46),
(117, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-751/750-ao-nu-caro-nhatban-dep.jpg', 47),
(118, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-751/ao-caro-nu-phongcach-nhatban.jpg', 47),
(119, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-824/750.jpg', 48),
(120, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-824/O1CN01nTvP4O1y6muzj1EUR_!!1950826530-0-lubanu-s.jpg', 48),
(121, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-810/O1CN01m8njWs26mToU1Czyo_!!1799587704.jpg', 49),
(122, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-810/10820487361_1159735690.jpg', 49),
(123, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-810/10820493287_1159735690.jpg', 49),
(124, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-782/750-aokieunuxinh.jpg', 50),
(125, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-782/500-aokieunu-xanh.jpg', 50),
(126, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/750-aokieu2daynu.jpg', 51),
(127, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunu-xanhreu.jpg', 51),
(128, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuden.jpg', 51),
(129, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunutrang.jpg', 51),
(130, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuvang.jpg', 51),
(131, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuxanhdatroi.jpg', 51),
(132, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/750-aokieu2daynu.jpg', 51),
(133, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunu-xanhreu.jpg', 51),
(134, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuden.jpg', 51),
(135, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunutrang.jpg', 51),
(136, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuvang.jpg', 51),
(137, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuxanhdatroi.jpg', 51),
(138, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/750-aokieu2daynu.jpg', 51),
(139, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunu-xanhreu.jpg', 51),
(140, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuden.jpg', 51),
(141, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunutrang.jpg', 51),
(142, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuvang.jpg', 51),
(143, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-783/500-aokieunuxanhdatroi.jpg', 51),
(144, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-771/750-ao-baby-doll-nu-nhatban.jpg', 52),
(145, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-771/500-ao-baby-doll-nu-vang.jpg', 52),
(146, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-771/500-ao-baby-doll-nu-trang.jpg', 52),
(147, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-778/750-aoren-nu-morigirl-nhatban-meo-form-rong.jpg', 53),
(148, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-778/aoren-nu-morigirl-nhatban.jpg', 53),
(149, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-756/750-ao-kieu-nu-khom-vang.jpg', 54),
(150, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-756/500-aokieu-nu-khom-hong.jpg', 54),
(151, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-761/750-aovoan-nu-beo-hong.jpg', 55),
(152, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-761/aovoan-nu-muahe-hanquoc.jpg', 55),
(153, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-761/500-aovoan-nu-beo-xanh.jpg', 55),
(154, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-749/750-ao-voan-nu-hanquoc-xinh.jpg', 56),
(155, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-749/500-aovoan-nu-taybeo-hong.jpg', 56),
(156, 'http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKieu/GAU-749/500-aovoan-nu-taybeo-trang.jpg', 56);

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `categoryId` int NOT NULL,
  `typeId` int NOT NULL,
  `price` float NOT NULL,
  `discount` float NOT NULL,
  `quantity` int NOT NULL,
  `soldQuantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`id`, `name`, `categoryId`, `typeId`, `price`, `discount`, `quantity`, `soldQuantity`) VALUES
(1, 'Bộ Thun Short Burber 118', 1, 1, 195000, 35000, 50, 0),
(2, 'Áo Bra Trơn Hai Lớp Tập Thể Hình 902', 1, 1, 99000, 30000, 50, 0),
(3, 'Áo Bra Nữ Viền Chữ Đẹp 898', 1, 1, 230000, 0, 50, 0),
(4, 'Set Bộ Áo Bra & Quần Short Thể Thao Tập GYM 900', 1, 1, 130000, 15000, 50, 0),
(5, 'Áo Bra Nữ Viền Chữ Tập GYM 897', 1, 1, 130000, 0, 50, 0),
(6, 'Áo Thun Nữ Nhật Bản In Thỏ F05', 1, 2, 99000, 25000, 50, 0),
(7, 'Áo Thun Tay Dài Hình Gấu K204', 1, 2, 199000, 0, 50, 0),
(8, 'Áo Thun Cổ Tròn Phong Cách Nhật K260', 1, 2, 240000, 0, 50, 0),
(9, 'Áo Thun Cổ Tròn Gấu BEAR K268', 1, 2, 240000, 0, 50, 0),
(10, 'Áo Thun Thủy Thủ Tay Dài K267', 1, 2, 260000, 0, 50, 0),
(11, 'Áo Thun Hoodie Gấu Nâu K263', 1, 2, 250000, 25000, 50, 0),
(12, 'Áo Thun Croptop Purple Rút Eo K261', 1, 2, 240000, 0, 50, 0),
(13, 'Áo Thun Croptop Thêu Bướm K271', 1, 2, 240000, 0, 50, 0),
(14, 'Áo Thun Nữ Gỉa Yếm Thổ Cẩm K265', 1, 2, 240000, 0, 50, 0),
(15, 'Áo Thun Cổ Tròn Phối Màu K264', 1, 2, 240000, 20000, 50, 0),
(16, 'Áo Thun Cổ Tròn Thêu Chuồn Chuồn K262', 1, 2, 245000, 0, 50, 0),
(17, 'Áo Thun Cổ Tròn MEOW K269', 1, 2, 230000, 25000, 50, 0),
(18, 'Áo Thun Hoodie Love You Love Me K259', 1, 2, 240000, 50000, 50, 0),
(19, 'Áo Thun Nữ In Heo Con K178', 1, 2, 225000, 0, 50, 0),
(20, 'Áo Thun Hoodie Nữ MEOW K256', 1, 2, 245000, 0, 50, 0),
(21, 'Áo Thun Hoodie LOVELY BABY CAT K255', 1, 2, 245000, 15000, 50, 0),
(22, 'Áo Thun Nữ Teen Morigirl K243', 1, 2, 245000, 0, 50, 0),
(23, 'Áo Thun Thủy Thủ Viền Hoa K241', 1, 2, 240000, 0, 50, 0),
(24, 'Áo Thun Nữ Mèo & Cá Tay Đan K250', 1, 2, 245000, 0, 50, 0),
(25, 'Áo Thun Nữ Tay Dài Lệch Vai K249', 1, 2, 245000, 0, 50, 0),
(26, 'Áo Thun Nữ Phối Màu Nhật Bản K240', 1, 2, 230000, 15000, 50, 0),
(27, 'Áo Thun Thủy Thủ Tai Mèo K253', 1, 2, 240000, 0, 50, 0),
(28, 'Áo Thun Hoodie Nữ Baby K252', 1, 2, 240000, 50000, 50, 0),
(29, 'Áo Thun Form Rộng Nhật Bản K239', 1, 2, 245000, 0, 50, 0),
(30, 'Áo Hoodie Tay Lở Nhật Bản K246', 1, 2, 235000, 0, 50, 0),
(31, 'Áo Thun Hoodie Nữ Tay Màu K245', 1, 2, 230000, 20000, 50, 0),
(32, 'Áo Thun Croptop Nữ Thủy Thủ K251', 1, 2, 245000, 0, 50, 0),
(33, 'Áo Thun Nữ Tay Ngắn Meow K242', 1, 2, 230000, 15000, 50, 0),
(34, 'Áo Thun Nữ Có Nón Cartoon 760', 1, 2, 225000, 30000, 50, 0),
(35, 'Áo Thun Nữ Nón Mèo Xinh 906', 1, 2, 260000, 20000, 50, 0),
(36, 'Áo Thun Nữ Kung Fu Panda Xinh 977', 1, 2, 240000, 20000, 50, 0),
(37, 'Áo Thun Hoodie Nữ Thêu Mèo K142', 1, 2, 245000, 0, 50, 0),
(38, 'Áo Thun Nữ Có Nón Khủng Long K109', 1, 2, 260000, 50000, 50, 0),
(39, 'Áo Thun Có Nón Thêu Hình Mèo & Cá 858', 1, 2, 250000, 30000, 50, 0),
(40, 'Áo Thun Nữ Thỏ & Cà Rốt 950', 1, 2, 265000, 0, 50, 0),
(41, 'Áo Thun Nữ Hình Cáo K206', 1, 2, 230000, 50000, 50, 0),
(42, 'Áo Thun Nữ Họa Tiết Thỏ Và Cà Rốt 866', 1, 2, 260000, 15000, 50, 0),
(43, 'Áo Thun Nữ Họa Tiết Trái Tim K201', 1, 2, 220000, 0, 50, 0),
(44, 'Áo Thun Teen Cô Gái Nhật Bản 862', 1, 2, 210000, 20000, 50, 0),
(45, 'Bộ Thun Mặc Nhà 122', 1, 2, 190000, 0, 50, 0),
(46, 'Áo Thuỷ Thủ Nữ Cute 826', 1, 2, 250000, 0, 50, 0),
(47, 'Áo Kiểu Nữ Ngắn Tay Dễ Thương 751', 1, 2, 225000, 50000, 50, 0),
(48, 'Áo Kiểu Caro Nữ Hở Vai 824', 1, 2, 240000, 0, 50, 0),
(49, 'Áo Caro Nữ 810', 1, 2, 220000, 0, 50, 0),
(50, 'Áo Kiểu Nữ 2 Dây Hot Summer 782', 1, 2, 109000, 0, 50, 0),
(51, 'Áo Kiểu Nữ 2 Dây Mùa Hè 783', 1, 2, 109000, 50000, 50, 0),
(52, 'Áo Kiểu Nữ Babydoll Bigsize 771', 1, 2, 199000, 20000, 50, 0),
(53, 'Áo Kiểu Nữ Ren MoriGirl 778', 1, 2, 190000, 20000, 50, 0),
(54, 'Áo Kiểu Nữ Hai Dây Trái Thơm 756', 1, 2, 135000, 15000, 50, 0),
(55, 'Áo Kiểu Nữ Voan Bẹt Vai 761', 1, 2, 119000, 25000, 50, 0),
(56, 'Áo Kiểu Nữ Tay Bèo 749', 1, 2, 189000, 50000, 50, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ProductStatusDetail`
--

CREATE TABLE `ProductStatusDetail` (
  `productId` int NOT NULL,
  `statusId` smallint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ProductStatusDetail`
--

INSERT INTO `ProductStatusDetail` (`productId`, `statusId`) VALUES
(1, 3),
(1, 2),
(2, 2),
(2, 3),
(3, 4),
(3, 3),
(4, 2),
(4, 3),
(5, 4),
(6, 2),
(6, 3),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 2),
(11, 3),
(12, 1),
(13, 1),
(14, 1),
(15, 2),
(16, 3),
(17, 2),
(17, 4),
(18, 2),
(18, 3),
(19, 1),
(20, 1),
(21, 2),
(21, 3),
(22, 4),
(22, 3),
(23, 1),
(24, 4),
(25, 1),
(26, 2),
(27, 1),
(28, 2),
(28, 3),
(29, 1),
(30, 4),
(31, 2),
(31, 4),
(32, 3),
(32, 4),
(33, 2),
(33, 4),
(34, 2),
(34, 4),
(35, 2),
(35, 4),
(35, 3),
(36, 2),
(36, 3),
(37, 3),
(38, 2),
(38, 4),
(39, 2),
(40, 1),
(41, 2),
(41, 3),
(41, 4),
(42, 2),
(43, 4),
(44, 2),
(44, 4),
(45, 1),
(46, 1),
(47, 2),
(47, 3),
(47, 4),
(48, 4),
(48, 3),
(49, 4),
(49, 3),
(50, 1),
(51, 2),
(52, 2),
(53, 2),
(53, 4),
(54, 2),
(55, 2),
(56, 2),
(56, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Size`
--

CREATE TABLE `Size` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `productId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Size`
--

INSERT INTO `Size` (`id`, `name`, `productId`) VALUES
(1, 'M', 1),
(2, 'FreeSize', 1),
(3, 'L', 2),
(4, 'S', 3),
(5, 'S', 4),
(6, 'M', 4),
(7, 'S', 5),
(8, 'M', 5),
(9, 'FreeSize', 5),
(10, 'FreeSize', 6),
(11, 'S', 7),
(12, 'FreeSize', 8),
(13, 'S', 8),
(14, 'L', 9),
(15, 'L', 10),
(16, 'M', 11),
(17, 'FreeSize', 11),
(18, 'FreeSize', 12),
(19, 'XL', 12),
(20, 'S', 13),
(21, 'XL', 13),
(22, 'FreeSize', 13),
(23, 'FreeSize', 14),
(24, 'S', 14),
(25, 'L', 15),
(26, 'M', 15),
(27, 'XL', 15),
(28, 'L', 16),
(29, 'FreeSize', 16),
(30, 'M', 17),
(31, 'FreeSize', 17),
(32, 'S', 17),
(33, 'L', 18),
(34, 'FreeSize', 19),
(35, 'XL', 19),
(36, 'L', 19),
(37, 'FreeSize', 20),
(38, 'S', 20),
(39, 'L', 20),
(40, 'M', 21),
(41, 'S', 21),
(42, 'FreeSize', 22),
(43, 'L', 22),
(44, 'XL', 23),
(45, 'M', 24),
(46, 'S', 24),
(47, 'M', 25),
(48, 'S', 25),
(49, 'S', 26),
(50, 'L', 26),
(51, 'FreeSize', 27),
(52, 'XL', 28),
(53, 'M', 28),
(54, 'L', 28),
(55, 'XL', 29),
(56, 'XL', 30),
(57, 'FreeSize', 30),
(58, 'S', 31),
(59, 'L', 31),
(60, 'M', 31),
(61, 'XL', 32),
(62, 'M', 32),
(63, 'S', 33),
(64, 'FreeSize', 34),
(65, 'L', 34),
(66, 'L', 35),
(67, 'FreeSize', 35),
(68, 'L', 36),
(69, 'XL', 36),
(70, 'L', 37),
(71, 'XL', 37),
(72, 'FreeSize', 38),
(73, 'L', 38),
(74, 'FreeSize', 39),
(75, 'XL', 39),
(76, 'S', 39),
(77, 'FreeSize', 40),
(78, 'FreeSize', 41),
(79, 'S', 42),
(80, 'L', 42),
(81, 'FreeSize', 43),
(82, 'L', 43),
(83, 'XL', 43),
(84, 'S', 44),
(85, 'XL', 45),
(86, 'L', 45),
(87, 'M', 45),
(88, 'FreeSize', 46),
(89, 'M', 47),
(90, 'XL', 48),
(91, 'S', 49),
(92, 'XL', 49),
(93, 'L', 50),
(94, 'M', 50),
(95, 'XL', 51),
(96, 'FreeSize', 51),
(97, 'S', 52),
(98, 'M', 53),
(99, 'M', 54),
(100, 'XL', 55),
(101, 'M', 56),
(102, 'L', 56);

-- --------------------------------------------------------

--
-- Table structure for table `Status`
--

CREATE TABLE `Status` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Status`
--

INSERT INTO `Status` (`id`, `name`) VALUES
(1, 'Không có'),
(2, 'Khuyến mãi'),
(3, 'Mới'),
(4, 'Bán chạy');

-- --------------------------------------------------------

--
-- Table structure for table `Type`
--

CREATE TABLE `Type` (
  `id` smallint NOT NULL,
  `categoryId` smallint NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Type`
--

INSERT INTO `Type` (`id`, `categoryId`, `name`) VALUES
(1, 1, 'Áo thể thao'),
(2, 1, 'Áo thun nữ'),
(3, 1, 'Áo kiểu nữ'),
(4, 1, 'Áo sơ mi nữ'),
(5, 1, 'Áo khoác nữ'),
(6, 2, 'Quần dài'),
(7, 2, 'Quần short nữ'),
(8, 2, 'Quần legging');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `adress` varchar(30) DEFAULT '''''',
  `phone` varchar(11) DEFAULT '''''',
  `email` varchar(30) NOT NULL,
  `mute` tinyint(1) DEFAULT '0',
  `district` varchar(30) DEFAULT '''''',
  `city` varchar(30) DEFAULT '''''',
  `confirmed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `name`, `username`, `password`, `adress`, `phone`, `email`, `mute`, `district`, `city`, `confirmed`, `created_at`, `updated_at`) VALUES
(1, 'ADMIN', 'admin', '123456', '\'\'', '\'\'', 'admin@gmail.com', 0, '\'\'', '\'\'', 0, '2021-10-13 15:24:04', '2021-10-13 15:24:04'),
(2, 'minh', 'nhat123', 'qwerty', '\'\'', '\'\'', 's@gm.com', 0, '\'\'', '\'\'', 0, '2021-10-13 15:26:13', '2021-10-13 15:26:13'),
(6, 'gg', 'nhat', '88888888', '\'\'', '\'\'', 'ek@g.com', 0, '\'\'', '\'\'', 0, '2021-10-13 15:40:32', '2021-10-13 15:40:32'),
(7, 'minh2', 'nhat2', 'qwerty', '\'\'', '\'\'', 's2@gm.com', 0, '\'\'', '\'\'', 0, '2021-10-13 15:26:13', '2021-10-13 15:26:13'),
(8, 'kos', 'nhatdd', '123456', '\'\'', '\'\'', 's2dd@gm.com', 0, '\'\'', '\'\'', 0, '2021-10-13 17:22:53', '2021-10-13 17:22:53'),
(9, 'kos', 'nhatdddd', '123456', '\'\'', '\'\'', 's2dsd@gm.com', 0, '\'\'', '\'\'', 0, '2021-10-13 17:23:40', '2021-10-13 17:23:40'),
(10, 'kos', 'nhsssadasa', '123456', '\'\'', '\'\'', 's2ddsadadsd@gm.com', 0, '\'\'', '\'\'', 0, '2021-10-13 17:56:15', '2021-10-13 17:56:15'),
(11, 'kos', 'nhsssadasdda', '$2b$10$o4Im0IKqy5291zGCXLorKOam8lZdg3XGSToAygIJlyV0KijS9R38a', '\'\'', '\'\'', 's2ddsadaddsad@gm.com', 0, '\'\'', '\'\'', 0, '2021-10-13 18:16:44', '2021-10-13 18:16:44'),
(13, 'kudas', 'ndsadadsads', '$2b$10$TokkNFJQumO8uZOs8IpjPuLb4AWKSg.QNebs/bsbX27fq1/izu2RW', '\'\'', '\'\'', 'bokool789@gmail.com', 0, '\'\'', '\'\'', 1, '2021-10-14 15:54:30', '2021-10-14 15:54:30'),
(14, 'quy', 'kool1', '123456', '\'\'', '\'\'', 'kool1@gm.com', 0, '\'\'', '\'\'', 0, '2021-10-15 09:54:55', '2021-10-15 09:54:55'),
(15, 'thang', 'kool2', '123456', '\'\'', '\'\'', 'kool2@gm.com', 0, '\'\'', '\'\'', 0, '2021-10-15 09:54:55', '2021-10-15 09:54:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Color`
--
ALTER TABLE `Color`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Image`
--
ALTER TABLE `Image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Size`
--
ALTER TABLE `Size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Type`
--
ALTER TABLE `Type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Color`
--
ALTER TABLE `Color`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `Image`
--
ALTER TABLE `Image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `Size`
--
ALTER TABLE `Size`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `Status`
--
ALTER TABLE `Status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Type`
--
ALTER TABLE `Type`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
