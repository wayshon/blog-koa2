// const sql = require('./Sql');
const $sql = require('./sqlmapping');

const transaction = (connection) => {
    return new Promise(function(resolve, reject) {
        connection.beginTransaction(err => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve();
            }
        })
    });
}

class ArticleDao {
    async add(article) {
        let {userId,title,content,readCount} = article;

        return await global.poolConnection.query($sql.article.insert, [userId,title,content,readCount]);
    }

    async getAll(currentPage, pageSize) {
        console.log(6666666)

        try {
            await transaction(global.poolConnection.connection);
            let result = await global.poolConnection.query('select * from user');
            let info = await global.poolConnection.connection.commit;
            console.log(info)
            return result;
        } catch(error) {
            console.log('!!!!!!!')
            console.log(error)
        }
        
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
