/**
 * @author Pork
 * @description 应用配置模型
 * @created_at 2020/12/02
 */

const seq = require('../seq')
const {
    STRING,
    DECIMAL,
    TEXT,
    INTEGER
} = require('../dataTypes')

const SiteConfig = seq.define('site_config', {
    siteTitle: {
        type: STRING,
        allowNull: false,
        defaultValue: '猪肉王子的博客',
        comment: '网站/应用标题'
    },
    subTitle: {
        type: STRING,
        allowNull: true,
        comment: '副标题'
    },
    domain: {
        type: STRING,
        allowNull: false,
        defaultValue: 'i99.work',
        comment: '域名'
    },
    views: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: '浏览总量'
    },
    icp: {
        type: STRING,
        allowNull: true,
        comment: 'ICP备案信息'
    },
    copyRight: {
        type: STRING,
        allowNull: true,
        comment: '版权信息'
    },
    theme: {
        type: STRING,
        allowNull: true,
        defaultValue: 'default',
        comment: '主题'
    }
})

module.exports = SiteConfig
