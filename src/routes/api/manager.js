const router = require('koa-router')()
const {
	updateCategory,
	createCategory,
	destroyCategory
} = require('../../controller/Category')
const { updateConfig } = require('../../controller/SiteConfig')
const noLoginRedirect = require('../../middleware/noLoginRedirect')
const upload = require('../../middleware/upload')
const { updateArticleImg } = require('../../controller/manager')
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

router.post('/changeArticleImg', noLoginRedirect, upload.single('avatar'), async (ctx, next) => {
    // controller
    ctx.body = await updateArticleImg(ctx.req.file)
})

module.exports = router
