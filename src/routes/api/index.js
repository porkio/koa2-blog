const Router = require('@koa/router')
const router = new Router()
router.prefix('/api/index')
const { incSiteViews } = require('../../controller/SiteConfigController')
const { incArticleLikes } = require('../../controller/ArticleController')

// 访问量 + 1
router.post('/incAppViews', async (ctx, next) => {
	const result = await incSiteViews()
	if (result) {
		ctx.body = {
			errno: 0,
			message: '',
		}
		return
	}
	ctx.body = {
		errno: -1,
		message: '访问量统计出错',
	}
})

// 文章点赞
router.post('/incArticleLikes', async (ctx, next) => {
	const result = await incArticleLikes(ctx.request.body.id)
	if (result) {
		ctx.body = {
			errno: 0,
			message: '点赞成功',
		}
		return
	}
	ctx.body = {
		errno: -1,
		message: '点赞失败',
	}
})

module.exports = router
