/**
* @author Pork
* @description 站点配置控制器 SiteConfig.js
* @created_at 2020/12/12
* @updated_at
*/

const { SiteConfig } = require('../db/model/index')
const {
    SuccessModel,
    FailedModel
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
 * @return {Promise}          [description]
 */
const updateConfig = async config => {
    const result = await SiteConfig.update(config, {
        where: {
            id: config.id
        }
    })
    if (result[0] > 0) {
        return new SuccessModel({ message: '设置成功' })
    }
    return new FailedModel(siteConfigurationFail)
}

/**
 * @description 浏览次数自增 1 次
 * @returns { Boolean }
 */
const incSiteViews = async () => {
    try {
        const site = await SiteConfig.findOne({
            where: {},
            attributes: ['id', 'views']
        })
        if (site) {
            const views = site.dataValues.views + 1
            const result = await SiteConfig.update({
                views: views
            }, {
                where: {
                    id: site.dataValues.id
                }
            })
            return result > 0
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getConfig,
    updateConfig,
    incSiteViews
}
