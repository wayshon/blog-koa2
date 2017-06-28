const sql = require('./Sql');

class UserDao {
    async add(name, password, avatar, nickname) {
        return await global.poolConnection.query(sql.Insert({
            table: 'user',
            params: {
                username: name,
                password: password,
                avatar: avatar,
                nickname: nickname
            }
        }));
    }

    async getByName(name) {
        return await global.poolConnection.query(sql.Select({
            table: 'user',
            params: {
                username: name
            }
        }));
    }

    async get() {
        return await global.poolConnection.query(sql.Select({
            table: 'user',
        }));
    }

    async getAll() {
        return await global.poolConnection.query(sql.Select({
            table: 'user',
            target: ['username', 'nickname'],
            params: {
                id: '6'
            }
        }));
    }

}

module.exports = UserDao;
