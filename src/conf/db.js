/**
 * @description 存储配置
 * @author Pork
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'koa2_blog',
    dialect: 'mysql'
}

// 线上环境的 redis 配置
isProd && (REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}) && (MYSQL_CONF = {
    // 线上 mysql 配置
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'koa2_blog',
    dialect: 'mysql'
})

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
