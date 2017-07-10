
let connection = null;

class DBExec {
    constructor(con) {
        connection = con;
    }

   async beginTransaction() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=> {
            console.log("hah")
            resolve()
        }, 5000)
    })
        
        // return new Promise(async (resolve, reject)=> connection.beginTransaction(err => err ? reject(err) : resolve()));
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
}

module.exports = DBExec;