const ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames'),
      articleDao = require("../dao/ArticleDao"),
      tagDao = require("../dao/TagDao"),
      tool = require("../utils/Tools");

class ArticleController {

    async add(ctx, next) {
        let req = ctx.request.body;

        if (tool.isBlank(req.title)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 title');

        let article = {
            userId: ctx.state.user,
            title: req.title,
            content: req.content,
            readCount: 0,
            tags: req.tags || []
        }

        let insertId = await articleDao.add(article)

        let result =  await articleDao.get(insertId);
        let tags =  await tagDao.getByArticleId(insertId);
        result.tags = tags.map(v => v.name);

        ctx.body = result
    }

    async remove(ctx, next) {
        let userId = ctx.state.user;
        let articleId = ctx.params.id;

        await articleDao.remove(userId, articleId);

        ctx.status = 204;
        ctx.body = 'No Content'
    }

    async modify(ctx, next) {
        let articleId = ctx.params.id;
        let req = ctx.request.body;

        if (tool.isBlank(req.title)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 title');

        let article = {
            id: articleId,
            title: req.title,
            content: req.content
        }

        await articleDao.modify(article);

        let result =  await articleDao.get(articleId);
        let tags =  await tagDao.getByArticleId(articleId);
        result.tags = tags;
        ctx.body = result;
    }

    async getById(ctx, next) {
        let articleId = ctx.params.id;
        let article =  await articleDao.get(articleId);
        let tags =  await tagDao.getByArticleId(articleId);
        article.tags = tags;
        ctx.body = article;
    }

    async getListByUserId(ctx, next) {
        let userId = ctx.params.user_id;
        let currentPage = ctx.header['x-current-page'] ? +ctx.header['x-current-page'] : 1;
        let pageSize = ctx.header['x-page-size'] ? +ctx.header['x-page-size'] : 10;
        let page = (currentPage - 1) * pageSize;

        let result = await articleDao.getByUserId(userId, page, pageSize);
        ctx.body = result;
    }

    async getList(ctx, next) {
        // let currentPage = ctx.header['x-current-page'] ? +ctx.header['x-current-page'] : 1;
        // let pageSize = ctx.header['x-page-size'] ? +ctx.header['x-page-size'] : 10;
        // let page = (currentPage - 1) * pageSize;

        // let title = ctx.query.title || '';

        // let result = await articleDao.getList(title, page, pageSize);
        // ctx.body = result;

        ctx.body = [
            {
                "id":"xxxxxxxxxxxxxxxx",
                "user_id":"xxxxxxxxxxxxxxxx",
                "nick_name":"xxxxxxxxxxxxxxxx",
                "title":"ttttt",
                "content":"xxxxxxxxxxxxxxxx",
                "tags":[],
                "reprint_count":10,
                "read_count":10,
                "comment_count":10,
                "praise_count":10,
                "create_at": "",
                "update_at": ""
            }
        ]
    }

    async getByTags(ctx, next) {
        let currentPage = ctx.header['x-current-page'] ? +ctx.header['x-current-page'] : 1;
        let pageSize = ctx.header['x-page-size'] ? +ctx.header['x-page-size'] : 10;
        let page = (currentPage - 1) * pageSize;

        let tags = ctx.request.body.tags || [];

        let result = await articleDao.getByTags(tags, page, pageSize);

        ctx.body = result;
    }
}

module.exports = new ArticleController();