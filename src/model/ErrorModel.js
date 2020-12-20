/**
 * @author Pork
 * @description 失败信息集合 errno, message
 * @created_at 2020/11/13
 * @updated_at
 */

module.exports = {
    paramsError: {
        errno: 20005,
        message: '缺少必要的参数'
    },
    userNameAllReadyExist: {
        errno: 40001,
        message: '用户名已存在'
    },
    userNameNotExist: {
        errno: 40002,
        message: '用户名不存在'
    },
    loginFail: {
        errno: 40003,
        message: '用户名或密码错误'
    },
    checkLoginFail: {
        errno: 40004,
        message: '未登陆'
    },
    createUserFail: {
        errno: 40005,
        message: '创建用户失败'
    },
    deleteUserFail: {
        errno: 40006,
        message: '删除用户失败'
    },
    siteConfigurationFail: {
        errno: 40007,
        message: '站点配置更新失败'
    },
	getCategoriesFail: {
		errno: 40008,
		message: '获取分类失败'
	},
	updateCategoryFail: {
		errno: 40009,
		message: '分类编辑失败'
	},
	createCategoryFail: {
		errno: 40010,
		message: '分类创建失败'
	},
	destroyCategoryFail: {
		errno: 40011,
		message: '分类删除失败'
    },
    uploadFilesFail: {
        errno: 40012,
        message: '上传失败了'
    },
    createArticleFail: {
        errno: 40013,
        message: '文章发布失败了'
    },
    repeatAction: {
        errno: 10002,
        message: '重复的操作'
    },
    jsonSchemaError: {
        errno: 20001,
        message: '数据校验未通过'
    },
    authLevelFail: {
        errno: 30002,
        message: '权限不足'
    }
}
