const seq = require('../seq')
const {
    INTEGER,
    STRING,
    DECIMAL,
    BOOLEAN,
    TEXT
} = require('../dataTypes')
const Article = require('./Article')

const ArticleTag = seq.define('article_tag', {
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