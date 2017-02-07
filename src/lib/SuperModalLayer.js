(function(window){
    function SuperModal(obj){
        var str = '',
            cssCode = '';

            str += '<div class="super-modal">'
                +   '</div>'
                +   '<div class="super-inner">'
                +       '<h2 class="super-title">'+obj.modalTips+'</h2>'
                +       '<div>'
                +           '<span class="super-btn super-btnCancel">取消</span>'
                +           '<span class="super-btn super-btnSure">确定</span>'
                +       '</div>'
                +   '</div>';

        //动态插入css//本插件未用到
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
        // setCss(cssCode);
        loadData();

        //
        // $SM(obj.targetAim).onclick = function(){
        //     show($SM('.modal'));
        // }
        if(obj.flag){
             addClass($SM('.super-modal'),'addAmimal');
             addClass($SM('.super-inner'),'slideAmi');
             show($SM('.super-modal'));
             show($SM('.super-inner'));
             show($SM('.super-modal-wrap'))
        }

        //
        $SM('.super-btnCancel').addEventListener('click',function(){
            hide($SM('.super-modal'));
            hide($SM('.super-inner'));
            hide($SM('.super-modal-wrap'));
            $SM('.super-modal-wrap').remove();
        },false)

        //
        $SM('.super-btnSure').addEventListener('click',function(){
            hide($SM('.super-modal'));
            hide($SM('.super-inner'));
            hide($SM('.super-modal-wrap'));
            $SM('.super-modal-wrap').remove();
            obj.tarFun && obj.tarFun();
        },false)

        //modalTips
        if(!obj.modalTips){
            $SM('.super-title').innerHTML = '确定要删除吗？'
        }

    }
    window.SuperModal = function(obj){
        return new SuperModal(obj)
    };
})(window)
