const dao = require('../dao'),
  user = require('./user_controller');

module.exports = {
  user: new user(dao.user)
}