const dao = require('../dao'),
      userController = require('./UserController'),
      articleController = require('./ArticleController');

module.exports = {
  userController: new userController(dao.user),
  articleController: new articleController(dao.article)
}