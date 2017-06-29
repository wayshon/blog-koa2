/*
crypto 是 Node.js 的一个核心模块，用它生成散列值来加密密码
*/
const crypto = require('crypto'),
      ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames');

const jwt = require("jsonwebtoken"),
      config = require("../config");

class UserController {

    constructor(d) {
        this.dao = d;
    }

    async regist(ctx, next) {
        let md5 = crypto.createHash('md5'),
            name = ctx.request.body.name,
            nickname = ctx.request.body.nickname,
            avatar = ctx.request.body.avatar,
            password = md5.update(ctx.request.body.password).digest('hex');

        try {
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
            username = ctx.request.body.username,
            password = md5.update(ctx.request.body.password).digest('hex');
        
        try {
            let result = await this.dao.getByName(username);
            if (result == null) throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
            if (result[0].password != password) throw new ApiError(ApiErrorNames.PASSWORD_ERROR);
            
            let authToken = jwt.sign({
                user: 6666,
                exp: new Date().getTime() + 1000 * 60 * 60 * 24, //1天
            }, config.jwtSecret);

            ctx.body = {
                token: authToken
            }
        } catch (error) {
            console.log(error)
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
