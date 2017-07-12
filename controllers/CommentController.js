const ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames'),
      commentDao = require("../dao/CommentDao"),
      tool = require("../utils/Tools");

class CommentController {

    async add(ctx, next) {
        let userId = ctx.state.user;
        let articleId = ctx.params.article_id;

        let req = ctx.request.body;
        if (tool.isBlank(req.content)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 content');

        let comment = {
            userId,
            articleId,
            content: req.content,
        }

        let insertId = await commentDao.add(comment)
        let result =  await commentDao.get(insertId);

        ctx.body = result
    }

    async remove(ctx, next) {
        let userId = ctx.state.user;
        let id = ctx.params.id;

        await commentDao.remove(id, userId);

        ctx.status = 204;
        ctx.body = 'No Content'
    }

    async getList(ctx, next) {
        let articleId = ctx.params.article_id;
        let currentPage = ctx.header['x-current-page'] ? +ctx.header['x-current-page'] : 1;
        let pageSize = ctx.header['x-page-size'] ? +ctx.header['x-page-size'] : 10;
        let page = (currentPage - 1) * pageSize;

        let result = await commentDao.getList(articleId, page, pageSize);
        ctx.body = result;
    }
}

module.exports = new CommentController();