// dao/ArticleSqlMapping.js
// CRUD SQL语句
const article = {
    insert:'INSERT INTO article(id, user_id, title, content, read_count) VALUES(0,?,?,?,?)',
    update:'update article set title=?, content=? where id=?',
    remove: 'delete from article where id=?',
    queryAll: 'select * from article_view limit ?, ?',
    queryById: 'select * from article_view where id=?',
    queryByTitle: 'select * from article_view where title like "%"?"%" limit ?, ?',
    queryByUserid: 'select * from article_view where userid=? limit ?, ?',
    queryByTag: 'select * from article_view where id in (select article_id from tag where name=?) limit ?, ?'
};

module.exports = article;