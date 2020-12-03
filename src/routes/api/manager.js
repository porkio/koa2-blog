const router = require('koa-router')()

const { checkLogin } = require('../../middleware/checkLogin')
const { isSuperAdmin } = require('../../middleware/isSuperAdmin')
const { isTest } = require('../../utils/env')

router.prefix('/api/manager')

router.post('/setConfig', async (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = {
        errno: 0,
        message: '设置成功'
    }
})




module.exports = router
