const user = require('./UserSqlMapping');
const article = require('./ArticleSqlMapping');
const comment = require('./CommentSqlMapping');
const praise = require('./PraiseSqlMapping');
const tag = require('./TagSqlMapping');
const articleTag = require('./ArticleTagSqlMapping');
const reprint = require('./ReprintSqlMapping');

module.exports = {
  user,
  article,
  comment,
  praise,
  tag,
  articleTag,
  reprint
};