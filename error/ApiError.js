/**
 * 自定义Api异常
 */

const emunError = {
    100: "未知错误",
    101: "用户不存在",
    102: "密码错误",
    103: "用户已存在",
    104: "参数错误",
}

class ApiError extends Error{
    //构造方法
    constructor({ code, msg }){
        super();

        this.name = 'ApiError';
        this.code = code;
        this.message = msg || emunError[code];
        
    }
}

module.exports = ApiError;