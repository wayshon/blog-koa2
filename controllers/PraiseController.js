const ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames'),
      praiseDao = require("../dao/PraiseDao");

class PraiseController {

    async add(ctx, next) {
        let userId = ctx.state.user;
        let articleId = ctx.params.article_id;

        let praise = {
            userId,
            articleId
        }

        await praiseDao.add(praise)
        let result =  await praiseDao.get(articleId, userId);
        ctx.body = result
    }

    async remove(ctx, next) {
        let userId = ctx.state.user;
        let articleId = ctx.params.article_id;

        await praiseDao.remove(articleId, userId);

        ctx.status = 204;
        ctx.body = 'No Content'
    }

    async getList(ctx, next) {
        let articleId = ctx.params.article_id;
        let currentPage = ctx.header['x-current-page'] ? +ctx.header['x-current-page'] : 1;
        let pageSize = ctx.header['x-page-size'] ? +ctx.header['x-page-size'] : 10;
        let page = (currentPage - 1) * pageSize;
        let result = await praiseDao.getList(articleId, page, pageSize);
        ctx.body = result;
    }

    async getByArticleId(ctx, next) {
        let userId = ctx.state.user;
        let articleId = ctx.params.article_id;

        let praise =  await praiseDao.get(articleId, userId);
        ctx.body = praise;
    }
}

module.exports = new PraiseController();