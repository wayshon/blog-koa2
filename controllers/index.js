const dao = require('../dao'),
      userController = require('./UserController'),
      articleController = require('./ArticleController'),
      utilsController = require('./UtilsController');

module.exports = {
  userController: new userController(dao.user),
  articleController: new articleController(dao.article),
  utilsController: new utilsController()
}