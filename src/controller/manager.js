/**
 * @author Pork
 * @description 后台管理器 controller
 * @created_at 2020/12/03
 */

const { SuccessModel, FailedModel } = require("../model/ResModel")
const {
    uploadFilesFail,
    fileTypeError,
    fileSizeError
} = require('../model/ErrorModel')
const path = require('path'), fs = require('fs')

/**
 * @description 更新文章图片
 * @param { File } file
 * @param { String } oldImg
 */
const updateArticleImg = async (file, oldImg) => {
    const fileTypes = ['jpg', 'jpeg', 'png', 'gif'] // 文件类型
    const currentType = file.mimetype.split('/')[1]
    const MAXSIZE = 2 * 1024 * 1000 // 最大体积 2MB
    if (fileTypes.indexOf(currentType) < 0) {
        deleteFile(path.join(__dirname, '../public/uploads/', file.filename))
        return new FailedModel(fileTypeError)
    }

    if (file.size > MAXSIZE) {
        deleteFile(path.join(__dirname, '../public/uploads/', file.filename))
        return new FailedModel(fileSizeError)
    }
    let filePath
    if (file) {
        filePath = file.path
    }

    if (filePath) {
        filePath = '/' + filePath.slice(filePath.indexOf('upload'))
        oldFile = path.join(__dirname, '../public/uploads/', oldImg)

        if (oldImg) {
            if (oldImg === 'default-article-img.jpg') return
            const delRes = deleteFile(oldFile)
            if (delRes.state === true)
                return new SuccessModel({ message: '上传成功', data: { filePath } })
        }
        return new SuccessModel({ message: '上传成功', data: { filePath } })
    }
    return new FailedModel(uploadFilesFail)
}

/**
 * @description 删除指定目录下的指定文件
 * @param { String } filePath 
 */
const deleteFile = filePath => {
    if (!fs.existsSync(filePath)) return { state: false, message: '文件不存在' }
    fs.unlinkSync(filePath)
    return { state: true, message: '删除成功' }
}

module.exports = {
    updateArticleImg
}
