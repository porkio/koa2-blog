const seq = require('./seq')
require('./model')

// 测试连接
seq.authenticate().then(() => console.log('Auth Ok.')).catch(e => console.log(e))

// 执行同步
seq.sync({
	force: true
}).then(() => {
	console.log('Sync Ok.')
	process.exit()
})
