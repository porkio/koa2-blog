/**
 * @author Pork
 * @description 应用入口 app.js 主要负责整体业务逻辑（增强用户体验）
 * @created_at 2020/11/29
 * @updated_at
 */


document.addEventListener('readystatechange', e => {
    if (document.readyState === 'complete') {
        // Go Back Button
        (() => {
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
