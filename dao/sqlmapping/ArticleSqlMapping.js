// dao/ArticleSqlMapping.js
// CRUD SQL语句
const article = {
    insert:'INSERT INTO article(id, user_id, title, content, read_count) VALUES(0,?,?,?,?)',
    update:'update article set title=?, content=? where id=?',
    remove: 'delete from article where id=? and user_id=?',
    queryById: 'select * from article_view where id=?',
    queryAll: 'select * from article_view where title like "%"?"%" limit ?, ?',
    queryByUserid: 'select * from article_view where user_id=?  and title like "%"?"%" limit ?, ?',
    queryByTag: 'select * from article_view where id in (select article_id from tag where name=?) limit ?, ?',
    queryReadCount: 'select read_count from article where id=?',
    updateReadCount: 'update article set read_count=? where id=?',
    queryCount: 'select count(*) as total from article_view where title like "%"?"%"',
    queryCountByUserId: 'select count(*) as total from article_view where user_id=? and title like "%"?"%"'
};

module.exports = article;