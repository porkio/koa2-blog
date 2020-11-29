/**
 * @author Pork
 * @description User model test
 * @created_at 2020/11/19
 * @updated_at
 */

const { User } = require('../../src/db/model/index')

test('User 模型的属性符合预期', () => {
    const user = User.build({ // 创建到内存中，不会同步到数据库
        userName: 'Pork',
        email: 'porksb@163.com',
        password: 'zhaoxu666'
    })

    expect(user.userName).toBe('Pork')
    expect(user.email).toBe('porksb@163.com')
    expect(user.password).toBe('zhaoxu666')
    expect(user.gender).toBe(0) // 测试 gender 的默认值
})
