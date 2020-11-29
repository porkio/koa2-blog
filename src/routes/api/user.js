const router = require('koa-router')()
const {
    isExist,
    login,
    create,
    destroy
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middleware/validator')
const { checkLogin } = require('../../middleware/checkLogin')
const { isSuperAdmin } = require('../../middleware/isSuperAdmin')
const { isTest } = require('../../utils/env')

router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    // controller
    ctx.body = await isExist(userName)
})

// 用户登陆
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    // controller
    ctx.body = await login(ctx, userName, password)
})

// 注册/创建 新用户
router.post('/create', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, email, authLevel, gender } = ctx.request.body
    // controller
    const res = await create({
        userName,
        password,
        email,
        authLevel,
        gender
    })
    ctx.body = res
})

// 删除用户
router.post('/delete', isSuperAdmin, async (ctx, next) => {
    const { userName } = ctx.request.body
    // controller
    ctx.body = await destroy(userName)
})

router.get('/test', checkLogin, async (ctx, next) => {
    ctx.body = ctx.session.userInfo
})

module.exports = router
