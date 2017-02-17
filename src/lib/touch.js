(function(window,undefined){
    function addETouch(elem,type,fn){
        //this.root = document.querySelectorAll(root); //root委托元素
        if(arguments.length < 3){
            return;
        }
        if(elem.addEventListener){
            elem.addEventListener(type,fn,false);
        }else{
            elem.attachEvent('on'+type,fn,false);
        }
    }
    function eTouch(elem,type,fn){
        //this.elem = document.querySelector(elem);
        this.zeroX = 0;
        this.zeroY = 0;
        this.endY = 0;
        this.endX = 0;
        this.status = null;
        addETouch(elem,'touchstart',function(e){
            touchstart(e);
        })
        addETouch(elem,'touchend',function(e){
            touchend(e,type,fn);
        })
    }
    function MathAbs(abs){
        return Math.abs(abs);
    }
    function touchstart(e){
        this.zeroX = e.touches[0].clientX;
        this.zeroY = e.touches[0].clientY;
    }
    function touchend(e,type,fn){
        this.endY = e.changedTouches[0].clientY;
        this.endX = e.changedTouches[0].clientX;

        var isDown = this.endY - this.zeroY;
        var isRight = this.endX - this.zeroX;
        var isDirect = isDown - isRight;

        var a = MathAbs(MathAbs(this.zeroX) - MathAbs(this.endX));
        var b = MathAbs(MathAbs(this.endY) - MathAbs(this.zeroY));
        // var cosA = isRight/(isDown*isDown + isRight*isRight);
        // 余弦角度 小数 匹配向下 向左 滑动
        var leftDown = (a*a)/(a*a+b*b);
        //余弦角度 小数转度数
        //var cosNum= parseInt(leftDown *(180/3.14));
        // console.log(leftDown);

        this.status = swipeDirection(isDown,isRight,leftDown);
        this.status == type ? (fn && fn()) : '';
    }
    function swipeDirection(isDown,isRight,leftDown){
        if(isDown > 40 && isDown > isRight){
            if(leftDown <=0.224){
                return 'down';
            }
        }
        if(isRight < -40 && isDown > isRight){
            if(leftDown >=0.5){
                return 'left';
            }
        }
        if(isDown < -40 && isDown < isRight){
            if(leftDown <=0.224){
                return 'up';
            }

        }
        if(isRight > 40 && isDown < isRight){
            if(leftDown >=0.607){
                return 'right';
            }
        }
    }

    
    window.eTouchs = function(elem,type,fn){
        return new eTouch(elem,type,fn)
    }
    // var zeroY,
    //     zeroX,
    //     endY,
    //     endX;
    //document.addEventListener('touchstart',function(e){
        // console.log(e)
    //     zeroX = e.touches[0].clientX;
    //     zeroY = e.touches[0].clientY;
    // },false)
    //document.addEventListener('touchmove',function(e){
        // console.log(e.touches[0]);
    //},false)
    // document.addEventListener('touchend',function(e){
    //     endY = e.changedTouches[0].clientY;
    //     endX = e.changedTouches[0].clientX;
        //console.log(endY - zeroY);
        //console.log(endX - zeroX);
    //     var isDown = endY - zeroY;
    //     var isRight = endX - zeroX;
    //     var isDirect = isDown - isRight;
    //
    //     function MathAbs(abs){
    //         return Math.abs(abs);
    //     }
    //     var a = MathAbs(MathAbs(zeroX) - MathAbs(endX));
    //     var b = MathAbs(MathAbs(endY) - MathAbs(zeroY));
    //     // var cosA = isRight/(isDown*isDown + isRight*isRight);
    //     // 余弦角度 小数 匹配向下 向左 滑动
    //     var leftDown = (a*a)/(a*a+b*b);
    //     //余弦角度 小数转度数
    //     //var cosNum= parseInt(leftDown *(180/3.14));
    //     console.log(leftDown);
    //
    //     var c =  MathAbs(MathAbs(endX) - MathAbs(zeroX));
    //     var d =  MathAbs(MathAbs(zeroY) - MathAbs(endY));
    //
    //
    //     if(isDown > 40 && isDown > isRight){
    //         if(leftDown <=0.224){
    //             console.log("向下滑动")
    //         }
    //     }
    //     if(isRight < -40 && isDown > isRight){
    //         if(leftDown >=0.939){
    //             console.log("向左滑动")
    //         }
    //     }
    //     if(isDown < -40 && isDown < isRight){
    //         if(leftDown <=0.224){
    //             console.log("向上滑动")
    //         }
    //
    //     }
    //     if(isRight > 40 && isDown < isRight){
    //         if(leftDown >=0.939){
    //             console.log("向右滑动")
    //         }
    //
    //     }
    // },false);
})(window)
