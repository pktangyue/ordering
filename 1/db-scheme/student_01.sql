CREATE DATABASE IF NOT EXISTS `student`;
USE student;
CREATE TABLE `student` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `number` int(10) unsigned NOT NULL,
    `name` varchar(16) NOT NULL,
    `gender` bit(1) NOT NULL,
    `school` varchar(255) NOT NULL,
    `major` varchar(255) NOT NULL,
    `birthday` date NOT NULL,
    `province_id` int(10) unsigned NOT NULL DEFAULT '0',
    `city_id` int(10) unsigned NOT NULL DEFAULT '0',
    `profile` text NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `number` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
