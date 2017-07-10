// dao/TagSqlMapping.js
// CRUD SQL语句
const tag = {
    insert:'INSERT INTO tag(article_id, name) VALUES(?,?)',
    queryAll: 'select * from tag',
    queryByArticleId: 'select * from tag where article_id=?',
    remove: 'delete from tag where article_id=? and name=?'
};

module.exports = tag;