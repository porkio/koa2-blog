/**
 * @author Pork
 * @description 用户视图层相关路由
 */

const Router = require('@koa/router')
const router = new Router()
const noLoginRedirect = require('../../../middleware/noLoginRedirect')
const { getConfig } = require('../../../controller/SiteConfigController')
const { getCategories } = require('../../../controller/CategoryController')
const { getAllTags } = require('../../../controller/TagController')
const {
	getArticleList,
	getArticleById,
} = require('../../../controller/ArticleController')

router.prefix('/manager')

// 管理器仪表板
router.get('/', noLoginRedirect, async (ctx, next) => {
	await ctx.render('manager/index', {
		title: '后台首页',
	})
})

// 站点配置
router.get('/configuration', noLoginRedirect, async (ctx, next) => {
	// controller
	const config = await getConfig()

	if (config) {
		config.title = '站点设置'
		await ctx.render('manager/configuration', config)
	}
})

// 分类管理
router.get('/categories', noLoginRedirect, async (ctx, next) => {
	// controller
	const catesList = await getCategories()
	const data = {
		pageInfo: {
			title: '分类管理',
		},
	}
	Object.assign(data, { catesList })
	await ctx.render('manager/categories', data)
})

// 新建文章
router.get('/writting', noLoginRedirect, async (ctx, next) => {
	const { id } = ctx.query
	// controller
	let article = {}
	if (id) {
		article = await getArticleById(id)
	}

	const catesList = await getCategories()
	let tags = await getAllTags()

	if (id && id == article.id) {
		// 此处是通过 id 编辑该文章
		const data = {
			pageInfo: {
				title: '编辑文章',
			},
		}

		Object.assign(data, { article, catesList, tags })
		await ctx.render('manager/writing', data)
		return
	}

	// 撰写新文章
	const data = {
		pageInfo: {
			title: '撰写文章',
		},
	}
	Object.assign(data, { article, catesList, tags })
	await ctx.render('manager/writing', data)
})

router.get('/upload', noLoginRedirect, async (ctx, next) => {
	await ctx.render('manager/upload', {
		title: '测试上传',
	})
})

// 后台管理文章
router.get('/articles', noLoginRedirect, async (ctx, next) => {
	// controller
	const articleList = await getArticleList(
		Object.assign(ctx.query, { manager: true })
	)

	const data = {
		pageInfo: {
			title: '管理文章',
		},
	}

	Object.assign(data, { articleList })
	await ctx.render('manager/articles', data)
})

module.exports = router
