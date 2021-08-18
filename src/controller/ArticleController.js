/**
 * @author Pork
 * @description 文章控制器
 * @created_at 2020/12/20
 */

const { Article, Tag, Category } = require('../db/model/index')

const { SuccessModel, FailedModel } = require('../model/ResModel')
const {
	createArticleFail,
	getArticleListFail,
	updatePropOfArticleFail,
	destroyArticleFail,
	getSingleArticleFail,
	paramsError,
	updateArticleFail,
} = require('../model/ErrorModel')
const { Op } = require('sequelize')
const md = require('markdown-it')()

/**
 * @description 文章发布
 * @param { Object } articleData
 * @return { Object } ResModel
 */
const createArticle = async (articleData) => {
	if (!articleData.title || !articleData.content) {
		return new FailedModel(paramsError)
	}

	try {
		const article = await Article.create(articleData)
		if (article.dataValues.id) {
			// 文章发布成功 创建云标签关联关系
			const tags = articleData.tagIds
			const res = await article.setTags(tags)
			if (res[0]) {
				return new SuccessModel({ message: '文章已发布' })
			}
		}
		return new FailedModel(createArticleFail)
	} catch (error) {
		console.log(error)
		return new FailedModel(createArticleFail)
	}
}

/**
 * @description 更新文章
 * @param { Object } articleData
 * @return ResModel
 */
const updateArticle = async (id, articleData) => {
	if (!id || !articleData.title || !articleData.content) {
		return new FailedModel(paramsError)
	}

	try {
		const result = await Article.update(articleData, {
			where: { id },
		})
		const tags = articleData.tagIds
		const article = await Article.findOne({
			where: { id },
		})
		const res = await article.setTags(tags)
		if (result > 0) {
			return new SuccessModel({ message: '文章已更新' })
		}
		return new FailedModel(updateArticleFail)
	} catch (error) {
		console.log(error)
		return new FailedModel(updateArticleFail)
	}
}

/**
 * @description 获取文章列表
 * @param { String } orderBy
 */
const getArticleList = async ({ c, pageIndex, orderby, limit, manager }) => {
	!pageIndex && (pageIndex = 1)
	!limit && (limit = 7) // 分页 每页7条数据

	let order,
		whereOpt = {}
	!manager && Object.assign(whereOpt, { hidden: false }) // 如果是管理员，则显示隐藏的文章

	switch (orderby) {
		case undefined:
			order = [['order'], ['createdAt', 'desc']]
			break
		case 'order':
			order = [['order'], ['createdAt', 'desc']]
			break
		default:
			order = [[orderby, 'desc'], ['order']]
	}

	let offset = 0 + (pageIndex - 1) * limit

	const cateOpt = {}
	if (c) {
		Object.assign(cateOpt, { cateLink: c })
	}
	try {
		const result = await Article.findAndCountAll({
			where: whereOpt,
			include: [
				{
					model: Category,
					where: cateOpt,
					attributes: ['id', 'cateName'],
				},
				{
					model: Tag,
					attributes: ['id', 'tagName'],
				},
			],
			distinct: true, // 去重，防止数量统计不准确
			attributes: [
				'id',
				'title',
				'linkUrl',
				'showImgUrl',
				'categoryId',
				'order',
				'views',
				'likes',
				'hidden',
				'createdAt',
			],
			order: order,
			limit: limit,
			offset: offset,
		})

		if (result.count > 0) {
			const pageTotal = Math.ceil(result.count / limit)
			const articleList = []
			result.rows.forEach((item) => {
				item.tags.forEach((tag, index, tagsArr) => {
					// 整理云标签
					tagsArr[index] = tag.tagName
				})
				// 整理分类名称
				item.dataValues.cateName = item.category.cateName
				// 格式化创建日期
				item.dataValues.createdAt = item.dataValues.createdAt
					.toISOString()
					.split('T')[0]
				articleList.push(item.dataValues)
			})

			articleList.pageTotal = pageTotal

			return articleList
		}
		return new FailedModel(getArticleListFail)
	} catch (error) {
		console.log(error)
		return new FailedModel(getArticleListFail)
	}
}

/**
 * @description 通过 id 获取文章数据
 * @param { Number } id
 */
const getArticleById = async (id) => {
	if (!id) return new FailedModel(paramsError)
	try {
		const article = await Article.findOne({
			where: { id },
			include: [
				{
					model: Tag,
					attributes: ['id', 'tagName'],
					through: {
						attributes: [],
					},
				},
			],
		})
		const data = article.dataValues
		const tagIds = []

		data.tags.forEach((tag) => {
			tagIds.push(tag.id)
		})

		Object.assign(data, { tagIds })

		return data
	} catch (error) {
		console.log(error)
		return new FailedModel(getSingleArticleFail)
	}
}

/**
 * @description 通过链接获取文章
 * @param { String } link
 */
const getArticleByLinkUrl = async (link) => {
	if (!link) {
		return new FailedModel(paramsError)
	}

	try {
		const article = await Article.findOne({
			where: { linkUrl: link },
			include: [
				{
					model: Tag,
					attributes: ['id', 'tagName'],
				},
			],
		})

		if (article) {
			const nextArticle = await Article.findOne({
				where: {
					id: {
						[Op.gt]: article.dataValues.id,
					},
				},
			})

			const prevArticle = await Article.findAll({
				where: {
					id: {
						[Op.lt]: article.dataValues.id,
					},
				},
				order: [['id', 'DESC']],
				limit: 1,
				attributes: ['id', 'title', 'linkUrl'],
			})

			Object.assign(article.dataValues, {
				prevArticle: prevArticle[0],
				nextArticle,
			})

			article.content = md.render(article.content)
			article.dataValues.createdAt = article.dataValues.createdAt
				.toISOString()
				.split('T')[0]

			return article.dataValues
		}
		return new FailedModel(getSingleArticleFail)
	} catch (error) {
		console.log('err: ... ', error)
		return new FailedModel(getSingleArticleFail)
	}
}

/**
 * @description 通过 id 设置属性值
 * @param { Number } id
 * @param { String } prop
 * @param { String } value
 * @return ResModel
 */
const setPorpOfArticleById = async (id, prop, value) => {
	if (!id || !prop || value == undefined) return new FailedModel(paramsError)

	try {
		const result = await Article.update(
			{
				[prop]: value,
			},
			{
				where: { id },
			}
		)
		if (result > 0) {
			return new SuccessModel({
				message: 'Success',
				data: { prop: value },
			})
		}
		return new FailedModel(updatePropOfArticleFail)
	} catch (error) {
		console.log(error)
		return new FailedModel(updatePropOfArticleFail)
	}
}

/**
 * @description 通过 id 删除文章
 * @param { Number } id
 */
const destroyArticleById = async (id) => {
	if (!id) return new FailedModel(paramsError)
	try {
		const result = await Article.destroy({
			where: { id },
		})
		if (result > 0) {
			return new SuccessModel({ message: '删除成功' })
		}
		return new FailedModel(destroyArticleFail)
	} catch (error) {
		return new FailedModel(destroyArticleFail)
	}
}

/**
 * @description 文章浏览次数自增 1 次
 * @returns { Boolean }
 */
const incArticleViews = async (linkUrl) => {
	if (!linkUrl) return false
	try {
		const article = await Article.findOne({
			where: {
				linkUrl: linkUrl,
			},
			attributes: ['id', 'views'],
		})
		if (article) {
			const views = article.dataValues.views + 1
			const result = await Article.update(
				{
					views: views,
				},
				{
					where: {
						id: article.dataValues.id,
					},
				}
			)
			return result > 0
		}
	} catch (error) {
		console.log(error)
		return false
	}
}

/**
 * @description 文章浏览次数自增 1 次
 * @returns { Boolean }
 */
const incArticleLikes = async (id) => {
	if (!id) return false

	try {
		const article = await Article.findOne({
			where: {
				id: id,
			},
			attributes: ['id', 'likes'],
		})
		if (article) {
			const likes = article.dataValues.likes + 1
			const result = await Article.update(
				{
					likes: likes,
				},
				{
					where: {
						id: id,
					},
				}
			)
			return result > 0
		}
	} catch (error) {
		console.log(error)
		return false
	}
}

module.exports = {
	createArticle,
	updateArticle,
	getArticleList,
	setPorpOfArticleById,
	destroyArticleById,
	getArticleById,
	getArticleByLinkUrl,
	incArticleViews,
	incArticleLikes,
}
