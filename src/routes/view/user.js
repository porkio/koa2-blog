/**
 * @author Pork
 * @description 用户视图层相关路由
 */

const router = require('koa-router')()

router.get('/login', async (ctx, next) => {
	await ctx.render('login', {
		title: '管理员登陆'
	})
})

module.exports = router
