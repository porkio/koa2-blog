# koa2 框架轻博客系统（自适应）

### 项目地址

[https://github.com/porkio/koa2-blog](https://github.com/porkio/koa2-blog)

### 特性

-   极速响应（服务端渲染 + api 双层数据交互）
-   更为人性化的用户层（操作/管理/视觉）
-   易部署

### 体验

-   [前端](https://ppwq.work)
-   [后端](https://ppwq.work/manager)

### 使用
```sh
mv src/conf/db.bak.js src/conf/db.js
```
#### 数据库
新建数据库，将根目录下的 database_backup 文件夹下的 ppwq_work.sql.gz 导入到自己的数据库中，然后根据自己的数据库信息修改 src/conf/db.js 的配置信息即可

```sh
vim src/conf/db.js
```

```js
/**
 * @author Pork
 * @description 存储配置
 */

const { isProd } = require('../utils/env')

const REDIS_CONF = {
	port: 6379,
	host: '127.0.0.1',
}
// dev 环境改这里的数据库信息
const MYSQL_CONF = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '12345678',
	database: 'test_2022',
	dialect: 'mysql',
}

// 线上环境的 redis 配置和 MySql 配置
isProd &&
	Object.assign(REDIS_CONF, {
		port: 6379,
		host: '127.0.0.1',
	}) &&
	Object.assign(MYSQL_CONF, {
		// 线上 mysql 配置
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: '123456',
		database: 'test_db',
	})

module.exports = {
	REDIS_CONF,
	MYSQL_CONF,
}
```

```sh
npm run dev // 线上 npm run prd 或 使用pm2管理器进行启动
```


### 功能

1. 分类（添加、删除、排序）
2. 文章发布、编辑、删除
3. 云标签 添加、删除
4. 支持 markdown
5. 支持多用户
6. 后台登陆支持 URL 记忆
7. 增加我的简历

### 更新记录

2021/04/16
修复 macOs 大苏尔版本下 Chrome 浏览器中点赞按钮样式不兼容问题
