const router = require('koa-router')()
const { updateConfig } = require('../../controller/manager')
router.prefix('/api/manager')

router.post('/setConfig', async (ctx, next) => {
    // controller
    ctx.body = await updateConfig(ctx.request.body)
})




module.exports = router
