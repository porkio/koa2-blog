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

 	let list = []
	catesList.forEach((item, index) => {
		let article_total = 0
		if (!item.parentId) {
			list.push(item)
			catesList.forEach(cate => {
				if (item.id == cate.parentId) {
					if (cate.articles) {
						cate.articlesTotal = cate.articles.length
						article_total += cate.articles.length
					}
					list.push(cate)
				}
			})
			list[index].articlesTotal = article_total
		}
	})

	return list
}

module.exports = {
	formatCategories
}
