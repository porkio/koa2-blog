const router = require('koa-router')()
const {
    isExist,
    create
} = require('../../controller/user')

router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    // controller
    ctx.body = await isExist(userName)
})

// 注册/创建 新用户
router.post('/create', async (ctx, next) => {
    const { userName, password, email } = ctx.request.body
    // controller 
    ctx.body = await create({
        userName,
        password,
        email
    })
})

router.get('/test', async (ctx, next) => {
    ctx.body = {
        userName: 'Pork',
        email: 'porksb@163.com'
    }
})

module.exports = router
