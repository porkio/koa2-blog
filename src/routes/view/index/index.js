const Router = require('@koa/router')
const router = new Router()
const {
	getArticleByLinkUrl,
	getArticleList,
	incArticleViews,
} = require('../../../controller/ArticleController')
const { getCategories } = require('../../../controller/CategoryController')
const { getAllTags } = require('../../../controller/TagController')
const { incSiteViews } = require('../../../controller/SiteConfigController')

router.get('/', async (ctx, next) => {
	const { c } = ctx.query
	// controller
	if (c === 'about.me') {
		ctx.redirect('/resume')
	}

	const articleList = await getArticleList(ctx.query)
	if (articleList.errno) {
		await ctx.render('error', {
			page: {
				message: '该分类下还没有发布文章哦！',
			},
		})
		return
	}
	const categories = await getCategories()
	const tags = await getAllTags()

	const data = {
		page: {
			title: '首页',
		},
	}

	Object.assign(data, { articleList, categories, tags })
	await ctx.render('index/index', data)
})

// 短链接
router.get('/p/:link', async (ctx, next) => {
	const { link } = ctx.params
	const categories = await getCategories()

	// controller
	const article = await getArticleByLinkUrl(link)
	await incArticleViews(link) // 文章浏览次数自增 1 次

	if (article.errno) {
		await ctx.render('404', {
			title: '404 - 你好像迷路了...',
		})
		return
	}
	const data = {
		page: {
			title: article.title,
		},
	}
	Object.assign(data, { article, categories })
	await ctx.render('index/article.ejs', data)
})

module.exports = router
