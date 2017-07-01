function _$(el){
    return document.querySelector(el)
}
function _$$(el){
    return document.querySelectorAll(el)
}
function renderData(){
    var resHeight = []
    var size = Math.floor(_$('.view').offsetWidth/_$$('.box')[0].offsetWidth)
    var imgWidth = _$$('.box')[0].offsetWidth
    var imgsAll = _$$('.box')
    _$('.view').style.cssText = "width : " + imgWidth * size + "px;margin:0 auto;";

    for(var i=0;i<imgsAll.length;i++){
        if(i < size){
            resHeight[i] = imgsAll[i].offsetHeight
        }else{
            var minHeight = Math.min.apply(null,resHeight)
            var minHeightIndex = getIndex(resHeight,minHeight)

            imgsAll[i].style.position = "absolute"
            imgsAll[i].style.top = minHeight+'px'
            imgsAll[i].style.left = imgsAll[minHeightIndex].offsetLeft+'px'
            resHeight[minHeightIndex] = resHeight[minHeightIndex]+imgsAll[i].offsetHeight
        }
    }
}
window.onload = function(){
    renderHTML()
}
// 渲染页面
function renderHTML(){
    var tpl = ''
    for(i=0;i<30;i++){
        var index = Math.floor(Math.random()*6+2)

        tpl += `<div class="box">
                <div class="box-cell">
                <img src="img/${index}.jpg" alt="">
                </div>
                </div>`
    }
    _$('.view').innerHTML = tpl
    setTimeout(function(){
        renderData()
    },17)
}


function getIndex(arr,target){
    for(var i=0;i<arr.length;i++){
        if(arr[i] === target){
            return i
        }
    }
}

// 底部加载
function scrollAppend(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    var pageHeight = document.body.clientHeight || document.documentElement.clientHeight
    var boxAll = [].slice.call(_$$('.box'))
    var lastBoxHeight = boxAll[boxAll.length-1].offsetTop

    if(lastBoxHeight <= scrollTop+pageHeight){
        return true
    }
    return false
}
// 节流
function throttle(delay,times,callback){
    var startTime = (new Date()).getTime(),
        timer = null;
    return function(){
        var currTime = (new Date()).getTime(),
            that = this,
            args = arguments;
        clearTimeout(timer);
        if(currTime - startTime >= delay){
            callback.apply(that,args);
            startTime = currTime;
        }else{
            timer = setTimeout(function(){
                callback.apply(that,args);
            },times)
        }
    }
}
// 滚动事件
window.addEventListener('scroll',throttle(100,200,function(){
    if(scrollAppend()){
        for(i=0;i<20;i++){
            var index = Math.floor(Math.random()*6+2)

            var box = document.createElement("div");
            box.className = "box";
            _$('.view').appendChild(box);

            var boximg = document.createElement("div");
            boximg.className = "box-cell";
            box.appendChild(boximg);

            var img = document.createElement("img");
            img.src = "img/" + index+'.jpg';
            boximg.appendChild(img);
        }
        // setTimeout(function(){
            renderData()
        // },200)
    }
}),false)
