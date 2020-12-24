/**
 * @description 文章数据校验
 * @author Pork
 * @created_at 2020/12/24
 */
const validate = require('./_validate')

const ARTICLE_SCHEMA = {
    type: 'object',
    required: ['title', 'content', 'linkUrl', 'categoryId'],
    properties: {
        title: {
            type: 'string',
            maxLength: 32,
            minLength: 2
        },
        linkUrl: {
            type: 'string',
            maxLength: 128
        },
        order: {
            type: 'number',
            minimum: 0
        },
        categoryId: {
            type: 'number',
            minimum: 0
        },
        content: {
            type: 'string',
            minLength: 8
        }
    }
}

/**
 * @description 校验文章数据的合法性
 * @params { Object } data 待校验的数据
 * @return ajv.errors | undefined
 */
const articleValidate = (data = {}) => {
    return validate(ARTICLE_SCHEMA, data)
}

module.exports = articleValidate
