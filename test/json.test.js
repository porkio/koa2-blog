/**
* @author Pork
* @description json jest
* @created_at 2020/11/18
* @updated_at
*/

const server = require('./server')

test('json 接口返回数据正确', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})

test('Pork 已存在', async () => {
    const res = await server.post('/api/user/isExist').send({
        userName: 'Pork'
    })

    expect(res.body).toEqual({
        errno: 0,
        data: {},
        message: '用户名已存在'
    })
})
