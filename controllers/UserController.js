/*
crypto 是 Node.js 的一个核心模块，用它生成散列值来加密密码
*/
const crypto = require('crypto'),
      fs = require('fs'),
      ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames');

class UserController {

    constructor(d) {
        this.dao = d;
    }

    async regist(ctx, next) {
        console.log('------')
        let md5 = crypto.createHash('md5'),
            name = ctx.request.body.name,
            nickname = ctx.request.body.nickname,
            avatar = ctx.request.body.avatar,
            password = md5.update(ctx.request.body.password).digest('hex');

        try {
            console.log('======')
            let checkUsers = await this.dao.getByName(name);
            if (checkUsers.length > 0) throw new ApiError(ApiErrorNames.USER_EXISTED);
            let result = await this.dao.add(name, password, avatar, nickname);
            ctx.body = {
                userid: result.insertId
            };
        } catch (error) {
            console.log(error)
            if (error instanceof ApiError) 
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }

    async login(ctx, next) {
        let md5 = crypto.createHash('md5'),
            name = ctx.request.body.name,
            password = md5.update(ctx.request.body.password).digest('hex');

        try {
            let result = await this.dao.getByName(name);
            if (result == null) throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
            if (result[0].password != password) throw new ApiError(ApiErrorNames.PASSWORD_ERROR);
            ctx.body = result;
        } catch (error) {
            if (error instanceof ApiError) 
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }

    async getAllUser(ctx, next) {
        try {
            let result = await this.dao.getAll();
            ctx.body = result;
        } catch (error) {
            console.log(error)
            if (error instanceof ApiError) 
                throw error
            else
                throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }
}


module.exports = UserController;
