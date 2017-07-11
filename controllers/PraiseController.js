const ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames'),
      praiseDao = require("../dao/PraiseDao");

class PraiseController {

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

    async getList(ctx, next) {
        ctx.body={
            msg: 'getList'
        }
    }
}

module.exports = new PraiseController();