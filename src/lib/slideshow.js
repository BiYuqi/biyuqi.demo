var module = (function(){
    function Slideshow(obj){
        this.slideShow = obj;//传的形参，当做对象用
        this.wrapperWidth = $('.ss-wrapper');
        this.imgWrapper = $('.ss-inner');
        this.circleItem = $('.ss-circle-item');
        this.arrowBtn = $('.ss-arrow');
        this.arrowBtnLeft = $('.ss-arrow-left');
        this.arrowBtnRight = $('.ss-arrow-right');
        this.imgs = this.imgWrapper.find('.ss-item');//图片所在盒子
        this.index = 1;//
        this.imgWidth = obj.imgWidth || this.imgs.eq(0).width();//设置图片宽度 默认1000
        this.imgHeight = obj.imgHeight || this.imgs.eq(0).height();
        this.gapTime = obj.time || 3000;//轮播间隔时间
        this.isAutoPlay = obj.isFlag || false;//可选择是否自动轮播
        this.mobileBtn = obj.mobileBtn || false;//移动端是否显示 左右点击按钮
        this.timer = null;//初始化
    }
    Slideshow.prototype = {
        init:function(){
            //拷贝首尾图片
            var firstImg = this.imgs.eq(0).clone();
            var lastImg = this.imgs.eq(this.imgs.length-1).clone();
            //分别插入
            this.imgWrapper.append(firstImg);
            lastImg.insertBefore(this.imgs.eq(0));
            //储存图片个数
            var imgLength = $('.ss-item').length;
            //重新赋予大盒子宽度
            this.imgWrapper.css({
                width:this.imgWidth * imgLength
            });
            //改变盒子的margin-left  显示第一张图片
            this.imgWrapper.css({
                marginLeft: -this.imgWidth
            });
            //自定义宽高
            this.wrapperWidth.css({
                width: this.imgWidth,
                height: this.imgHeight
            });
            //自定义宽高
            $('.ss-item').css({
                width: this.imgWidth,
                height: this.imgHeight
            });
            //是否显示移动端点击按钮
            if(!this.mobileBtn){
                this.arrowBtn.hide();
            }

            //初始化后，下面的事件在此调用
            this.addAutoPlay();
            this.stopAutoPlay();
            this.arrowRightClick();
            this.arrowLeftClick();
            this.circleClick();
        },
        addAutoPlay:function(){
            var that = this;
            if(!this.isAutoPlay){
                this.timer = setInterval(function(){
                    that.index++;
                    that.addAnimate();
                },that.gapTime)
            }
        },
        stopAutoPlay:function(){
            var that = this;
            if(!this.mobileBtn){//移动端点击按钮 开关
                this.arrowBtn.hide();
            }else{//
                this.arrowBtn.show();
                this.wrapperWidth.on('mouseenter',function(e){
                    that.arrowBtn.fadeIn();//鼠标滑过，显示按钮
                    clearInterval(that.timer);
                });
                this.wrapperWidth.on('mouseleave',function(e){
                    that.arrowBtn.fadeOut();//鼠标离开，隐藏按钮
                    that.addAutoPlay();
                })
            }

        },
        arrowRightClick:function(){
            var that = this;
            //防止点击过快，造成的问题  保存初始时间戳
            var _thistime = Date.now();
            this.arrowBtnRight.on('click',function(){
                //比较两次点击之间的时间，如果点击过快，return
                if((Date.now() - _thistime) < 700){
                    return false;
                }else{//符合点击范围，执行动画
                    //时间保留到上次点击的地方
                    that.index++;
                    _thistime = Date.now();
                    //运动函数里面 已经处理好index的问题
                    that.addAnimate();
                }

            })
        },
        arrowLeftClick:function(){
            var that = this;
            //防止点击过快，造成的问题  保存初始时间戳
            var _thistime = Date.now();
            this.arrowBtnLeft.on('click',function(){
                //比较两次点击之间的时间，如果点击过快，return
                if((Date.now() - _thistime) < 700){
                    return false;
                }else{//符合点击范围，执行动画
                    //时间保留到上次点击的地方
                    that.index--;
                    _thistime = Date.now();
                    //运动函数里面 已经处理好index的问题
                    that.addAnimate();
                }


            })
        },
        circleClick:function(){
            var that = this;
            this.circleItem.each(function(k,v){
				$(v).on('click',function(){
					//点击时当前的next 等于当前的索引k
					that.index = k+1;
					that.addAnimate();
				})
			});

        },
        addAnimate:function(){
            var that = this;
            var boxWrapper = $('.ss-item');//图片容器 用来计算图片数量
            this.imgWrapper.animate({
                marginLeft:-this.imgWidth*that.index
            },600,function(){
                if(that.index >= boxWrapper.length-1){
    				that.index = 1;
    			}
                if(that.index <= 0){
    				that.index = boxWrapper.length-2;
    			}
                that.imgWrapper.css({
                    marginLeft: -that.imgWidth*that.index
                });

                //小圆圈高亮跟随 处理
                for(var i=0; i<that.circleItem.length; i++){
                    that.circleItem.eq(i).removeClass('active');
                }
                that.circleItem.eq(that.index-1).addClass('active');
            })
        }
    }
    return {
        Slideshow:Slideshow
    }

})()
