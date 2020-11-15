/**
 * @author Pork
 * @description 失败信息集合 errno, message
 * @created_at 2020/11/13
 * @updated_at
 */

module.exports = {
    paramsError: {
        errno: 20005,
        message: '缺少必要的参数'
    },
    userNameAllReadyExist: {
        errno: 40001,
        message: '用户名已存在'
    },
    userNameNotExist: {
        errno: 40002,
        message: '用户名不存在'
    },
    loginFail: {
        errno: 40003,
        message: '用户名或密码错误'
    },
    checkLoginFail: {
        errno: 40004,
        message: '未登陆'
    },
    jsonSchemaError: {
        errno: 20001,
        message: '数据校验未通过'
    }
}
