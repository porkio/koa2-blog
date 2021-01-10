const router = require('koa-router')()
const { getArticleByLinkUrl, getArticleList } = require('../../../controller/ArticleController')
const { getCategories } = require('../../../controller/CategoryController')
const { getAllTags } = require('../../../controller/TagController')

router.get('/', async (ctx, next) => {
    const { pageIndex, orderby, limit } = ctx.query
    // controller
    const articleList = await getArticleList(pageIndex, orderby, limit, true)
    const categories = await getCategories()
    const tags = await getAllTags()
    const data = {
        pageInfo: {
            title: '首页'
        }
    }
    Object.assign(data, { articleList, categories, tags })
    await ctx.render('index/index', data)
})

// 短链接
router.get('/:link', async (ctx, next) => {
    const { link } = ctx.params
    const { pageIndex, orderby, limit } = ctx.query
    const categories = await getCategories()
    if (link === 'index') {
        const articleList = await getArticleList(pageIndex, orderby, limit, true)
        const tags = await getAllTags()
        const data = {
            pageInfo: {
                title: '首页'
            }
        }
        Object.assign(data, { articleList, categories, tags })
        await ctx.render('index/index', data)
        return
    }
    // controller
    const article = await getArticleByLinkUrl(link)

    if (article.errno) {
        console.log('迷路了...')
        await ctx.render('404', {
            title: '404 - 你好像迷路了...'
        })
        return
    }
    const data = {
        pageInfo: {
            title: article.title
        }
    }
    Object.assign(data, { article, categories })
    await ctx.render('index/article.ejs', data)
})


module.exports = router
