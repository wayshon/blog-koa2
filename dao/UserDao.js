const $userSql = require('./UserSqlMapping');

class UserDao {
    async add(name, password, avatar, nickname) {
        return await global.poolConnection.query($userSql.insert, [name, password, avatar, nickname]);
    }

    async getByName(name) {
        return await global.poolConnection.query($userSql.queryByName, name);
    }

    async get() {
        return  await global.poolConnection.query($userSql.queryById);
    }

    async getAll() {
        return  await global.poolConnection.query($userSql.queryAll);
    }

}

module.exports = UserDao;
