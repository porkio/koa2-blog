/**
 * @author Pork
 * @description 后台管理器 controller
 * @created_at 2020/12/03
 */

const {
	SiteConfig,
	Category,
	Article
} = require('../db/model/index')
const {
	SuccessModel,
	FailedModel,
	getCategoriesFail,
	updateCategoryFail,
	createCategoryFail,
	destroyCategoryFail
} = require('../model/ResModel')
const { siteConfigurationFail } = require('../model/ErrorModel')
const { formatCategories } = require('../service/manager')

/**
 * @description 获取网站配置信息
 * @return {Promise} [description]
 */
const getConfig = async () => {
    const config = await SiteConfig.findOne()
    if (config) {
        return config.dataValues
    }
}

/**
 * @description 更新站点配置
 * @param  {[Object]}  config [description]
 * @return {Promise}        [description]
 */
const updateConfig = async config => {
    const result = await SiteConfig.update(config, {
        where: {
            id: 1
        }
    })
    if (result[0] > 0) {
        return new SuccessModel({ message: '设置成功' })
    }
    return new FailedModel(siteConfigurationFail)
}

/**
 * @description 获取分类
 * @return {Promise} [description]
 */
const getCategories = async () => {
	const result = await Category.findAll({
		order: ['order'],
		include: [
			{
				association: Category.hasMany(Article, {})
			}
		]
	})
	if (result) {
		let categoriesList = []
		result.forEach((item, index) => {
			categoriesList.push(item.dataValues)
		})

		const catesList = await formatCategories(categoriesList)

		const data = {
			pageInfo: {
				title: '分类管理'
			}
		}
		Object.assign(data, { catesList: catesList })
		return data
	}
	return new FailedModel(getCategoriesFail)
}

/**
* @description 更新分类
* @param { Object } category
* @return  ResModel
*/
const updateCategory = async category => {
	const result = await Category.update({
		cateName: category.cateName,
		order: category.order,
		parentId: category.parentId == 0 ? null : category.parentId
	}, {
		where: {
			id: category.id
		}
	})
	if (result[0] > 0) {
		return new SuccessModel({ message: '编辑成功' })
	}
	return new FailedModel(updateCategoryFail)
}

/**
* @description 创建分类
* @param { Object } category
* @return
*/
const createCategory = async category => {
	const result = await Category.create({
		cateName: category.cateName,
		order: category.order,
		parentId: category.parentId == 0 ? null : category.parentId
	})
	if (result.dataValues.id) {
		return new SuccessModel({ message: '添加成功' })
	}
	return new FailedModel(createCategoryFail)
}

/**
* @description 删除分类
* @param { Integer } id
* @return  ResModel
*/
const destroyCategory = async id => {
	const result = await Category.destroy({
		where: {
			id: id
		}
	})
	if (result === 1) {
		return new SuccessModel({ message: '删除成功' })
	}
	return new FailedModel(destroyCategoryFail)
}

module.exports = {
    getConfig,
    updateConfig,
	getCategories,
	updateCategory,
	createCategory,
	destroyCategory
}
