const dao = require('../dao'),
      userController = require('./UserController');

module.exports = {
  userController: new userController(dao.user)
}