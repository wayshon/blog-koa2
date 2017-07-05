// dao/CommentSqlMapping.js
// CRUD SQL语句
const comment = {
    insert:'INSERT INTO comment(id, user_id, article_id, comment) VALUES(0,?,?,?,)',
    query: 'select * from comment_view where article_id=?',
    queryReadCount: 'select readCount from article where id=?',
    updateReadCount: 'update article set readCount=? where id=?',
    addPraise:'INSERT INTO praise(id, articleid, userid, nickname) VALUES(0,?,?,?)',
    deletePraise: 'delete from praise where articleid=? and userid=?',
    addImages:'INSERT INTO images(id, articleid, path) VALUES(0,?,?)',
    queryImages: 'select path from images where articleid=?',
};

module.exports = comment;