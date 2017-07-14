/*
 Navicat Premium Data Transfer

 Source Server         : TED
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : 106.14.40.56
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 07/14/2017 11:02:05 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `read_count` int(100) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `article_tag`
-- ----------------------------
DROP TABLE IF EXISTS `article_tag`;
CREATE TABLE `article_tag` (
  `article_id` int(11) unsigned NOT NULL,
  `tag_name` varchar(20) NOT NULL,
  PRIMARY KEY (`article_id`,`tag_name`),
  KEY `article_id` (`article_id`),
  KEY `article` (`article_id`),
  KEY `tag` (`tag_name`),
  KEY `tag_name` (`tag_name`),
  CONSTRAINT `article_foreign` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tag_foreign` FOREIGN KEY (`tag_name`) REFERENCES `tag` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `praise`
-- ----------------------------
DROP TABLE IF EXISTS `praise`;
CREATE TABLE `praise` (
  `user_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `reprint`
-- ----------------------------
DROP TABLE IF EXISTS `reprint`;
CREATE TABLE `reprint` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nick_name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `email` varchar(20) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `manager` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
--  View structure for `article_view`
-- ----------------------------
DROP VIEW IF EXISTS `article_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `article_view` AS select `article`.`id` AS `id`,`article`.`user_id` AS `user_id`,`article`.`title` AS `title`,`article`.`content` AS `content`,`article`.`create_at` AS `create_at`,`article`.`update_at` AS `update_at`,`article`.`read_count` AS `read_count`,`user`.`avatar` AS `avatar`,`user`.`nick_name` AS `nick_name`,count(`comment`.`article_id`) AS `comment_count`,count(`reprint`.`from_id`) AS `reprint_count`,count(`praise`.`article_id`) AS `praise_count` from ((((`article` left join `user` on((`article`.`user_id` = `user`.`id`))) left join `comment` on((`article`.`id` = `comment`.`article_id`))) left join `reprint` on((`article`.`id` = `reprint`.`from_id`))) left join `praise` on((`article`.`id` = `praise`.`article_id`))) group by `article`.`id`;

-- ----------------------------
--  View structure for `comment_view`
-- ----------------------------
DROP VIEW IF EXISTS `comment_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `comment_view` AS select `comment`.`id` AS `id`,`comment`.`user_id` AS `user_id`,`comment`.`article_id` AS `article_id`,`comment`.`content` AS `content`,`comment`.`create_at` AS `create_at`,`comment`.`update_at` AS `update_at`,`user`.`nick_name` AS `nick_name` from (`comment` left join `user` on((`comment`.`user_id` = `user`.`id`)));

-- ----------------------------
--  View structure for `praise_view`
-- ----------------------------
DROP VIEW IF EXISTS `praise_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `praise_view` AS select `praise`.`user_id` AS `user_id`,`praise`.`article_id` AS `article_id`,`praise`.`create_at` AS `create_at`,`praise`.`update_at` AS `update_at`,`user`.`nick_name` AS `nick_name` from (`praise` left join `user` on((`praise`.`user_id` = `user`.`id`)));

SET FOREIGN_KEY_CHECKS = 1;
