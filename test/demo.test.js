/**
* @author Pork
* @description 单元测试 demo test
* @created_at 2020/11/18
* @updated_at
*/

function sum(a, b) {
    return a + b
}

test('10 + 20 应该等于 30', () => {
    expect(sum(10, 20)).toBe(30)
})
