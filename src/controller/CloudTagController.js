/**
* @author Pork
* @description 云标签控制器 CloudTag.js
* @created_at 2020/12/12
* @updated_at
*/

const { CloudTag } = require('../db/model/index')
const {
	SuccessModel,
	FailedModel
} = require('../model/ResModel')
const { createCloudTagFail } = require('../model/ErrorModel')

/**
* @description 获取所有云标签
* @param {  }
* @return Object Array
*/
const getAllCloudTags = async () => {
	const result = await CloudTag.findAll({
		order: ['order']
	})
	const cloudTagList = []
	if (result) {
		result.forEach(tag => cloudTagList.push(tag.dataValues))
		return cloudTagList
	}

	return null
}

/**
 * @description 创建云标签
 * @param { String } tagName
 */
const createCloudTag = async (tagName, order) => {
    try {
        const result = await CloudTag.create({
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
        return new FailedModel(createCloudTagFail)

    } catch (error) {
        console.log(error)
        return new FailedModel(createCloudTagFail)
    }
}

module.exports = {
    getAllCloudTags,
    createCloudTag
}
