drop database if exists student;
create database student;
use student;
CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_name` varchar(32) NOT NULL,
    `password` varchar(32) NOT NULL,
    `is_admin` bit(1) DEFAULT false,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into user (user_name,password,is_admin) values ('pktangyue','f4be50f49d25982f4acdd1a98d51b4e0',true);
