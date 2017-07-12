// dao/CommentSqlMapping.js
// CRUD SQL语句
const comment = {
    insert:'INSERT INTO comment(id, user_id, article_id, content) VALUES(0,?,?,?)',
    queryById: 'select * from comment_view where id=?',
    queryByArticleId: 'select * from comment_view where article_id=? limit ?, ?',
    remove: 'delete from comment where id=?',
    removeByArticleId: 'delete from comment where article_id=?' 
};

module.exports = comment;