const seq = require('../seq')
const {
    INTEGER,
    STRING,
    DECIMAL,
    TEXT,
    DATE
} = require('../dataTypes')

const randomStrGenerator = require('../../utils/strRandom')

const Article = seq.define('article', {
    title: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '文章标题'
    },
    linkUrl: {
        type: STRING,
        allowNull: false,
        defaultValue: randomStrGenerator(8), // 8位随机字符串
        unique: true,
        comment: '链接地址'
    },
    content: {
        type: TEXT,
        alowNull: false,
        comment: '文章内容'
    },
    showImgUrl: {
        type: STRING,
        allowNull: true,
        defaultValue: '/images/default-article-img.jpg',
        comment: '文章展示图地址'
    },
    categoryId: {
        type: INTEGER,
        allowNull: false,
        comment: '所属分类的id'
    },
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '所属用户的id'
    },
    order: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 100,
        comment: '排序'
    },
    views: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: '浏览次数'
    },
    likes: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: '获赞次数'
    },
    hidden: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '是否隐藏'
    }
})

module.exports = Article
