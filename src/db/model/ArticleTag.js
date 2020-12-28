const seq = require('../seq')
const {
    INTEGER,
    STRING,
    DECIMAL,
    TEXT
} = require('../dataTypes')

const ArticleTag = seq.define('article_tag', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    articleId: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        commnet: '文章id'
    },
    tagId: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        commnet: '标签id'
    }
})

module.exports = ArticleTag
