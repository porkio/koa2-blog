const seq = require('../seq')
const {
    INTEGER,
    STRING,
    DECIMAL,
    BOOLEAN,
    TEXT
} = require('../dataTypes')

const Article = seq.define('article', {
    title: {
        type: STRING,
        allowNull: false,
        comment: '文章标题'
    },
    content: {
        type: TEXT,
        alowNull: false,
        comment: '文章内容'
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
    views: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '浏览次数'
    },
    likes: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '获赞次数'
    },
    tags: {
        type: STRING,
        allowNull: true,
        comment: '标签的id集合 1，2，3'
    }
})
