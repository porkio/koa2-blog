/**
 * @author Pork
 * @description 后台管理器 service
 * @created_at 2020/12/03
 */

/**
 * @description 分类列表数据格式化
 * @param  {[type]}  catesList [description]
 * @return {Promise}           [description]
 */
const formatCategories = async (catesList) => {
	if (!catesList) {
		return
	}

 	let list = []
	catesList.forEach(item => {
		if (!item.parentId) {
			list.push(item)
			catesList.forEach(cate => {
				if (item.id == cate.parentId) {
					list.push(cate)
				}
			})
		}
	})

	return list
}

module.exports = {
	formatCategories
}
