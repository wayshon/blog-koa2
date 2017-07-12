const ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames'),
      tagDao = require("../dao/TagDao");

class TagController {

    async getList(ctx, next) {
        let currentPage = ctx.header['x-current-page'] ? +ctx.header['x-current-page'] : 1;
        let pageSize = ctx.header['x-page-size'] ? +ctx.header['x-page-size'] : 10;
        let page = (currentPage - 1) * pageSize;

        let result = await tagDao.getList(page, pageSize);
        ctx.body = result;
    }
}

module.exports = new TagController();