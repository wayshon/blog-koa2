// dao/TagSqlMapping.js
// CRUD SQL语句
const tag = {
    insert:'INSERT IGNORE INTO tag(name) VALUES(?)',
    queryAll: 'select * from tag limit ?, ?'
};

module.exports = tag;