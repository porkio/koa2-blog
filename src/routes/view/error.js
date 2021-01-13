/**
 * @author Pork
 * @description 错误相关路由，一定要放在 app.js 路由最后的位置
 * @created_at 2020/12/02
 * @updated_at
 */
const router = require('koa-router')()
const { incSiteViews } = require('../../controller/SiteConfigController')

// 404
router.get('*', async (ctx, next) => {
    await incSiteViews()
    await ctx.render('404', {
        title: '404 - 你好像迷路了...'
    })
})

module.exports = router
