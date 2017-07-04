// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, username, password, nick_name, email, mobile, avatar, manager) VALUES(0,?,?,?,?,?,?,?)',
    queryById: 'select * from user where id=?',
    queryByName: 'select * from user where username=?',
    queryAll: 'select * from user',
    queryNickname: 'select nickname from user where id=?',
};

module.exports = user;