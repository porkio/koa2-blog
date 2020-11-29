/**
 * @author Pork
 * @description user service
 */

const { User } = require('../db/model/index')
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
        where: whereOpt,
    })

    if (!result) {
        return result
    }

    // 用户格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}

/**
 * @description 创建/注册 新用户
 * @param { Object[User] } User
 */
const createUser = async ({ userName, password, email, authLevel = 4, nickName, gender = 0 }) => {
    console.log(userName, password, email)
    const result = await User.create({
        userName,
        password,
        email,
        authLevel,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues
}

/**
 * @description 删除用户
 * @param {String} userName
 * @return Boolean
 */
const deleteUser = async userName => {
    const result = await User.destroy({
        where: {
            userName
        }
    })

    return result > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser
}
