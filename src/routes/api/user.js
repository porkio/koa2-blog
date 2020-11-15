const router = require('koa-router')()
const {
    isExist,
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

router.post('/test', genValidator(userValidate), async (ctx, next) => {
    ctx.body = {
        userName: 'Pork',
        email: 'porksb@163.com'
    }
})

module.exports = router
