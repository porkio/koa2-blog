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
    order: {
        type: DECIMAL,
        allowNull: true,
        defaultValue: 100,
        comment: '排序'
    },
    articleId: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        commnet: '所属文章'
    }
})

module.exports = CloudTag
