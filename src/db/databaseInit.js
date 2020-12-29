/**
 * @author Pork
 * @description 数据库初始化
 * @created_at 2020/12/03
 * @updated_at
 */

const strCrypto = require('../utils/cryp')

const {
    User,
    Article,
    SiteConfig,
    Tag,
    Category,
    FriendLink,
    ArticleTag
} = require('./model/index')

const databaseInit = async () => {
    const siteConfig = await SiteConfig.create({
        siteTitle: `猪肉王子的博客`,
        subTitle: '但行好事，莫问前程',
        views: 20208,
        copyRight: '© 2020 - 2021 猪肉王子'
    })

    const user = await User.create({
        userName: 'Pork',
        email: 'porksb@163.com',
        password: strCrypto('zhaoxu666'),
        gender: 1,
        authLevel: 0,
        avatarUrl: '/uploads/pork-avatar.jpg'
    })

    const categoryWeb = await Category.create({
        cateName: 'Web',
        order: 1
    })
    const category = await Category.create({
        cateName: 'JavaScript',
        order: 1,
        parentId: categoryWeb.dataValues.id
    })
    const category2 = await Category.create({
        cateName: 'Vue.js',
        order: 2,
        parentId: categoryWeb.dataValues.id
    })
    const category3 = await Category.create({
        cateName: 'React.js',
        order: 3,
        parentId: categoryWeb.dataValues.id
    })
    const categorySuibi = await Category.create({
        cateName: '随笔',
        order: 2
    })
    const category5 = await Category.create({
        cateName: '关于生活',
        order: 2,
        parentId: categorySuibi.dataValues.id
    })
    const cate6 = await Category.create({
        cateName: '关于阅读',
        order: 1,
        parentId: categorySuibi.dataValues.id
    })

    const article = await Article.create({
        title: '深入理解bind、call和apply的作用',
        content: '在JavaScript语言中，bind、call、apply都是用来改变函数的this对象的指向的。说白了就是都可以用来代替另一个对象调用一个方法，将一个函数的对象的执行期上下文从初始的上下文改变为由当前对象的上下文。在深入讲解它们之前，我先讲一个小故事： 从前有一只猪和一只狗，突然有一天猪开口说话了：我是猪，我能吃又能睡！ 狗一听乐了，谁还不会吃和睡了？当即不服叫道：我是狗，我也能吃能睡！（我还会叫呢，但是这句它没有说出口，但是它的确有这个行为的能力）',
        categoryId: category.dataValues.id,
        userId: user.dataValues.id
    })

    const tag = await Tag.create({
        tagName: 'JavaScript',
        order: 100,
        articleId: article.dataValues.id
    })

    const tag2 = await Tag.create({
        tagName: 'JS定时器',
        order: 100,
        articleId: article.dataValues.id
    })

    const tag3 = await Tag.create({
        tagName: '虚拟DOM',
        order: 100,
        articleId: article.dataValues.id
    })

    await ArticleTag.create({
        articleId: 1,
        tagId: 1
    })

    await ArticleTag.create({
        articleId: 1,
        tagId: 2
    })

    await ArticleTag.create({
        articleId: 1,
        tagId: 3
    })


    const friendLink = await FriendLink.create({
        linkTitle: 'Web MDN Docs',
        linkUrl: 'https://developer.mozilla.org/zh-CN/'
    })
}

module.exports = databaseInit
