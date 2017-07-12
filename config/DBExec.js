
let connection = null;

class DBExec {
    constructor(con) {
        connection = con;
    }

   async beginTransaction() {
       return new Promise(function(resolve, reject) {
            connection.beginTransaction(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }
    commit() {
        return new Promise(function(resolve, reject) {
            connection.commit((err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            })
        });
    }
    query(sql, params) {
        return new Promise(function(resolve, reject) {
            connection.query(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    rollback() {
        return new Promise(function(resolve, reject) {
            connection.rollback(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = DBExec;