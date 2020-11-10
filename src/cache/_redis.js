/**
 * @author Pork
 * @description 连接 redis 的方法
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
    console.log('RedisClient error: ', err)
})

/**
 * @description redis set
 * @param { String } key 
 * @param { String } value 
 * @param { Number } timeout 
 */
const set = (key, value, timeout = 3600) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value)
    redisClient.expire(key, timeout)
}

/**
 * @description redis get
 * @param { String } key 
 */
const get = key => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err) {
                reject(err)
                return null
            }
            if (value == null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(value)
                )
            } catch (ex) {
                resolve(value)
            }
        })
    })
}

module.exports = {
    set,
    get
}
