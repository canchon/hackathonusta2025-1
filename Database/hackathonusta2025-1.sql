-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 20-03-2025 a las 19:32:13
-- Versión del servidor: 10.11.10-MariaDB-log
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u987779492_projects`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hackathonusta2025-1`
--

CREATE TABLE `hackathonusta2025-1` (
  `id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `temperature` float NOT NULL,
  `humidity` float NOT NULL,
  `noise` float NOT NULL,
  `thereIsMovement` tinyint(1) NOT NULL,
  `light` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `hackathonusta2025-1`
--

INSERT INTO `hackathonusta2025-1` (`id`, `createdAt`, `temperature`, `humidity`, `noise`, `thereIsMovement`, `light`) VALUES
(1, '2025-03-20 17:28:11', 20.66, 49.8, 5206.18, 1, 6523.48),
(57, '2025-03-20 19:06:11', 32.5, 41.9, 50, 1, 10),
(58, '2025-03-20 19:09:48', 32.5, 41.9, 50, 1, 10),
(59, '2025-03-20 19:25:23', 32.5, 41.9, 50, 0, 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `hackathonusta2025-1`
--
ALTER TABLE `hackathonusta2025-1`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `hackathonusta2025-1`
--
ALTER TABLE `hackathonusta2025-1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
