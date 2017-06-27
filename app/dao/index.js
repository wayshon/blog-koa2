const userDao = require('./user_dao'),
  wrapper = require('co-mysql'),
  mysql = require('mysql'),
  config = require('../../config');

const pool = mysql.createPool(config.mysql_opt);
const p = wrapper(pool);

module.exports = {
  user: new userDao(p)
};