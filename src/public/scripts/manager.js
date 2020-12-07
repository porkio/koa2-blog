/**
* @author Pork
* @description 后台管理 manager.js
* @created_at 2020/12/08
* @updated_at
*/

document.addEventListener('readystatechange', e => {
	if (document.readyState === 'complete') {
		// 准备就绪
		(() => {
			// 关闭按钮
			const btnClose = document.querySelectorAll('.btn-close')
			btnClose.forEach(item => {
				item.addEventListener('click', e => {
					const layerItem = document.querySelector('.layer-default')
					layerItem && layerItem.remove()
					if (!layerItem) {
						const item = e.target.parentElement
						item.remove()
					}
				}, false)
			})
		})()
	}
}, false)
