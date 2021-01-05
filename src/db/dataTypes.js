/**
 * @author Pork
 * @description Sequelize 数据类型封装
 */

const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING, // varchar(255)
    INTEGER: Sequelize.INTEGER, // 整型
    DECIMAL: Sequelize.DECIMAL, // 小数
    TEXT: Sequelize.TEXT, // 文本
    DATE: Sequelize.DATE // 日期
}
