/**
 * @author Pork
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, FailModel } = require('../model/ResModel')
const { userNameAllReadyExist } = require('../model/ErrorInfo')

/**
 * @description 判断用户名是否存在
 * @param { String } userName
 */
const isExist = async userName => {
    // 调用 services 层获取数据
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo)
    } else {
        // 不存在
        return new FailModel(userNameAllReadyExist)
    }
    // 统一返回格式
}

module.exports = {
    isExist
}
