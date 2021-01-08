const router = require('koa-router')()
const {
    updateCategory,
    createCategory,
    destroyCategory,
} = require('../../controller/CategoryController')
const { updateArticleImg } = require('../../controller/manager')
const { updateConfig } = require('../../controller/SiteConfigController')
const {
    createArticle,
    updateArticle,
    setPorpOfArticleById,
    destroyArticleById
} = require('../../controller/ArticleController')
const { createTag } = require('../../controller/TagController')
const noLoginRedirect = require('../../middleware/noLoginRedirect')
const upload = require('../../middleware/upload')
const genValidator = require('../../middleware/validator')
const articleValidate = require('../../validator/article')
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
    const { old_img } = ctx.request.body // 获取旧图片，准备删除
    // controller
    ctx.body = await updateArticleImg(ctx.request.file, old_img)
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
router.post('/addTag', noLoginRedirect, async (ctx, next) => {
    const { tagName, order, categoryId } = ctx.request.body
    // controller
    ctx.body = await createTag(tagName, order, categoryId)
})

// 通过文章 ID 更新文章属性
router.post('/setPropOfArticle', noLoginRedirect, async (ctx, next) => {
    const { id, prop, value } = ctx.request.body
    // controller
    ctx.body = await setPorpOfArticleById(id, prop, value)
})

// 通过 ID 删除文章
router.post('/delArticle', noLoginRedirect, async (ctx, next) => {
    const { id } = ctx.request.body
    // controller
    ctx.body = await destroyArticleById(id)
})

router.post('/updateArticle', noLoginRedirect, async (ctx, next) => {
    const { id, article } = ctx.request.body
    // controller
    ctx.body = await updateArticle(id, article)
})

module.exports = router
