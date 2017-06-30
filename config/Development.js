/**
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development', //环境名称
    port: 3005,         //服务端口号
    mysqlConfig: {
        user: 'root',
        database: 'blog',
        host: '127.0.0.1',
        password: '123456',
        dbPort: 3306
    },
    jwtSecret: 'blog'
}