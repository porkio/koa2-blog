const router = require('koa-router')()
const {
	updateConfig,
	updateCategory,
	createCategory,
	destroyCategory
} = require('../../controller/manager')
const noLoginRedirect = require('../../middleware/noLoginRedirect')
router.prefix('/api/manager')

// 设置站点配置信息
router.post('/setConfig', noLoginRedirect, async (ctx, next) => {
    // controller
    ctx.body = await updateConfig(ctx.request.body)
})

// 更新/编辑分类
router.post('/setCategory', noLoginRedirect, async (ctx, next) => {
	// controller
	ctx.body = await updateCategory(ctx.request.body)
})

// 添加/创建分类
router.post('/addCategory', noLoginRedirect, async (ctx, next) => {
	// controller

	ctx.body = await createCategory(ctx.request.body)
})

// 删除分类
router.post('/delCategory', async (ctx, next) => {
	const { id } = ctx.request.body
	ctx.body = await destroyCategory(id)
})

module.exports = router
