/**
 * @author Pork
 * @description User model test
 * @created_at 2020/11/19
 * @updated_at
 */

const User = require('../../src/db/model/index')

test('User 模型的属性符合预期', () => {
    const user = User.build({
        userName: 'Pork',
        email: 'porksb@163.com',
        password: 'zhaoxu666',
        gender: 1
    })
})
