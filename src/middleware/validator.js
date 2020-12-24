/**
 * @author Pork
 * @description json schema 数据校验中间件
 * @created_at 2020/11/15
 * @updated_at
 */

const { FailedModel } = require('../model/ResModel')
const { jsonSchemaError } = require('../model/ErrorModel')

/**
 * @description 生成 json schema 数据校验中间件
 * @param { Function } validateFn
 * @return Function
 */
const genValidator = validateFn => {
    return async (ctx, next) => {
        const data = ctx.request.body
        const err = validateFn(data)

        if (err) {
            const resBody = new FailedModel(jsonSchemaError)

            if (err.dataPath) {
                resBody.message = err.dataPath + ' ' + err.message
            } else {
                resBody.message = err.message
            }
            ctx.body = resBody
        } else {
            await next()
        }
    }
}

module.exports = genValidator
