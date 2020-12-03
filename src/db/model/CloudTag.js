/**
 * @author Pork
 * @description 云标签模型
 * @created_at 2020/12/03
 * @updated_at
 */

const seq = require('../seq.js')
const {
    STRING,
    INTEGER,
    DECIMAL
} = require('../dataTypes')

const CloudTag = seq.define('cloud_tags', {
    tagName: {
        type: STRING,
        allowNull: false,
        comment: '云标签'
    },
    total: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '统计'
    },
    order: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 100,
        comment: '排序'
    },
    categoryId: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        commnet: '所属分类'
    }
})

module.exports = CloudTag
