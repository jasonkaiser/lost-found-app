-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2025 at 11:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lostandfounddb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoryName` (`categoryName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `categoryName`) VALUES
(3, 'Clothing'),
(5, 'Documents'),
(1, 'Electronics'),
(7, 'Jewelry'),
(4, 'Keys'),
(9, 'Others'),
(6, 'Pets'),
(8, 'Toys'),
(2, 'Wallets');

-- --------------------------------------------------------

--
-- Table structure for table `claimrequests`
--

CREATE TABLE `claimrequests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `foundID` int(11) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `foundID` (`foundID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `claimrequests`
--

INSERT INTO `claimrequests` (`id`, `userID`, `foundID`, `status`, `createdAt`) VALUES
(2, 2, NULL, 'Approved', '2025-04-03 12:30:11'),
(3, 1, NULL, 'Pending', '2025-04-16 14:08:26');

-- --------------------------------------------------------

--
-- Table structure for table `founditems`
--

CREATE TABLE `founditems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(100) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `categoryID` (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `founditems`
--

INSERT INTO `founditems` (`id`, `userID`, `categoryID`, `itemName`, `description`, `location`, `createdAt`, `image`, `latitude`, `longitude`) VALUES
(56, 11, 1, 'Headphones', 'Blue headphones', 'Baščaršija', '2025-06-03 08:07:56', 'frontend/assets/images/preview3.jpg', 43.8591, 18.4124),
(57, 11, 2, 'Jacket', 'Black jacket', 'Marijin Dvor', '2025-06-03 08:07:56', 'frontend/assets/images/preview2.jpg', 43.8455, 18.3841),
(58, 11, 3, 'Camera', 'Digital camera', 'Skenderija', '2025-06-03 08:07:56', 'frontend/assets/images/preview3.jpg', 43.8596, 18.4089),
(59, 11, 4, 'Necklace', 'Silver necklace', 'Ferhadija', '2025-06-03 08:07:56', 'frontend/assets/images/preview4.jpg', 43.859, 18.413),
(60, 11, 5, 'Car keys', 'Set with remote', 'Hrasno', '2025-06-03 08:07:56', 'frontend/assets/images/preview5.jpg', 43.8573, 18.4301),
(61, 11, 6, 'ID Card', 'Bosnian ID', 'Alifakovac', '2025-06-03 08:07:56', 'frontend/assets/images/preview6.jpg', 43.856, 18.4148),
(62, 11, 7, 'Purse', 'Small red purse', 'Vijećnica', '2025-06-03 08:07:56', 'frontend/assets/images/preview7.jpeg', 43.8578, 18.4215),
(63, 11, 8, 'Doll', 'Baby doll', 'Grbavica', '2025-06-03 08:07:56', 'frontend/assets/images/preview8.jpg', 43.845, 18.3923),
(64, 11, 9, 'Watch', 'Silver watch', 'Ilidža', '2025-06-03 08:07:56', 'frontend/assets/images/preview9.jpeg', 43.8317, 18.2955),
(65, 11, 1, 'E-Reader', 'Kindle device', 'Dobrinja', '2025-06-03 08:07:56', 'frontend/assets/images/preview3.jpg', 43.8434, 18.3739);

-- --------------------------------------------------------

--
-- Table structure for table `lostitems`
--

CREATE TABLE `lostitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(100) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `categoryID` (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lostitems`
--

INSERT INTO `lostitems` (`id`, `userID`, `categoryID`, `itemName`, `description`, `location`, `createdAt`, `image`, `latitude`, `longitude`) VALUES
(49, 10, 1, 'Phone', 'Black smartphone', 'Baščaršija', '2025-06-03 08:13:45', 'frontend/assets/images/preview3.jpg', 43.8563, 18.4131),
(50, 10, 2, 'Wallet', 'Brown leather wallet', 'Ferhadija', '2025-06-03 08:13:45', 'frontend/assets/images/preview7.jpeg', 43.857, 18.414),
(51, 10, 3, 'Jacket', 'Blue winter jacket', 'Skenderija', '2025-06-03 08:13:45', 'frontend/assets/images/preview2.jpg', 43.855, 18.412),
(52, 10, 4, 'Ring', 'Gold wedding ring', 'Marijin Dvor', '2025-06-03 08:13:45', 'frontend/assets/images/preview4.jpg', 43.8535, 18.4105),
(53, 10, 5, 'Keys', 'Set of keys', 'Vijećnica', '2025-06-03 08:13:45', 'frontend/assets/images/preview5.jpg', 43.8575, 18.4155),
(54, 11, 6, 'Cat', 'Grey cat lost', 'Hadzici', '2025-06-03 08:13:45', 'frontend/assets/images/preview1.jpg', 43.849, 18.405),
(55, 11, 7, 'Bracelet', 'Silver bracelet', 'Grbavica', '2025-06-03 08:13:45', 'frontend/assets/images/preview7.jpeg', 43.861, 18.42),
(56, 11, 8, 'Toy Car', 'Red toy car', 'Ilidža', '2025-06-03 08:13:45', 'frontend/assets/images/preview8.jpg', 43.84, 18.389),
(57, 11, 9, 'Glasses', 'Black sunglasses', 'Centar', '2025-06-03 08:13:45', 'frontend/assets/images/preview9.jpeg', 43.8565, 18.4125),
(58, 11, 1, 'Headphones', 'Wireless headphones', 'Novi Grad', '2025-06-03 08:13:45', 'frontend/assets/images/preview3.jpg', 43.8558, 18.4162),
(59, 11, 1, 'Test Item', 'Test Item test', 'Carsija', '2025-06-03 08:25:58', 'frontend/assets/images/preview9.jpeg', 43.8588, 18.4289);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `role` enum('User','Admin') DEFAULT 'User',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `location` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `passwordHash`, `verified`, `role`, `createdAt`, `location`, `phone_number`) VALUES
(1, 'IBU', 'new.email@example.com', 'jason123', 1, 'User', '2025-04-03 12:30:11', NULL, NULL),
(2, 'Bob Smith', 'bob@example.com', 'hashedpassword456', 0, 'User', '2025-04-03 12:30:11', NULL, NULL),
(3, 'Admin User', 'admin@example.com', 'hashedpassword789', 1, 'Admin', '2025-04-03 12:30:11', NULL, NULL),
(7, 'adnaa', 'adna@gmail.com', 'jason123', 0, 'Admin', '2025-05-12 14:47:13', NULL, NULL),
(8, 'jason2000', 'jason2000@gmail.com', 'jason2000', 0, 'User', '2025-05-22 18:53:24', NULL, NULL),
(9, 'jasonn', 'jason123@gmail.com', '$2y$10$HT8kQnq3WE6N9PRKLtZU1O7gm4V4oXmjoJAwt9isWNpNsMVCk6s6O', 0, 'Admin', '2025-05-22 18:57:57', NULL, NULL),
(10, 'test_account', 'useraccount@gmail.com', '$2y$10$meHC8VUfx5QXY6TZnd.3nOyNkqRhjz78Y1HZz2CVpvqhmL1eKYvFG', 0, 'User', '2025-06-01 08:35:41', 'Ilidza', '065052080'),
(11, 'admin_account', 'adminaccount@gmail.com', '$2y$10$HVYOX3sps4JG7Yaae5wfVehRYEHHNASx.Z95yOLD3D6EblDIs4ZlO', 0, 'Admin', '2025-06-01 17:47:23', 'Stup', '052312344'),
(12, 'denis123', 'denis123@gmail.com', '$2y$10$2GandfSjomgzEpLv2GKvjeEs1TxW5LYbllcjpM.qbuG6uURtFm2by', 0, 'User', '2025-06-02 09:32:10', 'Stup', '123123123');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `claimrequests`
--
ALTER TABLE `claimrequests`
  ADD CONSTRAINT `claimrequests_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `claimrequests_ibfk_2` FOREIGN KEY (`foundID`) REFERENCES `founditems` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `founditems`
--
ALTER TABLE `founditems`
  ADD CONSTRAINT `founditems_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `founditems_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lostitems`
--
ALTER TABLE `lostitems`
  ADD CONSTRAINT `lostitems_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lostitems_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;