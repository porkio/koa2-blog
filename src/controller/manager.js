/**
 * @author Pork
 * @description 后台管理器 controller
 * @created_at 2020/12/03
 */

const { SiteConfig } = require('../db/model/index')

const getConfig = async () => {
    const config = await SiteConfig.findOne({})
    if (config) {
        return config.dataValues
    }
    return null
}

module.exports = {
    getConfig
}
