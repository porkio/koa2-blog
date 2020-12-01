/**
 * @author Pork
 * @description 用户视图层相关路由
 */

const router = require('koa-router')()
router.prefix('/manager')

router.get('/', async (ctx, next) => {
    if (!ctx.session.userInfo) {
        ctx.redirect('/login')
    }

    await ctx.render('manager/index', {
        title: '后台首页'
    })
})

module.exports = router
