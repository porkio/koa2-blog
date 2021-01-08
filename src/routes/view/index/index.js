const router = require('koa-router')()
const { getArticleByLinkUrl, getArticleList } = require('../../../controller/ArticleController')

router.get('/', async (ctx, next) => {
    const { pageIndex, orderby, limit } = ctx.query
    // controller
    const articleList = await getArticleList(pageIndex, orderby, limit, true)
    const data = {
        pageInfo: {
            title: '首页'
        }
    }
    Object.assign(data, { articleList })
    await ctx.render('index/index', data)
})

// 短链接
router.get('/:link', async (ctx, next) => {
    const { link } = ctx.params
    const { pageIndex, orderby, limit } = ctx.query
    if (link === 'index') {
        const articleList = await getArticleList(pageIndex, orderby, limit, true)
        const data = {
            pageInfo: {
                title: '首页'
            }
        }
        Object.assign(data, { articleList })
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
    Object.assign(data, { article })
    await ctx.render('index/article.ejs', data)
})


module.exports = router
