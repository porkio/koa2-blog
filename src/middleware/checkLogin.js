/**
* @author Pork
* @description 验证登录状态中间件
* @created_at  2020/11/16
* @updated_at
*/

/**
 * @description 校验是否登录
 * @param  {[Object]}   ctx  [description]
 * @param  {Function} next   [description]
 * @return {Promise}         [description]
 */
const checkLogin = async (ctx, next) => {
    !ctx.session.userInfo && (ctx.body = {
        errno: -1,
        message: '未登录'
    })
    
    await next()
}

module.exports = {
    checkLogin
}
