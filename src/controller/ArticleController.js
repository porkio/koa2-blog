/**
 * @author Pork
 * @description 文章控制器
 * @created_at 2020/12/20
 */

const { Article, Tag, ArticleTag, Category } = require('../db/model/index')

const { SuccessModel, FailedModel } = require('../model/ResModel')
const {
    createArticleFail,
    getArticleListFail,
    updatePropOfArticleFail,
    destroyArticleFail,
    getSingleArticleFail,
    paramsError,
    updateArticleFail
} = require('../model/ErrorModel')

/**
 * @description 文章发布
 * @param { Object } articleData
 * @return { Object } ResModel
 */
const createArticle = async articleData => {
    if (!articleData.title || !articleData.content) {
        return new FailedModel(paramsError)
    }

    try {
        const article = await Article.create(articleData)
        if (article.dataValues.id) {
            // 文章发布成功 创建云标签关联关系
            const tags = articleData.tagIds
            const res = await article.setTags(tags)
            if (res[0]) {
                return new SuccessModel({ message: '文章已发布' })
            }
        }
        return new FailedModel(createArticleFail)
    } catch (error) {
        console.log(error)
        return new FailedModel(createArticleFail)
    }
}

/**
 * @description 更新文章
 * @param { Object } articleData
 * @return ResModel
 */
const updateArticle = async (id, articleData) => {
    if (!id || !articleData.title || !articleData.content) {
        return new FailedModel(paramsError)
    }

    try {
        const result = await Article.update(articleData, {
            where: { id }
        })
        const tags = articleData.tagIds
        const article = await Article.findOne({
            where: { id }
        })
        const res = await article.setTags(tags)
        if (result > 0) {
            return new SuccessModel({ message: '文章已更新' })
        }
        return new FailedModel(updateArticleFail)
    } catch (error) {
        console.log(error)
        return new FailedModel(updateArticleFail)
    }
}

/**
 * @description 获取文章列表
 * @param { String } orderBy
 */
const getArticleList = async (pageIndex, orderby, limit) => {
    !pageIndex && (pageIndex = 1)
    !limit && (limit = 7) // 分页 每页7条数据

    let order
    switch (orderby) {
        case undefined:
            order = [['order']]
            break
        case 'order':
            order = [['order']]
            break
        default:
            order = [[orderby, 'desc']]
    }

    let offset = 0 + (pageIndex - 1) * limit
    try {
        const result = await Article.findAndCountAll({
            where: {},
            include: [{
                model: Category,
                attributes: ['id', 'cateName']
            }],
            attributes: ['id', 'title', 'linkUrl', 'showImgUrl', 'categoryId', 'order', 'views', 'likes', 'hidden', 'createdAt'],
            order: order,
            limit: limit,
            offset: offset
        })

        if (result.count > 0) {
            const pageTotal = Math.ceil(result.count / limit)
            const articleList = []
            result.rows.forEach(item => {
                item.dataValues.cateName = item.category.cateName
                articleList.push(item.dataValues)
            })

            articleList.pageTotal = pageTotal

            return articleList
        }
    } catch (error) {
        return new FailedModel(getArticleListFail)
    }
}

/**
 * @description 通过 id 获取文章数据
 * @param { Number } id
 */
const getArticleById = async id => {
    if (!id) return new FailedModel(paramsError)
    try {
        const article = await Article.findOne({
            where: { id },
            include: [{
                model: Tag,
                attributes: ['id', 'tagName'],
                through: {
                    attributes: [],
                },
            }]
        })
        const data = article.dataValues
        const tagIds = []

        data.tags.forEach(tag => {
            tagIds.push(tag.id)
        })

        Object.assign(data, { tagIds })

        return data
    } catch (error) {
        console.log(error)
        return new FailedModel(getSingleArticleFail)
    }
}

/**
 * @description 通过链接获取文章
 * @param { String } link
 */
const getArticleByLinkUrl = async link => {
    if (!link) {
        return new FailedModel(paramsError)
    }
    try {
        const article = await Article.findOne({
            where: { linkUrl: link },
            include: [{
                model: Tag,
                attributes: ['id', 'tagName']
            }]
        })
        if (article) {
            return article.dataValues
        }
        return new FailedModel(getSingleArticleFail)
    } catch (error) {
        console.log('err: ... ', error)
        return new FailedModel(getSingleArticleFail)
    }
}

/**
 * @description 通过 id 设置属性值
 * @param { Number } id
 * @param { String } prop
 * @param { String } value
 * @return ResModel
 */
const setPorpOfArticleById = async (id, prop, value) => {
    if (!id || !prop || value == undefined) return new FailedModel(paramsError)

    try {
        const result = await Article.update({
            [prop]: value
        }, {
            where: { id }
        })
        if (result > 0) {
            return new SuccessModel({ message: 'Success', data: { prop: value } })
        }
        return new FailedModel(updatePropOfArticleFail)
    } catch (error) {
        console.log(error)
        return new FailedModel(updatePropOfArticleFail)
    }
}

/**
 * @description 通过 id 删除文章
 * @param { Number } id
 */
const destroyArticleById = async id => {
    if (!id) return new FailedModel(paramsError)
    try {
        const result = await Article.destroy({
            where: { id }
        })
        if (result > 0) {
            return new SuccessModel({ message: '删除成功' })
        }
        return new FailedModel(destroyArticleFail)
    } catch (error) {
        return new FailedModel(destroyArticleFail)
    }
}

module.exports = {
    createArticle,
    updateArticle,
    getArticleList,
    setPorpOfArticleById,
    destroyArticleById,
    getArticleById,
    getArticleByLinkUrl
}
