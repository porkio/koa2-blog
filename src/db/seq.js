/**
 * @description Sequelize ORM
 * @author Pork
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF

const conf = {
	host,
	dialect: 'mysql'
}

isProd && (conf.pool = {
	// 线上环境 连接池
	max: 5, // 最大连接数
	min: 0,
	idle: 10000 // 如果一个连接池10秒没有被使用 则自动释放
})

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
