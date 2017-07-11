/*
crypto 是 Node.js 的一个核心模块，用它生成散列值来加密密码
*/
const crypto = require('crypto'),
      ApiError = require('../error/ApiError'),
      jwt = require("jsonwebtoken"),
      config = require("../config"),
      tool = require("../utils/Tools"),
      ApiErrorNames = require('../error/ApiErrorNames');

class UserController {

    constructor(d) {
        this.dao = d;
    }

    async regist(ctx, next) {
        let req = ctx.request.body;

        if (tool.isBlank(req.userName)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 userName');
        if (tool.isBlank(req.password)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 password');
        if (tool.isBlank(req.nickName)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 nickName');
        if (tool.isBlank(req.email)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 email');
        if (tool.isBlank(req.mobile)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 mobile');
        if (tool.isBlank(req.manager)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 manager');

        let userName = req.userName,
            md5 = crypto.createHash('md5'),
            password = md5.update(req.password).digest('hex'),
            nickName = req.nickName,
            email = req.email,
            mobile = req.mobile,
            avatar = req.avatar || '',
            manager = req.manager;
            
        let checkUsers = await this.dao.getByName(userName);
        if (checkUsers.length > 0) throw new ApiError(ApiErrorNames.USER_EXISTED);
        let result = await this.dao.add({userName,password,nickName,email,mobile,avatar,manager});

        ctx.body = {}
    }

    async login(ctx, next) {
        let req = ctx.request.body;

        if (tool.isBlank(req.userName)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 userName');
        if (tool.isBlank(req.password)) throw new ApiError(ApiErrorNames.PARAMS_ERROR, '缺少 password');

        let userName = req.userName,
            md5 = crypto.createHash('md5'),
            password = md5.update(req.password).digest('hex');
        
        let result = await this.dao.getByName(userName);
        if (result.length == 0) throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
        if (result[0].password != password) throw new ApiError(ApiErrorNames.PASSWORD_ERROR);
            
        let authToken = jwt.sign({
            user: result[0].id,
            exp: new Date().getTime() + 1000 * 60 * 60 * 24, //1天
        }, config.jwtSecret);

        ctx.body = {
            token: authToken
        }
    }

    async getAll(ctx, next) {
        let result = await this.dao.getAll();
        ctx.body = result
    }
}


module.exports = UserController;
