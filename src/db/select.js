const { User, Blog } = require('./model')

!(async () => {
	const updateRes = await Blog.update({
		title: '这是第1篇文章'
	}, {
		where: {
			id: 1
		}
	})

	console.log(updateRes[0] > 0)
})()
