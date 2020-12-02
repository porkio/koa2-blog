/**
 * @author Pork
 * @description 用户视图层相关路由
 */

const noLoginRedirect = require('../../../middleware/noLoginRedirect')
const router = require('koa-router')()

router.prefix('/manager')

router.get('/', noLoginRedirect, async (ctx, next) => {
    await ctx.render('manager/index', {
        title: '后台首页'
    })
})

router.get('/configuration', noLoginRedirect, async (ctx, next) => {
    await ctx.render('manager/configuration', {
        title: '应用配置'
    })
})

module.exports = router
