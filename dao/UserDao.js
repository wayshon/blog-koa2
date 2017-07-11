const $sql = require('./sqlmapping');

class UserDao {

    async add(user) {
        let {userName,password,nickName,email,mobile,avatar,manager} = user;
        return await global.connection.query($sql.user.insert, [userName,password,nickName,email,mobile,avatar,manager]);
    }

    async getByName(name) {
        return await global.connection.query($sql.user.queryByName, name);
    }

    async get(id) {
        return await global.connection.query($sql.user.queryById, id);
    }
}

module.exports = new UserDao();
