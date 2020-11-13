/**
 * @author Pork
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, FailModel } = require('../model/ResModel')
const {
    userNameNotExist,
    paramsError
} = require('../model/ErrorInfo')

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

module.exports = {
    isExist
}
