const router = require('koa-router')()
const { getArticleByLinkUrl, getArticleList, incArticleViews } = require('../../../controller/ArticleController')
const { getCategories } = require('../../../controller/CategoryController')
const { getAllTags } = require('../../../controller/TagController')
const { incSiteViews } = require('../../../controller/SiteConfigController')

router.get('/', async (ctx, next) => {
    const { pageIndex, orderby, limit } = ctx.query
    // controller
    const articleList = await getArticleList(pageIndex, orderby, limit, true)
    const categories = await getCategories()
    const tags = await getAllTags()

    const data = {
        page: {
            title: '首页'
        }
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
            title: '404 - 你好像迷路了...'
        })
        return
    }
    const data = {
        page: {
            title: article.title
        }
    }
    Object.assign(data, { article, categories })
    await ctx.render('index/article.ejs', data)
})


module.exports = router
