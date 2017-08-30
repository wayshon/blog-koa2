/**
 * 测试环境的配置内容
 */

module.exports = {
    env: 'test',        //环境名称
    port: 6002,         //服务端口号
    mysqlConfig: {
        user: 'root',
        database: 'blog',
        host: '127.0.0.1',
        password: 'root',
        dbPort: 3306,
        connectionLimit: 10
    },
    jwtSecret: 'blog'
}