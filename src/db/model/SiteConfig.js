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
    title: {
        type: STRING,
        allowNull: false,
        defaultValue: '猪肉王子的博客',
        comment: '网站/应用标题'
    },
    subtitle: {
        type: STRING,
        allowNull: true,
        comment: '副标题'
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
    copyright: {
        type: STRING,
        allowNull: true,
        comment: '版权信息'
    },
    theme: {
        type: STRING,
        allowNull: true,
        comment: '主题'
    },
    friendLinks: {
        type: TEXT,
        allowNull: true,
        comment: '友情链接'
    },
})

module.exports = SiteConfig
