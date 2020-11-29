/**
 * @author Pork
 * @description 是否为超管中间件
 * @created_at 2020/11/28
 * @updated_at
 */

const { FailModel } = require('../model/ResModel')
const { authLevelFail } = require('../model/ErrorModel')

/**
 * @description 验证是否为超管
 * @param {ctx, next}
 * @return Boolean
 */
const isSuperAdmin = async (ctx, next) => {
    if (ctx.session.userInfo.authLevel === 0) {
        await next()
        return
    }

    ctx.body = new FailModel(authLevelFail)
}

module.exports = {
    isSuperAdmin
}
