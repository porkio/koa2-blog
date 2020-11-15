/**
 * @author Pork
 * @description json schema 数据校验中间件
 * @created_at 2020/11/15
 * @updated_at
 */

const { FailModel } = require('../model/ResModel')
const { jsonSchemaError } = require('../model/ErrorModel')

/**
 * @description 生成 json schema 数据校验中间件
 * @param { Function } validateFn
 * @return Function
 */
const genValidator = validateFn => {
    const validator = async (ctx, next) => {
        const data = ctx.request.body
        const err = validateFn(data)

        if (err) {
            const resBody = new FailModel(jsonSchemaError)
            resBody.message = err.message
            ctx.body = resBody
        } else {
            await next()
        }
    }
    return validator
}

module.exports = {
    genValidator
}
