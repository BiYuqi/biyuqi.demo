(function(window){
    function PageView(options){
        this.options = options
    }
    PageView.prototype = {
        init:function(){
            this.getOptions()
            this.bindEvent()
            this.prevPage()
            this.nextPage()
            this.firstPage()
            this.lastPage()
            this.linkJump()
            this.options.renderData(this.options.curr)
        },
        getOptions:function(){
            /**
            *   @param {total}  数据总条数
            *   @param {curr}   当前的第几页
            *   @param {maxLen} 最大分页数
            */
            var pageArr = []; // 分页索引
            if(!this.options.total){return}
            if(this.options.total <= this.options.maxLen){
                for(var i=0;i<this.options.total;i++){
                    pageArr[i] = i
                }
            }else{
                if(this.options.curr + this.options.maxLen/2 <= this.options.total && this.options.curr > this.options.maxLen/2){
                    for(var i=0;i<this.options.maxLen;i++){
                        pageArr[i] = this.options.curr - this.options.maxLen/2 + i
                    }
                }else if(this.options.curr <= this.options.maxLen/2){
                    for(let i=0;i<this.options.maxLen;i++){
                        pageArr.push(i)
                    }
                }else{
                    for(let i=0;i<this.options.maxLen;i++){
                        pageArr[i] = this.options.total - this.options.maxLen + i
                    }
                }
            }
            //
            this.render(pageArr)
        },
        render:function(pageArr){
            var tpl = ''
            if(this.options.firstDisplay){
                tpl += `<li class="pages-s">首页</li>`
            }
            if(this.options.prevDisplay){
                tpl += `<li class="pages-prev">上一页</li>`
            }
            for(let i=0;i<pageArr.length;i++){
                tpl += `<li class="${pageArr[i] == this.options.curr ? 'items pages-active':'items'}">${pageArr[i]+1}</li>`
            }
            if(this.options.nextDisplay){
                tpl += `<li class="pages-next">下一页</li>`
            }
            if(this.options.lastDisplay){
                tpl += `<li class="pages-l">尾页</li>`
            }
            if(this.options.showLinkTo){
                tpl += `<li class="page-link-to">
                        <span>${this.options.curr+1}</span>/
                        <span>${this.options.total}</span>
                        <input type="text">
                        <span class="link_to_sure">确定</span>
                    </li>`
            }
            this.options.wrapView.innerHTML = tpl
        },
        bindEvent:function(){
            var that = this;
            this.options.wrapView.addEventListener('click',function(e){
                if(e.target.className.indexOf('items') > -1 ){
                    var index = e.target.innerText-1
                    that.options.curr = index
                    that.options.renderData(that.options.curr)
                    that.getOptions()
                }
            },false)
        },
        prevPage:function(){
            var that = this;
            this.options.wrapView.addEventListener('click',function(e){
                if(e.target.className.indexOf('pages-prev') > -1){
                    that.options.curr--
                    if(that.options.curr < 0){
                        return
                    }
                    that.options.renderData(that.options.curr)
                    that.getOptions()
                }
            })
        },
        nextPage:function(){
            var that = this;
            this.options.wrapView.addEventListener('click',function(e){
                if(e.target.className.indexOf('pages-next') > -1){
                    that.options.curr++
                    if(that.options.curr > that.options.total-1){
                        return
                    }
                    that.options.renderData(that.options.curr)
                    that.getOptions()
                }
            })
        },
        firstPage:function(){
            var that = this;
            this.options.wrapView.addEventListener('click',function(e){
                if(e.target.className.indexOf('pages-s') > -1){
                    that.options.curr = 0
                    that.options.renderData(that.options.curr)
                    that.getOptions()
                }
            })
        },
        lastPage:function(){
            var that = this;
            this.options.wrapView.addEventListener('click',function(e){
                if(e.target.className.indexOf('pages-l') > -1){
                    that.options.curr = that.options.total-1
                    that.options.renderData(that.options.curr)
                    that.getOptions()
                }
            })
        },
        linkJump:function(){
            var that = this;
            this.options.wrapView.addEventListener('click',function(e){
                if(e.target.className.indexOf('link_to_sure') > -1){
                    var val = e.target.previousElementSibling.value
                    if(val && val*1 > that.options.total){
                        return
                    }
                    if(val){
                        that.options.curr = val*1-1
                        that.options.renderData(that.options.curr)
                        that.getOptions()
                    }
                }
            })
        }
    }

    window.$pageView = function(options){
        return new PageView(options).init()
    }
})(window)
