// dao/TagSqlMapping.js
// CRUD SQL语句
const tag = {
    insert:'INSERT IGNORE INTO tag(article_id, name) VALUES(?,?)',
    queryAll: 'select * from tag limit ?, ?',
    queryByArticleId: 'select * from tag where article_id=?',
    remove: 'delete from tag where article_id=? and name=?',
    removeByArticleId: 'delete from tag where article_id=? and user_id=?',
};

module.exports = tag;