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
        validate: {
            isEmail: true
        },
        allowNull: false,
        unique: true,
        comment: '邮箱'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    authLevel: {
        type: INTEGER,
        validate: {
            min: 0,
            max: 4
        },
        allowNull: false,
        defaultValue: 4, // 0: 超管， 1: 管理员， 2: 编辑， 3: 投稿者， 4: 普通用户
        comment: '权限等级'
    },
    nickName: {
        type: STRING,
        allowNull: true,
        comment: '昵称'
    },
    gender: {
        type: INTEGER,
        allowNull: true,
        validate: {
            min: 0,
            max: 2
        },
        defaultValue: 0, // 0: 保密 1: 男，2: 女
        comment: '性别'
    },
    age: {
        type: INTEGER,
        allowNull: true,
        comment: '年龄'
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
    },
    github: {
        type: STRING,
        allowNull: true,
        comment: 'github地址'
    }
})

module.exports = User
