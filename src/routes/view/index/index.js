const router = require('koa-router')()
const { getArticleByLinkUrl } = require('../../../controller/ArticleController')


router.get('/', async (ctx, next) => {
    await ctx.render('index/index', {
        title: '首页'
    })
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

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})


module.exports = router
