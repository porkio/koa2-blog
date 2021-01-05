const router = require('koa-router')()
const { getArticleByLinkUrl, getArticleList } = require('../../../controller/ArticleController')

router.get('/', async (ctx, next) => {
    const { pageIndex, orderby, limit } = ctx.query
    // controller
    const articleList = await getArticleList()
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
    console.log(link)
    if (link === 'index') {
        await ctx.render('index/index', {
            title: 'Hello Koa 2!'
        })
        return
    }
    // controller
    const data = await getArticleByLinkUrl(link)
    if (data.errno) {
        await ctx.render('404', {
            title: '404 - 你好像迷路了...'
        })
        return
    }
    await ctx.render('index/article.ejs', data)
})


module.exports = router
