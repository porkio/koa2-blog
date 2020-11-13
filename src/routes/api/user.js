const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    // controller
    ctx.body = await isExist(userName)
})

router.get('/test', async (ctx, next) => {
    ctx.body = {
        userName: 'Pork',
        email: 'porksb@163.com'
    }
})

module.exports = router
