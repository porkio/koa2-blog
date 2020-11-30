/**
* @author Pork
* @description 圆形渐变背景
* @created_at 2020/11/29
* @updated_at
*/

/**
 * [BackgroundWithGradient description]
 * @description 渐变背景类
 * @constructor {ArrayList[String]} 颜色列表（至多可以传递3个颜色值）
 *     超过3种颜色则默认使用前两种以及最后一种作为渐变色组合
 *
 */
class BackgroundWithGradient {
    constructor(...colors) {
        if (!colors) {
            throw new Error('构造函数需要至少1个颜色代码')
        }
        this.colors = []

        switch(colors.length) {
            case 3:
                this.colors = colors
                break
            case 2:
                this.colors = colors
                this.colors.push(colors[colors.length - 1])
                break
            case 1:
                this.colors.push(colors)
                this.colors.push(colors)
                this.colors.push(colors)
                break
            default:
                colors.forEach((color, index) => {
                    if (index < 2 || index === colors.length - 1) {
                        this.colors.push(color)
                    }
                })
        }

        this._firstRoundCircle = document.createElement('div')
        this._lastRoundCircle = document.createElement('div')
    }
    _initial () {
        this._firstRoundCircle.style = `
            width: 800px;
            height: 800px;
            border-radius: 50%;
            position: fixed;
            top: -50%;
            left: -40%;
            background-image: linear-gradient(120deg, ${this.colors[0]}, ${this.colors[1] ? this.colors[1] : this.colors[0]}, ${this.colors[2] ? this.colors[2] : this.colors[1] ? this.colors[1] : this.colors[0]});
            z-index: -1;
            transition: all 10s ease;
        `
        this._lastRoundCircle.style = `
            width: 900px;
            height: 900px;
            border-radius: 50%;
            position: fixed;
            bottom: 0;
            left: -100px;
            background-image: linear-gradient(60deg, ${this.colors[0]}, ${this.colors[1] ? this.colors[1] : this.colors[0]}, ${this.colors[2] ? this.colors[2] : this.colors[1] ? this.colors[1] : this.colors[0]});
            opacity: .8;
            z-index: -1;
            transition: all 10s ease;
        `
        // 根据启动时客户端可视区尺寸调整圆形大小
        let clientWidth = window.innerWidth || document.documentElement.offsetWidth,
            clientHeight = window.innerHeight || document.documentElement.offsetHeight

        if (clientWidth < 500) {
            this._firstRoundCircle.style.width = clientHeight + 250 + 'px'
            this._firstRoundCircle.style.height = clientHeight + 250 + 'px'
            this._lastRoundCircle.style.width = clientHeight + 340 + 'px'
            this._lastRoundCircle.style.height = clientHeight + 340 + 'px'
        } else {
            this._firstRoundCircle.style.top = '-30%'
            this._firstRoundCircle.style.left = '-20%'
            this._lastRoundCircle.style.width = parseInt(clientHeight * 3.4) + 'px'
            this._lastRoundCircle.style.height = parseInt(clientHeight * 3.4) + 'px'
            this._lastRoundCircle.style.bottom = '-30%'
        }
        // 随机运动效果
        this._animations()
        // 注册窗口尺寸变化时的背景样式变化事件
        window.addEventListener('resize', e => {
            clientWidth = window.innerWidth || document.documentElement.offsetWidth
            clientHeight = window.innerHeight || document.documentElement.offsetHeight

            if (clientWidth < 500) {
                this._firstRoundCircle.style.width = clientHeight + 250 + 'px'
                this._firstRoundCircle.style.height = clientHeight + 250 + 'px'
                this._lastRoundCircle.style.width = clientHeight + 340 + 'px'
                this._lastRoundCircle.style.height = clientHeight + 340 + 'px'
            } else {
                this._firstRoundCircle.style.top = '-30%'
                this._firstRoundCircle.style.left = '-20%'
                this._lastRoundCircle.style.width = parseInt(clientHeight * 3.4) + 'px'
                this._lastRoundCircle.style.height = parseInt(clientHeight * 3.4) + 'px'
                this._lastRoundCircle.style.bottom = '-30%'
            }
        }, false)
    }

    _animations () {
        let psX = 0, psY = 0, angle = 90
        const lastRoundTimer = setInterval(() => {
            psX = Math.ceil(Math.random() * -200 + Math.ceil(Math.random() * 200))
            psY = Math.ceil(Math.random() * -200 + Math.ceil(Math.random() * 200))
            angle = Math.ceil(Math.random() * 100 + 260)
            this._lastRoundCircle.style.transform = `rotate(${angle}deg) translate(${psX}px, ${psY}px)`
            this._firstRoundCircle.style.transform = `rotate(${angle}deg) translate(${parseInt(-psX / 2)}px, ${parseInt(-psY * 3)}px)`
        }, 10000)
    }
    show () {
        this._initial()
        document.body.appendChild(this._firstRoundCircle)
        document.body.appendChild(this._lastRoundCircle)
    }
}

const backgroundGradient = new BackgroundWithGradient('#76469F', '#F881BD', '#F881BD')
backgroundGradient.show()
