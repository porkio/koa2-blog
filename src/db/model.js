const { Sequelize, DataTypes } = require('sequelize')
const seq = require('./seq')

// 创建用户模型 User 自动创建 users 表
const User = seq.define('user', {
  // 会自动创建 id 并设为主键且自增
	userName: {
		type: DataTypes.STRING, // varchar(255)
		allowNull: false,
		unique: true,
		comment: '用户名'
	},
	email: {
		type: DataTypes.STRING, // varchar(255)
		allowNull: false,
		unique: true,
		comment: '用户名'
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '密码'
	},
	nickName: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '昵称'
	}
})

// 创建博客模型 Blog 自动创建 blogs 表
const Blog = seq.define('blog', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '文章标题',
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
		comment: '文章正文'
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		comment: '所属用户的id'
	}
})

// 关联外键 (博客文章属于用户)
Blog.belongsTo(User, {
	foreignKey: 'userId'
})

// 一个用户可以有多个博客文章
User.hasMany(Blog, {
	foreignKey: 'userId'
})

module.exports = {
	User,
	Blog
}
