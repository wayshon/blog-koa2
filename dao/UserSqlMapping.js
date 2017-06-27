// CRUD SQL语句
const user = {
    insert:'INSERT INTO user(id, name, password, avatar, nickname) VALUES(0,?,?,?,?)',
    update:'update user set name=?, password=?, nickname=? avatar=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryByName: 'select * from user where name=?',
    queryAll: 'select * from user'
};

module.exports = user;