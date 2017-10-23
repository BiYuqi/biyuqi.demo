class Letter{
    constructor(options) {
        this.options = options || {}
        this.letterWrap = document.querySelector(options.letterWrap || '.wrapper')
        this.concatWrap = document.querySelector(options.concatWrap || '.concat-list')
        this.currentChar = document.querySelector(options.currentChar || '.current-char')
        this.touching = false

        // 初始数据
        this.source = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
                        'O','P','Q','R','S','T','U','V','W','X','Y','Z']

        // 侧边栏距离顶部的距离 底部的距离 排除header footer所占高度
        this.offsetTop = options.offsetTop || 0
        this.offsetBot = options.offsetBot || 0

        // 定义侧边栏字母栏高度 动态font-size
        const letterHeight = window.screen.height - this.offsetTop - this.offsetBot
        console.log(this.offsetBot)
        const expectLineHeight = letterHeight / this.source.length
        const expectFontSize = expectLineHeight * options.lineScale
        this.letterWrap.style.height = letterHeight + 'px'
        this.letterWrap.style.lineHeight = expectLineHeight + 'px'
        this.letterWrap.style.fontSize = expectFontSize + 'px'

        this.init()
    }

    init() {
        this.renderLetter()
        this.renderConcat()
        this.bindEvent()
    }
    // 渲染字母表
    renderLetter() {
        let tpl = ''
        this.source.forEach((v) => {
            tpl += `<li class="item">${v}</li>`
        })
        this.letterWrap.innerHTML = tpl
    }
    // 渲染数据
    renderConcat() {
        ajax_get({url:'data.json'})
            .then((source) =>{
                let tpl = ''
                for(let i=0;i<source.length;i++){
                    const title = source[i].title
                    tpl += '<div class="concat-list-item" data-char="'+title+'" >'
                        +        '<p>'+title+'</p>'
                        +        '<ul>'
                                for(let j=0;j<source[i].concats.length;j++){
                                    const img = source[i].concats[j].photo
                                    const name = source[i].concats[j].name
                    tpl +=                '<li class="list-item-letter">'
                        +                    '<img src="'+img+'" alt="" />'
                        +                    '<span>'+name+'</span>'
                        +                '</li>'
                                }
                        +            '</ul>'
                    tpl += '</div>'
                }
                // 显示到页面
                this.concatWrap.innerHTML = tpl
                // 渲染后，找出concat-list-item
                this.concatList = document.querySelectorAll('.concat-list-item')
            })
            .catch(function(err){
                console.log(err)
            })
    }

    bindEvent() {
        this.touchStart()
        this.touchEnd()
        this.touchMove()
    }
    // 到达指定位置 用字母去匹配内容区域是否存在，如果存在就跳转
    moveTo2(letter) {
        const len = this.concatList.length
        for(let i=0;i<len;i++){
            if(this.concatList[i].getAttribute('data-char') === letter){
                window.scrollTo(0,this.concatList[i].offsetTop-this.offsetTop)
            }
        }
    }
    // 此方法可返回touch时 所对应的索引是哪个字符
    getIndex(touchY) {
        return Math.floor((touchY-this.offsetTop) / ((this.letterWrap.clientHeight) / this.source.length))
    }
    // 提示字母
    showTips(index) {
        const letter = this.source[index]
        if(letter == undefined) return
        this.currentChar.innerHTML = letter
        this.currentChar.style.display = 'block'
    }
    // 提示字母
    hideTips() {
        this.currentChar.innerHTML = ''
        this.currentChar.style.display = 'none'
    }

    touchStart() {
        this.letterWrap.addEventListener('touchstart',(e)=>{
            if(!this.touching){
                e.preventDefault()
                this.touching = true
                this.letterWrap.className += ' active'
                const touchY = e.touches[0].clientY
                const index = this.getIndex(touchY)
                this.showTips(index)
                this.moveTo2(this.source[index])
            }
        },false)
    }

    touchEnd() {
        this.letterWrap.addEventListener('touchend',()=>{
            if(this.touching){
                this.touching = false
                this.letterWrap.className = this.letterWrap.className.replace(/\s*active/,'')
                this.hideTips()
            }

        },false)
    }

    touchMove() {
        this.letterWrap.addEventListener('touchmove',(e)=>{
            if(this.touching){
                e.preventDefault()
                const touchY = e.touches[0].clientY
                const index = this.getIndex(touchY)
                this.showTips(index)
                this.moveTo2(this.source[index])
            }

        },false)
    }
}

// 实例化
/**
*   @param {offsetTop} header高度  {number}
*   @param {offsetBot}  footer高度  {number}
*   @param {lineScale}  letter字母间隙  {number}
*   @param {letterWrap} letter容器选择器 {string}
*   @param {concatWrap} content容器选择器 {string}
*   @param {currentWrap} tips容器选择器  {string}
*/
const letter = new Letter({
    offsetTop:40,
    offsetBot:60,
    lineScale:0.7,
    letterWrap:'.wrapper',
    concatWrap:'.concat-list',
    currentWrap:'.current-char'
})
