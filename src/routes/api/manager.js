const router = require('koa-router')()
const {
    updateCategory,
    createCategory,
    destroyCategory,
} = require('../../controller/CategoryController')
const { updateArticleImg } = require('../../controller/manager');
const { updateConfig } = require('../../controller/SiteConfigController');
const { createArticle } = require('../../controller/ArticleController')
const { createCloudTag } = require('../../controller/CloudTagController')
const noLoginRedirect = require('../../middleware/noLoginRedirect');
const upload = require('../../middleware/upload');
const genValidator = require('../../middleware/validator');
const articleValidate = require('../../validator/article');
router.prefix('/api/manager')


// 设置站点配置信息
router.post('/setConfig', noLoginRedirect, async (ctx, next) => {
    // controller
    ctx.body = await updateConfig(ctx.request.body)
})

// 更新/编辑分类
router.post('/setCategory', noLoginRedirect, async (ctx, next) => {
    // controller
    ctx.body = await updateCategory(ctx.request.body)
})

// 添加/创建分类
router.post('/addCategory', noLoginRedirect, async (ctx, next) => {
    // controller
    ctx.body = await createCategory(ctx.request.body)
})

// 删除分类
router.post('/delCategory', async (ctx, next) => {
    // 待解决： 假设分类下有文章，则禁止删除该分类
    const { id } = ctx.request.body;
    ctx.body = await destroyCategory(id)
})

// 上传文章缩略图
router.post('/uploadArticleImg', noLoginRedirect, upload.single('article_img'), async (ctx, next) => {
    // controller
    ctx.body = await updateArticleImg(ctx.req.file)
})

// 发布文章
router.post('/publish', noLoginRedirect, genValidator(articleValidate), async (ctx, next) => {
    const data = ctx.request.body
    const userId = ctx.session.userInfo.id
    Object.assign(data, { userId })

    // controller
    ctx.body = await createArticle(data)
})

// 新增云标签
router.post('/addCloudTag', noLoginRedirect, async (ctx, next) => {
    const { tagName, order } = ctx.request.body
    // controller
    ctx.body = await createCloudTag(tagName, order)
})

module.exports = router
