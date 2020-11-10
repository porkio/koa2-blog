/**
 * @description Sequelize 同步数据库
 * @author Pork
 */
const seq = require('./seq')
require('./model/index')

// 测试连接
seq.authenticate().then(() => console.log('Auth Ok.')).catch(e => console.log(e))

// 执行同步
seq.sync().then(() => {
	console.log('Sync Ok.')
	process.exit()
})
