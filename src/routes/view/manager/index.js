/**
 * @author Pork
 * @description 用户视图层相关路由
 */

const noLoginRedirect = require('../../../middleware/noLoginRedirect')
const router = require('koa-router')()
const {
	getConfig,
	getCategories
} = require('../../../controller/manager')

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
	const catesData = await getCategories()
    await ctx.render('manager/categories', catesData)
})

// 新建文章
router.get('/writing', noLoginRedirect, async (ctx, next) => {
	// controller

	await ctx.render('manager/writing', {
		pageInfo: {
			title: '撰写文章'
		}
	})
})


module.exports = router
