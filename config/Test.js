/**
 * 测试环境的配置内容
 */

module.exports = {
    env: 'test',        //环境名称
    port: 3002,         //服务端口号
    mysqlConfig: {
        user: 'root',
        database: 'blog',
        host: '127.0.0.1',
        password: 'root',
        dbPort: 3306,
        connectionLimit: 10
    },
    jwtSecret: 'blog',
    redisConfig: {
        port: 6379,          // Redis port 
        host: '127.0.0.1',   // Redis host 
        family: 4,           // 4 (IPv4) or 6 (IPv6) 
        password: '',
        // db: 0
    }
}