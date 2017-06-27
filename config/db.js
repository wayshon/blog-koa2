// MySQL数据库联接配置
let {user, database, host, password, dbPort: port, cookieSecret} = require('../config');
module.exports = {
    mysql: {
        user,
        database,
        host,
        password,
        port,
        cookieSecret
    }
};