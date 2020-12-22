/**
 * @author Pork
 * @description 文章控制器
 * @created_at 2020/12/20
 */

const { Article } = require('../db/model/index')
const { SuccessModel, FailedModel } = require('../model/ResModel')
const { createArticleFail } = require('../model/ErrorModel')

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
            return new SuccessModel({ message: '文章已发布'})
        }
        return new FailedModel(createArticleFail)
    } catch (error) {
        console.log(error)
        return new FailedModel(createArticleFail)
    }



}

module.exports = {
    createArticle
}
