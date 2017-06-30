const sql = require('./Sql');

class ArticleDao {
    async add(article) {
        return await global.poolConnection.query(sql.Insert({
            table: 'article',
            params: Object.assign({}, article)
        }))[0];
    }

    async getDetail(params) {
        return await global.poolConnection.query(sql.Select({
            table: 'article',
            params: params
        }));
    }

    async getTitleList() {
        return await global.poolConnection.query(sql.Select({
            table: 'article'
        }));
    }

    async editById(article, id) {
      return await global.poolConnection.query(sql.Update({
            table: 'article',
            target: article,
            params: {
              id: id
            }
      }));
    }   

    async deletById(id) {
      return await global.poolConnection.query(sql.Delete({
            table: 'article',
            params: {
              id: id
            }
      }));
    }

}

module.exports = ArticleDao;
