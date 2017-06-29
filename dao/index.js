const userDao = require('./UserDao');
const articleDao = require('./ArticleDao');

module.exports = {
  user: new userDao(),
  article: new articleDao()
};