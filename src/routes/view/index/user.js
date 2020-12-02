/**
 * @author Pork
 * @description 用户视图层相关路由
 */

const router = require('koa-router')()

router.get('/login', async (ctx, next) => {
    if (ctx.session.userInfo) {
        // 如果已登陆则直接返回首页
        ctx.redirect('/')
    }
    await ctx.render('manager/login', {
        title: '管理员登陆'
    })
})

module.exports = router
