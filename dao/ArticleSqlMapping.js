// dao/ArticleSqlMapping.js
// CRUD SQL语句
const article = {
    insert:'INSERT INTO article(id, userid, title, content, create_at, update_at, readCount) VALUES(0,?,?,?,?,?,?)',
    update:'update article set title=?, content=? where id=?',
    delete: 'delete from article where id=?',
    queryAll: 'select * from article_view limit ?, ?',
    queryById: 'select * from article_view where id=?',
    queryByTitle: 'select * from article_view where title like "%"?"%" limit ?, ?',
    queryByUserid: 'select * from article_view where userid=? limit ?, ?',
    queryByTagname: 'select * from article_view where id in (select article_id from tag where name=?) limit ?, ?',
    
    addComment:'INSERT INTO comments(id, comment, articleid, userid, nickname) VALUES(0,?,?,?,?)',
    queryComment: 'select * from comments where articleid=?',
    queryReadCount: 'select readCount from article where id=?',
    updateReadCount: 'update article set readCount=? where id=?',
    addPraise:'INSERT INTO praise(id, articleid, userid, nickname) VALUES(0,?,?,?)',
    deletePraise: 'delete from praise where articleid=? and userid=?',
    addImages:'INSERT INTO images(id, articleid, path) VALUES(0,?,?)',
    queryImages: 'select path from images where articleid=?',
};

module.exports = article;