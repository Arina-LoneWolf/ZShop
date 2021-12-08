-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Dec 08, 2021 at 04:29 PM
-- Server version: 8.0.27
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
-- Table structure for table `Type`
--

CREATE TABLE `Type` (
  `id` smallint NOT NULL,
  `categoryId` smallint NOT NULL,
  `name` varchar(50) NOT NULL,
  `typeKey` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Type`
--

INSERT INTO `Type` (`id`, `categoryId`, `name`, `typeKey`) VALUES
(1, 1, 'Áo thể thao', 'ao-the-thao'),
(2, 1, 'Áo thun nữ', 'ao-thun-nu'),
(3, 1, 'Áo kiểu nữ', 'ao-kieu-nu'),
(4, 1, 'Áo sơ mi nữ', 'ao-so-mi-nu'),
(5, 1, 'Áo khoác nữ', 'ao-khoac-nu'),
(6, 2, 'Quần dài', 'quan-dai'),
(7, 2, 'Quần short nữ', 'quan-short-nu'),
(8, 2, 'Quần legging', 'quan-legging'),
(9, 3, 'Chân váy', 'chan-vay'),
(10, 3, 'Đầm nữ', 'dam-nu'),
(11, 3, 'Yếm', 'yem'),
(12, 4, 'Gấu bông cute', 'gau-bong-cute'),
(13, 4, 'Gối chữ U', 'goi-chu-u'),
(14, 4, 'Mền thú', 'men-thu'),
(15, 5, 'Hoa', 'hoa'),
(16, 5, 'Túi quà', 'tui-qua'),
(17, 5, 'Thiệp', 'thiep'),
(18, 5, 'Móc khóa', 'moc-khoa'),
(19, 6, 'Đèn', 'den'),
(20, 6, 'Chuông gió', 'chuong-gio'),
(21, 6, 'Kẹp ảnh', 'kep-anh'),
(22, 7, 'Túi đeo', 'tui-deo'),
(23, 7, 'Balo', 'balo'),
(24, 7, 'Ví', 'vi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Type`
--
ALTER TABLE `Type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Type`
--
ALTER TABLE `Type`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
