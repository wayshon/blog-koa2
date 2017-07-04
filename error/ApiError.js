const ApiErrorNames = require('./ApiErrorNames');

/**
 * 自定义Api异常
 * 如果传了name，就查找已定义好的错误类型，并且如果传了msg优先使用
 * 如果没传name，就是彻底自定义code和msg
 */
class ApiError extends Error{
    //构造方法
    constructor(name, msg, code){
        super();

        if (name !== undefined) {
            let error_info = ApiErrorNames.getErrorInfo(name);
            this.name = name;
            this.code = error_info.code;
            this.message = msg || error_info.message;
        } else {
            this.name = 'ApiError Custom';
            this.code = code;
            this.message = msg;
        }
    }
}

module.exports = ApiError;