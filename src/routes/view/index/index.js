const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index/index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

router.get('*', async (ctx, next) => {
    await ctx.render('404', {
        title: '404 - 你好像迷路了...'
    })
})

module.exports = router
