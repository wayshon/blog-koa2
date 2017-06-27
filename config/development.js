module.exports = {
    env: 'development', //环境名称
    port: 3001,         //服务端口号
    mongodb_url: '',    //数据库地址
    mysql_opt: {
        host: 'localhost',
        port: '3306',
        database : 'blog',
        user: 'root',
        password : 'root'
    },      
    redis_url:'',       //redis地址
    redis_port: ''      //redis端口号
};