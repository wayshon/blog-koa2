const $sql = require('./sqlmapping');

class TagDao {

    async getByArticleId(articleId) {
        return await global.connection.query($sql.articleTag.queryByArticleId, articleId);
    }

    async getList(page, pageSize) {
        return await global.connection.query($sql.tag.queryAll, [page, pageSize]);
    }
}

module.exports = new TagDao();
