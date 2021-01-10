/**
* @author Pork
* @description 云标签控制器 Tag.js
* @created_at 2020/12/12
* @updated_at
*/

const { Tag, Category } = require('../db/model/index')
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
        order: ['order'],
        include: [{
            model: Category,
            attributes: ['id', 'cateName']
        }]
    })
    const tagList = []
    const cateMap = new Map()
    if (result) {
        result.forEach(tag => {
            tagList.push(tag.dataValues)
            cateMap.set(tag.dataValues.category.id, tag.dataValues.category.cateName)
        })

        return {
            tagList,
            cateMap
        }
    }
    return null
}

/**
 * @description 创建云标签
 * @param { String } tagName
 */
const createTag = async (tagName, order, categoryId) => {
    try {
        const result = await Tag.create({
            tagName,
            order,
            categoryId
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
