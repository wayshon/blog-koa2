/*
crypto 是 Node.js 的一个核心模块，用它生成散列值来加密密码
*/
const crypto = require('crypto'),
      fs = require('fs'),
      userDao = require('../dao/UserDao'),
      ApiError = require('../error/ApiError'),
      ApiErrorNames = require('../error/ApiErrorNames');

class UserController {
    // getAllUser(ctx, next) {
    //     userDao.getAllUser((err, result) => {
    //         if (err) {
    //             throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
    //         }
    //         console.log('================')
    //         console.log(result)
    //         ctx.body = result;
    //     })
    //     console.log('-------------------')
    // }

    async regist(ctx, next) {
        let name = ctx.request.body.name,
            nickname = ctx.request.body.nickname,
            avatar = ctx.request.body.avatar || "",
            md5 = crypto.createHash('md5'),
            password = md5.update(ctx.request.body.password).digest('hex');

        try {
            let checkUsers = await userDao.getByName(name);
            if (checkUsers.length > 0) throw new ApiError(ApiErrorNames.USER_EXISTED);
            let result = await userDao.add(name, password, avatar, nickname);
            ctx.body = {
                userid: result.insertId
            };
        } catch (error) {
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
            let result = await userDao.getByName(name);
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
            let result = await userDao.getAll();
            ctx.body = result;
        } catch (error) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }
    }
}


module.exports = new UserController();
