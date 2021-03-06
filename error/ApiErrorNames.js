/**
 * API错误名称
 */
var ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = "unknowError";
ApiErrorNames.USER_NOT_EXIST = "userNotExist";
ApiErrorNames.PASSWORD_ERROR = "passwordError";
ApiErrorNames.USER_EXISTED = "userExisted";
ApiErrorNames.PARAMS_ERROR = "paramsError";

/**
 * API错误名称对应的错误信息
 */
const error_map = new Map();

error_map.set(ApiErrorNames.UNKNOW_ERROR, { code: 100, message: '未知错误' });
error_map.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: '用户不存在' });
error_map.set(ApiErrorNames.PASSWORD_ERROR, { code: 102, message: '密码错误' });
error_map.set(ApiErrorNames.USER_EXISTED, { code: 103, message: '用户已存在' });
error_map.set(ApiErrorNames.PARAMS_ERROR, { code: 104, message: '参数错误' });

//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (error_name) => {

    var error_info;

    if (error_name) {
        error_info = error_map.get(error_name);
    }

    //如果没有对应的错误信息，默认'未知错误'
    // if (!error_info) {
    //     error_name = UNKNOW_ERROR;
    //     error_info = error_map.get(error_name);
    // }

    return error_info;
}

module.exports = ApiErrorNames;