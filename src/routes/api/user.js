const router = require('koa-router')()
const {
    isExist,
    login,
    create
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middleware/validator')

router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    // controller
    const res = await isExist(userName)
    console.log(res)
    ctx.body = res
})

// 用户登陆
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    // controller
    ctx.body = await login(ctx, userName, password)
})

// 注册/创建 新用户
router.post('/create', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, email, gender } = ctx.request.body
    // controller
    const res = await create({
        userName,
        password,
        email,
        gender
    })
    ctx.body = res
})

router.get('/test', async (ctx, next) => {
    ctx.body = ctx.session.userInfo
})

module.exports = router
