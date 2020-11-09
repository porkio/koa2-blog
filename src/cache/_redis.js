/**
 * @author Pork
 * @description 连接 redis 的方法
 * @arguments []
 * @createdAt 2020/11/08
 * @updatedAt
 */
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

const path = require('path')

const test = (key, value) => {

}
