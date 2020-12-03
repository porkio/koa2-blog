/**
 * @author Pork
 * @description 数据模型入口
 */

const User = require('./User')
const Article = require('./Article')
const SiteConfig = require('./SiteConfig')
const CloudTag = require('./CloudTag')
const Category = require('./Category')
const FriendLink = require('./FriendLink')

module.exports = {
    User,
    Article,
    SiteConfig,
    CloudTag,
    Category,
    FriendLink
}
