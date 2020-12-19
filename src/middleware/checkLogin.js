/**
* @author Pork
* @description 验证登录状态中间件
* @created_at  2020/11/16
* @updated_at
*/

const { FailedModel } = require('../model/ResModel')
const { checkLoginFail } = require('../model/ErrorModel')
/**
 * @description api 校验是否登录
 * @param  {[Object]}   ctx  [description]
 * @param  {Function} next   [description]
 * @return {Promise}         [description]
 */
const checkLogin = async (ctx, next) => {
    if (ctx.session.userInfo) {
        await next()
        return
    }
    ctx.body = new FailedModel(checkLoginFail)
}

/**
 * @description 页面登录验证
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {Promise}       [description]
 */
const checkLoginRedirect = async (ctx, next) => {
    if (ctx.session.userInfo) {
        await next()
        return
    }
    // 记录登录之前访问的url，登录完成后跳转到这个url
    const currentUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(currentUrl))
}

module.exports = {
    checkLogin,
    checkLoginRedirect
}
