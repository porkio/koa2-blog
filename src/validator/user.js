/**
 * @author Pork
 * @description user 数据校验
 * @created_at  2020/11/14
 * @updated_at
 */

const validate = require('./_validate')

// 校验规则
const USER_SCHEMA = {
    type: 'object',
    required: ['userName', 'password', 'email'], // 不能为空的字段
    properties: {
        userName: {
            type: 'string',
            pattern: '^[A-z][A-z0-9_]+$', // 字母开头，字母数字下划线
            maxLength: 16,
            minLength: 4
        },
        password: {
            type: 'string',
            pattern: '^(?=.*?[A-z])(?=.*?[0-9])', // 至少包含一个字母和一个数字
            maxLength: 16,
            minLength: 6
        },
        email: {
            type: 'string',
            pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', // 邮箱
            maxLength: 32,
            minLength: 4
        },
        gender: {
            type: 'number',
            minimum: 0,
            maximum: 2
        }
    }
}

/**
 * @description 校验用户数据的合法性
 * @params { Object } data 待校验的数据
 * @return ajv.errors | undefined
 */
const userValidate = (data = {}) => {
    return validate(USER_SCHEMA, data)
}

module.exports = userValidate
