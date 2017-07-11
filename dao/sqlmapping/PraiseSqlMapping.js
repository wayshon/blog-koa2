// dao/PraiseSqlMapping.js
// CRUD SQL语句
const praise = {
    insert:'INSERT INTO praise(user_id, article_id) VALUES(?,?)',
    queryByArticleId: 'select * from praise_view where article_id=?',
    queryByUserId: 'select * from praise_view where user_id=?',
    remove: 'delete from praise where article_id=? and user_id=?'
};

module.exports = praise;