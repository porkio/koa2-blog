/**
 * @author Pork
 * @description 文章控制器
 * @created_at 2020/12/20
 */

const { Article } = require('../db/model/index')
const { SuccessModel, FailedModel } = require('../model/ResModel')
const {
    createArticleFail,
    getArticleListFail
} = require('../model/ErrorModel')

/**
 * @description 文章发布
 * @param { Object } articleData
 * @return { Object } ResModel
 */
const createArticle = async articleData => {
    if (!articleData.title || !articleData.content) {
        return new FailedModel(createArticleFail)
    }
    try {
        const result = await Article.create(articleData)
        if (result.dataValues.id) {
            // 文章发布成功
            return new SuccessModel({ message: '文章已发布' })
        }
        return new FailedModel(createArticleFail)
    } catch (error) {
        console.log(error)
        return new FailedModel(createArticleFail)
    }
}

/**
 * @description 获取文章列表
 * @param { String } orderBy
 */
const getArticles = async (pageIndex, orderby, limit) => {
    !pageIndex && (pageIndex = 1)
    !limit && (limit = 6)

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
            attributes: ['id', 'title', 'linkUrl', 'showImgUrl', 'categoryId', 'order', 'views', 'likes', 'hidden', 'createdAt'],
            order: order,
            limit: limit,
            offset: offset
        })

        if (result.count > 0) {
            const pageTotal = Math.ceil(result.count / limit)
            const articleList = []
            result.rows.forEach(item => articleList.push(item.dataValues))
            articleList.pageTotal = pageTotal

            return articleList
        }
    } catch (error) {
        return new FailedModel(getArticleListFail)
    }
}

module.exports = {
    createArticle,
    getArticles
}
