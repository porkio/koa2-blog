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

const Tag = seq.define('tags', {
    tagName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '云标签'
    },
    order: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 100,
        comment: '排序'
    },
    categoryId: {
        type: INTEGER,
        allowNull: false,
        comment: '所属分类ID'
    }
})

module.exports = Tag
