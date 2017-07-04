// const sql = require('./Sql');
const $sql = require('./userSqlMapping');

class UserDao {

    async add(user) {
        let {userName,password,nickName,email,mobile,avatar,manager} = user;
        return await global.poolConnection.query($sql.insert, [userName,password,nickName,email,mobile,avatar,manager]);
    }

    async getByName(name) {
        return await global.poolConnection.query($sql.queryByName, name);
    }

    async get(id) {
        return await global.poolConnection.query($sql.queryById, id);
    }

    // async add(user) {
    //     return await global.poolConnection.query(sql.Insert({
    //         table: 'user',
    //         params: Object.assign({}, user)
    //     }));
    // }

    // async getByName(name) {
    //     return await global.poolConnection.query(sql.Select({
    //         table: 'user',
    //         params: {
    //             username: name
    //         }
    //     }))[0];
    // }

    // async get(id) {
    //     return await global.poolConnection.query(sql.Select({
    //         table: 'user',
    //         params: {
    //             id
    //         }
    //     }));
    // }

}

module.exports = UserDao;
