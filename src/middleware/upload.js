/**
 * @description 图片上传中间件
 * @created_at 2020/12/18
 */
const multer = require('@koa/multer')
const path = require('path')
const randomStrGenerator = require('../utils/strRandom')

const storage = multer.diskStorage({
    // 图片存放路径
    destination: (req, file, cb) => {
        let fullPath = path.join(__dirname, '../public/uploads/')
        cb(null, fullPath)
    },
    // 修改文件名
    filename: (req, file, cb) => {
        const fileNameArr = file.originalname.split('.')
        cb(null, new Date().toISOString().split('T')[0] + '@' + randomStrGenerator(8) + '.' + fileNameArr[fileNameArr.length - 1])
    }
})

const upload = multer({
    storage
})
module.exports = upload

