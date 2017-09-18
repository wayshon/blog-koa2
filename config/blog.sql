/*
 Navicat Premium Data Transfer

 Source Server         : blog
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 09/19/2017 01:04:10 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('30', '10', 'numberone', null, '21', '2017-09-18 23:04:45', '2017-09-19 00:11:28');
COMMIT;

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
--  Records of `article_tag`
-- ----------------------------
BEGIN;
INSERT INTO `article_tag` VALUES ('30', '标签1');
COMMIT;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `comment`
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES ('1', '10', '30', 'this is comment', '2017-09-18 23:30:32', '2017-09-18 23:30:32'), ('2', '10', '30', '这是评论', '2017-09-18 23:49:22', '2017-09-18 23:49:22');
COMMIT;

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
--  Records of `tag`
-- ----------------------------
BEGIN;
INSERT INTO `tag` VALUES ('标签1', '2017-09-18 23:59:23', '2017-09-18 23:59:23');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('10', 'wayshon', '123456', '老王', 'wayshon@qq.com', '131131131131', 'https://www.baidu.com/img/baidu_jgylogo3.gif', '1', '2017-09-18 23:04:10', '2017-09-18 23:04:10');
COMMIT;

-- ----------------------------
--  View structure for `article_view`
-- ----------------------------
DROP VIEW IF EXISTS `article_view`;
CREATE VIEW `article_view` AS select `article`.`id` AS `id`,`article`.`user_id` AS `user_id`,`article`.`title` AS `title`,`article`.`content` AS `content`,`article`.`create_at` AS `create_at`,`article`.`update_at` AS `update_at`,`article`.`read_count` AS `read_count`,`user`.`avatar` AS `avatar`,`user`.`nick_name` AS `nick_name`,count(`comment`.`article_id`) AS `comment_count`,count(`reprint`.`from_id`) AS `reprint_count`,count(`praise`.`article_id`) AS `praise_count` from ((((`article` left join `user` on((`article`.`user_id` = `user`.`id`))) left join `comment` on((`article`.`id` = `comment`.`article_id`))) left join `reprint` on((`article`.`id` = `reprint`.`from_id`))) left join `praise` on((`article`.`id` = `praise`.`article_id`))) group by `article`.`id`;

-- ----------------------------
--  View structure for `comment_view`
-- ----------------------------
DROP VIEW IF EXISTS `comment_view`;
CREATE VIEW `comment_view` AS select `comment`.`id` AS `id`,`comment`.`user_id` AS `user_id`,`comment`.`article_id` AS `article_id`,`comment`.`content` AS `content`,`comment`.`create_at` AS `create_at`,`comment`.`update_at` AS `update_at`,`user`.`nick_name` AS `nick_name` from (`comment` left join `user` on((`comment`.`user_id` = `user`.`id`)));

-- ----------------------------
--  View structure for `praise_view`
-- ----------------------------
DROP VIEW IF EXISTS `praise_view`;
CREATE VIEW `praise_view` AS select `praise`.`user_id` AS `user_id`,`praise`.`article_id` AS `article_id`,`praise`.`create_at` AS `create_at`,`praise`.`update_at` AS `update_at`,`user`.`nick_name` AS `nick_name` from (`praise` left join `user` on((`praise`.`user_id` = `user`.`id`)));

SET FOREIGN_KEY_CHECKS = 1;
