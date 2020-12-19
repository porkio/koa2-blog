/**
 * @author Pork
 * @description 后台管理器 controller
 * @created_at 2020/12/03
 */

const { SuccessModel, FailedModel } = require("../model/ResModel")
const { uploadFilesFail } = require('../model/ErrorModel')

const updateArticleImg = async file => {
    console.log(file)
    let path
    if (file) {
        path = file.path
    }
    
    if (path) {
        path = '/' + path.slice(path.indexOf('upload'))
        return new SuccessModel({ message: '上传成功', data: { path } })
    }
    return new FailedModel(uploadFilesFail)
}

module.exports = {
    updateArticleImg
}
