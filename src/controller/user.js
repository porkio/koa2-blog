/**
 * @author Pork
 * @description user controller
 */

const {
    getUserInfo,
    createUser
} = require('../services/user')
const {
    SuccessModel,
    FailModel
} = require('../model/ResModel')
const {
    userNameNotExist,
    userNameAllReadyExist,
    paramsError,
    createUserFail,
    loginFail
} = require('../model/ErrorModel')
const user = require('../services/user')

const { strCrypto } = require('../utils/cryp')

/**
 * @description 判断用户名是否存在
 * @param { String } userName
 */
const isExist = async userName => {
    if (!userName) {
        return new FailModel(paramsError)
    }
    // 调用 services 层获取数据
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo)
    } else {
        // 不存在
        return new FailModel(userNameNotExist)
    }
    // 统一返回格式
}

/**
 * @description 用户登录
 * @param  {[type]}  ctx        [description]
 * @param  { String }  userName [用户名]
 * @param  { String }  password [密码]
 * @return {Promise}            [description]
 */
const login = async (ctx, userName, password) => {
    // 登录成功后 ctx.session.userInfo = { ... }
    password = strCrypto(password)
    console.log(password)
    const userInfo = await getUserInfo(userName, password)
    if (!userInfo) {
        // 登录失败
        return new FailModel(loginFail)
    }
    // 登录成功
    if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
    }

    return new SuccessModel({ message: '登录成功' })
}

/**
 * @description  创建/注册新用户
 * @params { Object[User] }
 * @return ResModel 成功｜失败
 */
const create = async ({ userName, password, email }) => {
    const userInfo = await getUserInfo(userName)

    if (userInfo) {
        // 用户名已存在
        return new FailModel(userNameAllReadyExist)
    }

    // 注册 service 层
    try {
        const user = await createUser({
            userName,
            password: strCrypto(password),
            email
        })
        if (!user) {
            return new FailModel(createUserFail)
        }
        return new SuccessModel({ message: '创建用户成功' })
    } catch (ex) {
 		return new FailModel({
            errno: ex.parent.errno,
            message: ex.errors[0].message
        })
    }
}

module.exports = {
    isExist,
    login,
    create
}
