const ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames'),
      articleDao = require("../dao/ArticleDao");

class ArticleController {

    async add(ctx, next) {
        ctx.body={
            msg: 'add'
        }
    }

    async remove(ctx, next) {
        ctx.body={
            msg: 'remove'
        }
    }

    async modify(ctx, next) {
        ctx.body={
            msg: 'modify'
        }
    }

    async getById(ctx, next) {
        ctx.body={
            msg: 'getById'
        }
    }

    async getListByUserId(ctx, next) {
        ctx.body={
            msg: 'getListByUserId'
        }
    }

    async getList(ctx, next) {
        let currentPage = ctx.header['X-Current-Page'] || 1;
        let pageSize = ctx.header['X-Page-Size'] || 10;

        try {
            let result = await articleDao.getList1(currentPage, pageSize);
            ctx.body = result;
        } catch(error) {
            // console.log(error)
            throw error
        }
    }
}

module.exports = new ArticleController();