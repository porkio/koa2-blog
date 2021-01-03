/**
 * @author Pork
 * @description 如果未登录，则保存当前url并跳转至登录页面，登录完成后跳回
 * @created_at 2020/12/02
 * @updated_at
 */

const noLoginRedirect = async (ctx, next) => {
    if (ctx.session.userInfo) {
        await next()
        return
    }
    const url = ctx.request.url
    ctx.redirect('/manager/login?url=' + url)
}

module.exports = noLoginRedirect
