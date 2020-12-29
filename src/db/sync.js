/**
 * @description Sequelize 同步数据库
 * @author Pork
 */
const seq = require('./seq')
const {
    User,
    Article,
    ArticleTag,
    SiteConfig,
    Tag,
    Category,
} = require('./model/index')

const databaseInit = require('./databaseInit')

// 测试连接
seq.authenticate().then(() => console.log('Auth Ok.')).catch(e => console.log(e))

// 执行同步
seq.sync({ force: true }).then(async () => {
    console.log('Sync Ok.')
    await databaseInit() // 初始化数据库
    process.exit()
})
