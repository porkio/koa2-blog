/**
 * @author Pork
 * @description Sequelize 数据类型封装
 */

const Sequelize = require('sequelize')

module.exports = {
	STRING: Sequelize.STRING, // varchar(255)
	INTEGER: Sequelize.INTEGER, // 整型
	BOOLEAN: Sequelize.BOOLEAN, // 布尔
	DECIMAL: Sequelize.DECIMAL, // 小数
	TEXT: Sequelize.TEXT // 文本
}
