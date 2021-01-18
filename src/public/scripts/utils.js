/**
 * @description JavaScript Utils Collection
 * @author Pork
 * @email porksb@163.com
 * @created_at 2020/10/10
 */

// 判断当前是否为手机端
function isMobile () {
    const ua = navigator.userAgent.toLowerCase()
    return (/mobi/i.test(ua))
}

/**
 * 获取元素样式的计算值
 * @param { Object } el
 * @param { String } prop
 */
function getStyle (el, prop) {
    if (!el || !prop) {
        return false
    }
    return window.getComputedStyle(el, null).getPropertyValue(prop) || window.getComputedStyle(el, null)[prop]
}

/**
 * 判断元素是否进入可视区
 * @param { Object } element
 */
function isInViewport (element) {
    var rect = element.getBoundingClientRect()
    var html = document.documentElement
    //在IE中，默认坐标从(2,2)开始计算，导致最终距离比其他浏览器多出两个像素，我们需要做个兼容。
    var top = document.documentElement.clientTop // 非IE为0，IE为2
    var left = document.documentElement.clientLeft

    return (
        rect.top - top >= 0 &&
        rect.left - left >= 0 &&
        rect.bottom - top <= (window.innerHeight || html.clientHeight) &&
        rect.right - left <= (window.innerWidth || html.clientWidth)
    )
}

/**
 * 滚动条滚动到指定元素位置
 * @param { Object } element
 */
function scrollToElement (element) {
    // window.requestAnimationFrame 实现动画效果
    window.animationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame || window.msRequestAnimationFrame

    const scrollY = document.documentElement.scrollTop || document.body.scrollTop
    const elePosY = element.offsetTop

    elePosY > scrollY ? scrollToDown() : scrollToUp()

    function scrollToDown () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const viewPortHeight = window.innerHeight || document.documentElement.clientHeight
        const scrollHeight = document.body.offsetHeight || document.documentElement.offsetHeight
        const maxHeight = scrollHeight - viewPortHeight
        const posY = element.offsetTop

        if (scrollTop < posY && (maxHeight - scrollTop) > 1) {
            window.animationFrame(scrollToDown)
            window.scrollTo(0, scrollTop + ((posY - scrollTop) / 8 + 1))
        }
    }

    function scrollToUp () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const posY = element.offsetTop

        if (scrollTop > posY) {
            window.animationFrame(scrollToUp);
            window.scrollTo(0, scrollTop - scrollTop / 8)
        }
    }
}
/**
 * 复制指定文本
 * @param { String } text
 */
function copyText (text) {
    let textarea = document.createElement("textarea") //创建input对象
    let currentFocus = document.activeElement; //当前获得焦点的元素
    let toolBoxwrap = document.body //将文本框插入到body这个之后
    let flag = false
    toolBoxwrap.appendChild(textarea); //添加元素
    textarea.value = text
    textarea.focus()
    if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length) //获取光标起始位置到结束位置
    } else {
        textarea.select()
    }
    try {
        flag = document.execCommand("copy") //执行复制
    } catch (eo) {
        flag = false
    }
    toolBoxwrap.removeChild(textarea) //删除元素
    currentFocus.focus()
    return flag
}

/**
 * 获取可视区尺寸数据
 */
function getViewPortOffset () {
    const clientWidth = document.body.clientWidth || document.documentElement.clientWidth
    const clientHeight = document.body.clientHeight || document.documentElement.clientHeight
    return {
        clientWidth,
        clientHeight
    }
}

// 阻止冒泡事件
function cancelBubble (e) {
    if (e && e.stopPropagation)
        e.stopPropagation()
    else window.event.cancelBubble = true
}

/**
 * @description 设置cookie
 * @param {String, String} name, value
 * @return
 */
function setCookie (name, value) {
    const Days = 30
    const exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30)
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
}

/**
 * 根据键名获取 cookie 值
 * @param { String } name
 */
function getCookie (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg))
        return unescape(arr[2])
    else
        return null
}

/**
 * 删除cookie
 * @param { String } name
 * @param { String } path
 * @param { String } domain
 */
function deleteCookie (name, path, domain) {
    if (!name) return false

    if (getCookie(name)) {
        document.cookie = name + '=' +
            ((path) ? ';path=' + path : '') +
            ((domain) ? ';domain=' + domain : '') +
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
        return true
    } else {
        return false
    }
}

/**
 * @description 判断两个对象的值是否相等(递归,支持多层对象)
 * @param  {[Object]}  origin [源对象]
 * @param  {[Object]}  target [目标对象]
 * @return {Boolean}        [description]
 */
function isObjectValueEqual (origin, target) {
    if (typeof origin !== 'object' || typeof target !== 'object') {
        return false
    }

    const oProps = Object.getOwnPropertyNames(origin)
    const tProps = Object.getOwnPropertyNames(target)

    if (oProps.length !== tProps.length) {
        return false
    }
    let result = false
    for (let prop in origin) {
        if (typeof origin[prop] !== 'object') {
            if (origin[prop] !== target[prop]) {
                return false
            }
            result = true
        } else {
            result = isObjectValueEqual(origin[prop], target[prop])
        }
    }
    return result
}

/**
 * @description query 解析成 Object
 * @param  {[String]} qString [query]
 * @return {[Object]}         [返回对象]
 */
function queryString (qString) {
    if (!qString || qString.indexOf('?') === -1) {
        return {}
    }

    let query = qString.split('?')[1].split('&')

    const obj = {}

    query.length > 0 && query.forEach((item, index) => {
        let temp = item.split('=')
        temp.length > 0 && (obj[temp[0]] = temp[1])
    })
    return obj
}

/**
 * toggle Class name
 * if the document element has the class name 'active', and after called this function, the 'active' will be remove.
 * @param { Object } el
 * @param { String } className
 */
function toggleClassName (el, className) {
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
function insertAfter (parent, node, referenceNode) {
    parent.insertBefore(node, referenceNode.nextSibling)
}


/**
 * 防止频发触发
 * @param { Function } fn
 * @param { Integer } delay
 * eg: debounce(fn, 2000) // 每执行一次需要等待 2s 才可以再次触发
 */
function debounce (fn, delay) {
    var timer = null // 声明计时器
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

/**
 * @description 大小写字符串随机产出
 * @param { Number } length
 * @return String
 */
function randomStrGenerator (length) {
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

/**
 * @description 获取随机深色
 * @params {}
 * @return { String } color
 */
function getRandomDeepColor () {
    const colors = ['#76469F', '#007bff', '#28a745', '#dc3545', '#17a2b8', '#343a40', '#952222', '#748E1D', '#1D3C8E', '#F58616', '#DB0470', '#DB2E04']
    return colors[parseInt(Math.random() * colors.length)]
}

/**
 * [ajax description]
 * @param  {[type]} url  [请求地址]
 * @param  {[type]} data [携带数据（仅post）]
 * @return {[type]}      [description]
 */
function ajax (url, options) {
    // 如果没有 options 或 options 中没有 method 或 method === GET
    if (!options || !options.method || /get/i.test(options.method)) {
        if (options.body) { // 如果 options 中没有 body
            // options 中有 body 则拼接 url
            const qs = (data => {
                let queryString = '?'
                for (let key in data) {
                    queryString += (key + '=' + data[key] + '&')
                }
                return queryString.slice(0, -1) // 删除最后一个 & 符号
            })(options.body)
            url += qs // 拼接 url
        }

        return fetch(url).then(response => response.json()).then(res => res)
    }

    if (/^(POST|PUT)$/i.test(options.method)) {
        // 文件上传 这里(仅我个人)认定只要是特意构造的 new FormData 都是为了文件上传准备的
        if (options.body.toString() === '[object FormData]') {
            Object.assign(options, {
                body: options.body
            })
        } else { // 其他方式一律按 json 格式处理解析
            Object.assign(options, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(options.body)
            })
        }

        return fetch(url, options).then(response => response.json()).then(res => res)
    }
}

/**
 * @description 消息提醒框
 * @param {String, String, Integer, Function} title, icon, duration, callBack
 * @return
 */
function showMessage ({ title, icon, duration = 2500, cb }) {
    if (!title) {
        return
    }

    icon = icon.toLowerCase()

    const msgBox = document.createElement('div')
    const msgTitle = document.createElement('span')
    msgTitle.innerText = title

    const iconsMap = new Map()
    iconsMap.set('success', `<i style="width: 24px; height: 24px; margin-right: 14px;"><svg t="1606792068551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3273" width="24" height="24"><path d="M384 716.501333l445.866667-445.866666a21.333333 21.333333 0 0 1 30.165333 30.186666L407.466667 753.365333c-2.154667 2.133333-4.650667 3.733333-7.296 4.778667a21.333333 21.333333 0 0 1-32.341334 2.56l-211.2-211.2a21.333333 21.333333 0 1 1 30.165334-30.186667L384 716.501333z" p-id="3274" fill="#ffffff"></path></svg></i>`)
    iconsMap.set('failed', `<i style="width: 24px; height: 24px; margin-right: 14px;"><svg t="1606792223721" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4382" width="24" height="24"><path d="M512 0C229.691077 0 0 229.671385 0 512s229.691077 512 512 512 512-229.671385 512-512S794.308923 0 512 0z m0 984.615385C251.411692 984.615385 39.384615 772.588308 39.384615 512S251.411692 39.384615 512 39.384615s472.615385 212.027077 472.615385 472.615385-212.027077 472.615385-472.615385 472.615385z" fill="#ffffff" p-id="4383"></path><path d="M703.153231 320.846769a19.672615 19.672615 0 0 0-27.844923 0L512 484.155077l-163.308308-163.308308a19.672615 19.672615 0 1 0-27.844923 27.844923L484.155077 512l-163.308308 163.308308a19.672615 19.672615 0 1 0 27.844923 27.844923L512 539.844923l163.308308 163.308308a19.633231 19.633231 0 0 0 27.844923 0 19.672615 19.672615 0 0 0 0-27.844923L539.844923 512l163.308308-163.308308a19.672615 19.672615 0 0 0 0-27.844923z" fill="#ffffff" p-id="4384"></path></svg></i>`)
    iconsMap.set('warning', `<i style="width: 24px; height: 24px; margin-right: 14px;"><svg t="1606792346493" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6165" width="24" height="24"><path d="M512.911 1021.999c-68.712 0-135.387-13.465-198.17-40.02-60.625-25.643-115.066-62.346-161.81-109.089C106.188 826.146 69.485 771.706 43.842 711.08c-26.555-62.783-40.02-129.457-40.02-198.17 0-68.712 13.465-135.387 40.02-198.17 25.643-60.626 62.345-115.066 109.089-161.81 46.743-46.744 101.184-83.446 161.81-109.089 62.784-26.556 129.458-40.02 198.17-40.02 68.713 0 135.387 13.464 198.17 40.02 60.626 25.643 115.066 62.345 161.811 109.089 46.743 46.744 83.446 101.184 109.089 161.81 26.555 62.784 40.02 129.458 40.02 198.17 0 68.713-13.465 135.387-40.02 198.17-25.643 60.626-62.346 115.066-109.089 161.811-46.744 46.743-101.185 83.446-161.811 109.089C648.298 1008.534 581.624 1021.999 512.911 1021.999zM512.911 67.821c-245.423 0-445.089 199.666-445.089 445.089 0 245.423 199.666 445.089 445.089 445.089S958 758.333 958 512.91C958 267.487 758.334 67.821 512.911 67.821z" p-id="6166" fill="#ffffff"></path><path d="M510 671c-17.673 0-32-14.327-32-32L478 206c0-17.673 14.327-32 32-32s32 14.327 32 32l0 433C542 656.673 527.673 671 510 671z" p-id="6167" fill="#ffffff"></path><path d="M510.5 797.5m-31.5 0a31.5 31.5 0 1 0 63 0 31.5 31.5 0 1 0-63 0Z" p-id="6168" fill="#ffffff"></path></svg></i>`)

    msgBox.style = `
        display: flex;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 90%;
        padding: .8rem 1.8rem;
        font-size: 16px;
        color: #fff;
        background-color: rgba(0, 0, 0, .55);
        border-radius: 6px;
        z-index: 99999;
    `
    msgTitle.style = `
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    `

    if (iconsMap.get(icon)) {
        msgBox.innerHTML = iconsMap.get(icon)
        msgBox.appendChild(msgTitle)
    } else {
        msgBox.appendChild(msgTitle)
    }

    document.body.appendChild(msgBox)

    setTimeout(() => {
        document.body.removeChild(msgBox)
        cb && cb()
    }, duration)
}

/**
 * @description 控制台个性化输出
 * @param { String } str
 * @return
 */
function printLog (str) {
    console.log('%c ' + str, 'color: white; font-size: 20px; border-radius: 4px; text-shadow: 0px 2px 1px rgba(41, 41, 41, .6);')
    const date = '2020/12/12'
    const a = 'background: #606060; padding: 4px; color: #fff; border-radius: 2px 0 0 2px;'
    const b = 'background: #1475B2; padding: 4px; color: #fff; border-radius: 0 2px 2px 0;'
    console.log(`%c Update Time %c ${date} `, a, b)
}

/**
 * @description Promise 化
 * @param { Object } api
 */
function promisify (api) {
    return (options, ...params) => {
        return new Promise((resolve, reject) => {
            api(Object.assign({}, options, { success: resolve, fail: reject }), ...params)
        })
    }
}

/**
 * @description 图片灯箱初始化
 */
function imgLightBoxInit () {
    const imgNodeList = document.querySelectorAll('img')
    const lightBoxLayer = document.createElement('div')
    const btnClose = document.createElement('span')
    const image = document.createElement('img')
    const imgInfo = document.createElement('div')
    const color = 'rgba(0, 0, 0, .75)'

    lightBoxLayer.style = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: ${color};
        z-index: 99999;
    `
    btnClose.innerHTML = `<svg t="1609132947879" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2485" width="36" height="36"><path d="M965.632 936.96c4.096 4.096 6.144 9.216 6.144 14.336s-2.048 10.24-6.144 14.336-9.216 6.144-14.336 6.144-10.24-2.048-14.336-6.144L512 540.672 86.016 965.632c-8.192 8.192-20.48 8.192-28.672 0-4.096-4.096-6.144-9.216-6.144-14.336s2.048-10.24 6.144-14.336L482.304 512 57.344 86.016C53.248 81.92 51.2 76.8 51.2 71.68s2.048-10.24 6.144-14.336c8.192-8.192 20.48-8.192 28.672 0L512 482.304 936.96 57.344c8.192-8.192 20.48-8.192 28.672 0 4.096 4.096 6.144 9.216 6.144 14.336s-2.048 10.24-6.144 14.336L540.672 512l424.96 424.96z" p-id="2486" fill="#ffffff"></path></svg>`
    btnClose.style = `position: absolute; top: 24px; right: 24px; z-index: 9999; cursor: pointer; width: 68px; height: 68px; display: flex; justify-content: center; align-items: center; border-radius: 50%; background: rgba(41, 41, 41, .13);`
    lightBoxLayer.appendChild(btnClose)

    imgNodeList.forEach(img => {
        img.style.cursor = 'zoom-in'
        img.addEventListener('click', e => {
            const pageOffsetWidth = document.body.offsetWidth || document.documentElement.offsetWidth
            image.style.maxWidth = pageOffsetWidth + 'px'
            document.documentElement.style.overflowY = 'hidden'
            image.src = img.src
            imgInfo.innerHTML = `<p style="color: #fff;">${img.title ? img.title : ''} &nbsp;&nbsp; Size: ${image.width} * ${image.height}</p>`
            lightBoxLayer.appendChild(imgInfo)
            lightBoxLayer.appendChild(image)
            document.body.appendChild(lightBoxLayer)
        }, false)
    })

    lightBoxLayer.addEventListener('click', close, false)
    btnClose.addEventListener('click', e => {
        cancelBubble()
        close()
    }, false)

    image.addEventListener('click', e => {
        cancelBubble()
    }, false)

    function close () {
        document.documentElement.style.overflowY = 'scroll'
        if (lightBoxLayer && image.src) {
            image.remove()
            lightBoxLayer.remove()
        }
        lightBoxLayer && lightBoxLayer.remove()
    }
}

/**
 * @description 使用 $('#id') 来快速获取 dom 元素
 * @return DOM
 */
export function $ () {
    const elements = []
    for (let i = 0; i < arguments.length; i++) {
        let element = arguments[i]
        if (typeof element == 'string')
            element = document.querySelector(element)
        if (arguments.length === 1)
            return element
        elements.push(element)
    }
    return elements
}

/**
 * @description 配置信息
 */
const utilsInfo = {
    Author: 'Pork',
    Description: 'Common Toolkit',
    Version: '1.1.2',
    UpdatedAt: '2020/12/28'
}

/**
 * @description 展示当前工具库信息
 */
function showInfo () {
    console.log('当前工具库版本：', utilsInfo.Version)
    console.log('更新时间：', utilsInfo.UpdatedAt)
    console.log('作者：', utilsInfo.Author)
}

printLog('何以解忧\n 唯有暴富 \n\n 获取本站/部署 \n wx: zhaoxu-1 ')

export const utils = {
    showInfo,
    isMobile,
    getStyle,
    isInViewport,
    scrollToElement,
    copyText,
    getViewPortOffset,
    cancelBubble,
    setCookie,
    getCookie,
    deleteCookie,
    isObjectValueEqual,
    queryString,
    toggleClassName,
    insertAfter,
    debounce,
    randomStrGenerator,
    getRandomDeepColor,
    ajax,
    showMessage,
    promisify,
    imgLightBoxInit,
    printLog
}
