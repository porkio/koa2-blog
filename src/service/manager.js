/**
 * @author Pork
 * @description 后台管理器 service
 * @created_at 2020/12/03
 */

/**
 * @description 分类列表数据格式化(分类排序以及统计分类下面的文章数量)
 * @param  {[type]}  catesList [description]
 * @return {Promise}           [description]
 */
const formatCategories = async (catesList) => {
	if (!catesList) {
		return
	}

 	const list = []

	const parentList = catesList.filter(item => !item.parentId)
	const childList = catesList.filter(item => item.parentId)

	parentList.forEach((item, index) => {
		item.articlesTotal = 0 // 统计分类下的文章数量
		list.push(item)
		childList.forEach(childCate => {
			if (childCate.parentId == item.id) {
				if (childCate.articles) {
					childCate.articlesTotal = childCate.articles.length
					item.articlesTotal += childCate.articles.length
				}
				list.push(childCate)
			}
		})
	})

	return list
}

module.exports = {
	formatCategories
}
