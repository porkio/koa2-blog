const router = require('koa-router')()
const { updateConfig } = require('../../controller/manager')
const noLoginRedirect = require('../../middleware/noLoginRedirect')
router.prefix('/api/manager')

// 设置站点配置信息
router.post('/setConfig', noLoginRedirect, async (ctx, next) => {
    // controller
    ctx.body = await updateConfig(ctx.request.body)
})

// 更新分类信息
router.post('/setCategory', noLoginRedirect, async (ctx, next) => {
	// controller

	ctx.body = {
		errno: 0,
		msg: 'Ok edit.'
	}
})

// 添加分类信息
router.post('/addCategory', noLoginRedirect, async (ctx, next) => {
	// controller

	ctx.body = {
		errno: 0,
		msg: 'Ok add.'
	}
})

module.exports = router
