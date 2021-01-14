/**
 * @description 应用入口 app.js 主要负责整体业务逻辑（增强用户体验）
 * @author Pork
 * @email porksb@163.com
 * @created_at 2020/11/29
 */

document.addEventListener('readystatechange', e => {
    if (document.readyState === 'complete') {
        // Document is ready

        // Loading
        const loading = document.querySelector('#loading')
        setTimeout(() => {
            loading && loading.remove()
            document.documentElement.style.overflowY = 'scroll' // 解禁滚动条
        }, 300)

        ajax('/api/index/incAppViews', {
            method: 'POST',
            body: {}
        }).then(res => { }) // 访客自增 +1
        // Back to top
        !((color = '#444444', hover = '#cf4647', easing = true, positionObj = { bottom: '80px', right: '44px' }) => {
            const backToTopBtn = document.createElement('div')
            let viewPortWidth = document.body.clientWidth || document.documentElement.clientWidth
            backToTopBtn.id = 'btn-back-to-top'
            backToTopBtn.innerHTML = '<svg t="1597728882657" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4370" width="128" height="128"><path d="M511.936 277.92a31.584 31.584 0 0 0-22.4 9.28L127.2 649.536a31.808 31.808 0 0 0 0.128 45.12 31.904 31.904 0 0 0 45.12 0.128L512 355.2l339.552 339.52a31.808 31.808 0 0 0 45.12-0.128 31.904 31.904 0 0 0 0.128-45.12L534.464 287.232a31.616 31.616 0 0 0-22.4-9.312l-0.128 0.032z" fill="#ffffff" p-id="4371"></path></svg>'
            backToTopBtn.style = 'opacity: .8; position: fixed; width: 42px; height: 42px; border-radius: 50%; cursor: pointer; display: -ms-flexbox; display: -webkit-box; display: none; -ms-flex-pack: center; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; z-index: 9999;'
            backToTopBtn.style.bottom = positionObj.bottom
            if (viewPortWidth <= 512) {
                backToTopBtn.style.right = parseInt(parseInt(positionObj.right) / 3) + 'px'
                backToTopBtn.style.bottom = parseInt(parseInt(positionObj.bottom) / 2) + 10 + 'px'
            } else {
                backToTopBtn.style.right = positionObj.right
            }
            backToTopBtn.children[0].style = 'width: 70%; height: 70%;'
            backToTopBtn.style.backgroundColor = color

            backToTopBtn.addEventListener('mouseenter', () => {
                backToTopBtn.style.backgroundColor = hover
                backToTopBtn.style.opacity = 1
            }, false)

            backToTopBtn.addEventListener('mouseleave', () => {
                backToTopBtn.style.backgroundColor = color
                backToTopBtn.style.opacity = 0.8
            }, false)
            // window.requestAnimationFrame 实现动画效果
            window.animationFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame || window.msRequestAnimationFrame

            // 回到顶部逻辑方法
            const scrollToTop = () => {
                const y = document.documentElement.scrollTop || document.body.scrollTop;
                if (y > 0) {
                    window.animationFrame(scrollToTop)
                    window.scrollTo(0, y - y / 8)
                }
            }

            if (easing) {
                backToTopBtn.addEventListener('click', scrollToTop, false)
            } else {
                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo(0, 0)
                }, false);
            }
            document.body.appendChild(backToTopBtn)
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop < 100) {
                    backToTopBtn.style.display = 'none'
                } else {
                    backToTopBtn.style.display = 'flex'
                }
            }, false);
            window.addEventListener('resize', () => {
                viewPortWidth = document.body.clientWidth || document.documentElement.clientWidth;
                if (viewPortWidth <= 512) {
                    backToTopBtn.style.right = '14px'
                } else if (viewPortWidth >= 768) {
                    backToTopBtn.style.right = positionObj.right
                }
            }, false)
        })('#444444', '#cf4647')
        //参数： 默认颜色，鼠标移入颜色，是否使用缓动效果easing: true/flase，位置信息{bottom: '80px', right: '44px'}

        // Go Back Button
        !(() => {
            const btnGoBack = document.querySelector('#btn-go-back')
            if (!btnGoBack) {
                return
            }
            btnGoBack.addEventListener('click', e => {
                if (document.referrer) {
                    window.history.go(-1)
                } else {
                    location.href = '/'
                }
            }, false)
        })()
    }
}, false)

window.onload = function () {

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
