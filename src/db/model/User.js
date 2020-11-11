/**
 * @author Pork
 * @description 用户数据模型
 */

const seq = require('../seq')
const {
	STRING,
	DECIMAL,
	TEXT,
	INTEGER
} = require('../dataTypes')

const User = seq.define('user', {
	userName: {
		type: STRING,
		allowNull: false,
		unique: true, // 唯一性
		comment: '用户名'
	},
	email: {
		type: STRING,
		allowNull: false,
		comment: '邮箱'
	},
	password: {
		type: STRING,
		allowNull: false,
		comment: '密码'
	},
	nickName: {
		type: STRING,
		allowNull: true,
		comment: '昵称'
	},
	gender: {
		type: INTEGER,
		allowNull: true,
		defaultValue: 1, // 1: 男，2: 女
		comment: '性别'
	},
	avatarUrl: {
		type: STRING,
		allowNull: true,
		comment: '头像'
	},
	phoneNumber: {
		type: STRING,
		allowNull: true,
		comment: '手机号'
	},
	birthday: {
		type: STRING,
		allowNull: true,
		comment: '生日'
	},
	jobs: {
		type: STRING,
		allowNull: true,
		comment: '工作/技能'
	},
	articlesTotal: {
		type: INTEGER,
		allowNull: false,
		defaultValue: 0,
		comment: '文章总量'
	}
})

module.exports = User
