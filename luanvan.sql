-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 12, 2022 at 02:36 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `luanvan`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
CREATE TABLE IF NOT EXISTS `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) DEFAULT NULL,
  `id_product` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `picture`, `id_product`, `createdAt`, `updatedAt`) VALUES
(1, 'https://cdn.tgdd.vn/2022/07/banner/18-intel-800-200-800x200.png', 5, '2022-07-07 08:46:26', '2022-07-07 08:46:26'),
(2, 'https://cdn.tgdd.vn/2022/06/banner/800-200-800x200-176.png', 6, '2022-07-07 08:46:26', '2022-07-07 08:46:26'),
(3, 'https://cdn.tgdd.vn/2022/07/banner/800-200-800x200-22.png', 12, '2022-07-07 08:46:26', '2022-07-07 08:46:26');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Văn phòng'),
(2, 'Học tập'),
(3, 'Gamming'),
(4, 'Phụ kiện');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `star` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `star`, `status`, `id_product`, `id_user`, `createdAt`, `updatedAt`) VALUES
(1, 'sản phẩm tốt', 5, 1, 5, 4, '2022-07-07 07:08:46', '2022-07-07 07:08:46'),
(2, 'sản phẩm đẹp', 5, 1, 5, 3, '2022-07-07 07:08:46', '2022-07-07 07:08:46'),
(3, 'tốt', 4, 1, 6, 4, '2022-07-07 14:58:42', '2022-07-07 14:58:42');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `describe` text,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `name`, `date`, `cost`, `describe`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 'GIAM20', '2022-07-07 07:11:26', 20, 'Mã này được giảm 20% giá trị hóa đơn', 10, '2022-07-07', '2022-07-07 07:11:26'),
(2, 'GIAM30', '2022-07-07 07:11:26', 30, 'Mã này được giảm 30% giá trị hóa đơn', 10, '2022-07-07', '2022-07-07 07:11:26'),
(3, 'GIAM50', '2022-07-07 07:11:26', 50, 'Mã này được giảm 50% giá trị hóa đơn', 10, '2022-07-07', '2022-07-07 07:11:26');

-- --------------------------------------------------------

--
-- Table structure for table `detail_orders`
--

DROP TABLE IF EXISTS `detail_orders`;
CREATE TABLE IF NOT EXISTS `detail_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_order` (`id_order`),
  KEY `id_product` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detail_orders`
--

INSERT INTO `detail_orders` (`id`, `id_order`, `id_product`, `price`, `name`, `quantity`, `total`, `createdAt`, `updatedAt`) VALUES
(1, 1, 5, 18890000, 'Laptop Asus VivoBook Pro 14X M3401QA-KM025W Ryzen 7 5800H AMD Radeon 8GB 512GB 14″ 2.8K OLED Win 11 Cool Silver', 1, 18890000, '2022-07-07 08:20:00', '2022-07-07 08:20:00'),
(2, 2, 5, 18890000, 'Laptop Asus VivoBook Pro 14X M3401QA-KM025W Ryzen 7 5800H AMD Radeon 8GB 512GB 14″ 2.8K OLED Win 11 Cool Silver', 1, 18890000, '2022-07-07 08:30:36', '2022-07-07 08:30:36'),
(3, 2, 6, 29990000, 'Laptop Asus VivoBook Pro 16X M7400QC-L2077W RTX 3050 4GB Ryzen 5 5600H 16GB 512GB 16″ 2.8K OLED Win 11 Black', 1, 29990000, '2022-07-07 08:30:36', '2022-07-07 08:30:36'),
(4, 2, 7, 18290000, 'Laptop Lenovo Ideapad 5 Pro 14ACN6 (82L700L5VN) Ryzen 5 5600U 512GB 16GB 14” WQXGA IPS 90Hz Backlight Keyboard Win 11 CLOUD GREY', 1, 18290000, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `detail_receipts`
--

DROP TABLE IF EXISTS `detail_receipts`;
CREATE TABLE IF NOT EXISTS `detail_receipts` (
  `id` int(11) NOT NULL,
  `id_receipt` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_receipt` (`id_receipt`),
  KEY `id_product` (`id_product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `insurances`
--

DROP TABLE IF EXISTS `insurances`;
CREATE TABLE IF NOT EXISTS `insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `returned_day` datetime DEFAULT NULL,
  `received_day` datetime DEFAULT NULL,
  `reason` text,
  `id_order` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_order` (`id_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `paymethod` tinyint(1) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `id_payment` int(11) DEFAULT NULL,
  `id_coupon` int(11) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_payment` (`id_payment`),
  KEY `id_coupon` (`id_coupon`),
  KEY `id_user` (`id_user`),
  KEY `id_status` (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `address`, `paymethod`, `note`, `total`, `id_payment`, `id_coupon`, `id_user`, `id_status`, `createdAt`, `updatedAt`) VALUES
(1, 'TP.HCM', 0, NULL, 18890000, NULL, NULL, 3, 1, '2022-07-07 08:27:30', '2022-07-07 08:27:30'),
(2, 'QN', 0, NULL, 48880000, NULL, NULL, 3, 1, '2022-07-07 08:28:41', '2022-07-07 08:28:41'),
(3, 'qn', 0, NULL, NULL, NULL, NULL, 1, 1, '2022-07-12 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_pay` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `permission`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '2022-07-06 15:50:25', '2022-07-06 15:50:25'),
(2, 'Nhân viên', '2022-07-06 15:50:25', '2022-07-06 15:50:25'),
(3, 'Khách hàng', '2022-07-06 15:51:01', '2022-07-06 15:51:01');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `content` text,
  `summary` text,
  `ram` varchar(255) DEFAULT NULL,
  `chip` varchar(255) DEFAULT NULL,
  `card` varchar(255) DEFAULT NULL,
  `display` varchar(255) DEFAULT NULL,
  `memory` varchar(255) DEFAULT NULL,
  `port` varchar(255) DEFAULT NULL,
  `operation` varchar(255) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `dpi` float DEFAULT NULL,
  `micro_switch` int(11) DEFAULT NULL,
  `scroll_switch` int(11) DEFAULT NULL,
  `durability` int(11) DEFAULT NULL,
  `keyboard_type` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `connect` varchar(255) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `insurance` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `id_cate` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cate` (`id_cate`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `quantity`, `picture`, `content`, `summary`, `ram`, `chip`, `card`, `display`, `memory`, `port`, `operation`, `pin`, `dpi`, `micro_switch`, `scroll_switch`, `durability`, `keyboard_type`, `model`, `connect`, `weight`, `size`, `color`, `material`, `insurance`, `status`, `id_cate`, `createdAt`, `updatedAt`) VALUES
(5, 'Laptop Asus VivoBook Pro 14X M3401QA-KM025W Ryzen 7 5800H AMD Radeon 8GB 512GB 14″ 2.8K OLED Win 11 Cool Silver', 18890000, 27, 'https://thenewxgear.com/wp-content/uploads/2021/12/Vivobook-pro-14x-silver-1_compressed.jpg', 'VivoBook Pro 14X là dòng sản phẩm được định vị nằm giữa VivoBook Pro và ZenBook. Hướng đến đối tượng người sáng tạo nội dung trẻ tuổi, vlogger hoặc những nghệ sĩ tự do. Bề mặt của máy được hoàn thiện với họa tiết dệt cho cảm giác như. những tờ giấy nhám cực mịn và hạn chế tối đa việc để lại dấu tay. Thiết kế của máy cũng cực kì trẻ trung, khu vực bàn phím được mã màu rõ ràng cho từng khu vực phím. Touchpad kích thước lớn tích hợp phím xoay ASUS DialPad với chức năng tương tự như con xoay vật lí trên máy Studiobook.\r\n\r\nMàn hình sẽ là thứ làm người dùng hài lòng khi sử dụng công nghệ OLED. Kích thước 14 inches độ phân giải 2880 x 1800. Tỉ lệ 16:10 thích hợp để làm việc và nó còn có tần số quét 90Hz. Về cổng kết nối, máy có đầy đủ những cổng kết nối mà người dùng làm sáng tạo nội dung cần đến như cổng. USB Type A, cổng USB Type C, cổng HDMI và cổng đầu đọc thẻ nhớ. Cuối cùng cấu hình của máy sẽ đủ để đáp ứng nhu cầu. Khi trang bị CPU AMD Ryzen 5000 H-Series, đồ họa AMD Radeon, lưu trữ SSD PCIe và bộ nhớ 8GB DDR4 tốc độ cao.', 'Màn hình sẽ là thứ làm người dùng hài lòng khi sử dụng công nghệ OLED. Kích thước 14 inches độ phân giải 2880 x 1800. Tỉ lệ 16:10 thích hợp để làm việc và nó còn có tần số quét 90Hz. Về cổng kết nối, máy có đầy đủ những cổng kết nối mà người dùng làm sáng tạo nội dung cần đến như cổng. USB Type A, cổng USB Type C, cổng HDMI và cổng đầu đọc thẻ nhớ. Cuối cùng cấu hình của máy sẽ đủ để đáp ứng nhu cầu. Khi trang bị CPU AMD Ryzen 5000 H-Series, đồ họa AMD Radeon, lưu trữ SSD PCIe và bộ nhớ 8GB DDR4 tốc độ cao.', '8GB LPDDR4X (8GB on board)', 'Ryzen 7 5800H', 'AMD Radeon', '14\" 2.8K OLED, 90Hz', '512GB SSD', 'USB 2.0,USB 3.2, USB Type-C, HDMI, Khe thẻ nhớ Micro SD, Tai nghe ', 'Windows 11', '8000 mah', NULL, NULL, NULL, NULL, 'Backlight Keyboard', 'M3401QA-KM025W', 'wifi, Bluetooth', 1.45, '31.74 x 22.85 x 1.79 ~ 1.79 cm', 'Bạc', 'Hợp kim nhôm', 12, 1, 2, '2022-06-06 13:50:59', '2022-06-06 13:50:59'),
(6, 'Laptop Asus VivoBook Pro 16X M7400QC-L2077W RTX 3050 4GB Ryzen 5 5600H 16GB 512GB 16″ 2.8K OLED Win 11 Black', 29990000, 33, 'https://product.hstatic.net/1000233206/product/asus_vivobook_pro_16x_oled_m7600qc-l2077w_f350d18a77604bd8876c433eac064b23_master.png', 'VivoBook Pro 16X là dòng sản phẩm được định vị nằm giữa VivoBook Pro và ZenBook. Hướng đến đối tượng người sáng tạo nội dung trẻ tuổi, vlogger hoặc những nghệ sĩ tự do. Bề mặt của máy được hoàn thiện với họa tiết dệt cho cảm giác như. những tờ giấy nhám cực mịn và hạn chế tối đa việc để lại dấu tay. Thiết kế của máy cũng cực kì trẻ trung, khu vực bàn phím được mã màu rõ ràng cho từng khu vực phím. Touchpad kích thước lớn tích hợp phím xoay ASUS DialPad với chức năng tương tự như con xoay vật lí trên máy Studiobook.\r\n\r\nMàn hình sẽ là thứ làm người dùng hài lòng khi sử dụng công nghệ OLED. Kích thước 14 inches độ phân giải 3840 x 2400. Tỉ lệ 16:10 thích hợp để làm việc và nó còn có tần số quét 90Hz. Về cổng kết nối, máy có đầy đủ những cổng kết nối mà người dùng làm sáng tạo nội dung cần đến như cổng. USB Type A, cổng USB Type C, cổng HDMI và cổng đầu đọc thẻ nhớ. Cuối cùng cấu hình của máy sẽ đủ để đáp ứng nhu cầu. Khi trang bị CPU AMD Ryzen 5000 H-Series, đồ họa Nvidia RTX , lưu trữ SSD PCIe và bộ nhớ 16GB DDR4 tốc độ cao.', 'Màn hình sẽ là thứ làm người dùng hài lòng khi sử dụng công nghệ OLED. Kích thước 14 inches độ phân giải 3840 x 2400. Tỉ lệ 16:10 thích hợp để làm việc và nó còn có tần số quét 90Hz. Về cổng kết nối, máy có đầy đủ những cổng kết nối mà người dùng làm sáng tạo nội dung cần đến như cổng. USB Type A, cổng USB Type C, cổng HDMI và cổng đầu đọc thẻ nhớ. Cuối cùng cấu hình của máy sẽ đủ để đáp ứng nhu cầu. Khi trang bị CPU AMD Ryzen 5000 H-Series, đồ họa Nvidia RTX , lưu trữ SSD PCIe và bộ nhớ 16GB DDR4 tốc độ cao.', '16GB LPDDR4X (8GBx2)', 'Ryzen 5 5600H', 'NVIDIA® GeForce RTX™ 3050 with 4GB of dedicated GDDR6 VRAM', '16\" 2.8K OLED', '512GB SSD', 'USB Type A, cổng USB Type C, cổng HDMI và cổng đầu đọc thẻ nhớ.', 'Windows 11 64 Bit', '12000 mah', NULL, NULL, NULL, NULL, 'Backlight Keyboard', 'M7400QC-L2077W', 'wifi, bluetooth', 1.45, '31.74 x 22.85 x 1.79 ~ 1.79 cm', 'Đen', 'Hợp kim nhôm', 12, 1, 1, '2022-06-06 14:08:12', '2022-06-06 14:08:12'),
(7, 'Laptop Lenovo Ideapad 5 Pro 14ACN6 (82L700L5VN) Ryzen 5 5600U 512GB 16GB 14” WQXGA IPS 90Hz Backlight Keyboard Win 11 CLOUD GREY\n', 18290000, 32, 'https://nguyencongpc.vn/media/lib/17-03-2022/len3.png', 'Laptop Lenovo IdeaPad 5 Pro 14ACN6 (82L700L5VN) sử dụng thiết kế nhôm nguyên khối. Với các cạnh được cắt vát tinh tế, tạo cảm giác cứng cáp và đầy sang trọng. Tổng thể máy có độ mỏng vừa phải, với trọng lượng chỉ 1.9kg giúp người dùng dễ dàng mang theo và di chuyển tới bất cứ đâu. Viền màn hình mỏng cũng là một điểm cộng của sản phẩm này. Ngoài việc giúp tăng không gian làm việc, nó còn giúp giảm đáng kể trọng lượng của máy. Bản lề của Lenovo IdeaPad 5 Pro 14ACN6 (82L700L5VN) cũng được gia công khá chắc chắn. Ngoài ra phần webcam của máy cũng được thiết kế nhô lên nhẹ, đây là nơi được tích hợp cảm biến ToF. Để phục vụ cho tính năng mở khóa khuôn mặt. Laptop Lenovo IdeaPad 5 Pro 14ACN6 (82L700L5VN) sử dụng CPU AMD Ryzen™ 5-5600U. Bộ nhớ RAM 16GB cùng với bộ nhớ lưu trữ SSD 512GB. Với cấu hình náy, máy tự tin có thể chiến tốt các tựa game nặng với mức FPS cao. Bên cạnh đó, những phần mềm làm đồ họa 2D. 3D cũng không thể làm khó được Lenovo IdeaPad 5 Pro 14ACN6 (82L700L5VN). Với sự kết hợp của card đồ họa rời NVIDIA® GeForce® GTX 1650 4GB GDDR6. Hỗ trợ xử lý tốt các tác vụ liên quan tới hình ảnh. Laptop Lenovo IdeaPad 5 Pro 14ACN6 (82L700L5VN) được trang bị một màn hình. Rất phù hợp cho nhu cầu giải trí đa phương tiện của người dùng. Với màn hình 14 inch độ phân giải WQXGA tốc độ. Được đánh giá khá cao về chất lượng hiển thị, về độ sắc nét và màu sắc, người dùng sẽ cảm nhận. Được sự khác biệt khi trải nghiệm các tựa game ở mức đồ họa cao. Ngoài ra với độ phủ màu sRGB lên tới 100%, các công việc liên quan đến thiết kế đồ họa cũng đều được đáp ứng một cách tốt nhất. Bàn phím Lenovo IdeaPad 5 Pro 14ACN6 (82L700L5VN) được sắp xếp theo một layout khá hợp lý. Với các phím bấm được đặt ở khoảng cách vừa phải, hành trình phím sâu, độ nảy tốt, ít phát ra tiếng ồn khi sử dụng. Vì vậy, đem lại cảm giác gõ phím tương đối tốt. Touchpad cũng được. Lenovo thiết kế với kích thước vừa phải và có độ nhám, bám tay hơn, thao tác chính xác, độ nhạy cao. Trang bị 2 cổng USB Type A, 1 cổng USB Type C, 1 cổng HDMI và 1 jack audio combo. Với số lượng cổng kết nối này, chiếc laptop này đã có thể hỗ trợ đầy đủ nhu cầu của người dùng. Đảm bảo khả năng truyền giữ liệu cũng như giao tiếp với các thiết bị ngoại vi khác.', 'Laptop Lenovo IdeaPad 5 Pro 14ACN6 (82L700L5VN) sử dụng CPU AMD Ryzen™ 5-5600U. Bộ nhớ RAM 16GB cùng với bộ nhớ lưu trữ SSD 512GB. Với cấu hình náy, máy tự tin có thể chiến tốt các tựa game nặng với mức FPS cao. Bên cạnh đó, những phần mềm làm đồ họa 2D. 3D cũng không thể làm khó được Lenovo IdeaPad 5 Pro 14ACN6 (82L700L5VN). Với sự kết hợp của card đồ họa rời NVIDIA® GeForce® GTX 1650 4GB GDDR6. Hỗ trợ xử lý tốt các tác vụ liên quan tới hình ảnh. ', '16GB Soldered DDR4-3200', 'AMD Ryzen 5 5600U', NULL, '14\" 2.8K (2880×1800) IPS 400nits Anti-glare, 90Hz, 100% sRGB', '512GB SSD NVMe M.2 PCIe Gen 3 x 4', '1x USB 3.2 Gen 1\r\n1x USB 3.2 Gen 1 (Always On)\r\n2x USB-C 3.2 Gen 1 (support data transfer, Power Delivery 3.0 and DisplayPort 1.4)\r\n1x HDMI 1.4b\r\n1x Card reader\r\n1x Headphone / microphone combo jack (3.5mm)', 'Windows 11 SL 64 Bit', 'Integrated 56.5Wh', NULL, NULL, NULL, NULL, 'Backlight Keyboard', '14ACN6 (82L700L5VN)', 'wifi, bluetooth', 1.38, '312.2 x 221 x 15.99-17.99 mm', 'Bạc', 'Hợp kim nhôm', 12, 1, 1, '2022-06-06 14:14:59', '2022-06-06 14:14:59'),
(8, 'Laptop Lenovo Yoga Slim 7 Pro 14IHU5 (82NH009PVN) Intel Core i7 11370H 16GB 512GB 14″ 2.8K OLED 100%sRGB Backlit Win 11', 25990000, 30, 'https://xgear.net/wp-content/uploads/2022/07/slim-1-600x600-1.jpg', 'Hoàn thành công việc nhanh chóng với Lenovo Yoga Slim 7 Pro 14IHU5 (82NH009PVN). Có sự kết hợp hoàn hảo của nền tảng Intel ® Evo ™ giữa khả năng đáp ứng. Tuổi thọ pin lâu dài và hình ảnh tuyệt đẹp. Hiệu suất được tối ưu hóa bằng AI thích ứng với nhu cầu của bạn và kết nối tốt nhất. Trong phân khúc, kết hợp với thời lượng pin đáng kinh ngạc để đảm bảo. Cho dù bạn đang tìm kiếm công nghệ thông minh mới nhất hay một công cụ mạnh mẽ để khám phá khía cạnh sáng tạo của mình, Lenovo Yoga Slim 7 Pro 14IHU5 (82NH009PVN) có đủ mọi thứ bạn tìm. Với chất liệu nhôm cao cấp, Yoga Slim 7i Pro có màu Xám đơn giản và Bạc nhạt cổ điển. Các chi tiết chu đáo bao gồm phần camera nhô cao để mở dễ dàng hơn bằng một tay. Bàn phím có đèn nền với bàn phím thiết kế mới cho phép trải nghiệm đánh máy thoải mái hơn và bàn di chuột lớn hơn 25% để sử dụng dễ dàng hơn. Tận hưởng độ rõ nét 2,8K tuyệt đẹp trên màn hình 14 ”chiếm 91%. Màn hình và có tỷ lệ 16:10 để xem được tối ưu hóa khi cuộn trang web hoặc làm việc. Nâng tầm chi tiết, độ chân thực và nhờ phổ màu SRGB 100%. Lên đến 1,07 tỷ sắc thái màu được tối ưu hóa với Dolby Vision ™ và hơn 246 pixel mỗi inch. Bổ sung âm thanh mạnh mẽ của loa âm thanh nổi tối ưu hóa Dolby Atmos ® cho âm thanh hình ảnh sống động, mãnh liệt. Tận dụng tối đa thời gian và công sức của bạn với một loạt các tính năng thông minh do AI hỗ trợ. Tận hưởng thời lượng pin đáng kinh ngạc nhờ Tính năng Làm mát Thông minh tự động tối ưu hóa năng lượng mà bạn không cần chỉnh. Cùng với khả năng tự động chuyển hướng năng lượng trực tiếp. Đến các bộ phận quan trọng của máy để tăng hiệu suất. Chúng tôi đã sử dụng những cánh quạt nhỏ nhất để đảm bảo rằng nhiệt độ của máy không quá nóng mà máy vừa nhẹ vừa hiệu quả. Và khi bạn cần tăng pin, sạc nhanh sẽ cung cấp năng lượng cho bạn một cách nhanh chóng. Flip to Boot cho phép bạn bắt đầu vào việc nhanh hơn bao giờ hết. Bằng cách tự động khởi động máy khi bạn mở nắp máy tính xách tay của mình. Công nghệ nhận dạng khuôn mặt giúp bạn đăng nhập một cách an toàn và nhanh chóng. Cảm biến chú ý đưa ra Cảnh báo về quyền riêng tư khi ai đó lướt qua và tự động đăng xuất bạn khi bạn rời đi, đảm bảo công việc của bạn luôn ở chế độ riêng tư. Và bạn cũng sẽ có thể nói chuyện với trợ lý ảo Alexa, để hỗ trợ công việc.', 'Hoàn thành công việc nhanh chóng với Lenovo Yoga Slim 7 Pro 14IHU5 (82NH009PVN). Có sự kết hợp hoàn hảo của nền tảng Intel ® Evo ™ giữa khả năng đáp ứng. Tuổi thọ pin lâu dài và hình ảnh tuyệt đẹp. Hiệu suất được tối ưu hóa bằng AI thích ứng với nhu cầu của bạn và kết nối tốt nhất. Trong phân khúc, kết hợp với thời lượng pin đáng kinh ngạc để đảm bảo.', '16GB Soldered LPDDR4x-4266', 'Intel Core i7 11370H', 'Intel® Iris® Xe', '14″ (16:10) 2.8K (2880 x 1800) OLED, 400 nits, 100% sRGB, Dolby Vision™, 243ppi, glass only, 91% AAR', '512GB SSD NVMe M.2 PCIe', NULL, 'Windows 11 SL 64 Bit', '4Cell, 61WHrs', NULL, NULL, NULL, NULL, 'Backlit Keyboard', '14IHU5 (82NH009PVN)', '2 x 2 AX WiFi 6 – Bluetooth® 5.0', 1.45, '312.4 x 221.4 x 14.6-16.9 mm', 'Đen', 'Hợp kim nhôm', 12, 1, 1, '2022-06-06 14:22:54', '2022-06-06 14:22:54'),
(9, 'Laptop Lenovo Legion 5 15ACH6 (82JW00JPVN) Geforce GTX 1650 4GB AMD Ryzen 5 5600H 8GB 256GB 15.6″ 165Hz IPS 100%sRGB Win 11 Xanh', 20690000, 15, 'https://xgear.net/wp-content/uploads/2022/06/82JW00JPVN-1-600x600-1.jpg', 'Lenovo Legion 5 15ACH6 (82JW00JPVN) kết hợp khả năng xử lý AMD R5 5600H và GTX 16 series sẵn sàng cho mọi cuộc chiến. Laptop gaming sở hữu 165Hz siêu mượt. Kết hợp với âm thanh Nahimic 3D xác định chính xác bước chân trong không gian. Nghe và đưa mục tiêu vào trong tầm bắn. Lenovo Legion 5 15ACH6 (82JW00JPVN) kết hợp khả năng xử lý AMD R5 5600H và GTX 16 series sẵn sàng cho mọi cuộc chiến. Laptop gaming sở hữu 165Hz siêu mượt. Kết hợp với âm thanh Nahimic 3D xác định chính xác bước chân trong không gian. Nghe và đưa mục tiêu vào trong tầm bắn. Trải nghiệm hiệu suất tối ưu GeForce GTX ™ 16 Series dành cho game thủ và người sáng tạo. Được tăng cường với các lõi theo dõi tia, bộ xử lý đa xử lý trực tuyến và sức mạnh của AI để có hình ảnh chân thực nhất. Chơi hơn 100 trò chơi PC chất lượng cao với mức giá thấp hàng tháng. EA Play được bao gồm và cung cấp cho bạn nhiều trò chơi bạn yêu thích hơn. Với quyền truy cập vào các tựa game EA hàng đầu trên PC. Nhiều phần thưởng hơn và nhiều nội dung độc quyền hơn! Sử dụng ứng dụng Xbox trên PC để tải xuống và chơi các trò chơi mới như Halo Infinite. Với các trò chơi được thêm vào mọi lúc, bạn sẽ luôn có thứ gì đó mới để chơi. Được xây dựng trên di sản thế hệ của tốc độ xung nhịp tối đa trong nhiều giờ chơi game mà không cần điều chỉnh, Legion 5 Coldfront 3.0 nâng cao hiệu suất nhiệt hạng nhất. Nó triển khai một hệ thống hút khí thông minh, thiết kế quạt kép tăng áp, lỗ thông hơi hút nhiệt bên dưới công tắc bàn phím và hệ thống ống xả bốn kênh. Thực hiện một bước nhảy vọt mang tính cách mạng trong trò chơi của bạn với Lenovo Legion AI Engine. Một hệ thống các giải pháp AI mang lại tốc độ khung hình cao nhất trên các trò chơi AAA hàng đầu hiện nay. Cho dù bạn thích tần số quét cao hay hình ảnh siêu thực, Legion 5 (15 “AMD) đều đáp ứng cho bạn. Hãy đắm chìm sâu hơn với màn hình rộng 15” FHD 16: 9, được thiết kế cho đồ họa pháo hoa lên đến Dolby Vision ™ và độ chính xác màu 100% sRGB, hoặc nâng cao lợi thế cạnh tranh của bạn với tốc độ làm mới nhanh chóng lên đến 165Hz với thời gian phản hồi 3ms thông qua hỗ trợ Overdrive. Nahimic cải thiện đáng kể trải nghiệm chơi game của bạn. Âm thanh 3D sống động và các tính năng hấp dẫn dành cho game thủ. Xây dựng lợi thế cạnh tranh với trình theo dõi âm thanh. Trải nghiệm giao tiếp rõ ràng với đồng đội. Nahimic là một cách chơi mới và Game thủ Legion có thể độc quyền thưởng thức. Một giải pháp âm thanh sáng tạo biến bất kỳ loa Bluetooth nào thành hệ thống âm thanh vòm.\r\n\r\n', 'Lenovo Legion 5 15ACH6 (82JW00JPVN) kết hợp khả năng xử lý AMD R5 5600H và GTX 16 series sẵn sàng cho mọi cuộc chiến. Laptop gaming sở hữu 165Hz siêu mượt. Kết hợp với âm thanh Nahimic 3D xác định chính xác bước chân trong không gian. Nghe và đưa mục tiêu vào trong tầm bắn.', 'DDR4 8GB (1 x 8GB) 3200MHz; 2 slots, up to 32GB', 'AMD Ryzen 5 5600H', 'Geforce GTX 1650 4GB', '15.6\" FHD (1920×1080) IPS 300nits Anti-glare, 165Hz, 100% sRGB, Dolby Vision, Free-Sync, G-Sync, DC dimmer', '1 slot SSD NVMe M.2 PCIe, 256GB SSD NVMe M.2 PCIe Gen 3 x 4', '1x power connector\r\n1x USB-C 3.2 Gen 2 \r\n1x Ethernet (RJ-45)\r\n1x USB-C 3.2 Gen 2 \r\n1x headphone / microphone combo jack (3.5mm)\r\n1x HDMI 2.1\r\n4x USB 3.2 Gen 1 (one Always On)', 'Windows 11 SL 64 Bit', '4Cell, 80WHrs', NULL, NULL, NULL, NULL, 'White Backlit', '15ACH6 (82JW00JPVN)', '11ax, 2×2 + BT5.1', 2.4, '362.56 x 260.61 x 22.5-25.75 mm (14.27 x 10.26 x 0.89-1.01 inches)', 'Đen', 'Nhôm', 12, 1, 3, '2022-06-06 14:28:56', '2022-06-06 14:28:56'),
(10, 'Laptop Lenovo Legion 5 Pro 16ITH6H (82JD00BCVN) Geforce RTX 3060 6GB Intel i7 11800H 16GB 512GB 16″ WQXGA 165Hz IPS Truestrike Win 11 Trắng', 39490000, 14, 'https://product.hstatic.net/1000233206/product/lenovo-legion-5-pro-16ith6h-_82jd00bcvn__9d60c00a6d994542ad7374125b333ad8_master.png', 'Lenovo Legion 5 Pro 16ITH6H (82JD00BCVN) được thiết kế để trở thành ông vua trên đấu trường. Kết hợp khả năng xử lý CPU Intel 11th và RTX 3000 để mang lại trải nghiệm chơi game độ phân giải cao. Laptop gaming QHD 16 ” 165Hz đầu tiên trên thế giới. Kết hợp với âm thanh Nahimic 3D xác định chính xác bước chân trong không gian. Nghe và đưa mục tiêu vào trong tầm bắn. Với CPU intel i7 11800H, bạn có thể tận hưởng hiệu suất chơi game tốt nhất trên một máy tính xách tay mỏng nhẹ. Thời lượng pin cũng tăng lên đáng kinh ngạc. Thoải mái chiến game dù là bất cứ đâu. Trải nghiệm hiệu suất tối ưu GeForce RTX ™ 30 Series mới nhất dành cho game thủ và người sáng tạo. Được tăng cường với các lõi theo dõi tia, bộ xử lý đa xử lý trực tuyến và sức mạnh của AI để có hình ảnh chân thực nhất. Chơi hơn 100 trò chơi PC chất lượng cao với mức giá thấp hàng tháng. EA Play được bao gồm và cung cấp cho bạn nhiều trò chơi bạn yêu thích hơn. Với quyền truy cập vào các tựa game EA hàng đầu trên PC. Nhiều phần thưởng hơn và nhiều nội dung độc quyền hơn! Sử dụng ứng dụng Xbox trên PC để tải xuống và chơi các trò chơi mới như Halo Infinite. Với các trò chơi được thêm vào mọi lúc, bạn sẽ luôn có thứ gì đó mới để chơi. Nâng tầm chơi game FHD lên một tầm cao mới về hình ảnh vượt trội với màn hình chơi game QHD 16 “đầu tiên trên thế giới, hỗ trợ NVIDIA G-Sync và AMD FreeSync. Nó tự hào có mật độ điểm ảnh tăng 34%, hỗ trợ Dolby Vision ™, VESA DisplayHDR ™ 400 và 100 Độ chính xác màu% sRGB với độ sáng tối đa hơn 500 nits. Đảm bảo bạn luôn dẫn đầu với công nghệ tăng tốc, cung cấp tốc độ làm mới lên đến 165Hz và thời gian phản hồi 3ms. Được xây dựng trên di sản thế hệ của tốc độ xung nhịp tối đa trong nhiều giờ chơi game mà không cần điều chỉnh, Legion 5 Pro’s Legion Coldfront 3.0 nâng cao hiệu suất nhiệt hạng nhất. Nó triển khai một hệ thống hút khí thông minh, thiết kế quạt kép tăng áp, lỗ thông hơi hút nhiệt bên dưới công tắc bàn phím và hệ thống ống xả bốn kênh. Tản nhiệt kết hợp với một chế độ thông minh mới để AI tối ưu hóa các tựa game eSports khắt khe nhất cho hiệu suất thế hệ tiếp theo — mà tốc độ khung hình không bị giảm hoặc giật hình ở độ phân giải QHD. Bạn thậm chí có thể kiểm soát tốc độ và điện áp của quạt với Q Control 4.0 cho dòng chảy hết ga đó hoặc để kéo dài tuổi thọ pin. Thực hiện một bước nhảy vọt mang tính cách mạng trong trò chơi của bạn với Lenovo Legion AI Engine. Một hệ thống các giải pháp AI mang lại tốc độ khung hình cao nhất trên các trò chơi AAA hàng đầu hiện nay. Bàn phím Legion TrueStrike được cải tiến mang đến trải nghiệm phím sâu hơn thoải mái hơn. Điều này cho phép bạn tấn công kẻ thù với độ chính xác cực cao. Tốc độ nhanh như chớp. Bố cục bàn phím cao cấp và led RGB 4 vùng tùy chọn (chỉ một số kiểu máy). Nahimic cải thiện đáng kể trải nghiệm chơi game của bạn. Âm thanh 3D sống động và các tính năng hấp dẫn dành cho game thủ. Xây dựng lợi thế cạnh tranh với trình theo dõi âm thanh. Trải nghiệm giao tiếp rõ ràng với đồng đội. Nahimic là một cách chơi mới và Game thủ Legion có thể độc quyền thưởng thức. Một giải pháp âm thanh sáng tạo biến bất kỳ loa Bluetooth nào thành hệ thống âm thanh vòm.\r\n\r\n', 'Lenovo Legion 5 Pro 16ITH6H (82JD00BCVN) được thiết kế để trở thành ông vua trên đấu trường. Kết hợp khả năng xử lý CPU Intel 11th và RTX 3000 để mang lại trải nghiệm chơi game độ phân giải cao. Laptop gaming QHD 16 ” 165Hz đầu tiên trên thế giới. Kết hợp với âm thanh Nahimic 3D xác định chính xác bước chân trong không gian. Nghe và đưa mục tiêu vào trong tầm bắn.', 'DDR4 16GB (2 x 8GB) 3200MHz; 2 slots, up to 32GB', 'Intel Core i7 11800H', 'Geforce RTX 3060 6GB', '16\" WQXGA (2560×1600) IPS 500nits Anti-glare, 165Hz, 100% sRGB, Dolby Vision, HDR 400, Free-Sync, G-Sync, DC dimmer', '1 slot SSD NVMe M.2 PCIe, 512GB SSD NVMe M.2 PCIe Gen 4 x 4', '4 x USB 3.0; 1 x USB 3.1 Type C (Gen2) with Thunderbolt; 1 x Headphone-out & Audio-in Combo Jack; 1 x RJ45 LAN Jack for LAN insert; 1 x HDMI 1 x mini Display Port', 'Windows 11 SL 64 Bit', '80Whrs', NULL, NULL, NULL, NULL, 'Blue Backlight Keyboard', '16ITH6H (82JD00BCVN)', 'Intel Wi-Fi 6 AX201(2*2 ax) + BT5', 2.45, '356 x 260.4-264.4 x 21.7-26.85 mm', NULL, NULL, 12, 1, 3, '2022-06-06 14:36:17', '2022-06-06 14:36:17'),
(11, 'Laptop Acer Nitro 5 Eagle AN515-57-71VV Geforce RTX 3050 4GB Intel Core i7 11800H 8GB 512GB 15.6″ 144Hz IPS RGB Win 11\r\n', 22790000, 15, 'https://thenewxgear.com/wp-content/uploads/2021/07/Nitro-5-Eagle-7-600x600.jpg', 'Acer Nitro 5 Eagle AN515-57-71VV tích hợp những “vũ khí” mới nhất. Bao gồm CPU i7 11800H, VGA RTX 3050 cho hiệu năng xử lý mạnh mẽ. Acer Nitro 5 Eagle AN515-57-71VV sở hữu thiết kế ấn tượng với hai màu đen-đỏ chủ đạo. Bề mặt được thiết kế hầm hố và góc cạnh hơn. Thể hiện phong cách hiếu chiến đặc trưng của dòng Nitro. Viền màn hình siêu mỏng 6.3mm cho cảm giác không gian thoáng đãng hơn trước. Với Acer Nitro 5 Eagle AN515-57-71VV trải nghiệm chơi game phấn khích hơn nhờ vào đèn nền bàn phím RGB 4 vùng. Giờ đây, game thủ có thể tùy chỉnh các thiết lập màu sắc và hiệu ứng dễ dàng ngay trên phần mềm Nitro Sense được tích hợp sẵn. Hệ thống tản nhiệt gồm 2 quạt tản nhiệt thế hệ mới kết hợp công nghệ Acer CoolBoost™ giúp tăng 10% tốc độ quạt. Giảm nhiệt độ CPU/GPU thêm 9%. Phần mềm Nitro Sense chủ động theo dõi nhiệt độ, điều chỉnh tốc độ quạt. So với phiên bản trước khả năng tản nhiệt tốt hơn 25%. Thiết kế tản nhiệt mới với 4 khe hút gió/thoát nhiệt thông minh. Nitro Sense là phần mềm được tích hợp độc quyền trên Nitro 5 có khả năng bật CoolBoost với điều chỉnh ba chế độ tăng tốc quạt và giúp máy giảm nhiệt độ ngay lập tức. Phím nóng ngay trên bàn phím giúp truy cập nhanh Nitro Sense chỉ bằng một nút chạm. Game thủ đã có thể theo dõi nhiệt độ và tốc độ quạt ngay lập tức và đồng thời có thể điều chỉnh màu bàn phím RGB. Wifi 6 mới nhất và Killer™ Ethernet E2600 giúp ổn định đường truyền internet trong suốt quá trình chiến game. Nitro 5 cũng bao gồm các cổng kết nối cao cấp khác. Cổng nguồn nay đã được bố trí ở đằng sau máy mang lại sự tiện lợi và gọn gàng trong suốt quá trình sử dụng. Phần mềm âm thanh DTS:X® Ultra tái tạo âm thanh 3D và Acer True Harmony với 6 chế độ tùy chỉnh âm thanh. Định lượng âm thanh chuẩn xác trong mọi cuộc chơi. Duy nhất tại Việt Nam, những dòng sản phẩm gaming cao cấp như Nitro 5 sẽ được kiểm tra, bảo hành và gửi lại khách chỉ trong thời gian ngắn: 03 ngày (72 giờ) bao gồm cả thứ 7, Chủ nhật. Đặc biệt hơn nữa, khách hàng sẽ được nhận sản phẩm mới cùng loại hoặc tương đương (1 đổi 1) cho các trường hợp không hoàn thành bảo hành trong 03 ngày tính từ lúc nhận sản phẩm.\r\n\r\n', 'Acer Nitro 5 Eagle AN515-57-71VV tích hợp những “vũ khí” mới nhất. Bao gồm CPU i7 11800H, VGA RTX 3050 cho hiệu năng xử lý mạnh mẽ.', 'DDR4 8GB (1 x 8GB) 3200MHz; 2 slots, up to 32GB', 'Intel Core i7 11800H', 'Geforce RTX 3050 4GB', '15.6\" FullHD (1920 x 1080). 144Hz, IPS Panel', '512GB SSD NVMe M.2 PCIe Gen 3 x 2', '1 x 3.5mm Audio Jack, 1 x HDMI, 1 x RJ45 for LAN Gigabit Ethernet, 1 x USB 3.1 Type-C, 3x USB 3.2 Gen 1 Type-A', 'Windows 11 64 Bit', '4 Cell, 48 Whr\r\n\r\n', NULL, NULL, NULL, NULL, 'Backlight Keyboard Multicolor', 'Eagle AN515-57-71VV', 'Intel Wi-Fi 6 AX201(2*2 ax) + BT5', 2.45, NULL, 'Đen', 'Nhôm', 12, 1, 3, '2022-06-06 14:42:05', '2022-06-06 14:42:05'),
(12, 'Laptop Acer Nitro 5 AN515-57-71H1 Geforce RTX 3060 6GB Intel i7 11800H 16GB 512GB 15.6″ 144Hz IPS RGB Win 11', 31290000, 8, 'https://xgear.net/wp-content/uploads/2022/05/5669-4-600x600-1.jpg', 'Acer Nitro 5 Eagle AN515-57-71H1 tích hợp những “vũ khí” mới nhất. Bao gồm CPU i7 11800H, VGA RTX 3060 cho hiệu năng xử lý mạnh mẽ. Acer Nitro 5 Eagle AN515-57-71H1 sở hữu thiết kế ấn tượng với hai màu đen-đỏ chủ đạo. Bề mặt được thiết kế hầm hố và góc cạnh hơn. Thể hiện phong cách hiếu chiến đặc trưng của dòng Nitro. Viền màn hình siêu mỏng 6.3mm cho cảm giác không gian thoáng đãng hơn trước. Với Acer Nitro 5 Eagle AN515-57-71H1 trải nghiệm chơi game phấn khích hơn nhờ vào đèn nền bàn phím RGB 4 vùng. Giờ đây, game thủ có thể tùy chỉnh các thiết lập màu sắc và hiệu ứng dễ dàng ngay trên phần mềm Nitro Sense được tích hợp sẵn. Hệ thống tản nhiệt gồm 2 quạt tản nhiệt thế hệ mới kết hợp công nghệ Acer CoolBoost™ giúp tăng 10% tốc độ quạt. Giảm nhiệt độ CPU/GPU thêm 9%. Phần mềm Nitro Sense chủ động theo dõi nhiệt độ, điều chỉnh tốc độ quạt. So với phiên bản trước khả năng tản nhiệt tốt hơn 25%. Thiết kế tản nhiệt mới với 4 khe hút gió/thoát nhiệt thông minh. Nitro Sense là phần mềm được tích hợp độc quyền trên Nitro 5 có khả năng bật CoolBoost với điều chỉnh ba chế độ tăng tốc quạt và giúp máy giảm nhiệt độ ngay lập tức. Phím nóng ngay trên bàn phím giúp truy cập nhanh Nitro Sense chỉ bằng một nút chạm. Game thủ đã có thể theo dõi nhiệt độ và tốc độ quạt ngay lập tức và đồng thời có thể điều chỉnh màu bàn phím RGB.', 'Acer Nitro 5 Eagle AN515-57-71H1 tích hợp những “vũ khí” mới nhất. Bao gồm CPU i7 11800H, VGA RTX 3060 cho hiệu năng xử lý mạnh mẽ.', 'DDR4 16GB (2 x 8GB) 3200MHz; 2 slots, up to 32GB', 'Intel Core i7 11800H', 'Geforce RTX 3060 6GB', '15.6\" FullHD (1920 x 1080). 144Hz, IPS Panel', '512GB SSD NVMe M.2 PCIe Gen 3 x 4', '1 x 3.5mm Audio Jack, 1 x HDMI, 1 x RJ45 for LAN Gigabit Ethernet, 1x Type-C USB3.1 Gen2, 3x USB 3.2 Gen 1 Type-A', 'Windows 11 SL 64 Bit', '4 Cells, 57WHrs', NULL, NULL, NULL, NULL, 'RGB (4-Zone) Keyboard', 'AN515-57-71H1', 'Intel Wi-Fi 6 AX201(2*2 ax) + BT5', 2.2, NULL, 'Đen', 'Nhôm', 12, 1, 3, '2022-06-06 14:47:15', '2022-06-06 14:47:15'),
(13, 'Laptop Dell Inspiron 15 3511 (P112F001ABL) Intel Core i3 1115G4 256GB 4GB 15.6 FHD Office Win 10 Black', 15290000, 17, 'https://thenewxgear.com/wp-content/uploads/2021/10/56760_inspiron3505__4_.jpg', 'Dell Inspiron 3501 trang bị chip Intel Core i3 1115G4 đến từ thế hệ 11 Tiger Lake tiên tiến. khả năng phản hồi ổn định, tiết kiệm điện năng, giúp bạn sử dụng mượt mà các tác vụ văn phòng với xung nhịp trung bình 2.40 GHz và chạy mượt các ứng dụng đồ họa 2D với xung nhịp lên đến 4.1 GHz. Khi được ép xung nhờ Turbo Boost. RAM 4 GB cho máy có khả năng đa nhiệm tốt, chuyển đổi qua lại các ứng dụng đang mở dễ dàng, liền mạch với tốc độ Bus RAM 3200 MHz. Ổ cứng SSD 256 GB M.2 PCle cho máy có tốc độ truy xuất file, ứng dụng. Khởi động máy nhanh chóng, đồng thời cho không gian lưu trữ dữ liệu lớn, bảo vệ các tệp tin, thư mục quan trọng trong máy mà không phải lo lắng. Dell Inspiron có thiết kế đậm chất máy Dell với toàn thân đều được làm từ màu đen tuyền đơn giản nhưng sang trọng. Không bị lỗi thời. Chiếc laptop có độ dày 19.9 mm và trọng lượng 1.96 kg khá gọn nhẹ, cầm chắc tay. Thuận tiện mang theo trong ba lô trong quá trình di chuyển. Máy có hành trình bàn phím tốt, độ nảy ổn, thuận tiện cho các bạn có nhu cầu soạn thảo văn bản. HD Webcam được tích hợp cũng giúp cho việc làm việc, học tập trực tuyến hiện nay thêm hiệu quả. Thêm một điều đặt biệt nữa là bàn phím số được thiết kế như một chiếc máy tính cầm tay. Bạn có thể bật nhanh máy tính cầm tay bằng phím tắt trên bàn phím cực thuận tiện cho những ai làm công việc liên quan đến những con số. Dell trang bị laptop này đầy đủ các cổng kết nối phổ biến: USB 3.2, HDMI, LAN (RJ45). USB 2.0 và khe đọc thẻ nhớ SD rất cần thiết cho việc học để trình chiếu hay công việc văn phòng.', 'Dell Inspiron 3501 trang bị chip Intel Core i3 1115G4 đến từ thế hệ 11 Tiger Lake tiên tiến. khả năng phản hồi ổn định, tiết kiệm điện năng, giúp bạn sử dụng mượt mà các tác vụ văn phòng với xung nhịp trung bình 2.40 GHz và chạy mượt các ứng dụng đồ họa 2D với xung nhịp lên đến 4.1 GHz. Khi được ép xung nhờ Turbo Boost. RAM 4 GB cho máy có khả năng đa nhiệm tốt, chuyển đổi qua lại các ứng dụng đang mở dễ dàng, liền mạch với tốc độ Bus RAM 3200 MHz.', 'DDR4 4GB 2666MHz', 'Intel Core i3 1115G4', NULL, '15.6\" FHD (1920 x 1080) Anti-glare LED Backlight Non-Touch Narrow Border WVA Display', '256GB', '1 USB 2.0\r\n1Audio jack\r\n1 HDMI 1.4\r\n2 USB 3.2', 'Win 10 SL 64 Bit + Office HS 2019', '3-Cell, 41 WHr', NULL, NULL, NULL, NULL, 'Non-Backlit Keyboard', '3511 (P112F001ABL)', '802.11ac 1×1 WiFi and Bluetooth', 1.73, '19 x 358.50 x 235.56 (mm)', 'Đen', 'Nhựa', 12, 1, 1, '2022-06-06 15:04:28', '2022-06-06 15:04:28'),
(14, 'Laptop Dell Alienware M15 Ryzen Edition R5 (70262921) Geforce RTX 3070 8GB AMD Ryzen 9 5900HX 1TB 16GB 15.6″ FHD 165Hz 4-zone AlienFX Office Win 10', 54990000, 10, 'https://thenewxgear.com/wp-content/uploads/2021/10/Dell.jpg', 'Alienware M15 Ryzen Edition R5 (70262921) sở hữu tần số quét lên đến 165Hz. Hiển thị mượt mà đáng kinh ngạc. Công nghệ làm mát Alienware Cryo-Tech™ làm mát hiệu qủa nhưng vẫn duy trì công suất. Sự kết hợp giữa bộ xử lý AMD® Ryzen với đồ họa NVIDIA® GeForce RTX ™ 30-series sẵn sàng để đưa mọi trải nghiệm chơi game lên một tầm cao mới. Alienware m15 Ryzen Edition R5 được thiết kế để mang đến sự đa dạng trong nhu cầu sử dụng. Dù nhu cầu là gì chúng tôi sẽ làm tốt hơn. m15 R5 mới nhất đạt tiêu chuẩn với tốc độ làm mới ấn tượng là 165Hz. Độ phân giải FHD với khả năng giảm ánh sáng xanh giúp bạn đắm chìm trong trò chơi mà không làm giảm chất lượng hình ảnh. Đối với chúng tôi, thiết kế không chỉ là cơ khí, mà còn là nghệ thuật. Công nghệ làm mát Alienware Cryo-Tech ™ duy trì sự ổn định của hệ thống ngay cả trong những khoảnh khắc chơi game căng thẳng nhất.\r\n\r\nM15 mới mang bốn ống dẫn nhiệt 3mm bằng đồng độc lập. Cung cấp khả năng tản nhiệt trên các thành phần cốt lõi CPU, GPU.\r\n\r\nNgười chơi có thể điều chỉnh cài đặt quạt trong phần mềm Alienware Command Center. Tùy theo việc ưu tiên hiệu suất hoặc thời lượng pin với các tùy chọn khác nhau.\r\n\r\nKhung gầm m15 R5 mới ưu tiên hiệu suất với thiết kế quạt kép hút không khí mát vào từ lỗ thông hơi trên và dưới. Đồng thời xả khí ra các lỗ thông hơi bên trái, bên phải và phía sau để làm mát tối ưu các thành phần cốt lõi.\r\n\r\nBộ vỏ được thiết kế chắc chắn và rất dễ bảo quản. Có hai màu để phù hợp với phong cách sống của bạn: Xám hoặc Bạc.\r\n\r\n\r\n\r\n', 'Alienware M15 Ryzen Edition R5 (70262921) sở hữu tần số quét lên đến 165Hz. Hiển thị mượt mà đáng kinh ngạc. Công nghệ làm mát Alienware Cryo-Tech™ làm mát hiệu qủa nhưng vẫn duy trì công suất. Sự kết hợp giữa bộ xử lý AMD® Ryzen với đồ họa NVIDIA® GeForce RTX ™ 30-series sẵn sàng để đưa mọi trải nghiệm chơi game lên một tầm cao mới.\r\n\r\n', 'DDR4 16GB (2 x 8GB) 3200MHz; 2 slots, up to 64GB', 'AMD Ryzen 9 5900HX', 'Geforce RTX 3070 8GB', '15.6\" FHD (1920 x 1080) 165Hz 3ms with ComfortView Plus', '1TB PCIe M.2 SSD', '2 SuperSpeed USB 3.2 Gen 1 Type A ports\r\n1 SuperSpeed USB 3.2 Gen 2 Type C port\r\n1 SuperSpeed USB 3.2 Gen 1 Type A port\r\n1 HDMI 2.1 Output\r\n1 Power DC In C port\r\n1 2.5Gbps rated RJ-45 Ethernet port\r\n1 Global Headset jack', 'Windows 10 SL 64 Bit + Office 2019', '6 Cells, 86WHrs', NULL, NULL, NULL, NULL, 'Alienware mSeries 4-Zone AlienFX RGB keyboard', 'Edition R5 (70262921)', 'Killer™ Wi-Fi 6 AX1650 (2×2) 802.11ax Wireless and Bluetooth', 2.69, '356.2 x 272.5 x 22.85 mm', 'Đen', 'Nhôm', 12, 1, 3, '2022-06-06 15:10:26', '2022-06-06 15:10:26'),
(15, 'Laptop Dell G15 5511 (P105F006AGR) Geforce RTX 3050 4GB Intel Core i7 11800H 512GB 8GB 15.6″ FHD 120Hz Office Win Dark Shadow Grey', 31290000, 12, 'https://phucanhcdn.com/media/product/45573_dell_gaming_5511_dark_grey_ha4.jpg', 'Trải nghiệm hiệu suất mạnh mẽ Dell G15 5511 (P105F006AGR) dù chơi game hay phát trực tuyến nhờ Intel Core i7 11800H. Hệ thống tản nhiệt sử dụng đường ống đồng được kéo qua đầu bàn phím. Thoát nhiệt qua bốn lỗ thoát khí lớn. VGA NVIDIA ® GeForce RTX ™ 3050 được hỗ trợ bởi kiến trúc NVIDIA ® Ampere – kiến trúc RTX thế hệ thứ 2 của NVIDIA ® — với RT Cores mới, Tensor Cores và các bộ xử lý đa luồng trực tuyến cho đồ họa theo dõi tia trung thực và các tính năng AI tiên tiến. Độ phân giải FHD đảm bảo chơi game mượt mà và chi tiết. Tần số quét 120Hz tiêu chuẩn với độ sáng 250 nit. Bộ vỏ được thiết kế chắc chắn và rất dễ bảo quản. Có hai màu để phù hợp với phong cách sống của bạn: Xám hoặc Bạc. Alienware Command Center sẽ cải thiện trải nghiệm chơi trò chơi của bạn. Tinh chỉnh tất cả cài đặt trò chơi và hệ thống. Bạn có quyền kiểm soát cả phần cứng và phần mềm.\r\n\r\n', 'Trải nghiệm hiệu suất mạnh mẽ Dell G15 5511 (P105F006AGR) dù chơi game hay phát trực tuyến nhờ Intel Core i7 11800H. Hệ thống tản nhiệt sử dụng đường ống đồng được kéo qua đầu bàn phím. Thoát nhiệt qua bốn lỗ thoát khí lớn.', 'DDR4 8GB (1 x 8GB) 3200MHz; 2 slots, up to 32GB', 'Intel Core i7 11800H', 'Geforce RTX 3050 4GB', '15.6\" FHD (1920×1080) IPS 120Hz', '512GB SSD NVMe M.2 PCIe Gen 3 x 4', '1. USB 2.0, 2. USB 2.0 với PowerShare, 3. USB Type-C ®, 4. SuperSpeed ​​USB 3.2, 5. HDMI, 6. Điện vào, 7. RJ45 Ethernet, 8. Tai nghe / Micrô', 'Windows 11 SL 64 Bit', '4 Cells, 56WHrs', NULL, NULL, NULL, NULL, 'Backlight Keyboard\r\n\r\n', 'G15 5511 (P105F006AGR)', '802.11ax 2×2 Wi-Fi + BT5', 2.5, '357,3 x 272,8 x 26,9 mm', 'Bạc', 'Nhôm', 12, 1, 3, '2022-06-06 15:15:08', '2022-06-06 15:15:08'),
(16, 'Laptop Gaming Acer Aspire 7 A715-42G-R4XX GTX 1650 4GB Ryzen 5 5500U 8GB 256GB 15.6 FHD IPS Win 11', 19990000, 13, 'https://thenewxgear.com/wp-content/uploads/2021/11/R4XX-1-900x900.jpg', 'Acer Aspire 7 A715-42G-R4XX tích hợp Card đồ họa NVIDIA GTX1650 4GB GDDR6 ra mắt năm 2020, là laptop chơi game tốt nhất phân khúc. Không chỉ vậy, phiên bản này còn mang thiết kế mới gọn gàng và sexy hơn. Aspire 7 được trang bị hệ thống tản nhiệt mạnh mẽ bậc nhất trong phân khúc, thừa hưởng công nghệ từ các dòng máy cao cấp hơn của Acer, cùng cấu hình đỉnh cao, giúp cho người dùng có thể vừa chơi game vừa làm việc ở bất cứ lúc nào. Acer Aspire 7 A715-42G-R4XX tích hợp Card đồ họa NVIDIA GTX1650 4GB GDDR6 ra mắt năm 2020, là laptop chơi game tốt nhất phân khúc. Không chỉ vậy, phiên bản này còn mang thiết kế mới gọn gàng và sexy hơn. Aspire 7 được trang bị hệ thống tản nhiệt mạnh mẽ bậc nhất trong phân khúc, thừa hưởng công nghệ từ các dòng máy cao cấp hơn của Acer, cùng cấu hình đỉnh cao, giúp cho người dùng có thể vừa chơi game vừa làm việc ở bất cứ lúc nào. 3S1 là chính sách bảo hành nhanh của Acer dành cho game thủ. Aspire 7 A715-41G-R4XX được hưởng Bảo hành 3S1 siêu nhanh: bảo hành nhanh, trong vòng 3 ngày kể cả thứ 7 và chủ nhật, quá 3 ngày 1 đổi 1 sản phẩm mới có giá trị tương đương hoặc cao hơn. Bộ nhớ nâng cấp lên đến 1TB SSD PCIe NVMe. Hai khe RAM max DDR4 32GB.', 'Acer Aspire 7 A715-42G-R4XX tích hợp Card đồ họa NVIDIA GTX1650 4GB GDDR6 ra mắt năm 2020, là laptop chơi game tốt nhất phân khúc. Không chỉ vậy, phiên bản này còn mang thiết kế mới gọn gàng và sexy hơn. Aspire 7 được trang bị hệ thống tản nhiệt mạnh mẽ bậc nhất trong phân khúc, thừa hưởng công nghệ từ các dòng máy cao cấp hơn của Acer, cùng cấu hình đỉnh cao, giúp cho người dùng có thể vừa chơi game vừa làm việc ở bất cứ lúc nào.', 'DDR4 8GB (2 x 4GB) 3200MHz; 2 slots, up to 32GB', 'AMD Ryzen 5 5500U', 'Geforce GTX 1650 4GB', '15.6\" FHD (1920×1080), IPS', '256GB SSD NVMe M.2 PCIe Gen 3 x 4', '2x USB 2.0; 1x USB 3.0; 1x USB 3.1 Type C; 1x HDMI', 'Windows 11 SL 64 Bit', '2x USB 2.0; 1x USB 3.0; 1x USB 3.1 Type C; 1x HDMI', NULL, NULL, NULL, NULL, 'Backlight Keyboard', 'A715-42G-R4XX', '802.11ac 2×2 Wi-Fi', 2.1, NULL, 'Đen', 'Nhôm', 12, 1, 2, '2022-06-06 15:24:16', '2022-06-06 15:24:16'),
(17, 'Chuột Razer DeathAdder Essential', 690000, 14, 'https://thenewxgear.com/wp-content/uploads/2021/07/DA_Essential_1_compressed-1.jpg', 'Razer DeathAdder Essential vẫn giữ được các thiết kế cổ điển, đó là một dấu hiệu của các thế hệ Razer DeathAdder trước đây. Thiết kế đẹp mắt và khác biệt của nó nhằm tạo ra sự thoải mái, cho phép người chơi duy trì mức hiệu suất cao trong suốt thời gian chơi game dài, vì vậy bạn sẽ không bao giờ bị ngập ngừng trong các trận chiến nóng bỏng. 5 nút Hyperesponse có thể lập trình được, cung cấp cho người chơi có được lợi thế cạnh tranh khi điều khiển trận đấu. Nút cơ học công nghệ Razer™ Mechanical với độ tin cậy cao cùng với độ bền cao lên đến 10 triệu lần nhấp. Cảm biến quang 6.400 DPI cho phép vuốt chuột đi nhanh và chuẩn xác, cung cấp khả năng kiểm soát tốt hơn cho game thủ với những nhu cầu thiết yếu nhất.', 'Razer DeathAdder Essential vẫn giữ được các thiết kế cổ điển, đó là một dấu hiệu của các thế hệ Razer DeathAdder trước đây. Thiết kế đẹp mắt và khác biệt của nó nhằm tạo ra sự thoải mái, cho phép người chơi duy trì mức hiệu suất cao trong suốt thời gian chơi game dài, vì vậy bạn sẽ không bao giờ bị ngập ngừng trong các trận chiến nóng bỏng.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 640, 220, 30, 50000000, NULL, NULL, NULL, 0.096, '127 x 73 x 43 (mm)', NULL, NULL, 12, 1, 4, '2022-06-06 15:30:00', '2022-06-06 15:30:00'),
(18, 'Chuột Razer DeathAdder Essential White', 690000, 20, 'https://thenewxgear.com/wp-content/uploads/2021/09/chuot-gaming-razer-deathadder-essential-7-900x900.webp', 'Razer DeathAdder Essential vẫn giữ được các thiết kế cổ điển, đó là một dấu hiệu của các thế hệ Razer DeathAdder trước đây. Thiết kế đẹp mắt và khác biệt của nó nhằm tạo ra sự thoải mái, cho phép người chơi duy trì mức hiệu suất cao trong suốt thời gian chơi game dài, vì vậy bạn sẽ không bao giờ bị ngập ngừng trong các trận chiến nóng bỏng. 5 nút Hyperesponse có thể lập trình được, cung cấp cho người chơi có được lợi thế cạnh tranh khi điều khiển trận đấu. Nút cơ học công nghệ Razer™ Mechanical với độ tin cậy cao cùng với độ bền cao lên đến 10 triệu lần nhấp. Cảm biến quang 6.400 DPI cho phép vuốt chuột đi nhanh và chuẩn xác, cung cấp khả năng kiểm soát tốt hơn cho game thủ với những nhu cầu thiết yếu nhất.', 'Razer DeathAdder Essential vẫn giữ được các thiết kế cổ điển, đó là một dấu hiệu của các thế hệ Razer DeathAdder trước đây. Thiết kế đẹp mắt và khác biệt của nó nhằm tạo ra sự thoải mái, cho phép người chơi duy trì mức hiệu suất cao trong suốt thời gian chơi game dài, vì vậy bạn sẽ không bao giờ bị ngập ngừng trong các trận chiến nóng bỏng.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 640, 220, 30, 50000000, NULL, NULL, NULL, 0.096, '127 x 73 x 43', 'Trắng', 'Nhựa', 12, 1, 4, '2022-06-06 15:42:05', '2022-06-06 15:42:05'),
(19, 'Bàn phím không dây Bluetooth Logitech K480 Multi-Device', 750000, 13, 'https://thenewxgear.com/wp-content/uploads/2021/12/K480_1.jpg', 'K480 là bàn phím đa thiết bị thoải mái và tiết kiệm không gian. Đem tới trải nghiệm gõ tuyệt vời hơn cho máy tính xách tay, máy tính bảng hoặc điện thoại. Ghép cặp tới 3 thiết bị và chuyển đổi liền mạch giữa chúng. Cực bền và có thời lượng pin dài. Chiếc bàn phím đa nhiệm có thiết kế nhỏ gọn này là điều mọi người đều cần để hoàn thành nhiều việc hơn từ bất cứ đâu. Bố cục tối giản này bao gồm tất cả các phím bạn cần trong một thiết kế tiết kiệm không gian. Ngoài ra nó cho phép bạn đặt con chuột ở gần mình hơn, điều đó có nghĩa là ít phải với tay hơn. Thoải mái hơn và tư thế cơ thể tốt hơn. Các phím hơi lõm xuống đem đến trải nghiệm gõ mượt mà, thoải mái. Với thiết kế mỏng, trọng lượng nhẹ, nó dễ dàng được mang theo tới bất cứ đâu bạn cần. K480 với công nghệ Bluetooth® không dây cho phép bạn gõ trên máy tính xách tay. Điện thoại hay máy tính bảng – mà không cần dây, do đó bạn có thể hoàn thành công việc ở bất cứ đâu. K480 Đa thiết bị cho phép bạn ghép cặp lên tới 3 thiết bị và dễ dàng chuyển đổi kết nối giữa chúng. Tất cả điều cần làm là xoay nút để gõ, chuyển đổi và tiếp tục gõ. ', 'K480 là bàn phím đa thiết bị thoải mái và tiết kiệm không gian. Đem tới trải nghiệm gõ tuyệt vời hơn cho máy tính xách tay, máy tính bảng hoặc điện thoại. Ghép cặp tới 3 thiết bị và chuyển đổi liền mạch giữa chúng. Cực bền và có thời lượng pin dài. Chiếc bàn phím đa nhiệm có thiết kế nhỏ gọn này là điều mọi người đều cần để hoàn thành nhiều việc hơn từ bất cứ đâu.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'bluetooth', 0.45, NULL, 'Đen', 'Nhựa', 12, 1, 4, '2022-06-06 15:48:50', '2022-06-06 15:48:50'),
(20, 'Bàn phím cơ Logitech G512 GX RGB (Brown/ Red)', 1890000, 12, 'https://thenewxgear.com/wp-content/uploads/2021/07/G512-GX_compressed.jpg', 'Logitech G512 GX RGB là bàn phím chơi game hiệu suất cao có bao gồm lựa chọn các phím switch cơ học GX nâng cao của bạn. Công nghệ chơi game tiên tiến cùng cấu trúc hợp kim nhôm khiến cho G512 trở nên đơn giản, bền và đầy đủ tính năng. Logitech G512 GX RGB có thể được tùy chỉnh mỗi phím với khoảng 16,8 triệu màu. Tạo hình động của riêng bạn hoặc chọn từ một bộ sưu tập các hiệu ứng thiết lập trước. Và với công nghệ LIGHTSYNC, chức năng chiếu sáng được lấy cảm hứng từ trò chơi, âm thanh hoặc màn hình để đem lại trải nghiệm RGB đắm chìm hơn bao giờ hết. Các phím switch cơ học GX nâng cao. Được thiết kế và thử nghiệm 100% cho hiệu suất, phản hồi và độ bền. Chọn từ 3 phím switch riêng – GX Blue (phát ra tiếng lách cách), GX Brown (Trực quan), GX Red (phím thấp).', 'Logitech G512 GX RGB là bàn phím chơi game hiệu suất cao có bao gồm lựa chọn các phím switch cơ học GX nâng cao của bạn. Công nghệ chơi game tiên tiến cùng cấu trúc hợp kim nhôm khiến cho G512 trở nên đơn giản, bền và đầy đủ tính năng.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 50000000, 'Full Size', NULL, NULL, 1.1, NULL, 'Đen', 'Nhựa', 12, 1, 4, '2022-06-06 15:52:35', '2022-06-06 15:52:35');

-- --------------------------------------------------------

--
-- Table structure for table `receipts`
--

DROP TABLE IF EXISTS `receipts`;
CREATE TABLE IF NOT EXISTS `receipts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `name_product` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `id_supplier` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_supplier` (`id_supplier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('1-create-status.js'),
('2-create-category.js'),
('3-create-supplier.js'),
('5-create-payment.js'),
('6-create-coupon.js'),
('7-create-permission.js'),
('8-create-product.js'),
('9-create-receipt.js'),
('91-create-user.js'),
('92-create-order.js'),
('93-create-banner.js'),
('94-create-insurance.js'),
('create-comment.js'),
('create-detail-order.js'),
('create-detail-receipt.js'),
('create-news.js');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
CREATE TABLE IF NOT EXISTS `statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `name`) VALUES
(1, 'Chưa xử lý'),
(2, 'Đã xử lý'),
(3, 'Đang vận chuyển'),
(4, 'Đã giao hàng'),
(5, 'Chuyển hoàn'),
(6, 'Đã hủy');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `picture`, `phone`, `address`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'Dell', 'https://yt3.ggpht.com/ytc/AKedOLTjXHmK05VyPJZVteN0x6iFyfLxuxupOZFdaaD5sEA=s900-c-k-c0x00ffffff-no-rj', '0123456789', 'TP.HCM', 'dell@gmail.com', '2022-07-07 06:59:22', '2022-07-07 06:59:22'),
(2, 'Lenovo', 'https://i.pinimg.com/736x/23/b6/9d/23b69dc7fc67a6f9af8526d5003aa7d0--xeon-e-microsoft-windows.jpg', '0123456789', 'TP.HCM', 'lenovo@gmail.com', '2022-07-07 06:59:22', '2022-07-07 06:59:22'),
(3, 'Asus', 'https://phucgia.com.vn/wp-content/uploads/2020/03/logo-Asus.jpg', '0123456789', 'TP.HCM', 'asus@gmail.com', '2022-07-07 06:59:22', '2022-07-07 06:59:22'),
(4, 'Acer', 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-acer-inkythuatso-2-01-27-15-50-00.jpg', '0123456789', 'TP.HCM', 'acer@gmail.com', '2022-07-07 06:59:22', '2022-07-07 06:59:22'),
(5, 'Logitech', 'https://media.loveitopcdn.com/3807/logo-logitech-cu-dongphucsongphu.png', '0123456789', 'TP.HCM', 'logitech@gmail.com', '2022-07-07 06:59:22', '2022-07-07 06:59:22'),
(6, 'Razer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLs775tWMCLWhIBX_Itud7w_fTiHAIcSwZpZ3lt-bOzjn0wQZtdG5j6TNgB_sb4EhZ2iA&usqp=CAU', '0123456789', 'TP.HCM', 'razer@gmail.com', '2022-07-07 06:59:22', '2022-07-07 06:59:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `id_permission` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_permission` (`id_permission`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `pwd`, `phone`, `address`, `gender`, `id_permission`, `createdAt`, `updatedAt`) VALUES
(1, 'Thành', 'Phan Văn', 'vanthanh9512@gmail.com', '$2a$10$UCXMLcwR6oC5efKi.NA2huU1b4VKmvK9qaw2PvO3Y5Mb.o1GHDcGy', '0987654321', '66 Phạm Nhữ Tăng, phường 4, quận 8, TP.HCM', 1, 1, '2022-07-06 15:55:53', '2022-07-06 15:55:53'),
(2, 'Quốc', 'Phạm Anh', 'caheocaduoi@gmail.com', '$2a$10$UCXMLcwR6oC5efKi.NA2huU1b4VKmvK9qaw2PvO3Y5Mb.o1GHDcGy', '0987654312', '106 Phạm Công Trứ, phường Thạnh Mỹ Lợi, quận 2, TP.HCM', 1, 1, '2022-07-06 15:55:53', '2022-07-06 15:55:53'),
(3, 'Thành', 'Phan Văn', 'pvthanh.240700@gmail.com', '$2a$10$UCXMLcwR6oC5efKi.NA2huU1b4VKmvK9qaw2PvO3Y5Mb.o1GHDcGy', '0987653312', '66 Phạm Nhữ Tăng, phường 4, quận 8, TP.HCM', 1, 3, '2022-07-06 15:55:53', '2022-07-06 15:55:53'),
(4, 'thành', NULL, 'vanthanh@gmail.com', '$2a$10$UCXMLcwR6oC5efKi.NA2huU1b4VKmvK9qaw2PvO3Y5Mb.o1GHDcGy', '0987653312', 'TP.HCM', 1, 3, '2022-07-06 15:55:53', '2022-07-06 15:55:53'),
(5, 'a', 'a', 'a@a', '$2a$10$UCXMLcwR6oC5efKi.NA2huU1b4VKmvK9qaw2PvO3Y5Mb.o1GHDcGy', '', '', 1, 2, '2022-07-06 15:55:53', '2022-07-06 15:55:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products` ADD FULLTEXT KEY `products_name_ram_chip_memory_display` (`name`,`ram`,`chip`,`memory`,`display`);

--
-- Indexes for table `users`
--
ALTER TABLE `users` ADD FULLTEXT KEY `users_firstname_lastname` (`firstname`,`lastname`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banners`
--
ALTER TABLE `banners`
  ADD CONSTRAINT `banners_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_orders`
--
ALTER TABLE `detail_orders`
  ADD CONSTRAINT `detail_orders_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_orders_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_receipts`
--
ALTER TABLE `detail_receipts`
  ADD CONSTRAINT `detail_receipts_ibfk_1` FOREIGN KEY (`id_receipt`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_receipts_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `insurances`
--
ALTER TABLE `insurances`
  ADD CONSTRAINT `insurances_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_payment`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_coupon`) REFERENCES `coupons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`id_status`) REFERENCES `statuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_cate`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`id_supplier`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_permission`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
