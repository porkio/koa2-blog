/**
 * @author Pork
 * @description 解析 query
 * @created_at 2020/12/02
 * @updated_at
 */

const queryString = qString => {
    if (!qString) {
        return
    }
    let query
    if (qString.indexOf('?') > -1) {
        query = qString.split('?')[1]
    }

    query = query.split('&')

    const obj = {}

    query.length > 0 && query.forEach((item, index) => {
        let temp = item.split('=')
        temp.length > 0 && (obj[temp[0]] = temp[1])
    })

    return obj
}

module.exports = queryString
