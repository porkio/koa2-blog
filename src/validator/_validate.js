/**
 * @author Pork
 * @description json schema 校验
 * @created_at  2020/11/14
 * @updated_at
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // 校验所有错误
})

/**
 * @description json schema 数据校验函数
 * @param { Object } schema json schema 规则
 * @param { Object } data 待校验的数据
 * @return ajv.errors | undefined
 */
const validate = (schema, data = {}) => {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0] // 返回第一个错误
    }
}

module.exports = validate
