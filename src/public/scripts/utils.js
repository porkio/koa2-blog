/**
 * @description JavaScript Utils Collection
 * @author Pork
 * @email porksb@163.com
 * @created_at 2020/10/10
 */

// 判断当前是否为手机端
function isMobile() {
    const ua = navigator.userAgent.toLowerCase()
    return (/mobi/i.test(ua))
}

/**
 * 获取元素样式的计算值
 * @param { Object } el
 * @param { String } prop
 */
function getStyle(el, prop) {
	if (!el || !prop) {
		return false;
	}
	return window.getComputedStyle(el, null).getPropertyValue(prop) || window.getComputedStyle(el, null)[prop];
}

/**
 * 判断元素是否进入可视区
 * @param { Object } element
 */
function isInViewport(element) {
	var rect = element.getBoundingClientRect();
	var html = document.documentElement;
	//在IE中，默认坐标从(2,2)开始计算，导致最终距离比其他浏览器多出两个像素，我们需要做个兼容。
	var top = document.documentElement.clientTop; // 非IE为0，IE为2
	var left = document.documentElement.clientLeft;

	return (
		rect.top - top >= 0 &&
		rect.left - left >= 0 &&
		rect.bottom - top <= (window.innerHeight || html.clientHeight) &&
		rect.right - left <= (window.innerWidth || html.clientWidth)
	);
}

/**
 * 滚动条滚动到指定元素位置
 * @param { Object } element
 */
function scrollToElement(element) {
	// window.requestAnimationFrame 实现动画效果
	window.animationFrame = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame || window.msRequestAnimationFrame;

	const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	const elePosY = element.offsetTop;

	elePosY > scrollY ? scrollToDown() : scrollToUp();

	function scrollToDown() {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		const viewPortHeight = window.innerHeight || document.documentElement.clientHeight;
		const scrollHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
		const maxHeight = scrollHeight - viewPortHeight;
		const posY = element.offsetTop;

		if (scrollTop < posY && (maxHeight - scrollTop) > 1) {
			window.animationFrame(scrollToDown);
			window.scrollTo(0, scrollTop + ((posY - scrollTop) / 8 + 1));
		}
	}

	function scrollToUp() {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		const posY = element.offsetTop;

		if (scrollTop > posY) {
			window.animationFrame(scrollToUp);
			window.scrollTo(0, scrollTop - scrollTop / 8);
		}
	}
}
/**
 * 复制指定文本
 * @param { String } text
 */
function copyText(text) {
	let textarea = document.createElement("textarea"); //创建input对象
	let currentFocus = document.activeElement; //当前获得焦点的元素
	let toolBoxwrap = document.getElementById('service'); //将文本框插入到NewsToolBox这个之后
	let flag = false;
	toolBoxwrap.appendChild(textarea); //添加元素
	textarea.value = text;
	textarea.focus();
	if (textarea.setSelectionRange) {
		textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
	} else {
		textarea.select();
	}
	try {
		flag = document.execCommand("copy"); //执行复制
	} catch (eo) {
		flag = false;
	}
	toolBoxwrap.removeChild(textarea); //删除元素
	currentFocus.focus();
	return flag;
}

/**
 * 获取可视区尺寸数据
 */
function getViewPortOffset() {
	const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
	const clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
	return {
		clientWidth,
		clientHeight
	}
}

// 阻止冒泡事件
function cancelBubble(e) {
	//如果提供了事件对象，则是一个非IE浏览器
	if (e && e.stopPropagation)
		//因此它支持W3C的stopPropagation()方法
		e.stopPropagation();
	else
		//否则，使用IE的方式来取消事件冒泡
		window.event.cancelBubble = true;
}

/**
 * 根据键名获取 cookie 值
 * @param { String } name
 */
function getCookie(name) {
	let cookies = document.cookie
	let cookieArr = cookies.split('; ')
	let tempArr
	if (cookieArr.length > 0 && cookieArr.indexOf(name) >= 0) {
		tempArr = cookieArr.filter(s => s.indexOf(name) > -1);
    } else {
        return null
    }
	return tempArr && tempArr[0].split('=')[1]
}

/**
 * 删除cookie
 * @param { String } name
 * @param { String } path
 * @param { String } domain
 */
function deleteCookie(name, path, domain) {
    if (name == undefined || name == '') return

    if (getCookie(name)) {
        document.cookie = name + '=' +
            ( ( path ) ? ';path=' + path : '') +
            ( ( domain ) ? ';domain=' + domain : '' ) +
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
        return true
    } else {
        return false
    }
}

/**
 * toggle Class name
 * if the document element has the class name 'active', and after called this function, the 'active' will be remove.
 * @param { Object } el
 * @param { String } className
 */
function toggleClassName(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className)
    } else {
        el.classList.add(className)
    }
}

/**
 * 在某元素之后插入元素
 * @param { Object } parent
 * @param { Object } node
 * @param { Object } referenceNode
 */
function insertAfter(parent, node, referenceNode) {
    parent.insertBefore(node, referenceNode.nextSibling)
}


/**
 * 防止频发触发
 * @param { Function } fn
 * @param { Integer } delay
 * eg: debounce(fn, 2000) // 每执行一次需要等待 2s 才可以再次触发
 */
function debounce(fn, delay){
	var timer = null // 声明计时器
	return function() {
		var context = this
		var args = arguments
		clearTimeout(timer)
		timer = setTimeout(function () {
		fn.apply(context, args)
		}, delay)
	}
}

/**
 * [ajax description]
 * @param  {[type]} url  [请求地址]
 * @param  {[type]} data [携带数据（仅post）]
 * @return {[type]}      [description]
 */
function ajax(url, data) {
    if (!data) {
        return fetch(url).then(response => response.json()).then(data => data)
    } else {
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => data)
    }
}

/**
 * 使用 $('#id') 来快速获取 dom 元素
 */
export function $() {
    let elements = []
    for (let i = 0; i < arguments.length; i++) {
        let element = arguments[i]
        if (typeof element == 'string')
            element = document.querySelector(element)
        if (arguments.length == 1)
            return element
        elements.push(element)
    }
    return elements
}

export const utils = {
	info: {
		Auth: 'Pork',
		desc: 'Common Toolkit',
		version: '1.0.2',
		date: '2020/10/22'
	},
    isMobile,
    getStyle,
    isInViewport,
    scrollToElement,
    copyText,
    getViewPortOffset,
    cancelBubble,
    getCookie,
    deleteCookie,
    toggleClassName,
	insertAfter,
	debounce,
    ajax
}
