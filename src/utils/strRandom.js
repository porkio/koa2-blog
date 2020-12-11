/**
* @author Pork
* @description 字符串随机产出
* @created_at 2020/12/10
* @updated_at
*/

/**
* @description 随机字符串产出
* @param { Number } length
* @return  String
*/
module.exports = randomStrGenerator = length => {
	if (length <= 0) return

	const temp = []
	for (let i = 65; i <= 122; i++) {
		if (i > 90 && i < 97) continue
		temp.push(String.fromCharCode(i))
	}
	let str = ''
	while (length > 0) {
		const timestamp = Date.now().toString()
		const seed = parseInt(Math.random() * 43) + new Number(timestamp[parseInt(Math.random() * 12)])
		str += temp[seed]
		length--
	}

	return str
}
