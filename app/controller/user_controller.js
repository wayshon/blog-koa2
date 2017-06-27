let dao = null;

class userController {
  constructor(dao) {
    this.dao = dao;
  }

  async login(ctx, next) {
    let req = ctx.request.body;
    let flag = await this.dao.checkCanLogin(req.username, req.password);
    ctx.body = flag ? {
      msg: '登录成功!'
    } : {
      msg: '登录失败!'
    };
  }
}

module.exports = userController;