/**
 * @description Sequelize 同步数据库
 * @author Pork
 */
const seq = require('./seq')
const {
    User,
    Article,
    SiteConfig,
    CloudTag,
    Category
} = require('./model/index')

const databaseInit = require('./databaseInit')

Article.belongsTo(User, {
    foreignKey: 'userId'
})

User.hasMany(Article)

Article.belongsTo(Category, {
    foreignKey: 'categoryId'
})

Category.hasMany(Article)

CloudTag.belongsTo(Article, {
    foreignKey: 'articleId'
})

Article.hasMany(CloudTag)


// 测试连接
seq.authenticate().then(() => console.log('Auth Ok.')).catch(e => console.log(e))

// 执行同步
seq.sync({ force: true }).then(async () => {
    console.log('Sync Ok.')
    await databaseInit() // 初始化数据库
    process.exit()
})
