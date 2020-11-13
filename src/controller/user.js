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
    createUserFail
} = require('../model/ErrorInfo')
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

// 注册/创建 新用户
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
        console.error(ex.message, ex.stack)
        return new FailModel(createUserFail)
    }
    
}

module.exports = {
    isExist,
    create
}
