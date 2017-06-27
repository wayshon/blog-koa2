let user = {};
class User {
  constructor(params) {
    this.user = Object.assign({}, params);
  }

  get getPassword() {
    // TODO: 加密
    return this.user.password;
  }

}

module.exports = User;