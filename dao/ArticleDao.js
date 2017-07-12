const $sql = require('./sqlmapping');

class ArticleDao {
    
    async add(article) {
        let { userId,title,content,readCount,tags } = article;
        await global.connection.beginTransaction();
        let articleResult = await global.connection.query($sql.article.insert, [userId,title,content,readCount]);
        let insertTags = tags.map(v => {
            return {
                articleId: articleResult.insertId,
                name: v
            }
        })
        for (let val of insertTags) {
            await global.connection.query($sql.tag.insert, [val.articleId, val.name]);
        }
        await global.connection.commit().catch(e => global.connection.rollback);

        return articleResult.insertId;
    }

    async remove(articleId, userId) {
        await global.connection.beginTransaction();
        await global.connection.query($sql.article.remove, [articleId, userId]);
        await global.connection.query($sql.comment.removeByArticleId, [articleId, userId]);
        await global.connection.query($sql.tag.removeByArticleId, [articleId, userId]);
        await global.connection.query($sql.praise.remove, [articleId, userId]);
        return await global.connection.commit().catch(e => global.connection.rollback);
    }

    async modify(article) {
        let { id, title,content } = article;
        return await global.connection.query($sql.article.update, [title,content,id]);
    }

    async get(id) {
        await global.connection.beginTransaction();
        let readCountOld = await global.connection.query($sql.article.queryReadCount, id);
        let readCount = readCountOld[0].read_count;
        readCount++;
        await global.connection.query($sql.article.updateReadCount, [readCount, id]);
        let article = await global.connection.query($sql.article.queryById, id);
        await global.connection.commit().catch(e => global.connection.rollback);
        return article[0]
    }

    async getByUserId(userId, page, pageSize) {
        await global.connection.beginTransaction();
        let list = await global.connection.query($sql.article.queryByUserid, [userId, page, pageSize]);
        for (let val of list) {
            let tagList = await global.connection.query($sql.tag.queryByArticleId, val.id);
            val.tags = tagList.map(v => v.name)
        }
        await global.connection.commit().catch(e => global.connection.rollback);
        return list;
    }

    async getList(page, pageSize) {
        await global.connection.beginTransaction();
        let list = await global.connection.query($sql.article.queryAll, [page, pageSize]);
        for (let val of list) {
            let tagList = await global.connection.query($sql.tag.queryByArticleId, val.id);
            val.tags = tagList.map(v => v.name)
        }
        await global.connection.commit().catch(e => global.connection.rollback);
        return list;
    }

}

module.exports = new ArticleDao();
