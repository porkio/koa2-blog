/**
* @author Pork
* @description 云标签控制器 Tag.js
* @created_at 2020/12/12
* @updated_at
*/

const { Tag } = require('../db/model/index')
const {
    SuccessModel,
    FailedModel
} = require('../model/ResModel')
const { createTagFail } = require('../model/ErrorModel')

/**
* @description 获取所有云标签
* @param {  }
* @return Object Array
*/
const getAllTags = async () => {
    const result = await Tag.findAll({
        order: ['order']
    })
    const TagList = []
    if (result) {
        result.forEach(tag => TagList.push(tag.dataValues))
        return TagList
    }

    return null
}

/**
 * @description 创建云标签
 * @param { String } tagName
 */
const createTag = async (tagName, order) => {
    try {
        const result = await Tag.create({
            tagName,
            order
        })
        if (result.dataValues) {
            console.log(result.dataValues)
            return new SuccessModel({
                message: '添加成功',
                data: {
                    id: result.dataValues.id,
                    tagName: result.dataValues.tagName
                }
            })
        }
        return new FailedModel(createTagFail)

    } catch (error) {
        console.log(error)
        return new FailedModel(createTagFail)
    }
}

module.exports = {
    getAllTags,
    createTag
}
