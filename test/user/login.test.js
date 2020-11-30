/**
 * @author Pork
 * @description user api test
 * @created_at 2020/11/28
 * @updated_at
 */

const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

let COOKIE = ''

// 测试注册
// test('注册一个用户应该成功', async () => {
//     const res = await server.post('/api/user/create').send(testUser)
//     expect(res.body.errno).toBe(0)
// })

test('重复注册用户应该失败', async () => {
    const res = await server.post('/api/user/create').send(testUser)
    expect(res.body.errno).not.toBe(0)
})

test('查询已注册的用户名应该存在', async () => {

})
