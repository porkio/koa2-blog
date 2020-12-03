/**
 * @author Pork
 * @description 分类模型
 * @created_at 2020/12/03
 * @updated_at
 */

const seq = require('../seq')
const {
    STRING,
    INTEGER,
    DECIMAL
} = require('../dataTypes')

const Category = seq.define('category', {
    cateName: {
        type: STRING,
        allowNull: false,
        comment: '分类名称'
    },
    order: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 100,
        comment: '排序'
    },
    parentId: { // 为空则说明是顶级分类
        type: DECIMAL,
        allowNull: true,
        comment: '父分类ID'
    }
})

module.exports = Category
