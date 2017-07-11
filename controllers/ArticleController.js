const ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames');

class ArticleController {
    constructor(d) {
        this.dao = d;
    }

    async getAll(ctx, next) {
        try {
            await this.dao.get();
            ctx.body = {
                msg: 'ok'
            }
        } catch(e) {
            console.log(e)
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }

    async addArticle(ctx, next) {
        let req = ctx.request.body;
        try {
            await this.dao.add({
                title: req.title,
                content: req.content,
                user_id: req.user_id
            });
            ctx.body = {
                result: 'add success!',
                errcode: 0,
            };
        } catch (e) {
            console.log(error);
            if (error instanceof ApiError)
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }

    async getArticleList(ctx, next) {
        try {
            let articleLit = await this.dao.getTitleList();
            articleLit.forEach(i => i.content = i.content.slice(0, 100));
            ctx.body = {
                data: articleLit,
                errcode: 0,
            };
        } catch (e) {
            console.log(error);
            if (error instanceof ApiError)
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }

    async getArticleDetail(ctx, next) {
        try {
            let result = await this.dao.getDetail({
                id: ctx.params.id
            });
            ctx.body = {
                data: result[0],
                errcode: 0,
            };
        } catch (e) {
            console.log(error);
            if (error instanceof ApiError)
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }

    async updateArticle(ctx, next) {
        try {
            let req = ctx.request.body;
            let article = {};
            req.title && (article['title'] = req.title);
            req.content && (article['content'] = req.content);
            let result = await this.dao.editById(article, ctx.params.id);
            console.log(result);
            ctx.body = {
                result: 'update success!',
                errcode: 0,
            };
        } catch (e) {
            console.log(error);
            if (error instanceof ApiError)
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }

    async deleteArticle(ctx, next) {
        try {
            let result = await this.dao.deletById(ctx.params.id);
            console.log(result);
            ctx.body = {
                result: 'delete success!',
                errcode: 0,
            };
        } catch (e) {
            console.log(error);
            if (error instanceof ApiError)
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }
}

module.exports = ArticleController;