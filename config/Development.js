/**
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development', //环境名称
    port: 3001,         //服务端口号
    mysqlConfig: {
        user: 'root',
        host: '106.14.40.56',   //TED
        password: 'root',
        //  host: 'localhost',
        // password: '123456',
        database: 'blog',
        dbPort: 3306,
        connectionLimit: 10
    },
    jwtSecret: 'blog'
}