-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2024 at 05:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sales`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_countAward` ()   SELECT COUNT(r_id) as AWARD_COUNT FROM tbl_details$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_countAwarded` ()   SELECT count(distinct tbl_sales.r_id) AS AWARDED_COUNT FROM tbl_sales INNER JOIN tbl_details ON tbl_sales.r_id = tbl_details.r_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_countByAWARDS` ()   SELECT tbl_details.award, COUNT(tbl_details.award) AS award_count, CONCAT('#',LPAD(CONV(ROUND(RAND()*16777215),10,16),6,0)) AS COLOR FROM tbl_sales INNER JOIN tbl_details on tbl_sales.r_id = tbl_details.r_id GROUP BY tbl_details.award ORDER BY tbl_details.award$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteSales` (IN `p_rid` INT)   DELETE FROM tbl_sales WHERE r_id = p_rid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertAwardData` (IN `p_award` VARCHAR(255), IN `p_event` VARCHAR(255), IN `p_date` DATE, IN `p_rid` INT)   INSERT INTO tbl_details(award, event, date, r_id)
VALUES(p_award,p_event,p_date,p_rid)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateSales` (IN `p_name` VARCHAR(255), IN `p_serialnumber` VARCHAR(255), IN `p_brand` VARCHAR(255), IN `p_model` VARCHAR(255), IN `p_sold` VARCHAR(255), IN `p_location` VARCHAR(255), IN `p_rid` INT)   UPDATE tbl_sales
SET
name = p_name,
serialnumber = p_serialnumber,
brand = p_brand,
model = p_model,
sold = p_sold,
location = p_location
WHERE 
r_id = p_rid$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_award`
--

CREATE TABLE `tbl_award` (
  `awid` int(11) NOT NULL,
  `awards` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_award`
--

INSERT INTO `tbl_award` (`awid`, `awards`) VALUES
(1, 'Best Customer Service'),
(2, 'Leaderboard Award'),
(3, 'Best Performer'),
(4, 'Exceptional Salesmanship'),
(5, 'Excellent Feedback Award'),
(6, 'Team Player Award'),
(7, 'Man of the Day'),
(8, 'Early Bird Award'),
(9, 'Rookie of the Year'),
(10, 'Always Present Award'),
(11, 'Loyalty Award'),
(12, 'Walking Encyclopedia Award');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_details`
--

CREATE TABLE `tbl_details` (
  `did` int(11) NOT NULL,
  `award` varchar(255) NOT NULL,
  `event` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `r_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_details`
--

INSERT INTO `tbl_details` (`did`, `award`, `event`, `date`, `r_id`) VALUES
(6, 'Best Customer Service', 'Anniversary Party', '2015-03-10', 13),
(7, 'Man of the Day', 'Summer Party', '2024-05-23', 13),
(10, 'Best Performer', 'Team Building', '2021-11-16', 13),
(11, 'Best Performer', 'Summer Party', '2017-04-19', 15),
(14, 'Best Customer Service', 'Yearend Party', '2015-12-20', 1),
(15, 'Exceptional Salesmanship', 'Anniversary Party', '2021-03-10', 1),
(16, 'Leaderboard Award', 'Anniversary Party', '2008-03-10', 16),
(17, 'Early Bird Award', 'Team Building', '2014-06-27', 16);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sales`
--

CREATE TABLE `tbl_sales` (
  `r_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `serialnumber` int(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `sold` int(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sales`
--

INSERT INTO `tbl_sales` (`r_id`, `name`, `serialnumber`, `brand`, `model`, `sold`, `location`) VALUES
(1, 'Lars Mishima', 64632, 'LENOVO', 'IDEAPAD GAMING 3 15ARH7', 8, 'SM MOA'),
(5, 'Matt A. Folgers', 2210253, 'ASUS', 'ROG STRIX G16', 3, 'PC CENTRAL QC'),
(6, 'Petyr B. Piper', 2230215, 'MSI', 'TITAN GT77', 1, 'SM NORTH EDSA'),
(13, 'Daniel Loyd C. Andres', 2125452, 'LENOVO ', 'LEGION SLIM 5', 3, 'ASIANIC QC'),
(15, 'JM V. Gampoy', 2122543, 'RAZER', 'BLADE 16', 5, 'SM CORDON'),
(16, 'Jasmin S. Flores', 2125463, 'ALIENWARE', 'M15 R7', 6, 'SM DIFFUN'),
(17, 'Jenecel L. Molina', 1264369, 'ACER', 'PREDATOR HELIOS NEO 16', 8, 'OCTAGON ISABELA'),
(18, 'Cyrel Kate Ramos', 5221643, 'GIGABYTE', 'G5 KE', 455, 'fhjghk');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_award`
--
ALTER TABLE `tbl_award`
  ADD PRIMARY KEY (`awid`);

--
-- Indexes for table `tbl_details`
--
ALTER TABLE `tbl_details`
  ADD PRIMARY KEY (`did`),
  ADD KEY `agent_detail` (`r_id`);

--
-- Indexes for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  ADD PRIMARY KEY (`r_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_award`
--
ALTER TABLE `tbl_award`
  MODIFY `awid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_details`
--
ALTER TABLE `tbl_details`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  MODIFY `r_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_details`
--
ALTER TABLE `tbl_details`
  ADD CONSTRAINT `agent_detail` FOREIGN KEY (`r_id`) REFERENCES `tbl_sales` (`r_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
