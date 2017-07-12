const $sql = require('./sqlmapping');

class PraiseDao {

    async add(praise) {
        let { userId,articleId} = praise;
        let result = await global.connection.query($sql.praise.insert, [userId,articleId]);
        return result.insertId
    }

    async get(articleId, userId) {
        let praise = await global.connection.query($sql.praise.get, [articleId, userId]);
        return praise[0]
    }

    async remove(articleId, userId) {
        return await global.connection.query($sql.praise.remove, [articleId, userId]);
    }

    async getList(articleId, page, pageSize) {
        return await global.connection.query($sql.praise.queryByArticleId, [articleId, page, pageSize]);
    }
}

module.exports = new PraiseDao();
