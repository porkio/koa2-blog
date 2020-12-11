/**
 * @author Pork
 * @description 用户视图层相关路由
 */

const router = require('koa-router')()
const noLoginRedirect = require('../../../middleware/noLoginRedirect')
const { getConfig } = require('../../../controller/SiteConfig')
const { getCategories } = require('../../../controller/Category.js')
const { getAllCloudTags } = require('../../../controller/CloudTag')

router.prefix('/manager')

// 管理器仪表板
router.get('/', noLoginRedirect, async (ctx, next) => {
    await ctx.render('manager/index', {
        title: '后台首页'
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
			title: '分类管理'
		}
	}
	Object.assign(data, { catesList })
    await ctx.render('manager/categories', data)
})

// 新建文章
router.get('/writing', noLoginRedirect, async (ctx, next) => {
	// controller
	const catesList = await getCategories()
	let cloudTagList = await getAllCloudTags()

	const data = {
		pageInfo: {
			title: '撰写文章'
		}
	}
	Object.assign(data, { catesList, cloudTagList })
	await ctx.render('manager/writing', data)
})


module.exports = router
