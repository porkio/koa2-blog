const router = require('koa-router')()
const {
	updateConfig,
	updateCategory,
	createCategory,
	destroyCategory
} = require('../../controller/Category')
const noLoginRedirect = require('../../middleware/noLoginRedirect')
const upload = require('../../middleware/upload')
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
	// 待解决： 假设分类下有文章，则禁止删除该分类
	const { id } = ctx.request.body
	ctx.body = await destroyCategory(id)
})

router.post('/upload', noLoginRedirect, upload.single('avatar'), async (ctx, next) => {
	const path = ctx.req.file.path
	const fileName = '/' + path.slice(path.indexOf('upload'))
	ctx.body = {
		errno: 0,
		fileName // 文件名
	}
})

module.exports = router
