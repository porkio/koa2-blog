/**
* @author Pork
* @description 文章分类控制器 Category.js
* @created_at 2020/12/12
* @updated_at
*/

const {
    Article,
    Category
} = require('../db/model/index')
const {
    SuccessModel,
    FailedModel
} = require('../model/ResModel')
const {
    getCategoriesFail,
    updateCategoryFail,
    createCategoryFail,
    destroyCategoryFail
} = require('../model/ErrorModel')
const { formatCategories } = require('../service/manager')

/**
 * @description 获取分类
 * @return {Promise} [description]
 */
const getCategories = async () => {
    const result = await Category.findAll({
        order: ['order'],
        include: [{
            model: Article,
            attributes: ['id']
        }],
        distinct: true, // 去重，防止数量统计不准确
    })
    if (result) {
        let categoriesList = []
        result.forEach((item, index) => {
            categoriesList.push(item.dataValues)
        })

        const catesList = await formatCategories(categoriesList)
        console.log(catesList)
        return catesList
    }
    return new FailedModel(getCategoriesFail)
}

/**
* @description 更新分类
* @param { Object } category
* @return  ResModel
*/
const updateCategory = async category => {
    const result = await Category.update({
        cateName: category.cateName,
        order: category.order,
        cateLink: category.cateLink,
        parentId: category.parentId == 0 ? null : category.parentId
    }, {
        where: {
            id: category.id
        }
    })
    if (result[0] > 0) {
        return new SuccessModel({ message: '编辑成功' })
    }
    return new FailedModel(updateCategoryFail)
}

/**
* @description 创建分类
* @param { Object } category
* @return
*/
const createCategory = async category => {
    console.log(category)
    const result = await Category.create({
        cateName: category.cateName,
        order: category.order,
        cateLink: category.cateLink,
        parentId: category.parentId == 0 ? null : category.parentId
    })
    if (result.dataValues.id) {
        return new SuccessModel({ message: '添加成功' })
    }
    return new FailedModel(createCategoryFail)
}

/**
* @description 删除分类
* @param { Integer } id
* @return  ResModel
*/
const destroyCategory = async id => {
    const result = await Category.destroy({
        where: {
            id: id
        }
    })
    if (result === 1) {
        return new SuccessModel({ message: '删除成功' })
    }
    return new FailedModel(destroyCategoryFail)
}

module.exports = {
    getCategories,
    updateCategory,
    createCategory,
    destroyCategory
}
