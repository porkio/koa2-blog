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

Article.belongsToMany(Tag, {
    through: {
        model: ArticleTag,
        unique: false
    },
    foreignKey: 'articleId',
    constraints: false
})

Tag.belongsToMany(Article, {
    through: {
        model: ArticleTag,
        unique: false
    },
    foreignKey: 'tagId',
    constraints: false
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
