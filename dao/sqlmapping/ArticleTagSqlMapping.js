const articleTag = {
    insert:'INSERT IGNORE INTO article_tag(article_id, tag_name) VALUES(?,?)',
    queryByArticleId: 'select * from article_tag where article_id=?',
    remove: 'delete from article_tag where article_id=? and tag_name=?',
    removeByArticleId: 'delete from article_tag where article_id=?'
};

module.exports = articleTag;