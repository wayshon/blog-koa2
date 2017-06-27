
let User = require('../model/user');
let pool = null;

class userDao {
  constructor(pool) {
    this.pool = pool;
  }

  async checkCanLogin(username, password) {
    let res = await this.pool.query(`select * from user where username = '${username}';`);
    if (res.length === 1) {
      return new User(res[0]).getPassword === password;
    } else {
      // TODO:异常处理
      return false;
    }
  }

}

module.exports = userDao;