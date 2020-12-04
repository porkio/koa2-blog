/**
 * @author Pork
 * @description 后台管理器 controller
 * @created_at 2020/12/03
 */

const {
	SiteConfig,
	Category
} = require('../db/model/index')
const {
	SuccessModel,
	FailedModel,
	getCategoriesFail
} = require('../model/ResModel')
const { siteConfigurationFail } = require('../model/ErrorModel')

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
	const result = await Category.findAll()
	if (result) {
		let categoriesList = []
		result.forEach((item, index) => {
			categoriesList.push(item.dataValues)
		})
		return categoriesList
	}
	return new FailedModel(getCategoriesFail)
}

module.exports = {
    getConfig,
    updateConfig,
	getCategories,
}
