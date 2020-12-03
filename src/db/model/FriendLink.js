/**
 * @author Pork
 * @description 友情链接模型
 * @created_at 2020/12/03
 * @updated_at
 */

const seq = require('../seq.js')
const {
    STRING,
    INTEGER,
    DECIMAL
} = require('../dataTypes')

const FriendLink = seq.define('friend_link', {
    linkTitle: {
        type: STRING,
        allowNull: false,
        comment: '链接名称'
    },
    linkUrl: {
        type: STRING,
        allowNull: false,
        comment: '链接地址'
    },
    order: {
        type: DECIMAL,
        allowNull: true,
        defaultValue: 100,
        comment: '排序'
    }
})

module.exports = FriendLink
