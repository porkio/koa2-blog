/**
 * @author Pork
 * @description user controller
 * @created_at 2020/11/20
 */

const {
    getUserInfo,
    createUser,
    deleteUser
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
    loginFail,
    deleteUserFail,
    repeatAction
} = require('../model/ErrorModel')
const user = require('../services/user')

const strCrypto = require('../utils/cryp')

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
        return new SuccessModel({
            data: {
                userAvatar: userInfo.avatarUrl
            },
            message: '用户名已存在'
        })
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

    const userInfo = await getUserInfo(userName, password)
    if (!userInfo) {
        // 登录失败
        return new FailModel(loginFail)
    }
    // 登录成功
    if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
    } else {
        // 更新可能变更的用户信息
        Object.assign(ctx.session.userInfo, userInfo)
    }

    return new SuccessModel({ message: '登录成功' })
}

const logout = async ctx => {
    if (!ctx.session.userInfo) {
        return new FailModel(repeatAction)
    }
    ctx.session = null
    return new SuccessModel({
        data: {
            redirect: '/login'
        },
        message: 'Bey!'
    })
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

/**
 * @description 删除用户
 * @param {String} userName
 * @return
 */
const destroy = async userName => {
    // services
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel({ message: userName + ' 已被成功删除' })
    }

    return new FailModel(deleteUserFail)
}

module.exports = {
    isExist,
    login,
    logout,
    create,
    destroy
}
