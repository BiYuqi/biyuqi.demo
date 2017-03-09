(function(window){
    function SuperModal(obj){
        var str = '',
            cssCode = '',
            tips = obj.modalTips || '确定要删除吗？';
            str += '<div class="super-modal">'
                +   '</div>'
                +   '<div class="super-inner">'
                +       '<h2 class="super-title">'+tips+'</h2>'
                +       '<div>'
                +           '<span class="super-btn super-btnCancel">取消</span>'
                +           '<span class="super-btn super-btnSure">确定</span>'
                +       '</div>'
                +   '</div>';
        //动态插入css 本插件暂未未用到 暂不删除
        function setCss(cssCode){
            var style = document.createElement('style');
                style.type = 'text/css';
            if(style.styleSheet){
                //IE
                style.styleSheet.cssText = cssCode;
            }else{
                //others
                style.innerHTML = cssCode;
            }
            document.getElementsByTagName("head")[0].appendChild(style);
        }
        function show(el){
            return el.style.display = 'block';
        }
        function hide(el){
            return el.style.display = 'none';
        }
        function $SM(el){
            return document.querySelector(el);
        }
        function $$SM(el){
            return document.querySelectorAll(el);
        }
        function addClass(elem,cName){
        	var reg = new RegExp('(^|\\s)' + cName+ '(\\s|$)');
        	if(!reg.test(elem.className)){
        		elem.className += ' ' + cName;
    	    }
        }
        function loadData(){
            var p = document.createElement("div");
            p.className = 'super-modal-wrap';
            document.body.appendChild(p);
            $SM('.super-modal-wrap').innerHTML = str;
        }
        loadData();
        function allShow(){
            show($SM('.super-modal'));
            show($SM('.super-inner'));
            show($SM('.super-modal-wrap'))
        }
        function allHide(){
            hide($SM('.super-modal'));
            hide($SM('.super-inner'));
            hide($SM('.super-modal-wrap'));
        }
        function removeAll(){
            $SM('.super-modal-wrap').remove();
        }
        if(obj.isFlag){
             addClass($SM('.super-modal'),'addAmimal');
             addClass($SM('.super-inner'),'slideAmi');
             allShow();
        }
        //另一种情况 取消 确定按钮消失
        if(obj.isShow){
            hide($SM('.super-btnSure'));
            hide($SM('.super-btnCancel'));
            $SM('.super-title').style.marginTop = 60+'px';
            $SM('.super-title').style.fontSize = obj.titleSize+'px';
        }
        //
        $SM('.super-modal').addEventListener('click',function(){
            allHide();
            removeAll();
            //暂不实现点击背景  提示框消失功能  有需要的 可以打开注释，即可实现
        },false)
        //
        $SM('.super-btnCancel').addEventListener('click',function(){
            allHide();
            removeAll();
        },false)
        //
        $SM('.super-btnSure').addEventListener('click',function(){
            allHide();
            removeAll();
            obj.tarFun && obj.tarFun();
        },false)
    }
    window.SuperModal = function(obj){
        return new SuperModal(obj)
    };
})(window)
