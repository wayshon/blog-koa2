// dao/CommentSqlMapping.js
// CRUD SQL语句
const comment = {
    insert:'INSERT INTO comment(id, user_id, article_id, content) VALUES(0,?,?,?,)',
    queryByArticleId: 'select * from comment_view where article_id=?',
    remove: 'delete from comment where id=?'
};

module.exports = comment;