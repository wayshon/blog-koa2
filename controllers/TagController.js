const ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames'),
      tagDao = require("../dao/TagDao");

class TagController {

    async getList(ctx, next) {
        ctx.body={
            msg: 'getList'
        }
    }
}

module.exports = new TagController();