const router = require('koa-router')()

router.get('/', async (ctx, next) => {
	console.log(`before debugger`)
	debugger
	console.log(`after debugger`)

	await ctx.render('index', {
		title: 'Hello Koa 2!',
		isMe: true,
		blogList: [
			{
				id: 1,
				title: 'This is the first archive.'
			},
			{
				id: 2,
				title: 'This is the second archive.'
			},
			{
				id: 3,
				title: 'This is the third archive.'
			},
			{
				id: 4,
				title: 'This is the fourth archive.'
			}
		]
	})
})

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	}
})

module.exports = router
