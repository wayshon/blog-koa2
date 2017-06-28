/**
 * API错误名称
 */
let ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = "unknowError";
ApiErrorNames.USER_EXISTED = "userExisted";
ApiErrorNames.USER_NOT_EXIST = "userNotExist";
ApiErrorNames.PASSWORD_ERROR = "passwordError";

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
errorMap.set(ApiErrorNames.USER_EXISTED, { code: 500, message: '用户已存在' });
errorMap.set(ApiErrorNames.USER_NOT_EXIST, { code: 500, message: '用户不存在' });
errorMap.set(ApiErrorNames.PASSWORD_ERROR, { code: 500, message: '密码错误' });

//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (errorName) => {

    let errorInfo;

    if (errorName) {
        errorInfo = errorMap.get(errorName);
    }

    //如果没有对应的错误信息，默认'未知错误'
    if (!errorInfo) {
        errorName = UNKNOW_ERROR;
        errorInfo = errorMap.get(errorName);
    }

    return errorInfo;
}

module.exports = ApiErrorNames;