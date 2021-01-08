/**
 * @author Pork
 * @description 数据模型入口
 */

const User = require('./User')
const Article = require('./Article')
const ArticleTag = require('./ArticleTag')
const SiteConfig = require('./SiteConfig')
const Tag = require('./Tag')
const Category = require('./Category')
const FriendLink = require('./FriendLink')

Article.belongsTo(User, {
    foreignKey: 'userId'
})

User.hasMany(Article)

Article.belongsTo(Category, {
    foreignKey: 'categoryId'
})

Category.hasMany(Article)

Tag.belongsTo(Category, {
    foreignKey: 'categoryId'
})

Category.hasMany(Tag)

Article.belongsToMany(Tag, {
    through: {
        model: ArticleTag,
        unique: false
    },
    foreignKey: 'articleId'
})

Tag.belongsToMany(Article, {
    through: {
        model: ArticleTag,
        unique: false
    },
    foreignKey: 'tagId'
})


module.exports = {
    User,
    Article,
    ArticleTag,
    SiteConfig,
    Tag,
    Category,
    FriendLink
}
