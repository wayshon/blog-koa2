const $sql = require('./sqlmapping');

class CommentDao {

    async add(comment) {
        let { userId,articleId,content} = comment;
        let result = await global.connection.query($sql.comment.insert, [userId,articleId,content]);
        return result.insertId
    }

    async get(id) {
        let comment = await global.connection.query($sql.comment.queryById, id);
        return comment[0]
    }

    async remove(id) {
        return await global.connection.query($sql.comment.remove, id);
    }

    async getList(articleId, page, pageSize) {
        return await global.connection.query($sql.comment.queryByArticleId, [articleId, page, pageSize]);
    }
}

module.exports = new CommentDao();
