/**
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development', //环境名称
    port: 3001,         //服务端口号
    mysqlConfig: {
        user: 'root',
        host: 'rm-bp1oik8b2i008667ho.mysql.rds.aliyuncs.com',   //TEDMysql
        password: 'Sloth666',
        // host: 'localhost',
        // password: '123456',
        database: 'blog',
        dbPort: 3306,
        connectionLimit: 10,
        useConnectionPooling: true
    },
    jwtSecret: 'blog'
}