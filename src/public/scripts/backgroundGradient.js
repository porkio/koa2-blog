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
        if (colors.length > 3) {
            colors.forEach((color, index) => {
                if (index < 2 || index === colors.length - 1) {
                    this.colors.push(color)
                }
            })
        } else if (colors.length === 2) {
            this.colors = colors
            this.colors.push(colors[colors.length - 1])
        } else {
            this.colors.push(colors)
        }
        this._firstRoundCircle = document.createElement('div')
        this._lastRoundCircle = document.createElement('div')
    }
    _initial() {
        this._firstRoundCircle.style = `
            width: 1400px;
            height: 1400px;
            border-radius: 50%;
            position: fixed;
            top: -100%;
            right: -80%;
            background-image: linear-gradient(90deg, ${this.colors[0]}, ${this.colors[1] ? this.colors[1] : this.colors[0]}, ${this.colors[2] ? this.colors[2] : this.colors[1] ? this.colors[1] : this.colors[0]});
            z-index: -1;
        `
        this._lastRoundCircle.style = `
            width: 1400px;
            height: 1400px;
            border-radius: 50%;
            position: fixed;
            top: -100%;
            right: -60%;
            background-image: linear-gradient(90deg, ${this.colors[0]}, ${this.colors[1] ? this.colors[1] : this.colors[0]}, ${this.colors[2] ? this.colors[2] : this.colors[1] ? this.colors[1] : this.colors[0]});
            opacity: .8;
            z-index: -1;
        `
        // 注册窗口尺寸变化时的背景样式变化事件
        // 
    }
    show() {
        console.log(this.colors)
        this._initial()
        document.body.appendChild(this._firstRoundCircle)
        document.body.appendChild(this._lastRoundCircle)
    }
}

const backgroundGradient = new BackgroundWithGradient('#76469F', '#F881BD', '#F881BD', '#ccc')
backgroundGradient.show()
