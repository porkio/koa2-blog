/**
 * @description 图片上传中间件
 * @created_at 2020/12/18
 */
const multer = require('koa-multer')
const path = require('path')
const randomStrGenerator = require('../utils/strRandom')

const storage = multer.diskStorage({
	// 图片存放路径
	destination: (req, file, cb) => {
		console.log(req.body)
		let fullPath = path.join(__dirname, '../public/uploads/users/')
		const userName = 'Pork'
		cb(null, fullPath + userName + '/avatar')
	},
	// 修改文件名
	filename: (req, file, cb) => {
		const fileNameArr = file.originalname.split('.')
		cb(null, randomStrGenerator(12) + '.' + fileNameArr[fileNameArr.length - 1])
	}
})

const upload = multer({
	storage
})
module.exports = upload

