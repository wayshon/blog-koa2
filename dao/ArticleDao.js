const $sql = require('./sqlmapping');

class ArticleDao {

    async get() {

        await global.connection.beginTransaction();
        let user1 = await global.connection.query($sql.user.insert, ['test1','123456','testway','1@q.cn', '15716199911', '', 1]);
        let user2 = await global.connection.query($sql.user.insert, ['test2','123456','testway2','2@q.cn', '15716199911', '', 2]);
        // let user2 = await global.connection.query($sql.user.insert, [1,2,3,4]);
        let info = await global.connection.commit();
        return info;
    }

    async getList(currentPage, pageSize) {
        return await global.connection.query($sql.article.queryAll, [currentPage, pageSize]);
    }

}

module.exports = new ArticleDao();
