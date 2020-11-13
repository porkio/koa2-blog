/**
 * @author Pork
 * @description 数据格式化
 */

const { DEFAULT_AVATAR } = require('../conf/constant')
/**
 * @description 用户默认头像
 * @param { String } user 
 */
const _formatUserAvatarUrl = user => {
    !user.avatarUrl && (user.avatarUrl = DEFAULT_AVATAR)
    return user
}

/**
 * @description 批量或单个格式化用户
 * @param { Array | Object } list 用户数组或单个用户对象
 */
const formatUser = list => {
    if (!list) {
        return list
    }
    if (list instanceof Array) {
        // 数组 用户列表｜多个用户对象集合
        return list.map(_formatUserAvatarUrl)
    }
    // 单个用户（对象）
    return _formatUserAvatarUrl(list)
}

module.exports = {
    formatUser
}