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

module.exports = {
	getAllCloudTags
}
