// dao/PraiseSqlMapping.js
// CRUD SQL语句
const praise = {
    insert:'INSERT IGNORE INTO praise(user_id, article_id) VALUES(?,?)',
    get: 'select * from praise_view where article_id=? and user_id=?',
    queryByArticleId: 'select * from praise_view where article_id=? limit ?, ?',
    remove: 'delete from praise where article_id=? and user_id=?'
};

module.exports = praise;