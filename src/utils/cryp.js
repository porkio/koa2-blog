/**
 * @author Pork
 * @description 密码加密
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * @description md5 加密
 * @param { String } content 
 */
const _md5 = content => {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * @description 字符串加密
 * @param { String } content 
 */
const strCrypto = content => {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = {
    strCrypto
}