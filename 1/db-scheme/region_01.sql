CREATE DATABASE IF NOT EXISTS `student`;
USE student;
CREATE TABLE `region` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(16) NOT NULL,
    `parent_id` int(10) unsigned NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
