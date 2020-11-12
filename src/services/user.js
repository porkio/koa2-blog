/**
 * @author Pork
 * @description user service
 */

const User = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * @description 获取用户信息
 * @param { String } userName 
 * @param { String } password 
 */
const getUserInfo = async (userName, password) => {
    // 查询条件
    const whereOpt = {
        userName,
    }
    password && Object.assign(whereOpt, { password })

    // 查询
    const result = await User.findOne({
        // attributes: ['id', 'userName', 'email', 'nickName', 'avatarUrl']
        where: whereOpt
    })
    
    if (result == null) {
        return result
    }

    // 用户格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}

module.exports = {
    getUserInfo
}