// const sql = require('./Sql');
const $sql = require('./sqlmapping');

class ArticleDao {

    async get(currentPage, pageSize) {

        await global.connection.beginTransaction();
        let user1 = await global.connection.query($sql.user.insert, ['test1','123456','testway','1@q.cn', '15716199911', '', 1]);
        let user2 = await global.connection.query($sql.user.insert, ['test2','123456','testway2','2@q.cn', '15716199911', '', 2]);
        // let user2 = await global.connection.query($sql.user.insert, [1,2,3,4]);
        let info = await global.connection.commit();
        return info;
    }


    // async add(article) {
    //     return await global.poolConnection.query(sql.Insert({
    //         table: 'article',
    //         params: Object.assign({}, article)
    //     }))[0];
    // }

    // async getDetail(params) {
    //     return await global.poolConnection.query(sql.Select({
    //         table: 'article',
    //         params: params
    //     }));
    // }

    // async getTitleList() {
    //     return await global.poolConnection.query(sql.Select({
    //         table: 'article'
    //     }));
    // }

    // async editById(article, id) {
    //   return await global.poolConnection.query(sql.Update({
    //         table: 'article',
    //         target: article,
    //         params: {
    //           id: id
    //         }
    //   }));
    // }   

    // async deletById(id) {
    //   return await global.poolConnection.query(sql.Delete({
    //         table: 'article',
    //         params: {
    //           id: id
    //         }
    //   }));
    // }

}

module.exports = ArticleDao;
