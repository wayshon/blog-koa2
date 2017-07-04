const ApiError = require('../error/ApiError');

class ArticleController {
    constructor(d) {
        this.dao = d;
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
                throw new ApiError({code: -1, msg: '未知错误'});
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
                throw new ApiError({code: -1, msg: '未知错误'});
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
                throw new ApiError({code: -1, msg: '未知错误'});
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
                throw new ApiError({code: -1, msg: '未知错误'});
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
                throw new ApiError({code: -1, msg: '未知错误'});
        }
    }
}

module.exports = ArticleController;