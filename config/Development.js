/**
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development', //环境名称
    port: 3001,         //服务端口号
    mysqlConfig: {
        user: 'root',
        database: 'blog',
        // host: '115.159.55.33',
        // password: 'root',
         host: 'localhost',
        password: '123456',
        dbPort: 3306
    },
    jwtSecret: 'blog'
}