$(function(){
    function GetPreView(obj){//obj 主内容区（预览里面的图片）
        this.imgs = obj.find('img');
        this.index = 0;
    }
    GetPreView.prototype = {
        constructor: GetPreView.prototype.constructor,
		__proto__: GetPreView.prototype.__proto__,
        init:function(){
            this.loadBase();
            console.log(this.imgs);
        },
        loadBase:function(){
            var body = $('body');
            var preHtml = '<div class="bg-pre-view">'+
                            '<div class="pre-view-con">'+
                                '<img src="" alt="">'+
                            '</div>'+
                            '<div class="pre-close-btn">'+
                                'X'+
                            '</div>'+
                            '<div class="pre-btn pre-btn-left"><img src="http://oj7j5nuxv.bkt.clouddn.com/left-btn.png"></div>'+
                            '<div class="pre-btn pre-btn-right"><img src="http://oj7j5nuxv.bkt.clouddn.com/right-btn.png"></div>'+
                        '</div>';
            body.append(preHtml);
            this.IsClick();
            this.closeClick();
            this.preClick();
            this.BackClick();
        },
        IsClick:function(){
            var that = this;
            this.imgs.on('click',function(){
                $('.bg-pre-view').fadeIn();
                var $imgSrc = $(this).attr('src');
                $('.pre-view-con img').attr('src',$imgSrc);
                that.index = $(this).parents('.con-item').index();//有陷阱a
            })
        },
        closeClick:function(){
            var closeBtn = $('.pre-close-btn');
            closeBtn.on('click',function(){
                $('.bg-pre-view').fadeOut();
            })
        },
        preClick:function(){
            var preLeft = $('.pre-btn-left');
            var that = this;
            preLeft.on('click',function(){
                that.index--;
                if(that.index < 0){
                    that.index = 0;
                    $('.pre-btn-left').css({
                        opacity:.3
                    })
                    return;
                }else{
                    $('.pre-btn-right').css({
                        opacity:.8
                    })
                }
                //console.log(that.index+'pre');
                var imgSrc = that.imgs.eq(that.index).attr('src');
                $('.pre-view-con img').attr('src',imgSrc);
            })
        },
        BackClick:function(){
            var preRight = $('.pre-btn-right');
            var that = this;
            preRight.on('click',function(){
                that.index++;
                if(that.index > that.imgs.length-1){
                    that.index = that.imgs.length-1;
                    $('.pre-btn-right').css({
                        opacity:.3
                    })
                    return;
                }else{
                    $('.pre-btn-left').css({
                        opacity:.8
                    })
                }
                //console.log(that.index);
                var imgSrc = that.imgs.eq(that.index).attr('src');
                $('.pre-view-con img').attr('src',imgSrc);
            })
        }
    };
    //调用方法
    var getprev = new GetPreView($('.container'));//想要预览内容区域的盒子，ex .box
    getprev.init();
})
