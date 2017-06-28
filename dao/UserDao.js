const mysql = require('promise-mysql'),
      // mysql = require('mysql'),
      $db = require('../config/db'),
      $userSql = require('./UserSqlMapping'),
      pool = mysql.createPool($db.mysql),
      config = require('../config');


class UserDao {
    async add(name, password, avatar, nickname) {
        let connection = await pool.getConnection();
        let result = await connection.query($userSql.insert, [name, password, avatar, nickname]);
        return result;
    }

    async getByName(name) {
        let connection = await pool.getConnection();
        let result = await connection.query($userSql.queryByName, name);
        return result;
    }

    async get() {
        let connection = await pool.getConnection();
        let result = await connection.query($userSql.queryById);
        return result;
    }

    async getAll() {
        let connection = await pool.getConnection();
        let result = await connection.query($userSql.queryAll);
        return result;
    }


}

module.exports = new UserDao();
