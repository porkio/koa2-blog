/**
 * @author Pork
 * @description response 数据模型
 */

// 数据模型基础类型
class BaseModel {
    constructor({ errno, data, message }) {
        this.errno = errno
        data && (this.data = data)
        message && (this.message = message)
    }
}

// 成功的数据模型
class SuccessModel extends BaseModel {
    constructor(data = {}, message = 'Successfully') {
        super({
            errno: 0,
            data,
            message
        })
    }
}

// 失败的数据模型
class FailModel extends BaseModel {
    constructor({ errno, message = 'Failed' }) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    FailModel
}
